from fastapi import Depends
from pydantic import BaseModel, ConfigDict, Field
from .challenge_service import ChallengeService
from .assessment_release import require_legacy_creation

class StartChallenge(BaseModel):
    model_config = ConfigDict(extra='forbid', strict=True)
    themeId: str = Field(min_length=1, max_length=32)
    requestId: str = Field(min_length=8, max_length=96)

class PurchaseChallenge(BaseModel):
    model_config = ConfigDict(extra='forbid', strict=True)
    code: str = Field(min_length=6, max_length=256)

def mount_challenge_routes(app, paid, current_user):
    service = ChallengeService(paid)
    app.state.challenge_service = service

    @app.get('/api/v1/challenge/capabilities')
    def capabilities():
        return service.capabilities()

    @app.get('/api/v1/challenge/access')
    def access(user_id: str = Depends(current_user)):
        return service.access(user_id)

    @app.post('/api/v1/challenge/runs', status_code=201)
    def start(body: StartChallenge, user_id: str = Depends(current_user)):
        require_legacy_creation()
        return service.start(user_id, body.themeId, body.requestId)

    @app.post('/api/v1/challenge/orders', status_code=201)
    def order(body: PurchaseChallenge, user_id: str = Depends(current_user)):
        require_legacy_creation()
        return service.create_order(user_id, body.code)

    @app.post('/api/v1/challenge/orders/{oid}/verify')
    def verify(oid: str, user_id: str = Depends(current_user)):
        return service.verify_order(user_id, oid)
