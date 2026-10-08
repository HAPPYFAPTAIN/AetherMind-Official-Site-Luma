"""可信产品用量上报与计费。"""
from __future__ import annotations

from typing import Optional

from pydantic import Field, model_validator

from .wallet import UsageEvent, charge, fingerprint
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
    model: Optional[str] = Field(default=None, max_length=120)
    coreMinutes: int = Field(default=0, ge=0, le=1_000_000)

    @model_validator(mode='after')
    def cached_within_input(self):
        if self.cachedTokens > self.inputTokens:
            raise ValueError('cached tokens exceed input tokens')
        return self


def record_usage(w, key, data):
    from ..admin.roles import user_exists
    now = w.now()
    # 新字段缺省时沿用旧字段集合计算指纹，保证迁移前已登记的事件重放仍判同一笔。
    payload = data.model_dump(exclude={'model', 'coreMinutes'}) if data.model is None and not data.coreMinutes else data.model_dump()
    fp = fingerprint(payload)
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        token = c.execute('SELECT product_id FROM official_integration_keys WHERE key_hash=? AND revoked_at_ms IS NULL', (w.auth.hash('integration', key),)).fetchone()
        if not token:
            raise ApiError(401, 'INVALID_PRODUCT_KEY', '产品凭据无效')
        pid = token['product_id']
        prior = c.execute('SELECT * FROM official_usage WHERE product_id=? AND event_id=?', (pid, data.eventId)).fetchone()
        if prior and prior['fingerprint'] != fp:
            raise ApiError(409, 'IDEMPOTENCY_CONFLICT', '用量事件标识已存在且内容不同')
        user_exists(c, data.userId)
        result = charge(w, c, user_id=data.userId, product_id=pid, event_id=data.eventId,
                        usage=UsageEvent(units=data.units, model=data.model,
                                         input_tokens=data.inputTokens, cached_tokens=data.cachedTokens,
                                         output_tokens=data.outputTokens, core_minutes=data.coreMinutes),
                        fingerprint_override=fp, now=now)
        return {'id': result.id, 'points': result.points, 'replayed': result.replayed}


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
