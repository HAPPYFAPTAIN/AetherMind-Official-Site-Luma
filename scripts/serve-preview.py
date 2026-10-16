"""Local static export preview with safe caching for content-hashed assets."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import re


class PreviewHandler(SimpleHTTPRequestHandler):
    def send_response(self, code, message=None):
        self.response_code = code
        super().send_response(code, message)

    def end_headers(self):
        path = urlsplit(self.path).path
        if getattr(self, "response_code", 200) not in (200, 304):
            self.send_header("Cache-Control", "no-store")
        elif path.startswith("/_next/static/") or re.fullmatch(r"/science/scene-worker-[a-z0-9]+\.js", path):
            self.send_header("Cache-Control", "public, max-age=31536000, immutable")
        elif path.startswith(("/images/", "/assets/", "/videos/")):
            # Stable names can change between builds. Revalidate rather than serving stale art.
            self.send_header("Cache-Control", "no-cache")
        else:
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def strip_base_path(self):
        if urlsplit(self.path).path == "/official":
            self.send_response(302)
            self.send_header("Location", "/official/")
            self.end_headers()
            return False
        if self.path.startswith("/official/"):
            self.path = self.path[len("/official"):]
        return True

    def do_GET(self):
        if self.strip_base_path():
            super().do_GET()

    def do_HEAD(self):
        if self.strip_base_path():
            super().do_HEAD()


if __name__ == "__main__":
    root = Path(__file__).resolve().parent.parent / "output" / "preview"
    server = ThreadingHTTPServer(("127.0.0.1", 3000), partial(PreviewHandler, directory=str(root)))
    server.serve_forever()
