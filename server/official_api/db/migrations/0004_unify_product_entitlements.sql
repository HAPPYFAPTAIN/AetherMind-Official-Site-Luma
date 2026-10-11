-- 0004: convert the legacy MD-Agent qualification row into the one product
-- entitlement used by all activation-gated products. Keep the old table for
-- one release so an older binary can still read its historical audit data.
INSERT INTO official_entitlements(user_id, product_id, units, expires_at_ms)
SELECT q.user_id, q.product_id, 1, NULL
FROM official_md_agent_qualifications q
WHERE 1
ON CONFLICT(user_id, product_id) DO UPDATE SET
    units = CASE WHEN official_entitlements.units < excluded.units THEN excluded.units ELSE official_entitlements.units END;
