"""Game parameter display only; scores, awarded tiers and evidence remain frozen."""
from fractions import Fraction
import math

PARAMETER_MAPPING_VERSION = 'challenge-tier-linear-1'
BANDS = {
    'T1': (0,25,'0.1',1,False,False), 'T2': (25,40,1,7,False,False),
    'T3': (40,55,7,30,False,False), 'T4': (55,70,30,70,False,False),
    'T5': (70,80,70,200,False,False), 'T6': (80,88,200,500,False,False),
    'T7': (88,94,500,1000,False,False), 'T8': (94,98,1000,3000,False,True),
    'T9': (98,100,3000,10000,True,True),
}

def challenge_parameter_b(result):
    if result.get('mode') != 'challenge' or result.get('tierId') not in BANDS:
        return None
    start,end,low,high,open_low,closed_high = BANDS[result['tierId']]
    low,high = Fraction(low),Fraction(high)
    minimum,maximum = low + (Fraction(1,10) if open_low else 0), high - (0 if closed_high else Fraction(1,10))
    prior=result.get('parameterValueB')
    if result.get('parameterMappingVersion') == PARAMETER_MAPPING_VERSION and type(prior) in (int,float) and math.isfinite(prior) and minimum<=prior<=maximum:
        return prior
    try:
        raw=result.get('scoreFraction') or result.get('score')
        if raw is None or isinstance(raw,bool):return None
        score=Fraction(str(raw))
    except (ValueError,ZeroDivisionError):return None
    if not 0<=score<=100:return None
    position=max(Fraction(0),min(Fraction(1),(score-start)/(end-start)))
    value=Fraction(math.floor((low+position*(high-low))*10+Fraction(1,2)),10)
    return float(max(minimum,min(maximum,value)))

def parameter_fields(result):
    return {'parameterValueB':challenge_parameter_b(result),'parameterMappingVersion':PARAMETER_MAPPING_VERSION}

def challenge_parameter_label(result):
    value=challenge_parameter_b(result)
    return '参数待同步' if value is None else f'{value:.1f}B'
