# 项目验收

> 当前验收与有效证据的紧凑视图。原始输出和完整报告保存在外部制品位置并以路径和哈希引用。

## 当前验收结论

- 结论：官网模块化后端、数据库迁移、ACT 激活码、统一积分、LLM 网关、Learn Everything UID 隔离、dsh/HPC 计量接入和生产软链发布均已完成（E-029）；资料库共享仍是已确认边界。官网产品详情、操作手册和账号门禁保持可用。
- 验收范围：卡片目录、产品邀请码资格、模型/超算状态页、密码登录/设置、工作台、用户身份、积分、激活码、产品套餐、用量接口、统一登录及既有社区
- 最后检查：2026-10-08
- 遗留问题：Learn Everything 当前 Mac 架构是单用户实例，不能宣称多租户隔离；正式产品价格/额度由总管理员配置；产品真实用量须由各产品接入记录接口，不以演示数据代替。生产已存在用户明确指定的短信验证账号并赋予 OWNER；本轮未发送真实短信。

## 验收标准

| 标准 ID | 标准 | 状态 | 验证方法摘要 | 证据 ID |
|---|---|---|---|---|
| A-001 | 项目目标达到可验证结果 | 待检查 | 对照项目目标 | 无 |
| A-002 | 范围内功能满足完成条件 | 待检查 | 对照功能清单 | 无 |
| A-003 | 项目约定测试通过 | 待检查 | 运行项目测试 | 无 |
| A-004 | 阻塞与重大遗留已处理 | 待检查 | 对照当前进度 | 无 |
| A-005 | `project-to-act` 唯一治理入口和文档索引可验证 | 已通过 | 运行 `--check --validate --audit` | E-001 |

## 证据索引

