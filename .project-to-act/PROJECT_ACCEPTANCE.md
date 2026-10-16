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

- 2026-10-13 研究方向与企业服务：首页三个研究面板新增对应产品锚点链接；分子动力学采用用户提供的完整图谱截图，企业服务采用此前生成的机房概念图，统一居中排版并更新底部说明，CTA 进入企业服务独立页。lint/build 通过；本地浏览器 1440/390/320px 三个产品链接、图片加载、居中和无横向溢出检查通过（`output/verify-research-enterprise.py`）。仅本地预览和个人仓库分支，未生产部署。

本地整屏加入我们收尾（2026-10-13，未发布生产）：将原结尾 CTA 和大字页脚合为至少 100svh 的独立末屏，按钮改为「加入我们」并通过客户端导航进入 `/careers/`，页脚关于我们/加入我们同步进入独立页面。Aether 与 Mind 分别从左右两侧随滚动移动并渐显，最终无间距合拢；采用标志图像主体取样青蓝 #35d8f7 和银灰 #8e9db2，背景仅静态弱光，无新 WebGL 或持续循环。合拢结束点为页面最大滚动位置前 min(18vh,160px)，保留末段完整展示；反向滚动可还原，减少动态效果与不足 600px 高度时直接完整展示。旧整组位移动画缩限到 CTA 文案，避免品牌字重复位移，前面章节停留与视频不变。构建、修改文件 lint、diff 检查通过；独立 Chromium 1440×900、390×844、320×844、1920×1080、900×500 验证整屏高度、两侧移动、触底前合并、合并间距零、反向恢复、减少动态效果、无横向溢出和加入我们链接通过，无页面异常。证据：`output/brand-finale-verification.json`、`output/verify-brand-finale.py`、`output/brand-finale-*.png`。未发布生产或调用真实账号写入接口。

本地导航详情与紧凑深色产品目录（2026-10-13，未发布生产）：五个顶部栏目统一 18px 字号、18px 项间距，品牌桌面 24px，产品页不再单独缩小导航。鼠标悬停展开简要介绍与详情入口，160ms 离开延迟允许移入面板；支持焦点展开、方向键进入、Escape 收起，点击切页后不自动重新遮挡正文。企业服务、加入我们、关于我们新增独立双语页面，内容沿用现有方向与联系邮箱，未虚构客户、团队或招聘岗位；产品与社区保留原独立页面。手机菜单显示同一组入口及说明，关闭后恢复滚动。

产品目录与详情底色改为石墨蓝 #0d151b，说明文字保持 17px；桌面超过 1100px 使用三列，八款产品排列为 3/3/2，平板两列、680px 以下一列。卡片图片由 16:10 收紧为 16:9，列距 28px、行距 32px，减少卡片和目录留白。以原平台晶体方块、MD EXP 玻璃球链（原 lammps.png）、材料计算晶格三张原图为编辑目标，内置 image_gen 结合既有期刊风格参考调整暗色环境与光照，保留可辨识主体；不作为实验或模拟结果。三张全尺寸 PNG 保存于 `output/product-original-restyled/`，640/1280/1536 WebP 与原图哈希、完整提示词保存在 `public/images/products/original-restyled-v1/`。首页视频未修改，LAMMPS 引擎卡片继续使用上一版期刊图，MD EXP 使用独立图像映射。

构建、修改文件 lint 与 diff 检查通过。独立 Chromium 六组 320–1920px 中英文导航验证：无重叠/横向溢出、五个悬停面板保持与关闭、键盘进入/退出、三个新增页面无需整页重载、手机菜单切页、三档列数、三张目标配图加载和深色详情均通过；七组产品完整筛选/搜索/排序、详情焦点/关闭/滚动锁定、减少动画、无 JS 目录与接口失败回退通过。首页 1440/390/320px 登录、拖拽、空闲停帧、弹窗暂停、手机菜单转登录、返回首页入场回归通过。证据：`output/navigation-dark-verification.json`、`output/products-editorial-verification.json`、`output/navigation-performance.json`、`output/nav-dropdown-*.png`、`output/nav-mobile-*.png`、`output/products-dark-*.png`。真实接口使用隔离模拟，未提交认证、短信或订单；不代表生产发布或真机验收。

