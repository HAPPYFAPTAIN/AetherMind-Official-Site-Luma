"""Versioned private bank, atomic challenge credits and frozen answer evidence."""
from __future__ import annotations
import copy
import hashlib
import hmac
import json
import os
import random
import re
import secrets
import time
import io
from pathlib import Path
from .errors import ApiError
from .v4_scoring import DIMENSIONS, score_form
from .v4_suffixes import present_result

PROTOCOL='assessment-v4'
ID_RE=re.compile(r'^[A-Za-z0-9_.:-]{8,100}$')
ICE_POSITIONS=(1,2,8,14,20,24)

def encode(value): return json.dumps(value,ensure_ascii=False,sort_keys=True,separators=(',',':'))
def fail(code,message,status=400): raise ApiError(status,code,message)
def now_ms(): return int(time.time()*1000)

class V4QuestionBankService:
    def __init__(self,db,path=None,*,allow_draft_trials=None,simulate_rewards=None,clock=None):
        self.db=db; self.clock=clock or now_ms
        # The submitted V3.2 workbook is still marked draft. Keep the local
        # experience usable in a clearly labelled trial mode; production can
        # disable it with LLMER_V4_DRAFT_TRIALS=false until editorial review.
        self.allow_draft_trials=allow_draft_trials if allow_draft_trials is not None else os.getenv('LLMER_V4_DRAFT_TRIALS','true')=='true'
        self.simulate_rewards=simulate_rewards if simulate_rewards is not None else os.getenv('LLMER_V4_REWARD_SIMULATION','true')=='true'
        self.ad_unit=os.getenv('LLMER_V4_AD_UNIT_ID','')
        self.reward_secret=os.getenv('LLMER_V4_REWARD_CALLBACK_SECRET','')
        self.path=path or Path(__file__).parent/'data/v4-question-bank.json'
        self.payload=json.loads(self.path.read_text(encoding='utf-8'))
        self.by_id={q['id']:q for group in ('ability','style','source','dialogue','icebreakers','exam') for q in self.payload[group]}
        if len(self.by_id)!=sum(len(self.payload[g]) for g in ('ability','style','source','dialogue','icebreakers','exam')): raise ValueError('duplicate bank IDs')
        with db.connect() as c:
            c.executescript('''
            CREATE TABLE IF NOT EXISTS v4_forms(
                id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                request_id TEXT NOT NULL,mode TEXT NOT NULL,private_json TEXT NOT NULL,created_ms INTEGER NOT NULL,
                result_json TEXT,answers_hash TEXT,UNIQUE(user_id,request_id));
            CREATE TABLE IF NOT EXISTS v4_rewards(
                id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                request_id TEXT NOT NULL,source TEXT NOT NULL,simulation INTEGER NOT NULL,created_ms INTEGER NOT NULL,
                expires_ms INTEGER NOT NULL,verified_ms INTEGER,receipt TEXT UNIQUE,UNIQUE(user_id,request_id));
            CREATE TABLE IF NOT EXISTS v4_answer_events(
                id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                form_id TEXT NOT NULL REFERENCES v4_forms(id) ON DELETE CASCADE,question_id TEXT NOT NULL,
                choice TEXT NOT NULL,active_ms INTEGER NOT NULL,hidden INTEGER NOT NULL,received_ms INTEGER NOT NULL);
            CREATE TABLE IF NOT EXISTS v4_first_evidence(
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,family_id TEXT NOT NULL,
                event_id TEXT NOT NULL REFERENCES v4_answer_events(id),question_json TEXT NOT NULL,correct INTEGER NOT NULL,
                PRIMARY KEY(user_id,family_id));
            CREATE TABLE IF NOT EXISTS v4_profiles(
                user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,style_json TEXT NOT NULL DEFAULT '{}',
                wear_json TEXT NOT NULL DEFAULT '{}');
            CREATE TABLE IF NOT EXISTS v4_reviews(question_id TEXT PRIMARY KEY,override_json TEXT NOT NULL,reviewer TEXT NOT NULL,updated_ms INTEGER NOT NULL);
            CREATE TABLE IF NOT EXISTS v4_suffix_grants(
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,suffix TEXT NOT NULL,level INTEGER NOT NULL,
                evidence_json TEXT NOT NULL,granted_ms INTEGER NOT NULL,status TEXT NOT NULL,rule_version TEXT NOT NULL,
                PRIMARY KEY(user_id,suffix,level));
            CREATE TABLE IF NOT EXISTS v4_aux_runs(
                id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                request_id TEXT NOT NULL,kind TEXT NOT NULL,payload_json TEXT NOT NULL,result_json TEXT,UNIQUE(user_id,request_id));
            CREATE TABLE IF NOT EXISTS v4_imports(id TEXT PRIMARY KEY,payload_json TEXT NOT NULL,created_ms INTEGER NOT NULL,active INTEGER NOT NULL DEFAULT 0);
            ''')

    def inventory(self):
        return {k:len(self.payload[k]) for k in ('ability','style','source','dialogue','icebreakers','exam')}

    def effective_bank(self,c):
        self.refresh_payload(c)
        reviews={r['question_id']:json.loads(r['override_json']) for r in c.execute('SELECT * FROM v4_reviews')}
        bank=copy.deepcopy(self.by_id)
        for row in self.payload.get('reviewOverrides',[]):
            if row.get('审核结论')=='通过':
                q=bank.get(row['ID']); dim=row.get('最终主维度'); level=row.get('最终难度')
                if q and dim in DIMENSIONS and type(level) is int and 1<=level<=4:
                    q.update(dimension=dim,primaryDimension=dim,difficulty=level,reviewStatus='approved',deploymentEligible=True)
        for qid,override in reviews.items():
            if qid in bank and override.get('_sourceHash')==hashlib.sha256(encode(self.by_id[qid]).encode()).hexdigest(): bank[qid].update(override)
        return bank

    def refresh_payload(self,c):
        row=c.execute('SELECT id,payload_json FROM v4_imports WHERE active=1 LIMIT 1').fetchone()
        if row and getattr(self,'active_import',None)!=row['id']:
            self.payload=json.loads(row['payload_json']);self.active_import=row['id']
            self.by_id={q['id']:q for group in ('ability','style','source','dialogue','icebreakers','exam') for q in self.payload[group]}

    def import_workbook(self,content,filename):
        from .v4_import import load_rows,load_exam_rows,normalize_humanbench,normalize_icebreaker,normalize_exam
        if len(content)>8*1024*1024: fail('V4_IMPORT_INVALID','工作簿最大8MB')
        import openpyxl
        try:
            book=openpyxl.load_workbook(io.BytesIO(content),read_only=True,data_only=True);names=book.sheetnames;book.close()
            with self.db.connect() as c:self.refresh_payload(c)
            payload=copy.deepcopy(self.payload)
            if 'HumanBench题库' in names:
                rows=[normalize_humanbench(row) for row in load_rows(io.BytesIO(content),'HumanBench题库')]
                payload['ability']=[q for q in rows if q['id'].startswith('NH-') and q['scored']]
                payload['style']=[q for q in rows if q['id'].startswith('NS-')]
                payload['dialogue']=[q for q in rows if q['sourceKind']=='对话题']
                selected={q['id'] for k in ('ability','style','dialogue') for q in payload[k]}
                payload['source']=[q for q in rows if q['id'] not in selected]
                payload['icebreakers']=[normalize_icebreaker(row) for row in load_rows(io.BytesIO(content),'破冰100题')]
                for name,key in [('48项后缀规则','suffixRules'),('审核台账','reviewOverrides')]:
                    if name in names:payload[key]=load_rows(io.BytesIO(content),name)
            elif '真题题库' in names:
                payload['exam']=[normalize_exam(row) for row in load_exam_rows(io.BytesIO(content)) if str(row.get('题目ID','')).startswith('QS-')]
            else: fail('V4_IMPORT_INVALID','需要HumanBench题库或真题题库工作表')
            items=[q for group in ('ability','style','source','dialogue','icebreakers','exam') for q in payload[group]]
            if not items or len(items)>2000 or len({q['id'] for q in items})!=len(items): fail('V4_IMPORT_INVALID','题目ID缺失、重复或数量超过2000')
            if any(not q.get('id') for q in items): fail('V4_IMPORT_INVALID','题目ID必须填写且版本内唯一')
            structured=[q for group in ('ability','style','dialogue','icebreakers','exam') for q in payload[group]]
            if any(not q.get('prompt') or not q.get('options') for q in structured): fail('V4_IMPORT_INVALID','可投放或练习题的题干和选项必须填写；来源待审记录可保留空字段')
            digest=hashlib.sha256(content).hexdigest()[:24];payload['version']='import-'+digest
            with self.db.connect() as c:c.execute('INSERT OR IGNORE INTO v4_imports VALUES(?,?,?,0)',(digest,encode(payload),self.clock()))
            return {'id':digest,'filename':filename,'counts':{k:len(payload[k]) for k in ('ability','style','source','dialogue','icebreakers','exam')},'active':False}
        except ApiError:raise
        except Exception as e:raise ApiError(400,'V4_IMPORT_INVALID','工作簿结构或JSON无效，请使用后台说明的格式') from e

    def activate_import(self,import_id):
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE');row=c.execute('SELECT * FROM v4_imports WHERE id=?',(import_id,)).fetchone()
            if not row:fail('V4_IMPORT_NOT_FOUND','导入版本不存在',404)
            # Validate blueprints before activation, without changing the current bank on failure.
            payload=json.loads(row['payload_json']);validator=copy.copy(self)
            validator.payload=payload;validator.by_id={q['id']:q for k in ('ability','style','source','dialogue','icebreakers','exam') for q in payload[k]}
            for mode in ('standard','challenge'):validator.compose(mode,validator.by_id)
            c.execute('UPDATE v4_imports SET active=0');c.execute('UPDATE v4_imports SET active=1 WHERE id=?',(import_id,))
        return {'active':True,'id':import_id}

    @staticmethod
    def public_question(q):
        from .v4_presentation import presentation
        return {key:q.get(key) for key in ('id','prompt','scene','dimension','difficulty','scored','type','responseKind')} | {
            'options':[{'id':o['id'],'label':o['label']} for o in q['options']], 'presentation':presentation(q)}

    def eligible(self,q):
        if not q.get('scored') or q.get('governanceRole')!='main_candidate': return False
        if q.get('dimension') not in DIMENSIONS or type(q.get('difficulty')) is not int or not 1<=q['difficulty']<=4: return False
        if q.get('reviewStatus') in ('rejected','retired','invalid'): return False
        # NH table assets duplicate all numbers in the prompt; no image is required.
        if not q.get('familyId') or not q.get('prompt') or (q.get('assetType') and not q['id'].startswith('NH-D-')): return False
        options=q.get('options',[])
        if len(options)!=4 or len({o['id'] for o in options})!=4: return False
        if sum(bool(o.get('correct') or o['id'] in q.get('correctOptionIds',[])) for o in options)!=1: return False
        return (q.get('reviewStatus')=='approved' and q.get('deploymentEligible')) or (self.allow_draft_trials and q['id'].startswith('NH-'))

    def compose(self,mode,bank,excluded_families=(),excluded_groups=(),rng=None):
        rng=rng or random.SystemRandom(); pool=[q for q in bank.values() if self.eligible(q)]
        slots=[]
        for d in DIMENSIONS:
            levels=[(1,),(2,),(3,4),(3,4)] if mode=='challenge' else [(1,),(2,)]+([(2,)] if d in 'RK' else [])
            slots.extend((d,lv) for lv in levels)
        candidates=[]
        for d,lv in slots:
            bucket=[q for q in pool if q['dimension']==d and q['difficulty'] in lv]; rng.shuffle(bucket); candidates.append(bucket)
        order=sorted(range(len(slots)),key=lambda i:len(candidates[i])); chosen={}; budget=[0]
        def search(n,families,groups):
            budget[0]+=1
            if budget[0]>40000: return False
            if n==len(order): return True
            slot=order[n]
            for q in candidates[slot]:
                family=q['familyId']; exposure=set(q.get('exposureExclusionGroups',[]))
                if family in families or groups & exposure: continue
                chosen[slot]=q
                if search(n+1,families|{family},groups|exposure): return True
            chosen.pop(slot,None); return False
        if not search(0,set(excluded_families),set(excluded_groups)):
            fail('V4_BANK_INCOMPLETE','已审核题库或独立题族不足，未消耗挑战次数。请联系管理员检查配额。',503)
        scored=[copy.deepcopy(chosen[i]) for i in range(len(slots))]; rng.shuffle(scored)
        if mode=='standard':
            ice=list(self.payload['icebreakers']); rng.shuffle(ice); categories=set(); selected=[]
            for q in ice:
                category=q.get('category')
                if category in categories: continue
                categories.add(category); selected.append(copy.deepcopy(q))
                if len(selected)==6: break
            if len(selected)!=6: fail('V4_BANK_INCOMPLETE','破冰类别不足',503)
            it=iter(scored); jt=iter(selected)
            questions=[next(jt) if i in ICE_POSITIONS else next(it) for i in range(1,25)]
        else: questions=scored
        for q in questions:
            if q.get('scored'): rng.shuffle(q['options'])
        return questions

    def _access(self,c,user):
        used=c.execute("SELECT count(*) FROM v4_forms WHERE user_id=? AND mode='challenge'",(user,)).fetchone()[0]
        bonuses=c.execute('SELECT count(*) FROM v4_rewards WHERE user_id=? AND verified_ms IS NOT NULL',(user,)).fetchone()[0]
        return {'freeRemaining':max(0,2-used),'bonusRemaining':max(0,bonuses-max(0,used-2)),
            'remaining':max(0,2+bonuses-used),'freeLimit':2,'used':used,'rewards':bonuses,
            'rewardSimulation':self.simulate_rewards,'adUnitId':self.ad_unit,
            'adAvailable':self.simulate_rewards or bool(self.ad_unit and self.reward_secret),
            'shareAvailable':self.simulate_rewards or bool(self.reward_secret),
            'shareUsed':bool(c.execute("SELECT 1 FROM v4_rewards WHERE user_id=? AND source='share' AND verified_ms IS NOT NULL",(user,)).fetchone()),
            'shareLimit':1,'adSeconds':15,'draftTrial':self.allow_draft_trials}

    def access(self,user):
        with self.db.connect() as c: return self._access(c,user)

    def issue_form(self,user,mode,request_id,refollow=None,include_dialogues=False):
        if mode not in ('standard','challenge') or not ID_RE.fullmatch(request_id or ''): fail('V4_REQUEST_INVALID','出题请求格式不正确')
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            old=c.execute('SELECT * FROM v4_forms WHERE user_id=? AND request_id=?',(user,request_id)).fetchone()
            if old:
                value=json.loads(old['private_json'])
                if old['mode']!=mode or value.get('recheckOf')!=refollow or bool(value.get('privateDialogues'))!=include_dialogues: fail('V4_REQUEST_CONFLICT','原请求属于另一题组',409)
                return self.public_form(value)
            if mode=='challenge' and self._access(c,user)['remaining']<=0: fail('V4_CHALLENGE_EXHAUSTED','免费挑战已用完，请获取一次挑战机会',409)
            families=set();groups=set()
            if refollow:
                prior=self._form(c,user,refollow)
                if mode!='challenge' or prior['mode']!='challenge' or not prior.get('result_json'): fail('V4_RECHECK_INVALID','需要一份已完成挑战作为复核来源')
                pf=json.loads(prior['private_json'])
                if self.clock()-pf['completedAt']<86400000: fail('V4_RECHECK_TOO_SOON','请在上一份挑战完成24小时后复核',409)
                families={q['familyId'] for q in pf['privateQuestions']};groups={g for q in pf['privateQuestions'] for g in q.get('exposureExclusionGroups',[])}
            bank=self.effective_bank(c); questions=self.compose(mode,bank,families,groups)
            version=self.payload['version']+'-'+hashlib.sha256(encode(bank).encode()).hexdigest()[:12]
            form={'protocol':PROTOCOL,'id':secrets.token_hex(16),'mode':mode,'bankVersion':version,
                'blueprintVersion':'blueprint-3.2','scoringVersion':'score-3.2.0','suffixVersion':'suffix-3.2',
                'privateQuestions':questions,'createdAt':self.clock(),'recheckOf':refollow,
                'reviewStatus':'approved' if all(q.get('reviewStatus')=='approved' for q in questions if q.get('scored')) else 'draft_trial'}
            if include_dialogues:
                from .v4_dialogue import create_state,valid_tree
                positions=[8,16] if mode=='standard' else [8,16,24]
                pool=[q for q in bank.values() if q.get('sourceKind')=='对话题' and q.get('reviewStatus') not in ('rejected','retired','invalid') and (self.allow_draft_trials or q.get('reviewStatus')=='approved') and valid_tree(q)]
                random.SystemRandom().shuffle(pool);chosen=[];families={q['familyId'] for q in questions};groups={g for q in questions for g in q.get('exposureExclusionGroups',[])}
                for q in pool:
                    if q['familyId'] in families or groups.intersection(q.get('exposureExclusionGroups',[])):continue
                    chosen.append(q);families.add(q['familyId']);groups.update(q.get('exposureExclusionGroups',[]))
                    if len(chosen)==len(positions):break
                if len(chosen)<len(positions):fail('DIALOGUE_BANK_INCOMPLETE','情境对话题暂不足，本次未消耗挑战次数',503)
                form['privateDialogues']=[create_state(q,'dialogue-'+str(i+1),after) for i,(q,after) in enumerate(zip(chosen,positions))]
                form['interactionVersion']='humanbench-dialogue-1'
                if any(q.get('reviewStatus')!='approved' for q in chosen):form['reviewStatus']='draft_trial'
            form['snapshotHash']=hashlib.sha256(encode(form).encode()).hexdigest()
            c.execute('INSERT INTO v4_forms(id,user_id,request_id,mode,private_json,created_ms) VALUES(?,?,?,?,?,?)',
                (form['id'],user,request_id,mode,encode(form),form['createdAt']))
            return self.public_form(form)

    def public_form(self,form):
        return {k:v for k,v in form.items() if k not in ('privateQuestions','privateDialogues','completedAt')} | {
            'questions':[self.public_question(q) for q in form['privateQuestions']],
            **({'dialogueStages':[{'id':s['id'],'after':s['after'],'completed':s['completed']} for s in form['privateDialogues']]} if 'privateDialogues' in form else {})}

    def form_dialogue(self,user,fid,sid,body=None):
        from .v4_dialogue import public_state,choose
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE');row=self._form(c,user,fid);form=json.loads(row['private_json'])
            stage=next((s for s in form.get('privateDialogues',[]) if s['id']==sid),None)
            if not stage:fail('DIALOGUE_NOT_FOUND','情境对话不存在',404)
            answered={r[0] for r in c.execute('SELECT question_id FROM v4_answer_events WHERE form_id=?',(fid,))}
            if not all(q['id'] in answered for q in form['privateQuestions'][:stage['after']]):fail('DIALOGUE_NOT_READY','请先完成当前小段的题目',409)
            if any(not s['completed'] for s in form['privateDialogues'] if s['after']<stage['after']):fail('DIALOGUE_NOT_READY','请先完成前一段对话',409)
            if body:
                if row['result_json']:fail('V4_ALREADY_SUBMITTED','报告已生成，对话已冻结',409)
                if choose(stage,body.get('node'),body.get('optionId'),body.get('revision')):
                    c.execute('UPDATE v4_forms SET private_json=? WHERE id=?',(encode(form),fid))
            return public_state(stage)

    @staticmethod
    def _form(c,user,form_id):
        row=c.execute('SELECT * FROM v4_forms WHERE id=? AND user_id=?',(form_id,user)).fetchone()
        if not row: fail('V4_FORM_NOT_FOUND','题组不存在或不属于当前账号',404)
        return dict(row)

    @staticmethod
    def _choice(q,choice):
        if choice=='uncertain' and q.get('scored'): return
        if not isinstance(choice,str) or not any(o['id']==choice for o in q['options']): fail('V4_OPTION_INVALID','答案选项与冻结题面不一致')

    def record_events(self,user,form_id,events):
        if not isinstance(events,list) or not 1<=len(events)<=160: fail('V4_EVENTS_INVALID','答题事件格式不正确')
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE'); row=self._form(c,user,form_id); form=json.loads(row['private_json'])
            questions={q['id']:q for q in form['privateQuestions']}
            for event in events:
                if not isinstance(event,dict) or not ID_RE.fullmatch(event.get('id','')): fail('V4_EVENT_INVALID','事件编号无效')
                q=questions.get(event.get('questionId')); choice=event.get('choice')
                if not q: fail('V4_EVENT_INVALID','题目不属于本次题组')
                self._choice(q,choice)
                active=event.get('activeMs',0); hidden=event.get('hidden',False)
                if type(active) is not int or not 0<=active<=86400000 or type(hidden) is not bool: fail('V4_EVENT_INVALID','活动时间无效')
                old=c.execute('SELECT * FROM v4_answer_events WHERE id=?',(event['id'],)).fetchone()
                if old:
                    if (old['user_id'],old['form_id'],old['question_id'],old['choice'])!=(user,form_id,q['id'],choice): fail('V4_EVENT_CONFLICT','事件编号重复但内容不同',409)
                    continue
                if row['result_json']: fail('V4_ALREADY_SUBMITTED','报告已生成，作答已冻结',409)
                c.execute('INSERT INTO v4_answer_events VALUES(?,?,?,?,?,?,?,?)',(event['id'],user,form_id,q['id'],choice,active,int(hidden),self.clock()))
                if q.get('scored'):
                    correct=any(o['id']==choice and (o.get('correct') or choice in q.get('correctOptionIds',[])) for o in q['options'])
                    c.execute('INSERT OR IGNORE INTO v4_first_evidence VALUES(?,?,?,?,?)',(user,q['familyId'],event['id'],encode(q),int(correct)))
        return {'saved':True,'formId':form_id}

    def save_result(self,user,form_id,answers):
        if not isinstance(answers,list): fail('V4_ANSWERS_INVALID','答案格式不正确')
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE'); row=self._form(c,user,form_id); form=json.loads(row['private_json'])
            if len(answers)!=len(form['privateQuestions']): fail('V4_INCOMPLETE','还有题目未作答')
            submitted={}
            for a in answers:
                if not isinstance(a,dict) or set(a)!={'questionId','optionId'} or a['questionId'] in submitted: fail('V4_ANSWERS_INVALID','答案重复或格式不正确')
                submitted[a['questionId']]=a['optionId']
            if set(submitted)!={q['id'] for q in form['privateQuestions']}: fail('V4_ANSWERS_INVALID','答案题目不匹配')
            digest=hashlib.sha256(encode(submitted).encode()).hexdigest()
            if row['result_json']:
                if digest!=row['answers_hash']: fail('V4_RESULT_FROZEN','报告已生成，不能替换已提交答案',409)
                return present_result(json.loads(row['result_json']))
            if any(not s['completed'] for s in form.get('privateDialogues',[])):
                fail('DIALOGUE_INCOMPLETE','还有情境对话未完成，请返回答题继续。',409)
            bank=self.effective_bank(c)
            if any(self.invalidated(q,bank) for q in form['privateQuestions'] if q.get('scored')):
                fail('V4_FORM_INVALIDATED','本卷有题目已被撤回，请补答同一配额的新题，不消耗挑战次数。',409)
            for q in form['privateQuestions']:
                choice=submitted[q['id']]; self._choice(q,choice)
                event=c.execute('SELECT * FROM v4_answer_events WHERE form_id=? AND question_id=? ORDER BY rowid DESC LIMIT 1',(form_id,q['id'])).fetchone()
                if not event or event['choice']!=choice: fail('V4_EVENTS_PENDING','作答进度尚未同步，请重试提交',409)
            form['completedAt']=self.clock()
            previous=[json.loads(r[0]) for r in c.execute('SELECT result_json FROM v4_forms WHERE user_id=? AND result_json IS NOT NULL',(user,))]
            result=score_form(form,submitted,previous)
            from .v4_dialogue import public_state
            result['dialogues']=[public_state(s) for s in form.get('privateDialogues',[])]
            c.execute('UPDATE v4_forms SET result_json=?,answers_hash=?,private_json=? WHERE id=?',(encode(result),digest,encode(form),form_id))
            from .v4_suffixes import update_suffixes
            result['suffixes']=update_suffixes(self,c,user,result)
            profile=c.execute('SELECT style_json FROM v4_profiles WHERE user_id=?',(user,)).fetchone()
            if profile:result['style']=json.loads(profile['style_json'])
            result=present_result(result)
            c.execute('UPDATE v4_forms SET result_json=? WHERE id=?',(encode(result),form_id))
            return result

    def history(self,user):
        with self.db.connect() as c:
            return {'items':[{'id':r['id'],'mode':r['mode'],'createdAt':r['created_ms'],'result':present_result(json.loads(r['result_json'])) if r['result_json'] else None}
                for r in c.execute('SELECT * FROM v4_forms WHERE user_id=? ORDER BY created_ms DESC LIMIT 50',(user,))]}

    def get_form(self,user,fid):
        with self.db.connect() as c:
            row=self._form(c,user,fid); form=json.loads(row['private_json'])
            ids={q['id'] for q in form['privateQuestions']}
            events=[{'id':e['id'],'questionId':e['question_id'],'choice':e['choice'],'activeMs':e['active_ms'],'hidden':bool(e['hidden'])}
                for e in c.execute('SELECT * FROM v4_answer_events WHERE user_id=? AND form_id=? ORDER BY rowid',(user,fid)) if e['question_id'] in ids]
            latest={e['questionId']:e['choice'] for e in events}
            return {'form':self.public_form(form),'result':present_result(json.loads(row['result_json'])) if row['result_json'] else None,
                'events':events,'answers':{str(i):latest[q['id']] for i,q in enumerate(form['privateQuestions']) if q['id'] in latest}}

    @staticmethod
    def invalidated(q,bank):
        current=bank.get(q['id'])
        return not current or current.get('reviewStatus') in ('rejected','retired','invalid') or current.get('correctOptionIds')!=q.get('correctOptionIds')

    def repair_form(self,user,fid):
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE');row=self._form(c,user,fid);form=json.loads(row['private_json'])
            if row['result_json']: fail('V4_RESULT_FROZEN','已生成的历史报告不可改写',409)
            bank=self.effective_bank(c); questions=form['privateQuestions']; changes=[]
            for i,q in enumerate(questions):
                if not q.get('scored') or not self.invalidated(q,bank): continue
                others=[item for j,item in enumerate(questions) if j!=i]
                families={item.get('familyId') for item in others}|{q['familyId']}
                groups={g for item in others for g in item.get('exposureExclusionGroups',[])}
                pool=[item for item in bank.values() if self.eligible(item) and item['dimension']==q['dimension'] and item['difficulty']==q['difficulty']
                    and item['familyId'] not in families and not groups.intersection(item.get('exposureExclusionGroups',[]))]
                if not pool: fail('V4_REPLACEMENT_UNAVAILABLE','同一维度与难度的替代题暂不足，进度和次数已保留。',503)
                replacement=copy.deepcopy(random.SystemRandom().choice(pool));random.SystemRandom().shuffle(replacement['options'])
                questions[i]=replacement;changes.append({'slot':i,'oldId':q['id'],'newId':replacement['id'],'reason':'editorial_invalidation','at':self.clock()})
            if changes:
                form.setdefault('replacements',[]).extend(changes)
                form['snapshotHash']=hashlib.sha256(encode(questions).encode()).hexdigest()
                c.execute('UPDATE v4_forms SET private_json=? WHERE id=?',(encode(form),fid))
        return self.get_form(user,fid)

    def create_reward(self,user,source,request_id):
        if source not in ('ad','share') or not ID_RE.fullmatch(request_id or ''): fail('V4_REWARD_INVALID','奖励请求无效')
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            old=c.execute('SELECT * FROM v4_rewards WHERE user_id=? AND request_id=?',(user,request_id)).fetchone()
            if old:
                if old['source']!=source: fail('V4_REWARD_CONFLICT','奖励请求来源不同',409)
                return self.reward_public(old)
            quota=self._access(c,user)
            if source=='share' and quota['shareUsed']: fail('V4_SHARE_USED','本账号的朋友圈分享奖励已领取',409)
            if not quota[source+'Available']: fail('V4_REWARD_NOT_CONFIGURED','奖励接口尚未配置，请稍后再试',503)
            # Single pending intent prevents rapid taps from producing multiple grants.
            old=c.execute('SELECT * FROM v4_rewards WHERE user_id=? AND source=? AND verified_ms IS NULL AND expires_ms>?',(user,source,self.clock())).fetchone()
            if old: return self.reward_public(old)
            rid=secrets.token_hex(16); now=self.clock()
            c.execute('INSERT INTO v4_rewards VALUES(?,?,?,?,?,?,?,?,?)',(rid,user,request_id,source,int(self.simulate_rewards),now,now+600000,None,None))
            return self.reward_public(c.execute('SELECT * FROM v4_rewards WHERE id=?',(rid,)).fetchone())

    @staticmethod
    def reward_public(row):
        return {'id':row['id'],'source':row['source'],'simulation':bool(row['simulation']),
            'granted':row['verified_ms'] is not None,'minimumSeconds':15 if row['source']=='ad' else 0}

    def reward_status(self,user,rid,simulate=False):
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE'); row=c.execute('SELECT * FROM v4_rewards WHERE id=? AND user_id=?',(rid,user)).fetchone()
            if not row: fail('V4_REWARD_NOT_FOUND','奖励任务不存在',404)
            if simulate and not row['verified_ms']:
                if not self.simulate_rewards or not row['simulation']: fail('V4_REWARD_UNVERIFIED','尚未收到平台核验',409)
                if self.clock()>row['expires_ms']: fail('V4_REWARD_EXPIRED','奖励任务已过期，请重试',409)
                if row['source']=='ad' and self.clock()-row['created_ms']<15000: fail('V4_REWARD_INCOMPLETE','请完整观看15秒模拟广告',409)
                self._grant(c,row,'simulation:'+rid)
            latest=c.execute('SELECT * FROM v4_rewards WHERE id=?',(rid,)).fetchone()
            return self.reward_public(latest)|{'quota':self._access(c,user)}

    def _grant(self,c,row,receipt):
        if row['verified_ms'] is not None: return
        if row['source']=='share' and c.execute("SELECT 1 FROM v4_rewards WHERE user_id=? AND source='share' AND verified_ms IS NOT NULL",(row['user_id'],)).fetchone(): fail('V4_SHARE_USED','朋友圈奖励已经领取',409)
        c.execute('UPDATE v4_rewards SET verified_ms=?,receipt=? WHERE id=?',(self.clock(),receipt,row['id']))

    def verify_reward(self,rid,receipt,signature):
        # The configured provider adapter must authenticate the platform receipt
        # before signing this internal callback. No client flag grants credits.
        if not self.reward_secret or not isinstance(receipt,str) or not 8<=len(receipt)<=200: fail('V4_REWARD_UNVERIFIED','奖励凭据无效',403)
        expected=hmac.new(self.reward_secret.encode(),f'{rid}:{receipt}'.encode(),hashlib.sha256).hexdigest()
        if not hmac.compare_digest(expected,signature): fail('V4_REWARD_UNVERIFIED','奖励签名无效',403)
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE'); row=c.execute('SELECT * FROM v4_rewards WHERE id=?',(rid,)).fetchone()
            if not row or row['simulation'] or self.clock()>row['expires_ms']: fail('V4_REWARD_EXPIRED','奖励任务无效',409)
            dup=c.execute('SELECT id FROM v4_rewards WHERE receipt=?',(receipt,)).fetchone()
            if dup and dup['id']!=rid: fail('V4_REWARD_CONFLICT','奖励凭据已使用',409)
            self._grant(c,row,receipt)
        return {'saved':True}

    def set_review(self,qid,patch,author):
        with self.db.connect() as c:self.refresh_payload(c)
        q=self.by_id.get(qid)
        if not q: fail('V4_QUESTION_NOT_FOUND','题目不存在',404)
        if patch.get('reviewStatus') not in ('approved','rejected','pending'): fail('V4_REVIEW_INVALID','审核状态无效')
        allowed={'reviewStatus','dimension','difficulty','correctOptionIds','note','deploymentEligible'}
        if set(patch)-allowed: fail('V4_REVIEW_INVALID','审核字段无效')
        if patch['reviewStatus']=='approved':
            if not patch.get('note') or patch.get('dimension') not in DIMENSIONS or type(patch.get('difficulty')) is not int or not 1<=patch['difficulty']<=4: fail('V4_REVIEW_INVALID','请填写审核意见、维度和难度')
            correct=patch.get('correctOptionIds',q.get('correctOptionIds'))
            if not isinstance(correct,list) or len(correct)!=1 or correct[0] not in {o['id'] for o in q['options']}: fail('V4_REVIEW_INVALID','请确认唯一正确答案')
            patch={**patch,'correctOptionIds':correct,'options':[{**o,'correct':o['id'] in correct} for o in q['options']], 'deploymentEligible':True,'reviewer':author}
        else: patch={**patch,'deploymentEligible':False}
        patch['_sourceHash']=hashlib.sha256(encode(q).encode()).hexdigest()
        with self.db.connect() as c:
            c.execute('INSERT INTO v4_reviews VALUES(?,?,?,?) ON CONFLICT(question_id) DO UPDATE SET override_json=excluded.override_json,reviewer=excluded.reviewer,updated_ms=excluded.updated_ms',(qid,encode(patch),author,self.clock()))
            if patch['reviewStatus']!='approved' or patch.get('correctOptionIds',q.get('correctOptionIds'))!=q.get('correctOptionIds'):
                affected={r[0] for r in c.execute('SELECT event_id FROM v4_first_evidence WHERE json_extract(question_json,\'$.id\')=?',(qid,))}
                for grant in c.execute("SELECT * FROM v4_suffix_grants WHERE status='active'").fetchall():
                    if affected.intersection(json.loads(grant['evidence_json'])):
                        c.execute("UPDATE v4_suffix_grants SET status='revoked' WHERE user_id=? AND suffix=? AND level=?",(grant['user_id'],grant['suffix'],grant['level']))
        return {'saved':True,'questionId':qid}

    def aux_start(self,user,kind,request_id,question_id=None):
        if kind not in ('style','exam','dialogue') or not ID_RE.fullmatch(request_id or ''): fail('V4_AUX_INVALID','体验请求无效')
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE')
            self.refresh_payload(c)
            old=c.execute('SELECT * FROM v4_aux_runs WHERE user_id=? AND request_id=?',(user,request_id)).fetchone()
            if old:
                if old['kind']!=kind: fail('V4_REQUEST_CONFLICT','请求编号已使用',409)
                return self.aux_public(json.loads(old['payload_json']))
            rid=secrets.token_hex(16)
            if kind=='dialogue':
                pool=self.payload['dialogue']
                q=next((q for q in pool if q['id']==question_id),None) if question_id else random.SystemRandom().choice(pool)
                if not q: fail('V4_QUESTION_NOT_FOUND','对话题不存在',404)
                payload={'id':rid,'kind':kind,'question':copy.deepcopy(q),'node':'root','messages':[{'side':'peer','text':q['prompt']}],
                         'completed':False,'choices':[]}
            else:
                effective=self.effective_bank(c)
                questions=copy.deepcopy([effective[q['id']] for q in self.payload['style']] if kind=='style' else random.SystemRandom().sample(self.payload['exam'],10))
                payload={'id':rid,'kind':kind,'questions':questions}
            c.execute('INSERT INTO v4_aux_runs VALUES(?,?,?,?,?,NULL)',(rid,user,request_id,kind,encode(payload)))
            return self.aux_public(payload)

    def _dialogue_options(self,p):
        if p['completed']: return []
        q=p['question']
        return q['rawOptions'] if p['node']=='root' else q.get('dialogueNodes',{}).get(p['node'],[])

    def aux_public(self,p):
        if p['kind']=='dialogue':
            return {k:p[k] for k in ('id','kind','node','messages','completed')} | {'title':p['question']['scene'],
                'options':[{'id':str(i),'label':o.get('t','')} for i,o in enumerate(self._dialogue_options(p))],
                'ending':p.get('ending'),'scored':False}
        return {'id':p['id'],'kind':p['kind'],'questions':[self.public_question(q) for q in p['questions']],'scored':False}

    def aux_answer(self,user,rid,body):
        with self.db.connect() as c:
            c.execute('BEGIN IMMEDIATE'); row=c.execute('SELECT * FROM v4_aux_runs WHERE id=? AND user_id=?',(rid,user)).fetchone()
            if not row: fail('V4_AUX_NOT_FOUND','体验不存在',404)
            p=json.loads(row['payload_json'])
            if p['kind']=='dialogue':
                node=body.get('node'); choice=body.get('optionId')
                if p['choices'] and p['choices'][-1]=={'node':node,'optionId':choice}: return self.aux_public(p)
                if p['completed'] or node!=p['node'] or not isinstance(choice,str) or not choice.isdigit(): fail('V4_DIALOGUE_STALE','对话已更新，请重试',409)
                options=self._dialogue_options(p)
                if int(choice)>=len(options): fail('V4_OPTION_INVALID','对话选项无效')
                option=options[int(choice)]; p['choices'].append({'node':node,'optionId':choice})
                p['messages'].append({'side':'self','text':option['t']})
                if option.get('reply'): p['messages'].append({'side':'peer','text':option['reply']})
                go=option.get('go')
                if go and go not in p['question'].get('dialogueNodes',{}): fail('V4_DIALOGUE_BROKEN','对话分支不完整，请换一题',503)
                if go and len(p['choices'])<20: p['node']=go
                else: p['completed']=True; p['ending']=option.get('end') or {'title':'对话结束','text':'本次体验不计能力分。'}
                c.execute('UPDATE v4_aux_runs SET payload_json=? WHERE id=?',(encode(p),rid))
                return self.aux_public(p)
            answers=body.get('answers')
            if not isinstance(answers,list) or len(answers)!=len(p['questions']): fail('V4_INCOMPLETE','请完成所有选择')
            mapping={a.get('questionId'):a.get('optionId') for a in answers if isinstance(a,dict)}
            if len(mapping)!=len(answers) or set(mapping)!={q['id'] for q in p['questions']}: fail('V4_ANSWERS_INVALID','答案不匹配')
            for q in p['questions']:
                if mapping[q['id']]!='uncertain': self._choice(q,mapping[q['id']])
            if row['result_json']:
                saved=json.loads(row['result_json'])
                if saved['answers']!=mapping: fail('V4_RESULT_FROZEN','结果已冻结',409)
                return saved['result']
            if p['kind']=='style':
                from .v4_suffixes import style_result
                result=style_result(p['questions'],mapping)
                c.execute('INSERT INTO v4_profiles(user_id,style_json) VALUES(?,?) ON CONFLICT(user_id) DO UPDATE SET style_json=excluded.style_json',(user,encode(result)))
            else:
                result={'kind':'exam','scored':False,'items':[{'prompt':q['prompt'],'choice':next((o['label'] for o in q['options'] if o['id']==mapping[q['id']]),'暂不确定'),
                    'correct':mapping[q['id']]==q['correctOptionId'],'correctAnswer':next(o['label'] for o in q['options'] if o['id']==q['correctOptionId']),
                    'explanation':q['explanation'],'source':q['source']} for q in p['questions']]}
            c.execute('UPDATE v4_aux_runs SET result_json=? WHERE id=?',(encode({'answers':mapping,'result':result}),rid))
            return result

    def profile(self,user,wear=None):
        with self.db.connect() as c:
            updated_result=None
            if wear is not None:
                c.execute('BEGIN IMMEDIATE')
                wear=dict(wear);form_id=wear.pop('formId',None)
                target=self._form(c,user,form_id) if form_id else None
                if target and not target['result_json']:fail('V4_WEAR_LOCKED','请先完成这份测评',409)
                allowed={'format','precision','pinned'}
                if set(wear)-allowed or wear.get('format') not in ('GGUF','MLX',None) or wear.get('precision') not in ('Q4_K_M','Q8_0','BF16',None): fail('V4_WEAR_INVALID','外观选择无效')
                if not c.execute('SELECT 1 FROM v4_forms WHERE user_id=? AND result_json IS NOT NULL',(user,)).fetchone(): fail('V4_WEAR_LOCKED','完成一次测评后开放外观',409)
                pinned=wear.get('pinned',[])
                from .v4_suffixes import ABILITY_IDS
                earned={r[0] for r in c.execute("SELECT suffix FROM v4_suffix_grants WHERE user_id=? AND status='active'",(user,)) if r[0] in ABILITY_IDS}
                if not isinstance(pinned,list) or len(pinned)>3 or any(s not in earned for s in pinned): fail('V4_WEAR_INVALID','只能置顶已获得的能力后缀')
                c.execute('INSERT INTO v4_profiles(user_id,wear_json) VALUES(?,?) ON CONFLICT(user_id) DO UPDATE SET wear_json=excluded.wear_json',(user,encode(wear)))
                if target:
                    updated_result=present_result(json.loads(target['result_json']))
                    updated_result['suffixes']['appearance']['selected']={k:wear.get(k) for k in ('format','precision') if wear.get(k)}
                    updated_result=present_result(updated_result)
                    c.execute('UPDATE v4_forms SET result_json=? WHERE id=?',(encode(updated_result),form_id))
            row=c.execute('SELECT * FROM v4_profiles WHERE user_id=?',(user,)).fetchone()
            grants=[dict(r) for r in c.execute("SELECT suffix,level,evidence_json,granted_ms,status FROM v4_suffix_grants WHERE user_id=? ORDER BY level DESC",(user,))]
            latest_result=c.execute('SELECT result_json FROM v4_forms WHERE user_id=? AND result_json IS NOT NULL ORDER BY created_ms DESC LIMIT 1',(user,)).fetchone()
            pending=json.loads(latest_result['result_json']).get('suffixes',{}).get('pending',[]) if latest_result else []
        return {'style':json.loads(row['style_json']) if row else {},'wear':json.loads(row['wear_json']) if row else {},
            'grants':grants,'pending':pending,'result':updated_result,'rules':[{k:r[k] for k in ('后缀','含义','类别','获取条件','状态')} for r in self.payload['suffixRules']]}
