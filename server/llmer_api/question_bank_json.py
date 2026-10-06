"""JSON question-bank importer used by the admin console.

The JSON contract is deliberately explicit and mirrors the normalized payload
stored by the existing XLSX importer. It supports scored four-option questions
and non-scoring relaxation/icebreaker A/B questions.
"""
import json
import math
import re

from .question_bank import DIMENSIONS, ID_RE, MAX_BYTES, WEIGHTS, BankValidationError
from .relaxation_bank import CATEGORIES


def _text(value, field, limit=1200, required=False):
    value = str(value or '').strip()
    if required and not value:
        raise ValueError(field + ' 不能为空')
    if len(value) > limit:
        raise ValueError(f'{field} 最多 {limit} 字符')
    return value


def _number(value, field, low=None, high=None, integer=False):
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
        raise ValueError(field + ' 必须是数字')
    if integer and int(value) != value:
        raise ValueError(field + ' 必须是整数')
    if low is not None and value < low or high is not None and value > high:
        raise ValueError(f'{field} 超出允许范围')
    return int(value) if integer else value


def _style(option, key):
    style = option.get('style') if isinstance(option.get('style'), dict) else {}
    return _number(style.get(key, option.get(key, 1.5)), f'{option.get("id", "选项")}{key}', 0, 3)


def _parse_relaxation(data):
    errors, warnings, records, seen = [], [], [], set()
    for index, raw in enumerate(data['questions'], 1):
        loc = f'JSON 第 {index} 题'
        try:
            if not isinstance(raw, dict):
                raise ValueError('题目必须是对象')
            qid = _text(raw.get('id') or raw.get('questionId'), '题目ID', 80, True)
            if not re.fullmatch(r'REL-[0-9]{3,6}', qid):
                raise ValueError('题目ID须为 REL-数字编号')
            if qid in seen:
                raise ValueError('题目ID重复 ' + qid)
            seen.add(qid)
            category = _text(raw.get('category'), '分类', 80, True)
            if category not in CATEGORIES:
                raise ValueError('分类不在允许的 5 类中')
            if raw.get('scored', raw.get('isScored', False)) is not False:
                raise ValueError('减压题 scored 必须为 false')
            if _text(raw.get('type') or '脑筋急转弯', '类型', 40, True) != '脑筋急转弯':
                raise ValueError('类型须为“脑筋急转弯”')
            options = raw.get('options')
            if not isinstance(options, list) or len(options) != 2:
                raise ValueError('options 必须包含 A/B 两个选项')
            normalized = []
            for pos, option in enumerate(options):
                if not isinstance(option, dict):
                    raise ValueError('选项必须是对象')
                oid = str(option.get('id') or ('A' if pos == 0 else 'B')).strip()
                if oid not in ('A', 'B'):
                    raise ValueError('减压题选项 ID 只能是 A 或 B')
                normalized.append({'id': oid, 'label': _text(option.get('label') or option.get('text'), f'{oid}选项', 600, True),
                    'vibe': _text(option.get('vibe') or option.get('styleLabel') or '自编', f'{oid}风格标签', 80, True),
                    'style': {key: _style(option, key) for key in ('novelty', 'warmth', 'directness')}})
            if {item['id'] for item in normalized} != {'A', 'B'} or len({item['label'] for item in normalized}) != 2:
                raise ValueError('选项必须是两个不同的 A/B 文本')
            status = _text(raw.get('status') or 'active', '状态', 40)
            if status not in ('active', 'review_required', 'retired'):
                raise ValueError('状态只能是 active/review_required/retired')
            prompt = _text(raw.get('prompt') or raw.get('question'), '题干', 1200, True)
            records.append({'id': qid, 'type': 'icebreaker', 'subtype': 'relaxation', 'sourceType': '脑筋急转弯',
                'scored': False, 'category': category, 'prompt': prompt, 'options': normalized,
                'explanation': _text(raw.get('explanation') or raw.get('jokeExplanation'), '笑点解析', 1200, True),
                'correctOptionId': raw.get('correctOptionId') if raw.get('correctOptionId') in ('A', 'B') else ('B' if '没有正确答案' not in prompt else None),
                'optionOrderFixed': True, 'status': status, 'reviewReason': _text(raw.get('reviewReason'), 'reviewReason', 240),
                'sourceSheet': 'JSON', 'sourceRow': index})
        except ValueError as error:
            errors.append(loc + '：' + str(error))
    if not records:
        errors.append('没有可导入的减压题')
    if not any(item['status'] == 'active' for item in records):
        errors.append('没有可投放的减压题')
    if errors:
        raise BankValidationError(errors)
    declared = data.get('declaredCount') if isinstance(data.get('declaredCount'), int) else None
    missing = [f'REL-{i:03}' for i in range(1, declared + 1) if f'REL-{i:03}' not in seen] if declared and declared <= 2000 else []
    if declared is not None and declared != len(records):
        warnings.append(f'总题数声明 {declared}，实际读取 {len(records)} 题；按实际数据导入')
    if missing:
        warnings.append('缺少编号：' + ', '.join(missing))
    return {'kind': 'relaxation', 'sourceVersion': _text(data.get('version'), 'version', 80),
        'declaredCount': declared, 'missingIds': missing, 'questions': records, 'sources': [], 'warnings': warnings}


