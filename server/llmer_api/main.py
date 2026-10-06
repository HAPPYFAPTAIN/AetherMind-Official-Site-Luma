from __future__ import annotations

import os
import re
import threading
import json
import logging
import time
import io
import warnings
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any, Callable, Dict, Optional

from fastapi import Depends, FastAPI, File, Request, Response, UploadFile
from fastapi.exceptions import RequestValidationError
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, ConfigDict

from . import __version__
from .aliyun_sms import AliyunSmsProvider
from .auth_service import AuthService
from .config import Settings
from .commerce_service import CommerceService
from .crypto import avatar_token, random_id
from .database import Database, SCHEMA_VERSION
from .errors import ApiError
from .report_assets import report_asset_file


MAX_AVATAR_BYTES = 2 * 1024 * 1024
AVATAR_NAME_RE = re.compile(r"^[A-Za-z0-9_-]{32,64}\.(jpg|png|webp)$")
logger = logging.getLogger("uvicorn.error")


def log_event(event: str, **fields: Any) -> None:
    # Only explicitly selected operational fields; never bodies or exception text.
    logger.info(json.dumps({"event": event, **fields}, ensure_ascii=False))


class StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


class SmsRequest(StrictModel):
    phone: str


class SmsVerifyRequest(StrictModel):
    phone: str
    code: str


class RefreshRequest(StrictModel):
    refreshToken: str


class ProfilePatch(StrictModel):
    displayName: Optional[str] = None
    birthDate: Optional[str] = None
    city: Optional[str] = None
    occupation: Optional[str] = None
    bio: Optional[str] = None
    githubUrl: Optional[str] = None
    twitterUrl: Optional[str] = None


class PaymentOrderCreate(StrictModel):
    planId: str
    upgradeContextId: str
    idempotencyKey: str


class MaterialPrepare(StrictModel):
    upgradeContextId: str
    fileName: str
    mediaType: str
    sizeBytes: int
    sha256: str
    consentScope: str
    sceneLabel: Optional[str] = None


class AnalysisJobCreate(StrictModel):
    orderId: str
    planId: str
    upgradeContextId: str
    promptTemplateVersion: str
    materialIds: list[str]
    idempotencyKey: str


class AccountDeleteRequest(StrictModel):
    confirmation: str


class ShareCodeRequest(StrictModel):
    scene: str = "share-card"


