-- 0001 基线：各保留模块现行建表语句的并集（含历史增量列的最终形态）。
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    phone_hash TEXT NOT NULL UNIQUE,
    phone_last4 TEXT NOT NULL CHECK(length(phone_last4) = 4),
    created_at_ms INTEGER NOT NULL,
    updated_at_ms INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS profiles (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    birth_date TEXT,
    city TEXT,
    occupation TEXT,
    bio TEXT,
    avatar_filename TEXT,
    github_url TEXT,
    twitter_url TEXT,
    updated_at_ms INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS community_profiles (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    city TEXT, bio TEXT, github_url TEXT, twitter_url TEXT,
    updated_at_ms INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS community_posts (
    id TEXT PRIMARY KEY,
    author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'discussion',
    status TEXT NOT NULL CHECK(status IN ('OPEN', 'CLOSED', 'HIDDEN')),
    pinned INTEGER NOT NULL DEFAULT 0 CHECK(pinned IN (0, 1)),
    created_at_ms INTEGER NOT NULL,
    updated_at_ms INTEGER NOT NULL,
    closed_at_ms INTEGER,
    closed_by TEXT REFERENCES users(id) ON DELETE SET NULL,
    close_reason TEXT,
    accepted_reply_id TEXT
);
CREATE INDEX IF NOT EXISTS community_posts_feed_idx
    ON community_posts(status, pinned, updated_at_ms);

CREATE TABLE IF NOT EXISTS community_replies (
    id TEXT PRIMARY KEY,
    post_id TEXT NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
    author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('VISIBLE', 'HIDDEN')),
    created_at_ms INTEGER NOT NULL,
    updated_at_ms INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS community_replies_post_idx
    ON community_replies(post_id, status, created_at_ms);

CREATE TABLE IF NOT EXISTS community_admins (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK(role IN ('ADMIN', 'MODERATOR')),
    created_at_ms INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS community_moderation_events (
    id TEXT PRIMARY KEY,
    actor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id TEXT REFERENCES community_posts(id) ON DELETE CASCADE,
    reply_id TEXT REFERENCES community_replies(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    reason TEXT,
    created_at_ms INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS community_invitations (
    code TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at_ms INTEGER NOT NULL,
    expires_at_ms INTEGER NOT NULL,
    revoked_at_ms INTEGER,
    product_id TEXT
);
CREATE TABLE IF NOT EXISTS community_invitation_members (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    code TEXT NOT NULL REFERENCES community_invitations(code),
    joined_at_ms INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS community_consents (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    version TEXT NOT NULL,
    accepted_at_ms INTEGER NOT NULL,
    PRIMARY KEY(user_id,version)
);

CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    access_hash TEXT NOT NULL UNIQUE,
    refresh_hash TEXT NOT NULL UNIQUE,
    access_expires_at_ms INTEGER NOT NULL,
    refresh_expires_at_ms INTEGER NOT NULL,
    revoked_at_ms INTEGER,
    created_at_ms INTEGER NOT NULL,
    last_used_at_ms INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_access_idx ON sessions(access_hash);
CREATE INDEX IF NOT EXISTS sessions_refresh_idx ON sessions(refresh_hash);

CREATE TABLE IF NOT EXISTS sms_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_hash TEXT NOT NULL,
    ip_hash TEXT NOT NULL,
    kind TEXT NOT NULL CHECK(kind IN ('SEND', 'VERIFY')),
    created_at_ms INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS sms_events_phone_idx
    ON sms_events(phone_hash, kind, created_at_ms);
CREATE INDEX IF NOT EXISTS sms_events_ip_idx
    ON sms_events(ip_hash, kind, created_at_ms);

CREATE TABLE IF NOT EXISTS sms_challenges (
    phone_hash TEXT PRIMARY KEY,
    created_at_ms INTEGER NOT NULL,
    expires_at_ms INTEGER NOT NULL
);

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

CREATE TABLE IF NOT EXISTS official_passwords (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    password_hash TEXT NOT NULL,
    updated_at_ms INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS official_password_challenges (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    challenge_id TEXT NOT NULL UNIQUE,
    phone_hash TEXT NOT NULL,
    sms_created_at_ms INTEGER NOT NULL,
    expires_at_ms INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS official_password_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_hash TEXT NOT NULL,
    ip_hash TEXT NOT NULL,
    created_at_ms INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS official_password_attempt_phone
    ON official_password_attempts(phone_hash, created_at_ms);
CREATE INDEX IF NOT EXISTS official_password_attempt_ip
    ON official_password_attempts(ip_hash, created_at_ms);

CREATE TABLE IF NOT EXISTS official_md_agent_qualifications (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    invitation_code TEXT NOT NULL REFERENCES community_invitations(code),
    created_at_ms INTEGER NOT NULL,
    PRIMARY KEY(user_id, product_id)
);
CREATE TABLE IF NOT EXISTS official_md_agent_bindings (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    md_username TEXT NOT NULL UNIQUE,
    token_ciphertext TEXT NOT NULL,
    created_at_ms INTEGER NOT NULL
);
