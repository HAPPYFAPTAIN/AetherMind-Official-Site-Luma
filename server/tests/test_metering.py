import pytest
from fastapi.testclient import TestClient
from official_api.config import Settings
from official_api.errors import ApiError
from official_api.app import create_app
from official_api.billing.rates import RateEdit, price, set_rate
from official_api.workspace import (
    BatchCreate, CreditChange, ProductEdit, Redeem, Usage, UsageEvent,
)


@pytest.fixture
def setup(tmp_path):
    settings = Settings.from_env({'LLMER_HASH_SECRET': 'metering-test-secret-' * 3,
                                 'LLMER_DATABASE_PATH': str(tmp_path / 'test.sqlite3'),
                                 'LLMER_AVATAR_DIR': str(tmp_path / 'avatars'), 'APP_ENV': 'test'})
    app = create_app(settings=settings)
    w, auth = app.state.workspace, app.state.auth_service
    sessions = [auth._create_login(auth.hash('phone', str(13900000001 + i)), str(i).zfill(4), auth.now()) for i in range(4)]
    ids = [s['profile']['userId'] for s in sessions]
    w.bootstrap_owner('13900000001')
    return app, w, sessions, ids


def header(s):
    return {'Authorization': 'Bearer ' + s['accessToken']}


def fund(w, owner, user, amount=2000):
    return w.adjust_credits(owner, user, CreditChange(delta=amount, reason='测试充值', requestId='fund-' + str(amount)))


def available(w, owner, unit_cost=2):
    w.edit_product(owner, 'lammps', ProductEdit(name='LAMMPS', nameEn='LAMMPS', description='测试产品',
        entryUrl='https://example.com', status='AVAILABLE', price=20, packageUnits=10, packageDays=0, unitPointCost=unit_cost))


def grant_units(w, owner, user, units=10, days=0):
    code = w.create_batch(owner, BatchCreate(label='计量测试权益', quantity=1, productId='lammps', units=units, days=days))['codes'][0]
    w.redeem(user, Redeem(code=code))


def test_price_math_tokens_cached_and_rounding(setup):
    _, w, _, _ = setup
    with w.db.connect() as c:
        set_rate(w, c, RateEdit(scope='product-unit', key='p1', pointsPerUnit=5), None)
        set_rate(w, c, RateEdit(scope='llm-model', key='m1', pointsPerMtokInput=1000,
                                pointsPerMtokCached=200, pointsPerMtokOutput=3000), None)
        set_rate(w, c, RateEdit(scope='hpc-core-minute', key='p1', pointsPerUnit=3), None)
        # 2 单位 ×5 + ceil((80 万非缓存×1000 + 20 万缓存×200 + 10 万输出×3000)/1e6) + ceil(7/10)×3
        assert price(c, product_id='p1', model='m1', units=2, input_tokens=1_000_000,
                     cached_tokens=200_000, output_tokens=100_000, core_minutes=7) == 10 + 1140 + 3
        # 不足 1 Mtok 的部分向上取整。
        assert price(c, product_id='p1', model='m1', input_tokens=1) == 1
        assert price(c, product_id='p1') == 0
        with pytest.raises(ApiError) as missing:
            price(c, product_id='p1', model='unknown-model', input_tokens=10)
        assert missing.value.code == 'RATE_MISSING'
        assert 'llm-model' in missing.value.message and 'unknown-model' in missing.value.message
        with pytest.raises(ApiError):
            price(c, product_id='no-such-product', units=1)


def test_admin_rates_and_models_routes_owner_only(setup):
    app, w, sessions, ids = setup
    c = TestClient(app)
    assert c.get('/api/v1/console/admin/rates', headers=header(sessions[1])).status_code == 403
    assert c.get('/api/v1/console/admin/models', headers=header(sessions[1])).status_code == 403
    assert c.put('/api/v1/console/admin/rates', headers=header(sessions[1]),
                 json={'scope': 'llm-model', 'key': 'm1'}).status_code == 403
    owner = header(sessions[0])
    saved = c.put('/api/v1/console/admin/rates', headers=owner,
                  json={'scope': 'llm-model', 'key': 'm1', 'pointsPerMtokInput': 1000, 'pointsPerMtokOutput': 3000})
    assert saved.status_code == 200
    assert saved.json()['points_per_mtok_input'] == 1000
    again = c.put('/api/v1/console/admin/rates', headers=owner,
                  json={'scope': 'llm-model', 'key': 'm1', 'pointsPerMtokInput': 2000})
    assert again.status_code == 200
    listed = c.get('/api/v1/console/admin/rates', headers=owner).json()['items']
    assert len([r for r in listed if r['key'] == 'm1']) == 1
    assert [r for r in listed if r['key'] == 'm1'][0]['points_per_mtok_input'] == 2000
    model = c.put('/api/v1/console/admin/models', headers=owner,
                  json={'model': 'm1', 'provider': 'moonshot', 'upstreamModel': 'kimi-k2', 'enabled': True})
    assert model.status_code == 200
    assert next(item for item in c.get('/api/v1/console/admin/models', headers=owner).json()['items'] if item['model'] == 'm1')['upstream_model'] == 'kimi-k2'
    with w.db.connect() as db:
        actions = {r[0] for r in db.execute('SELECT action FROM official_audit')}
    assert {'RATE_UPDATED', 'MODEL_UPDATED'} <= actions