本地配图恢复与点击响应优化（2026-10-13，未发布生产）：以太智元平台卡片及详情恢复 `public/assets/products/platform.png` 原浅蓝晶体配图，仅缩放和 WebP 编码；提供 640/1280/1536/2172 四档，原图约 1.51 MiB，网页最大档约 107 KiB，裁切选图尺寸考虑原图 3:1 比例。来源哈希与转换记录见 `public/images/products/platform-original.json`。其余期刊风格配图与首页视频文件不变。

首页模型在入场完成且可见后初始化，交互结束后停止空闲渲染，保留拖拽、模型切换和质量降档；登录、手机菜单和功能弹层打开时，统一暂停装饰模型及视频，关闭后按可见性和用户原暂停状态恢复。登录去除整页模糊及 52px 背景模糊，缩短进入动画，并补充背景 inert、焦点循环、Escape 关闭及焦点恢复。首页、导航和产品页内部链接改用客户端切换及指针靠近时预取；显式返回首页保留访客入场，滚动刷新合并到绘制后。新增本地预览入口 `python scripts/serve-preview.py`：带内容哈希的资源长期缓存，普通图片与视频条件校验，页面及错误响应不缓存。

构建、修改文件 lint、14 项既有逻辑测试及 diff 检查通过。本地 Chromium 1440px 中文、390px 中文、320px 英文连续操作验证：登录输入/焦点/滚动锁定、手机菜单转登录、原图加载、页面切换不重载、返回首页入场、无重复固定容器及无页面异常；主线程渲染、无 WebGL、减少动画、离屏初始化和资源 304 校验通过。既有黑幕入场及五处文字近顶部退场回归通过。一轮多浏览器并发测试出现入场等待超时，单独重跑全流程通过；未据此声称并发压力无异常。同机正常与 4 倍 CPU 限速下，导航登录/首屏控制台按钮从 pointerdown 到弹窗 90% 不透明的四次观测由约 173/173/234/184 ms 降为 89/81/136/94 ms；这衡量前端弹窗显示，不是认证网络速度，限速导航点击仍有约 61 ms 长任务。1.5 秒空闲观察窗口模型新增帧由 22–23 降至 0，弹窗打开后 1 秒模型新增帧及视频推进均为 0。证据：`output/interaction-before.json`、`output/interaction-final.json`、`output/performance-behavior.json`、`output/performance-edges.json`、`output/intro-stable-verification.json`、`output/near-top-exit-verification.json`、`output/restored-platform.png`、`output/performance-login.png`。接口使用隔离模拟，未提交登录、短信或订单；实际检查在独立本地 Chromium，未测内置浏览器 GPU 占用，也未发布生产。

本地产品页科学期刊视觉改版（2026-10-13，未发布生产）：生成并接入七张原创科学概念图，分别对应多尺度平台、分子模拟、科学智能、学习、材料、化学和生物计算；不作为真实实验或模拟结果。内置 image_gen 的原始 PNG 保存在 `output/journal-cover-20261013/`，完整提示词与素材清单位于 `public/images/products/journal-v1/provenance.json`；网页使用 640/1280/1536 三档 WebP，总计约 2.70 MiB，按屏幕选图并懒加载。产品页采用深色封面主视觉、浅色阅读区、双列大图目录，调整中英文字体层级、17px 正文、14px 辅助信息、分类搜索排序和空结果恢复；取消无产品的协作分类，保留既有产品资料、实时目录、学习产品入口和购买流程。详情使用原生 dialog，补充焦点循环、Escape/背景关闭、焦点恢复及背景滚动锁定；动效仅短程浮现和轻微图片缩放，支持减少动态效果。首页影片、首页组件和首页滚动样式无改动。构建、修改文件 lint、diff 检查通过；独立 Chromium 实测七组 320–1920px 中英文布局、导航/主视觉无重叠、无横向溢出、全部分类、跨语言关键词和标签搜索、排序、空结果恢复、产品详情开关/焦点/滚动锁定、减少动画、图片加载、无 JS 目录可读及目录接口失败回退通过。购买展示使用隔离的模拟接口数据，未发起真实订单、登录或短信。证据：`output/products-editorial-verification.json`、`output/verify-products-editorial.py`、`output/products-final-*.png`。内置浏览器已请求打开本地产品页；实际测试在独立本地 Chromium 完成，不代表生产发布或真机验收。

