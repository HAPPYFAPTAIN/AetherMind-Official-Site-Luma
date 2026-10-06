from fastapi.testclient import TestClient
from llmer_api.config import Settings
from llmer_api.community_auth import TERMS_VERSION
from official_api.app import create_app


class Sms:
    def send_code(self, phone):
        self.phone = phone

    def verify_code(self, phone, code):
        return code == "123456" and getattr(self, "phone", None) == phone


def build(tmp_path):
    settings = Settings.from_env({
        "LLMER_HASH_SECRET": "portal-test-secret-" * 3,
        "LLMER_DATABASE_PATH": str(tmp_path / "auth.sqlite3"),
        "LLMER_AVATAR_DIR": str(tmp_path / "avatars"),
        "APP_ENV": "test",
    })
    sms = Sms()
    app = create_app(settings=settings, sms_provider=sms)
    return TestClient(app), sms


def login(client, sms, phone):
    assert client.post("/api/v1/auth/sms/request", json={"phone": phone}).status_code == 204
    result = client.post("/api/v1/community/auth/sms/verify", json={
        "phone": phone,
        "code": "123456",
        "acceptedTerms": True,
        "termsVersion": TERMS_VERSION,
    })
    assert result.status_code == 200
    return result.json()


def test_product_invitation_grants_qualification_without_fake_entry(tmp_path, monkeypatch):
    client, sms = build(tmp_path)
    owner = login(client, sms, "13900000001")
    monkeypatch.setenv("COMMUNITY_ADMIN_USER_IDS", owner["profile"]["userId"])
    admin_headers = {"Authorization": "Bearer " + owner["accessToken"]}
    created = client.post("/api/v1/community/admin/invitations", headers=admin_headers, json={
        "label": "MD EXP 首批用户", "validDays": 30, "productId": "md-exp",
    })
    assert created.status_code == 201
    code = created.json()["code"]
    phone = "13900000002"
    assert client.post("/api/v1/auth/sms/request", json={"phone": phone}).status_code == 204
    result = client.post("/api/v1/community/auth/sms/verify", json={
        "phone": phone, "code": "123456", "inviteCode": code,
        "acceptedTerms": True, "termsVersion": TERMS_VERSION,
    })
    assert result.status_code == 200
    headers = {"Authorization": "Bearer " + result.json()["accessToken"]}
    state = client.get("/api/v1/console/md-agent/profile", headers=headers)
    assert state.status_code == 200
    assert state.json()["qualifications"][0]["product_id"] == "md-exp"
    assert state.json()["accountBinding"] == "unbound"
    assert client.post("/api/v1/console/md-agent/enter", headers=headers).status_code == 409


def test_md_agent_profile_requires_official_session(tmp_path):
    client, _ = build(tmp_path)
    assert client.get("/api/v1/console/md-agent/profile").status_code == 401
