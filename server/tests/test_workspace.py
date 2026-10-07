import concurrent.futures
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from llmer_api.config import Settings
from llmer_api.errors import ApiError
from official_api.app import create_app
from official_api.workspace import BatchCreate, CreditChange, ProductEdit, Redeem, RoleChange, Usage


@pytest.fixture
def setup(tmp_path):
    settings = Settings.from_env({'LLMER_HASH_SECRET': 'isolated-test-secret-' * 3,
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


def fund(w, owner, user, amount=100):
    return w.adjust_credits(owner, user, CreditChange(delta=amount, reason='测试充值', requestId='fund-0001'))


def available(w, owner):
    w.edit_product(owner, 'lammps', ProductEdit(name='LAMMPS', nameEn='LAMMPS', description='测试产品',
        entryUrl='https://example.com', status='AVAILABLE', price=20, packageUnits=10, packageDays=0, unitPointCost=2))


def test_auth_owner_and_ordinary_privileges(setup):
    app, w, sessions, ids = setup
    owner, user, admin, _ = ids
    c = TestClient(app)
    assert c.get('/api/v1/console/dashboard').status_code == 401
    assert c.get('/api/v1/console/admin/users', headers=header(sessions[1])).status_code == 403
    assert c.get('/api/v1/console/me', headers=header(sessions[0])).json()['role'] == 'OWNER'
    assert c.patch('/api/v1/console/admin/users/' + user + '/role', headers=header(sessions[1]), json={'role':'ADMIN'}).status_code == 403
    assert c.patch('/api/v1/console/admin/users/' + owner + '/role', headers=header(sessions[0]), json={'role':'USER'}).status_code == 409
    w.change_role(owner, admin, RoleChange(role='ADMIN', productIds=['lammps']))
    with pytest.raises(ApiError):
        fund(w, admin, user)
    with pytest.raises(ApiError):
        w.create_batch(admin, BatchCreate(label='forged', quantity=1, credits=100))
    with pytest.raises(ValueError):
        w.bootstrap_owner('13900000002')
    assert 'phone_hash' not in str(c.get('/api/v1/console/admin/users', headers=header(sessions[0])).json())


def test_wallet_idempotency_nonnegative_and_audit(setup):
    _, w, _, ids = setup
    owner, user, *_ = ids
    fund(w, owner, user)
    fund(w, owner, user)
    with pytest.raises(ApiError):
        fund(w, owner, user, 200)
    with pytest.raises(ApiError):
        w.adjust_credits(owner, user, CreditChange(delta=-101, reason='扣减', requestId='debit-0001'))
    d = w.dashboard(user, 7, 'all')
    assert d['profile']['balance'] == 100
    assert len(d['ledger']) == 1
    assert d['summary']['total']['calls'] == 0
    assert len(d['heatmap']) == 182
    assert len(d['trend']) == 7
    with w.db.connect() as c:
        assert c.execute("SELECT COUNT(*) FROM official_audit WHERE action='CREDITS_ADJUSTED'").fetchone()[0] == 1


def test_md_exp_activation_code_grants_dsh_qualification(setup):
    _, w, _, ids = setup
    owner, user, *_ = ids
    code = w.create_batch(owner, BatchCreate(label='MD EXP dsh资格', quantity=1, productId='md-exp'))['codes'][0]
    result = w.redeem(user, Redeem(code=code))
    assert result['productId'] == 'md-exp'
    with w.db.connect() as c:
        qualification = c.execute('SELECT product_id FROM official_md_agent_qualifications WHERE user_id=?', (user,)).fetchone()
    assert qualification['product_id'] == 'md-exp'


def test_code_single_use_race_and_delegate_scope(setup):
    _, w, _, ids = setup
    owner, user, admin, other = ids
    w.change_role(owner, admin, RoleChange(role='ADMIN', productIds=['lammps']))
    code = w.create_batch(owner, BatchCreate(label='授权批次', quantity=1, credits=50, productId='lammps', units=5, assignedTo=admin))['codes'][0]
    with pytest.raises(ApiError):
        w.redeem(user, Redeem(code=code))
    with pytest.raises(ApiError):
        w.redeem(other, Redeem(code=code, targetUserId=user))
    def attempt():
        try:
            w.redeem(admin, Redeem(code=code, targetUserId=user))
            return True
        except ApiError:
            return False
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        assert sum(pool.map(lambda _: attempt(), range(2))) == 1
    d = w.dashboard(user, 7, 'all')
    assert d['profile']['balance'] == 50
    assert d['entitlements'][0]['units'] == 5
    with w.db.connect() as c:
        assert code not in str([dict(r) for r in c.execute('SELECT * FROM official_codes')])
    batch = w.create_batch(owner, BatchCreate(label='to revoke', quantity=1, credits=10))
    w.revoke_batch(owner, batch['id'])
    with pytest.raises(ApiError):
        w.redeem(user, Redeem(code=batch['codes'][0]))
    code2 = w.create_batch(owner, BatchCreate(label='scoped', quantity=1, units=1, productId='lammps', assignedTo=admin))['codes'][0]
    w.change_role(owner, admin, RoleChange(role='USER'))
    with pytest.raises(ApiError):
        w.redeem(admin, Redeem(code=code2, targetUserId=user))


def test_purchase_and_trusted_usage_transaction(setup):
    app, w, sessions, ids = setup
    owner, user, *_ = ids
    fund(w, owner, user)
    available(w, owner)
    c = TestClient(app)
    payload = {'productId':'lammps', 'requestId':'purchase-001', 'expectedPrice':20}
    assert c.post('/api/v1/console/purchases', headers=header(sessions[1]), json={**payload, 'expectedPrice':0}).status_code == 409
    a = c.post('/api/v1/console/purchases', headers=header(sessions[1]), json=payload)
    assert a.status_code == 200
    b = c.post('/api/v1/console/purchases', headers=header(sessions[1]), json=payload)
    assert a.json()['id'] == b.json()['id']
    assert w.dashboard(user, 7, 'all')['profile']['balance'] == 80
    event = {'userId':user, 'eventId':'event-001', 'units':2, 'inputTokens':1000, 'cachedTokens':400, 'outputTokens':200}
    assert c.post('/api/v1/console/integrations/usage', headers=header(sessions[1]), json=event).status_code == 401
    key = w.issue_key(owner, 'lammps')['key']
    assert c.post('/api/v1/console/integrations/usage', headers={'Authorization':'Bearer ' + key}, json=event).status_code == 200
    assert w.usage(key, Usage(**event))['replayed']
    with pytest.raises(ApiError):
        w.usage(key, Usage(**{**event, 'units':3}))
    d = w.dashboard(user, 7, 'all')
    assert d['profile']['balance'] == 76
    assert d['entitlements'][0]['units'] == 8
    assert d['summary']['today']['inputTokens'] == 600
    assert d['summary']['today']['cachedTokens'] == 400
    assert d['summary']['today']['outputTokens'] == 200
    assert d['summary']['total']['calls'] == 1
    assert w.dashboard(ids[2], 7, 'all')['summary']['total']['calls'] == 0
    assert w.dashboard(user, 7, 'agent')['summary']['total']['calls'] == 0
    with pytest.raises(ApiError):
        w.usage(key, Usage(**{**event, 'eventId':'event-002', 'units':9}))
    assert w.dashboard(user, 7, 'all')['profile']['balance'] == 76


def test_expiry_limiter_and_invalid_inputs(setup):
    app, w, sessions, ids = setup
    owner, user, *_ = ids
    batch = w.create_batch(owner, BatchCreate(label='expires', quantity=1, credits=5, validDays=1))
    now = w.now()
    w.now = lambda: now + 2 * 86_400_000
    with pytest.raises(ApiError):
        w.redeem(user, Redeem(code=batch['codes'][0]))
    for _ in range(9):
        with pytest.raises(ApiError):
            w.redeem(user, Redeem(code='ACT-INVALID'))
    with pytest.raises(ApiError) as e:
        w.redeem(user, Redeem(code='ACT-INVALID'))
    assert e.value.status_code == 429
    c = TestClient(app)
    assert c.post('/api/v1/console/admin/users/' + user + '/credits', headers=header(sessions[0]), json={'delta':1.5,'reason':'bad','requestId':'bad-000001'}).status_code == 400
    assert c.patch('/api/v1/console/admin/users/' + user + '/role', headers=header(sessions[0]), json={'role':'OWNER'}).status_code == 400


def test_batch_retry_scope_and_key_revocation(setup):
    app, w, sessions, ids = setup
    owner, user, admin, _ = ids
    w.change_role(owner, admin, RoleChange(role='ADMIN', productIds=['agent']))
    with pytest.raises(ApiError):
        w.create_batch(owner, BatchCreate(label='wrong scope', productId='lammps', units=1, quantity=1, assignedTo=admin))
    body = BatchCreate(label='retry', credits=10, quantity=3, requestId='batch-retry-001')
    a, b = w.create_batch(owner, body), w.create_batch(owner, body)
    assert a == b
    assert len(set(a['codes'])) == 3
    with pytest.raises(ApiError):
        w.create_batch(owner, body.model_copy(update={'credits':100}))
    with w.db.connect() as c:
        assert c.execute('SELECT COUNT(*) FROM official_codes').fetchone()[0] == 3
    c = TestClient(app)
    assert c.get('/api/v1/console/admin/assignees', headers=header(sessions[2])).status_code == 403
    key = w.issue_key(owner, 'agent')
    assert c.post('/api/v1/console/admin/keys/' + key['id'] + '/revoke', headers=header(sessions[0])).status_code == 200
    with pytest.raises(ApiError) as e:
        w.usage(key['key'], Usage(userId=user, eventId='revoked-key-001'))
    assert e.value.status_code == 401


def test_insufficient_credits_rolls_back_usage_and_timed_access(setup):
    _, w, _, ids = setup
    owner, user, *_ = ids
    available(w, owner)
    code = w.create_batch(owner, BatchCreate(label='timed access', productId='lammps', units=5, days=1, quantity=1))['codes'][0]
    w.redeem(user, Redeem(code=code))
    key = w.issue_key(owner, 'lammps')['key']
    with pytest.raises(ApiError) as e:
        w.usage(key, Usage(userId=user, eventId='no-funds-001'))
    assert e.value.code == 'INSUFFICIENT_CREDITS'
    d = w.dashboard(user, 7, 'all')
    assert d['summary']['total']['calls'] == 0
    assert d['entitlements'][0]['units'] == 5
    fund(w, owner, user, 10)
    w.usage(key, Usage(userId=user, eventId='with-funds-001'))
    assert w.dashboard(user, 7, 'all')['entitlements'][0]['units'] == 5
    now = w.now()
    w.now = lambda: now + 2 * 86400000
    w.usage(key, Usage(userId=user, eventId='quota-after-time-001'))
    assert w.dashboard(user, 7, 'all')['entitlements'][0]['units'] == 4
