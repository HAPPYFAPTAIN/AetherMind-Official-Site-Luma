"""Deterministic evidence gates. Generated question/prompt contract is the sole source."""
from __future__ import annotations
import hashlib
import json
import math
from copy import deepcopy
from functools import lru_cache
from pathlib import Path
from .errors import ApiError

@lru_cache(maxsize=1)
def contract():
    return json.loads((Path(__file__).parent / 'data' / 'paid-contract.json').read_text(encoding='utf-8'))

def plan_for(plan_id):
    for plan in contract()['plans']:
        if plan['id'] == plan_id:
            return plan
    raise ApiError(400, 'INVALID_PLAN', '分析套餐不存在')

def digest(value):
    return hashlib.sha256(json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()).hexdigest()

def assessment_snapshot(raw, catalog=None):
    """Never accept client-supplied scores, text, evidence, or model instructions."""
    if not isinstance(raw, dict) or set(raw) != {'mode','formId','formVersion','answers','invalidatedQuestionIds'}:
        raise ApiError(400, 'ASSESSMENT_INVALID', '测评快照格式不完整，请重新完成测评')
    mode = raw['mode']
    version = raw['formVersion']
    if not isinstance(version, str):
        raise ApiError(400, 'ASSESSMENT_INVALID', '题表版本必须为字符串')
    catalog = catalog if catalog is not None else (contract() if version == contract()['formVersion'] else contract().get('assessmentVersions', {}).get(version))
    form = next((f for f in catalog['forms'] if f['id'] == raw['formId']), None) if catalog else None
    if mode not in ('standard','challenge') or not form or (catalog.get('modes') and mode not in catalog['modes']):
        raise ApiError(409, 'ASSESSMENT_VERSION_UNSUPPORTED', '该历史题表需使用原版本服务，请重新完成测评')
    # Each version retains its own scoring pool, including IDs shared by different revisions.
    from_form = [q for ids in form['anchors'].values() for q in ids]
    pool = {q['id']: q for q in catalog['items']}
    if mode == 'standard':
        from_form += list(form['standard'].values())
    else:
        from_form += list(form['challenge'].values()) if 'challenge' in form else catalog['challengeIds']
    answers = raw['answers']
    if not isinstance(answers, list) or len(answers) != 18 or any(not isinstance(a, dict) or set(a) != {'questionId','optionId'} for a in answers):
        raise ApiError(400, 'ASSESSMENT_INCOMPLETE', '请提交完整的 18 道正式题作答')
    if any(not isinstance(a['questionId'],str) or not isinstance(a['optionId'],str) for a in answers):
        raise ApiError(400,'ASSESSMENT_INVALID','题目与选项编号必须为字符串')
    ids = [a['questionId'] for a in answers]
    invalid = raw['invalidatedQuestionIds']
    if (not isinstance(invalid, list)
        or any(not isinstance(q, str) or q not in from_form
               or not pool[q].get('continuityRequired')
               or not pool[q].get('accessibilityFallback') for q in invalid)
        or len(set(invalid)) != len(invalid)):
        raise ApiError(400, 'ASSESSMENT_INVALID', '失效证据编号不正确')
    # Continuity interruptions replace only the explicitly frozen accessibility fallback.
    expected=[pool[q].get('accessibilityFallback') if q in invalid and pool[q].get('accessibilityFallback') in ids else q for q in from_form]
    if len(set(ids)) != 18 or set(ids)!=set(expected):
        raise ApiError(400, 'ASSESSMENT_FORM_MISMATCH', '答案与冻结题表不一致')
    evidence, dimensions, all_counts = [], {}, {}
    for a in answers:
        q = pool[a['questionId']]
        o = next((o for o in q['options'] if o['id'] == a['optionId']), None)
        if not o:
            raise ApiError(400, 'ASSESSMENT_OPTION_INVALID', '选项不属于对应题目')
        dim = q['dimension']
        all_counts[dim] = all_counts.get(dim, 0) + 1
        if q['id'] in invalid:
            continue
        dimensions.setdefault(dim, []).append((q['scoringWeight'], o['score']))
        evidence.append({'id': q['id'], 'sourceType':'assessment_question', 'sourceRef':q['id'],
            'locator':q['scene'], 'dimension':dim, 'prompt':q['prompt'], 'observation':o['label'],
            'optionId':o['id'], 'score':o['score'], 'quality':'choice', 'speaker':'self'})
    if all_counts != dict.fromkeys('CRDGAK',3):
        raise ApiError(400, 'ASSESSMENT_COVERAGE_INVALID', '每个维度需要 3 道正式题')
    values = {d: math.floor(sum(w*s for w,s in dimensions.get(d,[]))/sum(w*3 for w,s in dimensions[d])*1000+0.5)/10 if dimensions.get(d) else 0 for d in 'CRDGAK'}
    return {'scoringVersion':contract()['scoringVersion'], 'formVersion':raw['formVersion'],
        'formId':raw['formId'], 'mode':mode, 'dimensions':values, 'evidence':evidence, 'invalidatedQuestionIds':invalid,
        'boundary':'专家规则试验题表；不得跨模式、题表或版本比较。购买不会改变免费分数。'}

