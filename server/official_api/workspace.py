from __future__ import annotations

import hashlib
import json
import re
import secrets
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Literal
from urllib.parse import urlsplit

from fastapi import APIRouter, Depends, Query, Request
from pydantic import BaseModel, ConfigDict, Field, model_validator
from llmer_api.auth_service import normalize_phone
from llmer_api.crypto import random_id
from llmer_api.errors import ApiError

DAY = 86_400_000
TZ = timezone(timedelta(hours=8))
MAX_BALANCE = 1_000_000_000
CATALOG = [
    ('platform', '以太智元平台', 'AethericAI Platform', '统一管理科研任务、算力与研究结果。', 'platform'),
    ('lammps', 'LAMMPS 计算引擎', 'LAMMPS Compute Engine', '分子动力学任务编排、监测与轨迹分析。', 'lammps'),
    ('agent', '科学智能体', 'Science Agents', '将研究问题转化为可执行的计算步骤。', 'ai-agent'),
    ('materials', '材料计算', 'Materials Computing', '围绕结构、缺陷和能量景观组织材料研究。', 'materials'),
    ('chemistry', '化学与分子计算', 'Molecular Computing', '分子结构、反应路径与计算结果。', 'chemistry'),
    ('biology', '生物计算', 'Biological Computing', '生物分子建模、结构分析与可复现流程。', 'biology'),
]


class Strict(BaseModel):
    model_config = ConfigDict(extra='forbid', strict=True)


class RoleChange(Strict):
    role: Literal['ADMIN', 'USER']
    productIds: list[str] = Field(default_factory=list, max_length=30)


class CreditChange(Strict):
    delta: int = Field(ge=-10_000_000, le=10_000_000)
    reason: str = Field(min_length=2, max_length=200)
    requestId: str = Field(min_length=8, max_length=80)


class BatchCreate(Strict):
    requestId: str = Field(default_factory=random_id, min_length=8, max_length=80)
    label: str = Field(min_length=1, max_length=80)
    quantity: int = Field(ge=1, le=500)
    credits: int = Field(default=0, ge=0, le=1_000_000)
    productId: str | None = None
    units: int = Field(default=0, ge=0, le=1_000_000)
    days: int = Field(default=0, ge=0, le=3650)
    validDays: int = Field(default=30, ge=1, le=365)
    assignedTo: str | None = None


class Redeem(Strict):
    code: str = Field(min_length=8, max_length=100)
    targetUserId: str | None = Field(default=None, max_length=80)


class Purchase(Strict):
    productId: str = Field(max_length=80)
    requestId: str = Field(min_length=8, max_length=80)
    expectedPrice: int = Field(ge=0, le=10_000_000)


class ProductEdit(Strict):
    name: str = Field(min_length=1, max_length=80)
    nameEn: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1, max_length=500)
    entryUrl: str = Field(default='', max_length=500)
    status: Literal['AVAILABLE', 'COMING_SOON']
    price: int = Field(ge=0, le=10_000_000)
    packageUnits: int = Field(ge=0, le=1_000_000)
    packageDays: int = Field(ge=0, le=3650)
    unitPointCost: int = Field(ge=0, le=100_000)


class Usage(Strict):
    eventId: str = Field(min_length=8, max_length=100)
    userId: str = Field(min_length=1, max_length=80)
    units: int = Field(default=1, ge=1, le=100_000)
    inputTokens: int = Field(default=0, ge=0, le=1_000_000_000)
    cachedTokens: int = Field(default=0, ge=0, le=1_000_000_000)
    outputTokens: int = Field(default=0, ge=0, le=1_000_000_000)

    @model_validator(mode='after')
    def cached_within_input(self):
        if self.cachedTokens > self.inputTokens:
            raise ValueError('cached tokens exceed input tokens')
        return self


