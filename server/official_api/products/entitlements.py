"""产品权益授予与购买。"""
from __future__ import annotations

from pydantic import Field

from ..billing.wallet import DAY, MAX_BALANCE, credit, fingerprint
from ..crypto import random_id
from ..errors import ApiError
from ..http import Strict


class Purchase(Strict):
    productId: str = Field(max_length=80)
    requestId: str = Field(min_length=8, max_length=80)
    expectedPrice: int = Field(ge=0, le=10_000_000)


def grant(w, c, uid, product, units, days):
    if not product:
        return
    old = c.execute('SELECT * FROM official_entitlements WHERE user_id=? AND product_id=?', (uid, product)).fetchone()
    total = (old['units'] if old else 0) + units
    expiry = old['expires_at_ms'] if old else None
    if days:
        expiry = max(expiry or 0, w.now()) + days * DAY
    if total > MAX_BALANCE:
        raise ApiError(400, 'ENTITLEMENT_LIMIT', '可用次数超过上限')
    c.execute('INSERT INTO official_entitlements VALUES(?,?,?,?) ON CONFLICT(user_id,product_id) DO UPDATE SET units=excluded.units,expires_at_ms=excluded.expires_at_ms',
              (uid, product, total, expiry))


def purchase(w, uid, data):
    from ..admin.roles import audit
    with w.db.connect() as c:
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
        credit(w, c, uid, -p['price'], 'PURCHASE', '购买 · ' + p['name'], uid,
               'purchase:' + data.requestId, fingerprint(data.model_dump()), p['id'])
        grant(w, c, uid, p['id'], p['package_units'], p['package_days'])
        oid = random_id()
        c.execute('INSERT INTO official_purchases VALUES(?,?,?,?,?,?,?,?)', (oid, uid, p['id'], p['price'], p['package_units'], p['package_days'], w.now(), data.requestId))
        audit(w, c, uid, oid, 'PRODUCT_PURCHASED', {'productId': p['id'], 'price': p['price']})
        return {'id': oid, 'product_id': p['id'], 'price': p['price']}