def _parse_assessment(data):
    errors, warnings, records, seen = [], [], [], set()
    sources = data.get('sources') if isinstance(data.get('sources'), list) else []
    source_map = {str(item.get('id') or item.get('sourceId')).strip(): item for item in sources if isinstance(item, dict) and (item.get('id') or item.get('sourceId'))}
    for index, raw in enumerate(data['questions'], 1):
        loc = f'JSON 第 {index} 题'
        try:
            if not isinstance(raw, dict):
                raise ValueError('题目必须是对象')
            qid = _text(raw.get('id') or raw.get('questionId'), '题目ID', 80, True)
            if not ID_RE.fullmatch(qid) or qid.startswith('ICE-'):
                raise ValueError('题目ID格式不正确，不能使用 ICE- 前缀')
            if qid in seen:
                raise ValueError('题目ID重复 ' + qid)
            seen.add(qid)
            pool = _text(raw.get('pool'), '题池', 20, True)
            dimension = _text(raw.get('dimension'), '维度', 1, True)
            if pool not in WEIGHTS or dimension not in DIMENSIONS:
                raise ValueError('题池或维度不在允许范围')
            options = raw.get('options')
            if not isinstance(options, list) or len(options) != 4:
                raise ValueError('options 必须包含四个选项')
            normalized = []
            for pos, option in enumerate(options):
                if not isinstance(option, dict):
                    raise ValueError('选项必须是对象')
                oid = str(option.get('id') or f'O{pos + 1}').strip()
                normalized.append({'id': oid, 'label': _text(option.get('label') or option.get('text'), f'{oid}文本', 600, True),
                    'score': _number(option.get('score'), f'{oid}分', 0, 3, True),
                    'style': {key: _style(option, key) for key in ('novelty', 'warmth', 'directness')}})
            if sorted(item['score'] for item in normalized) != [0, 1, 2, 3] or len({item['id'] for item in normalized}) != 4 or len({item['label'] for item in normalized}) != 4:
                raise ValueError('四个选项 ID/文本必须不同，分值须分别为 0、1、2、3')
            source = raw.get('source') if isinstance(raw.get('source'), dict) else {}
            source_id = _text(raw.get('sourceRefId') or raw.get('sourceId') or source.get('id') or source.get('sourceId'), 'sourceRefId', 80, True)
            source = {**source_map.get(source_id, {}), **source}
            label = _text(raw.get('sourceLabel') or raw.get('credit') or source.get('label') or source.get('publicLabel') or '自编题', 'sourceLabel', 200, True)
            url = _text(raw.get('sourceUrl') or source.get('url') or '', 'sourceUrl', 1000)
            if url and not re.match(r'^(https?://|llmer://)', url):
                raise ValueError('sourceUrl 必须以 http(s):// 或 llmer:// 开头')
            status = _text(raw.get('status') or 'candidate/draft', '状态', 40)
            if status not in ('candidate/draft', 'reviewed', 'pilot', 'active', 'retired'):
                raise ValueError('状态不在允许范围')
            prelude = _text(raw.get('prelude') or raw.get('context'), '前置信息', 1200)
            prompt = _text(raw.get('prompt') or raw.get('question'), '题干', 1200, True)
            if prelude:
                prompt = prelude + '\n\n' + prompt
                warnings.append(loc + '：前置信息合并为独立题')
            records.append({'id': qid, 'pool': pool, 'mode': {'anchor': 'shared', 'standard': 'standard', 'challenge': 'challenge'}[pool],
                'dimension': dimension, 'difficulty': _number(raw.get('difficulty'), '难度', 1, 3, True),
                'scene': _text(raw.get('scene'), 'scene', 120, True), 'prompt': prompt, 'options': normalized,
                'facet': _text(raw.get('facet') or 'general', 'facet', 100), 'scoringWeight': _number(raw.get('scoringWeight', 1), 'scoringWeight', 0, 3),
                'continuityRequired': False, 'crossQuestionDependency': False, 'status': status,
                'sourceRefId': source_id, 'sourceLabel': label, 'sourceCategory': _text(raw.get('sourceCategory') or source.get('category') or 'original', 'sourceCategory', 80)})
        except ValueError as error:
            errors.append(loc + '：' + str(error))
    if not records:
        errors.append('没有有效题目')
    active = [item for item in records if item['status'] != 'retired']
    for dimension in DIMENSIONS:
        for pool, minimum in (('anchor', 2), ('standard', 1), ('challenge', 1)):
            count = sum(item['dimension'] == dimension and item['pool'] == pool for item in active)
            if count < minimum:
                errors.append(f'{dimension}/{pool} 至少 {minimum} 题，当前 {count} 题')
    if errors:
        raise BankValidationError(errors)
    return {'kind': 'assessment', 'version': _text(data.get('version'), 'version', 80), 'questions': records,
        'sources': sources, 'warnings': warnings[:100]}


def parse_json(content):
    if len(content) > MAX_BYTES:
        raise BankValidationError(['文件最多 4MB'])
    try:
        data = json.loads(content.decode('utf-8-sig'))
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise BankValidationError(['无法读取 JSON 文件，请使用 UTF-8 编码的 JSON']) from error
    if not isinstance(data, dict) or not isinstance(data.get('questions'), list):
        raise BankValidationError(['JSON 顶层必须是对象，并包含 questions 数组'])
    if len(data['questions']) > 2000:
        raise BankValidationError(['一次最多 2000 题'])
    kind = str(data.get('kind') or data.get('type') or 'assessment').strip().lower()
    if kind in ('relaxation', 'relaxation-bank', 'icebreaker'):
        return _parse_relaxation(data)
    if kind not in ('assessment', 'scored', 'question-bank'):
        raise BankValidationError(['kind 只能是 assessment 或 relaxation'])
    return _parse_assessment(data)
