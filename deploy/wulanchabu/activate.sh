#!/bin/sh
# Usage: sh activate.sh /var/backups/aethericai-official/<release>/project.tar.gz <sha256>
set -eu
test "$(hostname)" = iZ0jlbeqz5jgsseomvplqzZ
archive=$1
expected=$2
case "$archive" in /var/backups/aethericai-official/*/project.tar.gz) ;; *) exit 2 ;; esac
test "$(sha256sum "$archive" | cut -d ' ' -f 1)" = "$expected"
release=/opt/aethericai-official/releases/20260925-wulanchabu-v1
backup=/var/backups/aethericai-official/20260925-wulanchabu-v1
test ! -e "$release"
test ! -e /opt/aethericai-official/current
test ! -e /etc/nginx/conf.d/aethericai-official.conf
test ! -e /etc/nginx/snippets/aethericai-official-locations.conf
install -d -m 755 "$release"
tar --no-same-owner -xzf "$archive" -C "$release"
cd "$release"
sha256sum --quiet -c release.sha256
test "$(sha256sum out/index.html | cut -d ' ' -f 1)" = 6f31d5b40a4700276b044efc653f522f2bce84a239e9c6495026bab825f40795
nginx -T > "$backup/nginx-before.txt" 2>&1
ln -s "$release" /opt/aethericai-official/current
install -m 644 deploy/wulanchabu/locations.conf /etc/nginx/snippets/aethericai-official-locations.conf
install -m 644 deploy/wulanchabu/http-bootstrap.conf /etc/nginx/conf.d/aethericai-official.conf
nginx -t
systemctl reload nginx
curl --retry 5 --retry-delay 1 --retry-all-errors --fail --silent --show-error -H 'Host: 8.130.144.193' http://127.0.0.1/healthz
