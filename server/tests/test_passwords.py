import concurrent.futures

import pytest
from fastapi.testclient import TestClient
from llmer_api.aliyun_sms import SmsProviderError
from llmer_api.community_auth import TERMS_VERSION
from llmer_api.config import Settings
from official_api.app import create_app

PHONE = '13900000001'
OTHER = '13900000002'
PASSWORD = 'a long test passphrase 2026!'
NEXT_PASSWORD = 'another long test passphrase!'


class Sms:
    def __init__(self):
        self.sent = []
        self.unavailable = False

    def send_code(self, phone):
        if self.unavailable:
            raise SmsProviderError('send', 'TEST_UNAVAILABLE')
        self.sent.append(phone)

    def verify_code(self, phone, code):
        if self.unavailable:
            raise SmsProviderError('verify', 'TEST_UNAVAILABLE')
        return phone in self.sent and code == '123456'


@pytest.fixture
def setup(tmp_path):
    clock = [1_790_000_000_000]
    sms = Sms()
    settings = Settings.from_env({'LLMER_HASH_SECRET': 'test-only-password-secret-' * 3,
        'LLMER_DATABASE_PATH': str(tmp_path / 'auth.sqlite3'),
        'LLMER_AVATAR_DIR': str(tmp_path / 'avatars'), 'APP_ENV': 'test'})
    app = create_app(settings=settings, sms_provider=sms, now=lambda: clock[0])
    auth = app.state.auth_service
    sessions = [auth._create_login(auth.hash('phone', p), p[-4:], clock[0]) for p in (PHONE, OTHER)]
    app.state.workspace.bootstrap_owner(PHONE)
    return TestClient(app), app, sessions, sms, clock


def headers(session):
    return {'Authorization': 'Bearer ' + session['accessToken']}


def login(c, password=PASSWORD, phone=PHONE, **extra):
    return c.post('/api/v1/community/auth/password', json={
        'phone': phone, 'password': password, 'acceptedTerms': True,
        'termsVersion': TERMS_VERSION, **extra})


def request_code(c, session, phone=PHONE):
    return c.post('/api/v1/console/security/password/sms', headers=headers(session), json={'phone': phone})


def change(c, session, challenge, password=PASSWORD, **extra):
    return c.put('/api/v1/console/security/password', headers=headers(session), json={
        'phone': PHONE, 'code': '123456', 'challengeId': challenge,
        'newPassword': password, **extra})


def set_password(c, session):
    requested = request_code(c, session)
    assert requested.status_code == 200
    challenge = requested.json()['challengeId']
    assert change(c, session, challenge).status_code == 204
    return challenge


def test_password_login_same_account_and_change_revokes_all_sessions(setup):
    c, app, sessions, _, clock = setup
    original = sessions[0]
    assert c.get('/api/v1/console/security/password', headers=headers(original)).json()['hasPassword'] is False
    set_password(c, original)
    assert c.get('/api/v1/console/me', headers=headers(original)).status_code == 401
    assert c.post('/api/v1/auth/refresh', json={'refreshToken': original['refreshToken']}).status_code == 401
    a, b = login(c).json(), login(c).json()
    assert a['profile']['userId'] == original['profile']['userId']
    assert c.get('/api/v1/console/me', headers=headers(a)).json()['role'] == 'OWNER'
    assert c.get('/api/v1/console/security/password', headers=headers(a)).json()['hasPassword'] is True
    clock[0] += 61_000
    proof = request_code(c, a).json()['challengeId']
    assert change(c, a, proof, NEXT_PASSWORD).status_code == 204
    for old in (a, b):
        assert c.get('/api/v1/console/me', headers=headers(old)).status_code == 401
        assert c.post('/api/v1/auth/refresh', json={'refreshToken': old['refreshToken']}).status_code == 401
    assert login(c).status_code == 401
    assert login(c, NEXT_PASSWORD).status_code == 200
    assert c.get('/api/v1/console/me', headers=headers(sessions[1])).status_code == 200
    with app.state.database.connect() as db:
        stored = db.execute('SELECT password_hash FROM official_passwords').fetchone()[0]
        assert stored.startswith('scrypt-32768-8-3$') and PASSWORD not in stored and NEXT_PASSWORD not in stored
        assert db.execute('SELECT COUNT(*) FROM users').fetchone()[0] == 2
        assert db.execute("SELECT COUNT(*) FROM official_audit WHERE action='PASSWORD_CHANGED'").fetchone()[0] == 2


def test_unset_unknown_and_wrong_password_use_same_error(setup):
    c, _, sessions, _, _ = setup
    unset = login(c).json()
    assert login(c, phone='13900000009').json() == unset
    set_password(c, sessions[0])
    assert login(c, 'incorrect password').json() == unset
    assert login(c, acceptedTerms=False).status_code == 400
    assert login(c, termsVersion='old-version').status_code == 400