本地文字接近顶部后退场（2026-10-13，未发布生产）：首屏、平台介绍和三个固定章节的文字先随页面向上滚动，在文案顶部到达导航下方约 24px 时，再开始缓慢下移与淡出；触发点按未变形布局位置计算，适应文字换行和屏幕尺寸，避免刷新与反向滚动改变阈值。保留 56vh 退场行程与原有缓慢下移速度，透明度改为缓入缓出；原章节停留不变。构建、修改文件 lint 和 diff 检查通过。本地 Chromium 在 1440×900 中文、390×844 中文、320×844 英文验证五处退场触发前保持不透明、触发时文案顶部约 109px/98px（距导航约 24px），首屏新增约 130px/159px/118px 的自然上滚行程；触发后继续滚动 120px 文字仅下移约 3–4px、保留约 87–89% 不透明度；继续滚动可完全淡出，反向恢复无跳动，减少动态效果正常，无页面异常。证据：output/near-top-exit-verification.json、output/near-top-*-start.png、output/near-top-*-fade.png。此条更新此前立即开始退场的时机。

本地首页小字可读性增强（2026-10-13，未发布生产）：统一提高说明、标签、操作提示、导航与页脚的字号、字重和亮度；桌面主要正文 18–20px、手机 17px，标签及辅助信息桌面 15–16px、手机 14–15px。次级文字由 #999da3 提亮为 #c9d2db，图片上的说明增加轻微暗色文字阴影；按钮桌面 18px/手机 16px。保留中英文标题字体，手机长章节随内容撑开，窄屏研究链接可换行。构建与 diff 检查通过，本地 Chromium 验证 320–1920px 七组中英文尺寸的实测字号、导航间距、正文与脚注间距、无横向溢出和研究/工作流标签切换，已查看桌面与手机截图。重新核验文字半速移动（滚动 120px 后约下移 4.3px/4.2px）、三章停留（315px/148px）、反向滚动和减少动态效果均通过，无页面异常。证据：output/readable-type-verification.json、output/readable-*.png、output/gentle-short-hold-verification.json。

本地登录开场与顶部链接修复（2026-10-13，未发布生产）：修复 `#top` 被当作下方锚点而立即跳过开场的问题，未登录用户在普通首页或顶部链接中等待点击、滚轮、键盘或触屏进入。沿用现有账号会话判断；有本地登录会话时直接显示首页，并在静态页面首次绘制前隐藏黑幕，避免已登录访客看到图标闪现。该提示仅影响视觉开场，账号校验、续期和权限逻辑保持原样；下方内容锚点与恢复阅读位置仍可跳过。构建、修改文件 lint、diff 检查通过。本地 Chromium 桌面/手机尺寸验证普通链接、顶部刷新、编码锚点、无效锚点、四种进入方式；隔离模拟登录会话和账号响应，验证脚本加载前后均无黑幕、清除会话后刷新恢复开场，无页面异常。证据：output/intro-stable-verification.json、output/intro-stable-top.png。保留上一轮文字半速与章节停留减半设置。

本地滚动节奏微调（2026-10-13，未发布生产）：将文字的位移和透明度动画分开，位移采用匀速补偿，避免开始滚动时快速下坠；淡出行程由首屏 42vh/后续 45vh 延长到 56vh。用户进一步要求再减半速度，最终相对屏幕的下移幅度为 2vh，分布在 56vh 滚动行程内。三个固定章节的停留行程同步减半：桌面 70vh→35vh，手机 35vh→17.5vh。构建、修改文件 lint、diff 检查通过；本地 Chromium 桌面 1440×900 与手机尺寸 390×844 实测，滚动 120px 后文字下移由约 8.6px/8.5px 降至 4.3px/4.2px，停留行程分别为 315px/148px；正反向淡出与恢复、减少动态效果通过，无页面异常。证据：output/gentle-short-hold-verification.json；对照：output/gentle-short-hold-first-speed.json。


本地品牌开场与高清影片验证（2026-10-13，未发布生产）：依据用户提供的透明 PNG，将共享导航图标改为 AetherMind 正式六边形标志，英文品牌统一为 AetherMind，首页显示 AETHERMIND；英文使用 Cormorant Garamond，中文标题使用 Noto Serif SC，正文与按钮保持黑体。导航品牌字号桌面 22px/手机 19px，页脚导航 17px/16px，点击高度至少 44px。开场以矢量轮廓镂空黑幕，点击、滚轮、键盘或触屏后放大进入主页；进入期间控制焦点和滚轮惯性，直接锚点与无 JS 页面可访问。

