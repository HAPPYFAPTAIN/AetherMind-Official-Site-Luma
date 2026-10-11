-- 0003 统一计量：费率目录、模型目录与用量表扩展列。
CREATE TABLE official_rates (
    id TEXT PRIMARY KEY,
    scope TEXT NOT NULL CHECK(scope IN ('product-unit','llm-model','hpc-core-minute')),
    key TEXT NOT NULL,
    points_per_unit INTEGER NOT NULL DEFAULT 0 CHECK(points_per_unit >= 0),
    points_per_mtok_input INTEGER NOT NULL DEFAULT 0 CHECK(points_per_mtok_input >= 0),
    points_per_mtok_cached INTEGER NOT NULL DEFAULT 0 CHECK(points_per_mtok_cached >= 0),
    points_per_mtok_output INTEGER NOT NULL DEFAULT 0 CHECK(points_per_mtok_output >= 0),
    updated_at_ms INTEGER NOT NULL, updated_by TEXT,
    UNIQUE(scope, key)
);
CREATE TABLE official_llm_models (
    model TEXT PRIMARY KEY, provider TEXT NOT NULL, upstream_model TEXT NOT NULL,
    enabled INTEGER NOT NULL DEFAULT 1, updated_at_ms INTEGER NOT NULL
);
ALTER TABLE official_usage ADD COLUMN model TEXT;
ALTER TABLE official_usage ADD COLUMN core_minutes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE official_usage ADD COLUMN shortfall INTEGER NOT NULL DEFAULT 0;
-- official_usage 表级已声明 UNIQUE(product_id, event_id)，此处补具名唯一索引便于后续迁移引用。
CREATE UNIQUE INDEX IF NOT EXISTS official_usage_product_event ON official_usage(product_id, event_id);
INSERT INTO official_rates(id, scope, key, points_per_unit, updated_at_ms)
  SELECT lower(hex(randomblob(16))), 'product-unit', id, unit_point_cost, {now_ms}
  FROM official_products WHERE unit_point_cost > 0;
INSERT OR IGNORE INTO official_rates(id, scope, key, points_per_unit, updated_at_ms)
  SELECT lower(hex(randomblob(16))), 'product-unit', id, 0, {now_ms}
  FROM official_products;

-- Official pricing rule: every 10 tokens cost 1 point, and every 10 HPC
-- core-minutes cost 1 point. Rates are stored per million tokens for the
-- token dimensions and per ten-minute block for HPC.
INSERT OR IGNORE INTO official_llm_models(model, provider, upstream_model, enabled, updated_at_ms)
VALUES
  ('deepseek-v4-pro', 'deepseek', 'deepseek-v4-pro', 1, {now_ms}),
  ('kimi-k2.7-code-highspeed', 'kimi', 'kimi-k2.7-code-highspeed', 1, {now_ms});
INSERT OR IGNORE INTO official_rates(id, scope, key, points_per_mtok_input, points_per_mtok_cached, points_per_mtok_output, updated_at_ms)
VALUES
  (lower(hex(randomblob(16))), 'llm-model', 'deepseek-v4-pro', 100000, 100000, 100000, {now_ms}),
  (lower(hex(randomblob(16))), 'llm-model', 'kimi-k2.7-code-highspeed', 100000, 100000, 100000, {now_ms});
INSERT OR IGNORE INTO official_rates(id, scope, key, points_per_unit, updated_at_ms)
VALUES
  (lower(hex(randomblob(16))), 'hpc-core-minute', 'md-exp', 1, {now_ms}),
  (lower(hex(randomblob(16))), 'hpc-core-minute', 'platform', 1, {now_ms}),
  (lower(hex(randomblob(16))), 'hpc-core-minute', 'lammps', 1, {now_ms});
