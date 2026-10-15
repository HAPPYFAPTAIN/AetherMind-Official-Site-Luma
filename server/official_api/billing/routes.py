"""/api/v1/console 用量上报、集成凭据与计量费率路由。"""
from __future__ import annotations

from fastapi import APIRouter, Depends, Request

from .providers import ProviderEdit, list_providers, refresh_dsh_model_settings, set_provider
from .rates import (
    ModelEdit,
    RateEdit,
    UserModelAccessEdit,
    get_models,
    get_rates,
    set_model,
    set_rate,
    set_user_model_access,
    user_model_access,
)
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

    @r.get('/admin/rates')
    def rates(uid: str = Depends(current_user)):
        with w.db.connect() as c:
            w.require(c, uid, owner=True)
            return {'items': get_rates(c)}

    @r.put('/admin/rates')
    def upsert_rate(body: RateEdit, uid: str = Depends(current_user)):
        with w.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            w.require(c, uid, owner=True)
            saved = set_rate(w, c, body, uid)
            w.audit(c, uid, f'{body.scope}:{body.key}', 'RATE_UPDATED', body.model_dump())
            return saved

    @r.get('/admin/models')
    def models(uid: str = Depends(current_user)):
        with w.db.connect() as c:
            w.require(c, uid, owner=True)
            return {'items': get_models(c)}

    @r.put('/admin/models')
    def upsert_model(body: ModelEdit, uid: str = Depends(current_user)):
        with w.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            w.require(c, uid, owner=True)
            saved = set_model(w, c, body)
            w.audit(c, uid, body.model, 'MODEL_UPDATED', body.model_dump())
        return {**saved, "sync": refresh_dsh_model_settings()}

    @r.get('/admin/providers')
    def providers(uid: str = Depends(current_user)):
        with w.db.connect() as c:
            w.require(c, uid, owner=True)
            return {'items': list_providers(c, w)}

    @r.put('/admin/providers')
    def upsert_provider(body: ProviderEdit, uid: str = Depends(current_user)):
        with w.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            w.require(c, uid, owner=True)
            saved = set_provider(w, c, body, uid)
            w.audit(c, uid, body.provider, 'LLM_PROVIDER_UPDATED', {
                'provider': body.provider,
                'api': body.api,
                'baseUrl': body.baseUrl,
                'hasApiKey': bool(body.apiKey and body.apiKey.strip()),
                'enabled': body.enabled,
            })
        return {**saved, "sync": refresh_dsh_model_settings()}

    @r.get('/admin/users/{target}/models')
    def user_models(target: str, uid: str = Depends(current_user)):
        with w.db.connect() as c:
            w.require(c, uid, owner=True)
            w.user_exists(c, target)
            return {'items': user_model_access(c, target)}

    @r.put('/admin/users/{target}/models')
    def update_user_models(target: str, body: UserModelAccessEdit, uid: str = Depends(current_user)):
        with w.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            w.require(c, uid, owner=True)
            saved = set_user_model_access(w, c, target, body.models, uid)
            w.audit(c, uid, target, 'USER_MODEL_ACCESS_UPDATED', {'models': sorted(set(body.models))})
        return {'items': saved, 'sync': refresh_dsh_model_settings()}

    @r.post('/integrations/usage')
    def usage(body: Usage, request: Request):
        key = request.headers.get('authorization', '').removeprefix('Bearer ')
        return w.usage(key, body)

    app.include_router(r)
