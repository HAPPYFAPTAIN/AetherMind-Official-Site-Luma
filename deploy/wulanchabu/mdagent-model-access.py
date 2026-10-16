#!/usr/bin/env python3
"""Patch the verified dsh provisioner for official per-user model access.

The official SQLite database remains the source of truth. Bound tenants get
the enabled global routes plus their explicit grants; unbound legacy tenants
keep the existing static catalog. Provider secrets never enter tenant
settings: every tenant points at the local billing gateway and uses its proxy
credential.
"""
from __future__ import annotations

import argparse
from datetime import datetime
import os
from pathlib import Path
import shutil
import subprocess


DYNAMIC_RENDER = r'''def _official_render_settings(username):
    import json
    import sqlite3
    path = os.environ.get("OFFICIAL_DATABASE_PATH", "").strip()
    if not path or not os.path.isabs(path) or not os.path.exists(path):
        return None
    uri = "file:" + path.replace("%", "%25").replace("?", "%3f").replace("#", "%23") + "?mode=ro"
    try:
        with sqlite3.connect(uri, uri=True, timeout=1.0) as db:
            binding = db.execute("SELECT user_id FROM official_md_agent_bindings WHERE md_username=?", (username,)).fetchone()
            if not binding:
                return None
            uid = binding[0]
            rows = db.execute("""SELECT m.model,m.provider,m.enabled,COALESCE(a.enabled,m.enabled) AS effective
                FROM official_llm_models m LEFT JOIN official_user_llm_models a
                  ON a.model=m.model AND a.user_id=?
                WHERE COALESCE(a.enabled,m.enabled)=1 ORDER BY m.provider,m.model""", (uid,)).fetchall()
            if not rows:
                return None
            provider_rows = {r[0]: r for r in db.execute("SELECT provider,display_name,api,enabled FROM official_llm_providers")}
    except sqlite3.Error:
        return None
    grouped = {}
    for model, provider, _global_enabled, _effective in rows:
        meta = provider_rows.get(provider)
        if meta is not None and not bool(meta[3]):
            continue
        grouped.setdefault(provider, {"models": [], "display": (meta[1] if meta else provider), "api": (meta[2] if meta else "openai-completions")})
        context = 1048576 if model.endswith("k3") or model.endswith("v4-pro") else 262144
        maximum = 393216 if provider == "deepseek" else 131072
        grouped[provider]["models"].append((model, context, maximum))
    if not grouped:
        return None
    blocks = []
    for provider, item in grouped.items():
        lines = ["    %s:" % provider,
                 "      displayName: %s" % json.dumps(item["display"], ensure_ascii=False),
                 "      apiKeyEnv: MDEXP_PROXY_KEY",
                 "      api: %s" % item["api"],
                 "      baseURL: %s/llm/%s" % (PROXY_BASE, provider),
                 "      models:"]
        for model, context, maximum in item["models"]:
            lines.extend(["        - id: %s" % json.dumps(model), "          contextWindow: %d" % context, "          maxTokens: %d" % maximum])
        blocks.append("\n".join(lines) + "\n")
    first_provider = next(iter(grouped))
    first_model = grouped[first_provider]["models"][0][0]
    return SETTINGS_TEMPLATE.format(provider=first_provider, model=first_model, provider_blocks="".join(blocks))


def _render_settings(u):
    dynamic = _official_render_settings(u["username"])
    if dynamic:
        return dynamic
    info = accounts.PROVIDERS[u["provider"]]
    configured = ("kimi", "deepseek")
    blocks = []
    for provider in configured:
        raw = PROVIDER_BLOCKS.get(provider)
        if raw:
            blocks.append("    %s:\n%s" % (provider, raw.format(proxy=PROXY_BASE)))
    if u["provider"] not in configured:
        raw = PROVIDER_BLOCKS.get(u["provider"])
        if not raw:
            raise ValueError("provider %s 无 PROVIDER_BLOCK,拒绝生成 settings" % u["provider"])
        blocks.append("    %s:\n%s" % (u["provider"], raw.format(proxy=PROXY_BASE)))
    return SETTINGS_TEMPLATE.format(provider=u["provider"], model=info["model"], provider_blocks="".join(blocks))
'''


def patch(path: Path) -> str:
    source = path.read_text(encoding="utf-8")
    start = source.index("def _render_settings(u):")
    end = source.index("\n\ndef refresh_model_settings", start)
    patched = source[:start] + DYNAMIC_RENDER + source[end:]
    compile(patched, str(path), "exec")
    return patched


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path("/opt/mdagent"))
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    provision = args.root / "code/cloud/provision.py"
    if not args.apply:
        print("Preview only:", provision)
        return
    if args.root != Path("/opt/mdagent") or not provision.is_file():
        raise SystemExit("--apply is restricted to the verified MD-Agent deployment")
    backup = Path("/var/backups/aethericai-official") / (datetime.now().strftime("%Y%m%d-%H%M%S") + "-model-access")
    backup.mkdir(mode=0o700, parents=True)
    shutil.copy2(provision, backup / "provision.py.before")
    provision.write_text(patch(provision), encoding="utf-8")
    subprocess.run(["/usr/bin/python3", "-m", "py_compile", str(provision)], check=True)
    subprocess.run(["systemctl", "restart", "mdagent-api"], check=True)
    subprocess.run(["systemctl", "is-active", "mdagent-api"], check=True)
    print("BACKUP=" + str(backup))


if __name__ == "__main__":
    main()
