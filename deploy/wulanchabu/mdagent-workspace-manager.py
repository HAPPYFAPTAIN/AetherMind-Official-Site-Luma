#!/usr/bin/env python3
"""Add a per-user workspace-root file manager to the DSH sidebar."""
from __future__ import annotations
import argparse
from datetime import datetime
from pathlib import Path
import shutil
import subprocess

ROOT = Path("/opt/mdagent")
BACKUPS = Path("/var/backups/aethericai-official")
NGINX = Path("/etc/nginx/snippets/mdagent-web-locations.conf")

WORKSPACE_FILES = r'''from __future__ import annotations
import os
import re
import shutil

import paths

NAME_RE = re.compile(r"^[A-Za-z0-9_\-\u4e00-\u9fff]{1,64}$")

def root(username):
    return os.path.realpath(paths.user_projects_dir(username))

def safe_path(username, relative=""):
    base = root(username)
    rel = str(relative or "").strip().strip("/")
    if "\x00" in rel:
        raise ValueError("非法路径")
    lexical = os.path.abspath(os.path.join(base, rel))
    if os.path.commonpath((base, lexical)) != base:
        raise ValueError("路径超出当前用户工作空间")
    if rel and rel in {".", ".."}:
        raise ValueError("非法路径")
    current = base
    for part in rel.split("/") if rel else ():
        current = os.path.join(current, part)
        if os.path.islink(current):
            raise ValueError("不允许通过符号链接访问工作空间")
    if os.path.realpath(lexical) != lexical:
        raise ValueError("不允许通过符号链接访问工作空间")
    return base, rel, lexical

def list_dir(username, relative=""):
    base, rel, folder = safe_path(username, relative)
    if not os.path.isdir(folder):
        raise FileNotFoundError("目录不存在")
    entries = []
    for item in os.scandir(folder):
        if item.is_symlink():
            continue
        try:
            stat = item.stat(follow_symlinks=False)
        except OSError:
            continue
        entries.append({
            "name": item.name,
            "type": "directory" if item.is_dir(follow_symlinks=False) else "file",
            "bytes": 0 if item.is_dir(follow_symlinks=False) else stat.st_size,
            "modifiedAt": int(stat.st_mtime * 1000),
            "deletable": True,
        })
    entries.sort(key=lambda item: (item["type"] != "directory", item["name"].lower()))
    return {"path": rel, "entries": entries}

def create_folder(username, relative, name):
    if not NAME_RE.fullmatch(name or ""):
        raise ValueError("文件夹名称只能包含中文、字母、数字、下划线和短横线")
    base, rel, folder = safe_path(username, relative)
    if not os.path.isdir(folder):
        raise FileNotFoundError("父目录不存在")
    target = os.path.realpath(os.path.join(folder, name))
    if os.path.commonpath((base, target)) != base or os.path.lexists(target):
        raise FileExistsError("文件夹已存在")
    os.mkdir(target, 0o700)
    return {"name": name, "path": (rel + "/" + name).strip("/")}

def delete_entry(username, relative):
    base, rel, target = safe_path(username, relative)
    if not rel or target == base:
        raise ValueError("不能删除工作空间根目录")
    if not os.path.lexists(target) or os.path.islink(target):
        raise FileNotFoundError("文件不存在")
    if os.path.isdir(target):
        shutil.rmtree(target)
    else:
        os.unlink(target)
    return {"path": rel}
'''

BOOTSTRAP_OLD = '''    if not items:
        default = os.path.join(root, "default")
        if os.path.realpath(default) != default:
            raise RuntimeError("default workspace must not be a symlink")
        rpc(port, "workspace.create", {"path": default})
'''
BOOTSTRAP_NEW = '''    existing = {os.path.realpath(item.get("path")) for item in items if isinstance(item.get("path"), str)}
    if not items:
        default = os.path.join(root, "default")
        if os.path.realpath(default) != default:
            raise RuntimeError("default workspace must not be a symlink")
        if default not in existing:
            rpc(port, "workspace.create", {"path": default})
            existing.add(default)
    for entry in os.scandir(root):
        if entry.name == "_archived" or entry.is_symlink() or not entry.is_dir(follow_symlinks=False):
            continue
        candidate = os.path.realpath(entry.path)
        if candidate == root or candidate in existing:
            continue
        rpc(port, "workspace.create", {"path": candidate})
        existing.add(candidate)
'''

