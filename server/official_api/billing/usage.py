"""可信产品用量上报与计费。"""
from __future__ import annotations

from pydantic import Field, model_validator

from .wallet import credit, fingerprint
from ..crypto import random_id
from ..errors import ApiError
from ..http import Strict


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


def record_usage(w, key, data):
    from ..admin.roles import user_exists
    now, fp = w.now(), fingerprint(data.model_dump())
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        token = c.execute('SELECT product_id FROM official_integration_keys WHERE key_hash=? AND revoked_at_ms IS NULL', (w.auth.hash('integration', key),)).fetchone()
        if not token:
            raise ApiError(401, 'INVALID_PRODUCT_KEY', '产品凭据无效')
        pid = token['product_id']
        prior = c.execute('SELECT * FROM official_usage WHERE product_id=? AND event_id=?', (pid, data.eventId)).fetchone()
        if prior:
            if prior['fingerprint'] != fp:
                raise ApiError(409, 'IDEMPOTENCY_CONFLICT', '用量事件标识已存在且内容不同')
            return {'id': prior['id'], 'points': prior['points'], 'replayed': True}
        user_exists(c, data.userId)
        e = c.execute('SELECT * FROM official_entitlements WHERE user_id=? AND product_id=?', (data.userId, pid)).fetchone()
        timed = e and (e['expires_at_ms'] or 0) > now
        if not e or (not timed and e['units'] < data.units):
            raise ApiError(403, 'ENTITLEMENT_REQUIRED', '产品权益或剩余次数不足')
        p = c.execute('SELECT unit_point_cost,name FROM official_products WHERE id=?', (pid,)).fetchone()
        points = p['unit_point_cost'] * data.units
        credit(w, c, data.userId, -points, 'USAGE', '使用 · ' + p['name'], None, 'usage:' + pid + ':' + data.eventId, fp, pid)
        if not timed:
            c.execute('UPDATE official_entitlements SET units=units-? WHERE user_id=? AND product_id=?', (data.units, data.userId, pid))
        eid = random_id()
        c.execute('INSERT INTO official_usage VALUES(?,?,?,?,?,?,?,?,?,?,?)', (eid, data.userId, pid, data.eventId, fp, data.units, points, data.inputTokens, data.cachedTokens, data.outputTokens, now))
        return {'id': eid, 'points': points, 'replayed': False}


def issue_key(w, actor, pid):
    import secrets
    from ..admin.roles import require, audit
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        require(c, actor, owner=True)
        if not c.execute('SELECT 1 FROM official_products WHERE id=?', (pid,)).fetchone():
            raise ApiError(404, 'PRODUCT_NOT_FOUND', '产品不存在')
        kid, key = random_id(), 'opk_' + secrets.token_urlsafe(32)
        c.execute('INSERT INTO official_integration_keys VALUES(?,?,?,?,?,?)', (kid, pid, w.auth.hash('integration', key), key[-6:], None, w.now()))
        audit(w, c, actor, kid, 'INTEGRATION_KEY_CREATED', {'productId': pid})
        return {'id': kid, 'productId': pid, 'key': key}
