# MD-Agent 控制台接入状态

## 已确认的产品流程

官网顶部、首页 Hero 和页尾的“控制台”进入 `/official/console/`。未登录可以浏览卡片，点击 MD EXP 时进入官网登录并保留控制台返回路径。登录后 MD EXP 计划在新标签页打开原生 dsh；GROMACS、DFT、材料分析卡片显示“下个月上架”并禁止进入。

控制台侧栏已预留：智能体目录、超算连接、计算任务、模型配置。模型未配置时允许先进入 MD EXP，再引导完成配置。超算 SSH、工作区和队列尚未接入，页面只展示真实待接入状态，不允许提交任务。

总管理员可以生成绑定不同产品资格的邀请码。邀请码在官网短信登录时输入，登录完成后写入用户的 MD-Agent 产品资格；资格不授予管理员身份、积分或其他产品权限。当前产品标识为 `md-exp`、`gromacs`、`dft`、`materials`。

## 模型目录

首期支持目录按两家官方文档确定，真实密钥和连接验证另行进行：

| provider | model_id | 当前状态 |
|---|---|---|
| `kimi` | `kimi-k3` | 待密钥、待验证 |
| `kimi` | `kimi-k2.7-code` | 待密钥、待验证 |
| `kimi` | `kimi-k2.6` | 待密钥、待验证 |
| `deepseek` | `deepseek-v4-pro` | 待密钥、待验证 |
| `deepseek` | `deepseek-flash` | 待密钥、待验证 |

模型 Key 只由受保护后端保存，不进入源码、前端环境变量、URL、localStorage 或日志。Kimi 当前官方 quickstart 推荐 `kimi-k3`，并列出 K2.7 Code 和 K2.6；DeepSeek 当前官方模型列表为 `deepseek-v4-pro` 与 `deepseek-flash`。

## 当前已部署

- 前端：`/opt/aethericai-official/releases/20261006-md-console-preview`
- 后端：`/srv/aethericai-auth/releases/20261006-md-console-preview`
- 数据表：`official_md_agent_qualifications`；邀请码表新增 `product_id`
- BFF：`GET /api/v1/console/md-agent/profile` 返回本人资格、模型未配置和超算未连接状态
- BFF：`POST /api/v1/console/md-agent/enter` 当前明确返回 `MD_AGENT_BINDING_REQUIRED`，没有使用共享测试账户
- 备份：`/var/backups/aethericai-official/20261006-md-console-preview/`

## 待密钥和后端契约后完成

1. 建立官网账号到 MD-Agent 账号的一人一绑定关系。
2. 使用用户提供的服务端密钥调用 MD-Agent `/v1/web/entry`，校验返回目标后生成新标签页短票跳转。
3. 将 dsh 从现有独立端口迁移到官网同域路径；需要核对 dsh 的 base path、Cookie path、可信 Host、SSE/RPC 和 WebSocket 路由。
4. 配置 Kimi 与 DeepSeek 的 provider/base URL/model 契约，完成错误 Key、429、超时和真实短对话验证。
5. 接入 SSH 负责人的 connection/workspace/job 契约后，才开放超算连接和计算任务操作。

在第 2 项完成前，MD EXP 卡片按钮只给出绑定/接入状态提示，不声称已进入 dsh。
