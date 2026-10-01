# 以太智元总官网 · 乌兰察布

公网入口：**https://8.130.144.193/**。
最终页面：**https://8.130.144.193/official/**。

当前版本：`releases/20260925-wulanchabu-v1`，由 `current` 软链接指向。
Nginx 只读取 `current/out/`。源码、原始资源和构建脚本随版本存放，
没有官网数据库或常驻 Node 服务。

- `operations/docs/deployment-wulanchabu.md`：完整目录、端口、发布、证书和回滚说明。
- `operations/docs/scientific-motion.md`：模型、交互、画质和浏览器测试说明。
- `operations/deploy/wulanchabu/`：Nginx 和续期配置、首次部署与旧机退役脚本。
- `operations/verification.md`：此次迁移的核对结果。
- `tools/certbot/`：独立证书工具 venv。
- `/var/backups/aethericai-official/`：发布包、123 原站恢复包、配置快照。
- `/var/log/nginx/aethericai-official.*.log`：官网独立日志，系统每日轮转并压缩。

SSH 使用 23850，支持现有密码和本机专用密钥；不需要安装文件管理面板。
不要将私钥、证书密钥、其他项目文件复制进官网发布目录。
已有 MDAgent 等项目与官网共享系统 Nginx，修改时仅操作官网专用配置。

维护入口：

```sh
nginx -t
systemctl status aethericai-cert-renew.timer
curl --fail https://8.130.144.193/healthz
cd /opt/aethericai-official/current
sha256sum --quiet -c release.sha256
```
