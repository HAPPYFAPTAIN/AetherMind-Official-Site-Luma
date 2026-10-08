from fastapi.testclient import TestClient
from official_api.config import Settings
from official_api.community.consent import TERMS_VERSION
from official_api.app import create_app
from official_api.workspace import BatchCreate, Redeem


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


def test_community_invitation_is_not_a_product_grant_and_act_is_canonical(tmp_path):
    client, sms = build(tmp_path)
    owner = login(client, sms, "13900000001")
    client.app.state.workspace.bootstrap_owner("13900000001")
    admin_headers = {"Authorization": "Bearer " + owner["accessToken"]}
    created = client.post("/api/v1/community/admin/invitations", headers=admin_headers, json={
        "label": "MD EXP 首批用户", "validDays": 30, "productId": "md-exp",
    })
    assert created.status_code == 400
    assert created.json()["error"]["code"] == "COMMUNITY_INVITE_PRODUCT_FORBIDDEN"
    created = client.post("/api/v1/community/admin/invitations", headers=admin_headers, json={
        "label": "社区测试组", "validDays": 30,
    })
    assert created.status_code == 201
    assert "productId" not in created.json()
    community_code = created.json()["code"]
    phone = "13900000002"
    assert client.post("/api/v1/auth/sms/request", json={"phone": phone}).status_code == 204
    result = client.post("/api/v1/community/auth/sms/verify", json={
        "phone": phone, "code": "123456", "inviteCode": community_code,
        "acceptedTerms": True, "termsVersion": TERMS_VERSION,
    })
    assert result.status_code == 200
    headers = {"Authorization": "Bearer " + result.json()["accessToken"]}
    state = client.get("/api/v1/console/md-agent/profile", headers=headers)
    assert state.status_code == 200
    assert state.json()["qualifications"] == []
    assert state.json()["accountBinding"] == "unbound"
    assert client.post("/api/v1/console/md-agent/enter", headers=headers).status_code == 409

    batch = client.app.state.workspace.create_batch(
        owner["profile"]["userId"],
        BatchCreate(label="MD EXP ACT", quantity=1, productId="md-exp", units=1),
    )
    redeem = client.post("/api/v1/console/redeem", headers=headers, json={"code": batch["codes"][0]})
    assert redeem.status_code == 200
    state = client.get("/api/v1/console/md-agent/profile", headers=headers)
    assert state.status_code == 200
    assert [item["product_id"] for item in state.json()["qualifications"]] == ["md-exp"]
    with client.app.state.workspace.db.connect() as db:
        assert db.execute("SELECT COUNT(*) FROM official_md_agent_qualifications WHERE user_id=?", (result.json()["profile"]["userId"],)).fetchone()[0] == 0
        entitlement = db.execute("SELECT units,expires_at_ms FROM official_entitlements WHERE user_id=? AND product_id='md-exp'", (result.json()["profile"]["userId"],)).fetchone()
        assert entitlement["units"] == 1


def test_md_agent_profile_requires_official_session(tmp_path):
    client, _ = build(tmp_path)
    assert client.get("/api/v1/console/md-agent/profile").status_code == 401


def test_binding_creates_private_account_and_rewrites_entry_url(tmp_path, monkeypatch):
    client, sms = build(tmp_path)
    owner = login(client, sms, "13900000001")
    uid = owner["profile"]["userId"]
    client.app.state.workspace.bootstrap_owner("13900000001")
    batch = client.app.state.workspace.create_batch(
        uid,
        BatchCreate(label="MD EXP ACT", quantity=1, productId="md-exp", units=1),
    )
    assert client.app.state.workspace.redeem(uid, Redeem(code=batch["codes"][0]))["productId"] == "md-exp"
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

    monkeypatch.setattr("official_api.adapters.md_agent.httpx.request", fake_request)
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


def test_existing_md_agent_binding_is_rejected_after_entitlement_expiry(tmp_path, monkeypatch):
    client, sms = build(tmp_path)
    owner = login(client, sms, "13900000001")
    uid = owner["profile"]["userId"]
    client.app.state.workspace.bootstrap_owner("13900000001")
    batch = client.app.state.workspace.create_batch(
        uid,
        BatchCreate(label="MD EXP ACT", quantity=1, productId="md-exp", units=1),
    )
    client.app.state.workspace.redeem(uid, Redeem(code=batch["codes"][0]))
    with client.app.state.workspace.db.connect() as db:
        db.execute("INSERT INTO official_md_agent_bindings VALUES(?,?,?,?)", (uid, "bound-user", "ciphertext", client.app.state.workspace.now()))
        db.execute("UPDATE official_entitlements SET units=0, expires_at_ms=NULL WHERE user_id=? AND product_id='md-exp'", (uid,))
    monkeypatch.setenv("MDAGENT_ADMIN_TOKEN", "server-only-test-token")
    headers = {"Authorization": "Bearer " + owner["accessToken"]}
    assert client.post("/api/v1/console/md-agent/bind", headers=headers).status_code == 409
    entry = client.post("/api/v1/console/md-agent/enter", headers=headers)
    assert entry.status_code == 409
