"""Evidence-backed suffix grants; draft trial records never certify abilities."""
import json
import re
import copy
from .v4_parameters import parameter_fields, challenge_parameter_label

RULES={
 'Instruct':(12,.90,{'A':4,'C':4},3),'Thinking':(12,.85,{'R':3,'G':3,'K':3},0),
 'Calibrated':(12,.90,{},0),'ContextKeeper':(12,.85,{},3),'Logic':(12,.85,{},3),
 'Analyst':(12,.85,{},3),'Transfer':(12,.85,{},3),'Math':(12,.85,{},3),'ToolSense':(12,.85,{},3),
 'ExactFormat':(8,.875,{},3),'ScopeGuard':(12,.90,{'C':2,'A':2,'X':2},0),
 'PatchSafe':(8,.875,{'C':3,'A':2,'X':1},0),'UnitWise':(8,.875,{},3),
 'Denominator':(8,.875,{'D':3,'W':2},0),'EvidenceFirst':(12,.90,{'K':6,'X':2},0),
 'TrapResistant':(12,.90,{'K':3},0)}
STYLE_PAIRS={'detail':('Concise','Verbose'),'exploration':('Steady','Explorer'),
             'warmth':('Direct','Warm'),'initiative':('Responsive','Proactive')}
ABILITY_IDS=['Instruct','Thinking','Calibrated','ContextKeeper','Logic','Analyst','Transfer','Math','ToolSense','ExactFormat','ScopeGuard','PatchSafe','UnitWise','Denominator','EvidenceFirst','TrapResistant']
STYLE_IDS=['Concise','Verbose','Steady','Explorer','Direct','Warm','Responsive','Proactive']
ACHIEVEMENT_IDS=['WarmStart','PerfectRun','Chain20','SteadyScore','MoE','FeedbackLoop','Seed42']
SPECIALIST_IDS=['Flash','Turbo','LongContext','Coder','ToolUse','Vision','Polyglot','Distill','LoRA','Reranker','Chat','Agent']
SUFFIX_MEANINGS={
 'Instruct':'指令遵循','Thinking':'复杂题推理','Calibrated':'证据校准','ContextKeeper':'上下文追踪','Logic':'逻辑判断','Analyst':'数据分析','Transfer':'规则迁移','Math':'题内数理','ToolSense':'工具决策','ExactFormat':'格式准确','ScopeGuard':'范围守卫','PatchSafe':'局部更新','UnitWise':'单位与比例','Denominator':'分母意识','EvidenceFirst':'证据优先','TrapResistant':'抗陷阱',
 'Concise':'简洁偏好','Verbose':'详细偏好','Steady':'稳妥偏好','Explorer':'探索偏好','Direct':'直接表达','Warm':'温暖表达','Responsive':'响应偏好','Proactive':'主动偏好',
 'WarmStart':'完成开场','PerfectRun':'全对一局','Chain20':'二十连对','SteadyScore':'稳定发挥','MoE':'跨域切换','FeedbackLoop':'反馈迁移','Seed42':'有效推理',
 'Flash':'极速准确','Turbo':'快速准确','LongContext':'长文整合','Coder':'代码解题','ToolUse':'工具实操','Vision':'视觉理解','Polyglot':'跨语切换','Distill':'信息蒸馏','LoRA':'少例适配','Reranker':'相关性排序','Chat':'多轮对话','Agent':'多步执行'}
def suffix_category(name):
    if name in ABILITY_IDS:return 'ability'
    if name in STYLE_IDS:return 'style'
    if name in ACHIEVEMENT_IDS:return 'achievement'
    if name in SPECIALIST_IDS:return 'specialist'
    return 'unknown'

def range_token(result):
    raw=str(result.get('parameterTier') or '')
    m=re.fullmatch(r'([\[(])([\d.]+),([\d.]+)([\]\)])([BT])',raw)
    return f'{m.group(1)}{m.group(2)}–{m.group(3)}{m.group(5)}]' if m else raw or '未知区间'

