"""积分钱包：余额查询与幂等记账。"""
from __future__ import annotations

import hashlib
import json

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
