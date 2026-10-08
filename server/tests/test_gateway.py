"""Gateway integration tests with real SQLite and mocked providers."""
from __future__ import annotations

import asyncio
import json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

import httpx
import pytest
from fastapi.testclient import TestClient

from official_api.app import create_app
from official_api.billing.rates import ModelEdit, RateEdit, set_model, set_rate
from official_api.config import Settings
from official_api.workspace import BatchCreate, CreditChange, ProductEdit, Redeem
from gateway.app import Exchange, Gateway, Principal, SSEParser
from official_api.billing.wallet import fingerprint
from official_api.errors import ApiError


class ChunkStream(httpx.AsyncByteStream):
    def __init__(self, chunks: list[bytes]):
        self.chunks = chunks

    async def __aiter__(self):
        for chunk in self.chunks:
            await asyncio.sleep(0)
            yield chunk


class BlockingStream(httpx.AsyncByteStream):
    def __init__(self, release: asyncio.Event):
        self.release = release

    async def __aiter__(self):
        yield b'data: {"choices":[{"delta":{"content":"first"}}]}\n\n'
        await self.release.wait()
        yield b'data: {"usage":{"prompt_tokens":10,"completion_tokens":4,"total_tokens":14}}\n\n'
        yield b"data: [DONE]\n\n"


@pytest.fixture
def setup(tmp_path, monkeypatch):
    settings = Settings.from_env({
        "LLMER_HASH_SECRET": "gateway-test-secret-" * 3,
        "LLMER_DATABASE_PATH": str(tmp_path / "gateway.sqlite3"),
        "LLMER_AVATAR_DIR": str(tmp_path / "avatars"),
        "APP_ENV": "test",
    })
    app = create_app(settings=settings)
    w, auth = app.state.workspace, app.state.auth_service
    sessions = [auth._create_login(auth.hash("phone", str(13900000001 + i)), str(i).zfill(4), auth.now()) for i in range(2)]
    owner, user = [s["profile"]["userId"] for s in sessions]
    w.bootstrap_owner("13900000001")
    w.edit_product(owner, "lammps", ProductEdit(name="LAMMPS", nameEn="LAMMPS", description="test", entryUrl="https://example.com", status="AVAILABLE", price=1, packageUnits=10, packageDays=0, unitPointCost=1))
    w.adjust_credits(owner, user, CreditChange(delta=1000, reason="gateway test", requestId="gateway-fund-001"))
    code = w.create_batch(owner, BatchCreate(label="gateway", quantity=1, productId="lammps", units=20, days=0, credits=0, requestId="gateway-batch-001"))["codes"][0]
    w.redeem(user, Redeem(code=code))
    with w.db.connect() as c:
        set_rate(w, c, RateEdit(scope="llm-model", key="kimi", pointsPerMtokInput=100, pointsPerMtokOutput=100), owner)
        set_model(w, c, ModelEdit(model="kimi", provider="mock", upstreamModel="mock-model", enabled=True))
    key = w.issue_key(owner, "lammps")["key"]
    monkeypatch.setenv("GATEWAY_PROVIDER_MOCK_BASEURL", "https://mock.local/v1")
    monkeypatch.setenv("GATEWAY_PROVIDER_MOCK_KEY", "mock-key")
    return app, w, user, key


def mount(app, w, transport):
    # In production this is official_api migration 0005. Tests apply the
    # checked-in migration text to the real SQLite database before startup.
    schema = (Path(__file__).parents[1] / "gateway" / "schema.sql").read_text()
    with w.db.connect() as c:
        c.executescript(schema)
    gateway = Gateway(w, client_factory=lambda **kwargs: httpx.AsyncClient(transport=transport, **kwargs))
    app.include_router(gateway.router())
    return gateway


def headers(key, user, event="event-0001"):
    return {"Authorization": "Bearer " + key, "X-End-User": user, "X-Event-Id": event}


def test_sse_parser_handles_split_chunks_and_done():
    parser = SSEParser()
    assert parser.feed(b"data: {\"usage\":{") == []
    events = parser.feed(b"\"prompt_tokens\":2}}\r\n\r\n")
    assert events[0][1]["usage"]["prompt_tokens"] == 2
    assert parser.feed(b"data: [DONE]\n\n")[0][1] is None


