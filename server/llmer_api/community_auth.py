"""Community consent and optional invitations; SMS verification remains in AuthService."""
from __future__ import annotations

import re
import secrets
import time
from typing import Optional
from fastapi import Depends, Request
from pydantic import BaseModel, ConfigDict, Field
from .errors import ApiError

TERMS_VERSION = "2026-10-01"

class LoginRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    phone: str = Field(max_length=32)
    code: str = Field(max_length=8)
    inviteCode: Optional[str] = Field(default=None, max_length=32)
    acceptedTerms: bool = False
    termsVersion: str = Field(max_length=32)

class InviteCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    label: str = Field(default="", max_length=80)
    validDays: int = Field(default=30, ge=1, le=365)

def mount_community_auth(router, database, service, current_user, role_for):
    with database.connect() as connection:
        connection.executescript("""
            CREATE TABLE IF NOT EXISTS community_invitations (
                code TEXT PRIMARY KEY,
                label TEXT NOT NULL,
                created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
                created_at_ms INTEGER NOT NULL,
                expires_at_ms INTEGER NOT NULL,
                revoked_at_ms INTEGER
            );
            CREATE TABLE IF NOT EXISTS community_invitation_members (
                user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
                code TEXT NOT NULL REFERENCES community_invitations(code),
                joined_at_ms INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS community_consents (
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                version TEXT NOT NULL,
                accepted_at_ms INTEGER NOT NULL,
                PRIMARY KEY(user_id,version)
            );
        """)

    def require_admin(user_id):
        if role_for(user_id) != "ADMIN":
            raise ApiError(403,"COMMUNITY_ADMIN_REQUIRED","需要社区管理员权限")

    def require_invitation(connection,code,now):
        invitation=connection.execute("SELECT * FROM community_invitations WHERE code=?",(code,)).fetchone()
        if not invitation or invitation["revoked_at_ms"] is not None or invitation["expires_at_ms"] <= now:
            raise ApiError(400,"INVALID_INVITATION","邀请码无效或已过期，请检查后重试，也可以留空登录")

    @router.post("/auth/sms/verify")
    def verify(body:LoginRequest,request:Request):
        if not body.acceptedTerms or body.termsVersion != TERMS_VERSION:
            raise ApiError(400,"TERMS_ACCEPTANCE_REQUIRED","请阅读并同意当前版本的服务条款与隐私协议")
        invite=(body.inviteCode or "").strip().upper()
        if invite and not re.fullmatch(r"[A-F0-9]{12}",invite):
            raise ApiError(400,"INVALID_INVITATION","邀请码格式不正确，也可以留空登录")
        if invite:
            with database.connect() as connection:
                require_invitation(connection,invite,int(time.time()*1000))
        # Reuse the same trusted-proxy and provider logic as existing SMS endpoints.
        from .main import client_ip
        session=service.verify_sms_code(body.phone,body.code,client_ip(request))
        user_id=session["profile"]["userId"]
        now=int(time.time()*1000)
        try:
            with database.connect() as connection:
                connection.execute("BEGIN IMMEDIATE")
                if invite:
                    require_invitation(connection,invite,now)
                    existing=connection.execute("SELECT code FROM community_invitation_members WHERE user_id=?",(user_id,)).fetchone()
                    if existing and existing["code"] != invite:
                        raise ApiError(409,"INVITATION_ALREADY_LINKED","此账号已经关联其他邀请码，请留空登录")
                    connection.execute("INSERT OR IGNORE INTO community_invitation_members VALUES(?,?,?)",(user_id,invite,now))
                connection.execute("INSERT OR IGNORE INTO community_consents VALUES(?,?,?)",(user_id,TERMS_VERSION,now))
        except Exception:
            service.logout(session["accessToken"])
            raise
        return session

    @router.post("/admin/invitations",status_code=201)
    def create(body:InviteCreate,user_id:str=Depends(current_user)):
        require_admin(user_id)
        now=int(time.time()*1000)
        code=secrets.token_hex(6).upper()
        expires=now+body.validDays*86400000
        with database.connect() as connection:
            connection.execute("INSERT INTO community_invitations(code,label,created_by,created_at_ms,expires_at_ms) VALUES(?,?,?,?,?)",
                               (code,body.label.strip(),user_id,now,expires))
        return {"code":code,"label":body.label.strip(),"expiresAtEpochMs":expires}

    @router.get("/admin/invitations")
    def invitations(user_id:str=Depends(current_user)):
        require_admin(user_id)
        with database.connect() as connection:
            rows=connection.execute("""SELECT i.code,i.label,i.expires_at_ms,i.revoked_at_ms,
                (SELECT COUNT(*) FROM community_invitation_members m WHERE m.code=i.code) uses
                FROM community_invitations i ORDER BY created_at_ms DESC LIMIT 100""").fetchall()
        return {"items":[dict(row) for row in rows]}

    @router.delete("/admin/invitations/{code}")
    def revoke(code:str,user_id:str=Depends(current_user)):
        require_admin(user_id)
        with database.connect() as connection:
            updated=connection.execute("UPDATE community_invitations SET revoked_at_ms=? WHERE code=?",
                                       (int(time.time()*1000),code.upper()))
            if not updated.rowcount:
                raise ApiError(404,"INVITATION_NOT_FOUND","邀请码不存在")
        return {"revoked":True}
