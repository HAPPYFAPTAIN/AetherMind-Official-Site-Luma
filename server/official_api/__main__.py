import uvicorn
from official_api.config import Settings

settings = Settings.from_env()
uvicorn.run("official_api.app:create_app", factory=True, host=settings.host, port=settings.port,
            access_log=False, server_header=False, date_header=False)
