#!/usr/bin/env python3
"""Apply the fixed scientific-sandbox policy to the verified MD-Agent install."""
from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
import shutil
import sys


ROOT = Path("/opt/mdagent")
CODE = ROOT / "code"
PROVISION = CODE / "cloud/provision.py"
SOURCE_PRESET = CODE / "presets/md-sim-assistant/agent.cordis.yml"
PLUGIN = CODE / "dsh-plugins/mdagent-safety"
BACKUP = Path("/var/backups/aethericai-official") / (datetime.now().strftime("%Y%m%d-%H%M%S") + "-permission-hardening")


def update_preset(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    replacements = {
        "【自由面】分析、绘图、读文献、写一次性脚本、整理 scratch 目录 —— 直接 bash/write/edit，不必请示。":
        "【科研沙箱】分析、绘图、读文献、写科研脚本、整理当前项目 —— 只能在当前用户沙箱内执行；禁止删除文件、目录、作业或进程。",
        "一般性工作（分析/写脚本/整理文件）直接 bash/write/edit；长任务后台启动并回报 PID+日志路径":
        "一般性工作（分析/写脚本/整理文件）可直接执行，但不得删除文件、目录、作业或进程；长任务后台启动并回报 PID+日志路径",
        "唯一停下等用户的例外：不可逆且无法备份的破坏操作。auto-approve 已废除（2026-09-17 加固）：每次 sim_exec 都过系统弹窗人工闸，判断与披露一分不省。":
        "删除、清空、覆盖式破坏、杀进程和终止作业均为系统禁止操作；不请求用户批准，也不尝试绕过拒绝。科研计算命令只能在当前用户沙箱内运行。",
        "读原文、写脚本、改输入直接干。沙箱 danger-full-access：读写不设工作区边界，直接执行；仍守最小破坏原则——只动任务相关文件，改动先备份。":
        "读原文、写科研脚本和整理当前项目。沙箱固定为 workspace-write，只允许当前用户工作区；系统禁止删除、清空和跨用户访问。",
        "预算默认 3 项，全败停下汇总请用户决策；自动审批开着也照讲每步后果——省的是点击不是告知。":
        "预算默认 3 项，全败停下汇总；删除、清空、杀进程和终止作业由系统固定拒绝。",
        "请求审批前在说清'要做什么+为什么+不做会怎样';被拒一次不原样重发,换更小的方案或把决定权交回用户。":
        "不请求权限审批；被系统拒绝后如实报告，并换用只读检查或当前沙箱内的安全操作。",
        "工作区外(如 程序运行-case/)写会触发 dsh 审批弹窗(approval policy=ask)。":
        "所有读写固定限制在当前用户 workspace-write 沙箱内，越界操作由系统直接拒绝。",
    }
    for old, new in replacements.items():
        if old not in text and new not in text:
            raise RuntimeError(f"preset anchor missing in {path}: {old[:60]}")
        if old in text:
            text = text.replace(old, new, 1)
    target = BACKUP / path.relative_to(ROOT)
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, target)
    path.write_text(text, encoding="utf-8")


def patch_provision() -> None:
    text = PROVISION.read_text(encoding="utf-8")
    old_plugins = '"dsh-md-flow-gate", "dsh-md-friction",\n               "dsh-remote-world")'
    new_plugins = '"dsh-md-flow-gate", "dsh-md-friction", "mdagent-safety",\n               "dsh-remote-world")'
    old_bundles = '"dsh-md-flow-gate", "dsh-md-friction",\n               "dsh-remote-world"]'
    new_bundles = '"dsh-md-flow-gate", "dsh-md-friction", "mdagent-safety",\n               "dsh-remote-world"]'
    if old_plugins in text:
        text = text.replace(old_plugins, new_plugins, 1)
    elif '"mdagent-safety"' not in text:
        raise RuntimeError("WEB_PLUGINS anchor missing")
    if old_bundles in text:
        text = text.replace(old_bundles, new_bundles, 1)
    elif '"mdagent-safety"' not in text:
        raise RuntimeError("WEB_BUNDLES anchor missing")
    target = BACKUP / PROVISION.relative_to(ROOT)
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(PROVISION, target)
    PROVISION.write_text(text, encoding="utf-8")


def sync_user(username_dir: Path) -> None:
    dsh_home = username_dir / "dsh-home"
    if not dsh_home.is_dir():
        return
    profile = dsh_home / "profiles/web"
    if profile.is_dir():
        modules = profile / "node_modules"
        modules.mkdir(parents=True, exist_ok=True)
        link = modules / "mdagent-safety"
        if link.exists() or link.is_symlink():
            if link.is_symlink() and link.resolve() == PLUGIN.resolve():
                pass
            else:
                link.unlink()
        if not link.exists():
            link.symlink_to(PLUGIN)
        package = profile / "package.json"
        if package.is_file():
            data = json.loads(package.read_text(encoding="utf-8"))
            bundles = data.setdefault("dsh", {}).setdefault("profile", {}).setdefault("bundles", [])
            if "mdagent-safety" not in bundles:
                target = BACKUP / package.relative_to(ROOT)
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(package, target)
                bundles.append("mdagent-safety")
                package.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    preset = dsh_home / ".agent-presets/md-sim-assistant/agent.cordis.yml"
    if preset.is_file():
        update_preset(preset)


def main() -> None:
    if Path.cwd() != ROOT and not PROVISION.exists():
        raise SystemExit("must run on the verified MD-Agent host")
    if not PLUGIN.is_dir():
        raise SystemExit(f"missing plugin: {PLUGIN}")
    BACKUP.mkdir(mode=0o700, parents=True, exist_ok=True)
    update_preset(SOURCE_PRESET)
    patch_provision()
    for user_dir in (ROOT / "users").iterdir():
        if user_dir.is_dir():
            sync_user(user_dir)
    print("permission-hardening: synced", BACKUP)


if __name__ == "__main__":
    main()
