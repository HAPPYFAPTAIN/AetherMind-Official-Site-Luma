# 官网账户工作台

## 范围与入口

2026-10-06 用户明确指定其已完成短信验证的官网账号为唯一总管理员。完整手机号不写入代码、配置或前端；部署时用现有 `phone_hash` 精确匹配，赋予 `OWNER`。总管理员不可被网页降级，也不提供创建另一个总管理员的 API。

- 工作台 `/official/dashboard/`，沿用官网深色、冰蓝配色和字体。
- 官网短信登录后默认进入工作台；已有会话的导航入口显示“控制台”。
- 仪表盘是用户提供的第二张参考图所指的 dsh 界面，并非另一个网站。
- 保留社区和产品页的受限本站返回路径，禁止外部 `returnTo`。
- 登录支持短信验证码或手机号＋密码；工作台右上角账号按钮打开密码设置。首次设置和每次修改均需验证绑定手机号；忘记密码先用短信登录再设置。
- 前期充值采用激活码。产品使用积分购买；不添加未配置的人民币支付通道。
- 今日、近 7 天、累计用量、182 天活跃记录、7/30/90/180 天趋势和产品排行来自真实记录；空账户不填充示例数据。所有统计采用 Asia/Shanghai。

## 权限

| 身份 | 可执行操作 |
|---|---|
| 普通用户 USER | 查看本人的余额、流水、订单、权益及用量；自助兑换未定向激活码；用积分购买上架产品 |
| 管理员 ADMIN | 普通用户权限；搜索注册用户；使用分配给自己的激活码为用户授权；查看自己的操作记录与批次 |
| 总管理员 OWNER | 用户身份和产品范围管理；增减积分；生成/定向分配/撤销激活码；产品价格、套餐和入口配置；接入凭据管理；全部审计记录 |

管理员不能创建激活码、直接调分、管理其他用户身份或扩大自己的产品范围。定向的产品码要求当前管理员仍具有对应产品权限，降级立即生效。手机号只按原有密钥做哈希匹配，列表仅显示尾号，不复制小程序数据库。

## 数据与一致性

`server/llmer_api` 来自官网独立服务的当前源码快照；新功能由 `server/official_api` 挂载，继续复用 SMS、会话、头像和社区。独立数据库仍为 `/var/lib/aethericai-auth/auth.sqlite3`，表按 `official_*` 命名。

积分为整数，余额不能为负；调分、购买、兑换和用量扣费在 SQLite `BEGIN IMMEDIATE` 事务内执行。每笔记录操作人、原因、时间、余额。调分、购买、用量事件和激活码批量生成有幂等标识；相同标识的不同内容被拒绝。价格变更后旧报价被拒绝，用户需重新打开商品确认。

激活码支持积分、产品次数、产品有效天数及有效兑换期限，每码只能使用一次。数据库只存哈希和尾号；生成响应提供完整码，可下载 CSV，管理列表不显示完整码。批次重试使用密钥派生的同一组码，避免网络重试生成额外库存。批次撤销仅阻止未使用码，不扣回已经兑换的权益。每用户每分钟最多 10 次兑换尝试。

产品按天权益在有效期内覆盖调用，过期后可消耗剩余次数；每次积分费用由产品配置决定。每次实际调用中次数和积分一起验证、扣除。积分或次数不足时不会写入部分扣款或用量记录。

## API

统一前缀 `/official-api/api/v1/console`，Nginx 转发到现有 `127.0.0.1:18030`。私有用户接口沿用 `Authorization: Bearer <官网 accessToken>`，401 时通过现有 refresh 接口续期。只有产品目录公开读取。

| 路由 | 用途 |
|---|---|
| GET `/me` | 当前身份、余额、管理员产品范围 |
| GET `/dashboard?days=7&product=all` | 本人的统计、趋势、权益、流水与购买记录 |
| GET `/products` | 公开目录及当前积分套餐 |
| POST `/redeem` | `code`，管理员可附带 `targetUserId` |
| POST `/purchases` | `productId`、`expectedPrice`、`requestId` |
| GET `/admin/users?q=&offset=0` | 分页搜索；完整手机号为精确哈希搜索 |
| PATCH `/admin/users/{id}/role` | `role: ADMIN|USER`、`productIds` |
| POST `/admin/users/{id}/credits` | 整数 `delta`、`reason`、`requestId` |
| GET/POST `/admin/batches` | 批次列表/生成 |
| POST `/admin/batches/{id}/revoke` | 撤销剩余激活码 |
| GET `/admin/assignees` | 总管理员可选的定向管理员 |
| PUT `/admin/products/{id}` | 名称、说明、上架状态、积分价格、次数/天数、每次积分成本、产品入口 |
| POST `/admin/products/{id}/keys` | 生成仅一次返回的产品服务端凭据 |
| GET `/admin/keys` | 只返回凭据元数据与尾号 |
| POST `/admin/keys/{id}/revoke` | 撤销产品凭据 |
| GET `/admin/audit?offset=0` | 分页操作记录；管理员仅可读自己的记录 |

