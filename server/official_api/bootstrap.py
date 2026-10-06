"""Operator-only owner assignment. Requires an existing SMS-verified account."""
import argparse
from llmer_api.config import Settings
from llmer_api.database import Database
from llmer_api.auth_service import AuthService
from .workspace import Workspace


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--phone', required=True)
    args = parser.parse_args()
    settings = Settings.from_env()
    db = Database(settings.database_path)
    # No SMS request, session creation, or phone persistence is performed here.
    workspace = Workspace(db, AuthService(db, None, settings))
    workspace.initialize()
    uid = workspace.bootstrap_owner(args.phone)
    print('Owner assignment verified for user', uid)


if __name__ == '__main__':
    main()
