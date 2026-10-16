#!/usr/bin/env python3
"""Add unavailable agent choices and compute links to the DSH UI."""
from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path
import shutil
import subprocess


ROOT = Path("/opt/mdagent")
BACKUPS = Path("/var/backups/aethericai-official")

PLACEHOLDER_DECL = '''
\t\tconst UNAVAILABLE_AGENT_PRESETS = [
\t\t\t{ id: "protein-membrane-agent", trust: "system", name: "蛋白质与膜体系智能体", description: "暂不可用 / Temporarily unavailable" },
\t\t\t{ id: "electronic-structure-agent", trust: "system", name: "电子结构与材料计算智能体", description: "暂不可用 / Temporarily unavailable" },
\t\t\t{ id: "trajectory-analysis-agent", trust: "system", name: "轨迹与性质分析智能体", description: "暂不可用 / Temporarily unavailable" }
\t\t];
\t\tconst UNAVAILABLE_AGENT_PRESET_IDS = new Set(UNAVAILABLE_AGENT_PRESETS.map((option) => option.id));
'''
AGENT_COMPONENT_ANCHOR = '\t\tfunction AgentPresetSeat({ load, select, introduced, useAgentPresetSeat, t }) {'
AGENT_OPTIONS_ANCHOR = '\t\t\tconst characters = Array.from(label);'
AGENT_OPTIONS_INSERT = '''\t\t\tconst displayOptions = [
\t\t\t\t...state.options,
\t\t\t\t...UNAVAILABLE_AGENT_PRESETS.filter((placeholder) => !state.options.some((option) => option.id === placeholder.id))
\t\t\t];
\t\t\tconst characters = Array.from(label);'''
AGENT_ITEMS_ANCHOR = 'items: state.options.map((option) => {'
AGENT_ITEMS_INSERT = 'items: displayOptions.map((option) => {'
AGENT_SELECT_ANCHOR = '''onSelect: (id) => {
\t\t\t\t\tsetOpen(false);
\t\t\t\t\tselect(id);
\t\t\t\t}'''
AGENT_SELECT_INSERT = '''onSelect: (id) => {
\t\t\t\t\tsetOpen(false);
\t\t\t\t\tif (UNAVAILABLE_AGENT_PRESET_IDS.has(id)) {
\t\t\t\t\t\tif (typeof window !== "undefined") window.alert("该智能体暂时不可用 / This agent is temporarily unavailable.");
\t\t\t\t\t\treturn;
\t\t\t\t\t}
\t\t\t\t\tselect(id);
\t\t\t\t}'''

SIDEBAR_MARKER = 'className: SidebarRoot_module_css_default.logoRow'
SIDEBAR_TOOLTIP = '(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {'
SIDEBAR_LINKS = '''wide && (0, react_jsx_runtime.jsx)("a", {
\t\t\t\t\t\t\t\t\tclassName: SidebarRoot_module_css_default.iconButton,
\t\t\t\t\t\t\t\t\thref: "/official/console/compute/",
\t\t\t\t\t\t\t\t\t"aria-label": "超算连接",
\t\t\t\t\t\t\t\t\ttitle: "超算连接",
\t\t\t\t\t\t\t\t\tchildren: "⚡"
\t\t\t\t\t\t\t\t}), wide && (0, react_jsx_runtime.jsx)("a", {
\t\t\t\t\t\t\t\t\tclassName: SidebarRoot_module_css_default.iconButton,
\t\t\t\t\t\t\t\t\thref: "/official/console/compute/#jobs",
\t\t\t\t\t\t\t\t\t"aria-label": "计算任务",
\t\t\t\t\t\t\t\t\ttitle: "计算任务",
\t\t\t\t\t\t\t\t\tchildren: "▣"
\t\t\t\t\t\t\t\t}), '''


