from __future__ import annotations

import pytest

from official_api.app import create_app
from official_api.billing.providers import ProviderEdit, provider_credentials, set_provider
from official_api.billing.rates import ModelEdit, effective_models, set_model, set_user_model_access
from official_api.config import Settings
from official_api.errors import ApiError
from gateway.app import Gateway


def build(tmp_path):
    settings = Settings.from_env({
        "LLMER_HASH_SECRET": "model-access-test-secret-" * 3,
        "LLMER_DATABASE_PATH": str(tmp_path / "auth.sqlite3"),
        "LLMER_AVATAR_DIR": str(tmp_path / "avatars"),
        "APP_ENV": "test",
    })
    app = create_app(settings=settings)
    workspace, auth = app.state.workspace, app.state.auth_service
    owner = auth._create_login(auth.hash("phone", "13900000001"), "0001", auth.now())["profile"]["userId"]
    user = auth._create_login(auth.hash("phone", "13900000002"), "0002", auth.now())["profile"]["userId"]
    workspace.bootstrap_owner("13900000001")
    with workspace.db.connect() as c:
        set_model(workspace, c, ModelEdit(model="kimi-k3", provider="kimi", upstreamModel="kimi-k3", enabled=True))
        set_model(workspace, c, ModelEdit(model="gpt-5", provider="openai", upstreamModel="gpt-5", enabled=False))
        set_provider(workspace, c, ProviderEdit(
            provider="openai", displayName="OpenAI", api="openai-completions",
            baseUrl="https://api.openai.com/v1", apiKey="sk-test-provider-key", enabled=True,
        ), owner)
    return app, workspace, owner, user


def test_user_model_grant_is_additive_and_gateway_enforces_it(tmp_path):
    _app, workspace, owner, user = build(tmp_path)
    with workspace.db.connect() as c:
        initial = {row["model"] for row in effective_models(c, user)}
        assert "gpt-5" not in initial
        assert {"kimi-k2.7-code-highspeed", "deepseek-v4-pro"} <= initial
        set_user_model_access(workspace, c, user, ["gpt-5"], owner)
        assert {row["model"] for row in effective_models(c, user)} == initial | {"gpt-5"}

    gateway = Gateway(workspace)
    with pytest.raises(ApiError) as error:
        gateway.route("gpt-5", "unknown-user")
    assert error.value.code == "MODEL_NOT_FOUND"
    route = gateway.route("gpt-5", user)
    assert (route.provider, route.base_url, route.api_key) == ("openai", "https://api.openai.com/v1", "sk-test-provider-key")


def test_provider_key_is_decrypted_only_inside_gateway(tmp_path):
    _app, workspace, owner, _user = build(tmp_path)
    with workspace.db.connect() as c:
        row = c.execute("SELECT api_key_ciphertext FROM official_llm_providers WHERE provider='openai'").fetchone()
        assert row["api_key_ciphertext"] and "sk-test-provider-key" not in row["api_key_ciphertext"]
        public = [item for item in __import__("official_api.billing.providers", fromlist=["list_providers"]).list_providers(c, workspace) if item["provider"] == "openai"][0]
        assert public["has_key"] is True
        assert "api_key" not in public
        assert provider_credentials(c, workspace, "openai")[1] == "sk-test-provider-key"
