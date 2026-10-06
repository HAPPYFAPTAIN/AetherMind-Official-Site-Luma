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


def test_binding_creates_private_account_and_rewrites_entry_url(tmp_path, monkeypatch):
    client, sms = build(tmp_path)
    owner = login(client, sms, "13900000001")
    uid = owner["profile"]["userId"]
    with client.app.state.workspace.db.connect() as db:
        db.execute(
            "INSERT INTO community_invitations(code,label,created_at_ms,expires_at_ms,product_id) VALUES(?,?,?,?,?)",
            ("ABCDEF123456", "test", client.app.state.workspace.now(), client.app.state.workspace.now() + 100000, "md-exp"),
        )
        db.execute(
            "INSERT INTO official_md_agent_qualifications VALUES(?,?,?,?)",
            (uid, "md-exp", "ABCDEF123456", client.app.state.workspace.now()),
        )
    monkeypatch.setenv("MDAGENT_ADMIN_TOKEN", "server-only-test-token")
    calls = []

    class Response:
        def __init__(self, payload, status=200):
            self._payload, self.status_code = payload, status
            self.is_success = status < 400

        def json(self):
            return self._payload

    def fake_request(method, url, **kwargs):
        calls.append((method, url, kwargs.get("body")))
        if url.endswith("/v1/admin/invites"):
            return Response({"code": "inv_internal"}, 201)
        if url.endswith("/v1/apply"):
            return Response({"status": "pending"}, 200)
        if "/v1/admin/approve/" in url:
            return Response({"token": "mda_private_test_token"}, 200)
        if url.endswith("/v1/web/entry"):
            return Response({"url": "https://8.130.144.193:8081/mdagent/web/open?ticket=ticket123", "expires_in": 120}, 201)
        raise AssertionError(url)

    monkeypatch.setattr("official_api.md_agent.httpx.request", fake_request)
    headers = {"Authorization": "Bearer " + owner["accessToken"]}
    bound = client.post("/api/v1/console/md-agent/bind", headers=headers)
    assert bound.status_code == 200
    assert bound.json()["accountBinding"] == "bound"
    entry = client.post("/api/v1/console/md-agent/enter", headers=headers)
    assert entry.status_code == 200
    assert entry.json()["url"] == "/official/md-agent/open?ticket=ticket123"
    assert len(calls) == 4
    with client.app.state.workspace.db.connect() as db:
        stored = db.execute("SELECT token_ciphertext FROM official_md_agent_bindings WHERE user_id=?", (uid,)).fetchone()[0]
        assert "mda_private_test_token" not in stored
