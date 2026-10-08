"""Portal-facing HPC proxy: per-user MD-Agent token passthrough to /v1/hpc/*."""
from __future__ import annotations

import base64
import hashlib
import os
from urllib.parse import quote

import httpx
from cryptography.fernet import Fernet, InvalidToken
from fastapi import APIRouter, Body, Depends, Query
from fastapi.responses import JSONResponse
from llmer_api.errors import ApiError

CONNECTION_CREDENTIAL_LIMIT_BYTES = 64 * 1024
JOB_INPUT_LIMIT_BYTES = 2 * 1024 * 1024
CONNECTION_CREDENTIAL_FIELDS = ("private_key", "passphrase", "password")
LOG_BYTES_DEFAULT = 16_384
LOG_BYTES_MAX = 65_536


def mount_hpc(app, workspace, current_user):
    router = APIRouter(prefix="/api/v1/console/hpc", tags=["hpc-portal"])
    database = workspace.db
    with database.connect() as c:
        # Owned by md_agent.py; identical idempotent DDL so this module mounts standalone.
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

    def decrypt(value: str) -> str:
        try:
            return cipher().decrypt(value.encode()).decode()
        except (InvalidToken, UnicodeDecodeError) as error:
            raise ApiError(503, "MD_AGENT_BINDING_CORRUPT", "MD-Agent 绑定凭据不可用，请联系管理员") from error

    def api_base() -> str:
        return os.environ.get("MDAGENT_API_BASE", "http://127.0.0.1:8090").rstrip("/")

    def binding_token(uid: str) -> str:
        with database.connect() as c:
            binding = c.execute(
                "SELECT token_ciphertext FROM official_md_agent_bindings WHERE user_id=?",
                (uid,),
            ).fetchone()
        if not binding:
            raise ApiError(409, "MD_AGENT_BINDING_REQUIRED", "请先绑定 MD-Agent 账户")
        return decrypt(binding["token_ciphertext"])

    def text_volume(value) -> int:
        return len(value.encode("utf-8")) if isinstance(value, str) else 0

    def guard_connection_body(payload) -> None:
        if not isinstance(payload, dict):
            return  # 结构校验交给上游
        volume = sum(text_volume(payload.get(field)) for field in CONNECTION_CREDENTIAL_FIELDS)
        if volume > CONNECTION_CREDENTIAL_LIMIT_BYTES:
            raise ApiError(413, "HPC_CREDENTIALS_TOO_LARGE", "凭据内容过大，请控制在 64KB 以内")

    def guard_jobs_body(payload) -> None:
        files = payload.get("input_files") if isinstance(payload, dict) else None
        if not isinstance(files, list):
            return  # 结构校验交给上游
        volume = sum(text_volume(item.get("content")) for item in files if isinstance(item, dict))
        if volume > JOB_INPUT_LIMIT_BYTES:
            raise ApiError(413, "HPC_INPUT_TOO_LARGE", "输入文件总体积过大，请控制在 2MB 以内")

    def upstream_error(response: httpx.Response) -> ApiError:
        code = message = ""
        try:
            payload = response.json()
        except ValueError:
            payload = None
        if isinstance(payload, dict):
            raw_code, raw_message = payload.get("code"), payload.get("message")
            if isinstance(raw_code, str) and raw_code.strip():
                code = raw_code.strip()
            if isinstance(raw_message, str) and raw_message.strip():
                message = raw_message
        if response.status_code >= 500:
            return ApiError(503, code or "MD_AGENT_UPSTREAM_ERROR", message or "超算服务暂时不可用，请稍后重试", retryable=True)
        return ApiError(response.status_code, code or "MD_AGENT_UPSTREAM_ERROR", message or "超算服务请求失败")

    def hpc_request(method: str, path: str, *, token: str, body=None, params=None) -> JSONResponse:
        headers = {"Authorization": f"Bearer {token}"}
        try:
            response = httpx.request(method, api_base() + path, json=body, params=params, headers=headers, timeout=60)
        except httpx.HTTPError as error:
            raise ApiError(503, "MD_AGENT_UNAVAILABLE", "超算服务暂时不可用，请稍后重试", retryable=True) from error
        if not response.is_success:
            raise upstream_error(response)
        try:
            payload = response.json()
        except ValueError as error:
            raise ApiError(503, "MD_AGENT_UPSTREAM_ERROR", "超算服务返回异常，请稍后重试", retryable=True) from error
        return JSONResponse(payload, status_code=response.status_code)

    # Request bodies carry SSH credentials; they are proxied verbatim and never logged.
    @router.get("/connections")
    def list_connections(uid: str = Depends(current_user)):
        return hpc_request("GET", "/v1/hpc/connections", token=binding_token(uid))

    @router.post("/connections")
    def create_connection(payload: dict = Body(...), uid: str = Depends(current_user)):
        token = binding_token(uid)
        guard_connection_body(payload)
        return hpc_request("POST", "/v1/hpc/connections", token=token, body=payload)

    @router.get("/connections/{cid}")
    def get_connection(cid: str, uid: str = Depends(current_user)):
        return hpc_request("GET", f"/v1/hpc/connections/{quote(cid, safe='')}", token=binding_token(uid))

    @router.delete("/connections/{cid}")
    def delete_connection(cid: str, uid: str = Depends(current_user)):
        return hpc_request("DELETE", f"/v1/hpc/connections/{quote(cid, safe='')}", token=binding_token(uid))

    @router.post("/connections/{cid}/verify")
    def verify_connection(cid: str, payload: dict | None = Body(None), uid: str = Depends(current_user)):
        token = binding_token(uid)
        return hpc_request("POST", f"/v1/hpc/connections/{quote(cid, safe='')}/verify", token=token, body=payload or {})

    @router.get("/jobs")
    def list_jobs(uid: str = Depends(current_user)):
        return hpc_request("GET", "/v1/hpc/jobs", token=binding_token(uid))

    @router.post("/jobs")
    def create_job(payload: dict = Body(...), uid: str = Depends(current_user)):
        token = binding_token(uid)
        guard_jobs_body(payload)
        return hpc_request("POST", "/v1/hpc/jobs", token=token, body=payload)

    @router.get("/jobs/{jid}")
    def get_job(jid: str, uid: str = Depends(current_user)):
        return hpc_request("GET", f"/v1/hpc/jobs/{quote(jid, safe='')}", token=binding_token(uid))

    @router.post("/jobs/{jid}/cancel")
    def cancel_job(jid: str, payload: dict | None = Body(None), uid: str = Depends(current_user)):
        token = binding_token(uid)
        return hpc_request("POST", f"/v1/hpc/jobs/{quote(jid, safe='')}/cancel", token=token, body=payload or {})

    @router.get("/jobs/{jid}/logs")
    def job_logs(jid: str, tail_bytes: int = Query(LOG_BYTES_DEFAULT, ge=1, le=LOG_BYTES_MAX, alias="bytes"), uid: str = Depends(current_user)):
        return hpc_request("GET", f"/v1/hpc/jobs/{quote(jid, safe='')}/logs", token=binding_token(uid), params={"bytes": tail_bytes})

    app.include_router(router)