COMPONENT = r'''		function WorkspaceFileManager({ open, onClose, workspaces, deleteWorkspace }) {
			const [path, setPath] = react.useState("");
			const [entries, setEntries] = react.useState([]);
			const [loading, setLoading] = react.useState(false);
			const [error, setError] = react.useState("");
			const [folderName, setFolderName] = react.useState("");
			const [creating, setCreating] = react.useState(false);
			const [pendingDelete, setPendingDelete] = react.useState("");
			const base = "/official/md-agent/";
			const load = react.useCallback(async (nextPath = path) => {
				setLoading(true);
				setError("");
				try {
					const response = await fetch(base + "workspace-files?path=" + encodeURIComponent(nextPath), { credentials: "include", headers: { Accept: "application/json" } });
					const data = await response.json().catch(() => ({}));
					if (!response.ok) throw new Error(data.detail || "加载目录失败");
					setEntries(data.entries || []);
				} catch (reason) {
					setError(String(reason?.message || reason));
				} finally {
					setLoading(false);
				}
			}, [path]);
			react.useEffect(() => {
				if (open) load(path);
			}, [open, path, load]);
			const go = (nextPath) => { setPendingDelete(""); setPath(nextPath.replace(/^\/+|\/+$/g, "")); };
			const remove = async (entry) => {
				const nextPath = (path ? path + "/" : "") + entry.name;
				if (pendingDelete !== nextPath) { setPendingDelete(nextPath); return; }
				setPendingDelete("");
				setError("");
				try {
					const workspace = workspaces.find((item) => item.title === entry.name && !path);
					if (workspace !== void 0) await deleteWorkspace(workspace.workspaceId);
					const response = await fetch(base + "workspace-files?path=" + encodeURIComponent(nextPath), { method: "DELETE", credentials: "include" });
					const data = await response.json().catch(() => ({}));
					if (!response.ok) throw new Error(data.detail || "删除失败");
					await load(path);
				} catch (reason) {
					setError(String(reason?.message || reason));
				}
			};
			const create = async () => {
				const name = folderName.trim();
				if (!name || creating) return;
				setCreating(true);
				setError("");
				try {
					const response = await fetch(base + "workspace-folders", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ path, name }) });
					const data = await response.json().catch(() => ({}));
					if (!response.ok) throw new Error(data.detail || "创建文件夹失败");
					setFolderName("");
					await load(path);
				} catch (reason) {
					setError(String(reason?.message || reason));
				} finally {
					setCreating(false);
				}
			};
			const crumbs = path ? ["工作空间根目录"].concat(path.split("/")) : ["工作空间根目录"];
			return (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open,
				title: "管理工作区",
				onClose,
				closeLabel: "关闭",
				className: void 0,
				children: (0, react_jsx_runtime.jsxs)("div", { style: { minWidth: "min(680px, 82vw)", maxWidth: "760px", display: "flex", flexDirection: "column", gap: 16 }, children: [
					(0, react_jsx_runtime.jsx)("p", { style: { margin: 0, color: "var(--dsw-alias-label-tertiary)", fontSize: 13 }, children: "这里是当前账号的工作空间根目录。文件和文件夹只属于当前账号。" }),
					(0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }, children: crumbs.map((label, index) => (0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("button", { type: "button", onClick: () => go(index === 0 ? "" : crumbs.slice(1, index + 1).join("/")), style: { border: 0, background: "transparent", color: index === crumbs.length - 1 ? "var(--dsw-alias-label-primary)" : "var(--dsw-alias-label-secondary)", padding: "2px 4px", cursor: "pointer" }, children: label }), index < crumbs.length - 1 ? " / " : null] }, index)) }),
					(0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 8 }, children: [(0, react_jsx_runtime.jsx)("input", { value: folderName, onChange: (event) => setFolderName(event.target.value), onKeyDown: (event) => { if (event.key === "Enter") create(); }, placeholder: "新文件夹名称", style: { flex: 1, minWidth: 0, border: "1px solid var(--dsw-alias-border-l2)", borderRadius: 8, padding: "8px 10px", color: "inherit", background: "transparent" } }), (0, react_jsx_runtime.jsx)("button", { type: "button", disabled: creating || !folderName.trim(), onClick: create, style: { border: 0, borderRadius: 8, padding: "8px 12px", cursor: "pointer" }, children: "新建文件夹" })] }),
					error ? (0, react_jsx_runtime.jsx)("p", { role: "alert", style: { margin: 0, color: "var(--dsw-alias-state-error-primary)" }, children: error }) : null,
					(0, react_jsx_runtime.jsx)("div", { style: { border: "1px solid var(--dsw-alias-border-l2)", borderRadius: 10, minHeight: 180, maxHeight: "52vh", overflow: "auto" }, children: loading ? (0, react_jsx_runtime.jsx)("p", { style: { padding: 16 }, children: "正在加载…" }) : entries.length === 0 ? (0, react_jsx_runtime.jsx)("p", { style: { padding: 16, color: "var(--dsw-alias-label-tertiary)" }, children: "此目录为空" }) : entries.map((entry) => (0, react_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderBottom: "1px solid var(--dsw-alias-border-l3)" }, children: [(0, react_jsx_runtime.jsx)("button", { type: "button", onClick: () => entry.type === "directory" && go((path ? path + "/" : "") + entry.name), style: { flex: 1, textAlign: "left", border: 0, background: "transparent", cursor: entry.type === "directory" ? "pointer" : "default", color: "inherit" }, children: (entry.type === "directory" ? "📁 " : "📄 ") + entry.name }), (0, react_jsx_runtime.jsx)("span", { style: { color: "var(--dsw-alias-label-tertiary)", fontSize: 12 }, children: entry.type === "directory" ? "文件夹" : ((Number(entry.bytes) / 1024).toFixed(0) + " KB") }), (0, react_jsx_runtime.jsx)("button", { type: "button", onClick: () => remove(entry), style: { border: 0, background: "transparent", color: pendingDelete === ((path ? path + "/" : "") + entry.name) ? "var(--dsw-alias-label-primary)" : "var(--dsw-alias-state-error-primary)", cursor: "pointer", fontWeight: pendingDelete === ((path ? path + "/" : "") + entry.name) ? 600 : 400 }, children: pendingDelete === ((path ? path + "/" : "") + entry.name) ? "确认删除" : "删除" })] }, entry.name)) })
				] })
			});
		}
'''

