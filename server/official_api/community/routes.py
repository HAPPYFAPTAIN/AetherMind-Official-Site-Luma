from __future__ import annotations

import base64
import os
import re
import time
from typing import Any, Callable, Dict, Optional

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, ConfigDict, Field

from ..auth.service import normalize_profile_patch
from ..crypto import random_id
from ..db import Database
from ..errors import ApiError


TEXT_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")
CATEGORIES = {"discussion", "materials", "simulation", "methods"}
CURSOR_RE = re.compile(r"^([01]):([0-9]{1,16}):([A-Za-z0-9_-]+)$")


class CommunityModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


class PostCreate(CommunityModel):
    title: str = Field(min_length=4, max_length=120)
    body: str = Field(min_length=1, max_length=12000)
    category: str = Field(default="discussion", min_length=2, max_length=32)


class ReplyCreate(CommunityModel):
    body: str = Field(min_length=1, max_length=8000)


class ModerationPatch(CommunityModel):
    reason: Optional[str] = Field(default=None, max_length=240)


class PublicProfilePatch(CommunityModel):
    displayName: str = Field(min_length=1, max_length=24)
    city: Optional[str] = Field(default=None, max_length=40)
    bio: Optional[str] = Field(default=None, max_length=160)
    githubUrl: Optional[str] = Field(default=None, max_length=200)
    twitterUrl: Optional[str] = Field(default=None, max_length=200)