def model_full_name(result,include_appearance=True,short=False):
    entries={}
    for item in result.get('suffixes',{}).get('earned',[]):
        name=item.get('id') or item.get('suffix')
        if suffix_category(name)=='unknown' or item.get('status','active')!='active':continue
        if (result.get('reviewStatus')=='draft_trial' or result.get('suffixes',{}).get('trial')) and suffix_category(name)!='style' and item.get('reviewStatus')!='approved':continue
        if name not in entries or int(item.get('level') or 0)>int(entries[name].get('level') or 0):entries[name]=item
    order=ABILITY_IDS+STYLE_IDS+ACHIEVEMENT_IDS+SPECIALIST_IDS;tokens=[]
    for pair in STYLE_PAIRS.values():
        if all(name in entries for name in pair):
            for name in pair:entries.pop(name)
    if 'Flash' in entries:entries.pop('Turbo',None)
    if short:
        order=[n for n in ABILITY_IDS if n in entries][:3]+[n for n in STYLE_IDS if n in entries][:1]+[n for n in ACHIEVEMENT_IDS if n in entries][:1]
    for name in order:
        item=entries.get(name)
        if not item:continue
        level=int(item.get('level') or 0)
        tokens.append(name if suffix_category(name) in ('style','achievement') or not level else f'{name}-{("","I","II","III")[level] if level<4 else level}')
    full='Human-'+(challenge_parameter_label(result) if result.get('mode')=='challenge' else range_token(result))
    if tokens:full+='-'+'-'.join(tokens)
    appearance=result.get('suffixes',{}).get('appearance',{}).get('selected') or result.get('appearance') or {}
    fmt=appearance.get('format') if appearance.get('format') in ('GGUF','MLX') else ''
    precision=appearance.get('precision') if appearance.get('precision') in ('Q4_K_M','Q8_0','BF16') else ''
    if include_appearance and (fmt or precision):full+='@'+fmt+(f'.{precision}' if precision else '')
    return full

def suffix_entry(name,level,status='active',evidence_ids=(),basis=''):
    return {'id':name,'suffix':name,'category':suffix_category(name),'label':SUFFIX_MEANINGS.get(name,name),'level':level,'levelText':(['','I','II','III'][level] if isinstance(level,int) and level<4 else ''),'status':status,'evidenceIds':list(evidence_ids),'evidenceCount':len(evidence_ids),'basis':basis}

def present_result(result):
    """Read-only compatibility for frozen reports; never grant, recalculate or write."""
    if result is None:return None
    value=copy.deepcopy(result);value.update(parameter_fields(value));suffixes=value.setdefault('suffixes',{})
    draft=value.get('reviewStatus')=='draft_trial' or suffixes.get('trial') is True
    suffixes['trial']=draft
    suffixes['note']='试测记录，后缀待审核' if draft else '本次任务记录'
    suffixes.setdefault('appearance',{'available':True,'options':{'format':['GGUF','MLX'],'precision':['Q4_K_M','Q8_0','BF16']},'selected':{}})
    earned=[];pending=list(suffixes.get('pending',[]))
    for entry in suffixes.get('earned',[]):
        item=copy.deepcopy(entry);name=item.get('id') or item.get('suffix');category=suffix_category(name)
        if category=='unknown':continue
        item.update(id=name,category=category,label=SUFFIX_MEANINGS[name])
        if draft and category!='style' and item.get('reviewStatus')!='approved':
            item.update(status='pending_review',basis='该记录使用未审核题目，不能作为正式后缀证据');pending.append(item)
        else:earned.append(item)
    if draft:
        wanted=ABILITY_IDS+(['WarmStart'] if value.get('mode')=='standard' else [])
        for name in wanted:
            if not any(e['id']==name for e in earned) and not any(e.get('id')==name for e in pending):
                pending.append(suffix_entry(name,0,'pending_review',(),'题目尚待审核，完成记录已保留'))
    suffixes['earned']=earned;suffixes['pending']=pending
    suffixes['categories']={category:[e for e in earned if e['category']==category] for category in ('ability','style','achievement','specialist')}
    value['fullName']=model_full_name(value);value['shortName']=model_full_name(value,False,True)
    suffixes['fullName']=value['fullName']
    return value

