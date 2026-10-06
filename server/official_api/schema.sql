CREATE TABLE IF NOT EXISTS official_roles (
    user_id TEXT PRIMARY KEY REFERENCES users(id),
    role TEXT NOT NULL CHECK(role IN ('OWNER','ADMIN','USER')),
    updated_at_ms INTEGER NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS official_one_owner ON official_roles(role) WHERE role='OWNER';
CREATE TABLE IF NOT EXISTS official_wallets (
    user_id TEXT PRIMARY KEY REFERENCES users(id),
    balance INTEGER NOT NULL DEFAULT 0 CHECK(balance >= 0)
);
CREATE TABLE IF NOT EXISTS official_products (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, name_en TEXT NOT NULL, description TEXT NOT NULL,
    image TEXT NOT NULL DEFAULT '', entry_url TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'COMING_SOON' CHECK(status IN ('AVAILABLE','COMING_SOON')),
    price INTEGER NOT NULL DEFAULT 0 CHECK(price >= 0),
    package_units INTEGER NOT NULL DEFAULT 0 CHECK(package_units >= 0),
    package_days INTEGER NOT NULL DEFAULT 0 CHECK(package_days >= 0),
    unit_point_cost INTEGER NOT NULL DEFAULT 0 CHECK(unit_point_cost >= 0)
);
CREATE TABLE IF NOT EXISTS official_admin_products (
    user_id TEXT NOT NULL REFERENCES users(id), product_id TEXT NOT NULL REFERENCES official_products(id),
    PRIMARY KEY(user_id, product_id)
);
CREATE TABLE IF NOT EXISTS official_entitlements (
    user_id TEXT NOT NULL REFERENCES users(id), product_id TEXT NOT NULL REFERENCES official_products(id),
    units INTEGER NOT NULL DEFAULT 0 CHECK(units >= 0), expires_at_ms INTEGER,
    PRIMARY KEY(user_id, product_id)
);
CREATE TABLE IF NOT EXISTS official_ledger (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id),
    delta INTEGER NOT NULL, balance_after INTEGER NOT NULL CHECK(balance_after >= 0),
    kind TEXT NOT NULL, product_id TEXT, reason TEXT NOT NULL,
    actor_id TEXT REFERENCES users(id), request_key TEXT NOT NULL,
    fingerprint TEXT NOT NULL, created_at_ms INTEGER NOT NULL,
    UNIQUE(user_id, request_key)
);
CREATE INDEX IF NOT EXISTS official_ledger_time ON official_ledger(user_id, created_at_ms);
CREATE TABLE IF NOT EXISTS official_batches (
    id TEXT PRIMARY KEY, label TEXT NOT NULL, created_by TEXT NOT NULL REFERENCES users(id),
    assigned_to TEXT REFERENCES users(id), product_id TEXT REFERENCES official_products(id),
    credits INTEGER NOT NULL CHECK(credits >= 0), units INTEGER NOT NULL CHECK(units >= 0),
    days INTEGER NOT NULL CHECK(days >= 0), quantity INTEGER NOT NULL CHECK(quantity BETWEEN 1 AND 500),
    expires_at_ms INTEGER NOT NULL, revoked_at_ms INTEGER, created_at_ms INTEGER NOT NULL,
    request_id TEXT NOT NULL, fingerprint TEXT NOT NULL, UNIQUE(created_by, request_id)
);
CREATE TABLE IF NOT EXISTS official_codes (
    code_hash TEXT PRIMARY KEY, suffix TEXT NOT NULL, batch_id TEXT NOT NULL REFERENCES official_batches(id),
    redeemed_by TEXT REFERENCES users(id), redeemed_for TEXT REFERENCES users(id), redeemed_at_ms INTEGER
);
CREATE INDEX IF NOT EXISTS official_codes_batch ON official_codes(batch_id);
CREATE TABLE IF NOT EXISTS official_purchases (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id),
    product_id TEXT NOT NULL REFERENCES official_products(id), price INTEGER NOT NULL,
    units INTEGER NOT NULL, days INTEGER NOT NULL, created_at_ms INTEGER NOT NULL,
    request_key TEXT NOT NULL, UNIQUE(user_id, request_key)
);
CREATE TABLE IF NOT EXISTS official_usage (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), product_id TEXT NOT NULL REFERENCES official_products(id),
    event_id TEXT NOT NULL, fingerprint TEXT NOT NULL,
    units INTEGER NOT NULL CHECK(units > 0), points INTEGER NOT NULL CHECK(points >= 0),
    input_tokens INTEGER NOT NULL CHECK(input_tokens >= 0), cached_tokens INTEGER NOT NULL CHECK(cached_tokens >= 0),
    output_tokens INTEGER NOT NULL CHECK(output_tokens >= 0), created_at_ms INTEGER NOT NULL,
    UNIQUE(product_id, event_id)
);
CREATE INDEX IF NOT EXISTS official_usage_user ON official_usage(user_id, created_at_ms);
CREATE TABLE IF NOT EXISTS official_integration_keys (
    id TEXT PRIMARY KEY, product_id TEXT NOT NULL REFERENCES official_products(id), key_hash TEXT NOT NULL UNIQUE,
    suffix TEXT NOT NULL, revoked_at_ms INTEGER, created_at_ms INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS official_audit (
    id TEXT PRIMARY KEY, actor_id TEXT NOT NULL REFERENCES users(id), target_id TEXT,
    action TEXT NOT NULL, detail TEXT NOT NULL, created_at_ms INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS official_attempts (
    user_id TEXT NOT NULL, created_at_ms INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS official_attempt_time ON official_attempts(user_id, created_at_ms);
