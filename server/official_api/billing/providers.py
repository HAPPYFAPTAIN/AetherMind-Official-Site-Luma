"""Owner-managed upstream provider configuration.

Provider secrets are encrypted at rest with the same server-only key used for
other official credentials. They are never returned by an API response.
"""
from __future__ import annotations

import base64
import hashlib
import os
import re
from urllib.parse import urlsplit

import httpx
from cryptography.fernet import Fernet, InvalidToken
from pydantic import Field

from ..errors import ApiError
from ..http import Strict
from ..crypto import random_id

PROVIDER_RE = re.compile(r"^[a-z][a-z0-9_-]{0,31}$")
API_RE = re.compile(r"^[a-z][a-z0-9_-]{0,47}$")


class ProviderEdit(Strict):
    provider: str = Field(min_length=1, max_length=32, pattern=r"^[a-z][a-z0-9_-]{0,31}$")
    displayName: str = Field(min_length=1, max_length=100)
    api: str = Field(default="openai-completions", min_length=1, max_length=48, pattern=r"^[a-z][a-z0-9_-]{0,47}$")
    baseUrl: str = Field(min_length=1, max_length=500)
    apiKey: str | None = Field(default=None, max_length=2000)
    enabled: bool = True


def _cipher(workspace) -> Fernet:
    key = base64.urlsafe_b64encode(hashlib.sha256(workspace.auth.settings.hash_secret).digest())
    return Fernet(key)


def encrypt_key(workspace, value: str) -> str:
    return _cipher(workspace).encrypt(value.encode("utf-8")).decode("ascii")


def decrypt_key(workspace, value: str) -> str:
    try:
        return _cipher(workspace).decrypt(value.encode("ascii")).decode("utf-8")
    except (InvalidToken, UnicodeDecodeError, ValueError) as error:
        raise ApiError(503, "PROVIDER_KEY_CORRUPT", "供应商密钥不可用，请重新配置") from error


def validate_base_url(value: str) -> str:
    base = value.strip().rstrip("/")
    parsed = urlsplit(base)
    if parsed.scheme not in ("http", "https") or not parsed.hostname:
        raise ApiError(400, "INVALID_PROVIDER_URL", "供应商 URL 必须是 http(s) 地址")
    if parsed.username or parsed.password or parsed.query or parsed.fragment:
        raise ApiError(400, "INVALID_PROVIDER_URL", "供应商 URL 不能包含用户信息、查询参数或片段")
    if parsed.scheme != "https" and parsed.hostname not in {"127.0.0.1", "localhost", "::1"}:
        raise ApiError(400, "INVALID_PROVIDER_URL", "公网供应商 URL 必须使用 HTTPS")
    return base


def _env_provider(provider: str) -> dict | None:
    prefix = "GATEWAY_PROVIDER_" + provider.upper().replace("-", "_")
    base = os.environ.get(prefix + "_BASEURL", "").strip()
    key = os.environ.get(prefix + "_KEY", "").strip()
    if not base and not key:
        return None
    return {
        "provider": provider,
        "display_name": provider,
        "api": "openai-completions",
        "base_url": base.rstrip("/"),
        "enabled": True,
        "has_key": bool(key),
        "source": "environment",
    }


def get_provider(c, workspace, provider: str) -> dict | None:
    row = c.execute("SELECT * FROM official_llm_providers WHERE provider=?", (provider,)).fetchone()
    if row:
        key = decrypt_key(workspace, row["api_key_ciphertext"]) if row["api_key_ciphertext"] else ""
        return {
            "provider": row["provider"], "display_name": row["display_name"], "api": row["api"],
            "base_url": row["base_url"], "api_key": key, "enabled": bool(row["enabled"]),
            "has_key": bool(key), "source": "database",
        }
    env = _env_provider(provider)
    if env:
        env["api_key"] = os.environ.get("GATEWAY_PROVIDER_" + provider.upper().replace("-", "_") + "_KEY", "").strip()
    return env


def list_providers(c, workspace) -> list[dict]:
    names = {row[0] for row in c.execute("SELECT provider FROM official_llm_providers")}
    names.update(row[0] for row in c.execute("SELECT DISTINCT provider FROM official_llm_models"))
    result = []
    for provider in sorted(names):
        item = get_provider(c, workspace, provider) or {
            "provider": provider, "display_name": provider, "api": "openai-completions",
            "base_url": "", "enabled": False, "has_key": False, "source": "unconfigured",
        }
        result.append({k: item[k] for k in ("provider", "display_name", "api", "base_url", "enabled", "has_key", "source")})
    return result


def set_provider(workspace, c, data: ProviderEdit, actor: str) -> dict:
    provider = data.provider.strip()
    if not PROVIDER_RE.fullmatch(provider) or not API_RE.fullmatch(data.api):
        raise ApiError(400, "INVALID_PROVIDER", "供应商标识或协议不合法")
    if data.api != "openai-completions":
        raise ApiError(400, "UNSUPPORTED_PROVIDER_API", "当前模型网关只支持 OpenAI 兼容协议")
    base_url = validate_base_url(data.baseUrl)
    old = c.execute("SELECT api_key_ciphertext FROM official_llm_providers WHERE provider=?", (provider,)).fetchone()
    key = data.apiKey.strip() if data.apiKey is not None else ""
    ciphertext = encrypt_key(workspace, key) if key else (old["api_key_ciphertext"] if old else None)
    now = workspace.now()
    c.execute(
        """INSERT INTO official_llm_providers(provider,display_name,api,base_url,api_key_ciphertext,enabled,updated_at_ms,updated_by)
           VALUES(?,?,?,?,?,?,?,?)
           ON CONFLICT(provider) DO UPDATE SET display_name=excluded.display_name, api=excluded.api,
             base_url=excluded.base_url, api_key_ciphertext=excluded.api_key_ciphertext,
             enabled=excluded.enabled, updated_at_ms=excluded.updated_at_ms, updated_by=excluded.updated_by""",
        (provider, data.displayName.strip(), data.api, base_url, ciphertext, int(data.enabled), now, actor),
    )
    item = c.execute("SELECT provider,display_name,api,base_url,enabled,updated_at_ms,updated_by FROM official_llm_providers WHERE provider=?", (provider,)).fetchone()
    return {**dict(item), "has_key": bool(ciphertext), "source": "database"}


def provider_credentials(c, workspace, provider: str) -> tuple[str, str, str] | None:
    item = get_provider(c, workspace, provider)
    if not item or not item.get("enabled") or not item.get("base_url") or not item.get("api_key"):
        return None
    return item["base_url"], item["api_key"], item["api"]


def refresh_dsh_model_settings() -> dict:
    """Ask the protected dsh service to refresh tenant model settings.

    The official API remains usable in isolated tests or before dsh is
    configured; production reports the refresh result to the owner UI.
    """
    token = os.environ.get("MDAGENT_ADMIN_TOKEN", "").strip()
    if not token:
        return {"attempted": False, "status": "not_configured"}
    base = os.environ.get("MDAGENT_API_BASE", "http://127.0.0.1:8090").rstrip("/")
    try:
        response = httpx.post(base + "/v1/admin/refresh_models", headers={"Authorization": "Bearer " + token}, timeout=20)
        if not response.is_success:
            return {"attempted": True, "status": "failed", "httpStatus": response.status_code}
        return {"attempted": True, "status": "refreshed"}
    except httpx.HTTPError:
        return {"attempted": True, "status": "failed"}
