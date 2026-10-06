import uvicorn

from .config import Settings


def main() -> None:
    settings = Settings.from_env()
    uvicorn.run(
        "llmer_api.main:create_app",
        factory=True,
        host=settings.host,
        port=settings.port,
        access_log=False,
        server_header=False,
        date_header=False,
    )


if __name__ == "__main__":
    main()