def create_app(
    settings: Optional[Settings] = None,
    sms_provider: Optional[Any] = None,
    payment_provider: Optional[Any] = None,
    material_storage: Optional[Any] = None,
    analysis_provider: Optional[Any] = None,
    share_code_provider: Optional[Any] = None,
    now: Optional[Callable[[], int]] = None,
    paid_settings: Optional[Any] = None,
    paid_providers: Optional[Dict[str,Any]] = None,
) -> FastAPI:
    effective_settings = settings or Settings.from_env()
    effective_settings.avatar_dir.mkdir(parents=True, exist_ok=True)
    database = Database(effective_settings.database_path)
    database.initialize()
    from .aliyun_sms import SmsProviderError
    class DisabledSms:
        def send_code(self,phone):
            raise SmsProviderError('send','NOT_CONFIGURED')
        def verify_code(self,phone,code):
            raise SmsProviderError('verify','NOT_CONFIGURED')
    provider = sms_provider or (AliyunSmsProvider(effective_settings) if effective_settings.sms_role_name and effective_settings.sms_sign_name and effective_settings.sms_template_code else DisabledSms())
    service = (
        AuthService(database, provider, effective_settings, now=now)
        if now is not None
        else AuthService(database, provider, effective_settings)
    )
    commerce = CommerceService(
        database,
        payment_provider=payment_provider,
        material_storage=material_storage,
        analysis_provider=analysis_provider,
        share_code_provider=share_code_provider,
        **({"now": now} if now is not None else {}),
    )

    @asynccontextmanager
    async def lifespan(_: FastAPI):
        if not database.integrity_check():
            raise RuntimeError("database integrity check failed")
        stop=threading.Event()
        paid=app.state.paid_service
        def work():
            loops=0
            while not stop.is_set():
                try:
                    if loops % 60 == 0:
                        paid.purge_expired()
                    if paid.settings.worker_enabled:
                        paid.run_once()
                except Exception as error:
                    log_event("worker_error", errorType=type(error).__name__)
                loops+=1
                stop.wait(1)
        worker=threading.Thread(target=work,daemon=True,name='paid-report-worker')
        app.state.worker = worker
        worker.start()
        log_event("service_started", release=os.environ.get("LLMER_RELEASE_ID", "local"), workerEnabled=paid.settings.worker_enabled)
        try:
            yield
        finally:
            stop.set()
            worker.join(timeout=2)
            if not worker.is_alive():
                paid.close()

    app = FastAPI(
        title="LLMer API",
        version=__version__,
        docs_url=None,
        redoc_url=None,
        openapi_url=None,
        lifespan=lifespan,
    )
    app.state.settings = effective_settings
    app.state.database = database
    app.state.auth_service = service
    app.state.commerce_service = commerce

    @app.middleware("http")
    async def security_headers(request: Request, call_next: Callable):
        started = time.monotonic()
        request_id = random_id()
        request.state.request_id = request_id
        try:
            response = await call_next(request)
        except Exception as error:
            log_event("request_error", requestId=request_id, errorType=type(error).__name__)
            response = JSONResponse(ApiError(500, "INTERNAL_ERROR", "服务暂时不可用，请稍后重试", retryable=True).body(), status_code=500)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "no-referrer"
        if not request.url.path.startswith("/api/v1/report-assets/"):
            response.headers["Cache-Control"] = "no-store"
        response.headers["X-Request-ID"] = request_id
        route = getattr(request.scope.get("route"), "path", "unmatched")
        log_event("request", requestId=request_id, method=request.method, route=route,
                  status=response.status_code, durationMs=round((time.monotonic()-started)*1000))
        return response

    @app.exception_handler(ApiError)
    async def api_error_handler(_: Request, error: ApiError):
        headers = {}
        if error.retry_after_seconds is not None:
            headers["Retry-After"] = str(error.retry_after_seconds)
        return JSONResponse(error.body(), status_code=error.status_code, headers=headers)

    @app.exception_handler(RequestValidationError)
    async def validation_error_handler(_: Request, __: RequestValidationError):
        error = ApiError(400, "INVALID_REQUEST", "请求内容格式不正确")
        return JSONResponse(error.body(), status_code=400)

    def current_user(request: Request) -> str:
        return service.authenticate(bearer_token(request))

    from .paid_routes import mount_paid_routes
    paid_service = mount_paid_routes(app,database,effective_settings,service,current_user,paid_settings,paid_providers)
    from .admin import mount_admin
    mount_admin(app, database, paid_service)
    from .community_routes import mount_community_routes
    mount_community_routes(app, database, current_user)

    @app.get("/readyz")
    def ready():
        try:
            with database.connect() as connection:
                connection.execute("SELECT 1").fetchone()
            database_ok = True
        except Exception:
            database_ok = False
        worker = getattr(app.state, "worker", None)
        worker_ok = bool(worker and worker.is_alive())
        ready_ok = database_ok and worker_ok
        return JSONResponse({"status": "ok" if ready_ok else "unavailable", "service": "llmer-api",
            "release": os.environ.get("LLMER_RELEASE_ID", "local"),
            "database": "ok" if database_ok else "error", "workerAlive": worker_ok,
            "workerEnabled": paid_service.settings.worker_enabled}, status_code=200 if ready_ok else 503)

    @app.get("/healthz")
    def health() -> Dict[str, Any]:
        return {
            "status": "ok",
            "service": "llmer-api",
            "version": __version__,
            "schemaVersion": SCHEMA_VERSION,
            "database": "ok" if database.integrity_check() else "error",
            "smsProvider": "aliyun-pnvs",
        }

    @app.post("/api/v1/auth/sms/request", status_code=204)
    def request_sms(body: SmsRequest, request: Request) -> Response:
        service.request_sms_code(body.phone, client_ip(request))
        return Response(status_code=204)

    @app.post("/api/v1/auth/sms/verify")
    def verify_sms(body: SmsVerifyRequest, request: Request) -> Dict[str, Any]:
        return service.verify_sms_code(body.phone, body.code, client_ip(request))

    @app.post("/api/v1/auth/refresh")
    def refresh(body: RefreshRequest) -> Dict[str, Any]:
        return service.refresh(body.refreshToken)

    @app.post("/api/v1/auth/logout", status_code=204)
    def logout(request: Request) -> Response:
        service.logout(bearer_token(request, required=False))
        return Response(status_code=204)

    @app.get("/api/v1/me")
    def me(user_id: str = Depends(current_user)) -> Dict[str, Any]:
        return service.profile(user_id)

    @app.patch("/api/v1/me")
    def update_me(body: ProfilePatch, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        return service.update_profile(user_id, body.model_dump(exclude_unset=True))

    @app.post("/api/v1/me/avatar")
    async def upload_avatar(
        avatar: UploadFile = File(...),
        user_id: str = Depends(current_user),
    ) -> Dict[str, Any]:
        content = await avatar.read(MAX_AVATAR_BYTES + 1)
        if len(content) > MAX_AVATAR_BYTES:
            raise ApiError(413, "AVATAR_TOO_LARGE", "头像不能超过 2MB")
        extension, media_type = detect_image(content)
        filename = f"{avatar_token()}.{extension}"
        final_path = safe_avatar_path(effective_settings.avatar_dir, filename)
        temp_path = final_path.with_suffix(final_path.suffix + ".tmp")
        old_filename = None
        try:
            with temp_path.open("xb") as handle:
                handle.write(content)
                handle.flush()
                os.fsync(handle.fileno())
            os.chmod(temp_path, 0o600)
            os.replace(temp_path, final_path)
            old_filename = service.set_avatar(user_id, filename)
        except Exception:
            temp_path.unlink(missing_ok=True)
            final_path.unlink(missing_ok=True)
            raise
        remove_old_avatar(effective_settings.avatar_dir, old_filename, except_filename=filename)
        profile = service.profile(user_id)
        profile["avatarMediaType"] = media_type
        return profile

    @app.delete("/api/v1/me/avatar")
    def delete_avatar(user_id: str = Depends(current_user)) -> Dict[str, Any]:
        old_filename = service.set_avatar(user_id, None)
        remove_old_avatar(effective_settings.avatar_dir, old_filename)
        return service.profile(user_id)

    @app.delete("/api/v1/me", status_code=204)
    def delete_account(body: AccountDeleteRequest, user_id: str = Depends(current_user)) -> Response:
        if body.confirmation != "DELETE":
            raise ApiError(400, "ACCOUNT_DELETE_CONFIRMATION_REQUIRED", "请明确确认删除账号")
        paid_service.delete_user_data(user_id)
        avatar_filename = commerce.delete_account(user_id)
        paid_service.purge_objects()
        remove_old_avatar(effective_settings.avatar_dir, avatar_filename)
        return Response(status_code=204)

    @app.post("/api/v1/payment/orders", status_code=201)
    def create_payment_order(
        body: PaymentOrderCreate,
        user_id: str = Depends(current_user),
    ) -> Dict[str, Any]:
        return commerce.create_payment_order(user_id, body.model_dump())

    @app.get("/api/v1/payment/orders/{order_id}")
    def get_payment_order(order_id: str, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        return commerce.get_payment_order(user_id, order_id)

    @app.post("/api/v1/payment/orders/{order_id}/verify")
    def verify_payment_order(order_id: str, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        return commerce.verify_payment_order(user_id, order_id)

    @app.post("/api/v1/materials", status_code=201)
    def prepare_material(body: MaterialPrepare, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        return commerce.prepare_material(user_id, body.model_dump())

    @app.post("/api/v1/materials/{material_id}/confirm")
    def confirm_material(material_id: str, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        return commerce.confirm_material(user_id, material_id)

    @app.get("/api/v1/materials")
    def list_materials(upgradeContextId: str, user_id: str = Depends(current_user)) -> list[Dict[str, Any]]:
        return commerce.list_materials(user_id, upgradeContextId)

    @app.delete("/api/v1/materials/{material_id}", status_code=204)
    def delete_material(material_id: str, user_id: str = Depends(current_user)) -> Response:
        commerce.delete_material(user_id, material_id)
        return Response(status_code=204)

    @app.post("/api/v1/analysis/jobs", status_code=202)
    def create_analysis_job(body: AnalysisJobCreate, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        return commerce.create_analysis_job(user_id, body.model_dump())

    @app.get("/api/v1/analysis/jobs/{job_id}")
    def get_analysis_job(job_id: str, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        return commerce.get_analysis_job(user_id, job_id)

    @app.get("/api/v1/reports/{report_id}")
    def get_report(report_id: str, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        return commerce.get_report(user_id, report_id)

    @app.post("/api/v1/share-code")
    def create_share_code(body: ShareCodeRequest) -> Dict[str, Any]:
        return commerce.create_share_code(body.scene)

    @app.get("/api/v1/avatars/{filename}")
    def avatar_file(filename: str) -> FileResponse:
        if not AVATAR_NAME_RE.fullmatch(filename):
            raise ApiError(404, "AVATAR_NOT_FOUND", "头像不存在")
        path = safe_avatar_path(effective_settings.avatar_dir, filename)
        if not path.is_file():
            raise ApiError(404, "AVATAR_NOT_FOUND", "头像不存在")
        media_type = {"jpg": "image/jpeg", "png": "image/png", "webp": "image/webp"}[path.suffix[1:]]
        response = FileResponse(path, media_type=media_type)
        response.headers["Cache-Control"] = "private, max-age=86400"
        return response

    @app.get("/api/v1/report-assets/{style}/{filename}")
    def report_asset(style: str, filename: str) -> FileResponse:
        return report_asset_file(style, filename)

    return app


def bearer_token(request: Request, required: bool = True) -> str:
    header = request.headers.get("authorization", "")
    if header.startswith("Bearer "):
        return header[7:].strip()
    if required:
        raise ApiError(401, "INVALID_ACCESS_TOKEN", "请先登录")
    return ""


def client_ip(request: Request) -> str:
    direct = request.client.host if request.client else "0.0.0.0"
    if direct in ("127.0.0.1", "::1", "testclient"):
        return request.headers.get("x-real-ip") or direct
    return direct


def detect_image(content: bytes) -> tuple:
    from PIL import Image
    try:
        with warnings.catch_warnings():
            warnings.simplefilter('error',Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(content)) as image:
                kind=image.format
                if kind not in ('JPEG','PNG','WEBP') or image.width*image.height>16_000_000:
                    raise ValueError('unsupported image')
                image.verify()
            with Image.open(io.BytesIO(content)) as image:image.load()
        return {'JPEG':('jpg','image/jpeg'),'PNG':('png','image/png'),'WEBP':('webp','image/webp')}[kind]
    except (OSError,ValueError,SyntaxError,Image.DecompressionBombError,Image.DecompressionBombWarning):
        raise ApiError(400,'INVALID_AVATAR','头像无法读取，请选择完整的 JPEG、PNG 或 WebP 图片（最多1600万像素）') from None


def safe_avatar_path(avatar_dir: Path, filename: str) -> Path:
    root = avatar_dir.resolve()
    path = (root / filename).resolve()
    if path.parent != root:
        raise ApiError(400, "INVALID_AVATAR", "头像文件名不正确")
    return path


def remove_old_avatar(avatar_dir: Path, filename: Optional[str], except_filename: Optional[str] = None) -> None:
    if not filename or filename == except_filename or not AVATAR_NAME_RE.fullmatch(filename):
        return
    safe_avatar_path(avatar_dir, filename).unlink(missing_ok=True)
