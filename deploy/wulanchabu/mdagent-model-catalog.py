#!/usr/bin/env python3
"""Publish the two-provider dsh model catalog without exposing credentials.

The model menu is backed by dsh settings, so this script keeps the native
DeepSeek adapter's catalog empty and exposes the project-owned Kimi/DeepSeek
proxy routes exactly once. Existing bound tenants are updated atomically and a
rollback copy is made before each write.
"""
import argparse
from datetime import datetime
import hashlib
import os
from pathlib import Path
import pwd
import grp
import shutil
import sqlite3
import shlex
import subprocess

MODEL_CONFIG = {
    "llm-deepseek": {"models": []},
    "llm-pi-ai": {"providers": {
        "kimi": {
            "apiKeyEnv": "MDEXP_PROXY_KEY",
            "displayName": "Kimi",
            "api": "openai-completions",
            "baseURL": "http://127.0.0.1:8090/llm/kimi",
            "models": [
                {"id": "kimi-k3", "name": "Kimi K3", "contextWindow": 1048576, "maxTokens": 262144},
                {"id": "kimi-k2.7-code-highspeed", "name": "Kimi K2.7 Code Highspeed", "contextWindow": 262144, "maxTokens": 131072},
                {"id": "kimi-k2.6", "name": "Kimi K2.6", "contextWindow": 262144, "maxTokens": 262144},
            ],
        },
        "deepseek": {
            "apiKeyEnv": "MDEXP_PROXY_KEY",
            "displayName": "DeepSeek",
            "api": "openai-completions",
            "baseURL": "http://127.0.0.1:8090/llm/deepseek",
            "models": [
                {"id": "deepseek-v4-pro", "name": "DeepSeek V4 Pro", "contextWindow": 1048576, "maxTokens": 393216},
                {"id": "deepseek-flash", "name": "DeepSeek Flash", "contextWindow": 1048576, "maxTokens": 393216},
            ],
        },
    }},
}

TEMPLATE = '''SETTINGS_TEMPLATE = """# dsh 实例配置(云端多租户,provision.py 生成)。真 key 只在计费代理,租户仅持代理令牌 mxp_。
llm-deepseek:
  models: []
llm-pi-ai:
  providers:
{provider_blocks}agent-default-model:
  provider: {provider}
  model: {model}
agent-presets:
  default: md-sim-assistant
ui-onboarding:
  welcomeNoticeVersion: 2026-08-13.1
"""
'''

RENDER = '''def _render_settings(u):
    info = accounts.PROVIDERS[u["provider"]]
    configured = ("kimi", "deepseek")
    blocks = []
    for provider in configured:
        raw = PROVIDER_BLOCKS.get(provider)
        if raw:
            blocks.append("    %s:\\n%s" % (provider, raw.format(proxy=PROXY_BASE)))
    if u["provider"] not in configured:
        raw = PROVIDER_BLOCKS.get(u["provider"])
        if not raw:
            raise ValueError("provider %s 无 PROVIDER_BLOCK,拒绝生成 settings" % u["provider"])
        blocks.append("    %s:\\n%s" % (u["provider"], raw.format(proxy=PROXY_BASE)))
    return SETTINGS_TEMPLATE.format(
        provider=u["provider"], proxy_key_env=PROXY_KEY_ENV,
        model=info["model"], provider_blocks="".join(blocks))
'''

def replace_once(source, old, new):
    if source.count(old) != 1:
        raise ValueError("source anchor count changed")
    return source.replace(old, new, 1)

def patch_provision(path):
    text = path.read_text()
    start = text.index("SETTINGS_TEMPLATE = \"\"\"")
    end = text.index("\n\n# 各 provider", start)
    text = text[:start] + TEMPLATE + text[end:]
    start = text.index("def _render_settings(u):")
    end = text.index("\n\ndef refresh_model_settings", start)
    text = text[:start] + RENDER + text[end:]
    old = """        - id: kimi-k2.7-code
          contextWindow: 262144
          maxTokens: 131072
"""
    text = text.replace(old, "", 1)
    compile(text, str(path), "exec")
    return text

def bound_usernames(db_path):
    with sqlite3.connect(db_path) as conn:
        return [row[0] for row in conn.execute("SELECT md_username FROM official_md_agent_bindings ORDER BY md_username")]

def render_settings(path):
    import yaml
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    data["llm-deepseek"] = MODEL_CONFIG["llm-deepseek"]
    data["llm-pi-ai"] = MODEL_CONFIG["llm-pi-ai"]
    return yaml.safe_dump(data, allow_unicode=True, sort_keys=False)

def apply(root, database):
    provision = root / "code/cloud/provision.py"
    auth_env = Path("/etc/aethericai-auth/auth.env").read_text().splitlines()
    env = {}
    for line in auth_env:
        if "=" in line and not line.lstrip().startswith("#"):
            key, value = line.split("=", 1)
            parts = shlex.split(value)
            env[key] = parts[0] if parts else ""
    db_path = database or env.get("LLMER_DATABASE_PATH", "/var/lib/aethericai-auth/auth.sqlite3")
    backup = Path("/var/backups/aethericai-official") / (datetime.now().strftime("%Y%m%d-%H%M%S") + "-model-catalog")
    backup.mkdir(mode=0o700, parents=True)
    original = provision.read_bytes()
    (backup / "provision.py.before-template").write_bytes(original)
    provision.write_text(patch_provision(provision), encoding="utf-8")
    (backup / "manifest.txt").write_text("provision.py\n")
    for username in bound_usernames(db_path):
        settings = root / "users" / username / "dsh-home/settings.yaml"
        if not settings.is_file():
            continue
        tenant_backup = backup / username
        tenant_backup.mkdir(mode=0o700, exist_ok=True)
        (tenant_backup / "settings.yaml.before").write_bytes(settings.read_bytes())
        temporary = settings.with_suffix(".yaml.model-new")
        temporary.write_text(render_settings(settings), encoding="utf-8")
        account = pwd.getpwnam("mu_" + username)
        os.chmod(temporary, 0o600)
        os.chown(temporary, account.pw_uid, grp.getgrnam("mdshare").gr_gid)
        os.replace(temporary, settings)
    subprocess.run(["systemctl", "restart", "mdagent-api"], check=True)
    subprocess.run(["systemctl", "is-active", "mdagent-api"], check=True)
    print("BACKUP=" + str(backup))

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path("/opt/mdagent"))
    parser.add_argument("--database")
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    if not args.apply:
        print("Preview only. Configured IDs:", "kimi-k3,kimi-k2.7-code-highspeed,kimi-k2.6,deepseek-v4-pro,deepseek-flash")
        return
    if args.root != Path("/opt/mdagent"):
        raise SystemExit("--apply is restricted to the verified MD-Agent deployment")
    apply(args.root, args.database)

if __name__ == "__main__":
    main()
