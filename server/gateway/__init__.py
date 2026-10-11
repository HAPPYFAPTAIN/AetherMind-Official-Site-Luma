"""OpenAI-compatible, entitlement-gated LLM gateway."""

from .app import Gateway, create_app

__all__ = ["Gateway", "create_app"]