def update_suffixes(service,c,user,result):
    records=[]; used_groups=set()
    bank=service.effective_bank(c)
    rows=c.execute('''SELECT e.*,f.question_json,f.correct FROM v4_first_evidence f
        JOIN v4_answer_events e ON e.id=f.event_id JOIN v4_forms g ON g.id=e.form_id
        WHERE f.user_id=? AND g.result_json IS NOT NULL AND e.received_ms>=? ORDER BY e.received_ms,e.rowid''',
        (user,service.clock()-90*86400000))
    for row in rows:
        q=json.loads(row['question_json']); groups=set(q.get('exposureExclusionGroups',[]))
        if q.get('reviewStatus')!='approved' or not q.get('deploymentEligible') or service.invalidated(q,bank) or groups & used_groups: continue
        used_groups|=groups; records.append({'event':dict(row),'q':q,'correct':bool(row['correct'])})
    def grant(suffix,level,evidence):
        c.execute('INSERT OR IGNORE INTO v4_suffix_grants VALUES(?,?,?,?,?,?,?)',
            (user,suffix,level,json.dumps(evidence,ensure_ascii=False),service.clock(),'active','suffix-3.2'))
    for rule in service.payload.get('suffixRules',[]):
        name=rule['后缀']
        if name not in RULES: continue
        ids=set(json.loads(rule.get('候选题ID') or '[]')); n,rate,coverage,facets=RULES[name]
        candidates=[r for r in records if r['q']['id'] in ids]
        for level,multiple in ((1,1),(2,2),(3,4)):
            # Fixed earliest window: wrong answers cannot be discarded to cherry-pick a badge.
            chosen=candidates[:n*multiple]
            if len(chosen)<n*multiple or sum(r['correct'] for r in chosen)/len(chosen)<rate: continue
            if any(sum(r['q'].get('dimension')==d for r in chosen)<minimum for d,minimum in coverage.items()): continue
            if len({r['q'].get('facet') for r in chosen})<facets: continue
            if name=='Thinking' and any(r['q']['difficulty']<3 for r in chosen): continue
            if name=='Calibrated':
                sufficient=sum('sufficient' in r['q'].get('rawMetadata',{}).get('suffixEvidenceTags',[]) for r in chosen)
                insufficient=sum('insufficient' in r['q'].get('rawMetadata',{}).get('suffixEvidenceTags',[]) for r in chosen)
                if sufficient<2 or insufficient<4: continue
            if name=='TrapResistant' and len({r['q']['dimension'] for r in chosen})<4: continue
            grant(name,level,[r['event']['id'] for r in chosen])
    if result['reviewStatus']=='approved':
        if result['mode']=='standard' and result['scoredChoiceCount']==18: grant('WarmStart',1,[result['formId']])
        current=[r for r in records if r['event']['form_id']==result['formId']]
        if result['mode']=='challenge' and len(current)==32 and all(r['correct'] for r in current): grant('PerfectRun',1,[r['event']['id'] for r in current])
        if len(records)>=42 and sum(r['correct'] for r in records[:42])/42>=.8: grant('Seed42',1,[r['event']['id'] for r in records[:42]])
        for i in range(len(records)-19):
            run=records[i:i+20]
            if all(r['correct'] for r in run) and sum(r['q']['difficulty']>=2 for r in run)>=12: grant('Chain20',1,[r['event']['id'] for r in run])
            dims=[r['q']['dimension'] for r in run]
            if all(dims.count(d)>=2 for d in 'CRDGAKWX') and sum(r['correct'] for r in run)>=18 and sum(a!=b for a,b in zip(dims,dims[1:]))>=10: grant('MoE',1,[r['event']['id'] for r in run])
    highest={}
    for row in c.execute("SELECT * FROM v4_suffix_grants WHERE user_id=? AND status='active' ORDER BY level",(user,)):
        evidence=json.loads(row['evidence_json'])
        if row['suffix']=='WarmStart':
            valid=any((r:=c.execute('SELECT result_json FROM v4_forms WHERE id=? AND user_id=?',(fid,user)).fetchone()) and r['result_json'] and json.loads(r['result_json']).get('reviewStatus')=='approved' for fid in evidence)
            if not valid:continue
        basis=next((r['获取条件'] for r in service.payload.get('suffixRules',[]) if r['后缀']==row['suffix']), '已保存的有效作答证据')
        highest[row['suffix']]=suffix_entry(row['suffix'],row['level'],'active',evidence,basis)|{'grantedAt':row['granted_ms'],'ruleVersion':row['rule_version'],'reviewStatus':'approved','evidenceUnit':'份测评' if row['suffix']=='WarmStart' else '个独立题族'}
    # Style suffixes come from the independent preference profile, never from ability score.
    profile=c.execute('SELECT style_json,wear_json FROM v4_profiles WHERE user_id=?',(user,)).fetchone()
    style=json.loads(profile['style_json']) if profile else {}
    for axis in style.get('axes',{}).values():
        label=axis.get('label')
        if label in STYLE_IDS and axis.get('answered')==6 and axis.get('reviewStatus')=='approved':
            highest[label]=suffix_entry(label,0,'active',axis.get('evidenceIds',[]),'完成对应偏好轴6题，均值达到≤1/3或≥2/3的端点阈值')|{'reviewStatus':'approved','evidenceUnit':'道偏好题'}
    wear=json.loads(profile['wear_json']) if profile else {}
    pending=[]
    if result['reviewStatus']!='approved':
        pending=[suffix_entry(name,1,'pending_review',(), '题库仍为 draft_needs_human_review，审核通过后才可获得正式能力后缀') for name in ABILITY_IDS]
        if result['mode']=='standard':pending.append(suffix_entry('WarmStart',0,'pending_review',(),'已完成快测，题目审核后才可作为有效成就证据'))
    for axis in style.get('axes',{}).values():
        label=axis.get('label')
        if label in STYLE_IDS and label not in highest:pending.append(suffix_entry(label,0,'pending_review',(),'偏好题尚待内容审核，暂不授予正式风格后缀'))
    appearance={'available':True,'options':{'format':['GGUF','MLX'],'precision':['Q4_K_M','Q8_0','BF16']},'selected':{k:wear.get(k) for k in ('format','precision') if wear.get(k)} }
    earned=list(highest.values())
    return {'earned':earned,'pending':pending,'appearance':appearance,
        'categories':{'ability':[x for x in earned if x['category']=='ability'],'style':[x for x in earned if x['category']=='style'],'achievement':[x for x in earned if x['category']=='achievement'],'specialist':[x for x in earned if x['category']=='specialist']},
        'ruleVersion':'suffix-3.2','trial':result['reviewStatus']!='approved','note':'试测记录，后缀待审核' if result['reviewStatus']!='approved' else '正式记录',
        'fullName':model_full_name({**result,'suffixes':{'earned':earned,'appearance':appearance}})}

