# Learn Everything 产品接入

## 范围

官网产品页新增 Learn Everything 学习 Agent 详情页，内容根据 Mac 版 `learn-everything-mac/learning_ext/guide.py` 整理，覆盖模型配置、学习路线、资料库问答、学习工作台、FSRS 复习、查漏测验、学习看板、导出和常见问题。

详情页使用官网账号体系：未登录点击进入会回到登录页；已登录但没有 `learn-everything` 权益会打开产品邀请码激活框；权益有效时由官方 API 签发短时入口票据。

## 服务与入口

- 官网详情页：`/official/products/learn-everything/`
- 受保护工作台：`/official/learn-everything/`
- 官方 API：`POST /api/v1/console/learn-everything/entry`
- Nginx 授权检查：`GET /api/v1/console/learn-everything/authorize`
- 上游监听：服务器 `127.0.0.1:7860`，公网不直接暴露该端口。

入口票据由官方认证服务使用现有哈希密钥签名，有效期 5 分钟。Nginx 对工作台 HTML、静态资源和队列/WebSocket 请求统一执行 `auth_request`；没有票据或 Cookie 时返回 403。

## 部署边界

服务器运行 Mac 版源码中可移植的 Python/Gradio 部分，使用 Python 3.11、独立虚拟环境和 `aethericai-learn.service`。用户数据、模型缓存和 theflow 状态放在 `/var/lib/aethericai-learn/`，模型配置由服务器受保护的配置文件提供。

当前上游代码仍按单用户本地模式实现，多个官网账号进入同一实例时会共享学习数据库、资料和路线。因此本次发布只完成激活门禁和服务器预览，不能把它描述为多租户数据隔离；开放给更多用户前需为学习服务接入官网用户 ID，并把文件、向量库、路线、复习和看板按账号隔离。

## 发布验收

2026-10-08：官网 `build:ip` 与 lint 通过；服务器 Learn Everything 本机 HTML 返回 200；详情页公网返回 200；工作台入口、资源和队列路径在无票据时均返回 403；官方认证 API 无票据授权返回 403；上游仅监听 `127.0.0.1:7860`。
