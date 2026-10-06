from __future__ import annotations

import datetime as dt
import ipaddress
import re
import threading
import time
from urllib.parse import urlsplit
from pathlib import Path
from typing import Any, Callable, Dict, Optional, Set, Tuple

from .aliyun_sms import SmsProviderError
from .branding import is_default_profile_display_name, public_profile_display_name
from .config import Settings
from .crypto import keyed_hash, opaque_token, random_id
from .database import Database
from .errors import ApiError


PHONE_RE = re.compile(r"^1[3-9][0-9]{9}$")
CODE_RE = re.compile(r"^[0-9]{4,8}$")
TOKEN_RE = re.compile(r"^[a-z]{3}_[A-Za-z0-9_-]{43}$")
CONTROL_RE = re.compile(r"[\x00-\x1f\x7f]")


class AuthService:
    def __init__(
        self,
        database: Database,
        sms_provider: Any,
        settings: Settings,
        now: Callable[[], int] = lambda: int(time.time() * 1000),
    ) -> None:
        self.database = database
        self.sms_provider = sms_provider
        self.settings = settings
        self.now = now
        self._active_sends: Set[str] = set()
        self._active_verifications: Set[str] = set()
        self._lock = threading.Lock()

    def request_sms_code(self, phone_input: str, client_ip: str) -> None:
        phone = normalize_phone(phone_input)
        phone_hash = self.hash("phone", phone)
        ip_hash = self.hash("ip", normalize_ip(client_ip))
        with self._exclusive(self._active_sends, phone_hash, "SMS_ALREADY_SENDING", "验证码正在发送，请稍候"):
            now_ms = self.now()
            self.database.reserve_sms_send(phone_hash, ip_hash, now_ms, self.settings.sms_interval_seconds)
            try:
                self.sms_provider.send_code(phone)
            except SmsProviderError as error:
                safe_log_provider_error(error)
                raise ApiError(
                    503,
                    "SMS_SEND_UNAVAILABLE",
                    "验证码暂时无法发送，请稍后重试",
                    retryable=True,
                    retry_after_seconds=60,
                ) from error
            self.database.upsert_challenge(
                phone_hash,
                now_ms,
                now_ms + self.settings.sms_valid_seconds * 1000,
            )

    def verify_sms_code(self, phone_input: str, code_input: str, client_ip: str) -> Dict[str, Any]:
        phone = normalize_phone(phone_input)
        code = normalize_code(code_input)
        phone_hash = self.hash("phone", phone)
        ip_hash = self.hash("ip", normalize_ip(client_ip))
        with self._exclusive(
            self._active_verifications,
            phone_hash,
            "VERIFY_IN_PROGRESS",
            "验证码正在核验，请稍候",
        ):
            now_ms = self.now()
            self.database.require_challenge(phone_hash, now_ms)
            self.database.reserve_sms_verify(phone_hash, ip_hash, now_ms)
            try:
                verified = self.sms_provider.verify_code(phone, code)
            except SmsProviderError as error:
                safe_log_provider_error(error)
                raise ApiError(
                    503,
                    "SMS_VERIFY_UNAVAILABLE",
                    "验证码暂时无法核验，请稍后重试",
                    retryable=True,
                    retry_after_seconds=30,
                ) from error
            if not verified:
                raise ApiError(401, "INVALID_SMS_CODE", "验证码错误或已过期")
            return self._create_login(phone_hash, phone[-4:], now_ms)

    def refresh(self, refresh_token: str) -> Dict[str, Any]:
        if not valid_token(refresh_token, "lrt_"):
            raise ApiError(401, "INVALID_REFRESH_TOKEN", "登录状态已过期，请重新登录")
        now_ms = self.now()
        access_token, refresh_token_next, session_values = self._new_session_values(now_ms)
        user_id = self.database.refresh_session(
            refresh_hash=self.hash("refresh-token", refresh_token),
            session_id=session_values["session_id"],
            access_hash=self.hash("access-token", access_token),
            new_refresh_hash=self.hash("refresh-token", refresh_token_next),
            access_expires_at_ms=session_values["access_expires_at_ms"],
            refresh_expires_at_ms=session_values["refresh_expires_at_ms"],
            now_ms=now_ms,
        )
        return self._session_response(user_id, access_token, refresh_token_next, session_values)

    def authenticate(self, access_token: str) -> str:
        if not valid_token(access_token, "lat_"):
            raise ApiError(401, "INVALID_ACCESS_TOKEN", "登录状态已过期，请重新登录")
        return self.database.authenticate(self.hash("access-token", access_token), self.now())

    def logout(self, access_token: str) -> None:
        if valid_token(access_token, "lat_"):
            self.database.logout(self.hash("access-token", access_token), self.now())

    def profile(self, user_id: str) -> Dict[str, Any]:
        return map_profile(self.database.get_profile(user_id))

    def update_profile(self, user_id: str, patch_input: Dict[str, Any]) -> Dict[str, Any]:
        patch = normalize_profile_patch(patch_input)
        return map_profile(self.database.update_profile(user_id, patch, self.now()))

    def set_avatar(self, user_id: str, filename: Optional[str]) -> Optional[str]:
        return self.database.set_avatar(user_id, filename, self.now())

    def hash(self, purpose: str, value: str) -> str:
        return keyed_hash(self.settings.hash_secret, purpose, value)

    def _create_login(self, phone_hash: str, phone_last4: str, now_ms: int) -> Dict[str, Any]:
        access_token, refresh_token, values = self._new_session_values(now_ms)
        user_id = self.database.complete_login(
            user_id=random_id(),
            session_id=values["session_id"],
            phone_hash=phone_hash,
            phone_last4=phone_last4,
            access_hash=self.hash("access-token", access_token),
            refresh_hash=self.hash("refresh-token", refresh_token),
            access_expires_at_ms=values["access_expires_at_ms"],
            refresh_expires_at_ms=values["refresh_expires_at_ms"],
            now_ms=now_ms,
        )
        return self._session_response(user_id, access_token, refresh_token, values)

    def _new_session_values(self, now_ms: int) -> Tuple[str, str, Dict[str, int]]:
        access_token = opaque_token("lat_")
        refresh_token = opaque_token("lrt_")
        return (
            access_token,
            refresh_token,
            {
                "session_id": random_id(),
                "access_expires_at_ms": now_ms + self.settings.access_token_ttl_seconds * 1000,
                "refresh_expires_at_ms": now_ms + self.settings.refresh_token_ttl_days * 86_400_000,
            },
        )

    def _session_response(
        self,
        user_id: str,
        access_token: str,
        refresh_token: str,
        values: Dict[str, int],
    ) -> Dict[str, Any]:
        return {
            "accessToken": access_token,
            "refreshToken": refresh_token,
            "accessTokenExpiresAtEpochMs": values["access_expires_at_ms"],
            "refreshTokenExpiresAtEpochMs": values["refresh_expires_at_ms"],
            "profile": self.profile(user_id),
        }

    class _Exclusive:
        def __init__(
            self,
            owner: "AuthService",
            active_set: Set[str],
            key: str,
            code: str,
            message: str,
        ) -> None:
            self.owner = owner
            self.active_set = active_set
            self.key = key
            self.code = code
            self.message = message

        def __enter__(self) -> None:
            with self.owner._lock:
                if self.key in self.active_set:
                    raise ApiError(429, self.code, self.message, retryable=True, retry_after_seconds=3)
                self.active_set.add(self.key)

        def __exit__(self, exc_type: Any, exc_value: Any, traceback: Any) -> None:
            with self.owner._lock:
                self.active_set.discard(self.key)

    def _exclusive(self, active_set: Set[str], key: str, code: str, message: str) -> "AuthService._Exclusive":
        return self._Exclusive(self, active_set, key, code, message)


