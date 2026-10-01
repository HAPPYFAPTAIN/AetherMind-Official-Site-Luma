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
- 官网静态版本目录：`/opt/aethericai-official/releases/20261001-community-login`
- LLMer 版本目录：`/srv/llmer-api/releases/20261001-community-login`，基于当天 `20261001T152620Z` 版本增量更新社区认证模块。

## 2026-10-01 页面结构

参考 https://forum.sidereus-ai.com/ 的首页与话题详情，浏览器插件实看后采用双层导航、头像话题行、右侧发帖/小贴士/活跃会员/统计、独立正文阅读区及作者侧栏。保留 AethericAI 深色、浅蓝点缀及原字体，不复制第三方文章、头像或会员数据。

板块沿用现有分类。排序支持默认、新帖、置顶、热门讨论和最新回复；热门按可见回复数排序。帖子链接使用兼容静态导出的 `?topic=<id>`，支持刷新与浏览器前进后退。统计来自 `GET /api/v1/community/overview`，会员仅统计公开发帖/回复者，不公开 LLMer 私有账户总量。

## 独立登录、协议与邀请码

点击“登录”或未登录发帖会跳转到 `/official/login/`。同屏显示 +86 手机号、短信验证码及重发倒计时、选填邀请码、登录按钮和协议复选框。没有微信入口或人机验证占位；密码登录为明确禁用的预留入口。登录后只允许返回本站社区路径，可恢复原话题或发帖操作，拒绝外部 returnTo 地址。

协议入口 `/official/legal/` 以新标签页打开，保留原登录表单。运营主体及联系邮箱由用户明确提供；协议内容根据实际账户与社区功能起草，不复制参考平台条款。官网底部隐私、条款链接也指向此页。参考跳转为 `https://sidereus-ai.com/login` 的 `target="_blank"`；告知要素核对来源：[个人信息保护法](https://www.samr.gov.cn/wljys/gzzd/art/2023/art_3ef1e889c1e644d4b65b5f5c7f432386.html)。

新认证接口 `POST /api/v1/community/auth/sms/verify` 复用现有短信核验，增加 `inviteCode`（选填）、`acceptedTerms: true` 和 `termsVersion: "2026-10-01"`。协议版本和同意时间存入 `community_consents`；无效、撤销或过期邀请码在短信核验前拒绝，不消耗验证码。邀请码仅关联邀请来源，不授予角色或奖励，同一账号不重复计数。

仅 ADMIN 可使用 `POST /api/v1/community/admin/invitations`（label、validDays，默认30天）生成12位随机邀请码，`GET` 同路径查询，`DELETE /api/v1/community/admin/invitations/{code}` 撤销。普通会员和 MODERATOR 无权发行；尚未指定首位管理员，未在生产自动生成或传播邀请码。本轮保留接口，没有新增邀请码管理页面。

数据库增加 invitations、invitation_members、consents 三张社区表；不删除旧数据。发布前一致性备份位于账号服务器 `/var/backups/llmer-api/20261001-community-login.sqlite3`。回滚可切回先前代码，新增表向后兼容，不恢复旧快照覆盖新用户数据。

## 验收证据

- LLMer 服务端完整测试：247 项通过；本轮社区/认证专项14项通过。
- 官网 `bun run lint`：0 errors，保留既有图片优化 warning。
- 官网 `bun run build:ip`：静态构建通过，生成 `/official/community/`。
- 公网 API、官网页面和 390px 移动端页面已通过浏览器检查。
- 本轮社区与认证专项测试 11 项通过；验证排序分页、隐藏数据不计数和私有账户不计数。
- 浏览器本地隔离数据库完成登录、发帖、统计更新、阅读页；桌面中英文及 390/768/1280/1440px 布局检查。测试账户和帖子仅存在于临时目录。
- 本轮未测试真实短信收发，未指定管理员账号；此前的待办仍保留。
- 2026-10-01 小修：入口简写为“登录”；筛选栏焦点轮廓内收，防止滚动容器裁切右侧边缘。生产构建通过，线上键盘聚焦截图确认四边完整。
- 独立登录页：本地及公网跳转、390px 和桌面布局、协议新标签页、返回路径过滤通过；线上拒绝未同意协议请求。真实手机短信验证未代用户执行。