E-036（2026-10-10）：产品改按自定义期限授权，OWNER 的 MD EXP 按明确确认恢复30天。隔离 SQLite 回归验证三次调用只扣积分不减少期限、到期拒绝、普通用户不能改期限、管理员设置期限、按天激活码和 MD EXP 入口；1项综合测试通过，build:ip通过，lint无错误。生产只读核验 active=true、期限约30天、gateway授权通过。浏览器匿名页正常；登录后的完整管理页面点击仍未验收。备份 `/var/backups/aethericai-official/20261010-duration-access/`，静态发布 `20261010-duration`，细节见 `docs/md-agent-console.md`。
E-037（2026-10-10）：控制台用户下拉菜单新增「仪表盘」入口，指向 `/official/dashboard/`。本地静态浏览器验证菜单出现、点击后到达 dashboard 且无控制台错误；生产软链切换后 `/official/console/` 与 `/official/dashboard/` 均 HTTP 200。备份 `/var/backups/aethericai-official/20261010-dashboard-menu/`，发布 `20261010-dashboard-menu`。
E-038（2026-10-10）：移除控制台和仪表盘顶栏品牌旁的「控制台」文字，只保留以太智元品牌、侧栏/菜单和既有入口功能。`build:ip`、TypeScript、lint（0 errors）和 `git diff --check` 通过；生产发布 `20261010-no-console-label`，公网 dashboard/console HTML 均未出现该顶栏文案，旧版本保存在 `20261010-dashboard-menu`。
E-039（2026-10-11）：控制台/仪表盘头像改为蓝色圆形用户图标；仪表盘侧栏底部加入浅色、深色、跟随系统切换并持久化本地偏好；控制台移除返回官网和语言切换按钮。隔离浏览器验证三种主题菜单、浅色切换后的背景/顶栏样式、头像和控制台顶栏结构；`build:ip`、TypeScript、`git diff --check` 通过，lint 无新增错误。生产发布 `20261011-dashboard-theme`，dashboard/console 均 HTTP 200，旧版本为 `20261010-no-console-label`。
E-040（2026-10-11）：按最新界面确认，控制台头像取消右侧箭头，点击头像直接打开账户菜单；控制台账户菜单移除明暗模式，主题入口仅保留在仪表盘侧栏底部。浏览器验证菜单仅含仪表盘、个人中心、退出登录；`build:ip`、TypeScript、`git diff --check` 通过，lint 无新增错误。生产发布 `20261011-menu-cleanup`，dashboard/console 均 HTTP 200，旧版本为 `20261011-dashboard-theme`。
E-041（2026-10-11）：仪表盘「产品权益」改为只展示当前已激活产品，每项显示产品名称、有效期和直接进入按钮；移除产品总数、`2 / 8` 和进度条。两个已激活产品的隔离浏览器 DOM/截图验证通过；`build:ip`、TypeScript、lint、`git diff --check` 通过。生产发布 `20261011-products-access-list`，dashboard HTTP 200，旧版本为 `20261011-menu-cleanup`。
E-042（2026-10-11）：新增总管理员模型控制：供应商 URL/协议/密钥加密配置、全局模型路由、按用户额外模型授权；官方网关模型目录与调用均按用户有效授权过滤，dsh provisioner 按绑定用户刷新 settings。专项迁移/加密/授权回归 `9 passed`，build:ip、TypeScript、lint、`git diff --check` 通过；生产认证数据库迁移到 0006、完整性检查 ok，auth/gateway/mdagent active，dsh 刷新 23 个租户，模型管理前端发布 `20261011-model-admin`，后端默认模型费率补丁发布 `20261011-model-access-rate`，dashboard HTTP 200。
E-042（2026-10-11）：修复新用户（手机号尾号 2080）进入 MD EXP 后发送消息报 `Provider is not configured: deepseek`。根因是新用户模板的 Kimi/DeepSeek provider 缺少 `apiKeyEnv: MDEXP_PROXY_KEY`；已补齐模板并重写已绑定租户配置，生产备份 `/var/backups/aethericai-official/20261011-145754-model-catalog/`，`mdagent-api` 重启后 active。2080 用户配置和模板均已核验包含代理环境变量；入口票据生成成功，官网入口 HTTP 200 且不再返回该 provider 错误。新增模型目录回归断言。
E-043（2026-10-13）：产品卡片移除英文大标题和重复中文副标题，四个产品分别使用「分子模拟智能体、分子模拟工作流、电子结构与材料计算、轨迹与性质分析」作为大标题。桌面/390px 浏览器截图和 DOM 验证通过，原 `.agent-subtitle` 数量为 0、无横向溢出、控制台无错误；`build:ip` 和 lint 通过（保留原有 `<img>` 性能 warning）。生产发布 `20261013-console-cn-titles`，console HTML SHA-256 `e9cbf056a6a3289b71ad7d6b89767283cb6ba2c7dc4b33656a77a3a18ca73d9c`。

