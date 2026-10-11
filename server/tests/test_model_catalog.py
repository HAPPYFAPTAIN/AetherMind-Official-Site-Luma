import importlib.util
from pathlib import Path


def load_catalog():
    path = Path(__file__).parents[1] / "../deploy/wulanchabu/mdagent-model-catalog.py"
    spec = importlib.util.spec_from_file_location("mdagent_model_catalog", path.resolve())
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def test_project_model_catalog_has_only_target_provider_models():
    catalog = load_catalog().MODEL_CONFIG["llm-pi-ai"]["providers"]
    assert set(catalog) == {"kimi", "deepseek"}
    assert [m["id"] for m in catalog["kimi"]["models"]] == [
        "kimi-k3", "kimi-k2.7-code-highspeed", "kimi-k2.6"
    ]
    assert [m["id"] for m in catalog["deepseek"]["models"]] == [
        "deepseek-v4-pro", "deepseek-flash"
    ]
    assert "deepseek-v4-flash" not in str(catalog)
    assert load_catalog().MODEL_CONFIG["llm-deepseek"]["models"] == []


def test_project_model_catalog_requires_gateway_key_for_both_providers():
    providers = load_catalog().MODEL_CONFIG["llm-pi-ai"]["providers"]
    assert providers["kimi"]["apiKeyEnv"] == "MDEXP_PROXY_KEY"
    assert providers["deepseek"]["apiKeyEnv"] == "MDEXP_PROXY_KEY"


def test_provision_template_patch_adds_gateway_key_env_idempotently():
    catalog = load_catalog()
    source = (
        '    "kimi": """      displayName: "Kimi"\n'
        '    "deepseek": """      displayName: "DeepSeek"\n'
    )
    patched = catalog.ensure_proxy_key_env(source)
    assert patched.count("apiKeyEnv: MDEXP_PROXY_KEY") == 2
    assert catalog.ensure_proxy_key_env(patched) == patched
