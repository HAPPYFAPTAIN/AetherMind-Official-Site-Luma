"""/api/v1/console 产品目录、兑换与批次管理路由。"""
from __future__ import annotations

from fastapi import APIRouter, Depends

from .catalog import ProductEdit
from .codes import BatchCreate, Redeem
from .entitlements import Purchase


def mount_product_routes(app, w, current_user):
    r = APIRouter(prefix='/api/v1/console', tags=['official-workspace'])

    @r.get('/products')
    def products():
        with w.db.connect() as c:
            return {'items': w.products(c)}

    @r.post('/redeem')
    def redeem(body: Redeem, uid: str = Depends(current_user)):
        return w.redeem(uid, body)

    @r.post('/purchases')
    def purchase(body: Purchase, uid: str = Depends(current_user)):
        return w.purchase(uid, body)

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

    app.include_router(r)
