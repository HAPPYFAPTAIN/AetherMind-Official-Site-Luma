#!/usr/bin/env python3
"""Bootstrap the official LLM gateway credentials and model routes.

This script never prints a product key. It creates one only when the protected
mdagent environment is empty, stores only its hash in the official database,
and writes the plaintext key to the root-only systemd EnvironmentFile.
"""
import argparse
from datetime import datetime
import hashlib
import hmac
import os
from pathlib import Path
import secrets
import shlex
import shutil
import sqlite3
import subprocess
import time
import uuid

MODEL_ROUTES = (
    ("kimi-k3", "kimi", "kimi-k3"),
    ("kimi-k2.6", "kimi", "kimi-k2.6"),
    ("deepseek-flash", "deepseek", "deepseek-flash"),
)

def parse_env(path):
    values={}
    for line in Path(path).read_text().splitlines():
        if "=" in line and not line.lstrip().startswith("#"):
            key,value=line.split("=",1)
            parts=shlex.split(value)
            values[key]=parts[0] if parts else ""
    return values

def apply(root, auth_env_path, gateway_env_path, gateway_conf_path):
    env=parse_env(auth_env_path)
    db_path=env["LLMER_DATABASE_PATH"]
    gateway=Path(gateway_env_path)
    conf=Path(gateway_conf_path)
    backup=Path("/var/backups/aethericai-official")/(datetime.now().strftime("%Y%m%d-%H%M%S")+"-mdagent-gateway")
    backup.mkdir(mode=0o700,parents=True)
    shutil.copy2(gateway,backup/"provider.env.gateway.before")
    shutil.copy2(conf,backup/"gateway.conf.before")
    db_source = sqlite3.connect(db_path)
    db_backup=sqlite3.connect(str(backup/"auth.sqlite3.before"))
    db_source.backup(db_backup)
    db_source.close()
    db_backup.close()
    current=parse_env(gateway_env_path).get("MDAGENT_OFFICIAL_PRODUCT_KEY","")
    if not current.startswith("opk_"):
        current="opk_"+secrets.token_urlsafe(32)
        lines=[line for line in gateway.read_text().splitlines() if not line.startswith("MDAGENT_OFFICIAL_PRODUCT_KEY=")]
        lines.append("MDAGENT_OFFICIAL_PRODUCT_KEY="+current)
        temporary=gateway.with_suffix(".tmp")
        temporary.write_text("\n".join(lines)+"\n")
        os.chmod(temporary,0o600)
        os.replace(temporary,gateway)
        digest=hmac.new(env["LLMER_HASH_SECRET"].encode(),("integration\0"+current).encode(),hashlib.sha256).hexdigest()
        with sqlite3.connect(db_path) as conn:
            conn.execute("BEGIN IMMEDIATE")
            conn.execute("INSERT INTO official_integration_keys VALUES(?,?,?,?,?,?)",
                         (str(uuid.uuid4()),"md-exp",digest,current[-6:],None,int(time.time()*1000)))
            conn.commit()
    conf_text=conf.read_text()
    line="Environment=OFFICIAL_DATABASE_PATH=/var/lib/aethericai-auth/auth.sqlite3"
    if line not in conf_text:
        conf.write_text(conf_text.rstrip()+"\n"+line+"\n")
    with sqlite3.connect(db_path) as conn:
        conn.execute("BEGIN IMMEDIATE")
        now=int(time.time()*1000)
        for model,provider,upstream in MODEL_ROUTES:
            conn.execute("INSERT INTO official_llm_models VALUES(?,?,?,?,?) ON CONFLICT(model) DO UPDATE SET provider=excluded.provider,upstream_model=excluded.upstream_model,enabled=1,updated_at_ms=excluded.updated_at_ms",(model,provider,upstream,1,now))
            conn.execute("INSERT INTO official_rates VALUES(?,?,?,?,?,?,?,?,?) ON CONFLICT(scope,key) DO UPDATE SET points_per_mtok_input=excluded.points_per_mtok_input,points_per_mtok_cached=excluded.points_per_mtok_cached,points_per_mtok_output=excluded.points_per_mtok_output,updated_at_ms=excluded.updated_at_ms",(str(uuid.uuid4()),"llm-model",model,0,100000,100000,100000,now,"OWNER"))
        conn.commit()
    (backup/"manifest.txt").write_text("product key, database path, model routes\n")
    subprocess.run(["systemctl","daemon-reload"],check=True)
    subprocess.run(["systemctl","restart","mdagent-api"],check=True)
    subprocess.run(["systemctl","is-active","mdagent-api"],check=True)
    print("BACKUP="+str(backup))

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--apply",action="store_true")
    args=parser.parse_args()
    if not args.apply:
        print("Preview only:", ",".join(model for model,_,_ in MODEL_ROUTES))
        return
    apply("/opt/mdagent","/etc/aethericai-auth/auth.env","/etc/mdagent/provider.env.gateway","/etc/systemd/system/mdagent-api.service.d/gateway.conf")

if __name__=="__main__":
    main()
