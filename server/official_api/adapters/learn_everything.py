"""Activation-gated entry tickets for the Learn Everything service."""
from __future__ import annotations

import base64
import binascii
import hmac
import json
import secrets
from urllib.parse import parse_qs, quote, urlsplit

from fastapi import APIRouter, Depends, Request, Response
from ..errors import ApiError
from ..products.entitlements import active as has_active_entitlement


PRODUCT_ID = "learn-everything"
ENTRY_PATH = "/official/learn-everything/"
TICKET_TTL_MS = 5 * 60 * 1000
COOKIE_NAME = "learn_entry"


def _encode(payload: dict[str, object]) -> str:
    raw = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode()
    return base64.urlsafe_b64encode(raw).decode().rstrip("=")


def _decode(value: str) -> dict[str, object]:
    try:
        padded = value + "=" * (-len(value) % 4)
        payload = json.loads(base64.urlsafe_b64decode(padded).decode())
    except (ValueError, UnicodeDecodeError, binascii.Error) as error:
        raise ApiError(403, "LEARN_ENTRY_INVALID", "学习工作台入口已失效，请重新进入") from error
    if not isinstance(payload, dict):
        raise ApiError(403, "LEARN_ENTRY_INVALID", "学习工作台入口已失效，请重新进入")
    return payload


def mount_learn_everything(app, workspace, current_user):
    router = APIRouter(prefix="/api/v1/console/learn-everything", tags=["learn-everything"])
    auth = workspace.auth

    def active(uid: str) -> bool:
        now = workspace.now()
        with workspace.db.connect() as connection:
            return has_active_entitlement(connection, uid, PRODUCT_ID, now)

    def make_ticket(uid: str) -> tuple[str, int]:
        expires = workspace.now() + TICKET_TTL_MS
        payload = _encode({"uid": uid, "exp": expires, "nonce": secrets.token_urlsafe(16)})
        signature = auth.hash("learn-entry", payload)
        return payload + "." + signature, expires

    def verify_ticket(ticket: str) -> str:
        try:
            payload_part, signature = ticket.split(".", 1)
        except ValueError as error:
            raise ApiError(403, "LEARN_ENTRY_INVALID", "学习工作台入口已失效，请重新进入") from error
        expected = auth.hash("learn-entry", payload_part)
        if not hmac.compare_digest(signature, expected):
            raise ApiError(403, "LEARN_ENTRY_INVALID", "学习工作台入口已失效，请重新进入")
        payload = _decode(payload_part)
        uid = payload.get("uid")
        expires = payload.get("exp")
        nonce = payload.get("nonce")
        if not isinstance(uid, str) or not uid or not isinstance(expires, int) or not isinstance(nonce, str):
            raise ApiError(403, "LEARN_ENTRY_INVALID", "学习工作台入口已失效，请重新进入")
        if expires <= workspace.now():
            raise ApiError(403, "LEARN_ENTRY_EXPIRED", "学习工作台入口已过期，请重新进入")
        if not active(uid):
            raise ApiError(403, "ENTITLEMENT_REQUIRED", "请先激活 Learn Everything 产品资格")
        return uid

    @router.post("/entry")
    def entry(uid: str = Depends(current_user)):
        if not active(uid):
            raise ApiError(403, "ENTITLEMENT_REQUIRED", "请先激活 Learn Everything 产品资格")
        ticket, expires = make_ticket(uid)
        return {"url": ENTRY_PATH + "?ticket=" + quote(ticket, safe=""), "expiresAtEpochMs": expires}

    @router.get("/authorize")
    def authorize(request: Request):
        """Nginx auth_request endpoint; it never accepts a browser bearer token."""
        ticket = request.headers.get("x-learn-ticket", "").strip()
        if not ticket:
            original = request.headers.get("x-original-uri", "")
            ticket = parse_qs(urlsplit(original).query).get("ticket", [""])[0]
        if not ticket:
            cookie = request.cookies.get(COOKIE_NAME, "")
            ticket = cookie.strip()
        uid = verify_ticket(ticket)
        response = Response(status_code=204)
        response.headers["X-Learn-User"] = uid
        response.headers["X-Learn-Entry-Cookie"] = (
            f"{COOKIE_NAME}={quote(ticket, safe='')}; Path=/official/learn-everything; "
            "HttpOnly; Secure; SameSite=Lax; Max-Age=300"
        )
        return response

    app.include_router(router)
