"""Private per-user dsh storage and default workspace initialization.

Invariants: filesystem preparation runs with the tenant UID, never root;
directory symlinks fail closed; each live process has its own bootstrap lock;
workspace state is written only through dsh's existing workspace RPC.
Counterexamples covered by tests: projects/default symlinks, a shared memory
link, a foreign workspace path, simultaneous empty-registry initialization,
and a listening dsh port whose RPC registry is still booting.
"""
import contextlib
import json
import os
from pathlib import Path
import pwd
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request

_DIRECTORY_FLAGS = os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW


@contextlib.contextmanager
def _private_directory(parent_fd, name):
    try:
        os.mkdir(name, 0o700, dir_fd=parent_fd)
    except FileExistsError:
        pass
    fd = os.open(name, _DIRECTORY_FLAGS, dir_fd=parent_fd)
    try:
        if os.fstat(fd).st_uid != os.getuid():
            raise PermissionError("private directory has another owner")
        os.fchmod(fd, 0o700)
        yield fd
    finally:
        os.close(fd)


def prepare_storage(user_root, create_default=True):
    """Run as the tenant: preserve real private data; unlink a shared memory link.

    No root chown and no recursive deletion. All child operations are relative
    to already-open directory descriptors, so swapping a path for a symlink
    cannot redirect initialization to another account.
    """
    root_fd = os.open(user_root, _DIRECTORY_FLAGS)
    try:
        if os.fstat(root_fd).st_uid != os.getuid():
            raise PermissionError("tenant root has another owner")
        os.fchmod(root_fd, 0o700)
        for name in ("dsh-home", "conversations", "tmp"):
            with _private_directory(root_fd, name):
                pass
        with _private_directory(root_fd, "projects") as projects_fd:
            if create_default:
                with _private_directory(projects_fd, "default"):
                    pass
        with _private_directory(root_fd, "data") as data_fd:
            # Remove only the link itself; shared files are never copied or deleted.
            try:
                os.readlink("memory", dir_fd=data_fd)
            except FileNotFoundError:
                pass
            except OSError:
                pass  # A real directory is preserved and checked below.
            else:
                os.unlink("memory", dir_fd=data_fd)
            with _private_directory(data_fd, "memory") as memory_fd:
                with _private_directory(memory_fd, "proposals"):
                    pass
    finally:
        os.close(root_fd)


def _user_root(username):
    import paths
    if not re.fullmatch(r"[A-Za-z0-9_-]{1,64}", username):
        raise ValueError("invalid tenant username")
    return os.path.join(paths.users_dir(), username)


def _run_as_tenant(username, operation, *options):
    user_root = _user_root(username)
    args = [sys.executable, str(Path(__file__).resolve()), operation, user_root, *options]
    credentials = {}
    if os.environ.get("MDAGENT_SKIP_UNIX") != "1":
        import provision
        account = pwd.getpwnam(provision.unix_name(username))
        credentials = dict(user=account.pw_uid, group=account.pw_gid, extra_groups=[])
    result = subprocess.run(
        args, cwd="/", env={"PATH": "/usr/bin:/bin", "LANG": "C.UTF-8"},
        stdin=subprocess.DEVNULL, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
        timeout=10, umask=0o077, **credentials,
    )
    if result.returncode:
        raise RuntimeError("tenant storage operation failed")
    return result.stdout


def ensure_private_storage(username, create_default=True):
    """Control-plane entry; all tenant-owned filesystem operations drop privilege."""
    user_root = _user_root(username)
    _run_as_tenant(username, "--prepare", *(("--default",) if create_default else ()))
    return os.path.join(user_root, "projects")


def read_evolution(username):
    # Read as the account UID, so malicious links never turn the root API
    # process into a reader of a different user's data.
    return json.loads(_run_as_tenant(username, "--read-evolution"))


def rpc(port, method, payload, ready_timeout=8):
    """Bounded cold-start retry: TCP listening does not imply dsh RPC is ready."""
    if not isinstance(port, int) or not 21000 <= port <= 21999:
        raise ValueError("invalid tenant port")
    body = json.dumps(dict(type="client-request", rpcId="private-workspace-bootstrap",
                           method=method, payload=payload)).encode()
    request = urllib.request.Request(
        f"http://127.0.0.1:{port}/api/{method}", data=body,
        headers={"Content-Type": "application/json"}, method="POST",
    )
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    deadline = time.monotonic() + ready_timeout
    while True:
        try:
            with opener.open(request, timeout=2) as response:
                value = json.loads(response.read())
        except urllib.error.HTTPError as exc:
            if exc.code != 404 or time.monotonic() >= deadline:
                raise RuntimeError("workspace RPC unavailable") from exc
        except (urllib.error.URLError, TimeoutError) as exc:
            if time.monotonic() >= deadline:
                raise RuntimeError("workspace RPC unavailable") from exc
        else:
            result = value.get("result", {})
            if result.get("ok") is not True or not isinstance(result.get("value"), dict):
                raise RuntimeError("workspace RPC failed")
            return result["value"]
        time.sleep(0.15)


def initialize_registry(port, projects_root):
    root = os.path.abspath(projects_root)
    if os.path.realpath(root) != root:
        raise RuntimeError("projects root must not be a symlink")
    listed = rpc(port, "workspace.list", {})
    items = listed.get("items")
    if not isinstance(items, list):
        raise RuntimeError("invalid workspace list")
    for item in items:
        candidate = item.get("path")
        if not isinstance(candidate, str):
            raise RuntimeError("invalid workspace path")
        resolved = os.path.realpath(candidate)
        if os.path.commonpath([root, resolved]) != root:
            raise RuntimeError("workspace path is outside the tenant projects root")
    if not items:
        default = os.path.join(root, "default")
        if os.path.realpath(default) != default:
            raise RuntimeError("default workspace must not be a symlink")
        rpc(port, "workspace.create", {"path": default})


def ensure(username, port, instance, instance_guard, is_current):
    """Serialize once per live process; reuse of a port must never reuse readiness."""
    with instance_guard:
        if not is_current():
            raise RuntimeError("tenant instance changed during bootstrap")
        if instance.get("private_workspace_ready"):
            return
        projects_root = ensure_private_storage(
            username, create_default=instance.get("node_id") is None,
        )
        # Connected-node workspaces retain their existing remote path contract.
        if instance.get("node_id") is None:
            initialize_registry(port, projects_root)
        if not is_current():
            raise RuntimeError("tenant instance changed during bootstrap")
        instance["private_workspace_ready"] = True


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "--read-evolution":
        memory = Path(sys.argv[2]) / "data" / "memory"
        out = {"strategies": [], "proposals": []}
        try:
            out["strategies"] = json.loads((memory / "behavior_strategies.json").read_text()).get("strategies", [])
        except (OSError, ValueError):
            pass
        try:
            out["proposals"] = sorted(p.name for p in (memory / "proposals").iterdir())[-50:]
        except OSError:
            pass
        print(json.dumps(out))
        raise SystemExit(0)
    if len(sys.argv) not in (3, 4) or sys.argv[1] != "--prepare":
        raise SystemExit("expected --prepare TENANT_ROOT [--default]")
    prepare_storage(sys.argv[2], create_default="--default" in sys.argv[3:])
