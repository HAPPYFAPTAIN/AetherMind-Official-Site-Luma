"""Metered OpenAI gateway. See INVARIANTS.md for lifecycle and crash guarantees."""
from __future__ import annotations

import asyncio
import codecs
import json
import os
import re
import secrets
from contextlib import asynccontextmanager
from dataclasses import dataclass, field
from typing import Any, Callable, Mapping
from urllib.parse import urlsplit

import httpx
from fastapi import APIRouter, FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, StreamingResponse

from official_api.auth.service import AuthService
from official_api.billing.providers import provider_credentials
from official_api.billing.rates import effective_models
from official_api.billing.rates import price
from official_api.billing.wallet import UsageEvent, balance, charge, fingerprint
from official_api.config import Settings
from official_api.db import Database
from official_api.errors import ApiError
from official_api.workspace import Workspace

EVENT_ID_RE = re.compile(r"^[A-Za-z0-9._:-]{8,100}$")
MAX_BODY_BYTES = 2 * 1024 * 1024
MAX_RESPONSE_BYTES = 8 * 1024 * 1024
MAX_EVENT_BYTES = 1024 * 1024
MAX_STREAM_BYTES = 64 * 1024 * 1024
MAX_ACTIVE = 16


def error_body(error: ApiError) -> dict:
    return {"error": {"message": error.message, "type": "gateway_error",
                      "code": error.code, "param": None, "retryable": error.retryable}}


def _error(code: str, message: str, status: int = 502) -> ApiError:
    return ApiError(status, code, message)


@dataclass(frozen=True)
class Route:
    model: str
    provider: str
    upstream_model: str
    base_url: str
    api_key: str


@dataclass(frozen=True)
class Principal:
    user_id: str
    product_id: str


@dataclass
class Exchange:
    ready: asyncio.Future
    done: asyncio.Future
    queue: asyncio.Queue = field(default_factory=lambda: asyncio.Queue(maxsize=64))
    detached: bool = False

    def detach(self) -> None:
        self.detached = True
        while not self.queue.empty():
            self.queue.get_nowait()

    def send(self, item: Any) -> None:
        if self.detached:
            return
        try:
            self.queue.put_nowait(item)
        except asyncio.QueueFull:
            self.detach()
            self.queue.put_nowait(_error("SLOW_CONSUMER", "客户端接收过慢，请用原 X-Event-Id 查询结果", 409))

    def finish(self, result: Any) -> None:
        if not self.ready.done():
            self.ready.set_result(result if isinstance(result, ApiError) else None)
        if not self.done.done():
            self.done.set_result(result)
        self.send(result if isinstance(result, ApiError) else None)


