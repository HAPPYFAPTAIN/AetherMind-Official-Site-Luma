from __future__ import annotations

from typing import Any


DEFAULT_PROFILE_DISPLAY_NAME = "参数人类用户"
LEGACY_DEFAULT_PROFILE_DISPLAY_NAMES = frozenset({"LLMer 用户"})
ALL_DEFAULT_PROFILE_DISPLAY_NAMES = frozenset(
    {DEFAULT_PROFILE_DISPLAY_NAME, *LEGACY_DEFAULT_PROFILE_DISPLAY_NAMES}
)


def is_default_profile_display_name(value: Any) -> bool:
    return value in ALL_DEFAULT_PROFILE_DISPLAY_NAMES


def public_profile_display_name(value: Any) -> Any:
    if value in LEGACY_DEFAULT_PROFILE_DISPLAY_NAMES:
        return DEFAULT_PROFILE_DISPLAY_NAME
    return value