## 密码与账号安全

`server/official_api/passwords.py` 只挂载官网服务，不改变小程序认证。沿用原有阿里云短信、手机号哈希、会话格式和协议版本；不存储完整手机号或明文密码。

| 路由（位于 `/official-api` 下） | 用途 |
|---|---|
| POST `/api/v1/community/auth/password` | 手机号＋密码登录，要求同意当前协议；不自动注册未验证账号 |
| GET `/api/v1/console/security/password` | 登录用户查看是否已设置密码 |
| POST `/api/v1/console/security/password/sms` | 校验输入手机号与当前用户绑定关系，再发密码设置验证码，返回一次性 challengeId |
| PUT `/api/v1/console/security/password` | 本人会话、手机号、短信验证码、challengeId、新密码全部通过后保存 |

密码长度15–128字符，支持空格和长口令，禁止控制字符或全空格。使用带随机盐的 scrypt（N=32768、r=8、p=3），参数依据 [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)，最多两个并行 KDF。密码尝试按手机号8次/10分钟、IP40次/10分钟持久限流；未知手机号、未设置和错误密码返回统一提示。

产品邀请码由总管理员生成，`productId` 只授予对应的 MD-Agent 产品资格；它不增加积分、不授予管理员身份，也不替代未来的 MD-Agent 账户绑定。资格记录在 `official_md_agent_qualifications`，登录完成后由邀请码事务写入，前端只显示是否具备资格。

密码设置挑战绑定当前用户、手机号和本轮短信，重新发送、超时和成功使用后失效；普通登录短信不能独立作为改密凭证。凭证保存、消费挑战、撤销该用户全部旧会话和写入 PASSWORD_CHANGED 审计在同一事务完成。并发中的旧密码登录会在创建会话前重新核验密码版本；修改后需重新登录，其他用户会话不受影响。

新增 `official_passwords`、`official_password_challenges`、`official_password_attempts` 表，旧账号初始无密码，无默认凭证。沿用现有 community/console Nginx 路由，无需扩大代理范围。

## 产品接入

当前没有已提供的各产品历史用量源，因此不会把登录次数或购买次数伪装成产品使用量。各产品服务端可使用总管理员发放的产品专属凭据，将真实调用记录到 `POST /integrations/usage`。

请求字段：`eventId`（产品内唯一且重试不变）、`userId`（官网已验证身份）、`units`（默认1）、`inputTokens`（含缓存）、`cachedTokens`（不得超过输入）、`outputTokens`。时间由服务器记录，积分成本在服务端按产品配置计算，客户端不能自报积分费用。使用产品凭据作为 Bearer token；普通用户 session token 无权上报。

调用前产品需通过官网会话 `/me` 识别用户，不能相信浏览器提交的任意用户 ID。产品凭据只在服务端保存。该上报接口同时原子扣除权益和积分，适合在产品执行入口先确认并记账；执行失败补偿需接入方与总管理员按实际业务配置，当前不提供客户端退款接口。

未配置价格/额度的产品初始为 `COMING_SOON`；总管理员配置后才能上线积分购买。入口未配置时只提供产品详情，避免跳到虚构产品 URL。未来真实产品还需各自接入官网会话和用量接口，不能仅添加链接就视为完成统一身份集成。

## 验证与部署

- 权限、总管理员保护、幂等、并发单次兑换、过期/撤销、管理员范围、负余额保护、用量计费事务与跨用户隔离：`server/tests/test_workspace.py`。
- 登录默认跳转及开放重定向拒绝：`tests/account-return.test.ts`。
- 密码创建/登录/更改、本人手机号校验、短信重放/过期/重发、持久限流、并发保护、全部旧会话失效和原短信登录回归：`server/tests/test_passwords.py`。
- `server/tests/preview.py` 仅用于 localhost 隔离数据浏览器验收，含模拟短信，禁止放入生产包。
- 发布前使用 SQLite backup API 一致性备份，保留旧后端和静态版本；添加 console 路由，切换独立认证服务的启动模块为 `official_api`，仅重启 `aethericai-auth`。Nginx 配置通过后平滑 reload。
- 回滚代码和路由时保留新增表及上线后写入，不能直接覆盖生产数据库回滚余额。
- 生产前后端版本均为 `20261006-password-login`；一致性数据库备份和前后端回滚路径位于 `/var/backups/aethericai-official/20261006-password-login/`。本次仅重启独立官网认证服务，未改短信配置和 Nginx 路由；生产不生成测试密码或测试账号。
