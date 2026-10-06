"""Public, immutable report scene assets served outside the mini-game package."""
from pathlib import Path
import re

from fastapi.responses import FileResponse

REPORT_ASSET_DIR = Path(__file__).resolve().parent / "report_assets"
STYLE_RE = re.compile(r"^(mist-purple|ice-blue|milk-apricot|amber)$")
FILE_RE = re.compile(r"^(hero|highlight|footer)\.png$")
ALLOWED = {
    "mist-purple": {"hero.png", "highlight.png"},
    "ice-blue": {"hero.png", "highlight.png"},
    "milk-apricot": {"hero.png", "highlight.png"},
    "amber": {"hero.png", "footer.png"},
}


def report_asset_file(style: str, filename: str) -> FileResponse:
    if not STYLE_RE.fullmatch(style) or not FILE_RE.fullmatch(filename) or filename not in ALLOWED.get(style, set()):
        from .errors import ApiError
        raise ApiError(404, "REPORT_ASSET_NOT_FOUND", "报告素材不存在")
    root = REPORT_ASSET_DIR.resolve()
    path = (root / style / filename).resolve()
    if root not in path.parents or not path.is_file():
        from .errors import ApiError
        raise ApiError(404, "REPORT_ASSET_NOT_FOUND", "报告素材不存在")
    response = FileResponse(path, media_type="image/png")
    response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response
