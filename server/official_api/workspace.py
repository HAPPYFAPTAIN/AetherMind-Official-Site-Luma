"""Official-site account workspace facade, backed by the existing verified SMS identities.

逻辑已拆分至 products/、billing/、admin/ 子模块；本类负责组装并保持既有调用接口。
"""
from __future__ import annotations

import time
from datetime import datetime, timedelta, timezone

from .admin import roles as _roles
from .admin.roles import RoleChange
from .billing import usage as _usage, wallet as _wallet
from .billing.usage import Usage
from .billing.wallet import DAY, MAX_BALANCE, ChargeResult, CreditChange, UsageEvent, fingerprint
from .crypto import random_id
from .http import Strict
from .products import catalog as _catalog, codes as _codes, entitlements as _entitlements
from .products.catalog import CATALOG, ProductEdit
from .products.codes import BatchCreate, Redeem
from .products.entitlements import Purchase

TZ = timezone(timedelta(hours=8))

__all__ = [
    'CATALOG', 'DAY', 'MAX_BALANCE', 'TZ', 'Strict', 'fingerprint', 'Workspace', 'mount_workspace',
    'BatchCreate', 'ChargeResult', 'CreditChange', 'ProductEdit', 'Purchase', 'Redeem', 'RoleChange', 'Usage',
    'UsageEvent',
]


class Workspace:
    def __init__(self, database, auth):
        self.db, self.auth = database, auth
        self.now = lambda: int(time.time() * 1000)

    def initialize(self):
        # 表结构由 Database.migrate() 统一执行（db/migrations/），这里只负责产品目录种子数据。
        with self.db.connect() as c:
            for pid, name, en, desc, image in CATALOG:
                c.execute('INSERT OR IGNORE INTO official_products(id,name,name_en,description,image) VALUES(?,?,?,?,?)',
                          (pid, name, en, desc, f'/assets/products/{image}.png'))
                c.execute(
                    "INSERT OR IGNORE INTO official_rates(id,scope,key,points_per_unit,updated_at_ms) VALUES(?,?,?,?,?)",
                    (random_id(), 'product-unit', pid, 0, self.now()),
                )
            c.execute("UPDATE official_products SET entry_url=? WHERE id=? AND (entry_url='' OR entry_url IS NULL)",
                      ('/official/products/learn-everything/', 'learn-everything'))

    # --- 角色与审计（admin.roles） ---
    def role(self, c, uid):
        return _roles.role(c, uid)

    def require(self, c, uid, owner=False):
        return _roles.require(c, uid, owner=owner)

    def user_exists(self, c, uid):
        _roles.user_exists(c, uid)

    def audit(self, c, actor, target, action, detail):
        _roles.audit(self, c, actor, target, action, detail)

    def bootstrap_owner(self, phone):
        return _roles.bootstrap_owner(self, phone)

    def change_role(self, actor, target, data):
        return _roles.change_role(self, actor, target, data)

    # --- 积分钱包（billing.wallet） ---
    def balance(self, c, uid):
        return _wallet.balance(c, uid)

    def credit(self, c, uid, delta, kind, reason, actor, key, fp, product=None):
        return _wallet.credit(self, c, uid, delta, kind, reason, actor, key, fp, product)

    def adjust_credits(self, actor, target, data):
        return _wallet.adjust_credits(self, actor, target, data)

    def charge(self, c, *, user_id, product_id, event_id, usage, reason=None, actor=None, allow_clamp=False):
        return _wallet.charge(self, c, user_id=user_id, product_id=product_id, event_id=event_id,
                              usage=usage, reason=reason, actor=actor, allow_clamp=allow_clamp)

    # --- 产品目录与权益（products） ---
    def products(self, c):
        return _catalog.products(c)

    def edit_product(self, actor, pid, data):
        return _catalog.edit_product(self, actor, pid, data)

    def grant(self, c, uid, product, units, days):
        _entitlements.grant(self, c, uid, product, units, days)

    def purchase(self, uid, data):
        return _entitlements.purchase(self, uid, data)

    # --- 激活码（products.codes） ---
    def create_batch(self, actor, data):
        return _codes.create_batch(self, actor, data)

    def batch_codes(self, actor, request_id, quantity):
        return _codes.batch_codes(self, actor, request_id, quantity)

    def redeem(self, actor, data):
        return _codes.redeem(self, actor, data)

    def batches(self, actor):
        return _codes.batches(self, actor)

    def revoke_batch(self, actor, bid):
        return _codes.revoke_batch(self, actor, bid)

    # --- 用量与集成凭据（billing.usage） ---
    def issue_key(self, actor, pid):
        return _usage.issue_key(self, actor, pid)

    def usage(self, key, data):
        return _usage.record_usage(self, key, data)

    # --- 聚合查询 ---
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
        import re
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


def mount_workspace(app, w, current_user):
    from .admin.routes import mount_admin_console
    from .billing.routes import mount_billing_routes
    from .products.routes import mount_product_routes
    mount_admin_console(app, w, current_user)
    mount_product_routes(app, w, current_user)
    mount_billing_routes(app, w, current_user)
