#!/bin/sh
# Run on the verified Ubuntu 24.04 target. Never changes SSH authentication.
set -eu
test "$(id -u)" = 0
test "$(hostname)" = iZ0jlbeqz5jgsseomvplqzZ
test -x /usr/sbin/nginx
install -d -m 755 /opt/aethericai-official/releases /opt/aethericai-official/tools
install -d -m 755 /var/lib/aethericai-official/acme
install -d -m 700 /var/backups/aethericai-official
apt-get update -qq
DEBIAN_FRONTEND=noninteractive apt-get install -y -qq python3-venv
test -d /opt/aethericai-official/tools/certbot || python3 -m venv /opt/aethericai-official/tools/certbot
/opt/aethericai-official/tools/certbot/bin/pip install --disable-pip-version-check certbot==5.4.0
/opt/aethericai-official/tools/certbot/bin/certbot --version
