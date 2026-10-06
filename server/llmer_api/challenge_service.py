"""Versioned challenge packs: atomic trial allocation and channel-verified purchases.

Question selection is deterministic. This product never queues an LLM job.
"""
import re
import sqlite3
import uuid
import os
from .errors import ApiError
from .paid_contract import contract
from .paid_service import now_ms


class ChallengeService:
    def __init__(self, paid):
        self.paid, self.db = paid, paid.db
        with self.db.connect() as c:
            c.executescript('''
                CREATE TABLE IF NOT EXISTS challenge_orders(
                    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    pack_id TEXT NOT NULL, amount_fen INTEGER NOT NULL, status TEXT NOT NULL,
                    transaction_id TEXT UNIQUE, created_ms INTEGER NOT NULL, updated_ms INTEGER NOT NULL);
                CREATE UNIQUE INDEX IF NOT EXISTS challenge_active_order
                    ON challenge_orders(user_id,pack_id) WHERE status IN ('NONE','PENDING','PAID');
                CREATE TABLE IF NOT EXISTS challenge_runs(
                    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    request_id TEXT NOT NULL, pack_id TEXT NOT NULL, form_id TEXT NOT NULL,
                    theme_id TEXT NOT NULL, source TEXT NOT NULL, created_ms INTEGER NOT NULL,
                    PRIMARY KEY(user_id,request_id));
            ''')

    @property
    def pack(self):
        return contract()['challengePack']

    def capabilities(self):
        p = self.pack
        return {key: p[key] for key in ('id', 'version', 'name', 'amountFen', 'freeTrials', 'scope', 'themes')} | {
            'enabled': p.get('enabled', False) is True,
            'readyToPurchase': bool(p.get('enabled', False) is True and self.paid.payment.available and self.paid.identity.available
                                   and os.getenv('CHALLENGE_PACK_PAYMENT_ENABLED', '').lower() == 'true')}

    def identity(self, user_id):
        with self.db.connect() as c:
            row = c.execute('SELECT openid FROM paid_identities WHERE user_id=?', (user_id,)).fetchone()
        if not row:
            raise ApiError(409, 'WECHAT_IDENTITY_REQUIRED', '请先登录微信，以保存挑战次数和购买权益')
        return row['openid']

    def require_order(self, user_id, oid):
        with self.db.connect() as c:
            row = c.execute('SELECT * FROM challenge_orders WHERE id=? AND user_id=?', (oid, user_id)).fetchone()
        if not row or row['pack_id'] != self.pack['id']:
            raise ApiError(404, 'CHALLENGE_ORDER_NOT_FOUND', '挑战订单不存在')
        return dict(row)

    def latest_order(self, user_id):
        with self.db.connect() as c:
            row = c.execute('SELECT * FROM challenge_orders WHERE user_id=? AND pack_id=? ORDER BY created_ms DESC,rowid DESC LIMIT 1',
                            (user_id, self.pack['id'])).fetchone()
        return dict(row) if row else None

    def public_order(self, row):
        return {'id': row['id'], 'packId': row['pack_id'], 'amountFen': row['amount_fen'],
                'status': row['status'], 'verified': row['status'] == 'PAID'}

    def access(self, user_id, verify=True):
        self.identity(user_id)
        order = self.latest_order(user_id)
        if order and verify and order['status'] in ('PENDING', 'PAID'):
            self.verify_order(user_id, order['id'])
            order = self.require_order(user_id, order['id'])
        with self.db.connect() as c:
            runs = c.execute('SELECT theme_id,form_id,source FROM challenge_runs WHERE user_id=? AND pack_id=? ORDER BY created_ms,rowid',
                             (user_id, self.pack['id'])).fetchall()
        used = [r['theme_id'] for r in runs if r['source'] == 'trial']
        return {'packId': self.pack['id'], 'entitled': bool(order and order['status'] == 'PAID'),
                'trialRemaining': max(0, self.pack['freeTrials'] - len(used)), 'trialThemesUsed': used,
                'usedFormIds': [r['form_id'] for r in runs],
                'order': self.public_order(order) if order else None}

    def create_order(self, user_id, code):
        if self.pack.get('enabled') is not True:
            raise ApiError(503, 'CHALLENGE_PACK_PAUSED', '挑战拓展包暂未启用')
        self.identity(user_id)
        if not self.capabilities()['readyToPurchase']:
            raise ApiError(503, 'CHALLENGE_PAYMENT_NOT_READY', '挑战拓展包支付尚未开通，本次未发起付款')
        old = self.latest_order(user_id)
        if old and old['status'] in ('PENDING', 'PAID'):
            self.verify_order(user_id, old['id'])
            old = self.require_order(user_id, old['id'])
            if old['status'] == 'PAID':
                return self.public_order(old)
        identity = self.paid.identity.exchange(code)
        self.paid.bind_identity(user_id, identity['openid'])
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            row = c.execute("SELECT * FROM challenge_orders WHERE user_id=? AND pack_id=? AND status IN ('NONE','PENDING','PAID')",
                            (user_id, self.pack['id'])).fetchone()
            if not row:
                oid, ts = uuid.uuid4().hex, now_ms()
                c.execute("INSERT INTO challenge_orders VALUES(?,?,?,?, 'NONE',NULL,?,?)",
                          (oid, user_id, self.pack['id'], self.pack['amountFen'], ts, ts))
                row = c.execute('SELECT * FROM challenge_orders WHERE id=?', (oid,)).fetchone()
            row = dict(row)
        if row['status'] == 'PAID':
            return self.public_order(row)
        # The merchant gateway must map this planId to a separate 99-fen game-item SKU.
        payment = self.paid.payment.create({'merchantOrderId': row['id'], 'planId': row['pack_id'],
                                           'amountFen': row['amount_fen'], 'currency': 'CNY'}, identity)
        with self.db.connect() as c:
            c.execute("UPDATE challenge_orders SET status='PENDING',updated_ms=? WHERE id=? AND status IN ('NONE','PENDING')",
                      (now_ms(), row['id']))
        current = self.require_order(user_id, row['id'])
        if current['status'] in ('CLOSED', 'REFUNDED'):
            raise ApiError(409, 'CHALLENGE_ORDER_CLOSED', '订单已关闭，请刷新购买状态')
        return self.public_order(current) | ({'payment': payment} if current['status'] != 'PAID' else {})

    def verify_order(self, user_id, oid):
        row = self.require_order(user_id, oid)
        if row['status'] == 'NONE':
            return self.public_order(row)
        result = self.paid.payment.query(row, self.identity(user_id))
        status = result.get('status')
        if status not in ('PENDING', 'PAID', 'CLOSED', 'REFUNDED'):
            raise ApiError(502, 'PAYMENT_RECEIPT_INVALID', '支付状态无效')
        if status == 'PAID' and not isinstance(result.get('transactionId'), str):
            raise ApiError(502, 'PAYMENT_RECEIPT_INVALID', '缺少支付交易编号')
        try:
            with self.db.connect() as c:
                c.execute('BEGIN IMMEDIATE')
                current = c.execute('SELECT * FROM challenge_orders WHERE id=?', (oid,)).fetchone()
                if not current:
                    raise ApiError(404, 'CHALLENGE_ORDER_NOT_FOUND', '挑战订单不存在')
                if current['status'] == 'REFUNDED' or (current['status'] == 'PAID' and status in ('PENDING', 'CLOSED')):
                    return self.public_order(dict(current))
                transaction = result.get('transactionId') if status == 'PAID' else current['transaction_id']
                if status == 'PAID':
                    if not transaction or c.execute('SELECT 1 FROM paid_cases WHERE transaction_id=?', (transaction,)).fetchone():
                        raise ApiError(409, 'PAYMENT_RECEIPT_REUSED', '支付回执已用于其他订单')
                c.execute('UPDATE challenge_orders SET status=?,transaction_id=?,updated_ms=? WHERE id=?',
                          (status, transaction, now_ms(), oid))
        except sqlite3.IntegrityError as error:
            raise ApiError(409, 'PAYMENT_RECEIPT_REUSED', '支付回执已用于其他订单') from error
        return self.public_order(self.require_order(user_id, oid))

    def grant(self, row):
        return {'sessionId': row['request_id'], 'packId': row['pack_id'], 'formId': row['form_id'],
                'formVersion': self.pack['version'], 'themeId': row['theme_id'], 'source': row['source']}

    def start(self, user_id, theme_id, request_id):
        self.identity(user_id)
        if not re.fullmatch(r'[A-Za-z0-9_-]{8,96}', request_id or ''):
            raise ApiError(400, 'CHALLENGE_REQUEST_INVALID', '挑战请求编号无效')
        forms = [f for f in self.pack['forms'] if f['themeId'] == theme_id]
        if not forms:
            raise ApiError(400, 'CHALLENGE_THEME_INVALID', '挑战主题不存在')
        with self.db.connect() as c:
            old = c.execute('SELECT * FROM challenge_runs WHERE user_id=? AND request_id=?', (user_id, request_id)).fetchone()
        if old:
            if old['theme_id'] != theme_id or old['pack_id'] != self.pack['id']:
                raise ApiError(409, 'CHALLENGE_REQUEST_CONFLICT', '原请求属于其他挑战，请继续原进度')
            return self.grant(old)
        if self.pack.get('enabled') is not True:
            raise ApiError(503, 'CHALLENGE_PACK_PAUSED', '挑战拓展包暂未启用')
        access = self.access(user_id)
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            old = c.execute('SELECT * FROM challenge_runs WHERE user_id=? AND request_id=?', (user_id, request_id)).fetchone()
            if old:
                if old['theme_id'] != theme_id:
                    raise ApiError(409, 'CHALLENGE_REQUEST_CONFLICT', '原请求属于其他挑战')
                return self.grant(old)
            runs = c.execute('SELECT * FROM challenge_runs WHERE user_id=? AND pack_id=? ORDER BY created_ms,rowid',
                             (user_id, self.pack['id'])).fetchall()
            trials = [r for r in runs if r['source'] == 'trial']
            # Recheck current entitlement under the same transaction as allocation.
            paid = access['entitled'] and c.execute("SELECT 1 FROM challenge_orders WHERE user_id=? AND pack_id=? AND status='PAID'",
                                                     (user_id, self.pack['id'])).fetchone()
            if not paid:
                if len(trials) >= self.pack['freeTrials'] or any(r['theme_id'] == theme_id for r in trials):
                    raise ApiError(402, 'CHALLENGE_TRIAL_EXHAUSTED', '这个主题已体验，换个主题或解锁本期拓展包')
                forms = [f for f in forms if f['trial']]
            ids = [r['form_id'] for r in runs]
            form = min(forms, key=lambda f: (ids.count(f['id']), max((i for i, fid in enumerate(ids) if fid == f['id']), default=-1)))
            source = 'pack' if paid else 'trial'
            c.execute('INSERT INTO challenge_runs VALUES(?,?,?,?,?,?,?)',
                      (user_id, request_id, self.pack['id'], form['id'], theme_id, source, now_ms()))
            return self.grant({'request_id': request_id, 'pack_id': self.pack['id'], 'form_id': form['id'], 'theme_id': theme_id, 'source': source})
