"""Align MD Agent's read-only entitlement lookup with official expiry access."""
from pathlib import Path
from datetime import datetime
import shutil

path = Path('/opt/mdagent/code/cloud/llmproxy.py')
source = path.read_text()
old = '(e.units > 0 OR COALESCE(e.expires_at_ms, 0) > ?)'
new = 'COALESCE(e.expires_at_ms, 0) > ?'
if old in source:
    assert source.count(old) == 1
    target = source.replace(old, new)
    compile(target, str(path), 'exec')
    backup = Path('/var/backups/aethericai-official') / (datetime.now().strftime('%Y%m%d-%H%M%S') + '-md-duration')
    backup.mkdir(mode=0o700)
    shutil.copy2(path, backup / path.name)
    path.write_text(target)
elif new not in source:
    raise RuntimeError('Unexpected MD-Agent entitlement query')
# Restart mdagent-api after deploying matching official_api and gateway changes.
