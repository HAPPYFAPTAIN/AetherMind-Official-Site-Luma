#!/bin/sh
# Run only after public TCP 80 and 443 are reachable.
set -eu
test "$(hostname)" = iZ0jlbeqz5jgsseomvplqzZ
cd /opt/aethericai-official/current
/opt/aethericai-official/tools/certbot/bin/certbot certonly \
  --non-interactive --agree-tos --register-unsafely-without-email \
  --preferred-profile shortlived --webroot \
  --webroot-path /var/lib/aethericai-official/acme \
  --ip-address 8.130.144.193 --cert-name aethericai-official-ip
install -m 644 deploy/wulanchabu/official.conf /etc/nginx/conf.d/aethericai-official.conf
nginx -t
systemctl reload nginx
install -m 644 deploy/wulanchabu/aethericai-cert-renew.service /etc/systemd/system/aethericai-cert-renew.service
install -m 644 deploy/wulanchabu/aethericai-cert-renew.timer /etc/systemd/system/aethericai-cert-renew.timer
systemctl daemon-reload
systemctl enable --now aethericai-cert-renew.timer
systemctl list-timers aethericai-cert-renew.timer --no-pager
curl --fail --silent --show-error https://8.130.144.193/healthz
