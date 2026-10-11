# 官网模块化与积分体系重构计划

> 本文是“官网模块化与积分体系重构”会话的迁移版计划。它保留原会话的架构决策、范围、阶段、验证条件和生产约束；当前实现状态在每个阶段末尾标注。最后同步：2026-10-08。

## 目标与边界

整理官网认证后台，吸收不必要的旧 `llmer_api` 依赖，按产品/领域拆分模块；建立统一的积分计量入口，将产品调用次数、LLM token 和 HPC 核时统一折算为积分；统一 ACT- 激活码和权益门禁；为 Learn Everything 接入官网模型网关、完成前端去 AI 味改造，并为后续账号级数据隔离保留边界。

生产原则：官网 API 与旧小程序 API 保持边界；生产采用 release 目录 + `current` 软链接 + SQLite 快照备份；不把生产数据库、密钥、短信、SSH 私钥或证书复制进仓库；数据库迁移只做向前兼容，不用旧 SQLite 覆盖新记录。

## 关键决策

1. **吸收 `llmer_api`，不保留空壳包。** 认证、社区、数据库、短信、密码、官方工作台和适配器全部归入 `server/official_api/`；删除未暴露且不再属于官网边界的小程序支付、题库、报告、挑战等代码。保留环境变量名 `LLMER_HASH_SECRET`、`LLMER_DATABASE_PATH`，保留 `python -m official_api` 入口、现有 token 前缀和哈希 purpose，确保线上会话可继续使用。
2. **网关与认证后台同仓库、同虚拟环境，独立入口。** `server/gateway/` 运行在 `127.0.0.1:18040`，直接访问同一 SQLite 并导入 `official_api.billing`，不通过内部 HTTP 绕一圈。
3. **统一度量：** 一套 `ACT-` 激活码、一套 `official_roles`、一套 `official_entitlements`，一套 `billing.wallet.charge()`；产品单位、LLM 模型 token、HPC core-minute 均由费率表定价。
4. **迁移 runner：** 编号 SQL 文件 + `schema_migrations`；新库执行 0001 基线，旧库检测到 `users` 后登记基线而不重建旧表，再执行增量迁移。
5. **路径兼容优先：** nginx 暴露的认证、社区、console、Learn Everything 路径不改；旧 `/llmer-api/` 保持独立。

## 目标模块布局

```text
server/
  official_api/
    app.py                 # 只负责构造依赖、初始化、挂载路由
    config.py errors.py crypto.py http.py branding.py
    db/
      __init__.py          # Database、核心认证/会话方法
      migrations/
        0001_baseline.sql
        0002_roles_cleanup.sql
        0003_rates_metering.sql
        0004_code_unification.sql
    auth/{service.py,sms.py,passwords.py,routes.py}
    community/{consent.py,routes.py}
    products/{catalog.py,entitlements.py,codes.py,routes.py}
    billing/{wallet.py,rates.py,usage.py,routes.py}
    admin/{roles.py,routes.py}
    adapters/{md_agent.py,learn_everything.py,hpc.py}
  gateway/
    __main__.py app.py auth.py providers.py metering.py
```

## 统一计量契约

### 数据表

`official_rates(scope,key,points_per_unit,points_per_mtok_input,points_per_mtok_cached,points_per_mtok_output,updated_at_ms,updated_by)`：`scope` 为 `product-unit`、`llm-model` 或 `hpc-core-minute`；同一 scope/key 唯一。

`official_llm_models(model,provider,upstream_model,enabled,updated_at_ms)`：公开模型名到 provider/upstream model 的路由；密钥只在环境变量。

`official_usage` 增加 `model`、`core_minutes`、`shortfall`；旧 `official_products.unit_point_cost` 保留为目录显示/兼容列，费率真相转移到 `official_rates`。

### 计价与扣费