本机 ComfyUI H3 以原有分子环境图为首尾帧生成 1664×928、124 帧影片；静止镜头与微幅起伏提示词，经过首尾往返拼接形成约 10.2 秒循环，H.264 文件约 4.6 MB。生成工作流及素材来源记录于 public/videos 与 public/images/brand，未修改用户原始工作流。本次临时 ComfyUI 进程已停止释放显存。影片支持暂停，离屏/后台自动停播，减少动态效果、节省流量或 2G 时不请求视频，播放失败回退原图，保留单个交互 3D 画布。

滚动文字新增首屏下移淡出、下一段上浮渐显、三个固定章节结束后的下移淡出，保留既有阅读停留并支持反向滚动；减少动态效果时清除这些动画。构建与修改文件 lint、14 项既有测试通过；本地 Chromium 核验点击/滚轮/键盘/触屏进入、无 JS、自动播放受限、影片失败与节能回退、实际循环、暂停恢复、7 组中英文尺寸、320px 英文导航无重叠、三个章节正反释放通过。证据：output/aethermind-portal-verification.json、output/aethermind-copy-verification.json、output/aethermind-type-verification.json、output/luma-fullscreen-verification.json 及 output/aethermind-*.png。仅本地浏览器验证，非生产部署或真机验收。


本地全屏 3D 与原创科学素材升级（2026-10-13，未发布生产）：按用户反馈取消首屏纯黑背景和中部模型卡片，将原有真实 3D 置于全屏底层，文字与按钮悬于上方，整个首屏可拖拽；保留单画布、质量降级、像素预算、离屏停帧和无 WebGL 静态降级。内置 image_gen 生成两张原创科学艺术素材，晶格空间用于首屏，暖金晶体用于材料研究面板。网页使用 640/1024/1672 宽 WebP，全尺寸分别约 266/202 KiB；原始 PNG 已复制至 `output/imagegen/`，素材及完整提示词位于 `public/images/immersive/`。构建、修改文件 lint、Chromium 中英文多尺寸（320–1920）、模型拖动、形态切换、登录弹层、标签页和锚点、手机导航、停留边界、减少动画、触屏、无脚本及无 WebGL 检查通过；无页面异常。证据：`output/luma-fullscreen-verification.json`、`output/luma-fullscreen-desktop.png`、`output/luma-fullscreen-mobile.png`、`output/luma-crystal-material.png`。素材是艺术示意，未作为实验结果或物理验证证据。

本地旧版 Luma 风格首页改版（2026-10-13，未发布生产）：经用户确认采用旧版深色沉浸式方向。原版本提交 `3ed49d950af3ddbb801f6fd7cf1f325dafc788b9` 已完整推送至用户授权新建的私有仓库 `HAPPYFAPTAIN/AetherMind-Official-Site-Luma`，备份分支为 `codex/official-scroll-backup-20261013`；本轮在独立分支 `codex/luma-homepage-20261013` 改版。首页采用居中大字、透视科学画廊、三段全幅滚动停留、研究方向切换、工作流步骤切换和品牌收尾。仅一处实时 3D，复用原有质量降级、帧率控制和拖拽；无 WebGL 时显示静态画面，减少动态效果时取消停留和位移动画。修复现有真实锚点被 Showcase 功能预览拦截的问题。原首页组件仍保留，产品、社区与账号页面未重构。构建、修改文件 lint 和 14 项既有单元回归通过；Chromium 实测 320/390/768/1440/1920 宽度、中英文、鼠标拖动与越界捕获、模型切换、控制台登录弹层、移动导航、键盘标签页、三段固定停留及正反向释放、页脚可达、离屏停帧、触屏、减少动画动态切换、无 JavaScript 和无 WebGL 降级通过。测试为本地静态预览，未提交登录、发送短信或验证生产后端。证据：`output/luma-verification.json`、`output/verify-luma.py`、`output/luma-hero-zh-1440.png`、`output/luma-hero-zh-390.png`、`output/luma-intelligence-390.png`。参考旧版页面设计记录：`https://www.landing.love/sites/lumalabs/`；使用本项目科学素材，未复制 Luma 媒体或品牌内容。

