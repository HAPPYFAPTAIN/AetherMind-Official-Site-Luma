#!/bin/sh
# Run only after the Wulanchabu HTTPS/browser acceptance checks pass.
set -eu
snippet=/etc/nginx/snippets/angsheng-official-ip.conf
backup=/var/backups/angsheng-official/20260925-wulanchabu-cutover
candidate=$backup/redirect.conf
test -f "$candidate"
test -f "$snippet"
test -L /opt/angsheng-official/current
test "$(readlink -f /opt/angsheng-official/current)" = /opt/angsheng-official/releases/20260915-clarity-v5
test ! -e "$backup/official-location.before.conf"
cp -a "$snippet" "$backup/official-location.before.conf"
install -m 644 "$candidate" "$snippet"
if ! nginx -t; then
    cp -a "$backup/official-location.before.conf" "$snippet"
    exit 1
fi
if ! systemctl reload nginx; then
    cp -a "$backup/official-location.before.conf" "$snippet"
    nginx -t
    systemctl reload nginx
    exit 1
fi
# Nginx reload is asynchronous. Confirm that a new worker serves the redirect
# before retiring the symlink still used by a draining old worker.
attempt=0
while [ "$attempt" -lt 10 ]; do
    if curl --silent --show-error --head --header 'Connection: close' https://123.57.30.164/official/ | grep -qi '^location: https://8.130.144.193/official/'; then
        break
    fi
    attempt=$((attempt + 1))
    sleep 1
done
test "$attempt" -lt 10
# Retain an explicit rollback pointer outside the active web root. Archive
# releases and historical recovery packages are kept; nothing is deleted.
mv /opt/angsheng-official/current /opt/angsheng-official/retired-current-20260925
curl --silent --show-error --head https://123.57.30.164/official/