```python
@dataclass
class UsageEvent:
    units: int = 0
    model: str | None = None
    input_tokens: int = 0
    cached_tokens: int = 0
    output_tokens: int = 0
    core_minutes: int = 0

def charge(c, *, user_id, product_id, event_id, usage,
           reason=None, actor=None, allow_clamp=False) -> ChargeResult:
    # 同一 BEGIN IMMEDIATE 内：重放检查、权益检查、price、ledger、次数扣减、usage 插入
```

LLM token 价格按百万 token 向上取整；输入 token 拆分为非缓存和缓存；缺费率返回 `409 RATE_MISSING`。严格业务用量上报余额不足回滚并返回 `INSUFFICIENT_CREDITS`；网关/HPC 已经完成流式工作后可 `allow_clamp=True`，扣除现有余额并将差额写入 `shortfall`。

## 网关契约

- `Authorization: Bearer opk_...` 校验 `official_integration_keys`；`X-End-User` 指定官网用户；必须存在该产品有效 entitlement。
- `POST /v1/chat/completions`：支持流式和非流式；流式向上游注入 `stream_options.include_usage`，透传 SSE，结束后按 usage 扣费。
- `GET /v1/models`：来自 `official_llm_models`。
- `POST /v1/embeddings`：按模型 token 费率计费。
- `GET /healthz`：网关健康检查。
- `X-Event-Id` 用于幂等，未提供时由网关生成 request id；余额预检默认 `GATEWAY_MIN_BALANCE=1`，不足返回 402。
- provider 环境变量：`GATEWAY_PROVIDER_<NAME>_BASEURL`、`GATEWAY_PROVIDER_<NAME>_KEY`；路由与上游模型在数据库。

## 激活码与权益统一

删除 `md-exp` 的资格表特判：ACT- 兑换统一调用 `grant()` 写 `official_entitlements`；`md_agent.state/ensure_binding` 通过 `active(uid, 'md-exp')` 判断。社区邀请码仅表示社区加入标签，不再携带产品 grant；`InviteCreate` 去掉 `productId` 的业务含义，历史列暂时保留兼容。

0004 将历史 `official_md_agent_qualifications` 数据迁移为 `official_entitlements(user_id,'md-exp',...)`；资格表至少保留一个发布周期只读，后续再删除。前端 Learn Everything 文案使用“产品激活码”和 `ACT-…`，不再称“邀请码”。

## 分阶段执行与状态

### Phase 0 — 恢复生产专属资产

- 从服务器恢复 `official_api/hpc.py` 到仓库。
- 生产 SQLite 只在获得授权的受控发布流程中做 `.backup`；本地不得复制个人数据，无法授权时只做 schema 验证。
- 验证 `create_app()` 可针对隔离库启动。

**状态：** `hpc.py` 已恢复；本地采用 schema/隔离 SQLite 验证，未复制生产用户数据。

### Phase 1 — 纯重构，行为不变

- `llmer_api` 吸收到模块化 `official_api`，删除官网边界外的 mini-program 代码。
- 公共路径、token 格式、hash purpose、sessions/users 表保持兼容。
- `Database.insert_session`、`AuthService.new_session_values/session_response` 等原私有调用改为公开 API。

**状态：已完成。** 最近提交：`f4129527`、`5253cb69`。已验证 61 条暴露路由一致、22 项基线测试通过、`llmer_api` Python 引用清零。

### Phase 2 — 迁移体系

- `Database.migrate()` 创建 `schema_migrations`，执行编号 SQL，并在每次迁移后运行 integrity check。
- 0001 覆盖保留模块的最终 schema；0002 把 `community_admins` 同步到 `official_roles`。
- 删除运行时散落的 `CREATE TABLE`/`ALTER TABLE` 和 `schema.sql`。
- 验证新库、旧库基线同化、重复启动幂等、schema 差异和角色同步。

**状态：已完成。** 0001–0005、基线同化、并发启动锁、失败回滚和 SQLite 快照演练通过；生产数据库已迁移，user_version 仍保持兼容值 3。

### Phase 3 — 统一计量