def patch_agent(path: Path) -> bool:
    source = path.read_text(encoding="utf-8")
    if "UNAVAILABLE_AGENT_PRESETS" in source:
        return False
    start = source.find(AGENT_COMPONENT_ANCHOR)
    if start < 0:
        raise RuntimeError(f"agent seat anchor is not unique: {path}")
    end = source.find("\n\t\t//#endregion", start)
    if end < 0:
        raise RuntimeError(f"agent seat region missing: {path}")
    segment = source[start:end]
    if segment.count(AGENT_OPTIONS_ANCHOR) < 1:
        raise RuntimeError(f"agent options anchor is missing: {path}")
    if segment.count(AGENT_ITEMS_ANCHOR) != 1:
        raise RuntimeError(f"agent menu anchor is not unique: {path}")
    if segment.count(AGENT_SELECT_ANCHOR) != 1:
        raise RuntimeError(f"agent select anchor is not unique: {path}")
    segment = PLACEHOLDER_DECL + segment
    segment = segment.replace(AGENT_OPTIONS_ANCHOR, AGENT_OPTIONS_INSERT, 1)
    segment = segment.replace(AGENT_ITEMS_ANCHOR, AGENT_ITEMS_INSERT, 1)
    segment = segment.replace(AGENT_SELECT_ANCHOR, AGENT_SELECT_INSERT, 1)
    source = source[:start] + segment + source[end:]
    path.write_text(source, encoding="utf-8")
    return True


def patch_sidebar(path: Path) -> bool:
    source = path.read_text(encoding="utf-8")
    if 'data-dsh-nav="compute"' in source:
        return False
    start = source.find(SIDEBAR_MARKER)
    if start < 0:
        raise RuntimeError(f"sidebar logo marker missing: {path}")
    tooltip = source.find(SIDEBAR_TOOLTIP, start)
    if tooltip < 0:
        raise RuntimeError(f"sidebar logo tooltip missing: {path}")
    # The first tooltip after logoRow is the collapse button. Put the two
    # compact links between the brand and that button, preserving the shell.
    source = source[:tooltip] + SIDEBAR_LINKS + source[tooltip:]
    source = source.replace('"aria-label": "超算连接",', '"aria-label": "超算连接",\n\t\t\t\t\t\t\t\t\t"data-dsh-nav": "compute",', 1)
    source = source.replace('"aria-label": "计算任务",', '"aria-label": "计算任务",\n\t\t\t\t\t\t\t\t\t"data-dsh-nav": "jobs",', 1)
    path.write_text(source, encoding="utf-8")
    return True


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    if args.root != ROOT or not (ROOT / "code/node_modules/.pnpm").is_dir():
        raise SystemExit("--apply is restricted to the verified MD-Agent deployment")
    if not args.apply:
        print("Preview only:", ROOT)
        return
    backup = BACKUPS / (datetime.now().strftime("%Y%m%d-%H%M%S") + "-dsh-navigation")
    backup.mkdir(mode=0o700, parents=True, exist_ok=False)
    files = []
    files.extend(sorted((ROOT / "code/node_modules/.pnpm").glob("*/node_modules/@deepseek-ai/dsh-client-ui-agent-preset/lib/client.js")))
    files.extend(sorted((ROOT / "code/node_modules/.pnpm").glob("*/node_modules/@deepseek-ai/dsh-client-ui-sidebar/lib/client.js")))
    changed = 0
    for path in files:
        before = path.read_bytes()
        changed_here = patch_agent(path) if "agent-preset" in str(path) else patch_sidebar(path)
        if not changed_here:
            continue
        target = backup / path.relative_to(ROOT)
        target.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
        target.write_bytes(before)
        changed += 1
    if not changed:
        raise SystemExit("no DSH navigation bundles changed")
    subprocess.run(["systemctl", "restart", "mdagent-api"], check=True)
    subprocess.run(["systemctl", "is-active", "mdagent-api"], check=True)
    print("dsh-navigation: changed", changed, "backup", backup)


if __name__ == "__main__":
    main()
