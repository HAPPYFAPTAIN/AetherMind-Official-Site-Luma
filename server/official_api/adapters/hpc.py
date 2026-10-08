"""Portal-facing HPC proxy: per-user MD-Agent token passthrough to /v1/hpc/*."""
from __future__ import annotations

import base64
import hashlib
import hmac
import json
import math
import os
import secrets
import time
from urllib.parse import quote

import httpx
from cryptography.fernet import Fernet, InvalidToken
from fastapi import APIRouter, Body, Depends, Query, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from ..errors import ApiError
from ..billing.wallet import UsageEvent, balance, charge as charge_usage, fingerprint
from ..products.entitlements import active

CONNECTION_CREDENTIAL_LIMIT_BYTES = 64 * 1024
JOB_INPUT_LIMIT_BYTES = 2 * 1024 * 1024
CONNECTION_CREDENTIAL_FIELDS = ("private_key", "passphrase", "password")
LOG_BYTES_DEFAULT = 16_384
LOG_BYTES_MAX = 65_536
HPC_PRODUCT_ID = "md-exp"


class CompletionBody(BaseModel):
    """Authenticated scheduler completion report from the cloud adapter."""

    jobId: str = Field(min_length=1, max_length=120)
    mdUsername: str = Field(min_length=1, max_length=120)
    productId: str = Field(min_length=1, max_length=120)
    admission: str = Field(min_length=20, max_length=600)
    state: str = Field(pattern=r"^(succeeded|failed|cancelled)$")
    actualElapsedSeconds: int = Field(default=0, ge=0, le=31_536_000)
    allocatedCores: int = Field(default=0, ge=0, le=65_536)
    schedulerJobId: str | None = Field(default=None, max_length=120)


