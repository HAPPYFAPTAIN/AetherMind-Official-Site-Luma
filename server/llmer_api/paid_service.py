"""Small-deployment paid runtime: persisted queue, private images, frozen reports.

One SQLite database and one shared persistent volume; run one worker per deployment.
No LLM calls are made inside an API request or an open database transaction.
"""
from __future__ import annotations
import json
import time
import uuid
from pathlib import Path
from .material_images import normalize_material_image
from .errors import ApiError
from .paid_contract import assessment_snapshot, digest, plan_for
from .llm_guard import ACTIVE_BUDGET, CaseBudget, RETRYABLE, text_guard, validate_review

def now_ms():
    return int(time.time()*1000)

def encode(value):
    return json.dumps(value,ensure_ascii=False,separators=(',',':'))

class PaidService:
    def __init__(self, database, settings, storage_dir, llm, payment, identity):
        self.db, self.settings = database, settings
        self.root = Path(storage_dir).resolve()
        self.root.mkdir(parents=True,exist_ok=True)
        self.llm, self.payment, self.identity = llm, payment, identity
        self.initialize()
        from .question_bank import QuestionBankService
        self.question_banks=QuestionBankService(database)

    def initialize(self):
        with self.db.connect() as c:
            c.executescript('''
                CREATE TABLE IF NOT EXISTS paid_identities(
                    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
                    openid TEXT NOT NULL UNIQUE);
                CREATE TABLE IF NOT EXISTS paid_cases(
                    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    context_id TEXT NOT NULL, plan_id TEXT NOT NULL, amount_fen INTEGER NOT NULL,
                    snapshot_json TEXT NOT NULL, snapshot_hash TEXT NOT NULL,
                    status TEXT NOT NULL, order_status TEXT NOT NULL DEFAULT 'NONE',
                    payment_params_json TEXT, transaction_id TEXT,
                    job_attempts INTEGER NOT NULL DEFAULT 0, lease_until_ms INTEGER,
                    input_hash TEXT, report_json TEXT, ledger_json TEXT, usage_json TEXT,
                    error_code TEXT, created_ms INTEGER NOT NULL, updated_ms INTEGER NOT NULL,
                    expires_ms INTEGER NOT NULL, UNIQUE(user_id,context_id));
                CREATE UNIQUE INDEX IF NOT EXISTS paid_transaction_unique ON paid_cases(transaction_id) WHERE transaction_id IS NOT NULL;
                CREATE INDEX IF NOT EXISTS paid_queue_idx ON paid_cases(status,created_ms);
                CREATE INDEX IF NOT EXISTS paid_expiry_idx ON paid_cases(expires_ms,status);
                CREATE TABLE IF NOT EXISTS paid_deletions(object_key TEXT PRIMARY KEY);
                CREATE TABLE IF NOT EXISTS paid_materials(
                    id TEXT PRIMARY KEY, case_id TEXT NOT NULL REFERENCES paid_cases(id) ON DELETE CASCADE,
                    content_hash TEXT NOT NULL, source_hash TEXT NOT NULL, object_key TEXT NOT NULL,
                    scene_label TEXT NOT NULL, self_role TEXT NOT NULL,
                    extraction_json TEXT, extraction_usage_json TEXT, created_ms INTEGER NOT NULL,
                    UNIQUE(case_id,content_hash));
                CREATE TABLE IF NOT EXISTS paid_llm_calls(
                    id TEXT PRIMARY KEY, case_id TEXT NOT NULL REFERENCES paid_cases(id) ON DELETE CASCADE,
                    stage TEXT NOT NULL, reserved INTEGER NOT NULL, charged_bound INTEGER NOT NULL,
                    status TEXT NOT NULL, error_code TEXT, usage_json TEXT, created_ms INTEGER NOT NULL);
                CREATE INDEX IF NOT EXISTS paid_llm_case ON paid_llm_calls(case_id);
                CREATE TRIGGER IF NOT EXISTS paid_account_erasure BEFORE DELETE ON users BEGIN
                    INSERT OR IGNORE INTO paid_deletions(object_key)
                    SELECT object_key FROM paid_materials WHERE case_id IN (SELECT id FROM paid_cases WHERE user_id=OLD.id);
                END;
            ''')
            columns={x['name'] for x in c.execute('PRAGMA table_info(paid_cases)')}
            if 'retry_feedback_json' not in columns:
                c.execute('ALTER TABLE paid_cases ADD COLUMN retry_feedback_json TEXT')
            if 'retry_guidance_json' not in columns:
                c.execute('ALTER TABLE paid_cases ADD COLUMN retry_guidance_json TEXT')
            for column in ('payment_mode', 'report_mode'):
                if column not in columns:
                    c.execute(f"ALTER TABLE paid_cases ADD COLUMN {column} TEXT NOT NULL DEFAULT 'live'")
            # A pre-upgrade attempt has no reliable spend ledger. Never reset it to zero.
            c.execute("""INSERT INTO paid_llm_calls(id,case_id,stage,reserved,charged_bound,status,error_code,created_ms)
                SELECT 'legacy-'||id,id,'legacy',CASE WHEN plan_id='deep' THEN 240000 ELSE 100000 END,
                    CASE WHEN plan_id='deep' THEN 240000 ELSE 100000 END,'UNKNOWN_LEGACY','LEGACY_USAGE_UNKNOWN',?
                FROM paid_cases WHERE job_attempts>0 AND report_mode='live' AND NOT EXISTS(SELECT 1 FROM paid_llm_calls WHERE case_id=paid_cases.id)""",(now_ms(),))


    def capabilities(self):
        simulation = self.settings.simulation_enabled
        return {'llm':self.llm.available,'payment':self.payment.available,'wechatLogin':self.identity.available,
            'supportsAssessmentV4':True,
            'supportsShuffleRelaxationOptions':True,
            'supportsQuestionRefreshLimits':True,
            'simulation':simulation, 'paymentMode':'simulation' if simulation else 'live',
            'reportMode':'simulation' if self.settings.simulated_reports else 'live',
            'workerEnabled':self.settings.worker_enabled,'retentionDays':self.settings.retention_days,
            'readyToPurchase':self.settings.worker_enabled and (simulation or (self.payment.available and self.identity.available))
                and (self.settings.simulated_reports or self.llm.available),
            'plans':[{'id':p,'amountFen':plan_for(p)['amountFen']} for p in ('standard','deep')]}

    def bind_identity(self,user_id,openid):
        with self.db.connect() as c:
            old = c.execute('SELECT openid FROM paid_identities WHERE user_id=?',(user_id,)).fetchone()
            if old and old['openid'] != openid:
                raise ApiError(409,'WECHAT_ACCOUNT_MISMATCH','当前微信账号与订单账号不同')
            taken = c.execute('SELECT user_id FROM paid_identities WHERE openid=?',(openid,)).fetchone()
            if taken and taken['user_id'] != user_id:
                raise ApiError(409,'WECHAT_ACCOUNT_ALREADY_BOUND','该微信已绑定其他账号，请使用原账号登录')
            c.execute('INSERT OR IGNORE INTO paid_identities(user_id,openid) VALUES(?,?)',(user_id,openid))

    def create_case(self,user_id,context_id,plan_id,raw,consent,expected_report_mode=None):
        from .commerce_service import require_context
        require_context(context_id)
        if consent is not True:
            raise ApiError(400,'ANALYSIS_CONSENT_REQUIRED','请确认将本次测评和所选材料用于 AI 分析')
        snapshot = self.question_banks.assessment_snapshot(user_id,raw) if isinstance(raw,dict) and str(raw.get('formVersion','')).startswith('cloud-bank-') else assessment_snapshot(raw)
        plan = plan_for(plan_id)
        snapshot['analysisContractHash']=digest(plan)
        fp = digest(snapshot)
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            old = c.execute('SELECT * FROM paid_cases WHERE user_id=? AND context_id=?',(user_id,context_id)).fetchone()
            if old:
                if old['status']=='DELETED':
                    raise ApiError(410,'CASE_DELETED','该分析记录已删除，请使用新的测评记录')
                if old['snapshot_hash']!=fp or old['plan_id']!=plan_id:
                    raise ApiError(409,'CASE_IMMUTABLE','已有订单绑定了另一份快照或套餐，请继续原订单')
                return self.public(dict(old))
            target_mode='simulation' if self.settings.simulated_reports else 'live'
            if self.settings.report_mode=='live' and expected_report_mode!=target_mode:
                raise ApiError(409,'REPORT_CONSENT_REQUIRED','请更新小游戏并确认本次会调用 AI 分析授权图片')
            cid = uuid.uuid4().hex
            created = now_ms()
            c.execute('''INSERT INTO paid_cases(id,user_id,context_id,plan_id,amount_fen,snapshot_json,snapshot_hash,
                status,created_ms,updated_ms,expires_ms) VALUES(?,?,?,?,?,?,?,'DRAFT',?,?,?)''',
                (cid,user_id,context_id,plan_id,plan['amountFen'],encode(snapshot),fp,created,created,created+self.settings.retention_days*86400000))
            c.execute('UPDATE paid_cases SET payment_mode=?,report_mode=? WHERE id=?',
                ('simulation' if self.settings.simulation_enabled else 'live','simulation' if self.settings.simulated_reports else 'live',cid))
        return self.get(user_id,cid)

    def require(self,user_id,cid,allow_expired=False):
        with self.db.connect() as c:
            row = c.execute('SELECT * FROM paid_cases WHERE id=? AND user_id=?',(cid,user_id)).fetchone()
        if not row:
            raise ApiError(404,'CASE_NOT_FOUND','分析记录不存在或已删除')
        if row['status']=='DELETED':
            # Ownership was checked above. Keep expiry meaningful after the
            # cleanup worker removes the private payload; other users still get 404.
            if row['expires_ms']<=now_ms():
                raise ApiError(410,'MATERIAL_CONSENT_EXPIRED','本次分析保留期限已到，云端报告已关闭')
            raise ApiError(404,'CASE_NOT_FOUND','分析记录不存在或已删除')
        if not allow_expired and row['expires_ms']<=now_ms():
            raise ApiError(410,'MATERIAL_CONSENT_EXPIRED','本次授权与报告保留期限已到，访问已关闭')
        return dict(row)

    def materials(self,cid):
        with self.db.connect() as c:
            return [dict(r) for r in c.execute('SELECT * FROM paid_materials WHERE case_id=? ORDER BY created_ms,id',(cid,)).fetchall()]

    def public(self,row,include_report=False):
        value = {'id':row['id'],'contextId':row['context_id'],'planId':row['plan_id'],'amountFen':row['amount_fen'],
            'paymentMode':row.get('payment_mode','live'),'reportMode':row.get('report_mode','live'),
            'status':row['status'],'orderStatus':row['order_status'],'errorCode':row['error_code'],
            'jobAttempts':row['job_attempts'],'createdAt':row['created_ms'],'expiresAt':row['expires_ms']}
        value['materials'] = [{'id':m['id'],'sceneLabel':m['scene_label'],'selfRole':m['self_role']} for m in self.materials(row['id'])]
        if row['status']=='RUNNING' and row.get('report_mode')=='live':
            with self.db.connect() as c:
                stage=c.execute('SELECT stage FROM paid_llm_calls WHERE case_id=? ORDER BY created_ms DESC,id DESC LIMIT 1',(row['id'],)).fetchone()
                extracted=c.execute('SELECT count(*) FROM paid_materials WHERE case_id=? AND extraction_json IS NOT NULL',(row['id'],)).fetchone()[0]
            value['processingStage']=stage[0] if stage else 'extraction'
            value['processedMaterials']=extracted
        if include_report and row['status']=='SUCCEEDED' and row['order_status']=='PAID':
            value['report']=json.loads(row['report_json'])
            stored_usage=json.loads(row['usage_json'] or '{}')
            value['provenance']={'inputHash':row['input_hash'],'snapshotHash':row['snapshot_hash'],
                'simulation': row.get('report_mode') == 'simulation',
                'model':stored_usage.get('model'),'visionModel':stored_usage.get('visionModel'),
                'usage':stored_usage}
            value['evidenceLedger']=json.loads(row['ledger_json'] or '[]')
        return value

    def get(self,user_id,cid,verify_entitlement=False):
        row=self.require(user_id,cid)
        if verify_entitlement and row['order_status']=='PAID' and row['status']=='SUCCEEDED':
            self.verify_order(user_id,cid)
            row=self.require(user_id,cid)
        return self.public(row,True)

    def list_cases(self,user_id):
        with self.db.connect() as c:
            rows = c.execute("SELECT * FROM paid_cases WHERE user_id=? AND status!='DELETED' ORDER BY created_ms DESC LIMIT 30",(user_id,)).fetchall()
        return [self.public(dict(r)) for r in rows]

    def create_order(self,user_id,cid,code):
        row = self.require(user_id,cid)
        self.require_current_contract(row)
        if row['order_status']=='PAID':
            return self.public(row)
        if row['order_status'] in ('CLOSED','REFUNDED'):
            raise ApiError(409,'ORDER_CLOSED','订单已关闭或退款，请联系售后核对')
        if row['payment_mode'] == 'simulation':
            if not self.settings.simulation_enabled or not self.settings.worker_enabled:
                raise ApiError(503,'SIMULATION_DISABLED','模拟体验暂未开启')
            if row['report_mode']=='live' and not self.llm.available:
                raise ApiError(503,'LLM_NOT_CONFIGURED','图片分析服务尚未配置，本次未确认付款')
            with self.db.connect() as c:
                c.execute("UPDATE paid_cases SET status='ORDER_PENDING',order_status='PENDING',updated_ms=? WHERE id=? AND order_status='NONE'", (now_ms(),cid))
            return {**self.get(user_id,cid), 'payment': {'api':'simulation', 'amountFen':row['amount_fen'], 'caseId':cid,'reportMode':row['report_mode']}}
        if self.settings.simulation_enabled:
            raise ApiError(409,'LIVE_PAYMENT_DISABLED','当前是模拟环境，请使用新的测评创建模拟订单')
        if not self.capabilities()['readyToPurchase']:
            raise ApiError(503,'PAID_SERVICE_NOT_READY','支付、模型或任务服务尚未全部配置，未发起付款')
        identity = self.identity.exchange(code)
        self.bind_identity(user_id,identity['openid'])
        # No session_key is persisted. The trusted merchant gateway consumes it once.
        params = self.payment.create({'merchantOrderId':cid,'planId':row['plan_id'],
            'amountFen':row['amount_fen'],'currency':'CNY'},identity)
        with self.db.connect() as c:
            c.execute("UPDATE paid_cases SET status='ORDER_PENDING',order_status='PENDING',payment_params_json=?,updated_ms=? WHERE id=? AND order_status IN ('NONE','PENDING') AND status!='DELETED'",(encode(params),now_ms(),cid))
        return {**self.get(user_id,cid),'payment':params}

    def verify_order(self,user_id,cid):
        row=self.require(user_id,cid)
        if row['order_status']=='NONE':
            raise ApiError(409,'ORDER_NOT_CREATED','尚未创建支付订单')
        if row['payment_mode'] == 'simulation':
            return self.public(row, True)
        with self.db.connect() as c:
            identity=c.execute('SELECT openid FROM paid_identities WHERE user_id=?',(user_id,)).fetchone()
        if not identity:
            raise ApiError(409,'WECHAT_IDENTITY_REQUIRED','订单没有绑定微信身份')
        result=self.payment.query(row,identity['openid'])
        status=result['status']
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            current=c.execute('SELECT * FROM paid_cases WHERE id=?',(cid,)).fetchone()
            if not current or current['status']=='DELETED':
                raise ApiError(404,'CASE_NOT_FOUND','分析记录已删除')
            if current['order_status']=='REFUNDED' or (current['order_status']=='PAID' and status in ('PENDING','CLOSED')):
                return self.public(dict(current))
            next_state = 'PAID' if status=='PAID' and current['status'] in ('ORDER_PENDING','DRAFT') else current['status']
            if status=='REFUNDED':
                next_state='REFUNDED'
            c.execute('UPDATE paid_cases SET order_status=?,status=?,transaction_id=COALESCE(?,transaction_id),updated_ms=? WHERE id=?',
                (status,next_state,result.get('transactionId') if status=='PAID' else None,now_ms(),cid))
        return self.get(user_id,cid)

    def add_material(self,user_id,cid,content,scene_label,self_role):
        row=self.require(user_id,cid)
        if row['order_status']!='PAID' or row['status'] not in ('PAID','FAILED','SAFETY_HOLD'):
            raise ApiError(409,'UPLOAD_NOT_ALLOWED','请先核验付款；生成中的材料不能修改')
        if row['expires_ms']<=now_ms():
            raise ApiError(410,'MATERIAL_CONSENT_EXPIRED','材料授权已到期，请联系售后')
        if not 1<=len(scene_label.strip())<=40 or self_role not in ('left','right','author','reference','auto'):
            raise ApiError(400,'MATERIAL_ROLE_REQUIRED','请说明哪一边是你；材料场景由系统记录')
        if not content or len(content)>10*1024*1024:
            raise ApiError(413,'MATERIAL_TOO_LARGE','每张图片最多 10MB')
        import hashlib
        source_hash=hashlib.sha256(content).hexdigest()
        # A retry may cross a deploy with different normalization settings.
        # Reuse the already accepted source bytes, not only the output JPEG hash.
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            current=c.execute('SELECT status,order_status FROM paid_cases WHERE id=?',(cid,)).fetchone()
            if not current or current['status'] not in ('PAID','FAILED','SAFETY_HOLD') or current['order_status']!='PAID':
                raise ApiError(409,'UPLOAD_NOT_ALLOWED','任务状态已变化，请刷新')
            old=c.execute('SELECT id,scene_label,self_role FROM paid_materials WHERE case_id=? AND source_hash=?',(cid,source_hash)).fetchone()
            if old:
                if old['scene_label']!=scene_label.strip() or old['self_role']!=self_role:
                    raise ApiError(409,'MATERIAL_LABEL_CONFLICT','同一张材料已使用不同场景或角色，请先删除原材料')
                return {'id':old['id']}
        data=normalize_material_image(content)
        hash_value=hashlib.sha256(data).hexdigest()
        mid=uuid.uuid4().hex
        path=self.root/(mid+'.jpg')
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            locked=c.execute('SELECT status,order_status FROM paid_cases WHERE id=?',(cid,)).fetchone()
            if not locked or locked['status'] not in ('PAID','FAILED','SAFETY_HOLD') or locked['order_status']!='PAID':
                raise ApiError(409,'UPLOAD_NOT_ALLOWED','任务状态已变化，请刷新')
            old=c.execute('SELECT * FROM paid_materials WHERE case_id=? AND (content_hash=? OR source_hash=?)',(cid,hash_value,source_hash)).fetchone()
            if old:
                if old['scene_label']!=scene_label.strip() or old['self_role']!=self_role:
                    raise ApiError(409,'MATERIAL_LABEL_CONFLICT','同一张材料已使用不同场景或角色，请先删除原材料')
                return {'id':old['id']}
            count=c.execute('SELECT COUNT(*) FROM paid_materials WHERE case_id=?',(cid,)).fetchone()[0]
            if count>=plan_for(row['plan_id'])['imageLimit']:
                raise ApiError(400,'MATERIAL_LIMIT','已达到套餐材料数量上限')
            try:
                with path.open('xb') as f:
                    f.write(data)
                path.chmod(0o600)
                c.execute('INSERT INTO paid_materials(id,case_id,content_hash,source_hash,object_key,scene_label,self_role,created_ms) VALUES(?,?,?,?,?,?,?,?)',
                    (mid,cid,hash_value,source_hash,path.name,scene_label.strip(),self_role,now_ms()))
            except Exception:
                path.unlink(missing_ok=True)
                raise
        return {'id':mid}

    def object_path(self,key):
        path=(self.root/key).resolve()
        if path.parent!=self.root:
            raise ValueError('INVALID_OBJECT_KEY')
        return path

    def delete_material(self,user_id,cid,mid):
        row=self.require(user_id,cid)
        if row['status'] in ('QUEUED','RUNNING','SUCCEEDED'):
            raise ApiError(409,'CASE_FROZEN','该材料属于已冻结报告；请删除整个分析记录以撤销材料及派生结果')
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            current=c.execute('SELECT status FROM paid_cases WHERE id=?',(cid,)).fetchone()
            if not current or current['status'] in ('QUEUED','RUNNING','SUCCEEDED','DELETED'):
                raise ApiError(409,'CASE_FROZEN','任务状态已变化，请刷新')
            material=c.execute('SELECT object_key FROM paid_materials WHERE id=? AND case_id=?',(mid,cid)).fetchone()
            if not material:
                raise ApiError(404,'MATERIAL_NOT_FOUND','材料不存在')
            c.execute('INSERT OR IGNORE INTO paid_deletions(object_key) VALUES(?)',(material['object_key'],))
            c.execute('DELETE FROM paid_materials WHERE id=?',(mid,))
        self.purge_objects()

    def enqueue(self,user_id,cid,retry=False):
        current = self.require(user_id,cid)
        if current['report_mode']=='simulation' and not self.settings.simulation_enabled:
            raise ApiError(409,'REPORT_MODE_UNAVAILABLE','当前环境不支持此订单的生成模式，请联系管理员')
        if (current['report_mode'] != 'simulation' and not self.llm.available) or not self.settings.worker_enabled:
            raise ApiError(503,'LLM_NOT_CONFIGURED','模型或任务服务尚未配置')
        self.require_current_contract(self.require(user_id,cid))
        # Query the merchant again before spending on a generation (handles refunds).
        self.verify_order(user_id,cid)
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            row=c.execute('SELECT * FROM paid_cases WHERE id=? AND user_id=?',(cid,user_id)).fetchone()
            if row['order_status']!='PAID':
                raise ApiError(409,'PAYMENT_REQUIRED','订单尚未核验或已退款')
            if row['status'] in ('QUEUED','RUNNING','SUCCEEDED'):
                return self.public(dict(row))
            if row['expires_ms']<=now_ms():
                raise ApiError(410,'MATERIAL_CONSENT_EXPIRED','材料授权已到期，请联系售后')
            if row['job_attempts']>=self.settings.max_attempts:
                raise ApiError(409,'AFTERSALES_REQUIRED','已达到本订单重试上限，请联系售后处理')
            if row['status'] in ('FAILED','SAFETY_HOLD') and retry is not True:
                raise ApiError(409,'RETRY_CONFIRMATION_REQUIRED','请确认使用本订单重新分析，不会再次收款')
            materials=[dict(m) for m in c.execute('SELECT * FROM paid_materials WHERE case_id=? ORDER BY id',(cid,))]
            if not materials:
                raise ApiError(400,'MATERIAL_REQUIRED','请至少上传一份内容清楚的图片材料')
            input_hash=digest({'snapshotHash':row['snapshot_hash'],'planId':row['plan_id'],
                'prompt':plan_for(row['plan_id'])['promptTemplateVersion'],
                'materials':[{k:m[k] for k in ('id','content_hash','scene_label','self_role')} for m in materials]})
            c.execute("UPDATE paid_cases SET status='QUEUED',input_hash=?,error_code=NULL,updated_ms=? WHERE id=?",(input_hash,now_ms(),cid))
        return self.get(user_id,cid)

    def run_once(self):
        t=now_ms()
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            # Crash reservations remain charged; the next attempt cannot reset order budget.
            c.execute("UPDATE paid_cases SET status=CASE WHEN job_attempts<? AND order_status='PAID' THEN 'QUEUED' ELSE 'FAILED' END,error_code=CASE WHEN job_attempts<? AND order_status='PAID' THEN NULL ELSE 'WORKER_INTERRUPTED' END WHERE status='RUNNING' AND lease_until_ms<?",(self.settings.max_attempts,self.settings.max_attempts,t))
            row=c.execute("SELECT * FROM paid_cases WHERE status='QUEUED' AND order_status='PAID' AND ((report_mode='simulation' AND ?) OR (report_mode='live' AND ?)) ORDER BY created_ms LIMIT 1", (self.settings.simulation_enabled,self.llm.available)).fetchone()
            if not row:
                return False
            row=dict(row)
            c.execute("UPDATE paid_cases SET status='RUNNING',job_attempts=job_attempts+1,lease_until_ms=?,updated_ms=? WHERE id=?",(t+20*60*1000,t,row['id']))
        cid=row['id']
        attempt=row['job_attempts']+1
        job_budget=CaseBudget(self.db,cid,row['plan_id'],attempt)
        budget_token=ACTIVE_BUDGET.set(job_budget)
        report=None
        try:
            self.verify_order(row['user_id'],cid)
            if row['expires_ms']<=now_ms():
                raise ValueError('MATERIAL_CONSENT_EXPIRED')
            if row['report_mode'] == 'simulation':
                from .simulation import finish_simulated_report
                finish_simulated_report(self, row, attempt)
                return True
            snapshot=json.loads(row['snapshot_json'])
            if snapshot.get('analysisContractHash')!=digest(plan_for(row['plan_id'])):
                raise ValueError('PLAN_VERSION_UNSUPPORTED')
            ledger=list(snapshot['evidence'])
            materials=self.materials(cid)
            usages=[]
            good=[]
            personal=[]
            material_context=[]
            seen_observations=set()
            for material in materials:
                self.require(row['user_id'],cid)
                if material['extraction_json']:
                    extracted=json.loads(material['extraction_json'])
                    usage=json.loads(material['extraction_usage_json'] or '{}')
                else:
                    extracted,usage=self.llm.extract(material,self.object_path(material['object_key']).read_bytes())
                    with self.db.connect() as c:
                        c.execute('UPDATE paid_materials SET extraction_json=?,extraction_usage_json=? WHERE id=?',(encode(extracted),encode(usage),material['id']))
                usages.append(usage)
                if extracted['safety']!='ordinary':
                    raise ValueError('SAFETY_HOLD_'+extracted['safety'].upper())
                if not extracted['readable']:
                    continue
                # Keep uncertain/third-party content as material, never silently label it self.
                units=[]
                for raw in extracted['units']:
                    unit=dict(raw)
                    attributable=(unit['speaker']=='self' and extracted['selfRoleMatches']
                        and material['self_role'] not in ('reference','auto')
                        and (extracted['kind']=='chat' or material['self_role']=='author'))
                    unit['speaker']='self' if attributable else 'material'
                    if not attributable:
                        unit['observation']='[材料内容，未归属本人] '+unit['observation']
                    units.append(unit)
                if not units:
                    continue
                observation_key=digest(sorted(u['observation'].strip() for u in units))
                if observation_key in seen_observations:
                    continue
                seen_observations.add(observation_key)
                good.append(material)
                if any(u['speaker']=='self' for u in units): personal.append(material)
                material_context.append({'sourceRef':material['id'],'kind':extracted['kind'],
                    'chatType':extracted.get('chatType','unknown'),'materialType':extracted.get('materialType','unknown'),
                    'intentHypothesis':extracted.get('intentHypothesis',''),
                    'attributionNote':extracted.get('attributionNote',''),'selfRoleMatches':extracted['selfRoleMatches']})
                for i,u in enumerate(units):
                    ledger.append({'id':material['id']+':'+str(i),'sourceType':'current_material','sourceRef':material['id'],
                        'locator':u['locator'],'observation':u['observation'],'dimension':u['dimension'],
                        'visualOrder':u.get('visualOrder'),
                        'speaker':u['speaker'],'sceneLabel':material['scene_label'],'quality':'model_extracted',
                        'materialKind':extracted['kind'],'chatType':extracted.get('chatType','unknown')})
            if not good:
                raise ValueError('NO_READABLE_MATERIAL_EVIDENCE')
            plan=plan_for(row['plan_id'])
            scenes=len({m['scene_label'] for m in personal})
            coverage={'validMaterials':len(good),'distinctScenes':scenes,
                'independentGroups':scenes,
                'independenceGate':'conservative_scene_groups',
                'personalMaterialCount':len(personal),'materialContext':material_context,
                'reportMode':'personal_hypothesis' if personal else 'material_hypothesis',
                'fullCoverage':len(personal)>=plan['minimumValidMaterials'] and scenes>=max(plan['minimumDistinctScenes'],3 if row['plan_id']=='deep' else 1),
                'note':'当前按用户确认的对话场景保守合并独立组；同场景多图仅计一组。完全相同的抽取观察不增加覆盖。未完成近重复图像语义聚类。'}
            self.require(row['user_id'],cid)
            if row.get('retry_feedback_json'):
                coverage['retryFeedback']=json.loads(row['retry_feedback_json'])
            if row.get('retry_guidance_json'):
                coverage['retryGuidance']=json.loads(row['retry_guidance_json'])
            report,usage=self.llm.synthesize(row['plan_id'],snapshot,ledger,coverage)
            usages.append(usage)
            # Even injected providers must satisfy the same server-side gate.
            from .paid_contract import validate_report
            validate_report(report,row['plan_id'],ledger)
            if not coverage['fullCoverage'] and (not report['notEnoughEvidence'] or not report['unavailableJudgments']):
                raise ValueError('REPORT_COVERAGE_GATE_FAILED')
            if row['plan_id']=='deep' and (not coverage['fullCoverage'] or sum(not f['notEnoughEvidence'] for f in report['findings'])<2) and report['practicePlan']:
                raise ValueError('REPORT_COVERAGE_GATE_FAILED')
            text_guard(report,ledger)
            if not callable(getattr(self.llm,'review',None)):
                raise ValueError('REPORT_REVIEW_NOT_CONFIGURED')
            verdict,review_usage=self.llm.review(row['plan_id'],snapshot,ledger,coverage,report)
            validate_review(verdict,len(report['findings']))
            if not verdict['passed']:
                from .llm_guard import ReviewRejected
                raise ReviewRejected(verdict)
            self.require(row['user_id'],cid)
            usages.append(review_usage)
            usage_total={k:sum(u.get(k,0) for u in usages) for k in ('prompt_tokens','completion_tokens','total_tokens')}
            usage_total['uncertaintyAdjustments']=usage.get('uncertaintyAdjustments',[])
            with self.db.connect() as c:
                c.execute("UPDATE paid_cases SET status='SUCCEEDED',report_json=?,ledger_json=?,usage_json=?,error_code=NULL,updated_ms=? WHERE id=? AND status='RUNNING' AND order_status='PAID' AND job_attempts=?",(encode(report),encode(ledger),encode({**usage_total,'model':self.settings.llm_model,'visionModel':self.settings.vision_model,'coverage':coverage,'guardAudit':job_budget.audit(),'semanticReview':{'passed':True,'model':self.settings.review_model or self.settings.llm_model},'reportInputBudget':usage.get('reportInputBudget',{})}),now_ms(),cid,attempt))
        except Exception as error:
            safe_codes=set(RETRYABLE)|{'NO_READABLE_MATERIAL_EVIDENCE','NO_READABLE_SELF_EVIDENCE','MATERIAL_CONSENT_EXPIRED','MATERIAL_EXTRACTION_INVALID',
                'SAFETY_HOLD_MEDICAL','SAFETY_HOLD_CRISIS','PLAN_VERSION_UNSUPPORTED','REPORT_INPUT_BUDGET_EXCEEDED',
                'REPORT_EVIDENCE_BUDGET_EMPTY','CASE_TOKEN_BUDGET_EXHAUSTED','CASE_NO_LONGER_ACTIVE',
                'REPORT_REVIEW_INPUT_LIMIT','REPORT_REVIEW_NOT_CONFIGURED','LLM_INPUT_LIMIT',
                'LLM_AUTH_FAILED','LLM_BALANCE_INSUFFICIENT','LLM_ACCESS_DENIED','LLM_RATE_LIMITED','LLM_UPSTREAM_UNAVAILABLE','LLM_REQUEST_REJECTED'}
            code=str(error) if str(error) in safe_codes else 'ANALYSIS_PROVIDER_FAILED'
            state='SAFETY_HOLD' if code.startswith('SAFETY_HOLD') else 'FAILED'
            with self.db.connect() as c:
                current=c.execute('SELECT * FROM paid_cases WHERE id=?',(cid,)).fetchone()
                retry=bool(current and current['status']=='RUNNING' and current['order_status']=='PAID'
                    and current['expires_ms']>now_ms() and current['job_attempts']==attempt and current['job_attempts']<self.settings.max_attempts and code in RETRYABLE)
                feedback=getattr(error,'feedback',[{'code':code,'findingIndex':-1}])
                guidance=[]
                for note in getattr(error,'repair_notes',[]):
                    index=note['findingIndex'];claim=''
                    if isinstance(report,dict) and 0<=index<len(report.get('findings',[])):
                        claim=report['findings'][index].get('finding','')[:140]
                    guidance.append({**note,'rejectedClaim':claim})
                c.execute("UPDATE paid_cases SET status=?,error_code=?,retry_feedback_json=?,retry_guidance_json=?,updated_ms=? WHERE id=? AND status='RUNNING' AND job_attempts=?",
                    ('QUEUED' if retry else state,None if retry else code,encode(feedback),encode(guidance) if guidance else None,now_ms(),cid,attempt))
        finally:
            ACTIVE_BUDGET.reset(budget_token)
        return True

    def delete_case(self,user_id,cid):
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            row=c.execute('SELECT * FROM paid_cases WHERE id=? AND user_id=?',(cid,user_id)).fetchone()
            if not row:
                raise ApiError(404,'CASE_NOT_FOUND','分析记录不存在或已删除')
            materials=[dict(m) for m in c.execute('SELECT * FROM paid_materials WHERE case_id=?',(cid,))]
            # Revoke first; workers cannot publish after deletion. Financial receipt stays separate.
            c.execute("UPDATE paid_cases SET status='DELETED',snapshot_json='{}',report_json=NULL,ledger_json=NULL,usage_json=NULL,payment_params_json=NULL,retry_guidance_json=NULL,updated_ms=? WHERE id=?",(now_ms(),cid))
            c.executemany('INSERT OR IGNORE INTO paid_deletions(object_key) VALUES(?)',[(m['object_key'],) for m in materials])
            c.execute('DELETE FROM paid_materials WHERE case_id=?',(cid,))
        self.purge_objects()
        pending=any(self.object_path(m['object_key']).exists() for m in materials)
        return {'deleted':not pending,'accessRevoked':True,'receipt':digest({'caseId':cid,'deletedAt':now_ms()}),'paymentRefunded':False}

    def require_current_contract(self,row):
        if json.loads(row['snapshot_json']).get('analysisContractHash')!=digest(plan_for(row['plan_id'])):
            raise ApiError(409,'PLAN_VERSION_UNSUPPORTED','该订单使用旧分析合同，请联系售后使用原版本交付')

    def delete_user_data(self,user_id):
        # The UI list is paginated; account erasure must cover every case.
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            c.execute('INSERT OR IGNORE INTO paid_deletions(object_key) SELECT object_key FROM paid_materials WHERE case_id IN (SELECT id FROM paid_cases WHERE user_id=?)',(user_id,))
            c.execute("UPDATE paid_cases SET status='DELETED',snapshot_json='{}',report_json=NULL,ledger_json=NULL,usage_json=NULL,payment_params_json=NULL,retry_guidance_json=NULL,updated_ms=? WHERE user_id=?",(now_ms(),user_id))
            c.execute('DELETE FROM paid_materials WHERE case_id IN (SELECT id FROM paid_cases WHERE user_id=?)',(user_id,))
        self.purge_objects()

    def purge_objects(self):
        with self.db.connect() as c:
            keys=[r[0] for r in c.execute('SELECT object_key FROM paid_deletions')]
        for key in keys:
            try:
                self.object_path(key).unlink(missing_ok=True)
                with self.db.connect() as c:c.execute('DELETE FROM paid_deletions WHERE object_key=?',(key,))
            except OSError:
                continue

    def purge_expired(self):
        self.purge_objects()
        with self.db.connect() as c:
            rows=c.execute("SELECT id,user_id FROM paid_cases WHERE expires_ms<? AND status!='DELETED'",(now_ms(),)).fetchall()
        for row in rows:
            self.delete_case(row['user_id'],row['id'])

    def close(self):
        for p in (self.llm,self.payment,self.identity):
            if hasattr(p,'client'):
                p.client.close()
