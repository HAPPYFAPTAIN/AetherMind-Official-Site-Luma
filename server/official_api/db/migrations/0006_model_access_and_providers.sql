-- 0006: owner-managed provider credentials and per-user model grants.
CREATE TABLE IF NOT EXISTS official_llm_providers (
    provider TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    api TEXT NOT NULL DEFAULT 'openai-completions',
    base_url TEXT NOT NULL,
    api_key_ciphertext TEXT,
    enabled INTEGER NOT NULL DEFAULT 1 CHECK(enabled IN (0, 1)),
    updated_at_ms INTEGER NOT NULL,
    updated_by TEXT
);

CREATE TABLE IF NOT EXISTS official_user_llm_models (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    model TEXT NOT NULL REFERENCES official_llm_models(model) ON DELETE CASCADE,
    enabled INTEGER NOT NULL DEFAULT 1 CHECK(enabled IN (0, 1)),
    updated_at_ms INTEGER NOT NULL,
    updated_by TEXT,
    PRIMARY KEY(user_id, model)
);

CREATE INDEX IF NOT EXISTS official_user_llm_models_model_idx
    ON official_user_llm_models(model, enabled);
