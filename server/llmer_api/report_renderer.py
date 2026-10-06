"""Private, script-free report export. Escape every model/user string."""
from html import escape

def e(value):
    return escape(str(value or ''),quote=True)

CSS='''
:root{color-scheme:light;--ink:#332a25;--muted:#75685e;--violet:#8a5a44;--paper:#fff;--line:#e8dfd4;--soft:#fbf1e6;--sage:#f8efe5}
*{box-sizing:border-box}body{margin:0;background:#f8efe3;color:var(--ink);font-family:"Microsoft YaHei","PingFang SC",sans-serif;font-size:15px;line-height:1.8}
main{max-width:990px;margin:36px auto;background:var(--paper);border-radius:24px;overflow:hidden}header{padding:44px 56px 36px;background:#fcf6ee;position:relative}
.brand{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);gap:12px}.mark{color:var(--violet);font-weight:700}.label{display:inline-block;margin:32px 0 12px;padding:3px 12px;border-radius:20px;background:#f4e5d5;color:#8a5a44;font-size:12px}
h1{font-size:38px;line-height:1.45;letter-spacing:-1px;margin:0 0 18px;max-width:680px;font-weight:700}.summary{font-size:18px;max-width:720px;color:#655b54;margin:0}.meta{display:flex;gap:28px;flex-wrap:wrap;border-top:1px solid #e8dfd4;margin-top:28px;padding-top:16px;color:var(--muted);font-size:13px}
nav{padding:16px 56px;border-bottom:1px solid var(--line);display:flex;gap:28px}a{color:var(--violet);text-decoration:none}a:focus-visible,summary:focus-visible{outline:3px solid #a6afd0;outline-offset:3px}.body{padding:8px 56px 40px}section{padding-top:32px}h2{font-size:24px;margin:0 0 6px}h3{font-size:18px;margin:0 0 12px}.sub{color:var(--muted);font-size:13px;margin:0 0 22px}
.finding{display:grid;grid-template-columns:56px 1fr;gap:16px;padding:24px 0;border-bottom:1px solid var(--line)}.number{font-size:32px;line-height:1.3;font-family:Georgia,serif;color:#c39a71}.confidence{font-size:12px;color:#667463;display:block;margin:0 0 7px}
.action{background:var(--sage);border-radius:12px;padding:16px 20px;margin:16px 0}.action b{display:block;font-size:12px;color:#537464;margin-bottom:5px}.alternative{font-size:13px;color:var(--muted);margin:10px 0}
details{border-top:1px solid var(--line);padding:12px 0}summary{cursor:pointer;font-size:13px;color:var(--violet)}.reference{padding:12px 16px;margin-top:8px;background:#fcf7f0;border-radius:8px;font-size:13px}.reference p{margin:5px 0}.ref-label{font-size:11px;color:var(--muted);overflow-wrap:anywhere}
.suggestions{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:20px}.suggestion{padding:20px 0;border-top:4px solid #c49b76;font-size:14px}.suggestion b{display:block;color:var(--violet);margin-bottom:10px}.practice{display:grid;grid-template-columns:1fr 1fr;gap:0 26px}.day{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid var(--line);font-size:13px}.day span{flex-shrink:0;color:var(--violet);width:45px}.limits{background:#fcf7f0;border-radius:14px;padding:22px 26px;font-size:13px}.limits ul{padding-left:20px}footer{padding:24px 56px;background:#332a25;color:#fbf1e6;font-size:12px}footer p{margin:5px 0;overflow-wrap:anywhere}.sample{background:#fff1cc;padding:10px 56px;font-size:13px;color:#66531b}
@media(max-width:650px){body{background:#fff}main{margin:0;border-radius:0}header{padding:28px 24px}h1{font-size:29px}.summary{font-size:16px}.brand{font-size:11px}.body{padding:4px 24px 28px}nav{padding:14px 24px;gap:20px;font-size:13px}.finding{grid-template-columns:32px 1fr;gap:10px}.number{font-size:25px}.suggestions{grid-template-columns:1fr;gap:0}.practice{grid-template-columns:1fr}footer{padding:24px}.sample{padding:12px 24px}.meta{gap:12px}}
@media print{body{background:white;font-size:11px}main{margin:0;max-width:none;border-radius:0}header{padding:20px 28px}h1{font-size:28px}nav{display:none}.body{padding:0 28px}.finding,.suggestion,.day,.limits{break-inside:avoid}details>*{display:block}summary{list-style:none}footer{background:white;color:#75685e;padding:20px 28px}.sample{padding:10px 28px}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
'''

