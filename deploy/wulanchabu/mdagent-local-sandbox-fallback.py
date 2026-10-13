#!/usr/bin/env python3
"""Make dsh use its local sandbox when no remote execution node is attached.

Remote-world remains enabled for an online user node. The no-node path is the
normal account workspace path and must not manufacture an ``n_none`` WebSocket
world; local Landlock/bwrap then confines file effects to that tenant's dsh
workspace and removes the misleading mdshell 403 cascade.
"""
from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path
import shutil
import subprocess


OLD = '''    url = "%s/v1/world/%s" % (SELF_WS, node_id or "n_none")
    body = ""
    for pid in ("remote-fs", "remote-subprocess", "remote-sandbox"):
        body += "- id: %s\\n  config: {url: '%s', token: '%s'}\\n" % (pid, url, world_token)
'''

NEW = '''    # A missing node is a valid local-workspace mode. Do not synthesize
    # n_none: remote-world would then return 403 and disable the local sandbox.
    if node_id is None:
        # dsh parses every overlay with a strict top-level-array contract.
        # An empty patch preserves the base local providers and is valid YAML.
        body = "[]\\n"
    else:
        url = "%s/v1/world/%s" % (SELF_WS, node_id)
        body = ""
        for pid in ("remote-fs", "remote-subprocess", "remote-sandbox"):
            body += "- id: %s\\n  config: {url: '%s', token: '%s'}\\n" % (pid, url, world_token)
'''

CURRENT = '''    # A missing node is a valid local-workspace mode. Do not synthesize
    # n_none: remote-world would then return 403 and disable the local sandbox.
    if node_id is None:
        body = "# no remote execution node; retain local fs/subprocess/sandbox providers\\n"
    else:
        url = "%s/v1/world/%s" % (SELF_WS, node_id)
        body = ""
        for pid in ("remote-fs", "remote-subprocess", "remote-sandbox"):
            body += "- id: %s\\n  config: {url: '%s', token: '%s'}\\n" % (pid, url, world_token)
'''


def patch(path: Path) -> str:
    source = path.read_text(encoding="utf-8")
    if source.count(OLD) == 1:
        patched = source.replace(OLD, NEW, 1)
    elif source.count(CURRENT) == 1:
        patched = source.replace(CURRENT, NEW, 1)
    else:
        raise ValueError("unexpected _write_overlay source anchor")
    compile(patched, str(path), "exec")
    return patched


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path("/opt/mdagent"))
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    path = args.root / "code/cloud/tenants.py"
    if not args.apply:
        print("Preview only:", path)
        return
    if args.root != Path("/opt/mdagent") or not path.is_file():
        raise SystemExit("--apply is restricted to the verified MD-Agent deployment")
    backup = Path("/var/backups/aethericai-official") / (datetime.now().strftime("%Y%m%d-%H%M%S") + "-local-sandbox-fallback")
    backup.mkdir(mode=0o700, parents=True)
    shutil.copy2(path, backup / "tenants.py.before")
    path.write_text(patch(path), encoding="utf-8")
    subprocess.run(["/usr/bin/python3", "-m", "py_compile", str(path)], check=True)
    subprocess.run(["systemctl", "restart", "mdagent-api"], check=True)
    subprocess.run(["systemctl", "is-active", "mdagent-api"], check=True)
    print("BACKUP=" + str(backup))


if __name__ == "__main__":
    main()
