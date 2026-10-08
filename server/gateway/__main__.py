"""Standalone process entrypoint for the isolated port 18040 gateway."""
from __future__ import annotations

import os

import uvicorn

from .app import create_app
from official_api.config import Settings


def main() -> None:
    settings = Settings.from_env({
        **os.environ,
        "HOST": os.environ.get("GATEWAY_HOST", "127.0.0.1"),
        "PORT": os.environ.get("GATEWAY_PORT", "18040"),
    })
    uvicorn.run(
        create_app,
        factory=True,
        host=settings.host,
        port=settings.port,
        access_log=False,
        server_header=False,
        date_header=False,
    )


if __name__ == "__main__":
    main()