- 完成 `billing/rates.py`、`UsageEvent`、`ChargeResult`、`charge()`。
- `/integrations/usage` 按 token/core-minute 真实计价；同一 event replay 不重复扣费。
- OWNER 管理 `/admin/rates`、`/admin/models`；产品编辑同步 product-unit 费率。
- 验证计价、缓存 token、向上取整、余额不足回滚、clamp shortfall、时间权益与按次权益。

**状态：已完成本地验证。** token/缓存/输出按每 10 token 1 积分，HPC 按每 10 核分钟 1 积分；严格扣费、封顶 shortfall、幂等重放和管理员费率路由测试通过。

### Phase 4 — LLM 网关

- 创建 `server/gateway/`：认证、provider registry、OpenAI 兼容路由、SSE metering。
- 新增 `aethericai-gateway.service` 和 `gateway.env.example`（部署文件已存在，入口代码待补）。
- 认证使用产品 key + `X-End-User` + entitlement；费用直接调用 `official_api.billing.charge()`。
- 验证 `/healthz`、`/v1/models`、非流式/流式 chat、embeddings、402 预检、event replay。

**状态：已完成。** 独立 `server/gateway/` 已在 127.0.0.1:18040 启用，支持模型、非流式/流式对话、embeddings、幂等、防重复上游调用、断流后继续计费和关闭排空。

### Phase 5 — ACT- 统一与前端修复

- 新增 0004 历史资格迁移。
- 删除 codes/community/md-agent 中 `md-exp` 特判、旧资格表读路径和社区产品 grant。
- Learn Everything modal 改为 ACT- 激活码文案/placeholder；管理中心去掉独立“产品邀请码”业务入口，或明确其仅社区标签。

**状态：已完成本地验证。** ACT- 是唯一产品激活方式；社区邀请码只能入群；MD-Agent 绑定读取 `official_entitlements`，旧资格表仅保留迁移兼容读取；前端和管理员产品邀请码入口已移除。

### Phase 6 — 产品/生产接入

- Learn Everything 使用网关的 `OPENAI_API_BASE`、产品专属 `opk_`、`X-End-User`；模型配置不能由普通用户改写共享环境。
- Learn Everything Mac UI 已完成一轮去 emoji、去营销夸张文案和官方站配色换肤，但该兄弟目录不是本 git 仓库，需单独留存/发布并继续做账号级数据隔离。
- 生产发布：备份 DB，构建 release，原子切换 auth/gateway/site 软链，启动两个 systemd 服务，验证 healthz、现有 session refresh、短信登录、激活、Learn Everything chat 和 usage ledger。
- 回滚：代码/软链/Nginx 可回退；数据库迁移前向兼容，必要时按发布备份恢复。

**状态：已完成。** Learn Everything 已启用官网 UID 隔离、服务器模式认证、网关模型调用、模型配置锁定和命令执行禁用；资料库仍按已确认范围共享。生产网关、dsh/HPC 适配和软链发布已通过服务/公网验收。

## 当前阻塞与下一步

1. 先完成迁移/计量代码审查和全量后端测试（命令：`PYTHONPATH=server server/.venv/bin/pytest -q server/tests`）。
2. 修复 ACT- 统一和角色读取路径，再更新旧测试契约。
3. 实现网关并加入 mock-upstream 单元测试。
4. 更新前端管理中心和 Learn Everything 文案，运行 `bun run lint`、`bun run build:ip`。
5. 更新本文和 `PROJECT_ACCEPTANCE.md` 的证据状态；未经用户明确生产发布授权不执行服务器切换。

## 关键文件

- [官方 API app](../../server/official_api/app.py)
- [数据库与迁移](../../server/official_api/db/__init__.py)
- [迁移 SQL](../../server/official_api/db/migrations/)
- [统一钱包](../../server/official_api/billing/wallet.py)
- [费率目录](../../server/official_api/billing/rates.py)
- [激活码](../../server/official_api/products/codes.py)
- [MD-Agent 适配器](../../server/official_api/adapters/md_agent.py)
- [Learn Everything 页面](../../src/components/LearnEverythingPage.tsx)
- [生产发布脚本](../../deploy/wulanchabu/release-workspace.sh)
