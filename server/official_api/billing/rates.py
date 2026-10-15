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


class UserModelAccessEdit(Strict):
    models: list[str] = Field(default_factory=list, max_length=500)


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


def effective_models(c, user_id: str | None = None):
    """Global enabled models plus explicit per-user grants, with revocations winning."""
    if user_id is None:
        return [dict(r) for r in c.execute("SELECT * FROM official_llm_models WHERE enabled=1 ORDER BY model LIMIT 500")]
    rows = c.execute(
        """SELECT m.*, COALESCE(a.enabled, m.enabled) AS effective_enabled,
                  CASE WHEN a.user_id IS NULL THEN 0 ELSE 1 END AS user_override
           FROM official_llm_models m
           LEFT JOIN official_user_llm_models a ON a.model=m.model AND a.user_id=?
           WHERE COALESCE(a.enabled, m.enabled)=1
           ORDER BY m.model LIMIT 500""",
        (user_id,),
    ).fetchall()
    return [dict(r) for r in rows]


def user_model_access(c, user_id: str):
    all_models = [dict(r) for r in c.execute("SELECT model,provider,upstream_model,enabled FROM official_llm_models ORDER BY model LIMIT 500")]
    grants = {row[0] for row in c.execute("SELECT model FROM official_user_llm_models WHERE user_id=? AND enabled=1", (user_id,))}
    return [
        {**item, "global_enabled": bool(item["enabled"]), "granted": item["model"] in grants,
         "effective": bool(item["enabled"]) or item["model"] in grants}
        for item in all_models
    ]


def set_user_model_access(w, c, user_id: str, models: list[str], actor: str):
    known = {row[0] for row in c.execute("SELECT model FROM official_llm_models")}
    requested = sorted(set(models))
    if not set(requested) <= known:
        raise ApiError(400, "MODEL_NOT_FOUND", "授权列表包含不存在的模型")
    if not c.execute("SELECT 1 FROM users WHERE id=?", (user_id,)).fetchone():
        raise ApiError(404, "USER_NOT_FOUND", "用户不存在")
    c.execute("DELETE FROM official_user_llm_models WHERE user_id=?", (user_id,))
    now = w.now()
    c.executemany(
        "INSERT INTO official_user_llm_models(user_id,model,enabled,updated_at_ms,updated_by) VALUES(?,?,1,?,?)",
        [(user_id, model, now, actor) for model in requested],
    )
    return user_model_access(c, user_id)


def set_model(w, c, data):
    now = w.now()
    c.execute(
        """INSERT INTO official_llm_models VALUES(?,?,?,?,?)
           ON CONFLICT(model) DO UPDATE SET provider=excluded.provider,
               upstream_model=excluded.upstream_model, enabled=excluded.enabled,
               updated_at_ms=excluded.updated_at_ms""",
        (data.model, data.provider, data.upstreamModel, int(data.enabled), now),
    )
    # New routes follow the confirmed default billing rule (10 tokens = 1
    # point) until the owner chooses a model-specific rate in Usage rates.
    c.execute(
        """INSERT OR IGNORE INTO official_rates(
             id,scope,key,points_per_unit,points_per_mtok_input,
             points_per_mtok_cached,points_per_mtok_output,updated_at_ms,updated_by)
           VALUES(?,?,?,?,?,?,?,?,?)""",
        (random_id(), "llm-model", data.model, 0, 100000, 100000, 100000, now, "SYSTEM_DEFAULT"),
    )
    return dict(c.execute('SELECT * FROM official_llm_models WHERE model=?', (data.model,)).fetchone())