def style_result(questions,answers):
    result={}; earned=[]
    for axis,pair in STYLE_PAIRS.items():
        values=[]
        for q in questions:
            if q.get('styleAxis')!=axis: continue
            option=next((o for o in q['options'] if o['id']==answers.get(q['id'])),None)
            value=option.get('rawStyle',{}).get(axis) if option else None
            if value in (0,1): values.append(value)
        mean=sum(values)/len(values) if len(values)>=3 else None
        label=pair[0] if len(values)==6 and mean<=1/3 else pair[1] if len(values)==6 and mean>=2/3 else None
        evidence=[q for q in questions if q.get('styleAxis')==axis and any(o['id']==answers.get(q['id']) and o.get('rawStyle',{}).get(axis) in (0,1) for o in q['options'])]
        approved=bool(evidence) and all(q.get('reviewStatus')=='approved' and q.get('deploymentEligible') for q in evidence)
        result[axis]={'answered':len(values),'required':6,'value':mean,'label':label,'reviewStatus':'approved' if approved else 'pending_review','evidenceIds':[q['id'] for q in evidence]}
        if label and approved: earned.append(label)
    exploration=result['exploration']['value']
    return {'axes':result,'suffixes':earned,'temperature':round(.35+.65*exploration,2) if exploration is not None else None,
            'note':'表达偏好独立计算，不改变能力分数。'}
