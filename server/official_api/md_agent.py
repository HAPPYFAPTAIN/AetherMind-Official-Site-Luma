"""Portal-facing MD-Agent state and per-user account handoff."""
from __future__ import annotations

import base64
import hashlib
import os
import secrets
import threading
from urllib.parse import parse_qs, urlsplit

import httpx
from cryptography.fernet import Fernet, InvalidToken
from fastapi import APIRouter, Depends
from llmer_api.errors import ApiError


def mount_md_agent(app, workspace, current_user):
    router = APIRouter(prefix="/api/v1/console/md-agent", tags=["md-agent-portal"])
    database = workspace.db
    binding_lock = threading.Lock()
    with database.connect() as c:
        c.executescript("""
            CREATE TABLE IF NOT EXISTS official_md_agent_bindings (
                user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
                md_username TEXT NOT NULL UNIQUE,
                token_ciphertext TEXT NOT NULL,
                created_at_ms INTEGER NOT NULL
            );
        """)

    def cipher() -> Fernet:
        secret = workspace.auth.settings.hash_secret
        key = base64.urlsafe_b64encode(hashlib.sha256(secret).digest())
        return Fernet(key)

    def encrypt(value: str) -> str:
        return cipher().encrypt(value.encode()).decode()

    def decrypt(value: str) -> str:
        try:
            return cipher().decrypt(value.encode()).decode()
        except (InvalidToken, UnicodeDecodeError) as error:
            raise ApiError(503, "MD_AGENT_BINDING_CORRUPT", "MD-Agent 绑定凭据不可用，请联系管理员") from error

    def api_base() -> str:
        return os.environ.get("MDAGENT_API_BASE", "http://127.0.0.1:8090").rstrip("/")

    def admin_token() -> str:
        return os.environ.get("MDAGENT_ADMIN_TOKEN", "").strip()

    def md_request(method: str, path: str, *, body=None, token: str | None = None):
        headers = {"Authorization": f"Bearer {token or admin_token()}"}
        try:
            response = httpx.request(method, api_base() + path, json=body, headers=headers, timeout=20)
        except httpx.HTTPError as error:
            raise ApiError(503, "MD_AGENT_UNAVAILABLE", "MD-Agent 暂时不可用，请稍后重试", retryable=True) from error
        if not response.is_success:
            raise ApiError(503, "MD_AGENT_UPSTREAM_ERROR", "MD-Agent 接入暂时失败，请稍后重试", retryable=True)
        return response.json()

    def state(uid: str):
        with database.connect() as c:
            qualifications = [dict(row) for row in c.execute(
                "SELECT product_id, invitation_code, created_at_ms FROM official_md_agent_qualifications WHERE user_id=? ORDER BY created_at_ms DESC",
                (uid,),
            )]
            binding = c.execute(
                "SELECT md_username, created_at_ms FROM official_md_agent_bindings WHERE user_id=?",
                (uid,),
            ).fetchone()
        return {
            "accountBinding": "bound" if binding else "unbound",
            "mdUsername": binding["md_username"] if binding else None,
            "boundAtEpochMs": binding["created_at_ms"] if binding else None,
            "qualifications": qualifications,
            "model": {"providers": ["kimi", "deepseek"], "status": "not_configured", "provider": None, "modelId": None, "verifiedAt": None},
            "compute": {"status": "not_connected", "canSubmit": False, "reasonCode": "COMPUTE_NOT_CONNECTED"},
        }

    def ensure_binding(uid: str):
        with database.connect() as c:
            existing = c.execute("SELECT md_username FROM official_md_agent_bindings WHERE user_id=?", (uid,)).fetchone()
            qualified = c.execute("SELECT 1 FROM official_md_agent_qualifications WHERE user_id=? LIMIT 1", (uid,)).fetchone()
        if existing:
            return existing["md_username"]
        if not qualified:
            raise ApiError(409, "MD_AGENT_QUALIFICATION_REQUIRED", "请先使用对应邀请码获得产品资格")
        if not admin_token():
            raise ApiError(503, "MD_AGENT_BINDING_CONFIG_MISSING", "MD-Agent 绑定服务尚未配置")
        with binding_lock:
            with database.connect() as c:
                existing = c.execute("SELECT md_username FROM official_md_agent_bindings WHERE user_id=?", (uid,)).fetchone()
                if existing:
                    return existing["md_username"]
            username = "u" + hashlib.sha256(uid.encode()).hexdigest()[:14]
            password = secrets.token_urlsafe(24)
            invite = md_request("POST", "/v1/admin/invites", body={"days": 1, "max_uses": 1, "note": "official-bff binding"})["code"]
            md_request("POST", "/v1/apply", body={
                "username": username,
                "contact": "official:" + uid[:12],
                "reason": "官网产品资格绑定",
                "provider": "",
                "api_key": "",
                "password": password,
                "invite_code": invite,
            })
            approved = md_request("POST", "/v1/admin/approve/" + username)
            token = approved.get("token")
            if not token:
                raise ApiError(503, "MD_AGENT_BINDING_FAILED", "MD-Agent 账号绑定未完成，请稍后重试")
            with database.connect() as c:
                c.execute("BEGIN IMMEDIATE")
                c.execute("INSERT INTO official_md_agent_bindings VALUES(?,?,?,?)", (uid, username, encrypt(token), workspace.now()))
            return username

    @router.get("/profile")
    def profile(uid: str = Depends(current_user)):
        return state(uid)

    @router.post("/bind")
    def bind(uid: str = Depends(current_user)):
        ensure_binding(uid)
        return state(uid)

    @router.post("/enter")
    def enter(uid: str = Depends(current_user)):
        with database.connect() as c:
            binding = c.execute("SELECT token_ciphertext FROM official_md_agent_bindings WHERE user_id=?", (uid,)).fetchone()
        if not binding:
            raise ApiError(409, "MD_AGENT_BINDING_REQUIRED", "请先用对应邀请码绑定 MD-Agent 账户")
        upstream = md_request("POST", "/v1/web/entry", token=decrypt(binding["token_ciphertext"]))
        parsed = urlsplit(str(upstream.get("url", "")))
        ticket = parse_qs(parsed.query).get("ticket", [""])[0]
        if parsed.hostname not in {"8.130.144.193", "127.0.0.1"} or not ticket:
            raise ApiError(503, "MD_AGENT_ENTRY_INVALID", "MD-Agent 返回的进入链接无效")
        return {"url": "/official/md-agent/open?ticket=" + ticket, "expiresIn": upstream.get("expires_in", 120)}

    app.include_router(router)
