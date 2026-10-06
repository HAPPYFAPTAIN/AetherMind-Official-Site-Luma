"""Portal-facing MD-Agent state. Entry remains closed until per-user binding is configured."""
from fastapi import APIRouter, Depends
from llmer_api.errors import ApiError


def mount_md_agent(app, workspace, current_user):
    router = APIRouter(prefix="/api/v1/console/md-agent", tags=["md-agent-portal"])

    @router.get("/profile")
    def profile(uid: str = Depends(current_user)):
        with workspace.db.connect() as c:
            qualifications = [dict(row) for row in c.execute(
                "SELECT product_id, invitation_code, created_at_ms FROM official_md_agent_qualifications WHERE user_id=? ORDER BY created_at_ms DESC",
                (uid,),
            )]
        return {
            "accountBinding": "unbound",
            "qualifications": qualifications,
            "model": {
                "providers": ["kimi", "deepseek"],
                "status": "not_configured",
                "provider": None,
                "modelId": None,
                "verifiedAt": None,
            },
            "compute": {
                "status": "not_connected",
                "canSubmit": False,
                "reasonCode": "COMPUTE_NOT_CONNECTED",
            },
        }

    @router.post("/enter")
    def enter(uid: str = Depends(current_user)):
        raise ApiError(409, "MD_AGENT_BINDING_REQUIRED", "请先用对应邀请码绑定 MD-Agent 账户")

    app.include_router(router)