def test_nonstream_replay_has_single_upstream_call_and_single_charge(setup):
    app, w, user, key = setup
    calls = []

    def handler(request):
        calls.append(request)
        body = json.loads(request.content)
        assert body["model"] == "mock-model"
        return httpx.Response(200, json={"id": "chat-1", "object": "chat.completion", "choices": [], "usage": {"prompt_tokens": 10, "completion_tokens": 4, "total_tokens": 14}})

    mount(app, w, httpx.MockTransport(handler))
    client = TestClient(app)
    first = client.post("/v1/chat/completions", headers=headers(key, user), json={"model": "kimi", "messages": [{"role": "user", "content": "hi"}]})
    again = client.post("/v1/chat/completions", headers=headers(key, user), json={"model": "kimi", "messages": [{"role": "user", "content": "hi"}]})
    assert first.status_code == 200 and again.status_code == 200
    assert len(calls) == 1
    with w.db.connect() as c:
        assert c.execute("SELECT COUNT(*) FROM official_usage WHERE event_id='gateway:event-0001'").fetchone()[0] == 1
        assert c.execute("SELECT status FROM gateway_events WHERE event_id='event-0001'").fetchone()[0] == "COMPLETED"


def test_stream_forwards_usage_and_injects_include_usage(setup):
    app, w, user, key = setup
    calls = []

    def handler(request):
        calls.append(json.loads(request.content))
        chunks = [
            b'data: {"choices":[{"delta":{"content":"hi"}}]}\n\n',
            b'data: {"usage":{"prompt_tokens":3,"completion_tokens":2,"total_tokens":5}}\n\n',
            b"data: [DONE]\n\n",
        ]
        return httpx.Response(200, headers={"content-type": "text/event-stream"}, stream=ChunkStream(chunks))

    mount(app, w, httpx.MockTransport(handler))
    with TestClient(app).stream("POST", "/v1/chat/completions", headers=headers(key, user, "event-stream-1"), json={"model": "kimi", "stream": True, "messages": []}) as response:
        body = "".join(response.iter_text())
    assert response.status_code == 200 and "[DONE]" in body
    assert calls[0]["stream_options"]["include_usage"] is True
    with w.db.connect() as c:
        assert c.execute("SELECT status FROM gateway_events WHERE event_id='event-stream-1'").fetchone()[0] == "COMPLETED"


def test_interrupted_stream_is_failed_without_usage_charge(setup):
    app, w, user, key = setup
    chunks = [
        b'data: {"choices":[{"delta":{"content":"partial"}}]}\n\n',
        b'data: {"usage":{"prompt_tokens":3,"completion_tokens":2,"total_tokens":5}}\n\n',
    ]
    mount(app, w, httpx.MockTransport(lambda request: httpx.Response(
        200, headers={"content-type": "text/event-stream"}, stream=ChunkStream(chunks))))
    with TestClient(app).stream(
        "POST", "/v1/chat/completions", headers=headers(key, user, "event-interrupted-stream"),
        json={"model": "kimi", "stream": True, "messages": []},
    ) as response:
        body = "".join(response.iter_text())
    assert response.status_code == 200
    assert "UPSTREAM_INCOMPLETE" in body
    with w.db.connect() as c:
        assert c.execute("SELECT status FROM gateway_events WHERE event_id='event-interrupted-stream'").fetchone()[0] == "FAILED"
        assert c.execute("SELECT COUNT(*) FROM official_usage WHERE event_id='gateway:event-interrupted-stream'").fetchone()[0] == 0


def test_missing_usage_fails_closed_without_charge(setup):
    app, w, user, key = setup
    mount(app, w, httpx.MockTransport(lambda request: httpx.Response(200, json={"choices": []})))
    response = TestClient(app).post("/v1/chat/completions", headers=headers(key, user, "event-no-usage"), json={"model": "kimi", "messages": []})
    assert response.status_code == 502
    assert response.json()["error"]["code"] == "UPSTREAM_USAGE_MISSING"
    with w.db.connect() as c:
        assert c.execute("SELECT COUNT(*) FROM official_usage WHERE event_id='gateway:event-no-usage'").fetchone()[0] == 0