def test_change_requires_auth_and_exact_bound_phone(setup):
    c, app, sessions, sms, _ = setup
    assert c.get('/api/v1/console/security/password').status_code == 401
    assert c.post('/api/v1/console/security/password/sms', json={'phone': PHONE}).status_code == 401
    assert request_code(c, sessions[0], OTHER).status_code == 400
    assert sms.sent == []
    proof = request_code(c, sessions[0]).json()['challengeId']
    assert change(c, sessions[1], proof).status_code == 400
    assert change(c, sessions[1], proof, phone=OTHER).status_code == 400
    assert change(c, sessions[0], proof, phone=OTHER).status_code == 400
    assert change(c, sessions[0], proof, code='000000').status_code == 400
    with app.state.database.connect() as db:
        assert db.execute('SELECT COUNT(*) FROM official_passwords').fetchone()[0] == 0


def test_code_expiry_reissue_generic_sms_and_replay(setup):
    c, _, sessions, _, clock = setup
    session = sessions[0]
    # A login SMS cannot serve as password-setting proof.
    assert c.post('/api/v1/auth/sms/request', json={'phone': PHONE}).status_code == 204
    assert change(c, session, 'not-a-password-challenge').status_code == 400
    clock[0] += 61_000
    old = request_code(c, session).json()['challengeId']
    clock[0] += 61_000
    current = request_code(c, session).json()['challengeId']
    assert change(c, session, old).status_code == 400
    clock[0] += 3_600_000
    assert change(c, session, current).status_code in (400, 401)
    session = c.post('/api/v1/auth/refresh', json={'refreshToken': session['refreshToken']}).json()
    assert change(c, session, current).status_code == 400
    proof = request_code(c, session).json()['challengeId']
    assert change(c, session, proof).status_code == 204
    fresh = login(c).json()
    assert change(c, fresh, proof, NEXT_PASSWORD).status_code == 400


def test_login_limits_persist_across_service_instances_and_expire(setup):
    c, app, _, _, clock = setup
    for _ in range(8):
        assert login(c, phone='13900000009').status_code == 401
    response = login(c, phone='13900000009')
    assert response.status_code == 429 and response.headers['retry-after'] == '600'
    from official_api.passwords import Passwords, PasswordLogin
    from llmer_api.errors import ApiError
    service = Passwords(app.state.workspace)
    with pytest.raises(ApiError) as e:
        service.login(PasswordLogin(phone='13900000009', password=PASSWORD, acceptedTerms=True, termsVersion=TERMS_VERSION), 'testclient')
    assert e.value.status_code == 429
    clock[0] += 600_001
    assert login(c, phone='13900000009').status_code == 401


def test_validation_sms_limits_and_provider_failure(setup):
    c, app, sessions, sms, _ = setup
    proof = request_code(c, sessions[0]).json()['challengeId']
    assert request_code(c, sessions[0]).status_code == 429
    for password in ('short', ' ' * 15, 'a' * 129, 'password with\nnewline'):
        assert change(c, sessions[0], proof, password).status_code == 400
    sms.unavailable = True
    assert change(c, sessions[0], proof).status_code == 503
    assert c.get('/api/v1/console/security/password', headers=headers(sessions[0])).json()['hasPassword'] is False
    sms.unavailable = False
    # Validation/provider errors do not silently save credentials.
    assert change(c, sessions[0], proof).status_code == 204
    assert login(c).status_code == 200


def test_parallel_change_only_commits_once(setup):
    c, app, sessions, _, _ = setup
    proof = request_code(c, sessions[0]).json()['challengeId']
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        results = list(pool.map(lambda _: change(c, sessions[0], proof).status_code, range(2)))
    assert results.count(204) == 1
    assert all(status in (204, 400, 401, 429) for status in results)
    with app.state.database.connect() as db:
        assert db.execute("SELECT COUNT(*) FROM official_audit WHERE action='PASSWORD_CHANGED'").fetchone()[0] == 1


def test_inflight_old_password_cannot_create_session_after_change(setup, monkeypatch):
    c, app, sessions, _, _ = setup
    set_password(c, sessions[0])
    service = app.state.passwords
    replacement = service.encode(NEXT_PASSWORD)
    derive = service.derive
    def concurrent_reset(password, salt):
        result = derive(password, salt)
        with service.db.connect() as db:
            db.execute('UPDATE official_passwords SET password_hash=?', (replacement,))
        return result
    monkeypatch.setattr(service, 'derive', concurrent_reset)
    assert login(c).status_code == 401


def test_existing_sms_login_still_works(setup):
    c, _, sessions, _, clock = setup
    set_password(c, sessions[0])
    clock[0] += 61_000
    assert c.post('/api/v1/auth/sms/request', json={'phone': PHONE}).status_code == 204
    result = c.post('/api/v1/community/auth/sms/verify', json={
        'phone': PHONE, 'code': '123456', 'acceptedTerms': True, 'termsVersion': TERMS_VERSION})
    assert result.status_code == 200
    assert result.json()['profile']['userId'] == sessions[0]['profile']['userId']


def test_new_login_sms_invalidates_password_challenge(setup):
    c, _, sessions, _, clock = setup
    proof = request_code(c, sessions[0]).json()['challengeId']
    clock[0] += 61_000
    assert c.post('/api/v1/auth/sms/request', json={'phone': PHONE}).status_code == 204
    assert change(c, sessions[0], proof).status_code == 400
