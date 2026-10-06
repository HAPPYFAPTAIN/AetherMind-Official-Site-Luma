"""Safe display data for Canvas; executable/HTML source never reaches renderer."""
from defusedxml import ElementTree
from defusedxml.common import DefusedXmlException
from .v4_dialogue import text

def presentation(question):
    original=question.get('rawMetadata',{}).get('originalMetadata',{})
    if not isinstance(original,dict):original={}
    value={'kind':'role_choice' if original.get('u') else 'choice'}
    if original.get('u'):value['message']=text(original['u'])
    blocks=[]
    for key,label in [('term','终端内容'),('code','代码片段'),('mail','邮件内容'),('quote','材料')]:
        raw=original.get(key)
        if isinstance(raw,str) and raw:blocks.append({'kind':key,'label':label,'text':text(raw) if key=='mail' else raw})
    if blocks:value['blocks']=blocks
    # The supplied eight NH-D SVG tables are text-only duplicate-data aids.
    # Extract text coordinates; never execute SVG scripts or remote resources.
    if question.get('assetType')=='表格' and question['id'].startswith('NH-D-'):
        try:
            root=ElementTree.fromstring(question['assetSource']);rows={}
            for node in root.iter():
                if node.tag.rsplit('}',1)[-1]!='text':continue
                y=float(node.attrib.get('y',0));x=float(node.attrib.get('x',0))
                if y<65:continue
                rows.setdefault(y,[]).append((x,''.join(node.itertext())))
            table=[[t for _,t in sorted(cells)] for _,cells in sorted(rows.items())]
            if table and len(table)<=12 and all(1<=len(r)<=6 for r in table):value['table']=table
        except (ValueError,KeyError,ElementTree.ParseError,DefusedXmlException):pass
    return value