def test_low_balance_clamps_charge_and_records_shortfall(setup):
    app, w, user, key = setup
    with w.db.connect() as c:
        c.execute("UPDATE official_wallets SET balance=1 WHERE user_id=?", (user,))
    mount(app, w, httpx.MockTransport(lambda request: httpx.Response(200, json={
        "id": "chat-low-balance", "choices": [],
        "usage": {"prompt_tokens": 10, "completion_tokens": 4, "total_tokens": 14},
    })))
    response = TestClient(app).post(
        "/v1/chat/completions", headers=headers(key, user, "event-low-balance"),
        json={"model": "kimi", "messages": []},
    )
    assert response.status_code == 200
    with w.db.connect() as c:
        row = c.execute("SELECT points,shortfall FROM official_usage WHERE event_id='gateway:event-low-balance'").fetchone()
        assert (row["points"], row["shortfall"]) == (1, 1)


def test_cancelled_stream_consumer_does_not_cancel_billing(setup):
    asyncio.run(_test_cancelled_stream_consumer_does_not_cancel_billing(setup))


async def _test_cancelled_stream_consumer_does_not_cancel_billing(setup):
    app, w, user, key = setup
    release = asyncio.Event()
    gateway = mount(app, w, httpx.MockTransport(lambda request: httpx.Response(
        200, headers={"content-type": "text/event-stream"}, stream=BlockingStream(release))))
    principal = Principal(user, "lammps")
    event = "event-cancelled-stream"
    body = {"model": "kimi", "stream": True, "messages": []}
    fp = fingerprint({"user": user, "product": "lammps", "kind": "chat", "body": body})
    assert gateway._claim(principal, "kimi", "chat", event, fp) is None
    exchange = Exchange(asyncio.get_running_loop().create_future(), asyncio.get_running_loop().create_future())
    task = asyncio.create_task(gateway._run(gateway.route("kimi"), "chat/completions", body, principal, event, fp, exchange))
    await asyncio.wait_for(asyncio.shield(exchange.ready), timeout=2)
    consumer = asyncio.create_task(exchange.queue.get())
    await asyncio.wait_for(consumer, timeout=2)
    consumer = asyncio.create_task(exchange.queue.get())
    consumer.cancel()
    with pytest.raises(asyncio.CancelledError):
        await consumer
    exchange.detach()
    release.set()
    await asyncio.wait_for(task, timeout=2)
    with w.db.connect() as c:
        assert c.execute("SELECT status FROM gateway_events WHERE event_id=?", (event,)).fetchone()[0] == "COMPLETED"
        assert c.execute("SELECT COUNT(*) FROM official_usage WHERE event_id=?", ("gateway:" + event,)).fetchone()[0] == 1


def test_auth_entitlement_and_balance_preflight(setup):
    app, w, user, key = setup
    mount(app, w, httpx.MockTransport(lambda request: httpx.Response(500)))
    client = TestClient(app)
    assert client.get("/v1/models", headers={"Authorization": "Bearer bad", "X-End-User": user}).status_code == 401
    with w.db.connect() as c:
        c.execute("UPDATE official_entitlements SET units=0 WHERE user_id=? AND product_id='lammps'", (user,))
    assert client.get("/v1/models", headers=headers(key, user)).status_code == 403


def test_claim_is_atomic_for_pending_and_conflicting_replay(setup):
    app, w, user, key = setup
    gateway = mount(app, w, httpx.MockTransport(lambda request: httpx.Response(500)))
    principal = Principal(user, "lammps")
    fp = fingerprint({"user": user, "body": {"model": "kimi"}})
    assert gateway._claim(principal, "kimi", "chat", "event-race-1", fp) is None
    with pytest.raises(ApiError) as pending:
        gateway._claim(principal, "kimi", "chat", "event-race-1", fp)
    assert pending.value.code == "REQUEST_IN_PROGRESS"
    with pytest.raises(ApiError) as conflict:
        gateway._claim(principal, "kimi", "chat", "event-race-1", "different")
    assert conflict.value.code == "IDEMPOTENCY_CONFLICT"


def test_two_real_sqlite_claim_threads_only_one_wins(setup):
    app, w, user, key = setup
    gateway = mount(app, w, httpx.MockTransport(lambda request: httpx.Response(500)))
    principal = Principal(user, "lammps")
    fp = fingerprint({"user": user, "body": {"model": "kimi", "messages": []}})
    barrier = __import__("threading").Barrier(2)

    def claim():
        barrier.wait()
        try:
            return gateway._claim(principal, "kimi", "chat", "event-sqlite-race", fp)
        except ApiError as error:
            return error.code

    with ThreadPoolExecutor(max_workers=2) as pool:
        results = list(pool.map(lambda _: claim(), range(2)))
    assert sorted(results, key=lambda item: str(item)) == [None, "REQUEST_IN_PROGRESS"]