def once(text, old, new, label):
    if text.count(old) != 1:
        raise RuntimeError(f"{label}: anchor count is {text.count(old)}")
    return text.replace(old, new, 1)

def expose_workspace_manager(source):
    """Keep file management available even when directory picking is unavailable.

    The sidebar manager only lists and creates folders through the authenticated
    workspace-files routes. It does not need the optional OS/in-app directory
    picker capability. Gating this button on that capability left users with
    only the composer workspace picker, whose selection intentionally switches
    to a workspace and can therefore show an empty session list.
    """
    needle = 'directoryFlowAvailable && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {'
    if needle in source:
        return source.replace(needle, '(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {', 1)
    return source

def patch(root):
    cloud = root / "code/cloud"
    module = cloud / "workspace_files.py"
    if module.exists():
        existing = module.read_text(encoding="utf-8")
        if existing != WORKSPACE_FILES and "def safe_path(username, relative=\"\")" not in existing:
            raise RuntimeError(f"refusing to overwrite changed {module}")
    module.write_text(WORKSPACE_FILES, encoding="utf-8")
    app = cloud / "app.py"
    source = app.read_text(encoding="utf-8")
    if "import workspace_files\n" not in source:
        source = once(source, "import workspace_bootstrap\n", "import workspace_bootstrap\nimport workspace_files\n", "workspace-files import")
    anchor = '''@app.get("/v1/storage")
def storage_usage(request: Request):
'''
    helper = '''def _workspace_user(request: Request):
    try:
        return current_user(request)
    except HTTPException:
        username = request.headers.get("x-mdexp-user", "").strip()
        user = next((item for item in accounts._load().get("users", [])
                     if item.get("username") == username and item.get("status") == "active"), None)
        if user is None:
            raise HTTPException(401, "未登录")
        return user


'''
    if "def _workspace_user(request: Request)" not in source:
        source = once(source, anchor, helper + anchor, "workspace auth helper")
    routes = r'''
@app.get("/v1/workspace/files")
def workspace_files_list(request: Request, path: str = Query("", max_length=512)):
    user = _workspace_user(request)
    try:
        return workspace_files.list_dir(user["username"], path)
    except (ValueError, FileNotFoundError) as error:
        raise HTTPException(400, str(error))

@app.delete("/v1/workspace/files")
def workspace_files_delete(request: Request, path: str = Query("", min_length=1, max_length=512)):
    user = _workspace_user(request)
    try:
        return workspace_files.delete_entry(user["username"], path)
    except (ValueError, FileNotFoundError) as error:
        raise HTTPException(400, str(error))

class WorkspaceFolderBody(BaseModel):
    path: str = ""
    name: str

@app.post("/v1/workspace/folders")
def workspace_folder_create(body: WorkspaceFolderBody, request: Request):
    user = _workspace_user(request)
    try:
        result = workspace_files.create_folder(user["username"], body.path, body.name)
        try:
            status = tenants.status().get(user["username"])
            if status and status.get("alive"):
                workspace_bootstrap.initialize_registry(status["port"], paths.user_projects_dir(user["username"]))
        except Exception:
            pass
        return result
    except (ValueError, FileExistsError, FileNotFoundError) as error:
        raise HTTPException(400, str(error))
'''
    if "/v1/workspace/files" not in source:
        marker = '\n@app.get("/v1/health")'
        source = once(source, marker, routes + marker, "workspace files routes")
    app.write_text(source, encoding="utf-8")
    bootstrap = cloud / "workspace_bootstrap.py"
    source = bootstrap.read_text(encoding="utf-8")
    if BOOTSTRAP_OLD in source:
        bootstrap.write_text(source.replace(BOOTSTRAP_OLD, BOOTSTRAP_NEW, 1), encoding="utf-8")
    nginx = NGINX
    source = nginx.read_text(encoding="utf-8")
    route = '''location = /official/md-agent/workspace-files {
    auth_request /official-md-agent-auth;
    auth_request_set $mdagent_storage_user $upstream_http_x_mdexp_user;
    proxy_pass http://127.0.0.1:8090/v1/workspace/files;
    proxy_set_header Host 127.0.0.1:8090;
    proxy_set_header X-Mdexp-User $mdagent_storage_user;
    proxy_set_header Cookie "";
    proxy_set_header Authorization "";
    proxy_buffering off;
    add_header Cache-Control "no-store" always;
}
location = /official/md-agent/workspace-folders {
    auth_request /official-md-agent-auth;
    auth_request_set $mdagent_storage_user $upstream_http_x_mdexp_user;
    proxy_pass http://127.0.0.1:8090/v1/workspace/folders;
    proxy_set_header Host 127.0.0.1:8090;
    proxy_set_header X-Mdexp-User $mdagent_storage_user;
    proxy_set_header Cookie "";
    proxy_set_header Authorization "";
    proxy_buffering off;
    add_header Cache-Control "no-store" always;
}
'''
    if "location = /official/md-agent/workspace-files {" not in source:
        source = once(source, "location = /official/md-agent/open {", route + "location = /official/md-agent/open {", "workspace nginx routes")
        nginx.write_text(source, encoding="utf-8")
    for path in sorted((root / "code/node_modules/.pnpm").glob("*/node_modules/@deepseek-ai/dsh-client-ui-workspace/lib/client.js")):
        source = path.read_text(encoding="utf-8")
        if 'function WorkspaceFileManager' in source:
            if 'setWsPickerOpen((v) => !v);' in source:
                source = source.replace('setWsPickerOpen((v) => !v);', 'setWsPickerOpen(false);\n\t\t\t\t\t\t\tsetManagerOpen(true);', 1)
            source = source.replace('style: { minWidth: "min(680px, 82vw)", maxWidth: "760px", display: "flex", flexDirection: "column", gap: 16 }', 'style: { width: "100%", minWidth: 0, maxWidth: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 16 }', 1)
            picker_start = source.find("function WorkspacePicker(")
            picker_end = source.find("\n\t\t}", picker_start)
            if picker_start >= 0 and picker_end > picker_start:
                picker = source[picker_start:picker_end]
                picker = picker.replace("\n\t\t\t\tuseDirectoryFlow,", "\n\t\t\t\tuseDirectoryFlow: () => false,", 1)
                source = source[:picker_start] + picker + source[picker_end:]
            if 'const [pendingDelete, setPendingDelete]' not in source:
                source = source.replace('const [creating, setCreating] = (0, react.useState)(false);', 'const [creating, setCreating] = (0, react.useState)(false);\n\t\t\tconst [pendingDelete, setPendingDelete] = (0, react.useState)("");', 1)
                source = source.replace('const go = (nextPath) => setPath(nextPath.replace(/^\\/+|\\/+$/g, ""));', 'const go = (nextPath) => { setPendingDelete(""); setPath(nextPath.replace(/^\\/+|\\/+$/g, "")); };', 1)
                source = source.replace('if (!window.confirm("确认删除“" + nextPath + "”？删除后无法恢复。")) return;', 'if (pendingDelete !== nextPath) { setPendingDelete(nextPath); return; }\n\t\t\tsetPendingDelete("");', 1)
                source = source.replace('style: { border: 0, background: "transparent", color: "var(--dsw-alias-state-error-primary)", cursor: "pointer" }, children: "删除"', 'style: { border: 0, background: "transparent", color: pendingDelete === ((path ? path + "/" : "") + entry.name) ? "var(--dsw-alias-label-primary)" : "var(--dsw-alias-state-error-primary)", cursor: "pointer", fontWeight: pendingDelete === ((path ? path + "/" : "") + entry.name) ? 600 : 400 }, children: pendingDelete === ((path ? path + "/" : "") + entry.name) ? "确认删除" : "删除"', 1)
            source = expose_workspace_manager(source)
            path.write_text(source, encoding="utf-8")
            continue
        start = source.find('\t\tfunction WorkspaceBrowser(')
        if start < 0:
            raise RuntimeError(f"WorkspaceBrowser anchor missing: {path}")
        source = source[:start] + COMPONENT + source[start:]
        source = source.replace('setWsPickerOpen((v) => !v);', 'setWsPickerOpen(false);\n\t\t\t\t\t\t\tsetManagerOpen(true);', 1)
        source = source.replace('''const [wsPickerOpen, setWsPickerOpen] = (0, react.useState)(false);''', '''const [wsPickerOpen, setWsPickerOpen] = (0, react.useState)(false);
\t\t\tconst [managerOpen, setManagerOpen] = (0, react.useState)(false);''', 1)
        source = source.replace('''(0, react_jsx_runtime.jsx)(WorkspacePickFlow, {
\t\t\t\t\t\t\t\tt,
\t\t\t\t\t\t\t\topen: wsPickerOpen,''', '''(0, react_jsx_runtime.jsx)(WorkspacePickFlow, {
\t\t\t\t\t\t\t\tt,
\t\t\t\t\t\t\t\topen: wsPickerOpen,''', 1)
        anchor = '''\t\t\t\t\t\t\t})\n\t\t\t\t\t\t]\n\t\t\t\t\t}),\n\t\t\t\t\t!wide &&'''
        insert = '''\t\t\t\t\t\t\t}),
\t\t\t\t\t\t\t(0, react_jsx_runtime.jsx)(WorkspaceFileManager, {
\t\t\t\t\t\t\t\topen: managerOpen,
\t\t\t\t\t\t\t\tonClose: () => setManagerOpen(false),
\t\t\t\t\t\t\t\tworkspaces,
\t\t\t\t\t\t\t\tdeleteWorkspace
\t\t\t\t\t\t\t})\n\t\t\t\t\t\t]\n\t\t\t\t\t}),\n\t\t\t\t\t!wide &&'''
        source = once(source, anchor, insert, "manager modal mount")
        source = source.replace('"workspace.add": "添加工作区"', '"workspace.add": "管理工作区"', 1)
        source = source.replace('"menu.addWorkspace": "添加工作区…"', '"menu.addWorkspace": "管理工作区"', 1)
        source = expose_workspace_manager(source)
        path.write_text(source, encoding="utf-8")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    if args.root != ROOT or not (ROOT / "code/cloud/app.py").is_file():
        raise SystemExit("--apply is restricted to the verified MD-Agent deployment")
    if not args.apply:
        print("Preview only:", ROOT)
        return
    backup = BACKUPS / (datetime.now().strftime("%Y%m%d-%H%M%S") + "-workspace-manager")
    backup.mkdir(mode=0o700, parents=True, exist_ok=False)
    files = [ROOT / "code/cloud/app.py", ROOT / "code/cloud/workspace_files.py", ROOT / "code/cloud/workspace_bootstrap.py"]
    files += sorted((ROOT / "code/node_modules/.pnpm").glob("*/node_modules/@deepseek-ai/dsh-client-ui-workspace/lib/client.js"))
    for path in files:
        if not path.exists():
            continue
        target = backup / path.relative_to(ROOT)
        target.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
        shutil.copy2(path, target)
    nb = backup / "etc/nginx/snippets/mdagent-web-locations.conf.before"
    nb.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    shutil.copy2(NGINX, nb)
    patch(ROOT)
    for path in (ROOT / "code/cloud/app.py", ROOT / "code/cloud/workspace_files.py", ROOT / "code/cloud/workspace_bootstrap.py"):
        subprocess.run(["/usr/bin/python3", "-m", "py_compile", str(path)], check=True)
    subprocess.run(["nginx", "-t"], check=True)
    subprocess.run(["systemctl", "restart", "mdagent-api"], check=True)
    subprocess.run(["systemctl", "reload", "nginx"], check=True)
    subprocess.run(["systemctl", "is-active", "mdagent-api"], check=True)
    print("BACKUP=" + str(backup))

if __name__ == "__main__":
    main()
