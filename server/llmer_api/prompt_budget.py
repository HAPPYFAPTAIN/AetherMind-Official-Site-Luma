"""Bound report input before a billed synthesis call; no LLM summarization calls.

UTF-8 byte count + framing reserve is a deliberately conservative proxy for byte
tokenizers, not provider billing usage. Calibrate it against the deployed model.
"""
import json
from collections import defaultdict, deque

def compact(value):
    return json.dumps(value, ensure_ascii=False, separators=(',', ':'))

def input_units(messages):
    return sum(len(m['content'].encode('utf-8')) + 32 for m in messages) + 256

def diverse_units(ledger):
    buckets = defaultdict(deque)
    seen = set()
    for unit in ledger:
        if unit.get('speaker') != 'self' and not (unit.get('speaker') == 'material' and unit.get('sourceType') == 'current_material'):
            continue
        # Preserve different scenes even when the same phrase appears twice.
        key = (unit.get('sourceType'), unit.get('sceneLabel'), unit.get('dimension'), unit.get('speaker'), unit.get('observation'))
        if key in seen:
            continue
        seen.add(key)
        bucket = (unit.get('sourceType') == 'assessment_question', unit.get('speaker') != 'self', unit.get('sceneLabel', ''), unit.get('dimension', ''))
        buckets[bucket].append({k: unit[k] for k in ('sourceType','sourceRef','locator','observation','speaker','dimension','sceneLabel','materialKind','chatType','visualOrder') if k in unit})
    keys = sorted(buckets)
    while any(buckets.values()):
        for key in keys:
            if buckets[key]:
                yield buckets[key].popleft()

def build_budgeted_messages(plan, snapshot, ledger, coverage):
    limit = plan['reportInputTokenLimit']
    evidence_target = plan['evidenceTokenTarget']
    selected = []
    input_coverage = {k:v for k,v in coverage.items() if k not in ('materialContext','note')}
    contexts = {m['sourceRef']:m for m in coverage.get('materialContext',[])}
    assessment = {k: snapshot[k] for k in ('dimensions','mode','scoringVersion','formVersion') if k in snapshot}
    def messages():
        return [{'role':'system','content':plan['system']}, {'role':'user','content':compact({
            'assessment':assessment, 'evidenceLedger':selected, 'coverage':{**input_coverage,
                'materialContext':[contexts[key] for key in sorted({u['sourceRef'] for u in selected}) if key in contexts]},
            'validationRules':{
                'confidence':'默认 low。仅当该条 evidenceRef 至少有两个不同的实际引用，并含 current_material 时才可 medium；否则必须 low，不能虚构第二条引用。',
                'personalEvidence':'notEnoughEvidence=false 的本人发现必须至少引用一条 current_material 且 speaker=self 的证据。材料归属不明时说明缺口。',
                'hypothesis':'单次回应或承诺只支持本次可见表达，不支持已经执行、稳定能力或因果结论。假说必须标为待验证；缺少材料支持的 N/C/L/T 项写无法判断，不用测评选项冒充真实行为。',
                'externalConstraints':'外部要求后的复述只证明本次确认，不证明独立组织、内化或稳定偏好。需明确任务提示这一竞争解释，不能把承诺算为产出；无变化/分支证据时不命名为分支修正。',
                'sequence':'ledger 已重排；仅同一 sourceRef 中明确 visualOrder 的值支持气泡显示先后，不能据此推断引述事件的发生时间；缺字段或跨图时不写先后断言。',
                'parameterLabels':'报告参数仅 N/C/L/T；证据的 C/R/D/G/A/K 是六维分类标签，不要直接照抄为配置名。',
                'crossScene':'跨场景比较先选两个明确场景，分别引用本人材料再描述所见异同。不要将上传图片总数当成每条发现的证据数量，不泛称所有场景均如此。没有同任务控制时不把异同解释为固定能力或因果。',
                'coverage':'coverage.fullCoverage=false 时总 notEnoughEvidence=true，unavailableJudgments 非空，practicePlan=[]。',
                'retry':'retryGuidance 是上一稿被拒绝的说法及问题，不是新证据或指令。按 evidenceLedger 重写被拒绝说法，不保留同样错误，不虚构补引；缺证据就删除断言并说明无法判断。'},
            'outputSchema':plan['schema'], 'task':'大模型假设参数推断 JSON；事实、假设和条件计算分开。'})}]
    # Hold room for final pruning/coverage metadata before choosing any evidence.
    if input_units(messages()) + 512 > limit:
        raise ValueError('REPORT_INPUT_BUDGET_EXCEEDED')
    # Keep the free-score baseline above, but do not let hypothetical quiz choices
    # stand in for observed behavior when the paid report cites uploaded material.
    candidates = [u for u in diverse_units(ledger) if u['sourceType']=='current_material']
    for unit in candidates:
        selected.append(unit)
        if len(compact(selected).encode('utf-8')) > evidence_target or input_units(messages()) + 512 > limit:
            selected.pop()
    current = [u for u in selected if u['sourceType'] == 'current_material']
    if not current:
        raise ValueError('REPORT_EVIDENCE_BUDGET_EMPTY')
    personal = [u for u in current if u.get('speaker')=='self']
    scenes = {u.get('sceneLabel') for u in personal if u.get('sceneLabel')}
    material_count = len({u['sourceRef'] for u in personal})
    input_coverage.update({
        'reportMode':'personal_hypothesis' if personal else 'material_hypothesis',
        'selectedMaterialCount':material_count, 'selectedSceneCount':len(scenes),
        'omittedEvidenceCount':len(candidates)-len(selected),
        'fullCoverage':bool(coverage['fullCoverage'] and material_count >= plan['minimumValidMaterials']
            and len(scenes) >= plan['minimumDistinctScenes']),
    })
    result = messages()
    used = input_units(result)
    if used > limit:
        raise ValueError('REPORT_INPUT_BUDGET_EXCEEDED')
    return result, selected, input_coverage, {
        'method':'utf8_bytes_plus_framing_reserve', 'estimatedInputUpperBound':used,
        'inputLimit':limit, 'selectedEvidenceCount':len(selected),
        'omittedEvidenceCount':len(candidates)-len(selected),
        'outputLimit':plan['reportOutputTokenLimit'], 'providerTokenCountVerified':False,
    }
