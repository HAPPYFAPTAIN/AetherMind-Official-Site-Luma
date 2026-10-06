"""Import the supplied non-scoring brainteaser format without inventing missing rows."""
import hashlib
import json
import math
import re

HEADERS = ['题目ID','分类','类型','是否计分','题干','A选项（陷阱）','A风格标签','A新颖度','A温暖度','A直接度',
           'B选项（正确）','B风格标签','B新颖度','B温暖度','B直接度','笑点解析']
CATEGORIES = ('身份反转型','谐音梗型','生活常识反杀型','无厘头脑洞型','终极送分型')
# Exact source-content editorial hold. A corrected question is reviewed on re-import.
REVIEW_HOLDS = {'3d3f4fb8a44580166b6f96ad73f5031ea5aa2a7c074109cabee28622126825ed': '含种族贬损内容，待修订后投放'}


def parse_relaxation(book):
    from .question_bank import BankValidationError
    sheet=book['减压题库'];sheet.reset_dimensions()
    rows=sheet.iter_rows(max_col=25,values_only=True)
    header=None;records=[];seen=set();errors=[];warnings=[];source_version=''
    for number,values in enumerate(rows,1):
        if number>2006:
            errors.append('减压题库最多 2000 道题，请删除多余空行');break
        if not any(v is not None for v in values):continue
        if header is None:
            match=re.search(r'relaxation-bank-[0-9.]+',str(values[0] or ''))
            if match:source_version=match[0]
            if values[0]=='题目ID':
                header=list(values)
                missing=[h for h in HEADERS if h not in header]
                if missing:raise BankValidationError(['减压题库缺少字段：'+', '.join(missing)])
                if len([h for h in header if h])!=len(set(h for h in header if h)):
                    raise BankValidationError(['减压题库存在重复表头'])
            elif number>5:raise BankValidationError(['减压题库表头应在第 1 至 5 行'])
            continue
        row=dict(zip(header,values));loc=f'减压题库 第 {number} 行'
        try:
            def text(key,limit=600):
                value=str(row.get(key) or '').strip()
                if not value:raise ValueError(key+' 不能为空')
                if value.startswith('='):raise ValueError(key+' 必须填值，不能使用公式')
                if len(value)>limit:raise ValueError(key+f' 最多 {limit} 字符')
                return value
            qid=text('题目ID',80)
            if not re.fullmatch(r'REL-[0-9]{3,6}',qid):raise ValueError('题目ID须为 REL-数字编号')
            if qid in seen:raise ValueError('题目ID重复 '+qid)
            seen.add(qid)
            category=text('分类',80)
            if category not in CATEGORIES:raise ValueError('分类不在允许的 5 类中')
            if text('是否计分',10)!='否':raise ValueError('减压题不能计分，请填写“否”')
            if text('类型',40)!='脑筋急转弯':raise ValueError('类型须为“脑筋急转弯”')
            prompt=text('题干',1200);explanation=text('笑点解析',1200);options=[]
            for letter,label_key in [('A','A选项（陷阱）'),('B','B选项（正确）')]:
                style={}
                for key,field in [('novelty','新颖度'),('warmth','温暖度'),('directness','直接度')]:
                    value=row.get(letter+field)
                    if type(value) not in (int,float) or not math.isfinite(value) or not 0<=value<=3:
                        raise ValueError(letter+field+' 须为 0 至 3 的数字')
                    style[key]=value
                options.append({'id':letter,'label':text(label_key),'vibe':text(letter+'风格标签',80),'style':style})
            if options[0]['label']==options[1]['label']:raise ValueError('两个选项文本不能相同')
            fingerprint=hashlib.sha256(json.dumps([prompt,*[o['label'] for o in options]],ensure_ascii=False,separators=(',',':')).encode()).hexdigest()
            reason=REVIEW_HOLDS.get(fingerprint)
            records.append({'id':qid,'type':'icebreaker','subtype':'relaxation','sourceType':'脑筋急转弯',
                'scored':False,'category':category,'prompt':prompt,'options':options,'explanation':explanation,
                'correctOptionId':None if '没有正确答案' in prompt else 'B','optionOrderFixed':True,
                'status':'review_required' if reason else 'active','reviewReason':reason,
                'sourceSheet':'减压题库','sourceRow':number})
            if reason:warnings.append(loc+' '+qid+'：'+reason)
        except ValueError as error:errors.append(loc+'：'+str(error))
    if not header:errors.append('缺少减压题库表头')
    if not records:errors.append('没有可导入的减压题')
    if not any(q['status']=='active' for q in records):errors.append('没有可投放的减压题')
    if errors:raise BankValidationError(errors)
    declared=None
    if '总览与自动质检' in book.sheetnames:
        for values in book['总览与自动质检'].iter_rows(max_row=30,max_col=4,values_only=True):
            if values[0]=='总题数' and type(values[1]) is int:declared=values[1]
    missing=[]
    if declared is not None and declared!=len(records):
        warnings.insert(0,f'总览声明 {declared} 题，实际读取 {len(records)} 题；按实际数据导入，不补造缺失题目')
        if 0<declared<=2000:missing=[f'REL-{i:03}' for i in range(1,declared+1) if f'REL-{i:03}' not in seen]
        if missing:warnings.append('缺少编号：'+', '.join(missing))
    return {'kind':'relaxation','sourceVersion':source_version,'declaredCount':declared,'missingIds':missing,
            'questions':records,'sources':[],'warnings':warnings}
