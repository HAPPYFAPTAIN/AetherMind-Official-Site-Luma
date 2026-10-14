# MD-Agent 控制台接入状态

## 已确认的产品流程

官网顶部、首页 Hero 和页尾的“控制台”进入 `/official/console/`。未登录可以浏览卡片，点击 MD EXP 时进入官网登录并保留控制台返回路径。登录后 MD EXP 计划在新标签页打开原生 dsh；GROMACS、DFT、材料分析卡片显示“下个月上架”并禁止进入。

控制台侧栏已预留：智能体目录、超算连接、计算任务、模型配置。模型未配置时允许先进入 MD EXP，再引导完成配置。超算 SSH、工作区和队列尚未接入，页面只展示真实待接入状态，不允许提交任务。

总管理员可以生成绑定不同产品资格的邀请码，也可以在工作台激活码生成器中生成 `MD EXP / dsh` 专用激活码。MD EXP 激活码兑换后会写入用户的 MD-Agent 产品资格，并进入自动绑定链路；资格不授予管理员身份、积分或其他产品权限。当前产品标识为 `md-exp`、`gromacs`、`dft`、`materials`。

## 模型目录

总管理员模型控制现在分为两层：

- 「全局供应商」可维护 provider 标识、OpenAI 兼容 Base URL、启用状态和密钥。密钥在官网数据库中加密保存，管理接口只返回是否已配置，不回显明文。
- 「模型路由」可配置公开模型名、供应商、上游模型 ID，并决定是否全局开放。关闭全局开放后，可在用户列表的「模型权限」中只给指定客户授权；网关的 `/v1/models` 和实际调用都按同一有效模型集合校验。

授权模型更新后，官网会请求受保护的 dsh 管理刷新接口，绑定租户的 `settings.yaml` 按官方授权表重新生成。没有授权的用户不会收到额外 provider/model 条目，即使手工提交模型名，官方网关也会拒绝。

首期支持目录按两家官方文档确定，真实密钥和连接验证另行进行：

| provider | model_id | 当前状态 |
|---|---|---|
| `kimi` | `kimi-k3` | 已列入 dsh 目录 |
| `kimi` | `kimi-k2.7-code-highspeed` | 国内版 API 代理短请求返回200 |
| `kimi` | `kimi-k2.6` | 已列入 dsh 目录 |
| `deepseek` | `deepseek-v4-pro` | 已配置，代理短请求返回200 |
| `deepseek` | `deepseek-flash` | 已配置，使用当前 Flash 路由 |

模型 Key 只由受保护后端保存，不进入源码、前端环境变量、URL、localStorage 或日志。dsh 只显示项目代理目录中的 Kimi `kimi-k3`、`kimi-k2.7-code-highspeed`、`kimi-k2.6` 和 DeepSeek `deepseek-v4-pro`、`deepseek-flash`；内置 `deepseek-official` 默认目录通过 `llm-deepseek.models: []` 隐藏，避免重复和旧模型名混入。

## 当前已部署

- 前端：`/opt/aethericai-official/releases/20261009-md-browser`
- 后端：`/srv/aethericai-auth/releases/20261006-md-entry`
- 数据表：`official_md_agent_qualifications`；邀请码表新增 `product_id`
- BFF：`GET /api/v1/console/md-agent/profile` 返回本人资格、模型未配置和超算未连接状态
- BFF：`POST /api/v1/console/md-agent/bind` 按本人产品资格自动创建/审批个人 MD-Agent 账号，并加密保存个人 Token
- BFF：`POST /api/v1/console/md-agent/enter` 申请短票并改写为 `/official/md-agent/open?ticket=...`
- 同域 dsh：`/official/md-agent/`，根级 dsh 资源和 API 由 Nginx 兼容转发
- dsh 根级插件：`/plugins/` 映射到 `/opt/mdagent/web-preview/plugins/`；dsh 前端使用根绝对路径，缺少该映射会出现 `Failed to load plugins`。
- 备份：`/var/backups/aethericai-official/20261009-233037-private-workspace/`

## 2026-10-09 点击故障修复

- dsh 的 `settings.describe`、工作区列表和两个事件 WebSocket 要求回环 Host；官网同域代理现在先校验 Host/Origin/Fetch-Site，再把请求转换到用户自己的回环实例，不再把公网 Host 直接传给 dsh。
- `/plugins/`、`/api/`、`/assets/` 和 `/official/md-agent/` 统一走同一租户代理；未登录仍回到 `/official/console/`，跨站 RPC 返回403。
- 控制台进入按钮预留新标签页时不再使用会返回 `null` 的 `noopener` 空窗口；票据返回后通过已保留窗口跳转，重复点击会被锁定。
- 生产验收：四类 RPC 经官网路径均返回200；`events.mux` 与 `events.host` 均完成101握手；插件脚本200、`/plugins/events` 为SSE 200；匿名 shell 302到控制台；跨站 RPC和错误 Origin均403。带资格的真实入口已在浏览器打开，内测提示、侧栏收起、设置面板、工作区选择按钮均可操作，控制台异步入口实际跳转到 `/official/md-agent/`。