def normalize_phone(value: Any) -> str:
    phone = str(value or "").strip()
    if not PHONE_RE.fullmatch(phone):
        raise ApiError(400, "INVALID_PHONE", "请输入正确的中国大陆手机号")
    return phone


def normalize_code(value: Any) -> str:
    code = str(value or "").strip()
    if not CODE_RE.fullmatch(code):
        raise ApiError(400, "INVALID_SMS_CODE_FORMAT", "请输入正确的验证码")
    return code


def normalize_ip(value: str) -> str:
    candidate = str(value or "").split(",", 1)[0].strip()
    try:
        return str(ipaddress.ip_address(candidate))
    except ValueError:
        return "0.0.0.0"


def valid_token(value: Any, prefix: str) -> bool:
    return isinstance(value, str) and value.startswith(prefix) and TOKEN_RE.fullmatch(value) is not None


def normalize_profile_patch(input_value: Dict[str, Any]) -> Dict[str, Any]:
    allowed = {"displayName", "birthDate", "city", "occupation", "bio", "githubUrl", "twitterUrl"}
    unknown = set(input_value) - allowed
    if unknown:
        raise ApiError(400, "UNKNOWN_PROFILE_FIELD", "个人资料包含不支持的字段")
    patch: Dict[str, Any] = {}
    if "displayName" in input_value:
        patch["display_name"] = bounded_text(input_value["displayName"], "昵称", 1, 24, allow_none=False)
    if "birthDate" in input_value:
        patch["birth_date"] = normalize_birth_date(input_value["birthDate"])
    if "city" in input_value:
        patch["city"] = bounded_text(input_value["city"], "所在城市", 0, 40)
    if "occupation" in input_value:
        patch["occupation"] = bounded_text(input_value["occupation"], "职业", 0, 40)
    if "bio" in input_value:
        patch["bio"] = bounded_text(input_value["bio"], "个人简介", 0, 160, allow_newlines=True)
    for field, label in (("githubUrl", "GitHub 地址"), ("twitterUrl", "X / Twitter 地址")):
        if field in input_value:
            value = bounded_text(input_value[field], label, 0, 200)
            if value and not valid_social_url(value, field):
                raise ApiError(400, "INVALID_SOCIAL_URL", f"{label}格式不正确")
            patch["github_url" if field == "githubUrl" else "twitter_url"] = value
    if not patch:
        raise ApiError(400, "EMPTY_PROFILE_PATCH", "没有需要保存的资料")
    return patch


