#!/usr/bin/env python3
"""Create a complete, verified, immutable candidate. Does not activate it."""
import argparse
import importlib.util
import re
import shutil
import tarfile
from pathlib import Path

spec = importlib.util.spec_from_file_location("assets", Path(__file__).with_name("verify-static-assets.py"))
assets = importlib.util.module_from_spec(spec)
spec.loader.exec_module(assets)

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("name", help="YYYYMMDD-feature release name")
parser.add_argument("--out", type=Path, default=Path("out"))
parser.add_argument("--public", type=Path, default=Path("public"))
parser.add_argument("--destination", type=Path, default=Path("output/releases"))
args = parser.parse_args()
if not re.fullmatch(r"\d{8}-[a-z0-9][a-z0-9-]*", args.name):
    parser.error("Release name must be YYYYMMDD-feature")
target = args.destination / args.name
archive = args.destination / f"{args.name}.tar.gz"
if target.exists() or archive.exists():
    parser.error("Candidate already exists; choose a new release name")
files, errors = assets.local_check(args.out, args.public)
if errors:
    raise SystemExit("\n".join(errors))
if target.resolve().is_relative_to(args.out.resolve()):
    parser.error("Destination must be outside the build output")
target.mkdir(parents=True)
shutil.copytree(args.out, target / "out")
if assets.inventory(target / "out") != files:
    raise SystemExit("Copy verification failed; candidate not packaged")
assets.write_manifest(target / "STATIC_ASSETS.json", files)
shutil.copy2(Path(__file__).with_name("verify-static-assets.py"), target / "verify-static-assets.py")
shutil.copy2(Path(__file__).with_name("FRONTEND_RESOURCE_MANAGEMENT.md"), target / "FRONTEND_RESOURCE_MANAGEMENT.md")
with tarfile.open(archive, "x:gz") as package:
    package.add(target, arcname=args.name)
print(f"candidate={target} files={len(files)} bytes={sum(f['bytes'] for f in files.values())}")
print(f"archive={archive} sha256={assets.digest(archive)}")