def fingerprint(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


class Workspace:
    def __init__(self, database, auth):
        self.db, self.auth = database, auth
        self.now = lambda: int(time.time() * 1000)

    def initialize(self):
        with self.db.connect() as c:
            c.executescript(Path(__file__).with_name('schema.sql').read_text())
            for pid, name, en, desc, image in CATALOG:
                c.execute('INSERT OR IGNORE INTO official_products(id,name,name_en,description,image) VALUES(?,?,?,?,?)',
                          (pid, name, en, desc, f'/assets/products/{image}.png'))

    def role(self, c, uid):
        row = c.execute('SELECT role FROM official_roles WHERE user_id=?', (uid,)).fetchone()
        return row['role'] if row else 'USER'

    def require(self, c, uid, owner=False):
        role = self.role(c, uid)
        if role != 'OWNER' and (owner or role != 'ADMIN'):
            raise ApiError(403, 'FORBIDDEN', '需要总管理员权限' if owner else '需要管理员权限')
        return role

    def user_exists(self, c, uid):
        if not c.execute('SELECT 1 FROM users WHERE id=?', (uid,)).fetchone():
            raise ApiError(404, 'USER_NOT_FOUND', '用户不存在')

    def audit(self, c, actor, target, action, detail):
        c.execute('INSERT INTO official_audit VALUES(?,?,?,?,?,?)',
                  (random_id(), actor, target, action, json.dumps(detail, ensure_ascii=False), self.now()))

    def bootstrap_owner(self, phone):
        digest = self.auth.hash('phone', normalize_phone(phone))
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            user = c.execute('SELECT id FROM users WHERE phone_hash=?', (digest,)).fetchone()
            if not user:
                raise ValueError('The specified account must sign in with verified SMS first.')
            uid = user['id']
            existing = c.execute("SELECT user_id FROM official_roles WHERE role='OWNER'").fetchone()
            if existing and existing['user_id'] != uid:
                raise ValueError('A different owner already exists; refusing replacement.')
            if not existing:
                c.execute('INSERT INTO official_roles VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET role=excluded.role,updated_at_ms=excluded.updated_at_ms', (uid, 'OWNER', self.now()))
                c.execute("INSERT OR REPLACE INTO community_admins VALUES(?,'ADMIN',?)", (uid, self.now()))
                self.audit(c, uid, uid, 'OWNER_BOOTSTRAP', {'source': 'operator-authorized'})
            return uid

    def balance(self, c, uid):
        row = c.execute('SELECT balance FROM official_wallets WHERE user_id=?', (uid,)).fetchone()
        return row['balance'] if row else 0

    def credit(self, c, uid, delta, kind, reason, actor, key, fp, product=None):
        prior = c.execute('SELECT * FROM official_ledger WHERE user_id=? AND request_key=?', (uid, key)).fetchone()
        if prior:
            if prior['fingerprint'] != fp:
                raise ApiError(409, 'IDEMPOTENCY_CONFLICT', '请求标识已用于另一笔操作')
            return dict(prior)
        amount = self.balance(c, uid) + delta
        if amount < 0:
            raise ApiError(409, 'INSUFFICIENT_CREDITS', '积分余额不足')
        if amount > MAX_BALANCE:
            raise ApiError(400, 'BALANCE_LIMIT', '积分余额超过上限')
        c.execute('INSERT INTO official_wallets VALUES(?,?) ON CONFLICT(user_id) DO UPDATE SET balance=excluded.balance', (uid, amount))
        lid = random_id()
        c.execute('INSERT INTO official_ledger VALUES(?,?,?,?,?,?,?,?,?,?,?)',
                  (lid, uid, delta, amount, kind, product, reason, actor, key, fp, self.now()))
        return {'id': lid, 'balance_after': amount, 'delta': delta}

    def grant(self, c, uid, product, units, days):
        if not product:
            return
        old = c.execute('SELECT * FROM official_entitlements WHERE user_id=? AND product_id=?', (uid, product)).fetchone()
        total = (old['units'] if old else 0) + units
        expiry = old['expires_at_ms'] if old else None
        if days:
            expiry = max(expiry or 0, self.now()) + days * DAY
        if total > MAX_BALANCE:
            raise ApiError(400, 'ENTITLEMENT_LIMIT', '可用次数超过上限')
        c.execute('INSERT INTO official_entitlements VALUES(?,?,?,?) ON CONFLICT(user_id,product_id) DO UPDATE SET units=excluded.units,expires_at_ms=excluded.expires_at_ms',
                  (uid, product, total, expiry))

    def products(self, c):
        return [dict(r) for r in c.execute('SELECT * FROM official_products ORDER BY rowid')]

    def profile(self, c, uid):
        row = c.execute('SELECT u.id,u.phone_last4,p.display_name FROM users u JOIN profiles p ON p.user_id=u.id WHERE u.id=?', (uid,)).fetchone()
        self.user_exists(c, uid)
        return {'userId': uid, 'displayName': row['display_name'], 'phoneMasked': '*******' + row['phone_last4'],
                'role': self.role(c, uid), 'balance': self.balance(c, uid),
                'productIds': [r[0] for r in c.execute('SELECT product_id FROM official_admin_products WHERE user_id=?', (uid,))]}

    def dashboard(self, uid, days, product):
        now = self.now()
        today = datetime.fromtimestamp(now / 1000, TZ).replace(hour=0, minute=0, second=0, microsecond=0)
        start = int(today.timestamp() * 1000)
        with self.db.connect() as c:
            c.execute('BEGIN')
            me = self.profile(c, uid)
            params = [uid]
            where = 'user_id=?'
            if product != 'all':
                where += ' AND product_id=?'
                params.append(product)
            sums = '''COUNT(*) calls,COALESCE(SUM(units),0) units,COALESCE(SUM(points),0) points,
                      COALESCE(SUM(input_tokens-cached_tokens),0) inputTokens,
                      COALESCE(SUM(cached_tokens),0) cachedTokens,COALESCE(SUM(output_tokens),0) outputTokens'''
            summary = {}
            for key, cutoff in [('today', start), ('week', start - 6 * DAY), ('total', 0)]:
                summary[key] = dict(c.execute(f'SELECT {sums} FROM official_usage WHERE {where} AND created_at_ms>=?', (*params, cutoff)).fetchone())
            series = {r['day']: dict(r) for r in c.execute(f"SELECT strftime('%Y-%m-%d',created_at_ms/1000,'unixepoch','+8 hours') day,{sums} FROM official_usage WHERE {where} AND created_at_ms>=? GROUP BY day", (*params, start - 181 * DAY))}
            history = []
            for offset in range(181, -1, -1):
                day = (today - timedelta(days=offset)).strftime('%Y-%m-%d')
                history.append(series.get(day, {'day': day, 'calls': 0, 'units': 0, 'points': 0, 'inputTokens': 0, 'cachedTokens': 0, 'outputTokens': 0}))
            ranking = [dict(r) for r in c.execute(f'SELECT product_id,{sums} FROM official_usage WHERE {where} AND created_at_ms>=? GROUP BY product_id ORDER BY calls DESC', (*params, start - (days - 1) * DAY))]
            grants = [dict(r) for r in c.execute('SELECT e.*,p.name,p.name_en,p.entry_url,p.image FROM official_entitlements e JOIN official_products p ON p.id=e.product_id WHERE e.user_id=?', (uid,))]
            for e in grants:
                e['active'] = bool(e['units'] > 0 or (e['expires_at_ms'] or 0) > now)
            ledger = [dict(r) for r in c.execute('SELECT id,delta,balance_after,kind,reason,created_at_ms FROM official_ledger WHERE user_id=? ORDER BY created_at_ms DESC,rowid DESC LIMIT 100', (uid,))]
            totals = c.execute('SELECT COALESCE(SUM(CASE WHEN delta>0 THEN delta ELSE 0 END),0) credited,COALESCE(SUM(CASE WHEN delta<0 THEN -delta ELSE 0 END),0) spent FROM official_ledger WHERE user_id=?', (uid,)).fetchone()
            orders = [dict(r) for r in c.execute('SELECT o.*,p.name FROM official_purchases o JOIN official_products p ON p.id=o.product_id WHERE user_id=? ORDER BY created_at_ms DESC LIMIT 100', (uid,))]
            return {'profile': me, 'summary': summary, 'trend': history[-days:], 'heatmap': history,
                    'ranking': ranking, 'products': self.products(c), 'entitlements': grants, 'ledger': ledger,
                    'orders': orders, 'walletTotals': dict(totals), 'asOf': now, 'timezone': 'Asia/Shanghai'}

    def users(self, actor, search, offset):
        with self.db.connect() as c:
            self.require(c, actor)
            params = []
            where = '1=1'
            if search:
                if re.fullmatch(r'1[3-9][0-9]{9}', search):
                    where = 'u.phone_hash=?'
                    params = [self.auth.hash('phone', search)]
                else:
                    where = "(instr(p.display_name,?)>0 OR instr(u.id,?)>0 OR u.phone_last4=?)"
                    params = [search, search, search]
            total = c.execute(f'SELECT COUNT(*) FROM users u JOIN profiles p ON p.user_id=u.id WHERE {where}', params).fetchone()[0]
            rows = c.execute(f'SELECT u.id FROM users u JOIN profiles p ON p.user_id=u.id WHERE {where} ORDER BY u.created_at_ms DESC,u.id LIMIT 50 OFFSET ?', (*params, offset))
            return {'items': [self.profile(c, r['id']) for r in rows], 'total': total}

    def change_role(self, actor, target, data):
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            self.require(c, actor, owner=True)
            self.user_exists(c, target)
            if self.role(c, target) == 'OWNER':
                raise ApiError(409, 'OWNER_PROTECTED', '总管理员身份不可在此修改')
            ids = sorted(set(data.productIds)) if data.role == 'ADMIN' else []
            valid = {p['id'] for p in self.products(c)}
            if not set(ids) <= valid:
                raise ApiError(400, 'INVALID_PRODUCT', '产品不存在')
            c.execute('INSERT INTO official_roles VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET role=excluded.role,updated_at_ms=excluded.updated_at_ms', (target, data.role, self.now()))
            c.execute('DELETE FROM official_admin_products WHERE user_id=?', (target,))
            c.executemany('INSERT INTO official_admin_products VALUES(?,?)', [(target, pid) for pid in ids])
            self.audit(c, actor, target, 'ROLE_CHANGED', {'role': data.role, 'productIds': ids})
            return self.profile(c, target)

    def adjust_credits(self, actor, target, data):
        if not data.delta or not data.reason.strip():
            raise ApiError(400, 'INVALID_ADJUSTMENT', '填写非零积分与操作原因')
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            self.require(c, actor, owner=True)
            self.user_exists(c, target)
            key = f'adjust:{actor}:{data.requestId}'
            fp = fingerprint(data.model_dump())
            prior = c.execute('SELECT 1 FROM official_ledger WHERE user_id=? AND request_key=?', (target, key)).fetchone()
            result = self.credit(c, target, data.delta, 'ADJUSTMENT', data.reason.strip(), actor, key, fp)
            if not prior:
                self.audit(c, actor, target, 'CREDITS_ADJUSTED', {'delta': data.delta, 'reason': data.reason.strip()})
            return {'balance': result['balance_after']}

    def create_batch(self, actor, data):
        if not (data.credits or data.units or data.days) or ((data.units or data.days) and not data.productId):
            raise ApiError(400, 'INVALID_GRANT', '填写积分或指定产品权益')
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            self.require(c, actor, owner=True)
            fp = fingerprint(data.model_dump())
            prior = c.execute('SELECT * FROM official_batches WHERE created_by=? AND request_id=?', (actor, data.requestId)).fetchone()
            if prior:
                if prior['fingerprint'] != fp:
                    raise ApiError(409, 'IDEMPOTENCY_CONFLICT', '请求标识已用于另一批激活码')
                return {'id': prior['id'], 'codes': self.batch_codes(actor, data.requestId, prior['quantity']), 'quantity': prior['quantity']}
            if data.productId and not c.execute('SELECT 1 FROM official_products WHERE id=?', (data.productId,)).fetchone():
                raise ApiError(400, 'INVALID_PRODUCT', '产品不存在')
            if data.assignedTo:
                self.require(c, data.assignedTo)
                if self.role(c, data.assignedTo) != 'OWNER' and data.productId and not c.execute('SELECT 1 FROM official_admin_products WHERE user_id=? AND product_id=?', (data.assignedTo, data.productId)).fetchone():
                    raise ApiError(400, 'ADMIN_SCOPE', '该管理员没有此产品的管理权限')
            bid, now = random_id(), self.now()
            c.execute('INSERT INTO official_batches VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                      (bid, data.label.strip(), actor, data.assignedTo, data.productId, data.credits, data.units, data.days, data.quantity, now + data.validDays * DAY, None, now, data.requestId, fp))
            codes = self.batch_codes(actor, data.requestId, data.quantity)
            for code in codes:
                c.execute('INSERT INTO official_codes(code_hash,suffix,batch_id) VALUES(?,?,?)', (self.auth.hash('activation', code), code[-6:], bid))
            self.audit(c, actor, bid, 'BATCH_CREATED', {**data.model_dump(), 'codes': 'not logged'})
            return {'id': bid, 'codes': codes, 'quantity': len(codes)}

    def batch_codes(self, actor, request_id, quantity):
        # Deterministic for a caller's retry; the server secret supplies entropy.
        # Neither the batch list nor database stores plaintext activation codes.
        return ['ACT-' + self.auth.hash('activation-issue', f'{actor}:{request_id}:{i}')[:24].upper() for i in range(quantity)]

    def redeem(self, actor, data):
        now = self.now()
        # Commit the limiter independently so failed attempts cannot roll it back.
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            c.execute('DELETE FROM official_attempts WHERE created_at_ms<?', (now - 3_600_000,))
            if c.execute('SELECT COUNT(*) FROM official_attempts WHERE user_id=? AND created_at_ms>?', (actor, now - 60_000)).fetchone()[0] >= 10:
                raise ApiError(429, 'REDEEM_RATE_LIMIT', '操作频繁，请一分钟后重试')
            c.execute('INSERT INTO official_attempts VALUES(?,?)', (actor, now))
        code_hash = self.auth.hash('activation', data.code.strip().upper().replace(' ', ''))
        target = data.targetUserId or actor
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            self.user_exists(c, target)
            role = self.role(c, actor)
            row = c.execute('SELECT b.*,a.redeemed_at_ms,a.redeemed_for FROM official_codes a JOIN official_batches b ON b.id=a.batch_id WHERE a.code_hash=?', (code_hash,)).fetchone()
            if not row or row['revoked_at_ms'] or row['expires_at_ms'] <= now:
                raise ApiError(400, 'INVALID_CODE', '激活码无效、已撤销或已过期')
            if row['redeemed_at_ms'] is not None:
                raise ApiError(409, 'CODE_USED', '激活码已使用，请查看积分与产品记录')
            if target != actor or row['assigned_to']:
                self.require(c, actor)
            if role != 'OWNER':
                if target != actor and row['assigned_to'] != actor:
                    raise ApiError(403, 'CODE_NOT_ASSIGNED', '仅可使用分配给你的激活码为他人授权')
                if row['assigned_to'] and row['assigned_to'] != actor:
                    raise ApiError(403, 'CODE_NOT_ASSIGNED', '此批激活码已分配给其他管理员')
                if row['assigned_to'] and row['product_id'] and not c.execute('SELECT 1 FROM official_admin_products WHERE user_id=? AND product_id=?', (actor, row['product_id'])).fetchone():
                    raise ApiError(403, 'ADMIN_SCOPE', '没有此产品的管理权限')
            self.credit(c, target, row['credits'], 'ACTIVATION', '激活码兑换 · ' + row['label'], actor,
                        'redeem:' + code_hash, code_hash, row['product_id'])
            self.grant(c, target, row['product_id'], row['units'], row['days'])
            c.execute('UPDATE official_codes SET redeemed_by=?,redeemed_for=?,redeemed_at_ms=? WHERE code_hash=?', (actor, target, now, code_hash))
            self.audit(c, actor, target, 'CODE_REDEEMED', {'batchId': row['id'], 'credits': row['credits'], 'productId': row['product_id'], 'units': row['units'], 'days': row['days']})
            return {'balance': self.balance(c, target), 'credits': row['credits'], 'units': row['units'], 'days': row['days'], 'productId': row['product_id']}

    def batches(self, actor):
        with self.db.connect() as c:
            role = self.require(c, actor)
            where, args = ('1=1', ()) if role == 'OWNER' else ('b.assigned_to=?', (actor,))
            return {'items': [dict(r) for r in c.execute(f'SELECT b.*,(SELECT COUNT(*) FROM official_codes a WHERE a.batch_id=b.id AND a.redeemed_at_ms IS NOT NULL) used FROM official_batches b WHERE {where} ORDER BY b.created_at_ms DESC LIMIT 100', args)]}

    def revoke_batch(self, actor, bid):
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            self.require(c, actor, owner=True)
            if not c.execute('UPDATE official_batches SET revoked_at_ms=? WHERE id=? AND revoked_at_ms IS NULL', (self.now(), bid)).rowcount:
                raise ApiError(404, 'BATCH_NOT_FOUND', '批次不存在或已经撤销')
            self.audit(c, actor, bid, 'BATCH_REVOKED', {})
            return {'revoked': True}

    def purchase(self, uid, data):
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            prior = c.execute('SELECT * FROM official_purchases WHERE user_id=? AND request_key=?', (uid, data.requestId)).fetchone()
            if prior:
                if prior['product_id'] != data.productId:
                    raise ApiError(409, 'IDEMPOTENCY_CONFLICT', '购买请求已用于另一产品')
                return dict(prior)
            p = c.execute("SELECT * FROM official_products WHERE id=? AND status='AVAILABLE'", (data.productId,)).fetchone()
            if not p or not (p['package_units'] or p['package_days']):
                raise ApiError(409, 'NOT_FOR_SALE', '该产品尚未开放购买')
            if p['price'] != data.expectedPrice:
                raise ApiError(409, 'PRICE_CHANGED', '产品价格已更新，请重新打开产品详情后购买')
            self.credit(c, uid, -p['price'], 'PURCHASE', '购买 · ' + p['name'], uid,
                        'purchase:' + data.requestId, fingerprint(data.model_dump()), p['id'])
            self.grant(c, uid, p['id'], p['package_units'], p['package_days'])
            oid = random_id()
            c.execute('INSERT INTO official_purchases VALUES(?,?,?,?,?,?,?,?)', (oid, uid, p['id'], p['price'], p['package_units'], p['package_days'], self.now(), data.requestId))
            self.audit(c, uid, oid, 'PRODUCT_PURCHASED', {'productId': p['id'], 'price': p['price']})
            return {'id': oid, 'product_id': p['id'], 'price': p['price']}

    def edit_product(self, actor, pid, data):
        url = urlsplit(data.entryUrl)
        if data.entryUrl and not ((data.entryUrl.startswith('/official/') and not url.netloc and not url.scheme) or (url.scheme == 'https' and url.hostname and not url.username and not url.password)):
            raise ApiError(400, 'INVALID_ENTRY_URL', '入口须为 HTTPS 网址或本站 /official/ 路径')
        if data.status == 'AVAILABLE' and not (data.packageDays or data.packageUnits):
            raise ApiError(400, 'EMPTY_PACKAGE', '上架前需配置权益次数或有效天数')
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            self.require(c, actor, owner=True)
            if not c.execute('UPDATE official_products SET name=?,name_en=?,description=?,entry_url=?,status=?,price=?,package_units=?,package_days=?,unit_point_cost=? WHERE id=?', (data.name.strip(), data.nameEn.strip(), data.description.strip(), data.entryUrl, data.status, data.price, data.packageUnits, data.packageDays, data.unitPointCost, pid)).rowcount:
                raise ApiError(404, 'PRODUCT_NOT_FOUND', '产品不存在')
            self.audit(c, actor, pid, 'PRODUCT_UPDATED', data.model_dump())
            return {'updated': True}

    def issue_key(self, actor, pid):
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            self.require(c, actor, owner=True)
            if not c.execute('SELECT 1 FROM official_products WHERE id=?', (pid,)).fetchone():
                raise ApiError(404, 'PRODUCT_NOT_FOUND', '产品不存在')
            kid, key = random_id(), 'opk_' + secrets.token_urlsafe(32)
            c.execute('INSERT INTO official_integration_keys VALUES(?,?,?,?,?,?)', (kid, pid, self.auth.hash('integration', key), key[-6:], None, self.now()))
            self.audit(c, actor, kid, 'INTEGRATION_KEY_CREATED', {'productId': pid})
            return {'id': kid, 'productId': pid, 'key': key}

    def usage(self, key, data):
        now, fp = self.now(), fingerprint(data.model_dump())
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            token = c.execute('SELECT product_id FROM official_integration_keys WHERE key_hash=? AND revoked_at_ms IS NULL', (self.auth.hash('integration', key),)).fetchone()
            if not token:
                raise ApiError(401, 'INVALID_PRODUCT_KEY', '产品凭据无效')
            pid = token['product_id']
            prior = c.execute('SELECT * FROM official_usage WHERE product_id=? AND event_id=?', (pid, data.eventId)).fetchone()
            if prior:
                if prior['fingerprint'] != fp:
                    raise ApiError(409, 'IDEMPOTENCY_CONFLICT', '用量事件标识已存在且内容不同')
                return {'id': prior['id'], 'points': prior['points'], 'replayed': True}
            self.user_exists(c, data.userId)
            e = c.execute('SELECT * FROM official_entitlements WHERE user_id=? AND product_id=?', (data.userId, pid)).fetchone()
            timed = e and (e['expires_at_ms'] or 0) > now
            if not e or (not timed and e['units'] < data.units):
                raise ApiError(403, 'ENTITLEMENT_REQUIRED', '产品权益或剩余次数不足')
            p = c.execute('SELECT unit_point_cost,name FROM official_products WHERE id=?', (pid,)).fetchone()
            points = p['unit_point_cost'] * data.units
            self.credit(c, data.userId, -points, 'USAGE', '使用 · ' + p['name'], None, 'usage:' + pid + ':' + data.eventId, fp, pid)
            if not timed:
                c.execute('UPDATE official_entitlements SET units=units-? WHERE user_id=? AND product_id=?', (data.units, data.userId, pid))
            eid = random_id()
            c.execute('INSERT INTO official_usage VALUES(?,?,?,?,?,?,?,?,?,?,?)', (eid, data.userId, pid, data.eventId, fp, data.units, points, data.inputTokens, data.cachedTokens, data.outputTokens, now))
            return {'id': eid, 'points': points, 'replayed': False}


def mount_workspace(app, w, current_user):
    r = APIRouter(prefix='/api/v1/console', tags=['official-workspace'])

    @r.get('/me')
    def me(uid: str = Depends(current_user)):
        with w.db.connect() as c:
            return w.profile(c, uid)

    @r.get('/products')
    def products():
        with w.db.connect() as c:
            return {'items': w.products(c)}

    @r.get('/dashboard')
    def dashboard(days: int = Query(7, ge=1, le=180), product: str = Query('all', max_length=80), uid: str = Depends(current_user)):
        return w.dashboard(uid, days, product)

    @r.post('/redeem')
    def redeem(body: Redeem, uid: str = Depends(current_user)):
        return w.redeem(uid, body)

    @r.post('/purchases')
    def purchase(body: Purchase, uid: str = Depends(current_user)):
        return w.purchase(uid, body)

    @r.get('/admin/users')
    def users(q: str = Query('', max_length=80), offset: int = Query(0, ge=0, le=1_000_000), uid: str = Depends(current_user)):
        return w.users(uid, q.strip(), offset)

    @r.get('/admin/assignees')
    def assignees(uid: str = Depends(current_user)):
        with w.db.connect() as c:
            w.require(c, uid, owner=True)
            ids = [row[0] for row in c.execute("SELECT user_id FROM official_roles WHERE role IN ('OWNER','ADMIN') ORDER BY updated_at_ms DESC LIMIT 500")]
            return {'items': [w.profile(c, target) for target in ids]}

    @r.patch('/admin/users/{target}/role')
    def change_role(target: str, body: RoleChange, uid: str = Depends(current_user)):
        return w.change_role(uid, target, body)

    @r.post('/admin/users/{target}/credits')
    def credits(target: str, body: CreditChange, uid: str = Depends(current_user)):
        return w.adjust_credits(uid, target, body)

    @r.get('/admin/batches')
    def batches(uid: str = Depends(current_user)):
        return w.batches(uid)

    @r.post('/admin/batches', status_code=201)
    def create_batch(body: BatchCreate, uid: str = Depends(current_user)):
        return w.create_batch(uid, body)

    @r.post('/admin/batches/{bid}/revoke')
    def revoke_batch(bid: str, uid: str = Depends(current_user)):
        return w.revoke_batch(uid, bid)

    @r.put('/admin/products/{pid}')
    def edit_product(pid: str, body: ProductEdit, uid: str = Depends(current_user)):
        return w.edit_product(uid, pid, body)

    @r.post('/admin/products/{pid}/keys', status_code=201)
    def issue_key(pid: str, uid: str = Depends(current_user)):
        return w.issue_key(uid, pid)

    @r.get('/admin/keys')
    def keys(uid: str = Depends(current_user)):
        with w.db.connect() as c:
            w.require(c, uid, owner=True)
            return {'items': [dict(row) for row in c.execute('SELECT id,product_id,suffix,revoked_at_ms,created_at_ms FROM official_integration_keys ORDER BY created_at_ms DESC LIMIT 100')]}

    @r.post('/admin/keys/{kid}/revoke')
    def revoke_key(kid: str, uid: str = Depends(current_user)):
        with w.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            w.require(c, uid, owner=True)
            if not c.execute('UPDATE official_integration_keys SET revoked_at_ms=? WHERE id=?', (w.now(), kid)).rowcount:
                raise ApiError(404, 'KEY_NOT_FOUND', '凭据不存在')
            w.audit(c, uid, kid, 'INTEGRATION_KEY_REVOKED', {})
            return {'revoked': True}

    @r.get('/admin/audit')
    def audit(offset: int = Query(0, ge=0, le=1_000_000), uid: str = Depends(current_user)):
        with w.db.connect() as c:
            role = w.require(c, uid)
            where, args = ('1=1', ()) if role == 'OWNER' else ('actor_id=?', (uid,))
            return {'items': [dict(row) for row in c.execute(f'SELECT * FROM official_audit WHERE {where} ORDER BY created_at_ms DESC,rowid DESC LIMIT 50 OFFSET ?', (*args, offset))]}

    @r.post('/integrations/usage')
    def usage(body: Usage, request: Request):
        key = request.headers.get('authorization', '').removeprefix('Bearer ')
        return w.usage(key, body)

    app.include_router(r)