def mount_community_routes(app: Any, database: Database, current_user: Callable[[Any], str]) -> None:
    router = APIRouter(prefix="/api/v1/community", tags=["community"])

    def clean(value: Any, label: str, maximum: int) -> str:
        text = str(value or "").replace("\r\n", "\n").replace("\r", "\n").strip()
        if not text or len(text) > maximum or TEXT_RE.search(text):
            raise ApiError(400, "INVALID_COMMUNITY_TEXT", f"{label}格式不正确")
        return text

    def optional_reason(value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        return clean(value, "操作说明", 240)

    def role_for(user_id: str) -> Optional[str]:
        configured = {value.strip() for value in os.getenv("COMMUNITY_ADMIN_USER_IDS", "").split(",") if value.strip()}
        if user_id in configured:
            return "ADMIN"
        with database.connect() as connection:
            row = connection.execute("SELECT role FROM community_admins WHERE user_id = ?", (user_id,)).fetchone()
            return row["role"] if row else None

    def require_moderator(user_id: str) -> str:
        role = role_for(user_id)
        if role is None:
            raise ApiError(403, "COMMUNITY_MODERATOR_REQUIRED", "需要社区管理员权限")
        return role

    def public_profile(user_id: str) -> Dict[str, Any]:
        row = database.get_profile(user_id)
        with database.connect() as connection:
            saved = connection.execute("SELECT * FROM community_profiles WHERE user_id=?", (user_id,)).fetchone()
        public = dict(saved) if saved else {}
        return {
            "userId": row["id"],
            "displayName": row["display_name"],
            "avatarUrl": f"/api/v1/avatars/{row['avatar_filename']}" if row.get("avatar_filename") else None,
            "city": public.get("city"),
            "bio": public.get("bio"),
            "githubUrl": public.get("github_url"),
            "twitterUrl": public.get("twitter_url"),
        }

    def profile_with_role(user_id: str) -> Dict[str, Any]:
        return {**public_profile(user_id), "role": role_for(user_id)}

    def encode_cursor(pinned: int, updated_at_ms: int, post_id: str) -> str:
        raw = f"{pinned}:{updated_at_ms}:{post_id}".encode("utf-8")
        return base64.urlsafe_b64encode(raw).decode("ascii").rstrip("=")

    def decode_cursor(value: Optional[str]) -> Optional[tuple[int, int, str]]:
        if not value:
            return None
        try:
            padded = value + "=" * (-len(value) % 4)
            decoded = base64.urlsafe_b64decode(padded).decode("utf-8")
        except (ValueError, UnicodeDecodeError):
            raise ApiError(400, "INVALID_CURSOR", "列表游标无效") from None
        match = CURSOR_RE.fullmatch(decoded)
        if not match:
            raise ApiError(400, "INVALID_CURSOR", "列表游标无效")
        return int(match.group(1)), int(match.group(2)), match.group(3)

    def post_item(connection: Any, row: Any, *, include_hidden: bool = False) -> Dict[str, Any]:
        if row is None or (not include_hidden and row["status"] == "HIDDEN"):
            raise ApiError(404, "COMMUNITY_POST_NOT_FOUND", "帖子不存在")
        item = dict(row)
        author_id = item.pop("author_id")
        item["author"] = public_profile(author_id)
        item["replyCount"] = item.pop("reply_count", 0)
        item["pinned"] = bool(item["pinned"])
        item["createdAtEpochMs"] = item.pop("created_at_ms")
        item["updatedAtEpochMs"] = item.pop("updated_at_ms")
        item["closedAtEpochMs"] = item.pop("closed_at_ms")
        item["closedBy"] = item.pop("closed_by")
        item["closeReason"] = item.pop("close_reason")
        item["acceptedReplyId"] = item.pop("accepted_reply_id", None)
        return item

    def select_post(connection: Any, post_id: str) -> Any:
        return connection.execute(
            """SELECT p.*,
                      (SELECT COUNT(*) FROM community_replies r
                       WHERE r.post_id=p.id AND r.status='VISIBLE') AS reply_count
               FROM community_posts p WHERE p.id=?""",
            (post_id,),
        ).fetchone()

    def moderation_event(connection: Any, actor_id: str, post_id: Optional[str], reply_id: Optional[str], action: str, reason: Optional[str], now: int) -> None:
        connection.execute(
            "INSERT INTO community_moderation_events(id,actor_id,post_id,reply_id,action,reason,created_at_ms) VALUES (?,?,?,?,?,?,?)",
            (random_id(), actor_id, post_id, reply_id, action, reason, now),
        )

    def post_limit(connection: Any, user_id: str, now: int) -> None:
        count = connection.execute(
            "SELECT COUNT(*) FROM community_posts WHERE author_id=? AND created_at_ms>=?",
            (user_id, now - 3_600_000),
        ).fetchone()[0]
        if count >= 10:
            raise ApiError(429, "COMMUNITY_RATE_LIMITED", "发帖过于频繁，请稍后再试", retryable=True, retry_after_seconds=3600)

    def reply_limit(connection: Any, user_id: str, now: int) -> None:
        count = connection.execute(
            "SELECT COUNT(*) FROM community_replies WHERE author_id=? AND created_at_ms>=?",
            (user_id, now - 3_600_000),
        ).fetchone()[0]
        if count >= 40:
            raise ApiError(429, "COMMUNITY_RATE_LIMITED", "回复过于频繁，请稍后再试", retryable=True, retry_after_seconds=3600)

    @router.get("/me")
    def me(user_id: str = Depends(current_user)) -> Dict[str, Any]:
        return profile_with_role(user_id)

    @router.patch("/me")
    def update_me(body: PublicProfilePatch, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        patch = normalize_profile_patch(body.model_dump())
        now = int(time.time() * 1000)
        with database.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            connection.execute("UPDATE profiles SET display_name=?,updated_at_ms=? WHERE user_id=?", (patch["display_name"], now, user_id))
            connection.execute(
                """INSERT INTO community_profiles(user_id,city,bio,github_url,twitter_url,updated_at_ms)
                   VALUES (?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET
                   city=excluded.city,bio=excluded.bio,github_url=excluded.github_url,
                   twitter_url=excluded.twitter_url,updated_at_ms=excluded.updated_at_ms""",
                (user_id,patch["city"],patch["bio"],patch["github_url"],patch["twitter_url"],now),
            )
        return profile_with_role(user_id)

    @router.get("/profiles/{user_id}")
    def get_public_profile(user_id: str) -> Dict[str, Any]:
        with database.connect() as connection:
            exists = connection.execute(
                """SELECT 1 FROM community_profiles WHERE user_id=?
                   UNION SELECT 1 FROM community_posts WHERE author_id=? AND status!='HIDDEN'
                   UNION SELECT 1 FROM community_replies r JOIN community_posts p ON p.id=r.post_id
                   WHERE r.author_id=? AND r.status='VISIBLE' AND p.status!='HIDDEN' LIMIT 1""",
                (user_id,user_id,user_id),
            ).fetchone()
        if not exists:
            raise ApiError(404, "COMMUNITY_PROFILE_NOT_FOUND", "社区资料不存在")
        return public_profile(user_id)

    @router.get("/posts")
    def list_posts(
        status: str = Query(default="OPEN", pattern="^(OPEN|CLOSED)$"),
        category: Optional[str] = Query(default=None, max_length=32),
        cursor: Optional[str] = Query(default=None, max_length=160),
        q: str = Query(default="", max_length=100),
        limit: int = Query(default=20, ge=1, le=50),
        order: str = Query(default="default", pattern="^(default|new|popular|replies|pinned)$"),
        offset: int = Query(default=0, ge=0, le=100000),
    ) -> Dict[str, Any]:
        if category and category not in CATEGORIES:
            raise ApiError(400, "INVALID_CATEGORY", "讨论分类不正确")
        decoded = decode_cursor(cursor) if order == "default" else None
        conditions = ["p.status=?"]
        params: list[Any] = [status]
        if order == "pinned":
            conditions.append("p.pinned=1")
        if order == "replies":
            conditions.append("EXISTS(SELECT 1 FROM community_replies r WHERE r.post_id=p.id AND r.status='VISIBLE')")
        if category:
            conditions.append("p.category=?")
            params.append(category)
        if q.strip():
            conditions.append("(instr(lower(p.title),lower(?))>0 OR instr(lower(p.body),lower(?))>0)")
            params.extend((q.strip(),q.strip()))
        if decoded:
            pinned, timestamp, post_id = decoded
            conditions.append("(p.pinned,p.updated_at_ms,p.id) < (?,?,?)")
            params.extend((pinned,timestamp,post_id))
        params.append(limit + 1)
        params.append(offset)
        ordering = {
            "default": "p.pinned DESC, p.updated_at_ms DESC, p.id DESC",
            "new": "p.created_at_ms DESC, p.id DESC",
            "popular": "reply_count DESC, p.updated_at_ms DESC, p.id DESC",
            "replies": "last_reply_at DESC, p.id DESC",
            "pinned": "p.updated_at_ms DESC, p.id DESC",
        }[order]
        with database.connect() as connection:
            rows = connection.execute(
                f"""SELECT p.*,
                          (SELECT COUNT(*) FROM community_replies r
                           WHERE r.post_id=p.id AND r.status='VISIBLE') AS reply_count,
                          (SELECT MAX(r.created_at_ms) FROM community_replies r
                           WHERE r.post_id=p.id AND r.status='VISIBLE') AS last_reply_at
                   FROM community_posts p WHERE {' AND '.join(conditions)}
                   ORDER BY {ordering} LIMIT ? OFFSET ?""",
                params,
            ).fetchall()
            items = [post_item(connection, row) for row in rows[:limit]]
            next_cursor = encode_cursor(rows[limit - 1]["pinned"], rows[limit - 1]["updated_at_ms"], rows[limit - 1]["id"]) if len(rows) > limit else None
            return {"items": items, "nextCursor": next_cursor,
                    "nextOffset": offset + limit if len(rows)>limit else None}

    @router.get("/overview")
    def overview() -> Dict[str, Any]:
        # Only public community participants count, never the private LLMer account population.
        with database.connect() as connection:
            activity = """SELECT author_id,created_at_ms FROM community_posts WHERE status!='HIDDEN'
                UNION ALL SELECT r.author_id,r.created_at_ms FROM community_replies r
                JOIN community_posts p ON p.id=r.post_id WHERE r.status='VISIBLE' AND p.status!='HIDDEN'"""
            members = connection.execute(f"""SELECT author_id,COUNT(*) activity,MAX(created_at_ms) last_active
                FROM ({activity}) GROUP BY author_id ORDER BY last_active DESC,activity DESC,author_id LIMIT 12""").fetchall()
            member_count = connection.execute(f"SELECT COUNT(DISTINCT author_id) FROM ({activity})").fetchone()[0]
            topics = connection.execute("SELECT COUNT(*) FROM community_posts WHERE status!='HIDDEN'").fetchone()[0]
            replies = connection.execute("""SELECT COUNT(*) FROM community_replies r JOIN community_posts p ON p.id=r.post_id
                WHERE r.status='VISIBLE' AND p.status!='HIDDEN'""").fetchone()[0]
        return {"members":member_count,"topics":topics,"replies":replies,
                "activeMembers":[public_profile(row["author_id"]) for row in members]}

    @router.get("/posts/{post_id}")
    def get_post(post_id: str) -> Dict[str, Any]:
        with database.connect() as connection:
            post = post_item(connection, select_post(connection, post_id))
            replies = connection.execute(
                """SELECT * FROM community_replies
                   WHERE post_id=? AND status='VISIBLE'
                   ORDER BY created_at_ms ASC, id ASC LIMIT 51""",
                (post_id,),
            ).fetchall()
            post["replies"] = []
            post["nextReplyOffset"] = 50 if len(replies)>50 else None
            for reply in replies[:50]:
                item = dict(reply)
                item["author"] = public_profile(item.pop("author_id"))
                item["createdAtEpochMs"] = item.pop("created_at_ms")
                item["updatedAtEpochMs"] = item.pop("updated_at_ms")
                item.pop("post_id", None)
                post["replies"].append(item)
            return post

    @router.get("/posts/{post_id}/replies")
    def list_replies(post_id: str, offset: int = Query(default=0, ge=0)) -> Dict[str, Any]:
        with database.connect() as connection:
            post_item(connection, select_post(connection, post_id))
            rows = connection.execute(
                "SELECT * FROM community_replies WHERE post_id=? AND status='VISIBLE' ORDER BY created_at_ms,id LIMIT 51 OFFSET ?",
                (post_id, offset),
            ).fetchall()
            return {"items": [{"id":r["id"],"body":r["body"],"status":r["status"],"createdAtEpochMs":r["created_at_ms"],"author":public_profile(r["author_id"])} for r in rows[:50]],
                    "nextOffset": offset + 50 if len(rows)>50 else None}

    @router.post("/posts", status_code=201)
    def create_post(body: PostCreate, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        title = clean(body.title, "标题", 120)
        if len(title) < 4 or "\n" in title or "\t" in title:
            raise ApiError(400, "INVALID_TITLE", "标题需要 4 至 120 个字符，且不能换行")
        content = clean(body.body, "内容", 12000)
        category = clean(body.category, "分类", 32).lower()
        if category not in CATEGORIES:
            raise ApiError(400, "INVALID_CATEGORY", "讨论分类不正确")
        now = int(time.time() * 1000)
        post_id = random_id()
        with database.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            post_limit(connection, user_id, now)
            connection.execute(
                """INSERT INTO community_posts
                   (id,author_id,title,body,category,status,created_at_ms,updated_at_ms)
                   VALUES (?,?,?,?,?,'OPEN',?,?)""",
                (post_id, user_id, title, content, category, now, now),
            )
            return post_item(connection, select_post(connection, post_id))

    @router.post("/posts/{post_id}/replies", status_code=201)
    def create_reply(post_id: str, body: ReplyCreate, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        content = clean(body.body, "回复", 8000)
        now = int(time.time() * 1000)
        reply_id = random_id()
        with database.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            post = connection.execute("SELECT status FROM community_posts WHERE id=?", (post_id,)).fetchone()
            if post is None or post["status"] == "HIDDEN":
                raise ApiError(404, "COMMUNITY_POST_NOT_FOUND", "帖子不存在")
            if post["status"] == "CLOSED":
                raise ApiError(409, "COMMUNITY_POST_CLOSED", "问题已关闭，不能继续回复")
            reply_limit(connection, user_id, now)
            connection.execute(
                """INSERT INTO community_replies
                   (id,post_id,author_id,body,status,created_at_ms,updated_at_ms)
                   VALUES (?,?,?,?,'VISIBLE',?,?)""",
                (reply_id, post_id, user_id, content, now, now),
            )
            connection.execute("UPDATE community_posts SET updated_at_ms=? WHERE id=?", (now, post_id))
            row = connection.execute("SELECT * FROM community_replies WHERE id=?", (reply_id,)).fetchone()
            item = dict(row)
            item["author"] = public_profile(item.pop("author_id"))
            item["createdAtEpochMs"] = item.pop("created_at_ms")
            item["updatedAtEpochMs"] = item.pop("updated_at_ms")
            item.pop("post_id", None)
            return item

    def change_post(post_id: str, action: str, reason: Optional[str], actor_id: str) -> Dict[str, Any]:
        reason = optional_reason(reason)
        now = int(time.time() * 1000)
        with database.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            post = select_post(connection, post_id)
            if post is None:
                raise ApiError(404, "COMMUNITY_POST_NOT_FOUND", "帖子不存在")
            role = role_for(actor_id)
            if not (action == "close" and post["author_id"] == actor_id and post["status"] == "OPEN") and role is None:
                raise ApiError(403, "COMMUNITY_MODERATOR_REQUIRED", "需要社区管理员权限")
            if post["status"] == "HIDDEN" and action not in {"restore", "hide"}:
                raise ApiError(409, "COMMUNITY_POST_HIDDEN", "请先恢复显示，再修改讨论状态")
            if action == "close":
                connection.execute(
                    "UPDATE community_posts SET status='CLOSED',closed_at_ms=?,closed_by=?,close_reason=?,updated_at_ms=? WHERE id=?",
                    (now, actor_id, reason, now, post_id),
                )
            elif action == "reopen":
                connection.execute(
                    "UPDATE community_posts SET status='OPEN',closed_at_ms=NULL,closed_by=NULL,close_reason=NULL,updated_at_ms=? WHERE id=?",
                    (now, post_id),
                )
            elif action == "hide":
                connection.execute("UPDATE community_posts SET status='HIDDEN',updated_at_ms=? WHERE id=?", (now, post_id))
            elif action == "restore":
                restored = "CLOSED" if post["closed_at_ms"] is not None else "OPEN"
                connection.execute("UPDATE community_posts SET status=?,updated_at_ms=? WHERE id=?", (restored, now, post_id))
            elif action == "pin":
                connection.execute("UPDATE community_posts SET pinned=1,updated_at_ms=? WHERE id=?", (now, post_id))
            elif action == "unpin":
                connection.execute("UPDATE community_posts SET pinned=0,updated_at_ms=? WHERE id=?", (now, post_id))
            else:
                raise ApiError(400, "COMMUNITY_ACTION_INVALID", "不支持的管理操作")
            moderation_event(connection, actor_id, post_id, None, action, reason, now)
            return post_item(connection, select_post(connection, post_id), include_hidden=True)

    @router.patch("/posts/{post_id}/{action}")
    def moderate_post(post_id: str, action: str, body: ModerationPatch, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        if action not in {"close", "reopen", "hide", "restore", "pin", "unpin"}:
            raise ApiError(404, "COMMUNITY_ACTION_INVALID", "不支持的管理操作")
        return change_post(post_id, action, body.reason, user_id)

    @router.patch("/replies/{reply_id}/{action}")
    def moderate_reply(reply_id: str, action: str, body: ModerationPatch, user_id: str = Depends(current_user)) -> Dict[str, Any]:
        if action not in {"hide", "restore"}:
            raise ApiError(404, "COMMUNITY_ACTION_INVALID", "不支持的管理操作")
        require_moderator(user_id)
        reason = optional_reason(body.reason)
        now = int(time.time() * 1000)
        with database.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            reply = connection.execute("SELECT id,post_id FROM community_replies WHERE id=?", (reply_id,)).fetchone()
            if reply is None:
                raise ApiError(404, "COMMUNITY_REPLY_NOT_FOUND", "回复不存在")
            status = "HIDDEN" if action == "hide" else "VISIBLE"
            connection.execute("UPDATE community_replies SET status=?,updated_at_ms=? WHERE id=?", (status, now, reply_id))
            moderation_event(connection, user_id, reply["post_id"], reply_id, action, reason, now)
            return {"id": reply_id, "status": status}

    @router.get("/moderation/queue")
    def moderation_queue(user_id: str = Depends(current_user)) -> Dict[str, Any]:
        require_moderator(user_id)
        with database.connect() as connection:
            posts = connection.execute(
                """SELECT p.*,(SELECT COUNT(*) FROM community_replies r WHERE r.post_id=p.id AND r.status='VISIBLE') reply_count
                   FROM community_posts p WHERE p.status='HIDDEN' ORDER BY p.updated_at_ms DESC LIMIT 100"""
            ).fetchall()
            events = connection.execute(
                "SELECT id,actor_id,post_id,reply_id,action,reason,created_at_ms FROM community_moderation_events ORDER BY created_at_ms DESC LIMIT 100"
            ).fetchall()
            replies = connection.execute(
                "SELECT id,post_id,body FROM community_replies WHERE status='HIDDEN' ORDER BY updated_at_ms DESC LIMIT 100"
            ).fetchall()
            return {"hiddenPosts": [post_item(connection, row, include_hidden=True) for row in posts],
                    "hiddenReplies": [dict(row) for row in replies], "events": [dict(row) for row in events]}

    from .consent import mount_community_auth
    mount_community_auth(router, database, app.state.auth_service, current_user, role_for)
    app.include_router(router)
