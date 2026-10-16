import sqlite3
from concurrent.futures import ThreadPoolExecutor

import pytest

from official_api.config import Settings
from official_api.db import MIGRATIONS_DIR, Database
from official_api.app import create_app


def build(tmp_path, name='auth.sqlite3'):
    settings = Settings.from_env({'LLMER_HASH_SECRET': 'migration-test-secret-' * 3,
                                 'LLMER_DATABASE_PATH': str(tmp_path / name),
                                 'LLMER_AVATAR_DIR': str(tmp_path / 'avatars'), 'APP_ENV': 'test'})
    return create_app(settings=settings)


def applied(tmp_path, name='auth.sqlite3'):
    with sqlite3.connect(tmp_path / name) as c:
        return c.execute('SELECT version,name FROM schema_migrations ORDER BY version').fetchall()


def test_migrations_applied_once_on_fresh_db(tmp_path):
    build(tmp_path)
    assert [row[0] for row in applied(tmp_path)] == [1, 2, 3, 4, 5, 6]
    with sqlite3.connect(tmp_path / 'auth.sqlite3') as c:
        tables = {row[0] for row in c.execute("SELECT name FROM sqlite_master WHERE type='table'")}
        assert {'users', 'official_rates', 'official_llm_models', 'official_llm_providers', 'official_user_llm_models', 'schema_migrations'} <= tables
        assert not any(t.startswith(('paid_', 'v4_')) for t in tables)
        columns = {row[1] for row in c.execute('PRAGMA table_info(official_usage)')}
        assert {'model', 'core_minutes', 'shortfall'} <= columns


def test_migrate_twice_is_idempotent(tmp_path):
    app = build(tmp_path)
    with sqlite3.connect(tmp_path / 'auth.sqlite3') as c:
        before = c.execute("SELECT type,name,sql FROM sqlite_master ORDER BY type,name").fetchall()
    app.state.database.initialize()
    assert [row[0] for row in applied(tmp_path)] == [1, 2, 3, 4, 5, 6]
    with sqlite3.connect(tmp_path / 'auth.sqlite3') as c:
        after = c.execute("SELECT type,name,sql FROM sqlite_master ORDER BY type,name").fetchall()
        assert before == after
        assert c.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'


def legacy_schema(tmp_path):
    """复刻迁移机制落地前的既有库：旧建表语句并集（缺一张表以验证 0001 不会被执行）。"""
    ddl = (MIGRATIONS_DIR / '0001_baseline.sql').read_text(encoding='utf-8')
    statements = [s for s in ddl.split(';') if 'official_password_attempts' not in s and s.strip()]
    path = tmp_path / 'legacy.sqlite3'
    with sqlite3.connect(path) as c:
        c.executescript(';'.join(statements))
        c.execute("INSERT INTO users VALUES('u1','ph','0001',1,1)")
        c.execute("INSERT INTO community_admins VALUES('u1','ADMIN',1)")
        c.execute("INSERT INTO official_products VALUES('lammps','LAMMPS','LAMMPS','d','','','AVAILABLE',0,0,0,7)")
        c.execute("INSERT INTO official_products VALUES('md-exp','MD EXP','MD EXP','d','','','AVAILABLE',0,0,0,0)")
        c.execute("INSERT INTO community_invitations(code,label,created_at_ms,expires_at_ms,product_id) VALUES('LEGACYMD','legacy',1,9999999999999,'md-exp')")
        c.execute("INSERT INTO official_md_agent_qualifications VALUES('u1','md-exp','LEGACYMD',1)")
    return path


