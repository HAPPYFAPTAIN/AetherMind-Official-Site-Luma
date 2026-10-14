#!/usr/bin/env python3
"""Add the Work preset icon to the deployed dsh permission popup."""
from __future__ import annotations

from datetime import datetime
from pathlib import Path
import shutil


ROOT = Path("/opt/mdagent")
BACKUP = Path("/var/backups/aethericai-official") / (datetime.now().strftime("%Y%m%d-%H%M%S") + "-permission-menu")
ANCHOR = 'label: displayPermissionPreset(option.value, option.name),'
INSERT = '''label: displayPermissionPreset(option.value, option.name),
                ...option.value === "scientific-sandbox" ? { icon: react_jsx_runtime.jsx(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutline16, {}) } : {},'''


def main() -> None:
    files = list((ROOT / "code/node_modules/.pnpm").glob("*/node_modules/@deepseek-ai/dsh-client-ui-permission-presets/lib/client.js"))
    if not files:
        raise SystemExit("permission client bundle not found")
    changed = 0
    BACKUP.mkdir(mode=0o700, parents=True, exist_ok=True)
    for index, path in enumerate(files):
        text = path.read_text(encoding="utf-8")
        if INSERT in text:
            continue
        if text.count(ANCHOR) != 1:
            raise SystemExit(f"permission client anchor is not unique: {path}")
        shutil.copy2(path, BACKUP / f"client-{index}.js.before")
        path.write_text(text.replace(ANCHOR, INSERT, 1), encoding="utf-8")
        print("permission-menu: patched", path)
        changed += 1
    print("permission-menu: changed", changed, "backup", BACKUP)


if __name__ == "__main__":
    main()
