import concurrent.futures
import importlib.util
import json
import os
from pathlib import Path
import tempfile
import threading
import unittest
from unittest.mock import patch

MODULE = Path(__file__).resolve().parents[2] / "deploy/wulanchabu/mdagent/workspace_bootstrap.py"
spec = importlib.util.spec_from_file_location("md_workspace_bootstrap", MODULE)
bootstrap = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bootstrap)

class PrivateWorkspaceTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name).resolve()
    def tearDown(self):
        self.temporary.cleanup()

    def test_private_storage_is_idempotent_and_preserves_existing_files(self):
        bootstrap.prepare_storage(str(self.root))
        sentinel = self.root / "projects/default/user-file.txt"
        sentinel.write_text("original")
        bootstrap.prepare_storage(str(self.root))
        self.assertEqual(sentinel.read_text(), "original")
        for path in ("", "data", "data/memory", "projects", "projects/default", "tmp"):
            self.assertEqual((self.root/path).stat().st_mode & 0o777, 0o700)

    def test_shared_memory_link_is_replaced_without_copying_or_deleting_shared_data(self):
        shared = self.root / "public-template"
        shared.mkdir()
        (shared/"other-user.txt").write_text("do not copy")
        (self.root/"data").mkdir()
        (self.root/"data/memory").symlink_to(shared, target_is_directory=True)
        bootstrap.prepare_storage(str(self.root))
        self.assertFalse((self.root/"data/memory").is_symlink())
        self.assertFalse((self.root/"data/memory/other-user.txt").exists())
        self.assertEqual((shared/"other-user.txt").read_text(), "do not copy")

    def test_projects_and_default_symlinks_fail_closed(self):
        for target in ("projects", "projects/default"):
            with self.subTest(target=target), tempfile.TemporaryDirectory() as tmp:
                tenant = Path(tmp)/"tenant"
                foreign = Path(tmp)/"foreign"
                tenant.mkdir(); foreign.mkdir()
                (tenant/target).parent.mkdir(parents=True, exist_ok=True)
                (tenant/target).symlink_to(foreign, target_is_directory=True)
                with self.assertRaises(OSError):
                    bootstrap.prepare_storage(str(tenant))
                self.assertEqual(list(foreign.iterdir()), [])

    def test_foreign_registry_path_rejected_even_when_names_share_a_prefix(self):
        bootstrap.prepare_storage(str(self.root))
        own = self.root/"projects"
        other = self.root/"projects-other"
        other.mkdir()
        with patch.object(bootstrap, "rpc", return_value={"items":[{"path":str(other)}]}) as rpc:
            with self.assertRaisesRegex(RuntimeError, "outside"):
                bootstrap.initialize_registry(21999, str(own))
            rpc.assert_called_once()

    def test_registry_writes_use_workspace_create_and_are_not_direct_file_edits(self):
        bootstrap.prepare_storage(str(self.root))
        own = self.root/"projects"
        with patch.object(bootstrap, "rpc", side_effect=[{"items":[]},{"workspace":{}}]) as rpc:
            bootstrap.initialize_registry(21999, str(own))
            self.assertEqual(rpc.call_args_list[1].args, (21999, "workspace.create", {"path":str(own/"default")}))
        self.assertFalse((self.root/"dsh-home/storages/workspace.json").exists())

    def test_concurrent_bootstrap_runs_once_per_process_instance(self):
        instance, guard = {"node_id":None}, threading.Lock()
        with patch.object(bootstrap, "ensure_private_storage", return_value=str(self.root)), patch.object(bootstrap, "initialize_registry") as init:
            with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
                list(pool.map(lambda _: bootstrap.ensure("alice", 21999, instance, guard, lambda:True), range(24)))
            init.assert_called_once()
            # A replacement process may reuse the port but must initialize independently.
            bootstrap.ensure("alice", 21999, {"node_id":None}, threading.Lock(), lambda:True)
            self.assertEqual(init.call_count, 2)

    def test_failed_bootstrap_is_not_cached_and_can_retry(self):
        instance, guard = {"node_id":None}, threading.Lock()
        with patch.object(bootstrap, "ensure_private_storage", return_value=str(self.root)), patch.object(bootstrap, "initialize_registry", side_effect=[RuntimeError("cold"),None]) as init:
            with self.assertRaises(RuntimeError):
                bootstrap.ensure("alice", 21999, instance, guard, lambda:True)
            self.assertNotIn("private_workspace_ready", instance)
            bootstrap.ensure("alice", 21999, instance, guard, lambda:True)
            self.assertEqual(init.call_count,2)

    def test_changed_instance_fails_before_any_mutation(self):
        with patch.object(bootstrap, "ensure_private_storage") as prepare:
            with self.assertRaisesRegex(RuntimeError, "changed"):
                bootstrap.ensure("alice", 21999, {}, threading.Lock(), lambda:False)
            prepare.assert_not_called()

    def test_remote_node_registry_is_preserved(self):
        with patch.object(bootstrap, "ensure_private_storage") as prepare, patch.object(bootstrap, "initialize_registry") as registry:
            bootstrap.ensure("alice",21999,{"node_id":"node-owned-by-alice"},threading.Lock(),lambda:True)
            prepare.assert_called_once_with("alice",create_default=False)
            registry.assert_not_called()

if __name__ == "__main__":
    unittest.main()