本地科学智能文案浮现与居中（2026-10-13，未发布生产）：左侧标签、标题、说明和标签组使用一个整体入场层，随进入行程从下方 72–140px、4% 透明度平滑浮现至完整显示。桌面整组文案以导航下方可视阅读区域为中心，在父模块释放后继续稳定陪伴右侧卡片，移动端保持单列正常阅读；减少动态效果时内容直接可见。保留上轮消除双重固定偏移的处理。构建和修改文件 lint 通过；独立 Chromium 1440×900、2298×1825、390×844 核验透明度渐增、位移渐减、桌面最终中心、释放边界连续、反向滚动、动态减少动画和无横向溢出通过。证据：`output/ai-copy-rise-verification.json`、`output/ai-copy-centered-1440.png`、`output/ai-copy-centered-2298.png`、`output/ai-copy-centered-390.png`。

本地底部四模块停留加长（2026-10-13，未发布生产）：研究场景、结果展示、基础设施、控制台入口的停留距离改为一屏高度，范围 560–1000 CSS px；900px 桌面视口从 585px 增至 900px，844px 手机视口从 549px 增至 844px。其余模块和首屏五节保持原值。构建及 14 项回归通过；独立 Chromium 两种尺寸实测四模块在新增行程内保持、结束后正常释放、页脚可达，核验首屏与其他模块长度保持原值。证据：`output/lower-four-hold-verification.json`。

本地科学智能标题跳动修复（2026-10-13，未发布生产）：复现下方版块结束固定停留时，内部 CSS sticky 重复计入父级停留偏移；1440×900 时页面滚动跨越边界 2px，左侧文案从 y=128 跳至 y=713。将桌面文案跟随改为依据父级释放点的连续位移，在卡片列表范围内保持阅读位置，过高文案自然滚动；手机保持普通布局，减少动态效果或无增强脚本时保留原生 sticky。构建与修改文件 lint 通过。独立 Chromium 验证 1440×900、2298×1825、390×844 以及返回桌面尺寸，停留开始/结束、文案跟随开始/结束的前后像素位置连续，正反向滚动与真实滚轮通过；动态切换减少动画和横向溢出检查通过，无页面异常。证据：`output/ai-copy-continuity.json`、`output/ai-copy-release-fixed.png`。

本地首屏五节行程缩短（2026-10-13，未发布生产）：仅将首屏高度从 500svh 调整为 300svh，五个章节之间的四段滚动距离由每段一屏缩短为半屏；保留章节吸附及文字/模型同步。下方九模块的 65% 视口停留与全幅背景保持原值。构建通过，独立 Chromium 验证 1440×900 每章间距 450px、390×844 每章间距 422px，五章状态与模型 phase 匹配，可退出首屏；下方停留分别仍为 585px 和 549px。证据：`output/hero-short-scroll-verification.json`。

本地停留加长与全幅背景（2026-10-13，未发布生产）：停留行程从视口高度 24% 调整为 65%，范围 360–680 CSS px，900px 桌面视口为 585px、844px 手机视口为 549px。九个模块统一采用位于内容限宽容器之外的全幅背景，删除旧局部背景及强边缘遮罩；按模块分别使用多尺度结构、计算分子、数据粒子和材料纹理，停留期间背景随滚动轻微推近或横移，停止滚动后停止变化。保留静态响应式 WebP、懒加载和减少动态效果设置，不新增 WebGL 场景。加强说明文字与仪表面板对比度。构建、修改文件 lint、13 项测试通过；独立 Chromium 1440×900/390×844 九模块的背景覆盖、视差变化、延长停留、正反向释放、减少动态效果切换、页脚可达和无横向溢出通过；桌面/手机截图检查通过。证据：`output/story-hold-verification.json`、`output/story-immersive-1440-engine.png`、`output/story-immersive-1440-workflow.png`、`output/story-immersive-390-platform.png`。仅本地预览验证。

本地模块短程停留修正（2026-10-13，未发布生产）：根据用户对滚动过程中“吸住”的反馈，将下方九个模块的停止后吸附替换为进入时的短程固定。视口高度的 24% 作为停留行程，限制在 140–240 CSS px；滚动位置持续前进而模块画面保持，越过行程后恢复自然阅读，反向进入同样适用。内部动效声明固定容器以正确计算触发位置，长内容和页脚保持可达，减少动态效果时卸载全部固定容器。构建、核心文件 lint、13 项测试通过；独立 Chromium 1440×900 与 390×844 的九模块均实测滚轮前进 60px、画面位置不变、越过结束点后移动、反向重新停留，尺度标签显示、无横向溢出、减少动态效果动态切换通过。证据：`output/story-hold-verification.json`、`output/story-hold-1440.png`、`output/story-hold-390.png`。此条更新上一轮下方模块停靠机制；属于本地浏览器验证。

