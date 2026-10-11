from __future__ import annotations

import math
import sqlite3
import time
import fcntl
from pathlib import Path
from typing import Any, Dict, Optional

from ..branding import DEFAULT_PROFILE_DISPLAY_NAME
from ..errors import ApiError


# Keep SQLite's legacy user_version at the highest value understood by the
# older production binary.  New migration progress is tracked exclusively in
# schema_migrations so a rollback to that binary remains possible.
SCHEMA_VERSION = 3
MIGRATIONS_DIR = Path(__file__).with_name('migrations')

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
        # journal_mode changes require exclusive access too: acquiring the
        # process lock only inside migrate leaves two fresh startups racing on
        # PRAGMA journal_mode before they reach the migration lock.
        lock_path = self.path.with_name(self.path.name + '.migrate.lock')
        with lock_path.open('a+') as lock:
            fcntl.flock(lock.fileno(), fcntl.LOCK_EX)
            try:
                with self.connect() as connection:
                    connection.execute("PRAGMA journal_mode = WAL")
                    connection.execute("PRAGMA synchronous = NORMAL")
                    # Each migration commits separately so a later failure
                    # cannot undo already committed history.
                    connection.execute("BEGIN IMMEDIATE")
                    try:
                        current_version = connection.execute("PRAGMA user_version").fetchone()[0]
                        if current_version < 0 or current_version > SCHEMA_VERSION:
                            raise RuntimeError(f"unsupported database schema {current_version}")
                        connection.commit()
                        self._migrate_locked(connection)
                        connection.execute("BEGIN IMMEDIATE")
                        connection.execute(f"PRAGMA user_version = {SCHEMA_VERSION}")
                        connection.commit()
                    except Exception:
                        connection.rollback()
                        raise
            finally:
                fcntl.flock(lock.fileno(), fcntl.LOCK_UN)

    def migrate(self, connection: sqlite3.Connection) -> None:
        """按编号执行 migrations/ 下的 SQL 迁移；单个迁移与其记录同事务提交。"""
        # The auth and gateway processes share this SQLite database and may
        # start together. Serialize the migration runner outside SQLite so
        # both processes cannot observe the same unapplied version.
        lock_path = self.path.with_name(self.path.name + '.migrate.lock')
        lock_path.parent.mkdir(parents=True, exist_ok=True)
        with lock_path.open('a+') as lock:
            fcntl.flock(lock.fileno(), fcntl.LOCK_EX)
            self._migrate_locked(connection)
            fcntl.flock(lock.fileno(), fcntl.LOCK_UN)

    def _migrate_locked(self, connection: sqlite3.Connection) -> None:
        files = sorted(
            (int(path.name.split('_', 1)[0]), path)
            for path in MIGRATIONS_DIR.glob('[0-9][0-9][0-9][0-9]_*.sql')
        )
        if not files:
            raise RuntimeError(f"no migrations found in {MIGRATIONS_DIR}")
        connection.execute("BEGIN IMMEDIATE")
        try:
            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS schema_migrations (
                    version INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    applied_at_ms INTEGER NOT NULL
                )
                """
            )
            applied = {row[0] for row in connection.execute("SELECT version FROM schema_migrations").fetchall()}
            if not applied:
                # 基线同化：users 已存在说明是迁移机制落地前的既有库，直接登记 0001。
                legacy = connection.execute(
                    "SELECT 1 FROM sqlite_master WHERE type='table' AND name='users'"
                ).fetchone()
                if legacy is not None:
                    connection.execute(
                        "INSERT INTO schema_migrations VALUES(?,?,?)",
                        (files[0][0], files[0][1].name, int(time.time() * 1000)),
                    )
            connection.commit()
        except Exception:
            connection.rollback()
            raise
        for version, path in files:
            connection.execute("BEGIN IMMEDIATE")
            try:
                if connection.execute("SELECT 1 FROM schema_migrations WHERE version=?", (version,)).fetchone():
                    connection.commit()
                    continue
                # The lock is reacquired for every version. If another service
                # startup committed it after the previous version, this read
                # observes that record and skips without duplicating DDL.
                body = path.read_text(encoding='utf-8').replace('{now_ms}', str(int(time.time() * 1000)))
                statement = ''
                for line in body.splitlines(keepends=True):
                    statement += line
                    if sqlite3.complete_statement(statement):
                        if statement.strip():
                            connection.execute(statement)
                        statement = ''
                if statement.strip():
                    connection.execute(statement)
                connection.execute(
                    "INSERT INTO schema_migrations VALUES(?,?,?)",
                    (version, path.name, int(time.time() * 1000)),
                )
                connection.commit()
            except Exception:
                connection.rollback()
                raise
        if connection.execute("PRAGMA integrity_check").fetchone()[0] != "ok":
            raise RuntimeError("database integrity check failed after migrations")

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
            self.insert_session(
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
            self.insert_session(
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

    def integrity_check(self) -> bool:
        with self.connect() as connection:
            return connection.execute("PRAGMA integrity_check").fetchone()[0] == "ok"

    def insert_session(
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
