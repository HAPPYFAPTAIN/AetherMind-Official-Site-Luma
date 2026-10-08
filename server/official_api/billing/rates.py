"""统一计量费率目录：单位用量、模型 token 与算力核时。"""
from __future__ import annotations

import math

from pydantic import Field

from ..crypto import random_id
from ..errors import ApiError
from ..http import Strict

TOKENS_PER_POINT = 10
TOKENS_PER_MTOK = 1_000_000
POINTS_PER_MTOK = TOKENS_PER_MTOK // TOKENS_PER_POINT
CORE_MINUTES_PER_POINT = 10


class RateEdit(Strict):
    scope: str = Field(pattern=r'^(product-unit|llm-model|hpc-core-minute)$')
    key: str = Field(min_length=1, max_length=120)
    pointsPerUnit: int = Field(default=0, ge=0, le=1_000_000_000)
    pointsPerMtokInput: int = Field(default=0, ge=0, le=1_000_000_000)
    pointsPerMtokCached: int = Field(default=0, ge=0, le=1_000_000_000)
    pointsPerMtokOutput: int = Field(default=0, ge=0, le=1_000_000_000)


class ModelEdit(Strict):
    model: str = Field(min_length=1, max_length=120)
    provider: str = Field(min_length=1, max_length=80)
    upstreamModel: str = Field(min_length=1, max_length=120)
    enabled: bool = True


def _rate(c, scope, key):
    row = c.execute('SELECT * FROM official_rates WHERE scope=? AND key=?', (scope, key)).fetchone()
    if not row:
        raise ApiError(409, 'RATE_MISSING', f'缺少 {scope} / {key} 的计费费率，请联系管理员配置')
    return row


def price(c, *, product_id, model=None, units=0, input_tokens=0, cached_tokens=0, output_tokens=0, core_minutes=0) -> int:
    """按费率目录计价；token 每笔按总量向上取整，HPC 每十核分钟一计费块。"""
    total = 0
    if units:
        total += units * _rate(c, 'product-unit', product_id)['points_per_unit']
    if model:
        rate = _rate(c, 'llm-model', model)
        numerator = ((input_tokens - cached_tokens) * rate['points_per_mtok_input']
                     + cached_tokens * rate['points_per_mtok_cached']
                     + output_tokens * rate['points_per_mtok_output'])
        total += math.ceil(numerator / 1_000_000)
    if core_minutes:
        # User-facing HPC pricing is one point per ten core-minutes. The
        # stored rate is points per billing block so integer accounting stays
        # exact and there is no fractional wallet balance.
        total += math.ceil(core_minutes / CORE_MINUTES_PER_POINT) * _rate(c, 'hpc-core-minute', product_id)['points_per_unit']
    return total


def get_rates(c):
    return [dict(r) for r in c.execute('SELECT * FROM official_rates ORDER BY scope, key LIMIT 500')]


def set_rate(w, c, data, actor):
    now = w.now()
    c.execute(
        """INSERT INTO official_rates VALUES(?,?,?,?,?,?,?,?,?)
           ON CONFLICT(scope, key) DO UPDATE SET points_per_unit=excluded.points_per_unit,
               points_per_mtok_input=excluded.points_per_mtok_input,
               points_per_mtok_cached=excluded.points_per_mtok_cached,
               points_per_mtok_output=excluded.points_per_mtok_output,
               updated_at_ms=excluded.updated_at_ms, updated_by=excluded.updated_by""",
        (random_id(), data.scope, data.key, data.pointsPerUnit, data.pointsPerMtokInput,
         data.pointsPerMtokCached, data.pointsPerMtokOutput, now, actor),
    )
    return dict(c.execute('SELECT * FROM official_rates WHERE scope=? AND key=?', (data.scope, data.key)).fetchone())


def get_models(c):
    return [dict(r) for r in c.execute('SELECT * FROM official_llm_models ORDER BY model LIMIT 500')]


def set_model(w, c, data):
    now = w.now()
    c.execute(
        """INSERT INTO official_llm_models VALUES(?,?,?,?,?)
           ON CONFLICT(model) DO UPDATE SET provider=excluded.provider,
               upstream_model=excluded.upstream_model, enabled=excluded.enabled,
               updated_at_ms=excluded.updated_at_ms""",
        (data.model, data.provider, data.upstreamModel, int(data.enabled), now),
    )
    return dict(c.execute('SELECT * FROM official_llm_models WHERE model=?', (data.model,)).fetchone())