def calibrate_uncertainty(report, ledger):
    """Only lower confidence from the actual references; never add evidence or claims."""
    if not isinstance(report,dict) or not isinstance(report.get('findings'),list):return report,[]
    value=deepcopy(report);changes=[]
    lookup={(e['sourceType'],e['sourceRef'],e['locator']):e for e in ledger}
    for index,finding in enumerate(value['findings']):
        if not isinstance(finding,dict) or not isinstance(finding.get('evidenceRef'),list):continue
        if finding.get('confidence') not in ('low','medium'):continue
        refs=finding['evidenceRef']
        if any(not isinstance(r,dict) or any(not isinstance(r.get(k),str) for k in ('sourceType','sourceRef','locator')) for r in refs):continue
        keys=[(r['sourceType'],r['sourceRef'],r['locator']) for r in refs]
        if any(key not in lookup for key in keys):continue
        units=[lookup[key] for key in keys]
        if finding.get('confidence')=='medium' and (len(set(keys))<2 or not any(u['sourceType']=='current_material' for u in units)):
            finding['confidence']='low';changes.append({'findingIndex':index,'field':'confidence','reason':'INSUFFICIENT_DISTINCT_REFERENCES'})
        if finding.get('notEnoughEvidence') is False and not any(u['sourceType']=='current_material' and u.get('speaker')=='self' for u in units):
            finding['notEnoughEvidence']=True;finding['confidence']='low'
            changes.append({'findingIndex':index,'field':'notEnoughEvidence','reason':'NO_ATTRIBUTED_PERSONAL_EVIDENCE'})
    if value['findings'] and all(isinstance(f,dict) and f.get('notEnoughEvidence') is True for f in value['findings']):
        value['notEnoughEvidence']=True
    return value,changes


def validate_report(report, plan_id, ledger):
    from jsonschema import Draft202012Validator
    plan = plan_for(plan_id)
    errors = list(Draft202012Validator(plan['schema']).iter_errors(report))
    if errors:
        raise ValueError('REPORT_SCHEMA_INVALID')
    allowed = {(e['sourceType'], e['sourceRef'], e['locator']) for e in ledger}
    for f in report['findings']:
        if not f['evidenceRef'] and not f['notEnoughEvidence']:
            raise ValueError('REPORT_UNSUPPORTED_FINDING')
        for e in f['evidenceRef']:
            if (e['sourceType'],e['sourceRef'],e['locator']) not in allowed:
                raise ValueError('REPORT_UNKNOWN_EVIDENCE')
        if f['confidence'] == 'high':
            raise ValueError('REPORT_UNCALIBRATED_CONFIDENCE')
        if f['confidence']=='medium':
            unique={(e['sourceType'],e['sourceRef'],e['locator']) for e in f['evidenceRef']}
            if len(unique)<2 or not any(e[0]=='current_material' for e in unique):
                raise ValueError('REPORT_CONFIDENCE_EXCEEDS_EVIDENCE')
    days = [d['day'] for d in report['practicePlan']]
    if len(days) != len(set(days)) or days != sorted(days):
        raise ValueError('REPORT_PRACTICE_DAYS_INVALID')
    chinese_count = sum(ord(c)>255 for c in json.dumps(report, ensure_ascii=False))
    if chinese_count > plan['maxChineseChars']:
        raise ValueError('REPORT_TOO_LONG')
    return report
