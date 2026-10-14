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

POLICY = '''- id: sandbox-policy
  config:
    mode: workspace-write
    workspaceRoot: !!js process.cwd()
- id: approval
  config:
    policy: never
- id: permission
  config:
    presets:
      read-only:
        sandbox: read-only
        approval: never
        name: Read Only
        description: Read-only workspace access.
      scientific-sandbox:
        sandbox: workspace-write
        approval: never
        name: Sandbox
        description: Fixed per-user scientific workspace sandbox.
    defaultPreset: scientific-sandbox
'''

NEW = '''    # dsh-remote-world disables the local providers before applying this
    # overlay. The no-node path must explicitly restore local Landlock/bwrap,
    # disable the remote providers, and keep the policy overlay valid YAML.
    body = ""
    if node_id is None:
        for pid in ("subprocess", "sandbox", "fs-sandbox"):
            body += "- id: %s\\n  disabled: false\\n" % pid
        body += "- id: directory-picker\\n  disabled: false\\n"
        for pid in ("remote-fs", "remote-subprocess", "remote-sandbox", "remote-directorypicker"):
            body += "- id: %s\\n  disabled: true\\n" % pid
    else:
        url = "%s/v1/world/%s" % (SELF_WS, node_id)
        for pid in ("remote-fs", "remote-subprocess", "remote-sandbox"):
            body += "- id: %s\\n  config: {url: '%s', token: '%s'}\\n" % (pid, url, world_token)
    body += """- id: sandbox-policy
  config:
    mode: workspace-write
    workspaceRoot: !!js process.cwd()
- id: approval
  config:
    policy: never
- id: permission
  config:
    presets:
      read-only:
        sandbox: read-only
        approval: never
        name: Read Only
        description: Read-only workspace access.
      scientific-sandbox:
        sandbox: workspace-write
        approval: never
        name: Sandbox
        description: Fixed per-user scientific workspace sandbox.
    defaultPreset: scientific-sandbox
"""
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

INTERMEDIATE = '''    # A missing node is a valid local-workspace mode. Do not synthesize
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

LOCAL_PROVIDER_ANCHOR = '''        for pid in ("subprocess", "sandbox", "fs-sandbox"):
            body += "- id: %s\\n  disabled: false\\n" % pid
'''


def patch(path: Path) -> str:
    source = path.read_text(encoding="utf-8")
    if source.count(OLD) == 1:
        patched = source.replace(OLD, NEW, 1)
    elif source.count(CURRENT) == 1:
        patched = source.replace(CURRENT, NEW, 1)
    elif source.count(INTERMEDIATE) == 1:
        patched = source.replace(INTERMEDIATE, NEW, 1)
    elif source.count(LOCAL_PROVIDER_ANCHOR) == 1 and 'id: directory-picker' not in source:
        patched = source.replace(
            LOCAL_PROVIDER_ANCHOR,
            LOCAL_PROVIDER_ANCHOR + '        body += "- id: directory-picker\\n  disabled: false\\n"\n',
            1,
        )
    elif source.count('    body += """- id: sandbox-policy') == 1:
        start = source.index('    body += """- id: sandbox-policy')
        end = source.index('"""', start + len('    body += """')) + 3
        patched = source[:start] + '    body += """' + POLICY + '"""' + source[end:]
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
