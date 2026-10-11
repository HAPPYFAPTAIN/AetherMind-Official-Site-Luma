from __future__ import annotations

import os
from contextlib import asynccontextmanager
from typing import Any, Callable, Dict, Optional

from fastapi import FastAPI, Request

from . import __version__
from .auth.passwords import mount_passwords
from .auth.routes import mount_auth_routes
from .auth.service import AuthService
from .auth.sms import AliyunSmsProvider, SmsProviderError
from .adapters.hpc import mount_hpc
from .adapters.learn_everything import mount_learn_everything
from .adapters.md_agent import mount_md_agent
from .community.routes import mount_community_routes
from .config import Settings
from .db import Database
from .http import bearer_token, install_middleware, log_event
from .workspace import Workspace, mount_workspace


def create_app(
    settings: Optional[Settings] = None,
    sms_provider: Optional[Any] = None,
    now: Optional[Callable[[], int]] = None,
    **_: Any,
) -> FastAPI:
    effective_settings = settings or Settings.from_env()
    effective_settings.avatar_dir.mkdir(parents=True, exist_ok=True)
    database = Database(effective_settings.database_path)
    database.initialize()

    class DisabledSms:
        def send_code(self, phone):
            raise SmsProviderError('send', 'NOT_CONFIGURED')
        def verify_code(self, phone, code):
            raise SmsProviderError('verify', 'NOT_CONFIGURED')

    provider = sms_provider or (AliyunSmsProvider(effective_settings) if effective_settings.sms_role_name and effective_settings.sms_sign_name and effective_settings.sms_template_code else DisabledSms())
    service = (
        AuthService(database, provider, effective_settings, now=now)
        if now is not None
        else AuthService(database, provider, effective_settings)
    )

    @asynccontextmanager
    async def lifespan(_: FastAPI):
        if not database.integrity_check():
            raise RuntimeError("database integrity check failed")
        log_event("service_started", release=os.environ.get("LLMER_RELEASE_ID", "local"))
        yield

    app = FastAPI(
        title="Official API",
        version=__version__,
        docs_url=None,
        redoc_url=None,
        openapi_url=None,
        lifespan=lifespan,
    )
    app.state.settings = effective_settings
    app.state.database = database
    app.state.auth_service = service

    install_middleware(app)

    def current_user(request: Request) -> str:
        return service.authenticate(bearer_token(request))

    workspace = Workspace(database, service)
    workspace.initialize()
    app.state.workspace = workspace

    mount_auth_routes(app, database, service, effective_settings, current_user)
    mount_community_routes(app, database, current_user)
    mount_workspace(app, workspace, current_user)
    mount_passwords(app, workspace, current_user)
    mount_md_agent(app, workspace, current_user)
    mount_learn_everything(app, workspace, current_user)
    mount_hpc(app, workspace, current_user)
    return app