def valid_social_url(value: str, field: str) -> bool:
    try:
        parsed = urlsplit(value)
        port = parsed.port
    except ValueError:
        return False
    allowed_hosts = {"github.com", "www.github.com"} if field == "githubUrl" else {"x.com", "twitter.com", "www.x.com", "www.twitter.com"}
    host = (parsed.hostname or "").lower()
    path = parsed.path.strip("/")
    return (
        parsed.scheme == "https"
        and parsed.username is None
        and parsed.password is None
        and port is None
        and host in allowed_hosts
        and re.fullmatch(r"[A-Za-z0-9_-]{1,39}", path) is not None
        and "?" not in value
        and "#" not in value
    )


def bounded_text(value: Any, label: str, minimum: int, maximum: int, allow_none: bool = True, allow_newlines: bool = False) -> Optional[str]:
    if value is None and allow_none:
        return None
    text = str(value or "").strip()
    if not text and minimum == 0:
        return None
    if len(text) < minimum or len(text) > maximum or (CONTROL_RE.search(text) if not allow_newlines else re.search(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", text)):
        raise ApiError(400, "INVALID_PROFILE_FIELD", f"{label}格式不正确")
    return text


def normalize_birth_date(value: Any) -> Optional[str]:
    if value is None or str(value).strip() == "":
        return None
    text = str(value).strip()
    try:
        date_value = dt.date.fromisoformat(text)
    except ValueError as error:
        raise ApiError(400, "INVALID_BIRTH_DATE", "出生日期格式不正确") from error
    if date_value < dt.date(1900, 1, 1) or date_value > dt.date.today():
        raise ApiError(400, "INVALID_BIRTH_DATE", "出生日期超出可用范围")
    return text


def map_profile(row: Dict[str, Any]) -> Dict[str, Any]:
    filled = [
        not is_default_profile_display_name(row.get("display_name")) and bool(row.get("display_name")),
        bool(row.get("avatar_filename")),
        bool(row.get("birth_date")),
        bool(row.get("city")),
        bool(row.get("occupation")),
        bool(row.get("bio")),
    ]
    return {
        "userId": row["id"],
        "displayName": public_profile_display_name(row["display_name"]),
        "phoneMasked": f"****{row['phone_last4']}" if str(row['phone_last4']).isdigit() else None,
        "birthDate": row.get("birth_date"),
        "city": row.get("city"),
        "occupation": row.get("occupation"),
        "bio": row.get("bio"),
        "githubUrl": row.get("github_url"),
        "twitterUrl": row.get("twitter_url"),
        "avatarUrl": f"/api/v1/avatars/{row['avatar_filename']}" if row.get("avatar_filename") else None,
        "profileCompleteness": round(sum(filled) / len(filled) * 100),
        "updatedAtEpochMs": row["updated_at_ms"],
    }


def safe_log_provider_error(error: SmsProviderError) -> None:
    print(
        f"sms_provider_error operation={error.operation} provider_code={error.provider_code}",
        flush=True,
    )
