import pytest
from fastapi.testclient import TestClient
from official_api.app import create_app
from official_api.config import Settings
from official_api.products.entitlements import active
from official_api.billing.wallet import CreditChange, UsageEvent, DAY
from official_api.errors import ApiError
from official_api.products.codes import BatchCreate, Redeem
from gateway.app import Gateway, Principal

def test_duration_authorization_billing_and_owner_scope(tmp_path):
    app = create_app(settings=Settings.from_env({'LLMER_HASH_SECRET':'duration-test-'*4,'LLMER_DATABASE_PATH':str(tmp_path/'db.sqlite3'),'LLMER_AVATAR_DIR':str(tmp_path/'avatars'),'APP_ENV':'test'}))
    w,a=app.state.workspace,app.state.auth_service
    logins=[a._create_login(a.hash('phone',str(13900000001+i)),str(i).zfill(4),a.now()) for i in range(2)]
    owner,user=[s['profile']['userId'] for s in logins]
    w.bootstrap_owner('13900000001')
    headers=[{'Authorization':'Bearer '+s['accessToken']} for s in logins]
    c=TestClient(app)
    path=f'/api/v1/console/admin/users/{user}/products/md-exp/duration'
    assert c.put(path,headers=headers[1],json={'days':30}).status_code==403
    assert c.put(path,headers=headers[0],json={'days':0}).status_code==400
    response=c.put(path,headers=headers[0],json={'days':30})
    assert response.status_code==200
    expiry=response.json()['expiresAt']
    assert 29*DAY < expiry-w.now() <= 30*DAY
    w.adjust_credits(owner,user,CreditChange(delta=100,reason='test credits',requestId='duration-funding'))
    for n in range(3):
        with w.db.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            result=w.charge(db,user_id=user,product_id='md-exp',event_id=f'duration-event-{n}',usage=UsageEvent(units=1,model='deepseek-v4-pro',input_tokens=10,output_tokens=10))
            assert result.points==2
    with w.db.connect() as db:
        row=db.execute('SELECT * FROM official_entitlements WHERE user_id=? AND product_id=?',(user,'md-exp')).fetchone()
        assert row['units']==0 and row['expires_at_ms']==expiry
        assert active(db,user,'md-exp',w.now())
        assert w.balance(db,user)==94
        assert db.execute('SELECT COUNT(*) FROM official_ledger WHERE user_id=? AND kind=?',(owner,'USAGE')).fetchone()[0]==0
        Gateway(w)._entitled(db,Principal(user,'md-exp'),reserve=True)
        db.execute('UPDATE official_entitlements SET units=999,expires_at_ms=? WHERE user_id=?',(w.now()-1,user))
    with w.db.connect() as db:
        assert not active(db,user,'md-exp',w.now())
        with pytest.raises(ApiError):
            Gateway(w)._entitled(db,Principal(user,'md-exp'))
        with pytest.raises(ApiError):
            w.charge(db,user_id=user,product_id='md-exp',event_id='expired-event',usage=UsageEvent(units=1,model='deepseek-v4-pro',input_tokens=10))
    assert c.put(path,headers=headers[0],json={'days':45}).status_code==200
    dash=c.get('/api/v1/console/dashboard',headers=headers[1]).json()
    product=next(x for x in dash['entitlements'] if x['product_id']=='md-exp')
    assert product['active'] and product['entry_url']=='/official/console/'
    with pytest.raises(ApiError):
        w.create_batch(owner,BatchCreate(label='invalid units',quantity=1,productId='md-exp',units=1))
    code=w.create_batch(owner,BatchCreate(label='days',quantity=1,productId='md-exp',days=7))['codes'][0]
    w.redeem(user,Redeem(code=code))
