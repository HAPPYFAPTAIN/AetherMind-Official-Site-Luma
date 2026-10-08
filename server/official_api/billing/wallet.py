"""积分钱包：余额查询与幂等记账；charge() 为统一扣费入口。"""
from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass

from pydantic import Field

from ..crypto import random_id
from ..errors import ApiError
from ..http import Strict

DAY = 86_400_000
MAX_BALANCE = 1_000_000_000


class CreditChange(Strict):
    delta: int = Field(ge=-10_000_000, le=10_000_000)
    reason: str = Field(min_length=2, max_length=200)
    requestId: str = Field(min_length=8, max_length=80)


@dataclass
class UsageEvent:
    units: int = 0
    model: str | None = None
    input_tokens: int = 0
    cached_tokens: int = 0
    output_tokens: int = 0
    core_minutes: int = 0


@dataclass
class ChargeResult:
    id: str
    points: int
    shortfall: int
    replayed: bool
    balance_after: int


def fingerprint(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


def balance(c, uid):
    row = c.execute('SELECT balance FROM official_wallets WHERE user_id=?', (uid,)).fetchone()
    return row['balance'] if row else 0


def credit(w, c, uid, delta, kind, reason, actor, key, fp, product=None):
    prior = c.execute('SELECT * FROM official_ledger WHERE user_id=? AND request_key=?', (uid, key)).fetchone()
    if prior:
        if prior['fingerprint'] != fp:
            raise ApiError(409, 'IDEMPOTENCY_CONFLICT', '请求标识已用于另一笔操作')
        return dict(prior)
    amount = balance(c, uid) + delta
    if amount < 0:
        raise ApiError(409, 'INSUFFICIENT_CREDITS', '积分余额不足')
    if amount > MAX_BALANCE:
        raise ApiError(400, 'BALANCE_LIMIT', '积分余额超过上限')
    c.execute('INSERT INTO official_wallets VALUES(?,?) ON CONFLICT(user_id) DO UPDATE SET balance=excluded.balance', (uid, amount))
    lid = random_id()
    c.execute('INSERT INTO official_ledger VALUES(?,?,?,?,?,?,?,?,?,?,?)',
              (lid, uid, delta, amount, kind, product, reason, actor, key, fp, w.now()))
    return {'id': lid, 'balance_after': amount, 'delta': delta}


def charge(w, c, *, user_id, product_id, event_id, usage: UsageEvent,
           reason=None, actor=None, allow_clamp=False, fingerprint_override=None, now=None) -> ChargeResult:
    """统一扣费：重放检查 → 权益校验 → 计价 → 记账 → 扣减次数 → 登记用量。

    调用方须已持有连接上的 IMMEDIATE 事务。allow_clamp=True 时按余额封顶扣减，
    差额记入 shortfall；否则余额不足沿用严格失败（整个事务回滚）。
    """
    from .rates import price
    now = w.now() if now is None else now
    fp = fingerprint_override or fingerprint(vars(usage))
    if min(usage.units, usage.input_tokens, usage.cached_tokens, usage.output_tokens, usage.core_minutes) < 0 \
            or usage.cached_tokens > usage.input_tokens \
            or (usage.units + usage.input_tokens + usage.output_tokens + usage.core_minutes) <= 0:
        raise ApiError(400, 'INVALID_USAGE', '用量数值不合法')
    prior = c.execute('SELECT * FROM official_usage WHERE product_id=? AND event_id=?', (product_id, event_id)).fetchone()
    if prior:
        if prior['user_id'] != user_id:
            raise ApiError(409, 'IDEMPOTENCY_CONFLICT', '用量事件标识已属于其他用户')
        if prior['fingerprint'] != fp:
            raise ApiError(409, 'IDEMPOTENCY_CONFLICT', '用量事件标识已存在且内容不同')
        return ChargeResult(id=prior['id'], points=prior['points'], shortfall=prior['shortfall'],
                            replayed=True, balance_after=balance(c, user_id))
    e = c.execute('SELECT * FROM official_entitlements WHERE user_id=? AND product_id=?', (user_id, product_id)).fetchone()
    timed = e and (e['expires_at_ms'] or 0) > now
    if not e or (not timed and (usage.units <= 0 or e['units'] < usage.units)):
        raise ApiError(403, 'ENTITLEMENT_REQUIRED', '产品权益或剩余次数不足')
    name = c.execute('SELECT name FROM official_products WHERE id=?', (product_id,)).fetchone()['name']
    points = price(c, product_id=product_id, model=usage.model, units=usage.units,
                   input_tokens=usage.input_tokens, cached_tokens=usage.cached_tokens,
                   output_tokens=usage.output_tokens, core_minutes=usage.core_minutes)
    shortfall = 0
    if allow_clamp:
        shortfall = max(0, points - balance(c, user_id))
        points -= shortfall
    credit(w, c, user_id, -points, 'USAGE', reason or ('使用 · ' + name), actor,
           'usage:' + product_id + ':' + event_id, fp, product_id)
    if not timed:
        c.execute('UPDATE official_entitlements SET units=units-? WHERE user_id=? AND product_id=?', (usage.units, user_id, product_id))
    eid = random_id()
    c.execute('INSERT INTO official_usage(id,user_id,product_id,event_id,fingerprint,units,points,'
              'input_tokens,cached_tokens,output_tokens,model,core_minutes,shortfall,created_at_ms) '
              'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
              (eid, user_id, product_id, event_id, fp, usage.units, points, usage.input_tokens,
               usage.cached_tokens, usage.output_tokens, usage.model, usage.core_minutes, shortfall, now))
    return ChargeResult(id=eid, points=points, shortfall=shortfall, replayed=False, balance_after=balance(c, user_id))


def adjust_credits(w, actor, target, data):
    from ..admin.roles import require, user_exists, audit
    if not data.delta or not data.reason.strip():
        raise ApiError(400, 'INVALID_ADJUSTMENT', '填写非零积分与操作原因')
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        require(c, actor, owner=True)
        user_exists(c, target)
        key = f'adjust:{actor}:{data.requestId}'
        fp = fingerprint(data.model_dump())
        prior = c.execute('SELECT 1 FROM official_ledger WHERE user_id=? AND request_key=?', (target, key)).fetchone()
        result = credit(w, c, target, data.delta, 'ADJUSTMENT', data.reason.strip(), actor, key, fp)
        if not prior:
            audit(w, c, actor, target, 'CREDITS_ADJUSTED', {'delta': data.delta, 'reason': data.reason.strip()})
        return {'balance': result['balance_after']}