| 证据 ID | 时间 | 方法摘要 | 退出状态 | 版本或文件哈希 | 结果摘要 | 证据位置 | 有效期 |
|---|---|---|---|---|---|---|---|
| E-001 | 2026-09-29 | 初始化、validate、audit | 0 | `.project-to-act/` 当前文件 | managed 文档、索引和仓库说明已创建 | 本地命令输出 | 当前 |
| E-002 | 2026-10-01 | build:ip、lint、社区/认证 pytest、浏览器插件 | 0 | `20261001-community-layout-final` | 11 项专项通过，中英文/响应式、隔离账户发帖和公网统计通过 | `docs/community.md` | 本发布版本 |
| E-003 | 2026-10-01 | build:ip、lint、后端pytest、浏览器插件 | 0 | `20261001-community-login` | 247项完整/14项专项通过；页面与协议200；未同意协议拒绝；手机和桌面视觉通过 | `docs/community.md` | 本发布版本 |
| E-004 | 2026-10-05 | build:ip、lint、SHA-256、乌兰察布公网与浏览器验收 | 0 | `20261005-login-controls-v2` | 语言切换和关闭按钮位于面板内；首页哈希、登录页、worker、healthz、社区 overview 通过；旧版本保留回滚 | `design-qa.md`、生产发布包备份 | 历史发布 |
| E-005 | 2026-10-05 | build:ip、lint、SHA-256、乌兰察布公网与浏览器验收 | 0 | `20261005-login-controls-v3` | 弹层移除重复语言按钮，X 仍在框内右上角；桌面/390px 手机验证通过；首页哈希、登录页、healthz、社区 overview 通过 | `design-qa.md`、生产发布包备份 | 当前发布 |
| E-006 | 2026-10-05 | 独立认证服务部署、前端 build/lint、Nginx、官方 API 与公网浏览器验收 | 0 | `20261005-official-api` | 乌兰察布新 `aethericai-auth.service` 使用独立 SQLite；RAM 角色 `SilverSmsAuthRole` 生效；`/official-api` overview、官网首页、登录页与 healthz 通过 | `/var/backups/aethericai-auth/20261005T141106Z/`、`/var/backups/aethericai-official/20261005-official-api/` | 当前发布 |
| E-007 | 2026-10-05 | build:ip、lint、SHA-256、乌兰察布公网与浏览器验收 | 0 | `20261005-login-scale-v4` | 登录框桌面端缩放到原来的 0.9，手机端保持可用尺寸；首页哈希、登录页、healthz、社区 overview 通过；旧版本保留回滚 | `design-qa.md`、生产发布包备份 | 当前发布 |
| E-008 | 2026-10-05 | build:ip、lint、SHA-256、乌兰察布公网与 Nginx 验收 | 0 | `20261005-nav-spacing-v5` | 桌面导航左/中/右三列对齐，产品与社区保持 7.6px 间距；首页哈希、healthz、Nginx 通过；旧版本保留回滚 | `design-qa.md`、生产发布包备份 | 当前发布 |
| E-009 | 2026-10-06 | 15 项 Python 回归、登录跳转测试、build/lint、隔离浏览器流程、生产只读核验 | 0 | `20261006-account-workspace`; dashboard SHA-256 `5efa7df4538a81046a73ca7d3d598acc097841e8e14641199470fbb14ada4314` | 指定账号尾号 4824 为唯一 OWNER；生产1用户、0测试用量/激活码/余额记录；匿名私有接口401；公共产品/社区/health正常；数据库完整性ok | docs/account-workspace.md、design-qa.md、`/var/backups/aethericai-official/20261006-account-workspace/` | 当前工作台发布 |
| E-010 | 2026-10-06 | build/lint、静态产物哈希、生产浏览器链接点击 | 0 | `20261006-account-workspace-links`; dashboard SHA-256 `3ccb85d29c74eeb34298f57edff2f8feda77e4ca3c2cff155cebd32e5ef4aaec` | 官网两处控制台链接均为 `/official/dashboard/`，点击进入工作台；生产哈希一致；仅切换静态版本 | `src/components/Hero.tsx`、`src/components/sections/FinalCTA.tsx`、生产备份目录 | 当前静态发布 |
| E-011 | 2026-10-06 | build:ip/lint、桌面与390px浏览器、连续指针移动、键盘焦点、公网哈希 | 0 | `20261006-heatmap-layout`; dashboard SHA-256 `72511bae90769d4aca8fd77b69e951c2318aab2e0f805b96c7f633826f89dc69` | 原悬浮高度增加16px；修复后12次方格/间隙采样高度208px、图例Y623.55不变；桌面606px及手机318px均无横向溢出，182格完整，边缘提示在卡片内；公网HTML与构建相同，CSS/产品API正常 | `src/components/DashboardPage.tsx`、`src/components/dashboard.css`、`/var/backups/aethericai-official/20261006-heatmap-layout/` | 当前静态发布 |
| E-012 | 2026-10-06 | build:ip/lint、桌面/390px/320px浏览器、滚动及退出流程、公网哈希 | 0 | `20261006-workspace-topbar`; dashboard SHA-256 `7ec14f06c22913a9506549f74152c0f38117162ad4fc0ef6faf6a73b989be4ef` | 账户区仅一份且位于独立顶栏内；旧官网导航不存在；320px无重叠，滚动后顶栏Y=0；本地真实接口退出返回官网；公网HTML哈希一致，后台及Nginx PID不变 | `src/components/DashboardPage.tsx`、`src/components/dashboard.css`、`/var/backups/aethericai-official/20261006-workspace-topbar/` | 当前静态发布 |
| E-013 | 2026-10-06 | 25项后端测试、1项跳转测试、build/lint、桌面/390px表单、公网入口与哈希、SQLite只读核验 | 0 | `20261006-password-login`; login SHA-256 `2eeb62a7e3ca1f5feb1c31ef30d5a48754b2973bf49b1d238e9a2f22f3e2fa82` | 本人验证、限流、验证码单次/失效、并发旧密码拒绝、旧会话撤销通过；公网密码入口可切换，匿名设置401、无效登录400，health/产品200；生产1用户/1 OWNER/0密码/0挑战，未发送真实短信 | `server/tests/test_passwords.py`、`docs/account-workspace.md`、`/var/backups/aethericai-official/20261006-password-login/` | 当前认证发布 |
| E-014 | 2026-10-06 | 27项后端测试、build/lint、设计 QA、桌面/390px浏览器、公网卡片页、匿名 BFF 401、生产 SQLite/服务核验 | 0 | `20261006-md-console-preview`; console HTML SHA-256 `1a36ac90e70cda215cb5376742311659cbc711407d83581bafdaf334d1084882` | 官网入口、卡片目录、MD EXP可用、后续卡片禁用、模型目录、超算待接入状态、产品邀请码生成和资格写入通过；生产2用户/0资格，MD-Agent进入明确409，未使用共享测试账户；真实 dsh、模型密钥、同域代理和SSH未宣称完成 | `design-qa.md`、`server/tests/test_md_agent_portal.py`、`docs/md-agent-console.md`、`/var/backups/aethericai-official/20261006-md-console-preview/` | 阶段发布 |
| E-015 | 2026-10-06 | 28项后端测试、build/lint、Nginx `nginx -t`/reload、生产 official-bff 管理接口200、匿名 BFF401、同域 dsh 403、生产 SQLite/服务核验 | 0 | `20261006-md-entry`; console HTML SHA-256 `dc8000d8986a057bda85ac7d8c021c197715b880c65c9014be6905f4e6582f44` | official-bff 独立服务账号已创建；资格用户可自动开户/审批/加密保存 Token，短票 URL 改写到 `/official/md-agent/open`; 同域资源代理已配置；未带短票仍403；未使用现有 kkk/mdadmin Token；真实生产资格和 dsh会话待用户邀请码触发 | `server/tests/test_md_agent_portal.py`、`docs/md-agent-console.md`、`/var/backups/aethericai-official/20261006-md-binding/` | 阶段发布 |
| E-016 | 2026-10-06 | DeepSeek `/models` 200、OpenAI-compatible `/llm/deepseek/chat/completions` 真实短请求200、Kimi Coding/Moonshot入口均401、服务重启与健康检查 | 0 | `20261006-model-deepseek`; Key 只在 `/etc/mdagent/provider.env` 受保护文件 | DeepSeek `deepseek-v4-pro` 已配置并验证；Kimi Key未保存，未宣称可用；默认新 MD-Agent 账号 provider 为 deepseek | `docs/md-agent-console.md`、MD-Agent provider 备份 | 阶段发布 |
| E-017 | 2026-10-07 | 国内 Kimi `api.moonshot.cn/v1` + `kimi-k2.7-code-highspeed` 官方短请求200、MD-Agent `/llm/kimi/chat/completions` 真实代理200、服务重启与健康检查 | 0 | `20261007-model-kimi-cn`; Key 只在 `/etc/mdagent/provider.env` 受保护文件 | 国内 Kimi 已接入代理并验证；DeepSeek保持200；Kimi Key不进入代码、前端或日志 | `docs/md-agent-console.md`、MD-Agent provider 备份 | 阶段发布 |
| E-018 | 2026-10-07 | build/lint、云端控制台截图和可访问性树 | 0 | `20261007-console-header`; console HTML SHA-256 `a4c11e7c30155273cab0a12fba070199d62b5b738522d533050625048fc191ce` | 顶栏账户收敛为头像+下拉入口；官网轨道式 Logo 替换菱形占位；桌面控制台公网显示正常 | `src/components/ConsolePage.tsx`、`src/components/Nav.tsx`、`src/components/console.css` | 当前静态发布 |
| E-019 | 2026-10-07 | build/lint、云端工作台截图、DOM SVG核验 | 0 | `20261007-workspace-brand`; dashboard HTML SHA-256 `facc5f1bc8ddfcfde6d3585b50ed2b2b272ac783af5acb61707893fbeb971885` | 工作台顶栏显示官网轨道 Logo，品牌文字与“工作台”对齐；未登录状态页面正常 | `src/components/DashboardPage.tsx`、`src/components/dashboard.css` | 当前静态发布 |
| E-020 | 2026-10-07 | build/lint、1280px/390px浏览器、侧栏完全收回、顶栏开关、移动抽屉、可访问性树 | 0 | `20261007-sidebar-topbar`; dashboard HTML SHA-256 `e051e4218ea2a289b21d98a1a17729e88a87ae874a861d4e4154f0ad77eae90c` | P1 顶部工作台导航/产品/激活码已移入侧栏；P2 标题说明区移除；桌面侧栏宽度收为0且主区域占满，开关移到顶栏；手机侧栏可抽屉打开；页面无横向溢出 | `src/components/DashboardPage.tsx`、`src/components/dashboard.css` | 当前静态发布 |
| E-021 | 2026-10-07 | build/lint、390px/桌面浏览器、顶栏按钮几何尺寸与图标 DOM 核验 | 0 | `20261007-sidebar-glyph`; dashboard HTML SHA-256 `1b68804821bc109185bfa1cdfa95724224492c9388c486fb81b5afdc27be66d2` | 菜单图标由三条固定线组成，按钮使用 grid/flex 居中；收回和展开状态均保持居中 | `src/components/DashboardPage.tsx`、`src/components/dashboard.css` | 当前静态发布 |
| E-022 | 2026-10-07 | build/lint、公网 DOM 文案/字体尺寸/Logo SVG 核验 | 0 | `20261007-console-label`; dashboard HTML SHA-256 `2c1700449add23bac59e50e10038e398ce6b8dd8c8eb5ca2538847ef3929774f` | 顶栏“工作台”改为“控制台”；品牌文字23px、控制台文字18px、Logo34px；公网显示正常 | `src/components/DashboardPage.tsx`、`src/components/dashboard.css` | 当前静态发布 |
| E-023 | 2026-10-07 | build/lint、公网 DOM 文案/字体尺寸核验 | 0 | `20261007-console-size-restore`; dashboard HTML SHA-256 `1e04b03d3460c734ccbf299c04e4dfe6cf8b4557a3a98598ecb98119468cf0bc` | 顶栏保持“控制台”文案，品牌名、Logo和副标题恢复放大前尺寸 | `src/components/DashboardPage.tsx`、`src/components/dashboard.css` | 当前静态发布 |
| E-024 | 2026-10-07 | build/lint、公网主页可访问性树、顶部/ Hero 控制台按钮登录弹层 | 0 | `20261007-dashboard-entry`; homepage HTML SHA-256 `4a833034772336dad15a9088fdbe26fed7d705b887d06edaf7b94153007011b1` | 顶部“控制台”和 Hero“打开控制台”均为统一入口；未登录点击弹出登录，登录成功返回 dashboard | `src/components/ConsoleEntryButton.tsx`、`src/components/Hero.tsx`、`src/components/sections/FinalCTA.tsx`、`src/components/Nav.tsx` | 当前静态发布 |
| E-030 | 2026-10-07 | build/lint、公网 DOM 文本核验 | 0 | `20261007-no-footer`; dashboard HTML SHA-256 `2b4cfbdb8c4378924b447f22df4004dc1a75345bfe748b227a5177411d1df9e3` | 工作台所有页面移除更新时间、刷新数据底部小字区块；公网无 `dash-footer`、更新文案和刷新文案 | `src/components/DashboardPage.tsx` | 当前静态发布 |
| E-025 | 2026-10-07 | 11项工作台/MD-Agent后端测试、build/lint、公网产品目录核验、生产健康检查 | 0 | `20261007-md-exp-activation`; md-exp product API 返回正常 | P1 激活码生成器新增 MD EXP 类型；兑换零积分/零次数的 MD EXP 码会写入资格表；BFF 可据此自动绑定 dsh 账号；P2 dsh 内部提示需用户实际兑换后再做会话验收 | `server/tests/test_workspace.py`、`server/tests/test_md_agent_portal.py`、`/var/backups/aethericai-official/20261007-md-exp-activation/` | 当前发布 |
| E-026 | 2026-10-07 | dsh 插件根 URL 只读响应、Nginx `nginx -t`/reload | 0 | `20261007-dsh-plugin-root`; `/plugins/@deepseek-ai/dsh-session-log-export/client.js` HTTP 200，JavaScript 11446 bytes | 原因是 dsh 使用根路径 `/plugins/`，官网同域层之前只代理 `/official/md-agent/plugins/`；已新增根 `/plugins/` 到 `/opt/mdagent/web-preview/plugins/` 的映射 | `/var/backups/aethericai-official/20261007-dsh-plugin-fix/` | 当前发布 |
| E-027 | 2026-10-07 | dsh-files 插件源文件/预览文件 SHA-256、根 URL HTTP 响应头、Nginx/官方认证/MD-Agent 服务状态 | 0 | `20261007-dsh-plugin-fix`; `/plugins/dsh-files/client.js` HTTP 200，`application/javascript`，15961 bytes；源文件与预览文件 SHA-256 一致 | 第二个报错原因是 `dsh-files` 只存在于 MD-Agent 源码插件目录，官网同域预览目录缺少对应 bundle；已补齐 `/opt/mdagent/web-preview/plugins/dsh-files/client.js`，并复用已生效的根 `/plugins/` 映射 | `/var/backups/aethericai-official/20261007-dsh-plugin-fix/` | 当前发布 |
| E-028 | 2026-10-08 | `bun run lint`、`bun run build:ip`、服务器服务/端口/公网页面/Nginx 保护验收 | 0 | `20261008-learn-everything`; 详情页 HTML SHA-256 `c14933c495c937bee5e7285b5389190f845abdb949e3067acb9e8ad5e90db270` | Learn Everything 详情页与操作手册公网 200；官方 API 无票据403；工作台 HTML、资源和队列路径无票据均403；上游仅127.0.0.1:7860；服务与认证 API active | `.project-to-act/docs/learn-everything.md`、`/var/backups/aethericai-official/20261008-learn-gateway/` | 阶段发布 |
| E-031 | 2026-10-08 | 生产快照迁移、47 项后端测试、156 项 Learn Everything 测试、独立网关/服务/Nginx/公网联验 | 0 | `e3847558`; DB integrity ok、migrations 1–5、user_version 3；详情页 200、无票据工作台403、gateway health 200、models 200 | 生产 5 用户/26 会话/3钱包流水/4权益/3批次/2绑定保留；auth/gateway/learn/mdagent/nginx active；网关和 Learn Everything UID 隔离完成，资料库共享边界记录 | `/var/backups/aethericai-official/20261008-modular/`、`.project-to-act/docs/official-site-refactor-plan.md` | 当前发布 |
| E-032 | 2026-10-09 | `bun run build:ip`、`bun run lint`、Nginx `-t`/reload、RPC/匿名/跨站验收、WebSocket握手、SSE/插件和带资格浏览器流程 | 0 | `20261009-md-browser`; 前端发布软链与 Nginx 备份已核验 | dsh 四类 RPC经官网路径均200；`events.mux`/`events.host`均101；插件脚本200、events SSE200；匿名 shell重定向控制台；跨站 RPC和错误 Origin均403；真实入口页面、设置面板、侧栏和工作区按钮均可操作 | `.project-to-act/docs/md-agent-console.md`、`/var/backups/aethericai-official/20261009-153921-md-rpc/` | 当前发布 |
| E-033 | 2026-10-09 | 私有工作区部署预览/应用、两个绑定账号工作区 RPC、账号 UID 文件权限、跨账号读写拒绝、浏览器下拉选择 | 0 | `20261009-private-workspace`; 9 项本地隔离回归测试通过；生产备份与服务状态核验 | 两个账号各自只有 `/opt/mdagent/users/<账号>/projects/default`；两个 `data/memory` 均为 UID 所有、700 且不再是共享链接；对方目录读写均 DENIED；浏览器下拉能显示并选中 `default` | `server/tests/test_md_workspace_bootstrap.py`、`.project-to-act/docs/md-agent-console.md`、`/var/backups/aethericai-official/20261009-233037-private-workspace/` | 当前发布 |
| E-034 | 2026-10-10 | dsh `llm.providers`/`llm.models` RPC、现有绑定账号设置同步、新账号模板渲染、浏览器模型目录与 Kimi K2.7 选择 | 0 | `20261010-model-catalog`; 模型列表无重复且无旧 `deepseek-v4-flash` 代理项 | 生产返回两组：Kimi 三个目标模型、DeepSeek `deepseek-v4-pro` 与 `deepseek-flash`；浏览器展开模型目录显示两组，选择 Kimi K2.7 后当前模型更新 | `deploy/wulanchabu/mdagent-model-catalog.py`、`.project-to-act/docs/md-agent-console.md`、`/var/backups/aethericai-official/20261010-002146-model-catalog-template/` | 当前发布 |
| E-035 | 2026-10-10 | mdagent 代理映射、产品凭据、Kimi K3/K2.7/K2.6 路由、真实浏览器新会话发送、官方用量与钱包流水 | 0 | `20261010-model-gateway-smoke`; Kimi K3 上游与代理均200 | 新会话按 MD Exp preset 返回中文首轮介绍；`official_usage` 记录 Kimi K3 输入14,450/输出458、扣1,491积分，钱包从10,988降至9,497；无旁路模型请求 | `deploy/wulanchabu/mdagent-llm-gateway-bootstrap.py`、`.project-to-act/docs/md-agent-console.md`、`/var/backups/aethericai-official/20261010-012403-mdexp-product-key/` | 当前发布 |
| E-029 | 2026-10-07 | build/lint、控制台公网 DOM/交互核验、个人中心匿名保护 | 0 | `20261007-console-profile`; console/profile 静态页面 | 控制台移除 Hero 与底部路径占位；个人中心入口结构已接入；未登录个人中心返回登录；密码设置沿用短信验证 | `src/components/ConsolePage.tsx`、`src/components/ProfilePage.tsx`、`/official/profile/` | 当前静态发布 |

