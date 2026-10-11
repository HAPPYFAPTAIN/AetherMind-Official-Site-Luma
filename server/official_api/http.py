"""Shared HTTP helpers: client identity, bearer tokens, middleware, strict models."""
from __future__ import annotations

import json
import logging
import time
from typing import Any, Callable

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict

from .crypto import random_id
from .errors import ApiError


logger = logging.getLogger("uvicorn.error")


def log_event(event: str, **fields: Any) -> None:
    # Only explicitly selected operational fields; never bodies or exception text.
    logger.info(json.dumps({"event": event, **fields}, ensure_ascii=False))


class StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


class Strict(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)


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


def install_middleware(app: FastAPI) -> None:
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
