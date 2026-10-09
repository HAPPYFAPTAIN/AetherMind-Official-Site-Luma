#!/usr/bin/env python3
"""Deploy the isolated workspace bootstrap, with a preview and rollback backup."""
import argparse
from datetime import datetime
import hashlib
import json
from pathlib import Path
import shutil
import subprocess

def replace_once(source, old, new):
    if source.count(old) != 1:
        raise ValueError("deployment source changed; expected exactly one anchor: " + old[:70])
    return source.replace(old, new, 1)

def candidates(cloud, helper):
    originals = {name: (cloud / name).read_text()
                 for name in ("tenants.py", "app.py", "provision.py", "history.py")}
    tenants = originals["tenants.py"]
    if "import workspace_bootstrap\n" not in tenants:
        tenants = replace_once(tenants, "import paths\n", "import paths\nimport workspace_bootstrap\n")
    old_bootstrap = next((name for name in ("def _tenant_default_workspace(", "def ensure_default_workspace(") if name in tenants), None)
    if old_bootstrap is not None:
        start = tenants.index(old_bootstrap)
        end = tenants.index("def _free_port():", start)
        tenants = tenants[:start] + tenants[end:]
        tenants = tenants.replace("_workspace_bootstrapped = set()  # (authenticated username, tenant port)\n_workspace_bootstrap_lock = threading.Lock()\n", "")
    wrapper = '''\ndef ensure_default_workspace(username, port):\n    with _lock:\n        instance = _inst.get(username)\n        if instance is None or instance["port"] != port or instance["proc"].poll() is not None:\n            raise RuntimeError("tenant instance does not match authenticated user")\n        guard = instance.setdefault("workspace_bootstrap_lock", threading.Lock())\n\n    def is_current():\n        with _lock:\n            return (_inst.get(username) is instance\n                    and instance["port"] == port\n                    and instance["proc"].poll() is None)\n\n    workspace_bootstrap.ensure(username, port, instance, guard, is_current)\n\n\n'''
    tenants = replace_once(tenants, "def _free_port():\n", wrapper + "def _free_port():\n")
    if '"TMPDIR": os.path.join(paths.user_dir(username), "tmp"),' not in tenants:
        tenants = replace_once(tenants, '"LANG": "zh_CN.UTF-8",',
                               '"LANG": "zh_CN.UTF-8",\n        "TMPDIR": os.path.join(paths.user_dir(username), "tmp"),')
    if "start_new_session=True)\n" in tenants:
        tenants = replace_once(tenants, "start_new_session=True)\n",
                               "start_new_session=True, umask=0o077)\n")
    elif "start_new_session=True, umask=0o077" not in tenants:
        raise ValueError("missing spawn umask anchor")
    if "workspace_bootstrap.ensure_private_storage(username, create_default=node_id is None)" not in tenants:
        tenants = replace_once(tenants, "            overlay = _write_overlay(username, node_id, world_token)",
                               "            workspace_bootstrap.ensure_private_storage(username, create_default=node_id is None)\n            overlay = _write_overlay(username, node_id, world_token)")
    app = originals["app.py"]
    call = '        tenants.ensure_default_workspace(u["username"], port)\n'
    if call not in app:
        app = replace_once(app, '        port = tenants.ensure(u["username"], node_id)\n',
                           '        port = tenants.ensure(u["username"], node_id)\n' + call)
    if "import workspace_bootstrap\n" not in app:
        app = replace_once(app, "import tenants\n", "import tenants\nimport workspace_bootstrap\n")
    start = app.index('def evolution(u=Depends(current_user)):')
    end = app.index('\n\n@app.get("/v1/usage")', start)
    app = app[:start] + 'def evolution(u=Depends(current_user)):\n    """当前认证用户的私有记忆与策略。"""\n    return workspace_bootstrap.read_evolution(u["username"])\n' + app[end:]
    app = app.replace("用户私有记忆视图:会话存档列表 + 项目空间。原子库是共享进化层,见 /v1/evolution。",
                      "用户私有记忆视图:会话存档列表、项目空间与私有策略。")
    app = app.replace("经验原子与行为策略属共享进化层,见 /v1/evolution",
                      "工作区、会话与记忆按账号独立保存")
    provision = originals["provision.py"]
    if "import workspace_bootstrap\n" not in provision:
        provision = replace_once(provision, "import paths\n", "import paths\nimport workspace_bootstrap\n")
    if "workspace_bootstrap.ensure_private_storage(username)" not in provision:
        if "    # 共享进化层:目录软链" in provision:
            start = provision.index("    # 共享进化层:目录软链")
            end = provision.index("    # dsh-home:", start)
            provision = provision[:start] + "    # Private memory is prepared as the tenant UID after ownership is set.\n" + provision[end:]
        provision = replace_once(provision, "    _chown_tree(udir, username)\n    return udir",
                                 "    _chown_tree(udir, username)\n    workspace_bootstrap.ensure_private_storage(username)\n    return udir")
    history = originals["history.py"]
    if "def _active_strategy_rules(username):" not in history:
        history = replace_once(history, "def _active_strategy_rules():", "def _active_strategy_rules(username):")
    if "import workspace_bootstrap\n" not in history:
        history = replace_once(history, "import paths\n", "import paths\nimport workspace_bootstrap\n")
    if ("workspace_bootstrap.read_evolution(username)" not in history
            and "paths.user_data_dir(username)" not in history):
        history = replace_once(history, '        p = os.path.join(paths.shared_evolution_dir(),\n                         "behavior_strategies.json")\n        with open(p, encoding="utf-8") as f:\n            ss = json.load(f).get("strategies", [])',
                               '        ss = workspace_bootstrap.read_evolution(username).get("strategies", [])')
    if "rules = _active_strategy_rules(username)" not in history:
        history = replace_once(history, "rules = _active_strategy_rules()", "rules = _active_strategy_rules(username)")
    history = history.replace("共享进化层里 status=active 的策略规则(全员沉淀,注入每个信封)。",
                              "当前用户私有记忆中 status=active 的策略规则。")
    history = history.replace("行为策略·共享进化层·全员沉淀", "行为策略·当前用户私有记忆")
    result = {"tenants.py": tenants, "app.py": app, "provision.py": provision,
              "history.py": history, "workspace_bootstrap.py": helper.read_text()}
    for name, source in result.items():
        compile(source, str(cloud / name), "exec")
    return result

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--cloud", type=Path, default=Path("/opt/mdagent/code/cloud"))
    parser.add_argument("--helper", type=Path, default=Path(__file__).parent / "mdagent/workspace_bootstrap.py")
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--baseline", type=Path)
    parser.add_argument("--expected-state", type=Path)
    args = parser.parse_args()
    if args.baseline:
        if not args.expected_state:
            raise ValueError("baseline upgrades require current file hashes")
        expected = json.loads(args.expected_state.read_text())
        for name in ("tenants.py", "app.py", "provision.py", "history.py", "workspace_bootstrap.py"):
            actual = hashlib.sha256((args.cloud/name).read_bytes()).hexdigest()
            if actual != expected.get(name):
                raise ValueError("current deployment changed: " + name)
    updated = candidates(args.baseline or args.cloud, args.helper)
    for name, body in updated.items():
        print(name, hashlib.sha256(body.encode()).hexdigest())
    if not args.apply:
        print("Preview only; no files or services changed.")
        return
    if args.cloud != Path("/opt/mdagent/code/cloud"):
        raise ValueError("apply is restricted to the verified MD-Agent deployment")
    backup = Path("/var/backups/aethericai-official") / (datetime.now().strftime("%Y%m%d-%H%M%S") + "-private-workspace")
    backup.mkdir(mode=0o700)
    previous = {}
    for name in updated:
        path = args.cloud / name
        previous[name] = path.read_bytes() if path.exists() else None
        if path.exists():
            shutil.copy2(path, backup / name)
    (backup / "manifest.txt").write_text("\n".join(updated) + "\n")
    try:
        for name, source in updated.items():
            path = args.cloud / name
            temporary = path.with_suffix(".py.workspace-new")
            temporary.write_text(source)
            temporary.chmod(0o644)
            temporary.replace(path)
        subprocess.run(["systemctl", "restart", "mdagent-api"], check=True)
        subprocess.run(["systemctl", "is-active", "mdagent-api"], check=True)
    except Exception:
        for name, content in previous.items():
            path = args.cloud / name
            if content is None:
                path.unlink(missing_ok=True)
            else:
                path.write_bytes(content)
        subprocess.run(["systemctl", "restart", "mdagent-api"], check=True)
        raise
    print("BACKUP=" + str(backup))

if __name__ == "__main__":
    main()
