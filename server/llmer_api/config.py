from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Optional


@dataclass(frozen=True)
class Settings:
    host: str
    port: int
    database_path: Path
    avatar_dir: Path
    hash_secret: bytes
    access_token_ttl_seconds: int
    refresh_token_ttl_days: int
    sms_role_name: str
    sms_region_id: str
    sms_endpoint: str
    sms_sign_name: str
    sms_template_code: str
    sms_scheme_name: Optional[str]
    sms_valid_seconds: int
    sms_interval_seconds: int
    app_env: str
    wechat_pay_merchant_id: Optional[str] = None
    material_storage_bucket: Optional[str] = None
    analysis_provider_name: Optional[str] = None

    @classmethod
    def from_env(cls, environment: Optional[Dict[str, str]] = None) -> "Settings":
        env = environment or os.environ
        secret = required(env, "LLMER_HASH_SECRET")
        if len(secret) < 32:
            raise ValueError("LLMER_HASH_SECRET must contain at least 32 characters")

        database_path = absolute_path(env.get("LLMER_DATABASE_PATH", "/var/lib/llmer-api/llmer.sqlite3"))
        avatar_dir = absolute_path(env.get("LLMER_AVATAR_DIR", "/var/lib/llmer-api/avatars"))
        return cls(
            host=env.get("HOST", "127.0.0.1").strip(),
            port=bounded_int(env, "PORT", 18020, 1, 65535),
            database_path=database_path,
            avatar_dir=avatar_dir,
            hash_secret=secret.encode("utf-8"),
            access_token_ttl_seconds=bounded_int(env, "ACCESS_TOKEN_TTL_SECONDS", 900, 300, 3600),
            refresh_token_ttl_days=bounded_int(env, "REFRESH_TOKEN_TTL_DAYS", 30, 1, 90),
            sms_role_name=env.get("ALIBABA_CLOUD_ECS_METADATA", ""),
            sms_region_id=env.get("ALIBABA_CLOUD_REGION_ID", "cn-beijing").strip(),
            sms_endpoint=env.get("ALIBABA_CLOUD_DYPNS_ENDPOINT", "dypnsapi.aliyuncs.com").strip(),
            sms_sign_name=env.get("ALIYUN_SMS_SIGN_NAME", ""),
            sms_template_code=env.get("ALIYUN_SMS_TEMPLATE_CODE", ""),
            sms_scheme_name=optional(env, "ALIYUN_SMS_SCHEME_NAME"),
            sms_valid_seconds=bounded_int(env, "SMS_VALID_SECONDS", 300, 60, 600),
            sms_interval_seconds=bounded_int(env, "SMS_INTERVAL_SECONDS", 60, 30, 600),
            app_env=env.get("APP_ENV", "production").strip(),
            wechat_pay_merchant_id=optional(env, "WECHAT_PAY_MERCHANT_ID"),
            material_storage_bucket=optional(env, "MATERIAL_STORAGE_BUCKET"),
            analysis_provider_name=optional(env, "ANALYSIS_PROVIDER_NAME"),
        )


def required(env: Dict[str, str], key: str) -> str:
    value = env.get(key, "").strip()
    if not value:
        raise ValueError(f"{key} is required")
    return value


def optional(env: Dict[str, str], key: str) -> Optional[str]:
    value = env.get(key, "").strip()
    return value or None


def bounded_int(env: Dict[str, str], key: str, default: int, minimum: int, maximum: int) -> int:
    raw = env.get(key, str(default)).strip()
    try:
        value = int(raw)
    except ValueError as error:
        raise ValueError(f"{key} must be an integer") from error
    if value < minimum or value > maximum:
        raise ValueError(f"{key} must be between {minimum} and {maximum}")
    return value


def absolute_path(value: str) -> Path:
    path = Path(value)
    if not path.is_absolute() or path == Path("/"):
        raise ValueError("data paths must be absolute and may not be root")
    return path