本地全页滚动与动效验证（2026-10-13，未发布生产）：将首屏之后九个版块接入单一停靠控制，滚动结束后按方向轻吸附；长版块按重叠视口增加阅读停靠点，页脚可正常离开。平台增加尺度线展开、光点推进和标签依次出现，计算引擎增加进入时的曲线描绘、面板与参数呈现，模拟、科学智能、研究场景、基础设施补充卡片呈现，工作流连线随进入展开；内容离屏后允许返回重播，减少动态效果时移除停靠与入场动画。不新增 3D 场景或持续动画循环。构建、修改核心文件 lint 和 16 项回归通过。独立 Chromium 核验 1440×900 全部停靠点、390×844 长内容分段、反向滚动、页脚退出、曲线重入、动态切换减少动画、320px 英文无横向溢出通过，无页面异常；修正尺度光点容器造成的移动端横向溢出。证据：`output/story-scroll-desktop.json`、`output/story-scroll-compatibility.json`、`output/story-platform.png`、`output/story-engine.png`、`output/story-workflow.png`、`output/story-mobile-platform.png`。结果为本地 Chromium 验证，不代表真机触控或生产发布验收。

本地分章滚动验证（2026-10-13，未发布生产）：首屏五章采用等距停靠点，滚动结束 140ms 后按方向轻吸附，过渡 280–550ms；每章两侧保留展示行程，文字淡入移位、章节高亮、进度线与 3D 形态共用单一进度驱动。取消首页模型独立的滚动进度监听和重复平滑；最后一章后正常离开，快速滚动可跨章，不拦截 wheel/touch 默认行为。新增 3 项回归，总计 12 项通过，构建与修改文件 lint 通过。独立 Chromium 实测桌面 900px 视口小幅滚轮逐次停在 900/1800/2700/3600px，对应模型 phase .32/.58/.82/1 和唯一可见文字；离开首屏、向上返回、1440px/390px 章节按钮前后跳转、动态切换减少动画设置均通过。两条渲染路径的拖拽回归通过。证据：`output/hero-scroll-verification.json`、`output/hero-scroll-compatibility.json`、`output/hero-scroll-chapter-*.png`；本轮只调整首屏五章，不为下方所有内容强制分页。

本地按钮调整（2026-10-13，未发布生产）：首页“探索平台 / 打开控制台”统一放大，桌面最小 192×64px、18px 字号，手机最小 148×56px、16px 字号；窄屏自动换行，并增强次按钮描边及键盘焦点。构建通过，独立 Chromium 核验 1440/390/320px 中英文六组按钮均未越界或截字。证据：`output/hero-buttons-verification.json`、`output/hero-buttons-*.png`。320px 英文页面下方原有 continuum 尺度标签存在页面溢出，与本轮按钮无关，未纳入修改。

本地拖拽验证（2026-10-13，未发布生产）：首页新增鼠标左键拖拽，首屏区域可起拖（排除按钮/链接/表单），Pointer Capture 允许越过模型和首屏边界继续跟踪。使用屏幕坐标四元数累积，水平/垂直统一按 CSS 像素计算角度，支持连续整圈，无欧拉角限位；松手保留用户角度，拖动期间暂停自动旋转。中画质拖动上限约 60 fps，低画质约 30 fps，空闲仍约 15 fps。新增 4 项拖拽回归，总计 9 项测试通过，构建与修改文件 lint 通过。独立 Chromium 的 Worker/主线程两条路径实测：1440×900 窗口横向、纵向、斜向 120px 均约 24°，拖动约 60 fps；首屏左侧起拖、越界捕获、松手保持、按钮避让、失焦取消和滚动通过，无页面异常。低画质切换、减少动态效果、闲置节流回归通过。证据：本地 `output/hero-drag-verification.json`、`output/verify-hero-drag.py`、`output/hero-drag-*.png`。手机触摸继续用于页面滚动，不接管为鼠标拖拽。

