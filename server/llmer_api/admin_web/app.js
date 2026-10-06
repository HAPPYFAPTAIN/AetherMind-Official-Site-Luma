'use strict';
const $ = id => document.getElementById(id);
const root = '/llmer-api/admin/api';
let csrf = '', view = 'overview', page = 1, selectedCase = null, loading = false, generation = 0;
const labels = {DRAFT:'待下单',ORDER_PENDING:'待付款',PAID:'已支付',NONE:'未下单',PENDING:'待支付',QUEUED:'排队中',RUNNING:'分析中',SUCCEEDED:'已完成',FAILED:'失败',SAFETY_HOLD:'已暂停',REFUNDED:'已退款',CLOSED:'已关闭',DELETED:'已删除'};
const titles = {overview:'运营概览',cases:'订单与支付',users:'用户资料',reports:'任务与报告',audit:'操作记录'};
titles.banks='题库管理';titles.assessments='测评与活跃度';
const money = fen => '¥'+(Number(fen||0)/100).toFixed(2);
const date = ms => ms ? new Date(ms).toLocaleString('zh-CN',{hour12:false}) : '—';
const el = (tag,text,cls) => {const n=document.createElement(tag);if(text!==undefined)n.textContent=String(text);if(cls)n.className=cls;return n;};
async function api(path,method='GET',data){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
  let response;
  try{response=await fetch(root+path,{method,signal:controller.signal,credentials:'same-origin',headers:{'Content-Type':'application/json','X-Admin-CSRF':csrf},body:data===undefined?undefined:JSON.stringify(data)});}
  catch(e){throw new Error(e.name==='AbortError'?'请求超时，请检查网络后重试。':'网络连接失败，请稍后重试。');}
  finally{clearTimeout(timer);}
  const result=response.status===204?null:await response.json();
  if(!response.ok){if(response.status===401&&path!='/login')showLogin();throw new Error(result?.error?.message||'请求失败');}return result;
}
function showLogin(){csrf='';generation++;selectedCase=null;$('detail').close();$('detail-body').replaceChildren();$('password-dialog').close();$('assessment-detail').close();$('assessment-body').replaceChildren();$('boot').hidden=true;$('workspace').hidden=true;$('login').hidden=false;$('password').value='';}
function showWorkspace(s){csrf=s.csrfToken;$('operator').textContent=s.username;$('boot').hidden=true;$('login').hidden=true;$('workspace').hidden=false;load();}
$('login-form').onsubmit=async e=>{e.preventDefault();$('login-button').disabled=true;$('login-error').textContent='';try{showWorkspace(await api('/login','POST',{username:$('username').value,password:$('password').value}));$('password').value='';}catch(e){$('login-error').textContent=e.message;}finally{$('login-button').disabled=false;}};
$('logout').onclick=async()=>{try{await api('/logout','POST');showLogin();}catch(e){$('error').textContent=e.message;}};
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;page=1;$('status').value=view==='reports'?'SUCCEEDED':'';$('mode').value='';$('search').value='';load();});
$('refresh').onclick=()=>load();$('filters').onsubmit=e=>{e.preventDefault();page=1;load();};$('previous').onclick=()=>{page--;load();};$('next').onclick=()=>{page++;load();};
function row(parent,label,value){const n=el('div',undefined,'health-row');n.append(el('span',label),el('strong',value));parent.append(n);}
async function load(){
 const turn=++generation;loading=true;$('refresh').disabled=true;$('error').textContent='';$('notice').textContent='正在加载最新数据…';$('page-title').textContent=titles[view];
 document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
 $('overview').hidden=view!=='overview';$('listing').hidden=view==='overview'||view==='banks';$('banks').hidden=view!=='banks';
 try{
  if(view==='banks'){
    await loadV4Bank();if(turn!==generation)return;
    const d=await api('/question-banks');if(turn!==generation)return;
    renderBanks(d.items);$('notice').textContent='题库版本已同步 · 新测评从启用版本随机抽取';
  }else if(view==='overview'){
   const d=await api('/overview');if(turn!==generation)return;
   $('overview').replaceChildren();const paid=d.payments.filter(p=>p.status==='PAID');const live=paid.filter(p=>p.mode==='live').reduce((s,p)=>s+p.amountFen,0);const sim=paid.filter(p=>p.mode==='simulation').reduce((s,p)=>s+p.count,0);
   const metrics=el('div',undefined,'metrics');[['用户数',d.counts.users],['报告订单',d.counts.paid_cases],['实际已支付金额',money(live)],['模拟支付笔数',sim]].forEach(([l,v])=>{const c=el('div',undefined,'metric');c.append(el('span',l),el('strong',v));metrics.append(c);});$('overview').append(metrics);
   const activity=el('section',undefined,'panel');activity.append(el('h2','测评活跃度'));row(activity,'已领取题表',d.counts.question_bank_forms);row(activity,'已同步结果',d.counts.question_bank_results);row(activity,'近 7 天抽题用户',d.activeAssessmentUsers7d);activity.append(el('small','按领取云端题表的去重账号统计；待同步不等于用户未完成。'));$('overview').append(activity);
   const grid=el('div',undefined,'grid'),health=el('section',undefined,'panel'),tasks=el('section',undefined,'panel');health.append(el('h2','服务状态'));const c=d.capabilities;
   [['运行版本',d.release],['后台线程',d.workerAlive?'运行中':'未运行'],['微信登录配置',c.wechatLogin?'已配置':'未配置'],['支付渠道',c.simulation?'模拟支付':c.payment?'已配置':'未配置'],['报告生成',c.reportMode==='simulation'?'模拟报告':c.llm?'真实 AI 分析':'未配置'],['图片模型',d.reportProvider?.visionModel||'未配置'],['报告模型',d.reportProvider?.model||'未配置'],['复核模型',d.reportProvider?.reviewModel||'未配置'],['材料保留',c.retentionDays+' 天']].forEach(([l,v])=>row(health,l,v));
   tasks.append(el('h2','交付进度'));if(!d.tasks.length)tasks.append(el('p','还没有云端报告订单。','empty'));d.tasks.forEach(t=>row(tasks,labels[t.status]||t.status,t.count));grid.append(health,tasks);$('overview').append(grid);
   const usage=el('section',undefined,'panel');usage.append(el('h2','材料与用量'));row(usage,'已保存材料',d.counts.paid_materials);row(usage,'模型计费上界（Token）',d.chargedTokenBound);usage.append(el('small','用量上界用于预算保护，不是供应商最终账单；模拟报告不调用模型。'));$('overview').append(usage);
   $('notice').textContent=c.simulation?(c.reportMode==='live'?'模拟付款不扣款 · 授权材料真实调用 AI，模型用量计入服务成本。':'模拟体验已开启 · 不会真实扣款，模拟金额不计入收入。'):'当前为真实渠道配置 · 请结合订单和供应商回执核对。';
  }else if(view==='assessments'){
   $('filters').hidden=false;$('mode').hidden=true;$('status').hidden=true;$('search').placeholder='搜索用户 ID 或题表 ID';
   const d=await api('/assessment-v4/history?'+new URLSearchParams({page,q:$('search').value}));if(turn!==generation)return;
   const tr=el('tr');['用户 / 题表','模式','题库版本','状态','领取时间',''].forEach(h=>tr.append(el('th',h)));$('columns').replaceChildren(tr);$('rows').replaceChildren();
   d.items.forEach(item=>{const tr=el('tr');[item.user_id+'\n'+item.id,item.mode==='challenge'?'挑战':'快测',item.result?.bankVersion||'已冻结题卷',item.result?'报告已生成':'答题中',date(item.created_ms)].forEach(v=>tr.append(el('td',v,'code')));const td=el('td');if(item.result){const b=el('button','作答详情');b.onclick=()=>{$('assessment-body').replaceChildren(el('pre',JSON.stringify(item.result,null,2)));$('assessment-detail').showModal();};td.append(b);}tr.append(td);$('rows').append(tr);});
   $('empty').hidden=!!d.items.length;$('page-count').textContent=`第 ${d.page} 页 · 共 ${d.total} 轮`;$('previous').disabled=d.page<=1;$('next').disabled=d.page*d.pageSize>=d.total;$('notice').textContent='新版八维报告与云端进度；答案由服务器核对。';
  }else{
   const users=view==='users',audit=view==='audit';$('filters').hidden=audit;$('mode').hidden=users;$('status').hidden=users;$('search').placeholder=users?'搜索昵称或用户 ID':'搜索订单号或用户 ID';
   const query=new URLSearchParams({q:$('search').value,page,mode:$('mode').value,status:$('status').value});const d=await api('/'+(users?'users':audit?'audit':'cases')+'?'+query);if(turn!==generation)return;
   const headers=users?['用户','账号类型','手机号尾号','地区 / 职业','订单数','注册时间']:audit?['时间','管理员','操作','目标']:['订单 / 用户','方案','分析方式','金额 / 来源','支付','交付','材料','创建时间',''];
   const tr=el('tr');headers.forEach(h=>tr.append(el('th',h)));$('columns').replaceChildren(tr);$('rows').replaceChildren();
   d.items.forEach(item=>{const tr=el('tr');let cells;
    if(users)cells=[(item.display_name||'未填写')+'\n'+item.id,item.wechat?'微信':'手机号',item.phone_last4==='----'?'未绑定':'****'+item.phone_last4,[item.city,item.occupation].filter(Boolean).join(' / ')||'未填写',item.case_count,date(item.created_at_ms)];
    else if(audit)cells=[date(item.created*1000),item.username,({login:'登录',logout:'退出',login_failed:'登录失败',password_changed:'修改密码',view_case:'查看订单',retry_case:'重试任务',simulate_refund:'模拟退款'})[item.action]||item.action,item.target||'—'];
    else cells=[item.id+'\n'+item.user_id,item.plan_id==='deep'?'深度分析':'标准分析',item.report_mode==='simulation'?'模拟报告':'真实 AI',money(item.amount_fen)+' · '+(item.payment_mode==='simulation'?'模拟':'真实'),labels[item.order_status]||item.order_status,labels[item.status]||item.status,item.material_count,date(item.created_ms)];
    cells.forEach((v,i)=>{const td=el('td',v,i===0&&!audit?'code':'');tr.append(td);});if(!users&&!audit){const td=el('td'),b=el('button','查看详情');b.onclick=()=>detail(item.id);td.append(b);tr.append(td);}$('rows').append(tr);
   });$('empty').hidden=!!d.items.length;$('page-count').textContent=`第 ${page} 页 · 共 ${d.total} 条`;$('previous').disabled=page<=1;$('next').disabled=page*25>=d.total;$('notice').textContent='已更新 · '+new Date().toLocaleTimeString('zh-CN');
  }
 }catch(e){if(turn===generation){$('error').textContent=e.message;$('notice').textContent='加载失败，可点击刷新重试。';}}finally{if(turn===generation){loading=false;$('refresh').disabled=false;}}
}
async function detail(id){selectedCase=id;$('detail-body').replaceChildren();$('detail-status').textContent='正在读取订单…';$('retry').hidden=true;$('refund').hidden=true;if(!$('detail').open)$('detail').showModal();try{const d=await api('/cases/'+encodeURIComponent(id));if(selectedCase!==id)return;$('detail-status').textContent=(d.paymentMode==='simulation'?'模拟订单 · 无实际扣款':'真实支付订单')+' / '+(labels[d.status]||d.status);[['订单号',d.id],['交易号',d.transactionId||'尚未确认'],['金额',money(d.amountFen)],['已尝试次数',d.jobAttempts],['创建时间',date(d.createdAt)],['最近更新',date(d.updatedAt)],['保留至',date(d.expiresAt)],['错误码',d.errorCode||'无']].forEach(([l,v])=>row($('detail-body'),l,v));[['材料标注',d.materials],['模型调用记录',d.calls],['报告内容',d.report||'尚未生成报告']].forEach(([label,data])=>{const block=el('details');block.append(el('summary',label),el('pre',JSON.stringify(data,null,2)));$('detail-body').append(block);});$('retry').hidden=!['FAILED','SAFETY_HOLD'].includes(d.status)||d.jobAttempts>=2||d.orderStatus!=='PAID';$('refund').hidden=d.paymentMode!=='simulation'||d.orderStatus!=='PAID';}catch(e){$('detail-status').textContent=e.message;}}
$('detail-close').onclick=()=>{$('detail').close();selectedCase=null;};
async function action(name){if(!selectedCase)return;const id=selectedCase;if(!confirm(name==='retry'?'使用原订单重试任务？不重置尝试次数。':'将此模拟订单标记为退款？不会发生真实资金退款，报告权益将停止。'))return;$('retry').disabled=$('refund').disabled=true;try{await api('/cases/'+id+'/'+name,'POST');await detail(id);await load();}catch(e){$('detail-status').textContent=e.message;}finally{$('retry').disabled=$('refund').disabled=false;}}
$('retry').onclick=()=>action('retry');$('refund').onclick=()=>action('simulate-refund');
$('password-open').onclick=()=>{$('password-error').textContent='';$('password-dialog').showModal();};$('password-close').onclick=()=>$('password-dialog').close();
$('password-form').onsubmit=async e=>{e.preventDefault();try{await api('/password','POST',{currentPassword:$('old-password').value,newPassword:$('new-password').value});$('old-password').value=$('new-password').value='';$('password-dialog').close();showLogin();$('login-error').textContent='密码已更新，请重新登录。';}catch(e){$('password-error').textContent=e.message;}};
api('/session').then(showWorkspace).catch(showLogin);

