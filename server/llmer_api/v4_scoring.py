"""Versioned exact-choice scoring. No price, ad, or preference changes ability."""
from fractions import Fraction
from .v4_parameters import parameter_fields

DIMENSIONS = tuple('CRDGAKWX')
WEIGHTS = dict(zip(DIMENSIONS, (15, 20, 15, 10, 10, 15, 5, 10)))
META = dict(zip(DIMENSIONS, (
    ('语境与约束','核对更新后仍有效的对象、时间和限制。'),
    ('逻辑推理','列出前提，再用反例检查推导。'),
    ('信息与数据','先核对单位、分母和统计范围，再比较数字。'),
    ('规则迁移','先按原例验证规则，再应用到新输入。'),
    ('指令与目标适配','逐项确认格式、范围和交付对象。'),
    ('证据校准','分别写出已知、未知和下一步核对动作。'),
    ('基础知识与量化','检查量纲、比例和运算条件。'),
    ('工具判断','把操作步骤和结果验收分开检查。'))))
TIERS = [(0,'[0.1,1)B','初始火花'),(25,'[1,7)B','轻量启动'),(40,'[7,30)B','稳定响应'),
         (55,'[30,70)B','多面协作'),(70,'[70,200)B','结构整合'),(80,'[200,500)B','深度协作'),
         (88,'[500,1000)B','高阶共创'),(94,'[1,3]T','超大规模'),(98,'(3,10]T','？·未知之力')]

def score_form(form, answers, previous_results=()):
    """All comparisons use exact fractions; formatting occurs after gating."""
    dimensions=[]; explanations=[]; high_total=high_correct=correct_total=0
    for index,q in enumerate(form['privateQuestions']):
        answer=answers[q['id']]
        option=next((o for o in q['options'] if o['id']==answer),None)
        correct=bool(option and (option.get('correct') or answer in q.get('correctOptionIds',[])))
        if not q.get('scored'): continue
        correct_total+=correct
        if q['difficulty']>=3: high_total+=1; high_correct+=correct
        correct_options=[o for o in q['options'] if o.get('correct') or o['id'] in q.get('correctOptionIds',[])]
        explanations.append({'questionId':q['id'],'questionNumber':index+1,'dimension':q['dimension'],
            'prompt':q['prompt'],'choice':option['label'] if option else '暂不确定','optionId':answer,
            'correct':correct,'correctAnswer':' / '.join(o['label'] for o in correct_options),
            'explanation':' '.join(o.get('rationale','') for o in correct_options) or q.get('explanation',''),
            'options':[{'label':o['label'],'rationale':o.get('rationale','')} for o in q['options']],
            'familyId':q['familyId'],'difficulty':q['difficulty']})
    exact={}
    for key in DIMENSIONS:
        evidence=[e for e in explanations if e['dimension']==key]
        count=len(evidence); correct=sum(e['correct'] for e in evidence)
        if not count: raise ValueError('Missing required dimension')
        exact[key]=Fraction(100*correct,count)
        dimensions.append({'key':key,'name':META[key][0],'short':META[key][0],
            'value':round(float(exact[key]),1),'correctCount':correct,'answeredCount':count,'questionCount':count,
            'evidence':evidence,'suggestion':META[key][1]})
    total=sum(exact[k]*Fraction(WEIGHTS[k],100) for k in DIMENSIONS)
    candidate=max(i+1 for i,t in enumerate(TIERS) if total>=t[0]); awarded=candidate; missing=[]
    if form['mode']=='standard' and awarded>6:
        awarded=6; missing.append('快测最高探索T6；更高档位需要完整挑战')
    if form['mode']=='challenge':
        if awarded>=8 and (min(exact.values())<75 or Fraction(high_correct,max(1,high_total))<Fraction(85,100)):
            awarded=7; missing.append('T8需要每维至少75分，且高难题至少答对14/16')
        if awarded==9:
            eligible=total>=98 and min(exact.values())>=75 and high_correct>=15 and high_total==16
            families={q['familyId'] for q in form['privateQuestions'] if q.get('scored')}
            exposure={g for q in form['privateQuestions'] for g in q.get('exposureExclusionGroups',[])}
            paired=any(r.get('mode')=='challenge' and r.get('bankVersion')==form['bankVersion']
                and r.get('score',0)>=98 and all(d['value']>=75 for d in r['dimensions'])
                and r.get('highCorrect',0)>=15 and r.get('highTotal')==16
                and form['createdAt']-r['completedAt']>=86400000
                and not families.intersection(r.get('families',[])) and not exposure.intersection(r.get('exposureGroups',[]))
                for r in previous_results)
            if not eligible or not paired:
                awarded=8; missing.append('T9需要间隔至少24小时、同版本且题族与曝光组不重复的两份合格挑战')
    # Editorial difficulty is not calibrated: public release never certifies T8/T9.
    simulated_tier=awarded
    if awarded>=8: awarded=7; missing.append('高档尚处规则试验，T8/T9正式认证未开放')
    spec=TIERS[awarded-1]
    return {'protocol':'assessment-v4','schemaVersion':'result-v4','scoringVersion':'score-3.2.0',
        'mode':form['mode'],'bankVersion':form['bankVersion'],'formId':form['id'],
        'score':round(float(total),2),'scoreFraction':f'{total.numerator}/{total.denominator}',
        'candidateTierId':f'T{candidate}','tierId':f'T{awarded}','simulatedTierId':f'T{simulated_tier}',
        'parameterTier':spec[1],**parameter_fields({'mode':form['mode'],'tierId':f'T{awarded}','scoreFraction':str(total)}),
        'parameterName':spec[2],'certified':False,'trial':True,
        'reviewStatus':form['reviewStatus'],'unmetConditions':missing,'dimensions':dimensions,
        'correctCount':correct_total,'scoredChoiceCount':len(explanations),'highCorrect':high_correct,'highTotal':high_total,
        'explanations':explanations,'completedAt':form['completedAt'],
        'families':[q['familyId'] for q in form['privateQuestions'] if q.get('scored')],
        'exposureGroups':list({g for q in form['privateQuestions'] for g in q.get('exposureExclusionGroups',[])}),
        'summary':f'本次答对{correct_total}/{len(explanations)}道能力题。分数按八维固定权重计算，破冰和风格不计能力分。',
        'disclaimer':'结果描述本次任务表现；参数范围是游戏化档位，不是真实模型规模、智力或人格诊断。'}