def test_baseline_assimilation_on_legacy_db(tmp_path):
    legacy_schema(tmp_path)
    build(tmp_path, 'legacy.sqlite3')
    assert [row[0] for row in applied(tmp_path, 'legacy.sqlite3')] == [1, 2, 3, 4, 5, 6]
    with sqlite3.connect(tmp_path / 'legacy.sqlite3') as c:
        # 0001 仅登记不执行：缺失的表不应被补建；既有数据原样保留。
        assert not c.execute("SELECT 1 FROM sqlite_master WHERE type='table' AND name='official_password_attempts'").fetchone()
        assert c.execute('SELECT COUNT(*) FROM users').fetchone()[0] == 1
        # 0002 把社区管理员同步进官网角色表。
        assert c.execute('SELECT role FROM official_roles WHERE user_id=?', ('u1',)).fetchone()[0] == 'ADMIN'
        # 0003 按既有产品单价播种费率。
        rate = c.execute("SELECT points_per_unit FROM official_rates WHERE scope='product-unit' AND key='lammps'").fetchone()
        assert rate[0] == 7
        assert c.execute("SELECT units FROM official_entitlements WHERE user_id='u1' AND product_id='md-exp'").fetchone()[0] == 1
        assert c.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'


def test_migrate_refuses_when_no_files(tmp_path, monkeypatch):
    monkeypatch.setattr('official_api.db.MIGRATIONS_DIR', tmp_path / 'empty')
    (tmp_path / 'empty').mkdir()
    db = Database(tmp_path / 'empty' / 'x.sqlite3')
    try:
        db.initialize()
        assert False, 'expected RuntimeError'
    except RuntimeError:
        pass


def test_concurrent_independent_connections_apply_each_version_once(tmp_path):
    path = tmp_path / 'concurrent.sqlite3'

    def initialize():
        Database(path).initialize()

    with ThreadPoolExecutor(max_workers=2) as pool:
        list(pool.map(lambda _: initialize(), range(2)))
    with sqlite3.connect(path) as c:
        assert c.execute('PRAGMA user_version').fetchone()[0] == 3
        rows = c.execute('SELECT version,COUNT(*) FROM schema_migrations GROUP BY version ORDER BY version').fetchall()
        assert rows == [(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1)]
        assert c.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'


def test_failed_migration_rolls_back_without_version_record(tmp_path, monkeypatch):
    migration_dir = tmp_path / 'migrations'
    migration_dir.mkdir()
    (migration_dir / '0001_create.sql').write_text('CREATE TABLE marker(id INTEGER PRIMARY KEY);\n')
    (migration_dir / '0002_fail.sql').write_text(
        'ALTER TABLE marker ADD COLUMN added INTEGER;\n'
        'INSERT INTO missing_table VALUES (1);\n'
    )
    (migration_dir / '0003_after.sql').write_text('CREATE TABLE after_marker(id INTEGER PRIMARY KEY);\n')
    monkeypatch.setattr('official_api.db.MIGRATIONS_DIR', migration_dir)
    path = tmp_path / 'rollback.sqlite3'
    db = Database(path)
    with pytest.raises(sqlite3.OperationalError):
        db.initialize()
    with sqlite3.connect(path) as c:
        assert c.execute('PRAGMA user_version').fetchone()[0] == 0
        assert c.execute('SELECT version FROM schema_migrations').fetchall() == [(1,)]
        assert c.execute("SELECT 1 FROM sqlite_master WHERE name='marker'").fetchone()
        assert not c.execute("SELECT 1 FROM pragma_table_info('marker') WHERE name='added'").fetchone()
        assert not c.execute("SELECT 1 FROM sqlite_master WHERE name='after_marker'").fetchone()
    # Repair the failing SQL and retry: migration 1 is not duplicated, and all
    # three records become visible only after the repaired run commits.
    (migration_dir / '0002_fail.sql').write_text('ALTER TABLE marker ADD COLUMN added INTEGER;\n')
    db.initialize()
    with sqlite3.connect(path) as c:
        assert c.execute('PRAGMA user_version').fetchone()[0] == 3
        assert c.execute('SELECT version,COUNT(*) FROM schema_migrations GROUP BY version ORDER BY version').fetchall() == [(1, 1), (2, 1), (3, 1)]
