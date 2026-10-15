#!/usr/bin/env python3
"""Fetch every local static reference from the public official pages."""
from __future__ import annotations

from html.parser import HTMLParser
import re
import ssl
from urllib.parse import urljoin, urldefrag, urlparse
from urllib.request import Request, urlopen


BASE = "https://8.130.144.193"
PAGES = [
    "/official/",
    "/official/console/",
    "/official/console/compute/",
    "/official/dashboard/",
    "/official/products/",
    "/official/products/learn-everything/",
    "/official/products/md-exp/",
    "/official/profile/",
    "/official/community/",
    "/official/legal/",
    "/official/login/",
]


class References(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.urls: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for key, value in attrs:
            if key in {"src", "href"} and value:
                absolute = urljoin(BASE + "/", value)
                absolute, _ = urldefrag(absolute)
                parsed = urlparse(absolute)
                if parsed.netloc == "8.130.144.193" and parsed.path.startswith("/official/"):
                    self.urls.add(absolute)
                elif parsed.netloc == "8.130.144.193" and parsed.path.startswith(("/assets/", "/images/", "/science/", "/_next/")):
                    self.urls.add(absolute)


def get(url: str) -> tuple[int, str]:
    request = Request(url, headers={"User-Agent": "aethericai-static-check/1.0"})
    with urlopen(request, context=ssl._create_unverified_context(), timeout=15) as response:
        response.read(2048)
        return response.status, response.headers.get_content_type()


def main() -> None:
    refs: set[str] = set()
    failures: list[tuple[str, str]] = []
    for page in PAGES:
        url = BASE + page
        try:
            status, content_type = get(url)
            if status != 200 or content_type != "text/html":
                failures.append((url, f"page {status} {content_type}"))
                continue
            parser = References()
            parser.feed(urlopen(Request(url), context=ssl._create_unverified_context(), timeout=15).read().decode("utf-8", "ignore"))
            refs.update(parser.urls)
        except Exception as exc:
            failures.append((url, f"page {exc}"))
    for url in sorted(refs):
        try:
            status, content_type = get(url)
            if status != 200:
                failures.append((url, f"asset {status} {content_type}"))
        except Exception as exc:
            failures.append((url, f"asset {exc}"))
    print(f"pages={len(PAGES)} referenced_assets={len(refs)} failures={len(failures)}")
    for url, reason in failures:
        print(f"FAIL {reason} {url}")
    raise SystemExit(1 if failures else 0)


if __name__ == "__main__":
    main()
