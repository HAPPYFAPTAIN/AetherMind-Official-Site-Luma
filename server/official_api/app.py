from llmer_api.main import create_app as create_auth_app, bearer_token
from fastapi import Request
from .workspace import Workspace, mount_workspace
from .passwords import mount_passwords


def create_app(**kwargs):
    app = create_auth_app(**kwargs)
    workspace = Workspace(app.state.database, app.state.auth_service)
    workspace.initialize()
    app.state.workspace = workspace

    def current_user(request: Request):
        return app.state.auth_service.authenticate(bearer_token(request))

    mount_workspace(app, workspace, current_user)
    mount_passwords(app, workspace, current_user)
    return app
