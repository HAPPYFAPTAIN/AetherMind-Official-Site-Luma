"""Loopback-only browser acceptance harness. Never included in deployment packages."""
import json
import sys
import tempfile
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from llmer_api.config import Settings
from official_api.app import create_app
from official_api.workspace import BatchCreate, CreditChange, ProductEdit, Redeem, RoleChange, Usage
import uvicorn

folder = Path(tempfile.mkdtemp(prefix='official-workspace-test-'))
settings = Settings.from_env({'LLMER_HASH_SECRET': 'local-only-fixture-secret-' * 3,
                             'LLMER_DATABASE_PATH': str(folder / 'fixture.sqlite3'),
                             'LLMER_AVATAR_DIR': str(folder / 'avatars'), 'APP_ENV': 'test'})
class FakeSms:
    def send_code(self, phone): pass
    def verify_code(self, phone, code): return code == '123456'

api = create_app(settings=settings, sms_provider=FakeSms())
w, auth = api.state.workspace, api.state.auth_service
sessions = {}
for i, role in enumerate(['owner', 'user', 'admin']):
    phone = str(13900000001 + i)
    sessions[role] = auth._create_login(auth.hash('phone', phone), phone[-4:], auth.now())
owner = sessions['owner']['profile']['userId']
user = sessions['user']['profile']['userId']
admin = sessions['admin']['profile']['userId']
w.bootstrap_owner('13900000001')
w.change_role(owner, admin, RoleChange(role='ADMIN', productIds=['lammps']))
with w.db.connect() as c:
    for name, uid in [('科研工作室', owner), ('验收普通用户', user), ('产品负责人', admin)]:
        c.execute('UPDATE profiles SET display_name=? WHERE user_id=?', (name, uid))
w.adjust_credits(owner, owner, CreditChange(delta=16000, reason='隔离验收数据', requestId='preview-fund-001'))
for pid, name in [('lammps', 'LAMMPS 计算引擎'), ('agent', '科学智能体')]:
    w.edit_product(owner, pid, ProductEdit(name=name, nameEn='LAMMPS' if pid == 'lammps' else 'Science Agents', description='产品验收环境', entryUrl='', status='AVAILABLE', price=50, packageUnits=100, packageDays=0, unitPointCost=2))
    batch = w.create_batch(owner, BatchCreate(label='隔离验收产品权益', productId=pid, units=2000, quantity=1))
    w.redeem(owner, Redeem(code=batch['codes'][0]))
    key = w.issue_key(owner, pid)['key']
    for day in range(70):
        if day % 6 == 0: continue
        event = w.usage(key, Usage(userId=owner, eventId=f'fixture-{pid}-{day}', units=day % 9 + 1, inputTokens=(day % 7 + 1) * 1500, cachedTokens=400, outputTokens=(day % 5 + 1) * 300))
        with w.db.connect() as c:
            c.execute('UPDATE official_usage SET created_at_ms=? WHERE id=?', (w.now() - day * 86400000, event['id']))
site = FastAPI()
@site.get('/__fixture/{role}')
def fixture(role: str):
    s = sessions[role]
    return HTMLResponse('<script>localStorage.setItem("aethericai-language","zh");' +
        ''.join(f'localStorage.setItem({json.dumps(k)},{json.dumps(str(v))});' for k, v in {
            'aethericai-community-access-token': s['accessToken'],
            'aethericai-community-refresh-token': s['refreshToken'],
            'aethericai-community-access-expires': s['accessTokenExpiresAtEpochMs']}.items()) +
        'location.replace("/official/dashboard/")</script>')
site.mount('/official-api', api)
site.mount('/official', StaticFiles(directory=Path(__file__).resolve().parents[2] / 'out', html=True))
uvicorn.run(site, host='127.0.0.1', port=3101, access_log=False)
