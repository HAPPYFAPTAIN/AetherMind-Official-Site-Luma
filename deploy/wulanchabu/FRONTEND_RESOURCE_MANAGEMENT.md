# 官网前端资源管理规范

本文档是后续前端工程师修改官网页面、添加图片、增加静态脚本和发布资源时的唯一操作入口。

## 先记住两个目录

开发源代码在 Git 仓库：

```text
/Users/joseph/Repository/Angsheng/AetherMind-Official-Site/
├── src/app/                 页面路由和页面入口
├── src/components/          页面组件和页面样式
├── src/data/productAssets.ts 产品资源与产品卡片映射
├── src/lib/assets.ts        资源路径工具
├── public/assets/           通用和产品静态资源
├── public/images/           官网视觉图片，按 g01/g02/g03 分组
└── public/science/          科学场景 worker 脚本
```

生产前端专属资源区在新数据盘：

```text
/data/aethericai-official/
├── static/
│   ├── FRONTEND_RESOURCE_MANAGEMENT.md  本文档
│   ├── STATIC_ASSETS.md                 页面与资源清单
│   └── current → ../releases/<release>/out
└── releases/
    └── <release>/out/                   某次完整发布的静态输出
```

生产环境中所有官网静态文件都必须进入 `/data/aethericai-official/` 的 release 结构。`/data` 根目录、`/opt/aethericai-official/current/out` 和旧 release 目录都不是前端工程师直接放文件的地方。

## 新增或修改资源时怎么做

1. 在 Git 源码仓库中修改页面和资源。图片放进 `public/assets/` 或 `public/images/<页面分组>/`，科学 worker 放进 `public/science/`。产品图片同步检查 `src/data/productAssets.ts` 的引用。
2. 页面资源使用站内 `/official/...` 路径或仓库已有的 `asset-url` 工具。不要写服务器绝对路径、`/opt/...` 路径或临时磁盘路径。
3. 构建并检查输出：

   ```bash
   bun run build:ip
   python3 deploy/wulanchabu/verify-static-assets.py --out out --public public --manifest output/STATIC_ASSETS.json
   ```

4. 把完整构建输出作为一个新 release 放到：

   ```text
   /data/aethericai-official/releases/<release-name>/out/
   ```

   `<release-name>` 使用日期加功能名，例如 `20261015-products-resource-update`。不要把新文件散放在 `static/` 根目录，也不要覆盖现有 release。

5. 生成或更新 `/data/aethericai-official/static/STATIC_ASSETS.md`，列出页面入口和资源目录。资源属于某个页面时，优先放进对应页面或产品分组，不要把所有图片堆到同一个目录。
6. 复制完成后先核对文件数量、总字节数和关键文件哈希，再原子切换 `/opt/aethericai-official/current`。切换后运行 Nginx 检查和公网页面回归。

## 生产目录怎么分层

| 资源类型 | 源码位置 | release 输出位置 | 公网路径示例 |
|---|---|---|---|
| 首页和页面 HTML | `src/app/` | `out/index.html`、`out/<page>/index.html` | `/official/`、`/official/console/` |
| Next 构建脚本和样式 | 构建生成 | `out/_next/static/` | `/official/_next/static/...` |
| 产品图片 | `public/assets/products/`、`src/data/productAssets.ts` | `out/assets/products/` | `/official/assets/products/lammps.png` |
| 官网视觉图 | `public/images/g01..g03/` | `out/images/g01..g03/` | `/official/images/g01/...` |
| 新版官网视觉图 | `public/images/immersive/`、`products/`、`brand/`、`contact/` | `out/images/` 对应分组 | `/official/images/immersive/...` |
| 首页影片 | `public/videos/` | `out/videos/` | `/official/videos/aethermind-h3-subtle-hd.mp4` |
| 科学场景 worker | `public/science/`、构建脚本 | `out/science/` | `/official/science/...` |
| 计算控制台静态页 | 控制台源文件或 hpc-dev 资源 | `out/console/compute/` | `/official/console/compute/` |
| 资源说明文档 | 本文件和清单生成脚本 | `/data/aethericai-official/static/` | 通常不作为产品页面展示 |

`_next/static/` 是构建产物，禁止手动改其中的 chunk。需要改变其中内容时修改源代码后重新构建。`out/` 中的 HTML、chunk 和图片必须作为同一个 release 一起发布，不能只替换单个文件。

## 发布前必须检查

- `readlink -f /opt/aethericai-official/current` 指向 `/data/aethericai-official/releases/<release>`。
- 页面入口返回 200：`/official/`、`/official/console/`、`/official/dashboard/`、`/official/products/`、`/official/products/md-exp/`、`/official/products/learn-everything/`、`/official/console/compute/`。
- 图片、worker、Next chunk 关键路径返回 200，不能只检查 HTML。
- `nginx -t` 通过。
- 浏览器打开首页、控制台、产品页和计算页，确认没有资源 404、白屏或旧资源混入。
- 页面资源清单已更新到 `/data/aethericai-official/static/STATIC_ASSETS.md`。

可重复执行公网入口与引用检查（默认验证 TLS 证书）：

```bash
python3 deploy/wulanchabu/verify-static-assets.py
```

## 候选发布包与完整清单

执行 `python3 deploy/wulanchabu/prepare-static-release.py 20261015-frontend-resources`，
校验所有 public 文件原样进入导出目录后，在 `output/releases/` 生成完整压缩包。
包内包含 `out/`、逐文件大小和 SHA-256 的 `STATIC_ASSETS.json`、清单与本文档；不覆盖已有同名候选包。
构建脚本使用显式 Next CLI 路径和 webpack，以兼容 Windows 上缺少可执行 shim 的工作目录。
请从干净的源码检出构建，避免旧导出文件混入；禁止从旧 release 拼接 Next chunk。

上传压缩包到个人暂存目录，核对 SHA-256 后解压到全新的数据盘 release 目录。
逐文件验证大小和哈希、总数和总字节数，通过浏览器回归后才正式切换。
候选包准备和校验不会改变 current；正式切换还要同步 static/current 及清单。
`release-workspace.sh` 是历史整站脚本，不适用于本次数据盘静态发布。

公网验证带 `--manifest STATIC_ASSETS.json` 时会核对每个文件的内容。
仅在确认服务器身份的自签名证书环境中使用 `--insecure`，默认不关闭 TLS 验证。

`public/console/compute/index.html` 归档自生产 release `20261013-console-compute-options`，
保留同源接口与登录入口，不包含用户凭据；用完整浏览器导航访问，不能用 Next 路由预取。
MD EXP 产品地址也已纳入源码，产品权益沿用账号 API，工作区入口经过现有控制台权限检查。
SSH 端口为 23850，使用个人私钥；私钥、密码及账号数据不得放入源码或发布包。

## 回滚操作

迁移或发布时不要删除旧 release。当前切换前会生成类似下面的回滚链接：

```text
/opt/aethericai-official/current.data-rollback-YYYYMMDD-HHMMSS
```

如果新 release 出现白屏或资源 404，把 `current` 原子切回该回滚链接，确认页面恢复后再排查新 release。任何清理旧 release、批量删除资源或改变 Nginx alias，都需要先做备份并单独记录。

## 禁止事项

- 不要在 `/data` 根目录直接放图片、JS、HTML。
- 不要直接编辑线上 `current/out` 文件来修页面。
- 不要把不同页面的图片混到一个无分类目录。
- 不要手动改 `_next/static` 文件名或内容。
- 不要切换 release 后忘记更新资源清单和做公网回归。
- 不要因为页面能打开就跳过图片、worker 和 chunk 的加载检查。
