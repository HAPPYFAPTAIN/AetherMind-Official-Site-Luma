#!/usr/bin/env python3
"""Move the active official-site static release to the /data disk safely."""
from __future__ import annotations

from datetime import datetime
from html.parser import HTMLParser
import os
from pathlib import Path
import re
import shutil
import subprocess


SITE_ROOT = Path("/opt/aethericai-official")
DATA_ROOT = Path("/data/aethericai-official")
STATIC_ROOT = DATA_ROOT / "static"
RELEASES_ROOT = DATA_ROOT / "releases"


class AssetParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.refs: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for key, value in attrs:
            if key in {"src", "href"} and value and value.startswith("/"):
                self.refs.add(value.split("?", 1)[0].split("#", 1)[0])


def inventory(root: Path) -> tuple[int, int]:
    count = 0
    total = 0
    for path in root.rglob("*"):
        if path.is_file():
            count += 1
            total += path.stat().st_size
    return count, total


def route_for(path: Path, out: Path) -> str:
    rel = path.relative_to(out)
    if rel.name == "index.html":
        rel = rel.parent
    route = "/".join(rel.parts)
    return "/official/" if not route else "/official/" + route.rstrip("/") + "/"


def page_assets(out: Path, page: Path) -> list[str]:
    parser = AssetParser()
    parser.feed(page.read_text(encoding="utf-8", errors="ignore"))
    refs = sorted(parser.refs)
    groups: list[str] = []
    for ref in refs:
        if ref.startswith("/official/"):
            local = out / ref.removeprefix("/official/")
            if local.exists():
                groups.append(ref)
        elif ref.startswith(("/_next/", "/assets/", "/images/", "/science/")):
            groups.append("/official" + ref)
    return sorted(set(groups))


def write_manifest(out: Path, release_name: str) -> Path:
    doc = STATIC_ROOT / "STATIC_ASSETS.md"
    pages = sorted(out.rglob("index.html"))
    lines = [
        "# 官网静态资源目录",
        "",
        f"- 生成时间：{datetime.now().astimezone().isoformat(timespec='seconds')}",
        f"- 当前 release：`{release_name}`",
        f"- Nginx 实际入口：`/opt/aethericai-official/current/out` → `/data/aethericai-official/releases/{release_name}/out`",
        "- 页面访问前缀：`/official/`",
        "",
        "## 目录分层",
        "",
        "```text",
        f"/data/aethericai-official/",
        "├── static/",
        "│   ├── STATIC_ASSETS.md",
        f"│   └── current → ../releases/{release_name}/out",
        "└── releases/",
        f"    └── {release_name}/out/",
        "        ├── _next/static/     Next.js 构建脚本、样式和页面 chunk",
        "        ├── assets/products/   产品卡片和产品图",
        "        ├── images/g01..g03/   官网科学视觉图及响应式变体",
        "        ├── science/           科学场景 worker 脚本",
        "        ├── console/           控制台及 compute 页面",
        "        ├── products/          产品目录和详情页",
        "        └── *.html              页面入口和错误页",
        "```",
        "",
        "## 页面与资源",
        "",
        "| 页面 | 本地入口 | 主要资源路径 |",
        "|---|---|---|",
    ]
    for page in pages:
        refs = page_assets(out, page)
        prefixes = sorted({
            "/official/_next/static/" if ref.startswith("/official/_next/static/") else
            "/official/assets/" if ref.startswith("/official/assets/") else
            "/official/images/" if ref.startswith("/official/images/") else
            "/official/science/" if ref.startswith("/official/science/") else
            ref
            for ref in refs
        })
        lines.append(f"| `{route_for(page, out)}` | `{page.relative_to(out)}` | "
                     + ("<br>".join(f"`{prefix}`" for prefix in prefixes) if prefixes else "无外部资源引用")
                     + " |")
    lines.extend([
        "",
        "## 资源访问规则",
        "",
        "- 所有资源仍通过 `/official/...` 访问，页面代码不改绝对路径。",
        "- `_next/static/`、`assets/`、`images/`、`science/` 与页面目录同属当前 release，切换 release 时整体切换。",
        "- 迁移只改变本地文件所在磁盘，不改变公网 URL；旧 release 保留在 `/opt/aethericai-official/releases/` 作为回滚副本。",
    ])
    doc.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return doc


def main() -> None:
    if os.geteuid() != 0:
        raise SystemExit("must run as root on the verified production host")
    current = SITE_ROOT / "current"
    source = current.resolve()
    if not source.is_dir():
        raise SystemExit(f"active release is not a directory: {source}")
    release_name = source.name
    target = RELEASES_ROOT / release_name
    if target.exists():
        raise SystemExit(f"target already exists, refusing to overwrite: {target}")
    before_count, before_bytes = inventory(source)
    RELEASES_ROOT.mkdir(mode=0o755, parents=True, exist_ok=True)
    STATIC_ROOT.mkdir(mode=0o755, parents=True, exist_ok=True)
    shutil.copytree(source, target, symlinks=True)
    after_count, after_bytes = inventory(target)
    if (before_count, before_bytes) != (after_count, after_bytes):
        raise SystemExit(f"copy verification failed: before={(before_count, before_bytes)} after={(after_count, after_bytes)}")
    write_manifest(target / "out", release_name)
    static_current = STATIC_ROOT / "current"
    if static_current.exists() or static_current.is_symlink():
        static_current.unlink()
    static_current.symlink_to(Path("../releases") / release_name / "out")
    current_target = SITE_ROOT / ("current.data-rollback-" + datetime.now().strftime("%Y%m%d-%H%M%S"))
    current_target.symlink_to(source)
    next_link = SITE_ROOT / "current.data-next"
    if next_link.exists() or next_link.is_symlink():
        next_link.unlink()
    next_link.symlink_to(target)
    os.replace(next_link, current)
    rollback_note = DATA_ROOT / "last-migration.txt"
    rollback_note.write_text(
        f"previous={source}\ncurrent={target}\nrollback_link={current_target}\n",
        encoding="utf-8",
    )
    subprocess.run(["nginx", "-t"], check=True)
    print(f"MIGRATED={target}")
    print(f"ROLLBACK_LINK={current_target}")
    print(f"MANIFEST={STATIC_ROOT / 'STATIC_ASSETS.md'}")
    print(f"FILES={after_count} BYTES={after_bytes}")


if __name__ == "__main__":
    main()
