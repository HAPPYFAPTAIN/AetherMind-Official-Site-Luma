"""Frozen HumanBench dialogue trees, evaluated one user choice at a time.

The supplied workbook owns the text and branches. Only the current node is
public; no eval, inferred answers, model call, or invented branch is involved.
"""
import copy
import random
import re
from .errors import ApiError

def text(value):
    # Endings in the source can contain emphasis markup. Canvas renders text.
    return re.sub(r'<[^>]*>', '', str(value or ''))

def options_at(question,node):
    return question.get('rawOptions',[]) if node=='root' else question.get('dialogueNodes',{}).get(node,[])

def valid_tree(question):
    def visit(node,ancestors):
        if node in ancestors or len(ancestors)>=20:return False
        options=options_at(question,node)
        if not isinstance(options,list) or not options:return False
        for option in options:
            if not isinstance(option,dict) or not option.get('t'):return False
            if option.get('go'):
                if not visit(option['go'],ancestors|{node}):return False
            elif not isinstance(option.get('end'),dict) or not option['end'].get('title'):return False
        return True
    return bool(question.get('prompt')) and visit('root',set())

def create_state(question,stage_id,after):
    if not valid_tree(question):raise ApiError(503,'DIALOGUE_TREE_INVALID','情境题分支不完整，请稍后重试')
    order={}
    for node in ['root',*question.get('dialogueNodes',{})]:
        indices=list(range(len(options_at(question,node))));random.SystemRandom().shuffle(indices);order[node]=indices
    return {'id':stage_id,'after':after,'question':copy.deepcopy(question),'node':'root',
        'messages':[{'side':'peer','text':question['prompt']}],'choices':[],'completed':False,'orders':order}

def public_state(state):
    q=state['question'];current=[] if state['completed'] else options_at(q,state['node'])
    indices=state['orders'].get(state['node'],list(range(len(current))))
    return {'id':state['id'],'after':state['after'],'questionId':q['id'],
        'title':q.get('scene') or '情境对话','scene':q.get('dialogueScene') or '',
        'kind':'dialogue','scored':False,'node':state['node'],'revision':len(state['choices']),
        'messages':state['messages'],'completed':state['completed'],
        'options':[{'id':str(i),'label':text(current[i]['t']),'thinking':text(current[i].get('think'))} for i in indices] if current else [],
        'ending':state.get('ending')}

def choose(state,node,option_id,revision):
    # Revision+node+stable source index permit safe replay after a lost response.
    if type(revision) is not int or revision<0:raise ApiError(400,'DIALOGUE_CHOICE_INVALID','对话选择无效')
    choices=state['choices']
    if revision<len(choices):
        if choices[revision]=={'node':node,'optionId':option_id}:return False
        raise ApiError(409,'DIALOGUE_CHOICE_FROZEN','这一轮回复已保存，请同步当前对话')
    if revision!=len(choices) or state['completed'] or node!=state['node']:
        raise ApiError(409,'DIALOGUE_STALE','对话已更新，请同步后继续')
    options=options_at(state['question'],node)
    if not isinstance(option_id,str) or not option_id.isdigit() or str(int(option_id))!=option_id or int(option_id)>=len(options):
        raise ApiError(400,'DIALOGUE_CHOICE_INVALID','请选择当前显示的回复')
    option=options[int(option_id)]
    if option.get('think'):state['messages'].append({'side':'think','text':text(option['think'])})
    state['messages'].append({'side':'self','text':text(option['t'])})
    if option.get('reply'):state['messages'].append({'side':'peer','text':text(option['reply'])})
    choices.append({'node':node,'optionId':option_id})
    if option.get('go'):state['node']=option['go']
    else:
        state['completed']=True
        ending=option['end'];state['ending']={'title':text(ending['title']),'text':text(ending.get('text'))}
    return True
