from __future__ import annotations

import io
import os
import re
import warnings
from pathlib import Path
from typing import Any, Callable, Dict, Optional

from fastapi import Depends, FastAPI, File, Request, Response, UploadFile
from fastapi.responses import FileResponse, JSONResponse

from .service import AuthService
from ..config import Settings
from ..crypto import avatar_token
from ..db import Database, SCHEMA_VERSION
from ..errors import ApiError
from ..http import StrictModel, bearer_token, client_ip
from .. import __version__


MAX_AVATAR_BYTES = 2 * 1024 * 1024
AVATAR_NAME_RE = re.compile(r"^[A-Za-z0-9_-]{32,64}\.(jpg|png|webp)$")


class SmsRequest(StrictModel):
    phone: str


class RefreshRequest(StrictModel):
    refreshToken: str


def mount_auth_routes(
    app: FastAPI,
    database: Database,
    service: AuthService,
    settings: Settings,
    current_user: Callable[[Any], str],
) -> None:
    @app.get("/readyz")
    def ready():
        try:
            with database.connect() as connection:
                connection.execute("SELECT 1").fetchone()
            database_ok = True
        except Exception:
            database_ok = False
        return JSONResponse({"status": "ok" if database_ok else "unavailable", "service": "llmer-api",
            "release": os.environ.get("LLMER_RELEASE_ID", "local"),
            "database": "ok" if database_ok else "error"}, status_code=200 if database_ok else 503)

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

    @app.post("/api/v1/auth/refresh")
    def refresh(body: RefreshRequest) -> Dict[str, Any]:
        return service.refresh(body.refreshToken)

    @app.post("/api/v1/auth/logout", status_code=204)
    def logout(request: Request) -> Response:
        service.logout(bearer_token(request, required=False))
        return Response(status_code=204)

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
        final_path = safe_avatar_path(settings.avatar_dir, filename)
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
        remove_old_avatar(settings.avatar_dir, old_filename, except_filename=filename)
        profile = service.profile(user_id)
        profile["avatarMediaType"] = media_type
        return profile

    @app.delete("/api/v1/me/avatar")
    def delete_avatar(user_id: str = Depends(current_user)) -> Dict[str, Any]:
        old_filename = service.set_avatar(user_id, None)
        remove_old_avatar(settings.avatar_dir, old_filename)
        return service.profile(user_id)

    @app.get("/api/v1/avatars/{filename}")
    def avatar_file(filename: str) -> FileResponse:
        if not AVATAR_NAME_RE.fullmatch(filename):
            raise ApiError(404, "AVATAR_NOT_FOUND", "头像不存在")
        path = safe_avatar_path(settings.avatar_dir, filename)
        if not path.is_file():
            raise ApiError(404, "AVATAR_NOT_FOUND", "头像不存在")
        media_type = {"jpg": "image/jpeg", "png": "image/png", "webp": "image/webp"}[path.suffix[1:]]
        response = FileResponse(path, media_type=media_type)
        response.headers["Cache-Control"] = "private, max-age=86400"
        return response


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