def mount_hpc(app, workspace, current_user):
    router = APIRouter(prefix="/api/v1/console/hpc", tags=["hpc-portal"])
    database = workspace.db

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

    def callback_secret() -> str:
        return os.environ.get("MDAGENT_HPC_CALLBACK_SECRET", "").strip()

    def md_user_id(md_username: str) -> str | None:
        with database.connect() as c:
            row = c.execute(
                "SELECT user_id FROM official_md_agent_bindings WHERE md_username=?",
                (md_username,),
            ).fetchone()
        return row["user_id"] if row else None

    def issue_admission(uid: str, md_username: str, product_id: str) -> str:
        secret = callback_secret()
        if not secret:
            raise ApiError(503, "HPC_CALLBACK_CONFIG_MISSING", "超算计量回调尚未配置")
        now = int(time.time())
        raw = {
            "mdUsername": md_username,
            "productId": product_id,
            "issuedAt": now,
            "nonce": secrets.token_urlsafe(18),
        }
        encoded = base64.urlsafe_b64encode(
            json.dumps(raw, separators=(",", ":"), sort_keys=True).encode()
        ).decode().rstrip("=")
        signature = hmac.new(secret.encode(), encoded.encode(), hashlib.sha256).hexdigest()
        return encoded + "." + signature

    def verify_admission(receipt: str, md_username: str, product_id: str) -> str:
        secret = callback_secret()
        try:
            encoded, signature = receipt.split(".", 1)
            expected = hmac.new(secret.encode(), encoded.encode(), hashlib.sha256).hexdigest()
            if not secret or not hmac.compare_digest(signature, expected):
                raise ValueError
            padded = encoded + "=" * (-len(encoded) % 4)
            data = json.loads(base64.urlsafe_b64decode(padded).decode())
            issued = int(data["issuedAt"])
            if int(time.time()) - issued > 86_400 or issued - int(time.time()) > 60:
                raise ValueError
            if data["mdUsername"] != md_username or data["productId"] != product_id:
                raise ValueError
        except (ValueError, KeyError, TypeError, json.JSONDecodeError):
            raise ApiError(401, "HPC_ADMISSION_INVALID", "超算作业授权凭据无效或已过期")
        uid = md_user_id(md_username)
        if not uid:
            raise ApiError(401, "HPC_ADMISSION_INVALID", "超算用户绑定不存在")
        return uid

    def require_admission(uid: str, product_id: str) -> tuple[str, str]:
        with database.connect() as c:
            row = c.execute(
                "SELECT md_username FROM official_md_agent_bindings WHERE user_id=?",
                (uid,),
            ).fetchone()
            if not row:
                raise ApiError(409, "MD_AGENT_BINDING_REQUIRED", "请先绑定 MD-Agent 账户")
            if not active(c, uid, product_id, workspace.now()):
                raise ApiError(403, "ENTITLEMENT_REQUIRED", "请先激活超算产品资格")
            if balance(c, uid) <= 0:
                raise ApiError(402, "INSUFFICIENT_CREDITS", "积分余额不足，无法提交超算任务")
            md_username = row["md_username"]
        return md_username, issue_admission(uid, md_username, product_id)

    @router.post("/internal/admissions")
    def admission(body: dict = Body(...), x_hpc_callback_secret: str | None = Header(default=None)):
        """Issue an internal admission receipt for trusted cloud submission."""
        expected = callback_secret()
        if not expected or not x_hpc_callback_secret or not hmac.compare_digest(x_hpc_callback_secret, expected):
            raise ApiError(401, "HPC_CALLBACK_UNAUTHORIZED", "超算授权回调未通过认证")
        md_username = str(body.get("mdUsername") or "").strip()
        product_id = str(body.get("productId") or "").strip()
        uid = md_user_id(md_username)
        if not uid or product_id != HPC_PRODUCT_ID:
            raise ApiError(403, "HPC_ADMISSION_DENIED", "超算用户或产品资格无效")
        _, receipt = require_admission(uid, product_id)
        return {"mdUsername": md_username, "productId": product_id, "admission": receipt}

    @router.post("/internal/completions")
    def completion(
        payload: dict = Body(...),
        x_hpc_callback_secret: str | None = Header(default=None),
    ):
        """Reconcile one terminal scheduler report into the official wallet.

        The cloud adapter is the only caller. HMAC authentication plus the
        usage event id makes retries safe; no browser token is accepted here.
        """
        expected = callback_secret()
        if not expected or not x_hpc_callback_secret or not hmac.compare_digest(
            x_hpc_callback_secret, expected
        ):
            raise ApiError(401, "HPC_CALLBACK_UNAUTHORIZED", "超算计量回调未通过认证")
        try:
            body = CompletionBody.model_validate(payload)
        except Exception as error:
            raise ApiError(400, "HPC_COMPLETION_INVALID", "超算完成回调格式不正确") from error
        if body.productId != HPC_PRODUCT_ID:
            raise ApiError(400, "HPC_PRODUCT_UNSUPPORTED", "超算计量产品不受支持")
        uid = verify_admission(body.admission, body.mdUsername, body.productId)
        if body.actualElapsedSeconds and not body.allocatedCores:
            raise ApiError(400, "HPC_USAGE_INVALID", "实际运行时长存在时必须报告核数")

        core_seconds = body.actualElapsedSeconds * body.allocatedCores
        core_minutes = math.ceil(core_seconds / 60) if core_seconds else 0
        if not core_minutes:
            return {"jobId": body.jobId, "eventId": "hpc:" + body.jobId, "charged": False, "replayed": False, "points": 0}
        event_id = "hpc:" + body.jobId
        with database.connect() as c:
            c.execute("BEGIN IMMEDIATE")
            result = charge_usage(
                workspace,
                c,
                user_id=uid,
                product_id=body.productId,
                event_id=event_id,
                usage=UsageEvent(units=1, core_minutes=core_minutes),
                reason="超算作业完成 · " + body.jobId,
                actor=uid,
                allow_clamp=True,
                fingerprint_override=fingerprint(body.model_dump()),
            )
        return {
            "jobId": body.jobId,
            "eventId": event_id,
            "charged": not result.replayed,
            "replayed": result.replayed,
            "points": result.points,
            "shortfall": result.shortfall,
            "coreMinutes": core_minutes,
        }

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
        # These server-owned fields let the cloud adapter reconcile a terminal
        # scheduler report even when the browser stops polling. They are
        # ignored by older upstream binaries, which retain their old behavior.
        upstream_payload = dict(payload)
        md_username, admission_receipt = require_admission(uid, HPC_PRODUCT_ID)
        upstream_payload["official_md_username"] = md_username
        upstream_payload["official_product_id"] = HPC_PRODUCT_ID
        upstream_payload["official_admission"] = admission_receipt
        return hpc_request("POST", "/v1/hpc/jobs", token=token, body=upstream_payload)

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
