import base64
import hashlib
import hmac
import secrets
import uuid


def keyed_hash(secret: bytes, purpose: str, value: str) -> str:
    message = f"{purpose}\0{value}".encode("utf-8")
    return hmac.new(secret, message, hashlib.sha256).hexdigest()


def opaque_token(prefix: str) -> str:
    raw = base64.urlsafe_b64encode(secrets.token_bytes(32)).decode("ascii").rstrip("=")
    return f"{prefix}{raw}"


def random_id() -> str:
    return str(uuid.uuid4())


def avatar_token() -> str:
    return secrets.token_urlsafe(24)
