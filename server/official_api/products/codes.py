"""激活码批次：签发、兑换（含 md-exp 资格联动）与撤销。"""
from __future__ import annotations

from pydantic import Field

from .entitlements import grant
from ..billing.wallet import DAY, credit, fingerprint
from ..crypto import random_id
from ..errors import ApiError
from ..http import Strict


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


def batch_codes(w, actor, request_id, quantity):
    # Deterministic for a caller's retry; the server secret supplies entropy.
    # Neither the batch list nor database stores plaintext activation codes.
    return ['ACT-' + w.auth.hash('activation-issue', f'{actor}:{request_id}:{i}')[:24].upper() for i in range(quantity)]


def create_batch(w, actor, data):
    from ..admin.roles import require, role, audit
    if not (data.credits or data.units or data.days or data.productId == 'md-exp') or ((data.units or data.days) and not data.productId):
        raise ApiError(400, 'INVALID_GRANT', '填写积分或指定产品权益')
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        require(c, actor, owner=True)
        fp = fingerprint(data.model_dump())
        prior = c.execute('SELECT * FROM official_batches WHERE created_by=? AND request_id=?', (actor, data.requestId)).fetchone()
        if prior:
            if prior['fingerprint'] != fp:
                raise ApiError(409, 'IDEMPOTENCY_CONFLICT', '请求标识已用于另一批激活码')
            return {'id': prior['id'], 'codes': batch_codes(w, actor, data.requestId, prior['quantity']), 'quantity': prior['quantity']}
        if data.productId and not c.execute('SELECT 1 FROM official_products WHERE id=?', (data.productId,)).fetchone():
            raise ApiError(400, 'INVALID_PRODUCT', '产品不存在')
        if data.assignedTo:
            require(c, data.assignedTo)
            if role(c, data.assignedTo) != 'OWNER' and data.productId and not c.execute('SELECT 1 FROM official_admin_products WHERE user_id=? AND product_id=?', (data.assignedTo, data.productId)).fetchone():
                raise ApiError(400, 'ADMIN_SCOPE', '该管理员没有此产品的管理权限')
        bid, now = random_id(), w.now()
        c.execute('INSERT INTO official_batches VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                  (bid, data.label.strip(), actor, data.assignedTo, data.productId, data.credits, data.units, data.days, data.quantity, now + data.validDays * DAY, None, now, data.requestId, fp))
        codes = batch_codes(w, actor, data.requestId, data.quantity)
        for code in codes:
            c.execute('INSERT INTO official_codes(code_hash,suffix,batch_id) VALUES(?,?,?)', (w.auth.hash('activation', code), code[-6:], bid))
        audit(w, c, actor, bid, 'BATCH_CREATED', {**data.model_dump(), 'codes': 'not logged'})
        return {'id': bid, 'codes': codes, 'quantity': len(codes)}


def redeem(w, actor, data):
    from ..admin.roles import require, role, user_exists, audit
    from ..billing.wallet import balance
    now = w.now()
    # Commit the limiter independently so failed attempts cannot roll it back.
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        c.execute('DELETE FROM official_attempts WHERE created_at_ms<?', (now - 3_600_000,))
        if c.execute('SELECT COUNT(*) FROM official_attempts WHERE user_id=? AND created_at_ms>?', (actor, now - 60_000)).fetchone()[0] >= 10:
            raise ApiError(429, 'REDEEM_RATE_LIMIT', '操作频繁，请一分钟后重试')
        c.execute('INSERT INTO official_attempts VALUES(?,?)', (actor, now))
    code_hash = w.auth.hash('activation', data.code.strip().upper().replace(' ', ''))
    target = data.targetUserId or actor
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        user_exists(c, target)
        actor_role = role(c, actor)
        row = c.execute('SELECT b.*,a.redeemed_at_ms,a.redeemed_for FROM official_codes a JOIN official_batches b ON b.id=a.batch_id WHERE a.code_hash=?', (code_hash,)).fetchone()
        if not row or row['revoked_at_ms'] or row['expires_at_ms'] <= now:
            raise ApiError(400, 'INVALID_CODE', '激活码无效、已撤销或已过期')
        if row['redeemed_at_ms'] is not None:
            raise ApiError(409, 'CODE_USED', '激活码已使用，请查看积分与产品记录')
        if target != actor or row['assigned_to']:
            require(c, actor)
        if actor_role != 'OWNER':
            if target != actor and row['assigned_to'] != actor:
                raise ApiError(403, 'CODE_NOT_ASSIGNED', '仅可使用分配给你的激活码为他人授权')
            if row['assigned_to'] and row['assigned_to'] != actor:
                raise ApiError(403, 'CODE_NOT_ASSIGNED', '此批激活码已分配给其他管理员')
            if row['assigned_to'] and row['product_id'] and not c.execute('SELECT 1 FROM official_admin_products WHERE user_id=? AND product_id=?', (actor, row['product_id'])).fetchone():
                raise ApiError(403, 'ADMIN_SCOPE', '没有此产品的管理权限')
        credit(w, c, target, row['credits'], 'ACTIVATION', '激活码兑换 · ' + row['label'], actor,
               'redeem:' + code_hash, code_hash, row['product_id'])
        grant(w, c, target, row['product_id'], row['units'], row['days'])
        if row['product_id'] == 'md-exp':
            source = 'activation:' + code_hash
            c.execute(
                'INSERT OR IGNORE INTO community_invitations(code,label,created_by,created_at_ms,expires_at_ms,product_id) VALUES(?,?,?,?,?,?)',
                (source, row['label'], actor, now, now + 3650 * DAY, 'md-exp'),
            )
            c.execute(
                'INSERT OR IGNORE INTO official_md_agent_qualifications VALUES(?,?,?,?)',
                (target, 'md-exp', source, now),
            )
        c.execute('UPDATE official_codes SET redeemed_by=?,redeemed_for=?,redeemed_at_ms=? WHERE code_hash=?', (actor, target, now, code_hash))
        audit(w, c, actor, target, 'CODE_REDEEMED', {'batchId': row['id'], 'credits': row['credits'], 'productId': row['product_id'], 'units': row['units'], 'days': row['days']})
        return {'balance': balance(c, target), 'credits': row['credits'], 'units': row['units'], 'days': row['days'], 'productId': row['product_id']}


def batches(w, actor):
    from ..admin.roles import require
    with w.db.connect() as c:
        actor_role = require(c, actor)
        where, args = ('1=1', ()) if actor_role == 'OWNER' else ('b.assigned_to=?', (actor,))
        return {'items': [dict(r) for r in c.execute(f'SELECT b.*,(SELECT COUNT(*) FROM official_codes a WHERE a.batch_id=b.id AND a.redeemed_at_ms IS NOT NULL) used FROM official_batches b WHERE {where} ORDER BY b.created_at_ms DESC LIMIT 100', args)]}


def revoke_batch(w, actor, bid):
    from ..admin.roles import require, audit
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        require(c, actor, owner=True)
        if not c.execute('UPDATE official_batches SET revoked_at_ms=? WHERE id=? AND revoked_at_ms IS NULL', (w.now(), bid)).rowcount:
            raise ApiError(404, 'BATCH_NOT_FOUND', '批次不存在或已经撤销')
        audit(w, c, actor, bid, 'BATCH_REVOKED', {})
        return {'revoked': True}
