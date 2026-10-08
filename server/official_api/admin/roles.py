"""官网工作台角色与审计。"""
from __future__ import annotations

import json
from typing import Literal

from pydantic import Field

from ..auth.service import normalize_phone
from ..crypto import random_id
from ..errors import ApiError
from ..http import Strict


class RoleChange(Strict):
    role: Literal['ADMIN', 'USER']
    productIds: list[str] = Field(default_factory=list, max_length=30)


def role(c, uid):
    row = c.execute('SELECT role FROM official_roles WHERE user_id=?', (uid,)).fetchone()
    return row['role'] if row else 'USER'


def require(c, uid, owner=False):
    current = role(c, uid)
    if current != 'OWNER' and (owner or current != 'ADMIN'):
        raise ApiError(403, 'FORBIDDEN', '需要总管理员权限' if owner else '需要管理员权限')
    return current


def user_exists(c, uid):
    if not c.execute('SELECT 1 FROM users WHERE id=?', (uid,)).fetchone():
        raise ApiError(404, 'USER_NOT_FOUND', '用户不存在')


def audit(w, c, actor, target, action, detail):
    c.execute('INSERT INTO official_audit VALUES(?,?,?,?,?,?)',
              (random_id(), actor, target, action, json.dumps(detail, ensure_ascii=False), w.now()))


def bootstrap_owner(w, phone):
    digest = w.auth.hash('phone', normalize_phone(phone))
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        user = c.execute('SELECT id FROM users WHERE phone_hash=?', (digest,)).fetchone()
        if not user:
            raise ValueError('The specified account must sign in with verified SMS first.')
        uid = user['id']
        existing = c.execute("SELECT user_id FROM official_roles WHERE role='OWNER'").fetchone()
        if existing and existing['user_id'] != uid:
            raise ValueError('A different owner already exists; refusing replacement.')
        if not existing:
            c.execute('INSERT INTO official_roles VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET role=excluded.role,updated_at_ms=excluded.updated_at_ms', (uid, 'OWNER', w.now()))
            c.execute("INSERT OR REPLACE INTO community_admins VALUES(?,'ADMIN',?)", (uid, w.now()))
            audit(w, c, uid, uid, 'OWNER_BOOTSTRAP', {'source': 'operator-authorized'})
        return uid


def change_role(w, actor, target, data):
    from ..products.catalog import products
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        require(c, actor, owner=True)
        user_exists(c, target)
        if role(c, target) == 'OWNER':
            raise ApiError(409, 'OWNER_PROTECTED', '总管理员身份不可在此修改')
        ids = sorted(set(data.productIds)) if data.role == 'ADMIN' else []
        valid = {p['id'] for p in products(c)}
        if not set(ids) <= valid:
            raise ApiError(400, 'INVALID_PRODUCT', '产品不存在')
        c.execute('INSERT INTO official_roles VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET role=excluded.role,updated_at_ms=excluded.updated_at_ms', (target, data.role, w.now()))
        c.execute('DELETE FROM official_admin_products WHERE user_id=?', (target,))
        c.executemany('INSERT INTO official_admin_products VALUES(?,?)', [(target, pid) for pid in ids])
        audit(w, c, actor, target, 'ROLE_CHANGED', {'role': data.role, 'productIds': ids})
        return w.profile(c, target)