本地验证（2026-10-13，未发布生产）：首页 3D 性能优化覆盖电脑与手机，按渲染回执节奏自动降档，不依赖设备名称。默认中画质、DPR 上限 1.5、约 207 万像素预算，取消全屏柔光/HDR 中间缓冲，简化原子/连接键/透明膜并保留原结构与交互；闲置约 15 fps，交互约 30 fps。持续两段慢帧观察窗口后切换低画质，DPR 上限 1、约 105 万像素预算，缩放不恢复高档。5 项测试通过、生产构建通过、lint 0 错误（10 项既有 img 警告）。本机 Chromium：1440×900 @2x 和 390×844 @3x 的真实 WebGL、滚动形变、离屏暂停/恢复通过；主线程备用路径、减少动态效果、桌面模拟慢回执降档通过，无页面异常。相同模型基础三角形从 1,023,744 降至 258,048，低档 126,528；桌面测试画布从 2880×1800 降至 1821×1138，闲置实测约 15 fps。证据：本地 `output/hero-verification.json`、`output/hero-edge-verification.json` 和 `output/hero-*.png`；新预览位于 `output/preview`，使用 `python output/serve-preview.py` 在原 `/official/` 地址启动。原受版本控制的 `out/` 未更新。内置浏览器自动检查受本机沙箱启动错误限制，以上结果来自独立 Chromium，未测得用户内置浏览器的 GPU 占用百分比。

