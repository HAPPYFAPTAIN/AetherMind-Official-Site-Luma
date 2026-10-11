from fastapi.testclient import TestClient

from official_api.app import create_app
from official_api.billing.rates import RateEdit, set_rate
from official_api.config import Settings
from official_api.workspace import BatchCreate, CreditChange, Redeem

MD_USERNAME = "u_hpc_test"


def build(tmp_path, monkeypatch):
    monkeypatch.setenv("MDAGENT_HPC_CALLBACK_SECRET", "hpc-callback-test-secret")
    settings = Settings.from_env(
        {
            "LLMER_HASH_SECRET": "hpc-metering-test-secret-" * 3,
            "LLMER_DATABASE_PATH": str(tmp_path / "auth.sqlite3"),
            "LLMER_AVATAR_DIR": str(tmp_path / "avatars"),
            "APP_ENV": "test",
        }
    )
    app = create_app(settings=settings)
    auth = app.state.auth_service
    session = auth._create_login(
        auth.hash("phone", "13900000001"), "0001", auth.now()
    )
    workspace = app.state.workspace
    workspace.bootstrap_owner("13900000001")
    with workspace.db.connect() as db:
        set_rate(workspace, db, RateEdit(scope="product-unit", key="md-exp", pointsPerUnit=0), None)
        set_rate(workspace, db, RateEdit(scope="hpc-core-minute", key="md-exp", pointsPerUnit=1), None)
        db.execute(
            "INSERT INTO official_md_agent_bindings VALUES(?,?,?,?)",
            (session["profile"]["userId"], MD_USERNAME, "test-ciphertext", workspace.now()),
        )
    batch = workspace.create_batch(
        session["profile"]["userId"],
        BatchCreate(label="HPC entitlement", quantity=1, productId="md-exp", units=1, days=1),
    )
    workspace.redeem(
        session["profile"]["userId"], Redeem(code=batch["codes"][0])
    )
    workspace.adjust_credits(
        session["profile"]["userId"],
        session["profile"]["userId"],
        CreditChange(delta=100, reason="HPC metering test", requestId="hpc-fund-001"),
    )
    return TestClient(app), workspace, session


def completion_payload(admission, **overrides):
    payload = {
        "jobId": "j_hpc_001",
        "mdUsername": MD_USERNAME,
        "productId": "md-exp",
        "admission": admission,
        "state": "succeeded",
        "actualElapsedSeconds": 601,
        "allocatedCores": 2,
        "schedulerJobId": "12345",
    }
    payload.update(overrides)
    return payload


def test_terminal_hpc_completion_is_idempotent_and_uses_actual_runtime(tmp_path, monkeypatch):
    client, workspace, session = build(tmp_path, monkeypatch)
    uid = session["profile"]["userId"]
    headers = {"X-HPC-Callback-Secret": "hpc-callback-test-secret"}
    admission = client.post(
        "/api/v1/console/hpc/internal/admissions",
        headers=headers,
        json={"mdUsername": MD_USERNAME, "productId": "md-exp"},
    ).json()["admission"]
    payload = completion_payload(admission)
    first = client.post("/api/v1/console/hpc/internal/completions", headers=headers, json=payload)
    assert first.status_code == 200
    assert first.json()["charged"] is True
    assert first.json()["coreMinutes"] == 21
    assert first.json()["points"] == 3

    replay = client.post("/api/v1/console/hpc/internal/completions", headers=headers, json=payload)
    assert replay.status_code == 200
    assert replay.json()["replayed"] is True
    assert replay.json()["points"] == 3

    conflict = client.post(
        "/api/v1/console/hpc/internal/completions",
        headers=headers,
        json={**payload, "actualElapsedSeconds": 605},
    )
    assert conflict.status_code == 409
    with workspace.db.connect() as db:
        usage = db.execute(
            "SELECT COUNT(*), MAX(core_minutes), MAX(points) FROM official_usage WHERE event_id=?",
            ("hpc:j_hpc_001",),
        ).fetchone()
    assert tuple(usage) == (1, 21, 3)


def test_hpc_callback_auth_and_zero_runtime(tmp_path, monkeypatch):
    client, workspace, session = build(tmp_path, monkeypatch)
    uid = session["profile"]["userId"]
    headers = {"X-HPC-Callback-Secret": "hpc-callback-test-secret"}
    admission = client.post(
        "/api/v1/console/hpc/internal/admissions",
        headers=headers,
        json={"mdUsername": MD_USERNAME, "productId": "md-exp"},
    ).json()["admission"]
    payload = completion_payload(admission, jobId="j_hpc_zero", actualElapsedSeconds=0, allocatedCores=0)

    denied = client.post("/api/v1/console/hpc/internal/completions", json=payload)
    assert denied.status_code == 401
    accepted = client.post(
        "/api/v1/console/hpc/internal/completions",
        headers=headers,
        json=payload,
    )
    assert accepted.status_code == 200
    assert accepted.json() == {
        "jobId": "j_hpc_zero",
        "eventId": "hpc:j_hpc_zero",
        "charged": False,
        "replayed": False,
        "points": 0,
    }
    with workspace.db.connect() as db:
        assert db.execute(
            "SELECT COUNT(*) FROM official_usage WHERE event_id=?", ("hpc:j_hpc_zero",)
        ).fetchone()[0] == 0
