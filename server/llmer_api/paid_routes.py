from __future__ import annotations
import asyncio
from fastapi import Depends, File, Form, UploadFile
from fastapi.responses import HTMLResponse, Response
from pydantic import BaseModel, ConfigDict, Field
from typing import Literal
from .errors import ApiError
from .paid_providers import PaidSettings, CompatibleLLM, MidasGateway, WechatIdentity
from .paid_service import PaidService
from .assessment_release import require_legacy_creation, v4_only

class Strict(BaseModel):
    model_config=ConfigDict(extra='forbid',strict=True)
class Login(Strict):
    code:str=Field(min_length=6,max_length=256)
class CaseCreate(Strict):
    contextId:str
    planId:str
    assessment:dict
    consent:bool
    reportMode:Literal['live','simulation']|None=None
class Generate(Strict):
    retry:bool=False
class SimulationConfirm(Strict):
    confirmation:str
class BankDraw(Strict):
    mode:str
    requestId:str=Field(min_length=8,max_length=80)
    includeRelaxation:bool=False
    shuffleRelaxationOptions:bool=False
    refreshQuestions:bool=False
class BankResult(Strict):
    assessment:dict

def mount_paid_routes(app,db,settings,auth,current_user,paid_settings=None,paid_providers=None):
    ps=paid_settings or PaidSettings.from_env()
    providers=paid_providers or {}
    service=PaidService(db,ps,settings.avatar_dir.parent/'paid-materials',
        providers.get('llm') or CompatibleLLM(ps),providers.get('payment') or MidasGateway(ps),
        providers.get('identity') or WechatIdentity(ps))
    app.state.paid_service=service
    from .v4_question_bank import V4QuestionBankService
    service.v4_question_banks = V4QuestionBankService(db)

    @app.post('/api/v1/question-bank/forms')
    def draw_questions(body:BankDraw,user_id:str=Depends(current_user)):
        require_legacy_creation()
        return service.question_banks.issue_form(user_id,body.mode,body.requestId,body.includeRelaxation,body.shuffleRelaxationOptions,body.refreshQuestions)

    @app.get('/api/v1/question-bank/quota')
    def question_quota(user_id:str=Depends(current_user)):
        return service.question_banks.quota(user_id)

    @app.post('/api/v1/question-bank/results')
    def save_question_result(body:BankResult,user_id:str=Depends(current_user)):
        return service.question_banks.save_result(user_id,body.assessment)

    from .v4_routes import mount_v4_routes
    mount_v4_routes(app,service.v4_question_banks,current_user)
    from .challenge_routes import mount_challenge_routes
    mount_challenge_routes(app, service, current_user)

    @app.get('/api/v1/paid/capabilities')
    def capabilities():
        provider=getattr(getattr(app.state,'commerce_service',None),'share_code_provider',None)
        value={**service.capabilities(),'shareCode':getattr(provider,'available',False) is True}
        return {**value,'readyToPurchase':False,'payment':False,'paidEntryEnabled':False,'assessmentProtocol':'assessment-v4'} if v4_only() else value

    @app.post('/api/v1/auth/wechat')
    def login(body:Login):
        identity=service.identity.exchange(body.code)
        with db.connect() as c:
            bound=c.execute('SELECT u.phone_hash,u.phone_last4 FROM users u JOIN paid_identities p ON p.user_id=u.id WHERE p.openid=?',(identity['openid'],)).fetchone()
        # Legacy users table requires four characters; sentinel is never displayed as a phone.
        response=auth._create_login(bound['phone_hash'] if bound else auth.hash('wechat-openid',identity['openid']),bound['phone_last4'] if bound else '----',auth.now())
        service.bind_identity(response['profile']['userId'],identity['openid'])
        response['authProvider'] = 'wechat'
        return response

    @app.post('/api/v1/paid/cases',status_code=201)
    def create(body:CaseCreate,user_id:str=Depends(current_user)):
        require_legacy_creation()
        return service.create_case(user_id,body.contextId,body.planId,body.assessment,body.consent,body.reportMode)

    @app.get('/api/v1/paid/cases')
    def cases(user_id:str=Depends(current_user)):
        return service.list_cases(user_id)

    @app.get('/api/v1/paid/cases/{cid}')
    def get(cid:str,user_id:str=Depends(current_user)):
        return service.get(user_id,cid,verify_entitlement=True)

    @app.post('/api/v1/paid/cases/{cid}/order')
    def order(cid:str,body:Login,user_id:str=Depends(current_user)):
        require_legacy_creation()
        return service.create_order(user_id,cid,body.code)

    @app.post('/api/v1/paid/cases/{cid}/verify')
    def verify(cid:str,user_id:str=Depends(current_user)):
        return service.verify_order(user_id,cid)

    @app.post('/api/v1/paid/cases/{cid}/simulate-payment')
    def simulate(cid:str,body:SimulationConfirm,user_id:str=Depends(current_user)):
        if body.confirmation != 'SIMULATE':
            raise ApiError(400,'SIMULATION_CONFIRM_REQUIRED','请确认模拟支付，不会扣款')
        from .simulation import confirm_simulated_payment
        return confirm_simulated_payment(service,user_id,cid)

    @app.post('/api/v1/paid/cases/{cid}/materials',status_code=201)
    async def upload(cid:str,file:UploadFile=File(...),sceneLabel:str=Form(...),selfRole:str=Form(...),user_id:str=Depends(current_user)):
        content=await file.read(10*1024*1024+1)
        return await asyncio.to_thread(service.add_material,user_id,cid,content,sceneLabel,selfRole)

    @app.delete('/api/v1/paid/cases/{cid}/materials/{mid}',status_code=204)
    def remove(cid:str,mid:str,user_id:str=Depends(current_user)):
        service.delete_material(user_id,cid,mid)

    @app.post('/api/v1/paid/cases/{cid}/generate',status_code=202)
    def generate(cid:str,body:Generate,user_id:str=Depends(current_user)):
        return service.enqueue(user_id,cid,body.retry)

    @app.delete('/api/v1/paid/cases/{cid}')
    def delete(cid:str,user_id:str=Depends(current_user)):
        return service.delete_case(user_id,cid)

    @app.get('/api/v1/paid/cases/{cid}/report.html',response_class=HTMLResponse)
    def html(cid:str,user_id:str=Depends(current_user)):
        from .report_renderer import render_report
        case=service.get(user_id,cid,verify_entitlement=True)
        if not case.get('report'):
            raise ApiError(409,'REPORT_NOT_READY','报告尚未完成或权益不可用')
        return HTMLResponse(render_report(case['report'],case.get('evidenceLedger',[]),case.get('provenance',{})))

    @app.get('/api/v1/paid/cases/{cid}/report.pdf')
    def pdf(cid:str,user_id:str=Depends(current_user)):
        from .report_pdf import render_pdf
        case=service.get(user_id,cid,verify_entitlement=True)
        if not case.get('report'):
            raise ApiError(409,'REPORT_NOT_READY','报告尚未完成或权益不可用')
        content=render_pdf(case['report'],case.get('evidenceLedger',[]),case.get('provenance',{}))
        return Response(content,media_type='application/pdf',headers={'Content-Disposition':'attachment; filename="parameter-human-report.pdf"'})

    return service
