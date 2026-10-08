"""/api/v1/console 用量上报与集成凭据路由。"""
from __future__ import annotations

from fastapi import APIRouter, Depends, Request

from .usage import Usage
from ..errors import ApiError


def mount_billing_routes(app, w, current_user):
    r = APIRouter(prefix='/api/v1/console', tags=['official-workspace'])

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

    @r.post('/integrations/usage')
    def usage(body: Usage, request: Request):
        key = request.headers.get('authorization', '').removeprefix('Bearer ')
        return w.usage(key, body)

    app.include_router(r)
