"""/api/v1/console 个人信息、看板与管理员路由。"""
from __future__ import annotations

from fastapi import APIRouter, Depends, Query

from .roles import RoleChange
from ..billing.wallet import CreditChange
from pydantic import Field
from ..http import Strict
from ..errors import ApiError
from ..billing.wallet import DAY


class AccessDuration(Strict):
    days: int = Field(ge=1, le=3650)


def mount_admin_console(app, w, current_user):
    r = APIRouter(prefix='/api/v1/console', tags=['official-workspace'])

    @r.get('/me')
    def me(uid: str = Depends(current_user)):
        with w.db.connect() as c:
            return w.profile(c, uid)

    @r.get('/dashboard')
    def dashboard(days: int = Query(7, ge=1, le=180), product: str = Query('all', max_length=80), uid: str = Depends(current_user)):
        return w.dashboard(uid, days, product)

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

    @r.get('/admin/audit')
    def audit(offset: int = Query(0, ge=0, le=1_000_000), uid: str = Depends(current_user)):
        with w.db.connect() as c:
            role = w.require(c, uid)
            where, args = ('1=1', ()) if role == 'OWNER' else ('actor_id=?', (uid,))
            return {'items': [dict(row) for row in c.execute(f'SELECT * FROM official_audit WHERE {where} ORDER BY created_at_ms DESC,rowid DESC LIMIT 50 OFFSET ?', (*args, offset))]}

    @r.put('/admin/users/{target}/products/{pid}/duration')
    def duration(target: str, pid: str, body: AccessDuration, uid: str = Depends(current_user)):
        with w.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            w.require(c, uid, owner=True)
            w.user_exists(c, target)
            if not c.execute('SELECT 1 FROM official_products WHERE id=?', (pid,)).fetchone():
                raise ApiError(404, 'PRODUCT_NOT_FOUND', '产品不存在')
            expiry = w.now() + body.days * DAY
            c.execute('INSERT INTO official_entitlements VALUES(?,?,0,?) ON CONFLICT(user_id,product_id) DO UPDATE SET units=0,expires_at_ms=excluded.expires_at_ms', (target, pid, expiry))
            w.audit(c, uid, target, 'PRODUCT_DURATION_SET', {'productId': pid, 'days': body.days, 'expiresAt': expiry})
            return {'expiresAt': expiry}

    app.include_router(r)
