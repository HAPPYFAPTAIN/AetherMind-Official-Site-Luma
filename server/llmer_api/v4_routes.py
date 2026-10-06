from fastapi import Depends
from pydantic import BaseModel,ConfigDict,Field
from typing import Literal

class Strict(BaseModel):
    model_config=ConfigDict(extra='forbid',strict=True)
class Draw(Strict):
    mode:Literal['standard','challenge']
    requestId:str=Field(min_length=8,max_length=100)
    recheckOf:str|None=None
    includeDialogues:bool=False
class DialogueChoice(Strict):
    node:str=Field(min_length=1,max_length=100)
    optionId:str=Field(min_length=1,max_length=10)
    revision:int=Field(ge=0,le=20)
class EventBatch(Strict):
    events:list[dict]=Field(min_length=1,max_length=160)
class Answers(Strict):
    answers:list[dict]=Field(max_length=32)
class Reward(Strict):
    source:Literal['ad','share']
    requestId:str=Field(min_length=8,max_length=100)
class Receipt(Strict):
    receipt:str=Field(min_length=8,max_length=200)
    signature:str=Field(min_length=64,max_length=64)
class Aux(Strict):
    kind:Literal['style','exam','dialogue']
    requestId:str=Field(min_length=8,max_length=100)
    questionId:str|None=None

def mount_v4_routes(app,service,current_user):
    root='/api/v1/assessment-v4'
    @app.get(root+'/access')
    def access(user=Depends(current_user)): return service.access(user)
    @app.post(root+'/forms')
    def draw(body:Draw,user=Depends(current_user)): return service.issue_form(user,body.mode,body.requestId,body.recheckOf,body.includeDialogues)
    @app.get(root+'/forms/{fid}/dialogues/{sid}')
    def dialogue(fid:str,sid:str,user=Depends(current_user)):return service.form_dialogue(user,fid,sid)
    @app.post(root+'/forms/{fid}/dialogues/{sid}')
    def dialogue_choice(fid:str,sid:str,body:DialogueChoice,user=Depends(current_user)):
        return service.form_dialogue(user,fid,sid,body.model_dump())
    @app.get(root+'/forms/{fid}')
    def form(fid:str,user=Depends(current_user)): return service.get_form(user,fid)
    @app.post(root+'/forms/{fid}/repair')
    def repair(fid:str,user=Depends(current_user)): return service.repair_form(user,fid)
    @app.post(root+'/forms/{fid}/events')
    def events(fid:str,body:EventBatch,user=Depends(current_user)): return service.record_events(user,fid,body.events)
    @app.post(root+'/forms/{fid}/result')
    def result(fid:str,body:Answers,user=Depends(current_user)): return service.save_result(user,fid,body.answers)
    @app.get(root+'/history')
    def history(user=Depends(current_user)): return service.history(user)
    @app.post(root+'/rewards')
    def reward(body:Reward,user=Depends(current_user)): return service.create_reward(user,body.source,body.requestId)
    @app.get(root+'/rewards/{rid}')
    def reward_status(rid:str,user=Depends(current_user)): return service.reward_status(user,rid)
    @app.post(root+'/rewards/{rid}/simulate')
    def simulate(rid:str,user=Depends(current_user)): return service.reward_status(user,rid,True)
    @app.post(root+'/rewards/{rid}/verified')
    def verify(rid:str,body:Receipt): return service.verify_reward(rid,body.receipt,body.signature)
    @app.post(root+'/practice')
    def aux(body:Aux,user=Depends(current_user)): return service.aux_start(user,body.kind,body.requestId,body.questionId)
    @app.post(root+'/practice/{rid}/answer')
    def aux_answer(rid:str,body:dict,user=Depends(current_user)): return service.aux_answer(user,rid,body)
    @app.get(root+'/profile')
    def profile(user=Depends(current_user)): return service.profile(user)
    @app.patch(root+'/profile')
    def wear(body:dict,user=Depends(current_user)): return service.profile(user,body)
