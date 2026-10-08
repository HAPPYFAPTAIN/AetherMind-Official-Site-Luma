"""Official-site passwords, reusing the existing SMS provider and opaque sessions."""
from __future__ import annotations

import hashlib
import hmac
import secrets
import threading

from fastapi import Depends, Request, Response
from pydantic import Field, SecretStr

from .service import normalize_phone, normalize_code, normalize_ip, safe_log_provider_error
from .sms import SmsProviderError
from ..community.consent import TERMS_VERSION
from ..crypto import random_id
from ..errors import ApiError
from ..http import Strict, bearer_token, client_ip


class PasswordLogin(Strict):
    phone: str = Field(max_length=32)
    password: SecretStr = Field(min_length=1, max_length=128)
    acceptedTerms: bool = False
    termsVersion: str = Field(max_length=32)


class PasswordSms(Strict):
    phone: str = Field(max_length=32)


class PasswordChange(PasswordSms):
    code: str = Field(max_length=8)
    challengeId: str = Field(min_length=1, max_length=80)
    newPassword: SecretStr = Field(min_length=15, max_length=128)


class Passwords:
    def __init__(self, workspace):
        self.workspace = workspace
        self.db, self.auth = workspace.db, workspace.auth
        self.hash_slots = threading.BoundedSemaphore(2)

    def derive(self, password, salt):
        if not self.hash_slots.acquire(blocking=False):
            raise ApiError(429, 'PASSWORD_BUSY', '登录服务繁忙，请稍后重试', retry_after_seconds=3)
        try:
            # OWASP scrypt profile: N=2^15, r=8, p=3 (32 MiB).
            return hashlib.scrypt(password.encode('utf-8'), salt=salt, n=32768,
                                  r=8, p=3, maxmem=64 * 1024 * 1024, dklen=32).hex()
        finally:
            self.hash_slots.release()

    def encode(self, password):
        if not 15 <= len(password) <= 128 or not password.strip() or any(ord(x) < 32 or ord(x) == 127 for x in password):
            raise ApiError(400, 'INVALID_PASSWORD', '密码须为15–128个字符，不能包含控制字符或全为空格')
        salt = secrets.token_bytes(16)
        return f'scrypt-32768-8-3${salt.hex()}${self.derive(password, salt)}'

    def reserve_attempt(self, phone_hash, ip):
        now = self.auth.now()
        ip_hash = self.auth.hash('ip', normalize_ip(ip))
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            c.execute('DELETE FROM official_password_attempts WHERE created_at_ms <= ?', (now - 600_000,))
            phone_count = c.execute('SELECT COUNT(*) FROM official_password_attempts WHERE phone_hash=?', (phone_hash,)).fetchone()[0]
            ip_count = c.execute('SELECT COUNT(*) FROM official_password_attempts WHERE ip_hash=?', (ip_hash,)).fetchone()[0]
            if phone_count >= 8 or ip_count >= 40:
                raise ApiError(429, 'PASSWORD_RATE_LIMITED', '密码尝试次数过多，请稍后重试，或使用短信登录', retry_after_seconds=600)
            c.execute('INSERT INTO official_password_attempts(phone_hash,ip_hash,created_at_ms) VALUES(?,?,?)', (phone_hash, ip_hash, now))

    def login(self, body, ip):
        if not body.acceptedTerms or body.termsVersion != TERMS_VERSION:
            raise ApiError(400, 'TERMS_ACCEPTANCE_REQUIRED', '请阅读并同意当前版本的服务条款与隐私协议')
        phone_hash = self.auth.hash('phone', normalize_phone(body.phone))
        self.reserve_attempt(phone_hash, ip)
        with self.db.connect() as c:
            row = c.execute('SELECT p.user_id,p.password_hash FROM official_passwords p JOIN users u ON u.id=p.user_id WHERE u.phone_hash=?', (phone_hash,)).fetchone()
        # Unset passwords and unknown phones take the same KDF path and response.
        salt = bytes.fromhex(row['password_hash'].split('$')[1]) if row else bytes(16)
        expected = row['password_hash'].split('$')[2] if row else '0' * 64
        valid = hmac.compare_digest(self.derive(body.password.get_secret_value(), salt), expected)
        if not valid or not row:
            raise ApiError(401, 'INVALID_CREDENTIALS', '手机号或密码错误；未设置密码可先用短信登录')
        now = self.auth.now()
        access, refresh, values = self.auth.new_session_values(now)
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            current = c.execute('SELECT password_hash FROM official_passwords WHERE user_id=?', (row['user_id'],)).fetchone()
            if not current or not hmac.compare_digest(current['password_hash'], row['password_hash']):
                raise ApiError(401, 'INVALID_CREDENTIALS', '密码已更新，请重新登录')
            self.db.insert_session(c, user_id=row['user_id'], access_hash=self.auth.hash('access-token', access),
                                   refresh_hash=self.auth.hash('refresh-token', refresh), now_ms=now, **values)
            c.execute('INSERT OR IGNORE INTO community_consents VALUES(?,?,?)', (row['user_id'], TERMS_VERSION, now))
        return self.auth.session_response(row['user_id'], access, refresh, values)

    def bound_phone(self, uid, phone_input):
        phone = normalize_phone(phone_input)
        digest = self.auth.hash('phone', phone)
        with self.db.connect() as c:
            row = c.execute('SELECT phone_hash FROM users WHERE id=?', (uid,)).fetchone()
        if not row or not hmac.compare_digest(row['phone_hash'], digest):
            raise ApiError(400, 'PHONE_MISMATCH', '请输入当前账号绑定的手机号')
        return phone, digest

    def request_code(self, uid, phone_input, ip):
        phone, digest = self.bound_phone(uid, phone_input)
        self.auth.request_sms_code(phone, ip)
        challenge = random_id()
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            sms = c.execute('SELECT * FROM sms_challenges WHERE phone_hash=?', (digest,)).fetchone()
            if not sms or sms['expires_at_ms'] <= self.auth.now():
                raise ApiError(400, 'PASSWORD_CHALLENGE_MISSING', '请重新获取密码设置验证码')
            c.execute('INSERT OR REPLACE INTO official_password_challenges VALUES(?,?,?,?,?)',
                      (uid, challenge, digest, sms['created_at_ms'], sms['expires_at_ms']))
        return {'challengeId': challenge, 'expiresAtEpochMs': sms['expires_at_ms'],
                'retryAfterSeconds': self.auth.settings.sms_interval_seconds}

    def require_challenge(self, c, uid, body, digest):
        row = c.execute('''SELECT p.challenge_id,p.phone_hash,p.expires_at_ms FROM official_password_challenges p
            JOIN sms_challenges s ON s.phone_hash=p.phone_hash AND s.created_at_ms=p.sms_created_at_ms
            WHERE p.user_id=?''', (uid,)).fetchone()
        if not row or row['challenge_id'] != body.challengeId or row['phone_hash'] != digest or row['expires_at_ms'] <= self.auth.now():
            raise ApiError(400, 'PASSWORD_CHALLENGE_MISSING', '密码设置验证码已失效，请重新获取')

    def change(self, uid, body, ip, access_token):
        phone, digest = self.bound_phone(uid, body.phone)
        code = normalize_code(body.code)
        with self.auth.exclusive(self.auth.active_verifications, digest, 'VERIFY_IN_PROGRESS', '验证码正在核验，请稍候'):
            with self.db.connect() as c:
                self.require_challenge(c, uid, body, digest)
            self.db.reserve_sms_verify(digest, self.auth.hash('ip', normalize_ip(ip)), self.auth.now())
            encoded = self.encode(body.newPassword.get_secret_value())
            try:
                verified = self.auth.sms_provider.verify_code(phone, code)
            except SmsProviderError as error:
                safe_log_provider_error(error)
                raise ApiError(503, 'SMS_VERIFY_UNAVAILABLE', '验证码暂时无法核验，请稍后重试', retry_after_seconds=30) from error
            if not verified:
                raise ApiError(400, 'INVALID_SMS_CODE', '验证码错误或已过期')
            now = self.auth.now()
            with self.db.connect() as c:
                c.execute('BEGIN IMMEDIATE')
                self.require_challenge(c, uid, body, digest)
                # Recheck the authorizing session inside the credential transaction.
                session = c.execute('''SELECT 1 FROM sessions WHERE access_hash=? AND user_id=? AND revoked_at_ms IS NULL
                    AND access_expires_at_ms>? AND refresh_expires_at_ms>?''',
                    (self.auth.hash('access-token', access_token), uid, now, now)).fetchone()
                if not session:
                    raise ApiError(401, 'INVALID_ACCESS_TOKEN', '登录状态已过期，请重新登录')
                c.execute('INSERT OR REPLACE INTO official_passwords VALUES(?,?,?)', (uid, encoded, now))
                c.execute('DELETE FROM official_password_challenges WHERE user_id=?', (uid,))
                c.execute('DELETE FROM sms_challenges WHERE phone_hash=?', (digest,))
                c.execute('UPDATE sessions SET revoked_at_ms=? WHERE user_id=? AND revoked_at_ms IS NULL', (now, uid))
                self.workspace.audit(c, uid, uid, 'PASSWORD_CHANGED', {})


def mount_passwords(app, workspace, current_user):
    service = Passwords(workspace)
    app.state.passwords = service

    @app.post('/api/v1/community/auth/password')
    def login(body: PasswordLogin, request: Request):
        return service.login(body, client_ip(request))

    @app.get('/api/v1/console/security/password')
    def status(uid: str = Depends(current_user)):
        with service.db.connect() as c:
            row = c.execute('SELECT updated_at_ms FROM official_passwords WHERE user_id=?', (uid,)).fetchone()
        return {'hasPassword': row is not None, 'updatedAtEpochMs': row['updated_at_ms'] if row else None}

    @app.post('/api/v1/console/security/password/sms')
    def request_code(body: PasswordSms, request: Request, uid: str = Depends(current_user)):
        return service.request_code(uid, body.phone, client_ip(request))

    @app.put('/api/v1/console/security/password', status_code=204)
    def change(body: PasswordChange, request: Request, uid: str = Depends(current_user)):
        service.change(uid, body, client_ip(request), bearer_token(request))
        return Response(status_code=204)
