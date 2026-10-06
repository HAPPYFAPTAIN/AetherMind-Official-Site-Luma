"""Password-authenticated operations UI, isolated from game user sessions."""
import hashlib
import hmac
import json
import os
import secrets
import time
from pathlib import Path

from fastapi import Depends, Request, Response, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse
from pydantic import BaseModel, ConfigDict, Field

from .errors import ApiError

COOKIE = 'llmer_admin_session'
TTL = 8 * 3600
ASSETS = Path(__file__).parent / 'admin_web'


def password_hash(password):
    salt = secrets.token_hex(16)
    return salt + ':' + hashlib.scrypt(password.encode(), salt=salt.encode(), n=16384, r=8, p=1).hex()


def verify_password(password, stored):
    try:
        salt, expected = stored.split(':')
        actual = hashlib.scrypt(password.encode(), salt=salt.encode(), n=16384, r=8, p=1).hex()
        return hmac.compare_digest(actual, expected)
    except (ValueError, TypeError):
        return False


def token_hash(token):
    return hashlib.sha256(token.encode()).hexdigest()


class Credentials(BaseModel):
    model_config = ConfigDict(extra='forbid')
    username: str = Field(min_length=1, max_length=64)
    password: str = Field(min_length=1, max_length=256)


class PasswordChange(BaseModel):
    currentPassword: str = Field(min_length=1, max_length=256)
    newPassword: str = Field(min_length=12, max_length=256)


