#!/usr/bin/env python3
"""Check a full export (--out out --public public), or the deployed site."""
import argparse
import hashlib
import json
import re
import ssl
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urldefrag, urljoin, urlparse
from urllib.request import Request, urlopen

PREFIX = '/official/'
PAGES = ['', 'console/', 'console/compute/', 'dashboard/', 'products/', 'products/learn-everything/', 'products/md-exp/', 'profile/', 'community/', 'legal/', 'login/']
ROOTS = ('/assets/', '/images/', '/videos/', '/science/', '/_next/')
CSS_URL = re.compile(r'''url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)''')

def css_references(text):
    # Consume quoted data URLs whole: embedded SVG url(%23filter) is not a file.
    return {next(value for value in match if value) for match in CSS_URL.findall(text) if any(match)}

class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = set()
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if not value:
                continue
            if key in {'src', 'href', 'poster'}:
                self.urls.add(value)
            elif key in {'srcset', 'imagesrcset'} and not value.startswith('data:'):
                self.urls.update(p.strip().split()[0] for p in value.split(',') if p.strip())
            elif key == 'style':
                self.urls.update(css_references(value))

def digest(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()

def inventory(root):
    if not root.is_dir():
        raise ValueError(f'Missing directory: {root}')
    files = {}
    for path in sorted(root.rglob('*')):
        if path.is_symlink():
            raise ValueError(f'Symlink forbidden: {path}')
        if path.is_file():
            files[path.relative_to(root).as_posix()] = {'bytes': path.stat().st_size, 'sha256': digest(path)}
    return files

def references(text, html=True):
    parser = References()
    if html:
        parser.feed(text)
    if not html:
        parser.urls.update(css_references(text))
    return parser.urls

def local_target(root, url):
    path = unquote(urlparse(url).path)
    if not path.startswith(PREFIX):
        raise ValueError(f'Missing {PREFIX} prefix: {path}')
    target = (root / path[len(PREFIX):]).resolve()
    if not target.is_relative_to(root.resolve()):
        raise ValueError(f'Path escapes export: {path}')
    return target / 'index.html' if path.endswith('/') or target.is_dir() else target

def local_check(root, public=None):
    files, errors = inventory(root), []
    for page in PAGES:
        if page + 'index.html' not in files:
            errors.append(f'Missing page: {page}index.html')
    for name, info in files.items():
        if not info['bytes'] and name.endswith(('.mp4', '.webp', '.js', '.css', '.html')):
            errors.append(f'Empty asset: {name}')
        if not name.endswith(('.html', '.css')):
            continue
        for ref in references((root / name).read_text(encoding='utf-8'), name.endswith('.html')):
            url = urljoin('https://release.invalid' + PREFIX + name, ref)
            parsed = urlparse(url)
            if parsed.netloc != 'release.invalid' or not parsed.path.startswith((PREFIX,) + ROOTS):
                continue
            try:
                if not local_target(root, url).is_file():
                    errors.append(f'Missing reference: {name} -> {ref}')
            except ValueError as exc:
                errors.append(str(exc))
    if public is not None:
        for name, info in inventory(public).items():
            if files.get(name) != info:
                errors.append(f'Public asset missing or altered: {name}')
    for group in ('videos/', 'images/immersive/', 'images/products/', 'science/'):
        if not any(name.startswith(group) for name in files):
            errors.append(f'Missing media group: {group}')
    return files, sorted(set(errors))

def write_manifest(path, files):
    path.parent.mkdir(parents=True, exist_ok=True)
    data = {'basePath': PREFIX, 'fileCount': len(files), 'totalBytes': sum(f['bytes'] for f in files.values()), 'files': files}
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    lines = ['# 官网静态资源清单', '', f"文件数：{len(files)}；总字节数：{data['totalBytes']}。", '', '逐文件 SHA-256 与大小见 STATIC_ASSETS.json。', '', '## 页面入口', '']
    lines += [f"- `{PREFIX}{name.removesuffix('index.html')}`" for name in files if name.endswith('index.html')]
    lines += ['', '## 资源目录', '']
    groups = sorted({'/'.join(name.split('/')[:2]) for name in files if '/' in name and not name.endswith(('.html', '.txt'))})
    lines += [f'- `{group}/`' for group in groups]
    lines += ['', '本清单属于候选发布包；正式切换时同步到 /data/aethericai-official/static/。', '']
    path.with_suffix('.md').write_text('\n'.join(lines), encoding='utf-8')

def remote_check(base, insecure=False, manifest=None):
    context = ssl._create_unverified_context() if insecure else ssl.create_default_context()
    pending = {base.rstrip('/') + PREFIX + page for page in PAGES}
    expected = json.loads(manifest.read_text(encoding='utf-8'))['files'] if manifest else {}
    pending.update(base.rstrip('/') + PREFIX + name for name in expected)
    checked, errors = set(), []
    while pending:
        url = pending.pop()
        if url in checked:
            continue
        checked.add(url)
        try:
            with urlopen(Request(url, headers={'User-Agent': 'aethermind-static-check/2'}), context=context, timeout=25) as response:
                body = response.read()
                content_type = response.headers.get_content_type()
                path = urlparse(url).path
                is_page = path.endswith(('/', '.html'))
                if response.status != 200 or (is_page and content_type != 'text/html') or (not is_page and content_type == 'text/html'):
                    raise ValueError(f'Unexpected response: {response.status} {content_type}')
                name = unquote(path[len(PREFIX):])
                if name in expected and (len(body) != expected[name]['bytes'] or hashlib.sha256(body).hexdigest() != expected[name]['sha256']):
                    raise ValueError('Content differs from release manifest')
                if is_page or content_type == 'text/css':
                    for ref in references(body.decode('utf-8'), is_page):
                        absolute = urldefrag(urljoin(url, ref))[0]
                        parsed = urlparse(absolute)
                        if parsed.netloc == urlparse(base).netloc and parsed.path.startswith((PREFIX,) + ROOTS):
                            pending.add(absolute)
        except Exception as exc:
            errors.append(f'{url}: {exc}')
    return len(checked), errors

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out', type=Path)
    parser.add_argument('--public', type=Path)
    parser.add_argument('--manifest', type=Path, help='Write local inventory, or compare remote files with it')
    parser.add_argument('--base-url', default='https://8.130.144.193')
    parser.add_argument('--insecure', action='store_true', help='Explicitly bypass TLS certificate validation')
    args = parser.parse_args()
    if args.public and not args.out:
        parser.error('--public requires --out')
    if args.out:
        files, errors = local_check(args.out, args.public)
        if not errors and args.manifest:
            write_manifest(args.manifest, files)
        print(f"files={len(files)} bytes={sum(f['bytes'] for f in files.values())} failures={len(errors)}")
    else:
        count, errors = remote_check(args.base_url, args.insecure, args.manifest)
        print(f'checked_urls={count} failures={len(errors)}')
    for error in errors:
        print(f'FAIL {error}')
    raise SystemExit(bool(errors))

if __name__ == '__main__':
    main()