E-036（2026-10-10）：产品改按自定义期限授权，OWNER 的 MD EXP 按明确确认恢复30天。隔离 SQLite 回归验证三次调用只扣积分不减少期限、到期拒绝、普通用户不能改期限、管理员设置期限、按天激活码和 MD EXP 入口；1项综合测试通过，build:ip通过，lint无错误。生产只读核验 active=true、期限约30天、gateway授权通过。浏览器匿名页正常；登录后的完整管理页面点击仍未验收。备份 `/var/backups/aethericai-official/20261010-duration-access/`，静态发布 `20261010-duration`，细节见 `docs/md-agent-console.md`。
E-037（2026-10-10）：控制台用户下拉菜单新增「仪表盘」入口，指向 `/official/dashboard/`。本地静态浏览器验证菜单出现、点击后到达 dashboard 且无控制台错误；生产软链切换后 `/official/console/` 与 `/official/dashboard/` 均 HTTP 200。备份 `/var/backups/aethericai-official/20261010-dashboard-menu/`，发布 `20261010-dashboard-menu`。
E-038（2026-10-10）：移除控制台和仪表盘顶栏品牌旁的「控制台」文字，只保留以太智元品牌、侧栏/菜单和既有入口功能。`build:ip`、TypeScript、lint（0 errors）和 `git diff --check` 通过；生产发布 `20261010-no-console-label`，公网 dashboard/console HTML 均未出现该顶栏文案，旧版本保存在 `20261010-dashboard-menu`。
E-039（2026-10-11）：控制台/仪表盘头像改为蓝色圆形用户图标；仪表盘侧栏底部加入浅色、深色、跟随系统切换并持久化本地偏好；控制台移除返回官网和语言切换按钮。隔离浏览器验证三种主题菜单、浅色切换后的背景/顶栏样式、头像和控制台顶栏结构；`build:ip`、TypeScript、`git diff --check` 通过，lint 无新增错误。生产发布 `20261011-dashboard-theme`，dashboard/console 均 HTTP 200，旧版本为 `20261010-no-console-label`。
E-040（2026-10-11）：按最新界面确认，控制台头像取消右侧箭头，点击头像直接打开账户菜单；控制台账户菜单移除明暗模式，主题入口仅保留在仪表盘侧栏底部。浏览器验证菜单仅含仪表盘、个人中心、退出登录；`build:ip`、TypeScript、`git diff --check` 通过，lint 无新增错误。生产发布 `20261011-menu-cleanup`，dashboard/console 均 HTTP 200，旧版本为 `20261011-dashboard-theme`。
E-041（2026-10-11）：仪表盘「产品权益」改为只展示当前已激活产品，每项显示产品名称、有效期和直接进入按钮；移除产品总数、`2 / 8` 和进度条。两个已激活产品的隔离浏览器 DOM/截图验证通过；`build:ip`、TypeScript、lint、`git diff --check` 通过。生产发布 `20261011-products-access-list`，dashboard HTTP 200，旧版本为 `20261011-menu-cleanup`。
E-042（2026-10-11）：新增总管理员模型控制：供应商 URL/协议/密钥加密配置、全局模型路由、按用户额外模型授权；官方网关模型目录与调用均按用户有效授权过滤，dsh provisioner 按绑定用户刷新 settings。专项迁移/加密/授权回归 `9 passed`，build:ip、TypeScript、lint、`git diff --check` 通过；生产认证数据库迁移到 0006、完整性检查 ok，auth/gateway/mdagent active，dsh 刷新 23 个租户，模型管理前端发布 `20261011-model-admin`，后端默认模型费率补丁发布 `20261011-model-access-rate`，dashboard HTTP 200。
E-042（2026-10-11）：修复新用户（手机号尾号 2080）进入 MD EXP 后发送消息报 `Provider is not configured: deepseek`。根因是新用户模板的 Kimi/DeepSeek provider 缺少 `apiKeyEnv: MDEXP_PROXY_KEY`；已补齐模板并重写已绑定租户配置，生产备份 `/var/backups/aethericai-official/20261011-145754-model-catalog/`，`mdagent-api` 重启后 active。2080 用户配置和模板均已核验包含代理环境变量；入口票据生成成功，官网入口 HTTP 200 且不再返回该 provider 错误。新增模型目录回归断言。
E-043（2026-10-13）：产品卡片移除英文大标题和重复中文副标题，四个产品分别使用「分子模拟智能体、分子模拟工作流、电子结构与材料计算、轨迹与性质分析」作为大标题。桌面/390px 浏览器截图和 DOM 验证通过，原 `.agent-subtitle` 数量为 0、无横向溢出、控制台无错误；`build:ip` 和 lint 通过（保留原有 `<img>` 性能 warning）。生产发布 `20261013-console-cn-titles`，console HTML SHA-256 `e9cbf056a6a3289b71ad7d6b89767283cb6ba2c7dc4b33656a77a3a18ca73d9c`。
E-044（2026-10-13）：第二个产品标题改为「分子模拟智能体」，第三、第四个标题分别加上「智能体」后缀，最终为「电子结构与材料计算智能体」「轨迹与性质分析智能体」。390px DOM 验证确认四个标题、旧副标题数量为 0、无横向溢出、控制台无错误；`build:ip` 和 lint 通过。生产发布 `20261013-console-agent-suffix`，console HTML SHA-256 `6e949b1b504b196194a85f87132e52453c209051fbd1f50d0e6e10c098fbdf26`。
E-045（2026-10-13）：移除产品目录上方的筛选/搜索横排，产品卡片直接从内容区开始展示。浏览器 DOM 确认 `.console-toolbar` 数量为 0，四个产品标题保持正确，控制台无错误；`build:ip` 和 lint 通过。生产发布 `20261013-console-no-toolbar`，console HTML SHA-256 `618a496bd45186a2b6270f6db0f0c666a94914c6724176852a60e53ca4622f42`。
E-046（2026-10-13）：控制台侧栏移除「模型配置」选项和对应页面；模型配置继续保留在总管理员后台。浏览器 DOM 确认侧栏仅有智能体目录、超算连接、计算任务，模型配置页面节点为 0，控制台无错误；`build:ip` 和 lint 通过。生产发布 `20261013-console-no-model-tab`，console HTML SHA-256 `c035710043357fa994471ed753e4de2dbd1a4a7d895b6e3aeea0b3209284b938`。
E-047（2026-10-13）：移除产品卡片右侧的「可用、已获得产品资格、下个月上架」状态标签，并取消第一张可用卡片的蓝色高亮大边框；进入/敬请期待按钮保留。浏览器 DOM 确认 `.agent-status` 数量为 0，普通边框样式生效，标题保持正确且控制台无错误；`build:ip` 和 lint 通过。生产发布 `20261013-console-no-status-highlight`，console HTML SHA-256 `822bd1c6d482708be2f7b8c72c86f46c3c719e3b1135ee9bb62add7223399e51`。
E-048（2026-10-13）：超算连接页改为两个选项：以太智元超算和用户自配超算。平台选项显示规格 `auto`；用户自配选项显示「联系客服」，不声明虚假的在线状态。浏览器 DOM 验证两个选项、`auto` 规格和联系客服按钮，控制台无错误；`build:ip` 和 lint 通过。生产发布 `20261013-console-compute-options`，console HTML SHA-256 `d729b33a73a8da22345ba8b60e0731aa4f86444f4fefc8b1507f99e887ce1804`。
E-049（2026-10-13）：修复无在线 mdshell 时仍强制 remote-world 的配置错误；无节点租户保留本机 sandbox provider，在线节点仍使用 remote-world。生产备份 `/var/backups/aethericai-official/20261013-210904-local-sandbox-fallback/`，`mdagent-api` active，健康检查 200，本地/远程 overlay 模式回归通过，Landlock runner 存在。超算连接未改动。

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
