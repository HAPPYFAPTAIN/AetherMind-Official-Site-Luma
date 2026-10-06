# MD-Agent 控制台接入状态

## 已确认的产品流程

官网顶部、首页 Hero 和页尾的“控制台”进入 `/official/console/`。未登录可以浏览卡片，点击 MD EXP 时进入官网登录并保留控制台返回路径。登录后 MD EXP 计划在新标签页打开原生 dsh；GROMACS、DFT、材料分析卡片显示“下个月上架”并禁止进入。

控制台侧栏已预留：智能体目录、超算连接、计算任务、模型配置。模型未配置时允许先进入 MD EXP，再引导完成配置。超算 SSH、工作区和队列尚未接入，页面只展示真实待接入状态，不允许提交任务。

总管理员可以生成绑定不同产品资格的邀请码。邀请码在官网短信登录时输入，登录完成后写入用户的 MD-Agent 产品资格；资格不授予管理员身份、积分或其他产品权限。当前产品标识为 `md-exp`、`gromacs`、`dft`、`materials`。

## 模型目录

首期支持目录按两家官方文档确定，真实密钥和连接验证另行进行：

| provider | model_id | 当前状态 |
|---|---|---|
| `kimi` | `kimi-k3` | Key 验证失败，待重新提供 |
| `kimi` | `kimi-k2.7-code` | 待密钥、待验证 |
| `kimi` | `kimi-k2.6` | 待密钥、待验证 |
| `deepseek` | `deepseek-v4-pro` | 已配置，代理短请求返回200 |
| `deepseek` | `deepseek-flash` | 共用 DeepSeek Key，待独立验证 |

模型 Key 只由受保护后端保存，不进入源码、前端环境变量、URL、localStorage 或日志。DeepSeek Key 已写入 MD-Agent 服务端受保护环境并通过真实代理短请求；本轮提供的 Kimi Key 在 Kimi Coding 与 Moonshot API 入口均返回401，未保存，需重新提供可用的 Kimi API Key。Kimi 当前官方 quickstart 推荐 `kimi-k3`，并列出 K2.7 Code 和 K2.6；DeepSeek 当前官方模型列表为 `deepseek-v4-pro` 与 `deepseek-flash`。

## 当前已部署

- 前端：`/opt/aethericai-official/releases/20261006-md-entry`
- 后端：`/srv/aethericai-auth/releases/20261006-md-entry`
- 数据表：`official_md_agent_qualifications`；邀请码表新增 `product_id`
- BFF：`GET /api/v1/console/md-agent/profile` 返回本人资格、模型未配置和超算未连接状态
- BFF：`POST /api/v1/console/md-agent/bind` 按本人产品资格自动创建/审批个人 MD-Agent 账号，并加密保存个人 Token
- BFF：`POST /api/v1/console/md-agent/enter` 申请短票并改写为 `/official/md-agent/open?ticket=...`
- 同域 dsh：`/official/md-agent/`，根级 dsh 资源和 API 由 Nginx 兼容转发
- 备份：`/var/backups/aethericai-official/20261006-md-binding/`

## 待密钥和后端契约后完成

1. 用真实总管理员生成的产品邀请码完成一次生产绑定和短票进入验收。
2. 使用用户提供的模型密钥完成 Kimi/DeepSeek 真实短对话验证。
3. 继续核对 dsh 同域路径的已登录页面、SSE/RPC、WebSocket 和租户动态端口。
4. 配置 Kimi 与 DeepSeek 的 provider/base URL/model 契约，完成错误 Key、429、超时和真实短对话验证。
5. 接入 SSH 负责人的 connection/workspace/job 契约后，才开放超算连接和计算任务操作。

没有产品资格的账号仍不能绑定或进入；没有真实模型密钥时 dsh 可以进入，但模型状态保持未配置。
