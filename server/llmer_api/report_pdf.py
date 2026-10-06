"""Portable CJK PDF without a browser subprocess or remote fonts."""
import io
from html import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,KeepTogether

FONT='STSong-Light'
if FONT not in pdfmetrics.getRegisteredFontNames():
    pdfmetrics.registerFont(UnicodeCIDFont(FONT))

def render_pdf(report,ledger,provenance=None,sample=False):
    cited_count=len({(r['sourceType'],r['sourceRef'],r['locator']) for f in report['findings'] for r in f['evidenceRef']})
    buf=io.BytesIO()
    doc=SimpleDocTemplate(buf,pagesize=A4,rightMargin=46,leftMargin=46,topMargin=54,bottomMargin=50,
        title='参数人类 · 私人表达报告',author='参数人类')
    ink=colors.HexColor('#273249');violet=colors.HexColor('#67579b');muted=colors.HexColor('#627084')
    body=ParagraphStyle('body',fontName=FONT,fontSize=10.5,leading=18,textColor=ink,wordWrap='CJK',spaceAfter=8)
    small=ParagraphStyle('small',parent=body,fontSize=8.5,leading=14,textColor=muted)
    heading=ParagraphStyle('heading',parent=body,fontSize=17,leading=25,spaceBefore=18,spaceAfter=14,keepWithNext=True)
    title=ParagraphStyle('title',parent=body,fontSize=30,leading=39,spaceAfter=18)
    sub=ParagraphStyle('sub',parent=body,fontSize=13,leading=22,textColor=muted)
    para=lambda text,style=body:Paragraph(escape(str(text or '')).replace('\n','<br/>'),style)
    flow=[]
    if sample:flow.append(para('验收样例 · 使用测试材料与测试模型响应，不是线上 LLM 调用结果',small))
    label='模拟报告 · 未扣款 · 非 AI 分析' if report.get('simulation') else 'AI 生成'
    flow += [para('参数人类  /  '+('深度分析' if report['planId']=='deep' else '标准分析')+'  /  '+label,small),Spacer(1,25),
        para('这次，你的表达\n有哪些值得留下的细节',title),para(report['summary'],sub),Spacer(1,18)]
    stats=Table([[para(f'{len(report["findings"])} 条表达观察'),para(f'{cited_count} 条报告引用'),para('3 个下一步行动')]],colWidths=[168,167,168])
    stats.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#f1eef8')),('TOPPADDING',(0,0),(-1,-1),14),('BOTTOMPADDING',(0,0),(-1,-1),10)]))
    flow += [stats,Spacer(1,12),para('从一次选择，到一次对话',heading)]
    lookup={(x['sourceType'],x['sourceRef'],x['locator']):x for x in ledger}
    for i,f in enumerate(report['findings']):
        start=[para(f'观察 {i+1:02d}  /  '+f['finding'],heading)]
        action=Table([[para('下次可以这样做\n'+f['action'])]],colWidths=[503])
        action.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#e9f1ed')),('LEFTPADDING',(0,0),(-1,-1),16),('RIGHTPADDING',(0,0),(-1,-1),16),('TOPPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
        flow += [KeepTogether(start+[action]),Spacer(1,12)]
        for r in f['evidenceRef']:
            unit=lookup.get((r['sourceType'],r['sourceRef'],r['locator']),{})
            flow.append(para('依据 · '+r['locator']+'：'+unit.get('observation','原文未包含在本次导出中。'),small))
            flow.append(para('来源编号 '+r['sourceRef'],small))
        flow.extend([para('另一种解释：'+f['alternativeExplanation'],small),para('适用范围：'+f['boundary'],small)])
    flow.append(para('把发现用在下一次表达里',heading))
    for i,s in enumerate(report['suggestions']):flow.append(para(f'行动 {i+1}  '+s))
    if report['practicePlan']:
        flow.append(para('一段可调整的练习',heading))
        flow.append(para('按需要选择，随时停止；未完成不会影响结果。',small))
        for p in report['practicePlan']:flow.append(para(f'第 {p["day"]} 天  '+p['action']))
    flow.extend([para('这份报告的边界',heading),para(report['boundary'])])
    for s in report['unavailableJudgments']:flow.append(para(s,small))
    flow.append(para('购买不会修改免费分数。报告仅供娱乐与自我观察参考。',small))
    flow.append(para('报告版本 '+report['promptTemplateVersion'],small))
    if provenance:flow.append(para('证据指纹 '+str(provenance.get('inputHash','')),small))
    def chrome(canvas,doc):
        canvas.saveState();canvas.setFont(FONT,9);canvas.setFillColor(violet)
        canvas.drawString(46,A4[1]-30,'参数人类 · 私人表达报告')
        canvas.setStrokeColor(colors.HexColor('#e0e4ed'));canvas.line(46,36,A4[0]-46,36)
        canvas.setFillColor(muted);canvas.setFont(FONT,8)
        canvas.drawString(46,23,label+' · 基于本次授权记录');canvas.drawRightString(A4[0]-46,23,str(doc.page))
        canvas.restoreState()
    doc.build(flow,onFirstPage=chrome,onLaterPages=chrome)
    return buf.getvalue()