## Gate 记录

2026-10-02 顶栏字号修正：品牌、导航、控制台和语言文字统一增加 2px；`build:ip` 通过，Chrome 插件截图确认 1280px 中英文单行无重叠。上线版本 `20261002-nav-type`，仅修改 `src/components/Nav.tsx` 的五处字号。
2026-10-03 导航操作区调整：移除“打开控制台”和发光点，改为登录入口；语言切换移到登录前。移动菜单同步使用登录入口。 `build:ip` 和 lint 通过，1280px 中英文单行检查通过。上线版本 `20261003-nav-login`。
2026-10-03 顶栏增加“产品 / Products”预留项，放在社区左侧；因目标产品页尚未确定，当前不绑定跳转。桌面与移动菜单位置同步，构建通过。上线版本 `20261003-nav-products`。
2026-10-03 登录模板：登录页表单抽成可复用悬浮弹层，社区和官网顶栏点击登录时保留原页面并暗化为背景；右上角 × 关闭。登录逻辑、协议、邀请码和密码预留不变。build:ip/lint 通过，公网社区弹层截图确认。
2026-10-04 登录弹层比例修正：悬浮表单最大宽度从 620px 收窄至 500px，内边距同步收紧，保持小红书参考的轻量右侧面板比例。生产构建通过，公网截图确认。
2026-10-04 登录弹层微调：在当前 0.8 倍版本上放大到 0.88 倍，背景模糊从 16px 降到 8px，周边官网内容更清晰。公网截图确认，版本 `20261004-login-modal-088`。
2026-10-04 官网样板预览层：内部导航锚点、控制台入口、页脚占位和产品预留均改为当前页弹出的功能样板；保留真实社区、登录、协议页面。平台入口已通过 Chrome 验收，版本 `20261004-showcase-samples`。
2026-10-04 产品页：产品导航从样板弹层改为 `/official/products/` 独立页面，采用 Autodesk 式黑色产品头部、分类筛选、产品卡片和详情弹层，内容使用 AethericAI 自有平台、LAMMPS、科学智能体和研究工作区。公网 HTTP 200，版本 `20261004-products-page`。
2026-10-04 产品页重构：根据用户提供的七张本地图片完成视觉识别和语义映射，改为浅色科学 Hero、分类栏、三列图像产品卡片和详情交互；`design-qa.md` 结果为 passed，版本 `20261004-products-light-final`。
2026-10-04 产品页导航与 Hero 微调：复用首页 Nav，删除产品页第二层深色导航；Hero 图片右侧遮罩减弱，科学面板更清晰。线上浏览器确认 `/official/products/`，最终版本 `20261004-products-final`。
2026-10-04 顶栏结构收敛：保留产品、社区；左侧新增企业服务；右侧新增加入我们、关于我们；移除平台、计算引擎、模拟、科学智能、科研流程、研究场景。四个新增入口均接入样板内容层，线上版本 `20261004-nav-structure`。
2026-10-05 复核并修正主官网顶栏：按用户最新确认的结构实际部署，主页与产品页均复用同一套 Nav；确认旧的六个 P3 入口已移除，产品/社区保留，企业服务在品牌右侧，加入我们/关于我们在右侧功能区，版本 `20261005-nav-structure-final`。
2026-10-05 登录弹层玻璃质感：仅调整 Login Panel，加入 32px 强背景模糊、2px 全局弱遮罩、冰蓝细边缘光和输入层级，首页背景、导航、分子场景及底部区域未改。Chrome 线上截图确认，版本 `20261005-login-glass`。
2026-10-04 登录弹层文字与间距：辅助文字统一上调一档；登录标题与手机号框增加 24px 下间距，避免标题贴住输入框上边缘。构建与 lint 通过，版本 `20261004-login-modal-text`。
2026-10-05 登录框控件归位：语言切换和关闭 X 移入 Login Panel 顶部，桌面和 390px 手机尺寸验证通过；生产版本 `20261005-login-controls-v2`。
2026-10-05 登录弹层去重：弹层移除语言按钮，保留全局顶部语言入口；X 保持框内右上角，桌面和 390px 手机尺寸验证通过；生产版本 `20261005-login-controls-v3`。
2026-10-05 登录框比例：桌面端整体缩放至原来的 0.9，手机端保持可用尺寸，生产版本 `20261005-login-scale-v4`。
2026-10-05 顶部导航均匀排布：桌面导航改为左/中/右三列对齐，产品与社区维持现有 7.6px 内间距，生产版本 `20261005-nav-spacing-v5`。
2026-10-05 官网认证隔离：新增乌兰察布 `aethericai-auth.service`、独立 SQLite 和 `/official-api/` Nginx allowlist；短信通过 ECS RAM 角色 `SilverSmsAuthRole` 使用现有阿里云通道；小程序旧 `/llmer-api/` 保持不动，生产版本 `20261005-official-api`。

| Gate ID | 日期 | Gate | 对象 | 结果 | 证据 ID | 豁免与确认人 |
|---|---|---|---|---|---|---|

## 验收记录

2026-10-02 导航间距：桌面导航文本间净空由 20px 调为 23.6px（1.18 倍），保留两侧 8px 点击区域，仅将容器 gap 从 4px 改为 7.6px。构建通过，线上 Chrome 中英文截图无换行；发布版本 `20261002-nav-spacing`。

| 日期 | 检查范围 | 证据 ID | 结果 | 遗留问题 | 结论 |
|---|---|---|---|---|---|
