# AethericAI 社区实现说明

## 范围

社区挂在官网导航的「社区」入口，沿用 LLMer 的手机号账户体系。用户可以用短信验证码注册或登录，维护昵称、头像、所在地、简介、GitHub 和 X / Twitter 主页，并发布科学计算讨论、回复问题、关闭自己的问题。

## 管理能力

社区管理员可以置顶、隐藏、恢复、关闭和重新打开帖子，也可以隐藏或恢复回复。每次管理动作写入审计记录。管理员账号通过 `COMMUNITY_ADMIN_USER_IDS` 或 `community_admins` 表明确指定，不把首个注册用户自动提升为管理员。

## 数据边界

社区公开资料使用独立的 `community_profiles` 表。LLMer 原有手机号、出生日期和职业资料不会因为发帖自动公开。帖子正文按纯文本存储和渲染，允许换行，服务端限制长度、分类和频率。

## 发布入口

- 官网页面：`https://8.130.144.193/official/community/`
- 公共列表 API：`/llmer-api/api/v1/community/posts`
- 账号和头像仅代理明确的认证路由、资料路由和头像路由，其他 LLMer 后台和支付接口不通过官网暴露。
- 官网静态版本目录：`/opt/aethericai-official/releases/20261001-community-v2`
- LLMer 版本目录：`/srv/llmer-api/releases/20260930195000`

## 验收证据

- LLMer 服务端完整测试：237 项通过。
- 官网 `bun run lint`：0 errors，保留既有图片优化 warning。
- 官网 `bun run build:ip`：静态构建通过，生成 `/official/community/`。
- 公网 API、官网页面和 390px 移动端页面已通过浏览器检查。