## 2026-10-09 工作区与存储隔离

- 每个绑定账号使用独立的 `mu_<username>` UID、`dsh-home`、`projects`、`conversations`、`data/memory` 和默认 `projects/default`；工作区状态只通过该账号自己的 dsh RPC 写入。
- 初始化路径拒绝符号链接和越出账号 `projects` 根目录的工作区；每个租户实例有独立初始化锁，实例替换或初始化失败不会复用旧状态。
- 旧的 `data/memory` 共享链接已移除，改为账号私有目录；共享进化目录不再作为用户记忆或工作区来源。
- 两个生产绑定账号分别只能看到自己的 `default` 工作区；跨账号读写测试均被 UID 权限拒绝。回滚材料：`/var/backups/aethericai-official/20261009-233037-private-workspace/`。

## 2026-10-13 无节点执行与红色错误

- 用户没有在线 mdshell 节点时，租户 overlay 写入合法的 YAML provider 补丁，不再伪造 `n_none` 的 remote-world 地址；它重新启用本机 `subprocess/sandbox/fs-sandbox`，禁用 remote providers，文件操作走本机 Landlock/bwrap 沙箱。只有用户节点在线时才注入 `remote-fs`、`remote-subprocess` 和 `remote-sandbox`。
- 生产权限策略固定为 `workspace-write + approval=never`：每个租户进程仍以独立 UID、独立 `DSH_HOME` 和独立数据根运行；越界或需要升权的操作自动拒绝，不再显示权限选择器或向用户弹批准框。删除、清空、杀进程和终止作业由 `mdagent-safety` 工具 guard 固定拒绝。
- `mdagent-safety` 在启动时为已恢复会话补写固定权限事实，新会话和旧会话都不会回到 `ask` 或 `danger-full-access`。
- `workspace-write no sandbox backend` 的根因是远程 provider 被强制启用但 mdshell 没有连接；`mdshell websocket 403` 是同一条 remote-world 链路的节点/短票问题，不是 HPC 未连接。`INSUFFICIENT_CREDITS 402` 是官方 LLM 网关余额预检，和超算提交无关。
- 当前没有把 `danger-full-access` 作为修复手段；它会跳过文件限制和确认策略。科研命令仍受当前用户沙箱、独立 UID 和 `mdagent-safety` guard 约束。

## 2026-10-10 模型目录修复

- dsh 原先同时展示内置 `deepseek-official` 和代理 `deepseek`，造成重复目录；当前只保留代理目录。
- 代理目录固定为 Kimi 三个模型和 DeepSeek 两个模型，现有账号配置与新账号模板一致。备份：`/var/backups/aethericai-official/20261010-002146-model-catalog/`、`/var/backups/aethericai-official/20261010-002146-model-catalog-template/`。
- Kimi 首次真实发送的 503 根因是 mdagent 缺少官方认证数据库路径和 `md-exp` 产品凭据；已补齐网关凭据与三条模型路由。新会话用 Kimi K3 返回了 MD Exp 首轮介绍，流水登记输入 14,450、输出 458、扣 1,491 积分。备份：`/var/backups/aethericai-official/20261010-011152-kimi-503/`、`/var/backups/aethericai-official/20261010-012403-mdexp-product-key/`、`/var/backups/aethericai-official/20261010-012822-model-routes/`。

## 待密钥和后端契约后完成

1. 用真实总管理员生成的产品邀请码完成一次生产绑定和短票进入验收。
2. 使用用户提供的模型密钥完成 Kimi/DeepSeek 真实短对话验证。
3. 继续核对 dsh 同域路径的已登录页面、SSE/RPC、WebSocket 和租户动态端口。
4. 配置 Kimi 与 DeepSeek 的 provider/base URL/model 契约，完成错误 Key、429、超时和真实短对话验证。
5. 接入 SSH 负责人的 connection/workspace/job 契约后，才开放超算连接和计算任务操作。

没有产品资格的账号仍不能绑定或进入；没有真实模型密钥时 dsh 可以进入，但模型状态保持未配置。

## 2026-10-10 产品期限授权

产品资格改为 `expires_at_ms > now`，不再由 units 授予或扣减。管理员可在用户列表“设置产品期限”中按产品指定 1–3650 天（从保存时计算）；产品套餐与产品激活码要求有效天数，拒绝次数授权。模型用量依旧按官方用户记入积分流水。MD EXP 产品卡片入口固定指向 `/official/console/`。

按用户明确确认，总管理员 MD EXP 从迁移时起恢复 30 天，其他账号期限未擅自延长。备份 `/var/backups/aethericai-official/20261010-duration-access/`；前端发布 `20261010-duration`。真实 SQLite 回归覆盖连续三次调用只扣积分、期限不变、到期拒绝（即使 units>0）、普通用户不能授权、管理员重设期限、按天激活码及产品入口。线上只读确认 MD EXP active、剩余约30天、网关授权通过；未额外调用模型。浏览器管理页因未登录未完成完整点击验收。
