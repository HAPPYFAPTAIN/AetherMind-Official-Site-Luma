-- 0005 gateway event ledger. Applied by official_api migration runner.
CREATE TABLE IF NOT EXISTS gateway_events (
    product_id TEXT NOT NULL REFERENCES official_products(id),
    event_id TEXT NOT NULL,
    fingerprint TEXT NOT NULL,
    user_id TEXT NOT NULL REFERENCES users(id),
    model TEXT NOT NULL,
    kind TEXT NOT NULL CHECK(kind IN ('chat','embedding')),
    status TEXT NOT NULL CHECK(status IN ('PENDING','COMPLETED','FAILED')),
    response_json TEXT,
    response_content_type TEXT,
    error_json TEXT,
    usage_input_tokens INTEGER,
    usage_cached_tokens INTEGER,
    usage_output_tokens INTEGER,
    charge_id TEXT,
    created_at_ms INTEGER NOT NULL,
    deadline_at_ms INTEGER NOT NULL,
    completed_at_ms INTEGER,
    PRIMARY KEY(product_id, event_id),
    CHECK(usage_input_tokens IS NULL OR usage_input_tokens >= 0),
    CHECK(usage_cached_tokens IS NULL OR usage_cached_tokens >= 0),
    CHECK(usage_output_tokens IS NULL OR usage_output_tokens >= 0)
);
CREATE INDEX IF NOT EXISTS gateway_events_pending_idx ON gateway_events(user_id, product_id, status);
