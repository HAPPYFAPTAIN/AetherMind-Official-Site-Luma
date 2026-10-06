# Official account service

`llmer_api/` is a source snapshot of the isolated official-site service deployed at
`/srv/aethericai-auth/releases/20261005T141106Z`, retrieved on 2026-10-06. It does not
contain production data or secrets. This copy belongs to the official website;
the mini-program service and its source checkout are independent.

`official_api/` mounts the account workspace on the existing SMS, session and
community contracts. Run `python -m official_api` with the existing protected
environment file. Additive `official_*` tables live in the existing official-site
SQLite database; role and balance checks run inside write transactions.

Run tests with `.venv/bin/python -m pytest tests`. Bootstrap the owner using
`python -m official_api.bootstrap --phone <verified-phone>` on the server with its
existing hash secret; the phone is matched by the existing keyed hash. The command
refuses to replace a different owner. No first-user elevation or client-side
phone allowlist exists.

All integrations use `/api/v1/console/integrations/usage` and a product-scoped key
issued by the owner. User sessions cannot submit usage events. The server records
usage and debits quota/points atomically, and rejects conflicting duplicate event
IDs. Real historical product usage is not inferred from logins or purchases.