class SSEParser:
    """Incremental UTF-8 / SSE parser, including CRLF and multiline data."""
    def __init__(self) -> None:
        self.decoder = codecs.getincrementaldecoder("utf-8")("strict")
        self.buffer = ""

    def feed(self, chunk: bytes, *, final: bool = False) -> list[tuple[str, dict | None]]:
        try:
            self.buffer += self.decoder.decode(chunk, final=final)
        except UnicodeDecodeError as exc:
            raise _error("UPSTREAM_INVALID_STREAM", "上游流编码错误") from exc
        if len(self.buffer) > MAX_EVENT_BYTES:
            raise _error("UPSTREAM_EVENT_TOO_LARGE", "上游流事件过大")
        events = []
        while match := re.search(r"\r?\n\r?\n", self.buffer):
            block, self.buffer = self.buffer[:match.start()], self.buffer[match.end():]
            item = self._parse(block)
            if item is not None:
                events.append(item)
        if final and self.buffer.strip():
            item = self._parse(self.buffer)
            self.buffer = ""
            if item is not None:
                events.append(item)
        return events

    @staticmethod
    def _parse(block: str) -> tuple[str, dict | None] | None:
        lines = [line[5:].removeprefix(" ") for line in block.splitlines() if line.startswith("data:")]
        if not lines:
            return None
        data = "\n".join(lines)
        if data.strip() == "[DONE]":
            return ("data: [DONE]\n\n", None)
        try:
            payload = json.loads(data)
        except ValueError as exc:
            raise _error("UPSTREAM_INVALID_STREAM", "上游返回无效 SSE 数据") from exc
        if not isinstance(payload, dict):
            raise _error("UPSTREAM_INVALID_STREAM", "上游 SSE 内容须为对象")
        return ("data: " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n\n", payload)


def _token_count(value: Any) -> int:
    if isinstance(value, bool) or not isinstance(value, int) or not 0 <= value <= 1_000_000_000:
        raise _error("UPSTREAM_INVALID_USAGE", "上游返回的用量数据不合法")
    return value


def _usage(payload: Mapping, *, embedding: bool = False) -> UsageEvent | None:
    usage = payload.get("usage")
    if usage is None:
        return None
    if not isinstance(usage, dict):
        raise _error("UPSTREAM_INVALID_USAGE", "上游返回的用量数据不合法")
    pkey = "prompt_tokens" if "prompt_tokens" in usage else "input_tokens"
    okey = "completion_tokens" if "completion_tokens" in usage else "output_tokens"
    if pkey not in usage or (not embedding and okey not in usage):
        raise _error("UPSTREAM_INVALID_USAGE", "上游用量缺少输入或输出 token 数")
    prompt = _token_count(usage[pkey])
    output = _token_count(usage.get(okey, 0))
    details = usage.get("prompt_tokens_details") or usage.get("input_tokens_details") or {}
    if not isinstance(details, dict):
        raise _error("UPSTREAM_INVALID_USAGE", "上游缓存用量不合法")
    cached = _token_count(usage.get("prompt_cache_hit_tokens", details.get("cached_tokens", 0)))
    if cached > prompt:
        raise _error("UPSTREAM_INVALID_USAGE", "缓存 token 超过输入 token")
    if "total_tokens" in usage and _token_count(usage["total_tokens"]) != prompt + output:
        raise _error("UPSTREAM_INVALID_USAGE", "上游总 token 数不匹配")
    return UsageEvent(units=1, input_tokens=prompt, cached_tokens=cached, output_tokens=output)


class Gateway:
    def __init__(self, workspace: Workspace, *, client_factory: Callable | None = None,
                 timeout_seconds: float = 300, shutdown_seconds: float = 310) -> None:
        self.workspace = workspace
        self.client_factory = client_factory or httpx.AsyncClient
        self.timeout_seconds = timeout_seconds
        self.shutdown_seconds = shutdown_seconds
        self.min_balance = max(1, int(os.environ.get("GATEWAY_MIN_BALANCE", "1")))
        self.tasks: set[asyncio.Task] = set()
        self.closing = False
        with workspace.db.connect() as c:
            c.execute("SELECT event_id FROM gateway_events LIMIT 0")

    def authenticate(self, request: Request) -> Principal:
        authorization = request.headers.get("authorization", "")
        key = authorization[7:] if authorization.startswith("Bearer ") else ""
        if not key.startswith("opk_") or len(key) > 200:
            raise _error("INVALID_PRODUCT_KEY", "产品凭据无效", 401)
        user = request.headers.get("x-end-user", "").strip()
        if not user or len(user) > 80:
            raise _error("END_USER_REQUIRED", "请提供 X-End-User 官方用户标识", 400)
        with self.workspace.db.connect() as c:
            row = c.execute("SELECT product_id FROM official_integration_keys WHERE key_hash=? AND revoked_at_ms IS NULL",
                            (self.workspace.auth.hash("integration", key),)).fetchone()
            if not row:
                raise _error("INVALID_PRODUCT_KEY", "产品凭据无效", 401)
            if not c.execute("SELECT 1 FROM users WHERE id=?", (user,)).fetchone():
                raise _error("END_USER_NOT_FOUND", "官方用户不存在", 404)
        return Principal(user, row["product_id"])

    def _entitled(self, c, principal: Principal, *, reserve: bool = False) -> None:
        row = c.execute("SELECT units,expires_at_ms FROM official_entitlements WHERE user_id=? AND product_id=?",
                        (principal.user_id, principal.product_id)).fetchone()
        if not row or (row["expires_at_ms"] or 0) <= self.workspace.now():
            raise _error("ENTITLEMENT_REQUIRED", "产品未激活或已到期", 403)

    def route(self, model: str, user_id: str | None = None) -> Route:
        with self.workspace.db.connect() as c:
            row = c.execute("SELECT * FROM official_llm_models WHERE model=? AND enabled=1", (model,)).fetchone()
            if user_id is not None:
                row = c.execute(
                    """SELECT m.* FROM official_llm_models m
                       LEFT JOIN official_user_llm_models a ON a.model=m.model AND a.user_id=?
                       WHERE m.model=? AND COALESCE(a.enabled,m.enabled)=1""",
                    (user_id, model),
                ).fetchone()
        if not row:
            raise _error("MODEL_NOT_FOUND", "模型不存在或暂未开放", 404)
        if not re.fullmatch(r"[A-Za-z0-9_-]+", row["provider"]):
            raise _error("PROVIDER_NOT_CONFIGURED", "供应商标识不合法", 503)
        with self.workspace.db.connect() as c:
            configured = provider_credentials(c, self.workspace, row["provider"])
        if configured is None:
            raise _error("PROVIDER_NOT_CONFIGURED", "模型服务配置不完整", 503)
        base, key, _api = configured
        url = urlsplit(base)
        if not key or url.scheme not in ("http", "https") or not url.hostname or url.username or url.password or url.query or url.fragment:
            raise _error("PROVIDER_NOT_CONFIGURED", "模型服务配置不完整", 503)
        if url.scheme != "https" and url.hostname not in ("127.0.0.1", "localhost", "::1"):
            raise _error("PROVIDER_NOT_CONFIGURED", "模型服务须使用 HTTPS", 503)
        return Route(model, row["provider"], row["upstream_model"], base.rstrip("/"), key)

    def _claim(self, principal: Principal, model: str, kind: str, event: str, fp: str) -> dict | None:
        w = self.workspace
        with w.db.connect() as c:
            c.execute("BEGIN IMMEDIATE")
            prior = c.execute("SELECT * FROM gateway_events WHERE product_id=? AND event_id=?", (principal.product_id, event)).fetchone()
            if prior:
                if prior["fingerprint"] != fp or prior["user_id"] != principal.user_id:
                    raise _error("IDEMPOTENCY_CONFLICT", "X-Event-Id 已用于另一笔请求", 409)
                if prior["status"] == "PENDING":
                    code = "REQUEST_IN_PROGRESS" if prior["deadline_at_ms"] > w.now() else "REQUEST_OUTCOME_UNKNOWN"
                    raise _error(code, "请求处理中或结果待核对，不会再次调用上游", 409)
                if prior["status"] == "FAILED":
                    data = json.loads(prior["error_json"])
                    error = _error(data["code"], data["message"], data["status"])
                    error.retryable = bool(data.get("retryable", False))
                    raise error
                return dict(prior)
            if self.closing or len(self.tasks) >= MAX_ACTIVE:
                raise _error("GATEWAY_BUSY", "网关繁忙，请稍后重试", 503)
            self._entitled(c, principal, reserve=True)
            minimum = max(self.min_balance, price(c, product_id=principal.product_id, model=model, units=0))
            if balance(c, principal.user_id) < minimum:
                raise _error("INSUFFICIENT_CREDITS", "积分余额不足，请先充值", 402)
            c.execute("""INSERT INTO gateway_events(product_id,event_id,fingerprint,user_id,model,kind,status,
                         created_at_ms,deadline_at_ms) VALUES(?,?,?,?,?,?,'PENDING',?,?)""",
                      (principal.product_id, event, fp, principal.user_id, model, kind, w.now(),
                       w.now() + int((self.timeout_seconds + 30) * 1000)))
        return None

    def _complete(self, principal: Principal, event: str, model: str, usage: UsageEvent,
                  response: Any, content_type: str, fp: str) -> None:
        usage.model = model
        w = self.workspace
        with w.db.connect() as c:
            c.execute("BEGIN IMMEDIATE")
            result = charge(w, c, user_id=principal.user_id, product_id=principal.product_id,
                            event_id="gateway:" + event, usage=usage, allow_clamp=True,
                            fingerprint_override=fp, reason="LLM 网关调用", actor=principal.user_id)
            c.execute("""UPDATE gateway_events SET status='COMPLETED',response_json=?,response_content_type=?,
                         usage_input_tokens=?,usage_cached_tokens=?,usage_output_tokens=?,charge_id=?,completed_at_ms=?
                         WHERE product_id=? AND event_id=? AND status='PENDING'""",
                      (json.dumps(response, ensure_ascii=False, separators=(",", ":")), content_type,
                       usage.input_tokens, usage.cached_tokens, usage.output_tokens, result.id, w.now(),
                       principal.product_id, event))

    def _fail(self, principal: Principal, event: str, error: ApiError, usage: UsageEvent | None) -> None:
        with self.workspace.db.connect() as c:
            c.execute("""UPDATE gateway_events SET status='FAILED',error_json=?,completed_at_ms=?,
                         usage_input_tokens=?,usage_cached_tokens=?,usage_output_tokens=?
                         WHERE product_id=? AND event_id=? AND status='PENDING'""",
                      (json.dumps({"status": error.status_code, "code": error.code, "message": error.message,
                                   "retryable": error.retryable}),
                       self.workspace.now(), usage.input_tokens if usage else None,
                       usage.cached_tokens if usage else None, usage.output_tokens if usage else None,
                       principal.product_id, event))

    @staticmethod
    def _status(response: httpx.Response) -> None:
        if response.status_code >= 400:
            if response.status_code == 429:
                raise _error("UPSTREAM_RATE_LIMIT", "上游调用限流，请稍后再试", 429)
            raise _error("UPSTREAM_ERROR", "模型供应商请求失败")
        if response.status_code < 200 or response.status_code >= 300:
            raise _error("UPSTREAM_INVALID_RESPONSE", "模型供应商返回异常状态")

    async def _run(self, route: Route, path: str, body: dict, principal: Principal, event: str,
                   fp: str, exchange: Exchange) -> None:
        usage = None
        try:
            async with asyncio.timeout(self.timeout_seconds):
                headers = {"Authorization": "Bearer " + route.api_key, "Content-Type": "application/json"}
                upstream = {**body, "model": route.upstream_model}
                streaming = body.get("stream") is True
                if streaming:
                    upstream["stream_options"] = {**(body.get("stream_options") or {}), "include_usage": True}
                async with self.client_factory(timeout=httpx.Timeout(self.timeout_seconds, connect=10), follow_redirects=False) as client:
                    async with client.stream("POST", route.base_url + "/" + path, headers=headers, json=upstream) as response:
                        self._status(response)
                        if streaming:
                            if "text/event-stream" not in response.headers.get("content-type", "").lower():
                                raise _error("UPSTREAM_INVALID_STREAM", "上游未返回 SSE 响应")
                            if not exchange.ready.done():
                                exchange.ready.set_result(None)
                            parser, transcript, size, replayable, done = SSEParser(), [], 0, True, False
                            async for chunk in response.aiter_bytes():
                                size += len(chunk)
                                if size > MAX_STREAM_BYTES:
                                    raise _error("UPSTREAM_RESPONSE_TOO_LARGE", "上游响应超过容量限制")
                                for raw, payload in parser.feed(chunk):
                                    if payload is None:
                                        done = True
                                        continue
                                    if done or "error" in payload:
                                        raise _error("UPSTREAM_INVALID_STREAM", "上游流意外结束")
                                    found = _usage(payload)
                                    if found is not None:
                                        usage = found
                                    exchange.send(raw)
                                    if replayable:
                                        if size <= MAX_RESPONSE_BYTES:
                                            transcript.append(raw)
                                        else:
                                            replayable, transcript = False, []
                            for raw, payload in parser.feed(b"", final=True):
                                if payload is None:
                                    done = True
                                else:
                                    if done or "error" in payload:
                                        raise _error("UPSTREAM_INVALID_STREAM", "上游流意外结束")
                                    found = _usage(payload)
                                    if found is not None:
                                        usage = found
                                    exchange.send(raw)
                                    if replayable:
                                        transcript.append(raw)
                            if usage is None:
                                raise _error("UPSTREAM_USAGE_MISSING", "上游未返回用量，无法完成计费")
                            if not done:
                                raise _error("UPSTREAM_INCOMPLETE", "上游连接在结束标记前关闭")
                            self._complete(principal, event, route.model, usage,
                                           transcript + ["data: [DONE]\n\n"] if replayable else None,
                                           "text/event-stream", fp)
                            exchange.send("data: [DONE]\n\n")
                            exchange.finish(None)
                        else:
                            raw = bytearray()
                            async for chunk in response.aiter_bytes():
                                raw.extend(chunk)
                                if len(raw) > MAX_RESPONSE_BYTES:
                                    raise _error("UPSTREAM_RESPONSE_TOO_LARGE", "上游响应超过容量限制")
                            try:
                                payload = json.loads(raw)
                            except (ValueError, UnicodeDecodeError) as exc:
                                raise _error("UPSTREAM_INVALID_RESPONSE", "上游返回无效 JSON") from exc
                            if not isinstance(payload, dict) or "error" in payload:
                                raise _error("UPSTREAM_INVALID_RESPONSE", "上游返回异常 JSON")
                            usage = _usage(payload, embedding=path == "embeddings")
                            if usage is None:
                                raise _error("UPSTREAM_USAGE_MISSING", "上游未返回用量，无法完成计费")
                            self._complete(principal, event, route.model, usage, payload, "application/json", fp)
                            exchange.finish(payload)
        except BaseException as exc:
            if isinstance(exc, ApiError):
                error = exc
            elif isinstance(exc, (asyncio.TimeoutError, httpx.TimeoutException)):
                error = _error("UPSTREAM_TIMEOUT", "模型请求超时，结果待核对", 504)
            elif isinstance(exc, asyncio.CancelledError):
                error = _error("GATEWAY_INTERRUPTED", "网关关闭，请求结果待核对", 503)
            elif isinstance(exc, httpx.HTTPError):
                error = _error("UPSTREAM_UNAVAILABLE", "模型连接中断，结果待核对")
            elif isinstance(exc, Exception):
                error = _error("BILLING_FINALIZATION_FAILED", "请求未能完成记账，请联系管理员核对", 503)
            else:
                raise
            try:
                self._fail(principal, event, error, usage)
            finally:
                exchange.finish(error)
            if isinstance(exc, asyncio.CancelledError):
                raise

    async def request(self, request: Request, *, kind: str):
        principal = self.authenticate(request)
        raw = bytearray()
        async for chunk in request.stream():
            raw.extend(chunk)
            if len(raw) > MAX_BODY_BYTES:
                raise _error("REQUEST_TOO_LARGE", "请求内容过大", 413)
        try:
            body = json.loads(raw)
        except ValueError as exc:
            raise _error("INVALID_REQUEST", "请求须为 JSON 对象", 400) from exc
        if not isinstance(body, dict):
            raise _error("INVALID_REQUEST", "请求须为 JSON 对象", 400)
        model = body.get("model")
        if not isinstance(model, str) or not model or len(model) > 120:
            raise _error("MODEL_REQUIRED", "请提供有效 model", 400)
        if "stream" in body and not isinstance(body["stream"], bool):
            raise _error("INVALID_REQUEST", "stream 须为布尔值", 400)
        if kind == "embedding" and body.get("stream"):
            raise _error("INVALID_REQUEST", "embeddings 不支持流式响应", 400)
        if "stream_options" in body and not isinstance(body["stream_options"], dict):
            raise _error("INVALID_REQUEST", "stream_options 须为对象", 400)
        required = "messages" if kind == "chat" else "input"
        if required not in body or (kind == "chat" and not isinstance(body["messages"], list)):
            raise _error("INVALID_REQUEST", "缺少有效的 " + required, 400)
        event = request.headers.get("x-event-id") or ("auto-" + secrets.token_hex(16))
        if not EVENT_ID_RE.fullmatch(event):
            raise _error("INVALID_EVENT_ID", "X-Event-Id 须为 8–100 位字母数字或 . _ : -", 400)
        fp = fingerprint({"user": principal.user_id, "product": principal.product_id, "kind": kind, "body": body})
        with self.workspace.db.connect() as c:
            exists = c.execute("SELECT 1 FROM gateway_events WHERE product_id=? AND event_id=?", (principal.product_id, event)).fetchone()
        route = self.route(model, principal.user_id) if not exists else None
        prior = self._claim(principal, model, kind, event, fp)
        response_headers = {"X-Event-Id": event, "Cache-Control": "no-store", "X-Accel-Buffering": "no"}
        if prior:
            response_headers["X-Idempotent-Replay"] = "true"
            payload = json.loads(prior["response_json"])
            if payload is None:
                raise _error("REPLAY_UNAVAILABLE", "请求已成功记账，响应过大未缓存；不会重复调用上游", 409)
            if prior["response_content_type"] == "text/event-stream":
                return StreamingResponse(iter(payload), media_type="text/event-stream", headers=response_headers)
            return JSONResponse(payload, headers=response_headers)
        assert route is not None
        loop = asyncio.get_running_loop()
        exchange = Exchange(loop.create_future(), loop.create_future())
        task = asyncio.create_task(self._run(route, "chat/completions" if kind == "chat" else "embeddings", body, principal, event, fp, exchange))
        self.tasks.add(task)
        task.add_done_callback(self.tasks.discard)
        if body.get("stream"):
            ready = await asyncio.shield(exchange.ready)
            if isinstance(ready, ApiError):
                raise ready

            async def iterator():
                try:
                    while True:
                        item = await exchange.queue.get()
                        if item is None:
                            return
                        if isinstance(item, ApiError):
                            yield "data: " + json.dumps(error_body(item), ensure_ascii=False) + "\n\n"
                            return
                        yield item
                finally:
                    exchange.detach()
            return StreamingResponse(iterator(), media_type="text/event-stream", headers=response_headers)
        result = await asyncio.shield(exchange.done)
        if isinstance(result, ApiError):
            raise result
        return JSONResponse(result, headers=response_headers)

    def models(self, request: Request) -> dict:
        principal = self.authenticate(request)
        with self.workspace.db.connect() as c:
            self._entitled(c, principal)
            rows = effective_models(c, principal.user_id)
            visible = []
            for row in rows:
                if provider_credentials(c, self.workspace, row["provider"]) is not None:
                    visible.append(row)
        return {"object": "list", "data": [{"id": row["model"], "object": "model", "created": 0, "owned_by": row["provider"]} for row in visible]}

    async def shutdown(self) -> None:
        self.closing = True
        pending = list(self.tasks)
        if not pending:
            return
        _, left = await asyncio.wait(pending, timeout=self.shutdown_seconds)
        for task in left:
            task.cancel()
        if left:
            await asyncio.gather(*left, return_exceptions=True)

    def router(self) -> APIRouter:
        router = APIRouter(prefix="/v1")

        @router.get("/models")
        async def models(request: Request):
            return self.models(request)

        @router.post("/chat/completions")
        async def chat(request: Request):
            return await self.request(request, kind="chat")

        @router.post("/embeddings")
        async def embeddings(request: Request):
            return await self.request(request, kind="embedding")

        return router


def create_app(settings: Settings | None = None, *, workspace: Workspace | None = None,
               client_factory: Callable | None = None, timeout_seconds: float = 300,
               shutdown_seconds: float = 310) -> FastAPI:
    if workspace is None:
        settings = settings or Settings.from_env()
        database = Database(settings.database_path)
        service = AuthService(database, None, settings)
        workspace = Workspace(database, service)
    gateway = Gateway(workspace, client_factory=client_factory, timeout_seconds=timeout_seconds,
                      shutdown_seconds=shutdown_seconds)

    @asynccontextmanager
    async def lifespan(app):
        yield
        await gateway.shutdown()

    app = FastAPI(title="Official LLM Gateway", docs_url=None, redoc_url=None, openapi_url=None, lifespan=lifespan)
    app.state.gateway = gateway
    app.include_router(gateway.router())

    @app.exception_handler(ApiError)
    async def api_error(request, error):
        headers = {"Cache-Control": "no-store"}
        if error.retry_after_seconds:
            headers["Retry-After"] = str(error.retry_after_seconds)
        return JSONResponse(error_body(error), status_code=error.status_code, headers=headers)

    @app.exception_handler(RequestValidationError)
    async def invalid(request, error):
        return JSONResponse(error_body(_error("INVALID_REQUEST", "请求格式不正确", 400)), status_code=400)

    @app.get("/healthz")
    async def health():
        with workspace.db.connect() as c:
            c.execute("SELECT 1 FROM gateway_events LIMIT 1")
        return {"ok": True, "service": "llm-gateway"}

    return app


if __name__ == "__main__":
    import uvicorn
    settings = Settings.from_env({
        **os.environ,
        "HOST": os.environ.get("GATEWAY_HOST", "127.0.0.1"),
        "PORT": os.environ.get("GATEWAY_PORT", "18040"),
    })
    uvicorn.run(create_app, factory=True, host=settings.host, port=settings.port, access_log=False, server_header=False, date_header=False)
