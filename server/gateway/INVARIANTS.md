# Gateway lifecycle invariants

- A `(product_id, X-Event-Id)` claim is inserted under `BEGIN IMMEDIATE`
  before any provider call. A matching pending claim returns 409; a differing
  fingerprint returns 409. There is no retry of a pending/failed provider call.
- A successful provider response is persisted and charged in one SQLite
  transaction. The `official_usage` unique event key makes charge replay safe.
- Missing, malformed, incomplete, or disconnected provider usage never charges.
  A failed event is retained for operator reconciliation and replay returns its
  stored error without another provider call.
- A stream producer owns the provider connection and remains in `Gateway.tasks`
  after a client disconnect. The response queue is bounded; a slow client is
  detached so the producer can finish reading usage and commit billing.
- Shutdown first stops new claims, waits for active tasks, then cancels tasks
  after the configured deadline. Cancellation marks the event as outcome
  unknown and never invents usage.
- Provider credentials are read only from `GATEWAY_PROVIDER_*` environment
  variables. Base URLs must be HTTPS except loopback test URLs, and redirects
  are disabled.
