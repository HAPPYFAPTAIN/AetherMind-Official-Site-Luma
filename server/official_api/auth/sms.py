from __future__ import annotations

import json
import re

from ..config import Settings


class SmsProviderError(Exception):
    def __init__(self, operation: str, provider_code: str) -> None:
        super().__init__(f"SMS provider {operation} failed")
        self.operation = operation
        self.provider_code = provider_code


class AliyunSmsProvider:
    def __init__(self, settings: Settings) -> None:
        # Optional SMS SDKs must not prevent WeChat login or injected-provider tests.
        from alibabacloud_credentials.client import Client as CredentialClient
        from alibabacloud_credentials.models import Config as CredentialConfig
        from alibabacloud_dypnsapi20170525.client import Client as DypnsClient
        from alibabacloud_dypnsapi20170525 import models as dypns_models
        from alibabacloud_tea_openapi import models as open_api_models
        self.models = dypns_models
        credential = CredentialClient(
            CredentialConfig(
                type="ecs_ram_role",
                role_name=settings.sms_role_name,
                disable_imds_v1=True,
                timeout=1500,
                connect_timeout=1500,
            )
        )
        config = open_api_models.Config(
            credential=credential,
            region_id=settings.sms_region_id,
            endpoint=settings.sms_endpoint,
            protocol="https",
            connect_timeout=5000,
            read_timeout=10000,
        )
        self.client = DypnsClient(config)
        self.settings = settings

    def send_code(self, phone: str) -> None:
        request = self.models.SendSmsVerifyCodeRequest(
            phone_number=phone,
            country_code="86",
            sign_name=self.settings.sms_sign_name,
            template_code=self.settings.sms_template_code,
            template_param=json.dumps(
                {"code": "##code##", "min": str(self.settings.sms_valid_seconds // 60)},
                separators=(",", ":"),
            ),
            code_length=6,
            valid_time=self.settings.sms_valid_seconds,
            duplicate_policy=1,
            interval=self.settings.sms_interval_seconds,
            code_type=1,
            return_verify_code=False,
            auto_retry=1,
            scheme_name=self.settings.sms_scheme_name,
        )
        try:
            response = self.client.send_sms_verify_code(request)
        except Exception as error:
            raise SmsProviderError("send", safe_provider_code(error)) from error
        body = response.body
        if body is None or body.success is not True or body.code != "OK":
            raise SmsProviderError("send", safe_provider_code(body))

    def verify_code(self, phone: str, code: str) -> bool:
        request = self.models.CheckSmsVerifyCodeRequest(
            phone_number=phone,
            country_code="86",
            verify_code=code,
            case_auth_policy=2,
            scheme_name=self.settings.sms_scheme_name,
        )
        try:
            response = self.client.check_sms_verify_code(request)
        except Exception as error:
            provider_code = safe_provider_code(error)
            if provider_code == "isv.ValidateFail":
                return False
            raise SmsProviderError("verify", provider_code) from error
        body = response.body
        if body is None or body.code == "isv.ValidateFail":
            return False
        if body.success is not True or body.code != "OK":
            raise SmsProviderError("verify", safe_provider_code(body))
        return bool(body.model and body.model.verify_result == "PASS")


def safe_provider_code(value: object) -> str:
    candidates = [
        getattr(value, "code", None),
        getattr(value, "Code", None),
        getattr(getattr(value, "data", None), "code", None),
    ]
    if isinstance(value, dict):
        candidates.extend([value.get("code"), value.get("Code")])
    for candidate in candidates:
        if isinstance(candidate, str) and re.fullmatch(r"[A-Za-z0-9_.-]{1,80}", candidate):
            return candidate
    return "SDK_ERROR"
