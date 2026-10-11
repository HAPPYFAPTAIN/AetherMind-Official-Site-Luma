#!/bin/sh
# Usage on verified host: sh release-workspace.sh <archive> <sha256> <verified-owner-phone>
set -eu
test "$(id -u)" = 0
test "$(hostname)" = iZ0jlbeqz5jgsseomvplqzZ
archive=$1
expected=$2
owner_phone=$3
release=20261006-account-workspace
backup=/var/backups/aethericai-official/$release
site=/opt/aethericai-official/releases/$release
backend=/srv/aethericai-auth/releases/$release
test -f "$archive"
printf '%s  %s\n' "$expected" "$archive" | sha256sum -c -
test ! -e "$site"
test ! -e "$backend"
install -d -m 700 "$backup"
old_site=$(readlink -f /opt/aethericai-official/current)
old_backend=$(readlink -f /srv/aethericai-auth/current)
test "$old_site" = /opt/aethericai-official/releases/20261006-nav-centered
test "$old_backend" = /srv/aethericai-auth/releases/20261005T141106Z
test -d "$old_site/out"
test -x "$old_backend/.venv/bin/python"
printf '%s\n' "$old_site" > "$backup/site-before.txt"
printf '%s\n' "$old_backend" > "$backup/backend-before.txt"
cp -a /etc/systemd/system/aethericai-auth.service "$backup/auth.service.before"
cp -a /etc/nginx/snippets/aethericai-official-locations.conf "$backup/locations.before.conf"
nginx -t
python3 - "$backup" <<'PY'
import sqlite3,sys
from pathlib import Path
target=Path(sys.argv[1])/'auth-before.sqlite3'
assert not target.exists()
with sqlite3.connect('/var/lib/aethericai-auth/auth.sqlite3') as source:
    with sqlite3.connect(target) as snapshot:
        source.backup(snapshot)
        assert snapshot.execute('PRAGMA integrity_check').fetchone()[0]=='ok'
target.chmod(0o600)
PY
cp -a "$old_site" "$site"
cp -a "$old_backend" "$backend"
tar -xzf "$archive" -C "$backup"
cd "$backup/package"
sha256sum --quiet -c release.sha256
cp -a frontend/. "$site/"
cp -a backend/official_api "$backend/"
python3 - "$site" "$backend" <<'PY'
import hashlib,sys
from pathlib import Path
for folder in sys.argv[1:]:
    root=Path(folder)
    files=sorted(p for p in root.rglob('*') if p.is_file() and not any(part in {'.venv','__pycache__'} for part in p.relative_to(root).parts) and p.name!='release.sha256')
    (root/'release.sha256').write_text(''.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+str(p.relative_to(root))+'\n' for p in files))
PY

# Replace only the existing official service entrypoint and add its console route.
python3 - "$backup" <<'PY'
from pathlib import Path
import sys
b=Path(sys.argv[1])
s=(b/'auth.service.before').read_text()
old='-m llmer_api'
assert s.count(old)==1, 'Unexpected service entrypoint'
(b/'auth.service.candidate').write_text(s.replace(old,'-m official_api'))
s=(b/'locations.before.conf').read_text()
marker='location ^~ /official-api/ {'
assert s.count(marker)==1 and '/api/v1/console/' not in s, 'Unexpected route state'
route='''location ^~ /official-api/api/v1/console/ {
    proxy_pass http://127.0.0.1:18030/api/v1/console/;
    include /etc/nginx/snippets/aethericai-official-auth-proxy.conf;
}
'''
(b/'locations.candidate.conf').write_text(s.replace(marker,route+marker))
PY

# Migrate additively and bind the explicitly authorized existing account.
"$backend/.venv/bin/python" - "$backend" "$owner_phone" <<'PY'
import os,shlex,sys
from pathlib import Path
for line in Path('/etc/aethericai-auth/auth.env').read_text().splitlines():
    if '=' in line and not line.lstrip().startswith('#'):
        key,value=line.split('=',1)
        parts=shlex.split(value)
        os.environ[key]=parts[0] if parts else ''
sys.path.insert(0,sys.argv[1])
from llmer_api.config import Settings
from llmer_api.database import Database
from llmer_api.auth_service import AuthService
from official_api.workspace import Workspace
settings=Settings.from_env()
db=Database(settings.database_path)
workspace=Workspace(db,AuthService(db,None,settings))
workspace.initialize()
uid=workspace.bootstrap_owner(sys.argv[2])
with db.connect() as c:
    assert workspace.role(c,uid)=='OWNER'
print('Existing verified account assigned OWNER; tables initialized')
PY
chown aethericai-auth:aethericai-auth /var/lib/aethericai-auth/auth.sqlite3*
rollback() {
    set +e
    cp -a "$backup/auth.service.before" /etc/systemd/system/aethericai-auth.service
    cp -a "$backup/locations.before.conf" /etc/nginx/snippets/aethericai-official-locations.conf
    ln -sfn "$old_backend" /srv/aethericai-auth/current.rollback
    mv -Tf /srv/aethericai-auth/current.rollback /srv/aethericai-auth/current
    ln -sfn "$old_site" /opt/aethericai-official/current.rollback
    mv -Tf /opt/aethericai-official/current.rollback /opt/aethericai-official/current
    systemctl daemon-reload
    systemctl restart aethericai-auth
    nginx -t && systemctl reload nginx
    echo 'Rolled back code/config; database preserved to retain new records' >&2
}
trap 'rollback' EXIT
trap 'exit 1' HUP INT TERM
install -m 644 "$backup/auth.service.candidate" /etc/systemd/system/aethericai-auth.service
install -m 644 "$backup/locations.candidate.conf" /etc/nginx/snippets/aethericai-official-locations.conf
nginx -t
ln -s "$backend" /srv/aethericai-auth/current.next-workspace
mv -Tf /srv/aethericai-auth/current.next-workspace /srv/aethericai-auth/current
systemctl daemon-reload
systemctl restart aethericai-auth
ready=0
for attempt in 1 2 3 4 5 6 7 8 9 10; do
    if curl -fsS http://127.0.0.1:18030/readyz > "$backup/readyz.json"; then ready=1; break; fi
    sleep 1
done
test "$ready" = 1
curl -fsS http://127.0.0.1:18030/api/v1/console/products > "$backup/products-local.json"
systemctl reload nginx
ln -s "$site" /opt/aethericai-official/current.next-workspace
mv -Tf /opt/aethericai-official/current.next-workspace /opt/aethericai-official/current
curl -fsS --retry 5 --retry-delay 1 --retry-all-errors --max-time 5 https://8.130.144.193/official-api/api/v1/console/products > "$backup/products.json"
curl -fsS --retry 5 --retry-delay 1 --retry-all-errors --max-time 5 https://8.130.144.193/official/dashboard/ > "$backup/dashboard.html"
curl -fsS https://8.130.144.193/healthz
readlink -f /opt/aethericai-official/current
readlink -f /srv/aethericai-auth/current
sha256sum "$site/out/dashboard/index.html"
trap - EXIT HUP INT TERM