def mount_admin(app, db, paid):
    with db.connect() as c:
        c.executescript('''
            CREATE TABLE IF NOT EXISTS admin_users(username TEXT PRIMARY KEY,password_hash TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS admin_sessions(token_hash TEXT PRIMARY KEY,username TEXT NOT NULL,csrf TEXT NOT NULL,expires INTEGER NOT NULL);
            CREATE TABLE IF NOT EXISTS admin_attempts(actor_hash TEXT NOT NULL,created INTEGER NOT NULL);
            CREATE INDEX IF NOT EXISTS admin_attempt_time ON admin_attempts(created);
            CREATE TABLE IF NOT EXISTS admin_audit(id INTEGER PRIMARY KEY,username TEXT NOT NULL,action TEXT NOT NULL,target TEXT,created INTEGER NOT NULL);
        ''')
        username = os.environ.get('LLMER_ADMIN_USERNAME', '')
        hashed = os.environ.get('LLMER_ADMIN_PASSWORD_HASH', '')
        if username and hashed and len(hashed.split(':')) == 2:
            c.execute('INSERT OR IGNORE INTO admin_users VALUES(?,?)', (username, hashed))

    def origin_check(request):
        origin = request.headers.get('origin')
        if origin and origin != 'https://' + request.headers.get('host', ''):
            raise ApiError(403, 'ADMIN_ORIGIN_REJECTED', '请从管理后台页面操作')

    def current_admin(request: Request):
        token = request.cookies.get(COOKIE, '')
        with db.connect() as c:
            row = c.execute('SELECT * FROM admin_sessions WHERE token_hash=? AND expires>?', (token_hash(token), int(time.time()))).fetchone()
        if not row:
            raise ApiError(401, 'ADMIN_LOGIN_REQUIRED', '请登录管理后台')
        if request.method not in ('GET','HEAD'):
            origin_check(request)
            if not hmac.compare_digest(request.headers.get('x-admin-csrf',''), row['csrf']):
                raise ApiError(403, 'ADMIN_CSRF_REJECTED', '页面凭据已失效，请刷新后重试')
        return dict(row)

    def audit(username, action, target=''):
        with db.connect() as c:
            c.execute('INSERT INTO admin_audit(username,action,target,created) VALUES(?,?,?,?)', (username,action,target,int(time.time())))

    @app.get('/admin/api/question-banks')
    def banks(admin=Depends(current_admin)):
        return {'items':paid.question_banks.versions()}

    @app.get('/admin/api/question-banks/v4')
    def v4_bank(admin=Depends(current_admin)):
        bank = paid.v4_question_banks
        with db.connect() as c:
            effective=bank.effective_bank(c)
            imports=[dict(r) for r in c.execute('SELECT id,created_ms,active FROM v4_imports ORDER BY created_ms DESC LIMIT 20')]
        return {
            'version': bank.payload.get('version'),
            'structuredCandidates': {
                'ability': len(bank.payload.get('ability', [])),
                'style': len(bank.payload.get('style', [])),
                'icebreakers': len(bank.payload.get('icebreakers', [])),
            },
            'retainedForReview': {
                'source': len(bank.payload.get('source', [])),
                'dialogue': len(bank.payload.get('dialogue', [])),
                'exam': len(bank.payload.get('exam', [])),
            },
            'policy': '服务端只下发题面和选项；答案与解析留在服务端判分。',
            'reviewed':sum(q.get('reviewStatus')=='approved' and q.get('deploymentEligible') is True for q in effective.values()),
            'trial':bank.allow_draft_trials,'rewardSimulation':bank.simulate_rewards,'imports':imports,
        }

    @app.get('/admin/api/question-banks/v4/questions')
    def v4_questions(page: int = 1, q: str = '', status: str = '', admin=Depends(current_admin)):
        bank = paid.v4_question_banks
        rows = []
        with db.connect() as c: effective=bank.effective_bank(c)
        for item in effective.values():
            if q and q[:100] not in item['id'] and q[:100] not in item.get('prompt', ''): continue
            if status and item.get('reviewStatus') != status: continue
            rows.append({k: item.get(k) for k in ('id','prompt','options','scored','sourceKind','dimension','difficulty','reviewStatus','deploymentEligible','familyId','exposureExclusionGroups','correctOptionIds','explanation','governanceRole')})
        page = max(1, page)
        return {'items': rows[(page-1)*20:page*20], 'total': len(rows), 'page': page, 'pageSize': 20}

    @app.post('/admin/api/question-banks/v4/import')
    async def v4_import(file:UploadFile=File(...),admin=Depends(current_admin)):
        import asyncio
        result=await asyncio.to_thread(paid.v4_question_banks.import_workbook,await file.read(8*1024*1024+1),file.filename)
        audit(admin['username'],'import_v4_bank',result['id']);return result

    @app.post('/admin/api/question-banks/v4/imports/{iid}/activate')
    def v4_activate(iid:str,admin=Depends(current_admin)):
        result=paid.v4_question_banks.activate_import(iid);audit(admin['username'],'activate_v4_bank',iid);return result

    @app.post('/admin/api/question-banks/v4/questions/{qid}/review')
    def v4_review(qid: str, body: dict, admin=Depends(current_admin)):
        result = paid.v4_question_banks.set_review(qid, body, admin['username'])
        audit(admin['username'], 'review_v4_question', qid)
        return result

    @app.get('/admin/api/assessment-v4/history')
    def v4_history(page: int = 1, q: str = '', admin=Depends(current_admin)):
        bank = paid.v4_question_banks
        term = '%' + q[:80] + '%'
        with db.connect() as c:
            total=c.execute('SELECT count(*) FROM v4_forms WHERE id LIKE ? OR user_id LIKE ?',(term,term)).fetchone()[0]
            rows = [dict(row) for row in c.execute(
                "SELECT id,user_id,mode,created_ms,result_json FROM v4_forms WHERE id LIKE ? OR user_id LIKE ? ORDER BY created_ms DESC LIMIT 50 OFFSET ?",
                (term, term, (max(1, page)-1)*50))]
        for row in rows: row['result'] = json.loads(row.pop('result_json') or 'null')
        return {'items': rows, 'page': max(1, page),'total':total,'pageSize':50}

    @app.get('/admin/api/question-banks/template.xlsx')
    def bank_template(admin=Depends(current_admin)):
        return FileResponse(Path(__file__).parent/'data'/'question-bank-template.xlsx', filename='question-bank-template.xlsx')

    @app.post('/admin/api/question-banks/import')
    async def import_bank(file:UploadFile=File(...),admin=Depends(current_admin)):
        import asyncio
        from .question_bank import MAX_BYTES,BankValidationError
        content=await file.read(MAX_BYTES+1)
        suffix=(file.filename or '').lower()
        if not suffix.endswith(('.xlsx','.json')):
            return JSONResponse({'error':{'code':'BANK_IMPORT_INVALID','message':'请上传 XLSX 或 JSON 文件'},'errors':['仅支持 .xlsx 或 .json 格式']},status_code=400)
        try:
            importer=paid.question_banks.import_json if suffix.endswith('.json') else paid.question_banks.import_xlsx
            result=await asyncio.to_thread(importer,content,file.filename,admin['username'])
        except BankValidationError as error:
            return JSONResponse({'error':{'code':'BANK_IMPORT_INVALID','message':'题库未通过校验，未启用任何更改'},'errors':error.errors},status_code=400)
        audit(admin['username'],'import_question_bank',result['id'])
        return result

    @app.post('/admin/api/question-banks/{vid}/activate')
    def activate_bank(vid:str,admin=Depends(current_admin)):
        return paid.question_banks.activate(vid,admin['username'])

    @app.get('/admin/api/question-banks/{vid}/questions')
    def bank_questions(vid:str,page:int=1,q:str='',admin=Depends(current_admin)):
        payload=paid.question_banks.get_payload(vid)
        rows=[v for v in payload['questions'] if q[:100] in v['id'] or q[:100] in v['prompt']]
        page=max(1,page)
        return {'items':rows[(page-1)*20:page*20],'total':len(rows),'page':page}

    @app.get('/admin/api/assessments')
    def assessments(page:int=1,q:str='',admin=Depends(current_admin)):
        page=max(1,page);term='%'+q[:80]+'%'
        where='WHERE f.id LIKE ? OR f.user_id LIKE ?'
        with db.connect() as c:
            total=c.execute('SELECT count(*) FROM question_bank_forms f '+where,(term,term)).fetchone()[0]
            rows=[dict(r) for r in c.execute('SELECT f.id,f.user_id,f.version_id,f.mode,f.created_ms,r.submitted_ms,r.snapshot_json FROM question_bank_forms f LEFT JOIN question_bank_results r ON r.form_id=f.id '+where+' ORDER BY f.created_ms DESC LIMIT 20 OFFSET ?',(term,term,(page-1)*20))]
        for row in rows:row['result']=json.loads(row.pop('snapshot_json') or 'null')
        return {'items':rows,'total':total,'page':page}

    @app.get('/admin', include_in_schema=False)
    @app.get('/admin/', include_in_schema=False)
    def page():
        return FileResponse(ASSETS/'index.html', headers={'Content-Security-Policy':"default-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'", 'X-Frame-Options':'DENY'})

    @app.get('/admin/app.js', include_in_schema=False)
    def js():
        return FileResponse(ASSETS/'app.js', media_type='text/javascript')

    @app.get('/admin/style.css', include_in_schema=False)
    def css():
        return FileResponse(ASSETS/'style.css', media_type='text/css')

    @app.post('/admin/api/login')
    def login(body:Credentials, request:Request, response:Response):
        origin_check(request)
        now = int(time.time())
        # Per-account and per-connection buckets survive restarts; no raw IPs in the DB.
        buckets = [token_hash('user:'+body.username), token_hash('ip:'+(request.client.host if request.client else 'unknown'))]
        with db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            c.execute('DELETE FROM admin_attempts WHERE created<?', (now-900,))
            c.execute('DELETE FROM admin_sessions WHERE expires<=?', (now,))
            if any(c.execute('SELECT count(*) FROM admin_attempts WHERE actor_hash=?', (key,)).fetchone()[0]>=8 for key in buckets):
                raise ApiError(429,'ADMIN_RATE_LIMITED','登录尝试过多，请 15 分钟后重试',retry_after_seconds=900)
            c.executemany('INSERT INTO admin_attempts VALUES(?,?)', [(key,now) for key in buckets])
            user = c.execute('SELECT * FROM admin_users WHERE username=?', (body.username,)).fetchone()
        # Compute a fixed-cost hash even when the username does not exist.
        valid = verify_password(body.password, user['password_hash'] if user else '0'*32+':'+'0'*128)
        if not user or not valid:
            audit('anonymous','login_failed')
            raise ApiError(401,'ADMIN_LOGIN_FAILED','账号或密码不正确')
        token, csrf = secrets.token_urlsafe(32), secrets.token_urlsafe(24)
        with db.connect() as c:
            c.execute('INSERT INTO admin_sessions VALUES(?,?,?,?)',(token_hash(token),body.username,csrf,now+TTL))
            c.executemany('DELETE FROM admin_attempts WHERE actor_hash=?', [(key,) for key in buckets])
        response.set_cookie(COOKIE,token,httponly=True,secure=True,samesite='strict',max_age=TTL,path='/llmer-api/admin')
        audit(body.username,'login')
        return {'username':body.username,'csrfToken':csrf}

    @app.get('/admin/api/session')
    def session(admin=Depends(current_admin)):
        return {'username':admin['username'],'csrfToken':admin['csrf']}

    @app.post('/admin/api/logout', status_code=204)
    def logout(response:Response, admin=Depends(current_admin)):
        with db.connect() as c:
            c.execute('DELETE FROM admin_sessions WHERE token_hash=?',(admin['token_hash'],))
        response.delete_cookie(COOKIE,path='/llmer-api/admin',secure=True,httponly=True,samesite='strict')
        audit(admin['username'],'logout')

    @app.post('/admin/api/password', status_code=204)
    def change_password(body:PasswordChange,response:Response,admin=Depends(current_admin)):
        with db.connect() as c:
            old=c.execute('SELECT password_hash FROM admin_users WHERE username=?',(admin['username'],)).fetchone()[0]
            if not verify_password(body.currentPassword,old):
                raise ApiError(400,'ADMIN_PASSWORD_INVALID','当前密码不正确')
            c.execute('UPDATE admin_users SET password_hash=? WHERE username=?',(password_hash(body.newPassword),admin['username']))
            c.execute('DELETE FROM admin_sessions WHERE username=?',(admin['username'],))
        response.delete_cookie(COOKIE,path='/llmer-api/admin',secure=True,httponly=True,samesite='strict')
        audit(admin['username'],'password_changed')

    @app.get('/admin/api/overview')
    def overview(admin=Depends(current_admin)):
        with db.connect() as c:
            counts={table:c.execute(f'SELECT count(*) FROM {table}').fetchone()[0] for table in ('users','paid_cases','paid_materials','question_bank_forms','question_bank_results')}
            active_users=c.execute('SELECT count(DISTINCT user_id) FROM question_bank_forms WHERE created_ms>?',(int(time.time()*1000)-7*86400000,)).fetchone()[0]
            modes=[dict(r) for r in c.execute("SELECT payment_mode mode,order_status status,count(*) count,coalesce(sum(amount_fen),0) amountFen FROM paid_cases GROUP BY payment_mode,order_status")]
            tasks=[dict(r) for r in c.execute('SELECT status,count(*) count FROM paid_cases GROUP BY status')]
            tokens=c.execute('SELECT coalesce(sum(charged_bound),0) FROM paid_llm_calls').fetchone()[0]
        return {'counts':counts,'payments':modes,'tasks':tasks,'chargedTokenBound':tokens,'activeAssessmentUsers7d':active_users,
            'reportProvider':{'model':paid.settings.llm_model,'visionModel':paid.settings.vision_model,'reviewModel':paid.settings.review_model or paid.settings.llm_model},
            'capabilities':paid.capabilities(),'release':os.environ.get('LLMER_RELEASE_ID','local'),
            'workerAlive':bool(getattr(app.state,'worker',None) and app.state.worker.is_alive())}

    @app.get('/admin/api/users')
    def users(q:str='',page:int=1,admin=Depends(current_admin)):
        page=max(1,page); term='%'+q[:80]+'%'
        with db.connect() as c:
            where=' WHERE u.id LIKE ? OR p.display_name LIKE ?'
            args=(term,term)
            total=c.execute('SELECT count(*) FROM users u LEFT JOIN profiles p ON p.user_id=u.id'+where,args).fetchone()[0]
            rows=c.execute('''SELECT u.id,p.display_name,p.city,p.occupation,u.phone_last4,u.created_at_ms,
                (SELECT count(*) FROM paid_cases t WHERE t.user_id=u.id) case_count,
                EXISTS(SELECT 1 FROM paid_identities i WHERE i.user_id=u.id) wechat
                FROM users u LEFT JOIN profiles p ON p.user_id=u.id'''+where+' ORDER BY u.created_at_ms DESC LIMIT 25 OFFSET ?',(*args,(page-1)*25)).fetchall()
        return {'items':[dict(r) for r in rows],'total':total,'page':page}

    @app.get('/admin/api/cases')
    def cases(q:str='',status:str='',mode:str='',page:int=1,admin=Depends(current_admin)):
        page=max(1,page); args=['%'+q[:80]+'%']*2; where='WHERE (t.id LIKE ? OR t.user_id LIKE ?)'
        if status:
            where+=' AND t.status=?'; args.append(status[:40])
        if mode:
            where+=' AND t.payment_mode=?'; args.append(mode[:20])
        with db.connect() as c:
            total=c.execute('SELECT count(*) FROM paid_cases t '+where,args).fetchone()[0]
            rows=c.execute('''SELECT t.id,t.user_id,t.plan_id,t.amount_fen,t.payment_mode,t.report_mode,t.order_status,t.status,t.error_code,t.job_attempts,t.created_ms,t.updated_ms,t.expires_ms,
                (SELECT count(*) FROM paid_materials m WHERE m.case_id=t.id) material_count
                FROM paid_cases t '''+where+' ORDER BY t.created_ms DESC LIMIT 25 OFFSET ?',(*args,(page-1)*25)).fetchall()
        return {'items':[dict(r) for r in rows],'total':total,'page':page}

    @app.get('/admin/api/cases/{cid}')
    def detail(cid:str,admin=Depends(current_admin)):
        with db.connect() as c:
            row=c.execute('SELECT * FROM paid_cases WHERE id=?',(cid,)).fetchone()
            if not row: raise ApiError(404,'CASE_NOT_FOUND','订单不存在')
            row=dict(row)
            materials=[dict(r) for r in c.execute('SELECT id,scene_label,self_role,created_ms FROM paid_materials WHERE case_id=?',(cid,))]
            calls=[dict(r) for r in c.execute('SELECT stage,reserved,charged_bound,status,error_code,created_ms FROM paid_llm_calls WHERE case_id=? ORDER BY created_ms',(cid,))]
        audit(admin['username'],'view_case',cid)
        public=paid.public(row,True)
        public['transactionId']=row['transaction_id']
        public['updatedAt']=row['updated_ms']
        public['materials']=materials
        public['calls']=calls
        return public

    @app.post('/admin/api/cases/{cid}/retry')
    def retry(cid:str,admin=Depends(current_admin)):
        with db.connect() as c:
            row=c.execute('SELECT user_id FROM paid_cases WHERE id=?',(cid,)).fetchone()
        if not row: raise ApiError(404,'CASE_NOT_FOUND','订单不存在')
        result=paid.enqueue(row['user_id'],cid,retry=True)
        audit(admin['username'],'retry_case',cid)
        return result

    @app.post('/admin/api/cases/{cid}/simulate-refund')
    def refund(cid:str,admin=Depends(current_admin)):
        with db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            row=c.execute('SELECT * FROM paid_cases WHERE id=?',(cid,)).fetchone()
            if not row: raise ApiError(404,'CASE_NOT_FOUND','订单不存在')
            if row['payment_mode']!='simulation' or row['order_status'] not in ('PAID','REFUNDED') or row['status']=='DELETED':
                raise ApiError(409,'SIMULATION_REFUND_ONLY','只支持已完成模拟支付的订单，真实退款需支付渠道处理')
            c.execute("UPDATE paid_cases SET status='REFUNDED',order_status='REFUNDED',updated_ms=? WHERE id=?",(int(time.time()*1000),cid))
            c.execute('INSERT INTO admin_audit(username,action,target,created) VALUES(?,?,?,?)',(admin['username'],'simulate_refund',cid,int(time.time())))
        return {'status':'REFUNDED','simulation':True,'actualRefundFen':0}

    @app.get('/admin/api/audit')
    def audits(page:int=1,admin=Depends(current_admin)):
        page=max(1,page)
        with db.connect() as c:
            total=c.execute('SELECT count(*) FROM admin_audit').fetchone()[0]
            rows=c.execute('SELECT * FROM admin_audit ORDER BY id DESC LIMIT 25 OFFSET ?',((page-1)*25,)).fetchall()
        return {'items':[dict(r) for r in rows],'total':total,'page':page}