let questionBankId=null,questionBankPage=1;
let v4Page=1;
async function loadV4Bank(){
 const data=await api('/question-banks/v4');
 $('v4-summary').replaceChildren(el('p',`${data.version} · 已审核可投放 ${data.reviewed} 道 · ${data.trial?'试测开启':'仅审核题'} · ${data.rewardSimulation?'奖励模拟':'平台奖励'}`),el('pre',JSON.stringify({...data.structuredCandidates,...data.retainedForReview},null,2)));
 $('v4-imports').replaceChildren();for(const version of data.imports){const box=el('p',`${date(version.created_ms)} · ${version.active?'当前启用':'待启用 / 历史'} `);if(!version.active){const b=el('button','启用此版本');b.onclick=async()=>{if(!confirm('启用此新版题库？只影响之后发放的题组，旧报告保持不变。'))return;try{await api(`/question-banks/v4/imports/${version.id}/activate`,'POST');await loadV4Bank();}catch(e){$('v4-feedback').textContent=e.message;}};box.append(b);}$('v4-imports').append(box);}await loadV4Questions();
}
async function loadV4Questions(){
 const data=await api('/question-banks/v4/questions?'+new URLSearchParams({page:v4Page,q:$('v4-query').value}));
 $('v4-questions').replaceChildren();for(const q of data.items){const box=el('details',undefined,'panel');box.append(el('summary',`${q.id} · ${q.sourceKind} · ${q.reviewStatus||'待审核'}`),el('p',q.prompt));
 for(const o of q.options||[])box.append(el('p',`${o.id} · ${o.label}${o.correct?' ✓':''}`),el('small',o.rationale||''));
 box.append(el('p',q.explanation||''),el('small',`维度 ${q.dimension||'待审'} / 难度 ${q.difficulty||'待审'} / 题族 ${q.familyId||'缺失'} / ${q.governanceRole||'待定'}`));
 if(q.scored){for(const [label,status] of [['审核通过','approved'],['退回修订','rejected']]){const b=el('button',label);b.onclick=async()=>{const note=prompt('填写本次审核依据');if(!note)return;const patch={reviewStatus:status,note};if(status==='approved'){patch.dimension=prompt('主维度 C/R/D/G/A/K/W/X',q.dimension||'');if(!patch.dimension)return;patch.difficulty=Number(prompt('难度 1至4',String(q.difficulty||'')));const answer=prompt('唯一正确选项ID',(q.correctOptionIds||[])[0]||'');if(!answer)return;patch.correctOptionIds=[answer];}try{await api(`/question-banks/v4/questions/${encodeURIComponent(q.id)}/review`,'POST',patch);await loadV4Bank();}catch(e){$('v4-feedback').textContent=e.message;}};box.append(b);}}
 $('v4-questions').append(box);}
 $('v4-page').textContent=`第${data.page}页 / 共${data.total}题`;$('v4-prev').disabled=v4Page===1;$('v4-next').disabled=v4Page*20>=data.total;
}
$('v4-search').onsubmit=e=>{e.preventDefault();v4Page=1;loadV4Questions().catch(e=>$('v4-feedback').textContent=e.message);};
$('v4-prev').onclick=()=>{v4Page--;loadV4Questions().catch(e=>$('v4-feedback').textContent=e.message);};
$('v4-next').onclick=()=>{v4Page++;loadV4Questions().catch(e=>$('v4-feedback').textContent=e.message);};
$('v4-upload').onsubmit=async e=>{e.preventDefault();const file=$('v4-file').files[0];if(!file)return;const b=e.target.querySelector('button');b.disabled=true;$('v4-feedback').textContent='正在校验工作簿…';try{const body=new FormData();body.append('file',file);const r=await fetch(root+'/question-banks/v4/import',{method:'POST',credentials:'same-origin',headers:{'X-Admin-CSRF':csrf},body});const data=await r.json();if(!r.ok)throw new Error(data.error?.message||'导入失败');$('v4-feedback').textContent='校验通过，尚未启用：'+JSON.stringify(data.counts);await loadV4Bank();}catch(e){$('v4-feedback').textContent=e.message;}finally{b.disabled=false;}};
function renderBanks(items){
  $('bank-versions').replaceChildren();
  if(!items.length){$('bank-versions').append(el('p','还没有云端题库，请上传工作簿并启用。'));return;}
  items.forEach(v=>{
    const relaxed=v.kind==='relaxation';
    const box=el('section',undefined,'panel');box.append(el('h3',v.name),el('p',`${relaxed?'减压题库 · 不计分':'计分题库'} · ${v.active?'当前启用':'待启用 / 历史版本'} · ${v.count} 题 · ${date(v.createdAt)}`),el('small',v.id));
    box.append(el('p',relaxed?`可投放 ${v.activeCount} / 待修订 ${v.heldCount} · ${Object.keys(v.categories).length} 类`:`共同 ${v.pools.anchor} / 轻松 ${v.pools.standard} / 挑战 ${v.pools.challenge}`));
    if(relaxed&&v.warnings?.length){const details=el('details');details.append(el('summary','导入核对与待修订说明'),el('pre',v.warnings.join('\n')));box.append(details);}
    const actions=el('div',undefined,'actions'),show=el('button','浏览题目','secondary');show.onclick=()=>{questionBankId=v.id;questionBankPage=1;bankQuestions();};actions.append(show);
    if(!v.active){const activate=el('button','启用此版本');activate.onclick=()=>activateBank(v);actions.append(activate);}
    box.append(actions);$('bank-versions').append(box);
  });
}
function assessmentDetail(item){
  const body=$('assessment-body');body.replaceChildren(el('p',`${item.user_id} · ${item.version_id}`),el('p',`同步时间：${date(item.submitted_ms)}`),el('pre',JSON.stringify(item.result.dimensions,null,2)));
  item.result.evidence.forEach(e=>{const card=el('section',undefined,'panel');card.append(el('strong',`${e.id} / ${e.dimension} · ${e.score} 分`),el('p',e.prompt),el('p','选择：'+e.observation));body.append(card);});$('assessment-detail').showModal();
}
$('assessment-close').onclick=()=>$('assessment-detail').close();
async function activateBank(v){
  const scope=v.kind==='relaxation'?`减压题库，可投放 ${v.activeCount} 题，待修订 ${v.heldCount} 题；不替换计分题库`:`计分题库 ${v.count} 题`;
  if(!confirm(`启用 ${v.name}（${scope}）？仅影响下一轮新测评，历史题表继续保留。`))return;
  try{await api('/question-banks/'+v.id+'/activate','POST');$('bank-feedback').textContent='版本已启用，下次新测评会从这里抽题。';load();}catch(e){$('bank-feedback').textContent=e.message;}
}
$('bank-upload').onsubmit=async e=>{
  e.preventDefault();const file=$('bank-file').files[0];if(!file)return;
  if(file.size>4*1024*1024){$('bank-feedback').textContent='文件最多 4MB';return;}
  $('bank-upload-button').disabled=true;$('bank-feedback').textContent='正在校验题目、选项和来源…';$('bank-preview').replaceChildren();
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),30000);
  try{
    const form=new FormData();form.append('file',file);
    const response=await fetch(root+'/question-banks/import',{method:'POST',credentials:'same-origin',signal:controller.signal,headers:{'X-Admin-CSRF':csrf},body:form});
    const data=await response.json();if(response.status===401)showLogin();
    if(!response.ok)throw new Error([data.error?.message,...(data.errors||[])].join('\n'));
    const countText=data.kind==='relaxation'?`${data.count} 道减压题，可投放 ${data.activeCount}、待修订 ${data.heldCount}`:`${data.count} 道计分题`;
    $('bank-feedback').textContent=data.active?`校验通过，${countText}。该内容已是当前启用版本，无需重复发布。`:`校验通过，${countText}。尚未启用，确认下方差异后再发布。`;
    const p=el('p',`相对启用版本：新增 ${data.added.length}，变化 ${data.changed.length}，移出 ${data.removed.length}。旧题库及已发题表继续保留。`);
    $('bank-preview').append(p);
    const summary=el('details');summary.append(el('summary','查看差异及转换说明'),el('pre',JSON.stringify({added:data.added,changed:data.changed,removed:data.removed,warnings:data.warnings},null,2)));$('bank-preview').append(summary);
    if(!data.active){const b=el('button','确认启用新题库');b.onclick=()=>activateBank(data);$('bank-preview').append(b);}load();
  }catch(e){$('bank-feedback').textContent=e.name==='AbortError'?'校验请求超时，请重试；不会自动启用。':e.message;}
  finally{clearTimeout(timer);$('bank-upload-button').disabled=false;}
};
async function bankQuestions(){
  $('bank-questions').hidden=false;$('bank-items').textContent='正在加载…';
  try{const d=await api('/question-banks/'+questionBankId+'/questions?page='+questionBankPage);$('bank-items').replaceChildren();
    d.items.forEach(q=>{
      const relaxed=q.subtype==='relaxation',item=el('details');
      item.append(el('summary',relaxed?`${q.id} · ${q.category} · ${q.status==='active'?'可投放':'待修订'} · 不计分`:`${q.id} · ${q.dimension} · ${q.pool} · ${q.scene}`),el('p',q.prompt));
      q.options.forEach(o=>item.append(el('p',relaxed?`${o.id}：${o.label}`:`${o.id}（${o.score}分）：${o.label}`)));
      if(relaxed){item.append(el('p','笑点解析：'+q.explanation),el('small',`${q.sourceSheet} 第 ${q.sourceRow} 行`));if(q.reviewReason)item.append(el('p',q.reviewReason,'error'));}
      else item.append(el('small',`${q.sourceRefId} / ${q.sourceLabel}`));
      $('bank-items').append(item);
    });
    $('bank-page').textContent=`第 ${d.page} 页，共 ${d.total} 题`;$('bank-prev').disabled=d.page<=1;$('bank-next').disabled=d.page*20>=d.total;
  }catch(e){$('bank-items').textContent=e.message;}
}
$('bank-prev').onclick=()=>{questionBankPage--;bankQuestions();};$('bank-next').onclick=()=>{questionBankPage++;bankQuestions();};
