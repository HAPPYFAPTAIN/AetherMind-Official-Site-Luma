from __future__ import annotations

import json
import math
import sqlite3
from pathlib import Path
from typing import Any, Dict, List, Optional

from .branding import DEFAULT_PROFILE_DISPLAY_NAME
from .errors import ApiError


SCHEMA_VERSION = 3

class ClosingConnection(sqlite3.Connection):
    def __exit__(self, exc_type, exc_value, traceback):
        try:
            return super().__exit__(exc_type, exc_value, traceback)
        finally:
            self.close()


class Database:
    def __init__(self, path: Path) -> None:
        self.path = path

    def connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(str(self.path), timeout=5, factory=ClosingConnection)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys = ON")
        connection.execute("PRAGMA busy_timeout = 5000")
        return connection

    def initialize(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with self.connect() as connection:
            current_version = connection.execute("PRAGMA user_version").fetchone()[0]
            if current_version not in (0, 1, 2, SCHEMA_VERSION):
                raise RuntimeError(f"unsupported database schema {current_version}")
            connection.execute("PRAGMA journal_mode = WAL")
            connection.execute("PRAGMA synchronous = NORMAL")
            connection.executescript(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id TEXT PRIMARY KEY,
                    phone_hash TEXT NOT NULL UNIQUE,
                    phone_last4 TEXT NOT NULL CHECK(length(phone_last4) = 4),
                    created_at_ms INTEGER NOT NULL,
                    updated_at_ms INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS profiles (
                    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
                    display_name TEXT NOT NULL,
                    birth_date TEXT,
                    city TEXT,
                    occupation TEXT,
                    bio TEXT,
                    avatar_filename TEXT,
                    github_url TEXT,
                    twitter_url TEXT,
                    updated_at_ms INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS community_profiles (
                    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
                    city TEXT, bio TEXT, github_url TEXT, twitter_url TEXT,
                    updated_at_ms INTEGER NOT NULL
                );
                CREATE TABLE IF NOT EXISTS community_posts (
                    id TEXT PRIMARY KEY,
                    author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    title TEXT NOT NULL,
                    body TEXT NOT NULL,
                    category TEXT NOT NULL DEFAULT 'discussion',
                    status TEXT NOT NULL CHECK(status IN ('OPEN', 'CLOSED', 'HIDDEN')),
                    pinned INTEGER NOT NULL DEFAULT 0 CHECK(pinned IN (0, 1)),
                    created_at_ms INTEGER NOT NULL,
                    updated_at_ms INTEGER NOT NULL,
                    closed_at_ms INTEGER,
                    closed_by TEXT REFERENCES users(id) ON DELETE SET NULL,
                    close_reason TEXT,
                    accepted_reply_id TEXT
                );
                CREATE INDEX IF NOT EXISTS community_posts_feed_idx
                    ON community_posts(status, pinned, updated_at_ms);

                CREATE TABLE IF NOT EXISTS community_replies (
                    id TEXT PRIMARY KEY,
                    post_id TEXT NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
                    author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    body TEXT NOT NULL,
                    status TEXT NOT NULL CHECK(status IN ('VISIBLE', 'HIDDEN')),
                    created_at_ms INTEGER NOT NULL,
                    updated_at_ms INTEGER NOT NULL
                );
                CREATE INDEX IF NOT EXISTS community_replies_post_idx
                    ON community_replies(post_id, status, created_at_ms);

                CREATE TABLE IF NOT EXISTS community_admins (
                    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
                    role TEXT NOT NULL CHECK(role IN ('ADMIN', 'MODERATOR')),
                    created_at_ms INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS community_moderation_events (
                    id TEXT PRIMARY KEY,
                    actor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    post_id TEXT REFERENCES community_posts(id) ON DELETE CASCADE,
                    reply_id TEXT REFERENCES community_replies(id) ON DELETE CASCADE,
                    action TEXT NOT NULL,
                    reason TEXT,
                    created_at_ms INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS sessions (
                    id TEXT PRIMARY KEY,
                    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    access_hash TEXT NOT NULL UNIQUE,
                    refresh_hash TEXT NOT NULL UNIQUE,
                    access_expires_at_ms INTEGER NOT NULL,
                    refresh_expires_at_ms INTEGER NOT NULL,
                    revoked_at_ms INTEGER,
                    created_at_ms INTEGER NOT NULL,
                    last_used_at_ms INTEGER NOT NULL
                );

                CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);
                CREATE INDEX IF NOT EXISTS sessions_access_idx ON sessions(access_hash);
                CREATE INDEX IF NOT EXISTS sessions_refresh_idx ON sessions(refresh_hash);

                CREATE TABLE IF NOT EXISTS sms_events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    phone_hash TEXT NOT NULL,
                    ip_hash TEXT NOT NULL,
                    kind TEXT NOT NULL CHECK(kind IN ('SEND', 'VERIFY')),
                    created_at_ms INTEGER NOT NULL
                );

                CREATE INDEX IF NOT EXISTS sms_events_phone_idx
                    ON sms_events(phone_hash, kind, created_at_ms);
                CREATE INDEX IF NOT EXISTS sms_events_ip_idx
                    ON sms_events(ip_hash, kind, created_at_ms);

                CREATE TABLE IF NOT EXISTS sms_challenges (
                    phone_hash TEXT PRIMARY KEY,
                    created_at_ms INTEGER NOT NULL,
                    expires_at_ms INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS payment_orders (
                    id TEXT PRIMARY KEY,
                    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    idempotency_key TEXT NOT NULL,
                    request_fingerprint TEXT NOT NULL,
                    plan_id TEXT NOT NULL CHECK(plan_id IN ('standard', 'deep')),
                    amount_fen INTEGER NOT NULL CHECK(amount_fen > 0),
                    upgrade_context_id TEXT NOT NULL,
                    provider_order_id TEXT,
                    payment_params_json TEXT,
                    status TEXT NOT NULL CHECK(status IN ('CREATING', 'PENDING', 'PAID', 'CLOSED', 'FAILED')),
                    error_code TEXT,
                    paid_at_ms INTEGER,
                    created_at_ms INTEGER NOT NULL,
                    updated_at_ms INTEGER NOT NULL,
                    UNIQUE(user_id, idempotency_key)
                );
                CREATE INDEX IF NOT EXISTS payment_orders_user_idx ON payment_orders(user_id, created_at_ms);
                CREATE INDEX IF NOT EXISTS payment_orders_provider_idx ON payment_orders(provider_order_id);

                CREATE TABLE IF NOT EXISTS materials (
                    id TEXT PRIMARY KEY,
                    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    upgrade_context_id TEXT NOT NULL,
                    object_key TEXT NOT NULL UNIQUE,
                    original_file_name TEXT NOT NULL,
                    media_type TEXT NOT NULL,
                    size_bytes INTEGER NOT NULL CHECK(size_bytes > 0),
                    sha256 TEXT NOT NULL,
                    consent_scope TEXT NOT NULL CHECK(consent_scope IN ('analysis_once', 'account_reuse')),
                    scene_label TEXT,
                    status TEXT NOT NULL CHECK(status IN ('UPLOAD_PENDING', 'READY')),
                    created_at_ms INTEGER NOT NULL,
                    updated_at_ms INTEGER NOT NULL
                );
                CREATE INDEX IF NOT EXISTS materials_context_idx ON materials(user_id, upgrade_context_id, created_at_ms);

                CREATE TABLE IF NOT EXISTS analysis_jobs (
                    id TEXT PRIMARY KEY,
                    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    order_id TEXT NOT NULL REFERENCES payment_orders(id) ON DELETE RESTRICT,
                    upgrade_context_id TEXT NOT NULL,
                    plan_id TEXT NOT NULL CHECK(plan_id IN ('standard', 'deep')),
                    prompt_template_version TEXT NOT NULL,
                    idempotency_key TEXT NOT NULL,
                    request_fingerprint TEXT NOT NULL,
                    provider_job_id TEXT,
                    status TEXT NOT NULL CHECK(status IN ('CREATING', 'QUEUED', 'RUNNING', 'SUCCEEDED', 'FAILED')),
                    error_code TEXT,
                    report_id TEXT,
                    created_at_ms INTEGER NOT NULL,
                    updated_at_ms INTEGER NOT NULL,
                    UNIQUE(user_id, idempotency_key)
                );
                CREATE INDEX IF NOT EXISTS analysis_jobs_user_idx ON analysis_jobs(user_id, created_at_ms);

                CREATE TABLE IF NOT EXISTS analysis_job_materials (
                    job_id TEXT NOT NULL REFERENCES analysis_jobs(id) ON DELETE CASCADE,
                    material_id TEXT NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
                    PRIMARY KEY(job_id, material_id)
                );

                CREATE TABLE IF NOT EXISTS reports (
                    id TEXT PRIMARY KEY,
                    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    job_id TEXT NOT NULL UNIQUE REFERENCES analysis_jobs(id) ON DELETE CASCADE,
                    upgrade_context_id TEXT NOT NULL,
                    plan_id TEXT NOT NULL CHECK(plan_id IN ('standard', 'deep')),
                    prompt_template_version TEXT NOT NULL,
                    content_json TEXT NOT NULL,
                    ai_content_label TEXT NOT NULL,
                    created_at_ms INTEGER NOT NULL
                );
                CREATE INDEX IF NOT EXISTS reports_user_idx ON reports(user_id, created_at_ms);
                """
            )
            current_version = connection.execute("PRAGMA user_version").fetchone()[0]
            if current_version not in (0, 1, 2, SCHEMA_VERSION):
                raise RuntimeError(f"unsupported database schema {current_version}")
            columns = {row[1] for row in connection.execute("PRAGMA table_info(profiles)").fetchall()}
            if "github_url" not in columns:
                connection.execute("ALTER TABLE profiles ADD COLUMN github_url TEXT")
            if "twitter_url" not in columns:
                connection.execute("ALTER TABLE profiles ADD COLUMN twitter_url TEXT")
            post_columns = {row[1] for row in connection.execute("PRAGMA table_info(community_posts)").fetchall()}
            if "accepted_reply_id" not in post_columns:
                connection.execute("ALTER TABLE community_posts ADD COLUMN accepted_reply_id TEXT")
            connection.execute(f"PRAGMA user_version = {SCHEMA_VERSION}")

    def reserve_sms_send(self, phone_hash: str, ip_hash: str, now_ms: int, interval_seconds: int) -> None:
        one_hour_ago = now_ms - 3_600_000
        with self.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            self._prune(connection, now_ms)
            latest = connection.execute(
                "SELECT MAX(created_at_ms) FROM sms_events WHERE phone_hash = ? AND kind = 'SEND'",
                (phone_hash,),
            ).fetchone()[0]
            if latest is not None and now_ms - latest < interval_seconds * 1000:
                retry = math.ceil((interval_seconds * 1000 - (now_ms - latest)) / 1000)
                raise ApiError(429, "SMS_RATE_LIMITED", "请求过于频繁，请稍后再试", retryable=True, retry_after_seconds=retry)

            phone_count = connection.execute(
                "SELECT COUNT(*) FROM sms_events WHERE phone_hash = ? AND kind = 'SEND' AND created_at_ms >= ?",
                (phone_hash, one_hour_ago),
            ).fetchone()[0]
            ip_count = connection.execute(
                "SELECT COUNT(*) FROM sms_events WHERE ip_hash = ? AND kind = 'SEND' AND created_at_ms >= ?",
                (ip_hash, one_hour_ago),
            ).fetchone()[0]
            if phone_count >= 5 or ip_count >= 20:
                raise ApiError(429, "SMS_RATE_LIMITED", "发送次数已达上限，请稍后再试", retryable=True, retry_after_seconds=3600)

            connection.execute(
                "INSERT INTO sms_events(phone_hash, ip_hash, kind, created_at_ms) VALUES (?, ?, 'SEND', ?)",
                (phone_hash, ip_hash, now_ms),
            )

    def reserve_sms_verify(self, phone_hash: str, ip_hash: str, now_ms: int) -> None:
        ten_minutes_ago = now_ms - 600_000
        with self.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            self._prune(connection, now_ms)
            phone_count = connection.execute(
                "SELECT COUNT(*) FROM sms_events WHERE phone_hash = ? AND kind = 'VERIFY' AND created_at_ms >= ?",
                (phone_hash, ten_minutes_ago),
            ).fetchone()[0]
            ip_count = connection.execute(
                "SELECT COUNT(*) FROM sms_events WHERE ip_hash = ? AND kind = 'VERIFY' AND created_at_ms >= ?",
                (ip_hash, ten_minutes_ago),
            ).fetchone()[0]
            if phone_count >= 8 or ip_count >= 40:
                raise ApiError(429, "VERIFY_RATE_LIMITED", "验证码尝试次数过多，请稍后再试", retryable=True, retry_after_seconds=600)
            connection.execute(
                "INSERT INTO sms_events(phone_hash, ip_hash, kind, created_at_ms) VALUES (?, ?, 'VERIFY', ?)",
                (phone_hash, ip_hash, now_ms),
            )

    def upsert_challenge(self, phone_hash: str, now_ms: int, expires_at_ms: int) -> None:
        with self.connect() as connection:
            connection.execute(
                """
                INSERT INTO sms_challenges(phone_hash, created_at_ms, expires_at_ms)
                VALUES (?, ?, ?)
                ON CONFLICT(phone_hash) DO UPDATE SET
                    created_at_ms = excluded.created_at_ms,
                    expires_at_ms = excluded.expires_at_ms
                """,
                (phone_hash, now_ms, expires_at_ms),
            )

    def require_challenge(self, phone_hash: str, now_ms: int) -> None:
        with self.connect() as connection:
            challenge = connection.execute(
                "SELECT expires_at_ms FROM sms_challenges WHERE phone_hash = ?",
                (phone_hash,),
            ).fetchone()
            if challenge is None or challenge["expires_at_ms"] <= now_ms:
                connection.execute("DELETE FROM sms_challenges WHERE phone_hash = ?", (phone_hash,))
                raise ApiError(400, "SMS_CHALLENGE_MISSING", "请先获取新的验证码")

    def complete_login(
        self,
        *,
        user_id: str,
        session_id: str,
        phone_hash: str,
        phone_last4: str,
        access_hash: str,
        refresh_hash: str,
        access_expires_at_ms: int,
        refresh_expires_at_ms: int,
        now_ms: int,
    ) -> str:
        with self.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            existing = connection.execute(
                "SELECT id FROM users WHERE phone_hash = ?",
                (phone_hash,),
            ).fetchone()
            effective_user_id = existing["id"] if existing else user_id
            if existing is None:
                connection.execute(
                    "INSERT INTO users(id, phone_hash, phone_last4, created_at_ms, updated_at_ms) VALUES (?, ?, ?, ?, ?)",
                    (effective_user_id, phone_hash, phone_last4, now_ms, now_ms),
                )
                connection.execute(
                    "INSERT INTO profiles(user_id, display_name, updated_at_ms) VALUES (?, ?, ?)",
                    (effective_user_id, DEFAULT_PROFILE_DISPLAY_NAME, now_ms),
                )
            connection.execute("DELETE FROM sms_challenges WHERE phone_hash = ?", (phone_hash,))
            self._insert_session(
                connection,
                session_id=session_id,
                user_id=effective_user_id,
                access_hash=access_hash,
                refresh_hash=refresh_hash,
                access_expires_at_ms=access_expires_at_ms,
                refresh_expires_at_ms=refresh_expires_at_ms,
                now_ms=now_ms,
            )
            return effective_user_id

    def refresh_session(
        self,
        *,
        refresh_hash: str,
        session_id: str,
        access_hash: str,
        new_refresh_hash: str,
        access_expires_at_ms: int,
        refresh_expires_at_ms: int,
        now_ms: int,
    ) -> str:
        with self.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            current = connection.execute(
                """
                SELECT id, user_id, refresh_expires_at_ms, revoked_at_ms
                FROM sessions WHERE refresh_hash = ?
                """,
                (refresh_hash,),
            ).fetchone()
            if current is None or current["revoked_at_ms"] is not None or current["refresh_expires_at_ms"] <= now_ms:
                raise ApiError(401, "INVALID_REFRESH_TOKEN", "登录状态已过期，请重新登录")
            changed = connection.execute(
                "UPDATE sessions SET revoked_at_ms = ?, last_used_at_ms = ? WHERE id = ? AND revoked_at_ms IS NULL",
                (now_ms, now_ms, current["id"]),
            ).rowcount
            if changed != 1:
                raise ApiError(401, "INVALID_REFRESH_TOKEN", "登录状态已过期，请重新登录")
            self._insert_session(
                connection,
                session_id=session_id,
                user_id=current["user_id"],
                access_hash=access_hash,
                refresh_hash=new_refresh_hash,
                access_expires_at_ms=access_expires_at_ms,
                refresh_expires_at_ms=refresh_expires_at_ms,
                now_ms=now_ms,
            )
            return current["user_id"]

    def authenticate(self, access_hash: str, now_ms: int) -> str:
        with self.connect() as connection:
            session = connection.execute(
                """
                SELECT id, user_id, access_expires_at_ms, refresh_expires_at_ms, revoked_at_ms
                FROM sessions WHERE access_hash = ?
                """,
                (access_hash,),
            ).fetchone()
            if (
                session is None
                or session["revoked_at_ms"] is not None
                or session["access_expires_at_ms"] <= now_ms
                or session["refresh_expires_at_ms"] <= now_ms
            ):
                raise ApiError(401, "INVALID_ACCESS_TOKEN", "登录状态已过期，请重新登录")
            connection.execute("UPDATE sessions SET last_used_at_ms = ? WHERE id = ?", (now_ms, session["id"]))
            return session["user_id"]

    def logout(self, access_hash: str, now_ms: int) -> None:
        with self.connect() as connection:
            connection.execute(
                "UPDATE sessions SET revoked_at_ms = ?, last_used_at_ms = ? WHERE access_hash = ? AND revoked_at_ms IS NULL",
                (now_ms, now_ms, access_hash),
            )

    def get_profile(self, user_id: str) -> Dict[str, Any]:
        with self.connect() as connection:
            row = connection.execute(
                """
                SELECT u.id, u.phone_last4, p.display_name, p.birth_date, p.city,
                       p.occupation, p.bio, p.avatar_filename, p.github_url, p.twitter_url, p.updated_at_ms
                FROM users u JOIN profiles p ON p.user_id = u.id
                WHERE u.id = ?
                """,
                (user_id,),
            ).fetchone()
            if row is None:
                raise ApiError(404, "ACCOUNT_NOT_FOUND", "账号不存在")
            return dict(row)

    def update_profile(self, user_id: str, patch: Dict[str, Any], now_ms: int) -> Dict[str, Any]:
        current = self.get_profile(user_id)
        values = {
            "display_name": patch.get("display_name", current["display_name"]),
            "birth_date": patch.get("birth_date", current["birth_date"]),
            "city": patch.get("city", current["city"]),
            "occupation": patch.get("occupation", current["occupation"]),
            "bio": patch.get("bio", current["bio"]),
            "github_url": patch.get("github_url", current.get("github_url")),
            "twitter_url": patch.get("twitter_url", current.get("twitter_url")),
        }
        with self.connect() as connection:
            connection.execute(
                """
                UPDATE profiles SET display_name = ?, birth_date = ?, city = ?, occupation = ?, bio = ?, github_url = ?, twitter_url = ?, updated_at_ms = ?
                WHERE user_id = ?
                """,
                (
                    values["display_name"],
                    values["birth_date"],
                    values["city"],
                    values["occupation"],
                    values["bio"],
                    values["github_url"],
                    values["twitter_url"],
                    now_ms,
                    user_id,
                ),
            )
        return self.get_profile(user_id)

    def set_avatar(self, user_id: str, filename: Optional[str], now_ms: int) -> Optional[str]:
        current = self.get_profile(user_id)
        with self.connect() as connection:
            connection.execute(
                "UPDATE profiles SET avatar_filename = ?, updated_at_ms = ? WHERE user_id = ?",
                (filename, now_ms, user_id),
            )
        return current["avatar_filename"]

    def create_payment_order(
        self,
        *,
        order_id: str,
        user_id: str,
        idempotency_key: str,
        request_fingerprint: str,
        plan_id: str,
        amount_fen: int,
        upgrade_context_id: str,
        now_ms: int,
    ) -> Dict[str, Any]:
        with self.connect() as connection:
            try:
                connection.execute(
                    """
                    INSERT INTO payment_orders(
                        id, user_id, idempotency_key, request_fingerprint, plan_id,
                        amount_fen, upgrade_context_id, status, created_at_ms, updated_at_ms
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'CREATING', ?, ?)
                    """,
                    (
                        order_id, user_id, idempotency_key, request_fingerprint, plan_id,
                        amount_fen, upgrade_context_id, now_ms, now_ms,
                    ),
                )
            except sqlite3.IntegrityError:
                existing = self.get_payment_order_by_idempotency(user_id, idempotency_key)
                if existing:
                    return existing
                raise
        return self.require_payment_order(user_id, order_id)

    def get_payment_order_by_idempotency(self, user_id: str, key: str) -> Optional[Dict[str, Any]]:
        with self.connect() as connection:
            row = connection.execute(
                "SELECT * FROM payment_orders WHERE user_id = ? AND idempotency_key = ?",
                (user_id, key),
            ).fetchone()
            return dict(row) if row else None

    def require_payment_order(self, user_id: str, order_id: str) -> Dict[str, Any]:
        with self.connect() as connection:
            row = connection.execute(
                "SELECT * FROM payment_orders WHERE id = ? AND user_id = ?",
                (order_id, user_id),
            ).fetchone()
            if row is None:
                raise ApiError(404, "PAYMENT_ORDER_NOT_FOUND", "支付订单不存在")
            return dict(row)

    def mark_payment_order_pending(
        self, order_id: str, provider_order_id: str, payment_params: Dict[str, Any], now_ms: int
    ) -> Dict[str, Any]:
        with self.connect() as connection:
            connection.execute(
                """
                UPDATE payment_orders
                SET provider_order_id = ?, payment_params_json = ?, status = 'PENDING',
                    error_code = NULL, updated_at_ms = ?
                WHERE id = ? AND status != 'PAID'
                """,
                (provider_order_id, json.dumps(payment_params, separators=(",", ":")), now_ms, order_id),
            )
            row = connection.execute("SELECT * FROM payment_orders WHERE id = ?", (order_id,)).fetchone()
            return dict(row)

    def mark_payment_order_failed(self, order_id: str, error_code: str, now_ms: int) -> None:
        with self.connect() as connection:
            connection.execute(
                """
                UPDATE payment_orders SET status = 'FAILED', error_code = ?, updated_at_ms = ?
                WHERE id = ? AND status != 'PAID'
                """,
                (error_code, now_ms, order_id),
            )

    def update_payment_order_status(
        self, order_id: str, status: str, now_ms: int, paid_at_ms: Optional[int] = None
    ) -> Dict[str, Any]:
        with self.connect() as connection:
            current = connection.execute("SELECT * FROM payment_orders WHERE id = ?", (order_id,)).fetchone()
            if current is None:
                raise ApiError(404, "PAYMENT_ORDER_NOT_FOUND", "支付订单不存在")
            if current["status"] != "PAID":
                effective_paid_at = (
                    int(paid_at_ms) if status == "PAID" and paid_at_ms is not None
                    else now_ms if status == "PAID" else current["paid_at_ms"]
                )
                connection.execute(
                    """
                    UPDATE payment_orders
                    SET status = ?, paid_at_ms = ?, error_code = NULL, updated_at_ms = ?
                    WHERE id = ?
                    """,
                    (status, effective_paid_at, now_ms, order_id),
                )
            row = connection.execute("SELECT * FROM payment_orders WHERE id = ?", (order_id,)).fetchone()
            return dict(row)

    def create_material(
        self,
        *,
        material_id: str,
        user_id: str,
        upgrade_context_id: str,
        object_key: str,
        file_name: str,
        media_type: str,
        size_bytes: int,
        sha256: str,
        consent_scope: str,
        scene_label: Optional[str],
        now_ms: int,
    ) -> Dict[str, Any]:
        with self.connect() as connection:
            connection.execute(
                """
                INSERT INTO materials(
                    id, user_id, upgrade_context_id, object_key, original_file_name,
                    media_type, size_bytes, sha256, consent_scope, scene_label,
                    status, created_at_ms, updated_at_ms
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'UPLOAD_PENDING', ?, ?)
                """,
                (
                    material_id, user_id, upgrade_context_id, object_key, file_name,
                    media_type, size_bytes, sha256, consent_scope, scene_label, now_ms, now_ms,
                ),
            )
        return self.require_material(user_id, material_id)

    def require_material(self, user_id: str, material_id: str) -> Dict[str, Any]:
        with self.connect() as connection:
            row = connection.execute(
                "SELECT * FROM materials WHERE id = ? AND user_id = ?",
                (material_id, user_id),
            ).fetchone()
            if row is None:
                raise ApiError(404, "MATERIAL_NOT_FOUND", "材料不存在")
            return dict(row)

    def mark_material_ready(self, material_id: str, now_ms: int) -> Dict[str, Any]:
        with self.connect() as connection:
            connection.execute(
                "UPDATE materials SET status = 'READY', updated_at_ms = ? WHERE id = ?",
                (now_ms, material_id),
            )
            row = connection.execute("SELECT * FROM materials WHERE id = ?", (material_id,)).fetchone()
            return dict(row)

    def list_materials(self, user_id: str, context_id: str) -> List[Dict[str, Any]]:
        with self.connect() as connection:
            return [
                dict(row) for row in connection.execute(
                    """
                    SELECT * FROM materials
                    WHERE user_id = ? AND upgrade_context_id = ?
                    ORDER BY created_at_ms ASC
                    """,
                    (user_id, context_id),
                ).fetchall()
            ]

    def delete_material(self, user_id: str, material_id: str) -> None:
        with self.connect() as connection:
            try:
                changed = connection.execute(
                    "DELETE FROM materials WHERE id = ? AND user_id = ?", (material_id, user_id)
                ).rowcount
            except sqlite3.IntegrityError as error:
                raise ApiError(409, "MATERIAL_IN_USE", "材料已被分析任务引用，不能单独删除") from error
            if changed != 1:
                raise ApiError(404, "MATERIAL_NOT_FOUND", "材料不存在")

    def require_ready_materials(
        self, user_id: str, context_id: str, material_ids: Iterable[str]
    ) -> List[Dict[str, Any]]:
        ids = list(material_ids)
        placeholders = ",".join("?" for _ in ids)
        with self.connect() as connection:
            rows = connection.execute(
                f"""
                SELECT * FROM materials
                WHERE user_id = ? AND upgrade_context_id = ? AND id IN ({placeholders})
                """,
                (user_id, context_id, *ids),
            ).fetchall()
        by_id = {row["id"]: dict(row) for row in rows}
        if len(by_id) != len(ids):
            raise ApiError(404, "MATERIAL_NOT_FOUND", "部分材料不存在或不属于当前分析")
        ordered = [by_id[item_id] for item_id in ids]
        if any(item["status"] != "READY" for item in ordered):
            raise ApiError(409, "MATERIAL_NOT_READY", "部分材料尚未完成上传核验")
        return ordered

    def create_analysis_job_placeholder(
        self,
        *,
        job_id: str,
        user_id: str,
        order_id: str,
        upgrade_context_id: str,
        plan_id: str,
        prompt_template_version: str,
        idempotency_key: str,
        request_fingerprint: str,
        material_ids: Iterable[str],
        now_ms: int,
    ) -> Dict[str, Any]:
        with self.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            try:
                connection.execute(
                    """
                    INSERT INTO analysis_jobs(
                        id, user_id, order_id, upgrade_context_id, plan_id,
                        prompt_template_version, idempotency_key, request_fingerprint,
                        status, created_at_ms, updated_at_ms
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'CREATING', ?, ?)
                    """,
                    (
                        job_id, user_id, order_id, upgrade_context_id, plan_id,
                        prompt_template_version, idempotency_key, request_fingerprint, now_ms, now_ms,
                    ),
                )
                connection.executemany(
                    "INSERT INTO analysis_job_materials(job_id, material_id) VALUES (?, ?)",
                    [(job_id, material_id) for material_id in material_ids],
                )
            except sqlite3.IntegrityError:
                existing = connection.execute(
                    "SELECT * FROM analysis_jobs WHERE user_id = ? AND idempotency_key = ?",
                    (user_id, idempotency_key),
                ).fetchone()
                if existing:
                    return dict(existing)
                raise
        return self.require_analysis_job(user_id, job_id)

    def mark_analysis_job_queued(self, user_id: str, job_id: str, provider_job_id: str, now_ms: int) -> Dict[str, Any]:
        with self.connect() as connection:
            connection.execute(
                """
                UPDATE analysis_jobs
                SET provider_job_id = ?, status = 'QUEUED', error_code = NULL, updated_at_ms = ?
                WHERE id = ? AND user_id = ? AND status = 'CREATING'
                """,
                (provider_job_id, now_ms, job_id, user_id),
            )
        return self.require_analysis_job(user_id, job_id)

    def mark_analysis_job_failed(self, user_id: str, job_id: str, error_code: str, now_ms: int) -> None:
        with self.connect() as connection:
            connection.execute(
                """
                UPDATE analysis_jobs SET status = 'FAILED', error_code = ?, updated_at_ms = ?
                WHERE id = ? AND user_id = ? AND status != 'SUCCEEDED'
                """,
                (error_code, now_ms, job_id, user_id),
            )

    def get_analysis_job_by_idempotency(self, user_id: str, key: str) -> Optional[Dict[str, Any]]:
        with self.connect() as connection:
            row = connection.execute(
                "SELECT * FROM analysis_jobs WHERE user_id = ? AND idempotency_key = ?",
                (user_id, key),
            ).fetchone()
            return dict(row) if row else None

    def require_analysis_job(self, user_id: str, job_id: str) -> Dict[str, Any]:
        with self.connect() as connection:
            row = connection.execute(
                "SELECT * FROM analysis_jobs WHERE id = ? AND user_id = ?",
                (job_id, user_id),
            ).fetchone()
            if row is None:
                raise ApiError(404, "ANALYSIS_JOB_NOT_FOUND", "分析任务不存在")
            return dict(row)

    def update_analysis_job_status(
        self, user_id: str, job_id: str, status: str, error_code: Optional[str], now_ms: int
    ) -> Dict[str, Any]:
        with self.connect() as connection:
            connection.execute(
                """
                UPDATE analysis_jobs SET status = ?, error_code = ?, updated_at_ms = ?
                WHERE id = ? AND user_id = ? AND status != 'SUCCEEDED'
                """,
                (status, error_code, now_ms, job_id, user_id),
            )
        return self.require_analysis_job(user_id, job_id)

    def complete_analysis_job(
        self,
        *,
        user_id: str,
        job_id: str,
        report_id: str,
        report_content: Dict[str, Any],
        ai_content_label: str,
        now_ms: int,
    ) -> Dict[str, Any]:
        with self.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            job = connection.execute(
                "SELECT * FROM analysis_jobs WHERE id = ? AND user_id = ?", (job_id, user_id)
            ).fetchone()
            if job is None:
                raise ApiError(404, "ANALYSIS_JOB_NOT_FOUND", "分析任务不存在")
            if job["status"] == "SUCCEEDED":
                return dict(job)
            connection.execute(
                """
                INSERT INTO reports(
                    id, user_id, job_id, upgrade_context_id, plan_id,
                    prompt_template_version, content_json, ai_content_label, created_at_ms
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    report_id, user_id, job_id, job["upgrade_context_id"], job["plan_id"],
                    job["prompt_template_version"],
                    json.dumps(report_content, ensure_ascii=False, separators=(",", ":")),
                    ai_content_label, now_ms,
                ),
            )
            connection.execute(
                """
                UPDATE analysis_jobs
                SET status = 'SUCCEEDED', report_id = ?, error_code = NULL, updated_at_ms = ?
                WHERE id = ?
                """,
                (report_id, now_ms, job_id),
            )
            row = connection.execute("SELECT * FROM analysis_jobs WHERE id = ?", (job_id,)).fetchone()
            return dict(row)

    def require_report(self, user_id: str, report_id: str) -> Dict[str, Any]:
        with self.connect() as connection:
            row = connection.execute(
                "SELECT * FROM reports WHERE id = ? AND user_id = ?", (report_id, user_id)
            ).fetchone()
            if row is None:
                raise ApiError(404, "REPORT_NOT_FOUND", "分析报告不存在")
            return dict(row)

    def account_resources(self, user_id: str) -> Dict[str, Any]:
        profile = self.get_profile(user_id)
        with self.connect() as connection:
            object_keys = [
                row["object_key"] for row in connection.execute(
                    "SELECT object_key FROM materials WHERE user_id = ?", (user_id,)
                ).fetchall()
            ]
        return {"avatar_filename": profile.get("avatar_filename"), "object_keys": object_keys}

    def delete_account(self, user_id: str) -> None:
        with self.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            changed = connection.execute("DELETE FROM users WHERE id = ?", (user_id,)).rowcount
            if changed != 1:
                raise ApiError(404, "ACCOUNT_NOT_FOUND", "账号不存在")

    def integrity_check(self) -> bool:
        with self.connect() as connection:
            return connection.execute("PRAGMA integrity_check").fetchone()[0] == "ok"

    def _insert_session(
        self,
        connection: sqlite3.Connection,
        *,
        session_id: str,
        user_id: str,
        access_hash: str,
        refresh_hash: str,
        access_expires_at_ms: int,
        refresh_expires_at_ms: int,
        now_ms: int,
    ) -> None:
        connection.execute(
            """
            INSERT INTO sessions(
                id, user_id, access_hash, refresh_hash, access_expires_at_ms,
                refresh_expires_at_ms, created_at_ms, last_used_at_ms
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                session_id,
                user_id,
                access_hash,
                refresh_hash,
                access_expires_at_ms,
                refresh_expires_at_ms,
                now_ms,
                now_ms,
            ),
        )

    def _prune(self, connection: sqlite3.Connection, now_ms: int) -> None:
        connection.execute("DELETE FROM sms_events WHERE created_at_ms < ?", (now_ms - 86_400_000,))
        connection.execute("DELETE FROM sms_challenges WHERE expires_at_ms <= ?", (now_ms,))
        connection.execute(
            "DELETE FROM sessions WHERE refresh_expires_at_ms <= ? OR (revoked_at_ms IS NOT NULL AND revoked_at_ms < ?)",
            (now_ms, now_ms - 86_400_000),
        )
