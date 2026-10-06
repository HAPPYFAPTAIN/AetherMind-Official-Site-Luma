"""Explicit, persisted simulation. Never calls a payment or LLM provider."""
import json
from .errors import ApiError
from .paid_contract import plan_for
from .paid_service import now_ms, encode


def confirm_simulated_payment(service, user_id, cid):
    row = service.require(user_id, cid)
    if not service.settings.simulation_enabled or row['payment_mode'] != 'simulation':
        raise ApiError(403, 'SIMULATION_ONLY', '此操作只适用于模拟订单')
    with service.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        c.execute("UPDATE paid_cases SET order_status='PAID',status='PAID',transaction_id=?,updated_ms=? WHERE id=? AND user_id=? AND payment_mode='simulation' AND order_status='PENDING' AND status='ORDER_PENDING' AND expires_ms>?",
                  ('sim-'+cid, now_ms(), cid, user_id, now_ms()))
    value = service.get(user_id, cid)
    if value['orderStatus'] != 'PAID':
        raise ApiError(409, 'SIMULATION_NOT_PENDING', '模拟订单已关闭或尚未创建')
    return value


def finish_simulated_report(service, row, attempt):
    snapshot = json.loads(row['snapshot_json'])
    ledger = snapshot['evidence']
    count = 6 if row['plan_id'] == 'deep' else 3
    findings = []
    for unit in ledger[:count]:
        findings.append({
            'finding': '测评选择回顾：' + str(unit.get('dimension', '表达')),
            'evidenceRef': [{k:unit[k] for k in ('sourceType','sourceRef','locator')}],
            'confidence':'low', 'notEnoughEvidence':True,
            'alternativeExplanation':'单次选择可能受到题目情境影响，不能代表日常表现。',
            'action':'回看这一题的选择，在实际沟通中记录一个相似场景，再比较自己的处理方式。',
            'boundary':'仅复述本次免费测评记录，未分析截图内容。',
        })
    report = {
        'schemaVersion':'paid-report-output-1.0.0',
        'promptTemplateVersion':'simulation-report-1.0.0', 'planId':row['plan_id'],
        'simulation':True, 'aiContentLabel':'模拟报告 · 非 AI 分析',
        'summary':f"这是{'深度' if row['plan_id']=='deep' else '标准'}流程的模拟报告。已接收 {len(service.materials(row['id']))} 张授权图片并保存在私有目录；本次没有读取图片文字、调用模型或实际扣款。下方内容来自本次免费作答，用于体验引用、阅读和导出。",
        'findings':findings, 'suggestions':['先写清这次沟通想让对方做什么。','把确定事实和待确认条件分开写。','发送前检查对象、时间和下一步动作。'],
        'notEnoughEvidence':True, 'unavailableJudgments':['尚未配置真实模型，无法判断截图中的表达特点或跨场景差异。'],
        'boundary':'模拟结果用于功能联调，不是付费 AI 结论。模拟金额不会计入实际收入。', 'practicePlan':[],
    }
    with service.db.connect() as c:
        c.execute("UPDATE paid_cases SET status='SUCCEEDED',report_json=?,ledger_json=?,usage_json=?,error_code=NULL,updated_ms=? WHERE id=? AND status='RUNNING' AND order_status='PAID' AND report_mode='simulation' AND job_attempts=? AND expires_ms>?",
                  (encode(report),encode(ledger),encode({'simulation':True,'model':'simulation','total_tokens':0}),now_ms(),row['id'],attempt,now_ms()))
