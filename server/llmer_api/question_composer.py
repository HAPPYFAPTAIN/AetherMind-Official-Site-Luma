"""Server-owned placement, diversity and option-order rules for a complete round."""
import copy
import json
import random
from functools import lru_cache
from pathlib import Path


@lru_cache(maxsize=1)
def composition_contract():
    return json.loads((Path(__file__).parent/'data'/'question-composer.json').read_text())


def compose_round(questions, recent_ids=(), relaxation_items=None, rng=None, shuffle_relaxation=False):
    rules=composition_contract()
    rng=rng or random.SystemRandom()
    excluded=set(recent_ids)
    selected=[];categories=set()
    def choose(candidates):
        preferred=[q for q in candidates if q['id'] not in excluded and q['category'] not in categories]
        fallback=[q for q in candidates if q['id'] in excluded and q['category'] not in categories]
        group=preferred or fallback
        if not group:raise ValueError('QUESTION_COMPOSITION_INCOMPLETE')
        item=copy.deepcopy(rng.choice(group));categories.add(item['category'])
        return item
    relaxation=[q for q in relaxation_items or [] if q['status']=='active']
    guaranteed_slot=rng.choice((8,14,20)) if relaxation else None
    # Keep the opening/closing icebreakers; new brainteasers join the between-question slots.
    for position in rules['positions']:
        candidates=relaxation if position==guaranteed_slot else rules['items']
        selected.append(choose(candidates))
    if len(selected)!=6 or len(questions)!=18:raise ValueError('QUESTION_COMPOSITION_INCOMPLETE')
    scored=iter(questions);ice=iter(selected)
    slots=[(next(ice) if i in rules['positions'] else next(scored))['id'] for i in range(1,25)]
    orders={}
    for q in questions+selected:
        # Only a client that understands the new display-order contract opts in.
        # Existing frozen forms and older clients retain their original order.
        if shuffle_relaxation and q.get('subtype')=='relaxation':
            q['optionOrderFixed']=False
            q['displayOrderVersion']='relaxation-shuffled-1.0.0'
        orders[q['id']]=[o['id'] for o in q['options']]
        if not q.get('optionOrderFixed'):rng.shuffle(orders[q['id']])
    return {'version':rules['version'],'icebreakerBankVersion':rules['bankVersion'],
        'icebreakerContentRevision':rules['contentRevision'],'positions':rules['positions'],
        'icebreakers':selected,'questionIds':slots,'optionOrderByQuestionId':orders}