def test_usage_tokens_priced_and_replay_safe(setup):
    app, w, sessions, ids = setup
    owner, user, *_ = ids
    c = TestClient(app)
    fund(w, owner, user, 2000)
    available(w, owner)
    grant_units(w, owner, user)
    assert c.put('/api/v1/console/admin/rates', headers=header(sessions[0]),
                 json={'scope': 'llm-model', 'key': 'kimi-k2', 'pointsPerMtokInput': 1000,
                       'pointsPerMtokOutput': 3000}).status_code == 200
    key = w.issue_key(owner, 'lammps')['key']
    event = {'userId': user, 'eventId': 'evt-price-001', 'units': 2,
             'inputTokens': 1_000_000, 'cachedTokens': 200_000, 'outputTokens': 100_000, 'model': 'kimi-k2'}
    result = c.post('/api/v1/console/integrations/usage', headers={'Authorization': 'Bearer ' + key}, json=event)
    assert result.status_code == 200
    # 2×2 单位 + (80 万×1000 + 20 万×0 + 10 万×3000)/1e6 = 4 + 1100
    assert result.json()['points'] == 1104
    d = w.dashboard(user, 7, 'all')
    assert d['profile']['balance'] == 2000 - 1104
    assert d['entitlements'][0]['units'] == 8
    with w.db.connect() as db:
        row = db.execute("SELECT * FROM official_usage WHERE event_id='evt-price-001'").fetchone()
        assert row['model'] == 'kimi-k2' and row['points'] == 1104 and row['shortfall'] == 0
        assert row['input_tokens'] == 1_000_000 and row['cached_tokens'] == 200_000
    replayed = c.post('/api/v1/console/integrations/usage', headers={'Authorization': 'Bearer ' + key}, json=event)
    assert replayed.json()['replayed'] is True
    assert w.dashboard(user, 7, 'all')['profile']['balance'] == 2000 - 1104
    with w.db.connect() as db:
        assert db.execute("SELECT COUNT(*) FROM official_ledger WHERE kind='USAGE'").fetchone()[0] == 1
    conflict = c.post('/api/v1/console/integrations/usage', headers={'Authorization': 'Bearer ' + key},
                      json={**event, 'outputTokens': 200_000})
    assert conflict.status_code == 409
    missing = c.post('/api/v1/console/integrations/usage', headers={'Authorization': 'Bearer ' + key},
                     json={'userId': user, 'eventId': 'evt-no-rate-001', 'model': 'unset-model', 'inputTokens': 5})
    assert missing.status_code == 409 and missing.json()['error']['code'] == 'RATE_MISSING'


def test_charge_allow_clamp_records_shortfall(setup):
    _, w, _, ids = setup
    owner, user, *_ = ids
    fund(w, owner, user, 100)
    available(w, owner)
    grant_units(w, owner, user, 200)
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        result = w.charge(c, user_id=user, product_id='lammps', event_id='clamp-001',
                          usage=UsageEvent(units=60), allow_clamp=True)
    assert result.points == 100 and result.shortfall == 20 and result.balance_after == 0
    with w.db.connect() as c:
        row = c.execute("SELECT points,shortfall FROM official_usage WHERE event_id='clamp-001'").fetchone()
        assert (row['points'], row['shortfall']) == (100, 20)
        replay = w.charge(c, user_id=user, product_id='lammps', event_id='clamp-001',
                          usage=UsageEvent(units=60), allow_clamp=True)
        assert replay.replayed and replay.shortfall == 20
    # 严格模式：余额不足整单失败且全部回滚。
    with pytest.raises(ApiError) as e:
        with w.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            w.charge(c, user_id=user, product_id='lammps', event_id='strict-001', usage=UsageEvent(units=60))
    assert e.value.code == 'INSUFFICIENT_CREDITS'
    d = w.dashboard(user, 7, 'all')
    assert d['profile']['balance'] == 0
    assert d['entitlements'][0]['units'] == 140  # clamp 事件已扣 60 次；strict 事件未扣减
    assert d['summary']['total']['calls'] == 1


def test_charge_unit_vs_time_entitlement(setup):
    _, w, _, ids = setup
    owner, user, *_ = ids
    fund(w, owner, user, 100)
    available(w, owner)
    grant_units(w, owner, user, units=5, days=1)
    key = w.issue_key(owner, 'lammps')['key']
    w.usage(key, Usage(userId=user, eventId='timed-001', units=2))
    d = w.dashboard(user, 7, 'all')
    assert d['entitlements'][0]['units'] == 5  # 时间权益内不扣次数
    now = w.now()
    w.now = lambda: now + 2 * 86_400_000
    w.usage(key, Usage(userId=user, eventId='after-expiry-001', units=2))
    assert w.dashboard(user, 7, 'all')['entitlements'][0]['units'] == 3
    with pytest.raises(ApiError) as e:
        w.usage(key, Usage(userId=user, eventId='over-quota-001', units=4))
    assert e.value.code == 'ENTITLEMENT_REQUIRED'
