"""产品目录与产品信息维护。"""
from __future__ import annotations

from typing import Literal
from urllib.parse import urlsplit

from pydantic import Field

from ..errors import ApiError
from ..http import Strict

CATALOG = [
    ('platform', '以太智元平台', 'AethericAI Platform', '统一管理科研任务、算力与研究结果。', 'platform'),
    ('lammps', 'LAMMPS 计算引擎', 'LAMMPS Compute Engine', '分子动力学任务编排、监测与轨迹分析。', 'lammps'),
    ('md-exp', 'MD EXP', 'MD EXP', '分子模拟智能体、模型对话与 dsh 科研工作流。', 'lammps'),
    ('agent', '科学智能体', 'Science Agents', '将研究问题转化为可执行的计算步骤。', 'ai-agent'),
    ('materials', '材料计算', 'Materials Computing', '围绕结构、缺陷和能量景观组织材料研究。', 'materials'),
    ('chemistry', '化学与分子计算', 'Molecular Computing', '分子结构、反应路径与计算结果。', 'chemistry'),
    ('biology', '生物计算', 'Biological Computing', '生物分子建模、结构分析与可复现流程。', 'biology'),
    ('learn-everything', 'Learn Everything 学习 Agent', 'Learn Everything Learning Agent', '从学习路线、知识库问答到复习、测验和学习看板的一体化学习工作台。', 'ai-agent'),
]


class ProductEdit(Strict):
    name: str = Field(min_length=1, max_length=80)
    nameEn: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1, max_length=500)
    entryUrl: str = Field(default='', max_length=500)
    status: Literal['AVAILABLE', 'COMING_SOON']
    price: int = Field(ge=0, le=10_000_000)
    packageUnits: int = Field(ge=0, le=1_000_000)
    packageDays: int = Field(ge=0, le=3650)
    unitPointCost: int = Field(ge=0, le=100_000)


def products(c):
    return [dict(r) for r in c.execute('SELECT * FROM official_products ORDER BY rowid')]


def edit_product(w, actor, pid, data):
    from ..admin.roles import require, audit
    url = urlsplit(data.entryUrl)
    if data.entryUrl and not ((data.entryUrl.startswith('/official/') and not url.netloc and not url.scheme) or (url.scheme == 'https' and url.hostname and not url.username and not url.password)):
        raise ApiError(400, 'INVALID_ENTRY_URL', '入口须为 HTTPS 网址或本站 /official/ 路径')
    if data.status == 'AVAILABLE' and not (data.packageDays or data.packageUnits):
        raise ApiError(400, 'EMPTY_PACKAGE', '上架前需配置权益次数或有效天数')
    with w.db.connect() as c:
        c.execute('BEGIN IMMEDIATE')
        require(c, actor, owner=True)
        if not c.execute('UPDATE official_products SET name=?,name_en=?,description=?,entry_url=?,status=?,price=?,package_units=?,package_days=?,unit_point_cost=? WHERE id=?', (data.name.strip(), data.nameEn.strip(), data.description.strip(), data.entryUrl, data.status, data.price, data.packageUnits, data.packageDays, data.unitPointCost, pid)).rowcount:
            raise ApiError(404, 'PRODUCT_NOT_FOUND', '产品不存在')
        audit(w, c, actor, pid, 'PRODUCT_UPDATED', data.model_dump())
        return {'updated': True}