def render_report(report,ledger,provenance=None,sample=False):
    provenance=provenance or {}
    cited_count=len({(r['sourceType'],r['sourceRef'],r['locator']) for f in report['findings'] for r in f['evidenceRef']})
    lookup={(x['sourceType'],x['sourceRef'],x['locator']):x for x in ledger}
    sections=[]
    for i,f in enumerate(report['findings']):
        refs=[]
        for r in f['evidenceRef']:
            unit=lookup.get((r['sourceType'],r['sourceRef'],r['locator']),{})
            refs.append(f'<div class="reference"><div class="ref-label">{e(unit.get("sceneLabel","本次材料"))} / {e(r["locator"])}</div><p>{e(unit.get("observation","该证据的原文未包含在本次导出中。"))}</p></div>')
        title, separator, detail = f['finding'].partition('\n') if '\n' in f['finding'] else f['finding'].partition('：')
        if not separator or len(title)>45: title,detail=f['finding'],''
        if report['planId']=='deep' and i==4:
            sections.append('<section class=limits><h2>深度专属 · 三个机制拆解</h2><p>场景中的反差、另一种解释、画像的适用范围。</p></section>')
        detail_html = '<p>'+e(detail).replace(chr(10),'<br>')+'</p>' if detail else ''
        sections.append(f'''<article class="finding"><div class="number">{i+1:02}</div><div>
            <span class="confidence">{'局部观察，证据较少' if f['confidence']=='low' else '本次证据支持的观察'}</span>
            <h3>{e(title)}</h3>{detail_html}<div class="action"><b>下次可以这样做</b>{e(f['action'])}</div>
            <details><summary>查看这条发现的 {len(refs)} 个依据</summary>{''.join(refs)}</details>
            <p class="alternative">另一种解释：{e(f['alternativeExplanation'])}</p><p class="alternative">适用范围：{e(f['boundary'])}</p></div></article>''')
    suggestions=''.join(f'<div class="suggestion"><b>行动 {i+1}</b>{e(s)}</div>' for i,s in enumerate(report['suggestions']))
    practice=''.join(f'<div class="day"><span>第 {p["day"]} 天</span><div>{e(p["action"])}</div></div>' for p in report['practicePlan'])
    limits=''.join(f'<li>{e(x)}</li>' for x in report['unavailableJudgments'])
    prompt=e(report['promptTemplateVersion'])
    model=e(provenance.get('model','未记录'))
    sample_banner='<div class="sample">验收样例：使用明确标注的测试材料与测试模型响应，用于展示实际报告生成和排版流程；不是线上 LLM 调用结果。</div>' if sample else ''
    html = f'''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>参数人类 · 我的表达观察</title><style>{CSS}</style></head><body><main>
    {sample_banner}<header><div class="brand"><span class="mark">参数人类</span><span>{'深度分析' if report['planId']=='deep' else '标准分析'} · 私人报告</span></div>
    <span class="label">AI 生成 · 以本次证据为范围</span><h1>这次，你的表达<br>有哪些值得留下的细节</h1><p class="summary">{e(report['summary'])}</p>
    <div class="meta"><span>{len(report['findings'])} 条表达观察</span><span>{cited_count} 条报告引用</span><span>3 个下一步行动</span></div></header>
    <nav><a href="#findings">表达观察</a><a href="#actions">行动建议</a><a href="#boundary">适用边界</a></nav><div class="body">
    <section id="findings"><h2>从一次选择，到一次对话</h2><p class="sub">发现、依据和另一种解释放在一起，方便你判断是否符合实际。</p>{''.join(sections)}</section>
    <section id="actions"><h2>把发现用在下一次表达里</h2><div class="suggestions">{suggestions}</div></section>
    {('<section><h2>给自己一段可调整的练习</h2><p class="sub">按需要选择，随时停止；未完成不会影响你的结果。</p><div class="practice">'+practice+'</div></section>') if practice else ''}
    <section id="boundary"><div class="limits"><h3>这份报告能说明什么</h3><p>{e(report['boundary'])}</p>{('<ul>'+limits+'</ul>') if limits else ''}<p>证据来自你授权的本次材料。材料数量不等于判断准确率；付费不会修改免费测评的分数。</p></div></section></div>
    <footer><p>参数人类 · AI 生成内容，仅供娱乐与自我观察参考</p><p>报告版本 {prompt} / 模型 {model}</p><p>证据指纹 {e(provenance.get('inputHash','样例未关联线上订单'))}</p></footer></main></body></html>'''

    if report['promptTemplateVersion'] in ('standard-report-2.6.0', 'deep-report-2.6.0', 'standard-report-2.7.0', 'deep-report-2.7.0', 'standard-report-2.8.0', 'deep-report-2.8.0', 'standard-report-2.9.0', 'deep-report-2.9.0', 'standard-report-2.9.1', 'deep-report-2.9.1', 'standard-report-2.9.2', 'deep-report-2.9.2'):
        html = html.replace('我的表达观察', '大模型假设参数推断').replace('这次，你的表达<br>有哪些值得留下的细节', '如果把你看作一个大模型').replace('从一次选择，到一次对话', '四参数与候选机制').replace('把发现用在下一次表达里', '怎样检验这些模型假说').replace('下次可以这样做', '可以这样验证').replace('表达观察', '参数假说').replace('行动建议', '验证任务')
    if report['promptTemplateVersion'].endswith(('2.8.0','2.9.0','2.9.1','2.9.2')):
        deep = report['planId'] == 'deep'
        html = html.replace('如果把你看作一个大模型', '你的模型，为什么会切换' if deep else '这次，你像怎样的模型')
        html = html.replace('四参数与候选机制', '配置对照 · 竞争机制 · 适用边界' if deep else '一张看得懂的模型速写')
        html = html.replace('怎样检验这些模型假说', '用 A/B 小实验检验机制' if deep else '三个小实验，试试是否像你')
        html = html.replace('深度分析 · 私人报告', '深度分析 · 模型拆解').replace('标准分析 · 私人报告', '标准分析 · 模型速写')
    if report.get('simulation'):
        html=html.replace('AI 生成','模拟报告 · 非 AI 分析').replace('本次证据支持的观察','测评选择回顾')
        html=html.replace('<main>','<main><div class="sample">模拟体验：未实际扣款，未调用模型，未识别截图内容。</div>',1)
    return html
