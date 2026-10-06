from __future__ import annotations

import hashlib
import json
import re
import time
from typing import Any, Callable, Dict, Iterable, Optional

from .crypto import random_id
from .database import Database
from .errors import ApiError


PLAN_CONTRACTS = {
    "standard": {
        "amountFen": 990,
        "imageLimit": 3,
        "promptTemplateVersion": "standard-report-2.5.0",
    },
    "deep": {
        "amountFen": 1390,
        "imageLimit": 9,
        "promptTemplateVersion": "deep-report-2.5.0",
    },
}

IDEMPOTENCY_RE = re.compile(r"^[A-Za-z0-9:_-]{8,128}$")
CONTEXT_RE = re.compile(r"^[A-Za-z0-9_-]{3,96}$")
HEX_256_RE = re.compile(r"^[a-f0-9]{64}$")
MATERIAL_MEDIA_TYPES = {"image/jpeg", "image/png", "image/webp"}
CONSENT_SCOPES = {"analysis_once", "account_reuse"}
PAYMENT_STATUSES = {"CREATING", "PENDING", "PAID", "CLOSED", "FAILED"}
ANALYSIS_STATUSES = {"QUEUED", "RUNNING", "SUCCEEDED", "FAILED"}


class UnavailablePaymentProvider:
    available = False


class UnavailableMaterialStorage:
    available = False


class UnavailableAnalysisProvider:
    available = False


class UnavailableShareCodeProvider:
    available = False


class CommerceService:
    def __init__(
        self,
        database: Database,
        *,
        payment_provider: Optional[Any] = None,
        material_storage: Optional[Any] = None,
        analysis_provider: Optional[Any] = None,
        share_code_provider: Optional[Any] = None,
        now: Callable[[], int] = lambda: int(time.time() * 1000),
    ) -> None:
        self.database = database
        self.payment_provider = payment_provider or UnavailablePaymentProvider()
        self.material_storage = material_storage or UnavailableMaterialStorage()
        self.analysis_provider = analysis_provider or UnavailableAnalysisProvider()
        self.share_code_provider = share_code_provider or UnavailableShareCodeProvider()
        self.now = now

    def create_payment_order(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        plan_id = require_plan(payload.get("planId"))
        context_id = require_context(payload.get("upgradeContextId"))
        idempotency_key = require_idempotency(payload.get("idempotencyKey"))
        contract = PLAN_CONTRACTS[plan_id]
        fingerprint = request_fingerprint({
            "planId": plan_id,
            "upgradeContextId": context_id,
            "amountFen": contract["amountFen"],
        })
        existing = self.database.get_payment_order_by_idempotency(user_id, idempotency_key)
        if existing:
            require_same_request(existing, fingerprint)
            if existing["status"] not in {"CREATING", "FAILED"}:
                return public_order(existing)
            order = existing
        else:
            self._require_provider(
                self.payment_provider,
                "PAYMENT_NOT_CONFIGURED",
                "支付服务尚未配置，未创建订单",
            )
            order = self.database.create_payment_order(
                order_id=random_id(),
                user_id=user_id,
                idempotency_key=idempotency_key,
                request_fingerprint=fingerprint,
                plan_id=plan_id,
                amount_fen=contract["amountFen"],
                upgrade_context_id=context_id,
                now_ms=self.now(),
            )
        provider = self._require_provider(
            self.payment_provider,
            "PAYMENT_NOT_CONFIGURED",
            "支付服务尚未配置，订单未完成创建",
        )
        try:
            provider_result = provider.create_order({
                "merchantOrderId": order["id"],
                "userId": user_id,
                "planId": plan_id,
                "amountFen": contract["amountFen"],
                "description": "参数人类表达分析",
            })
            provider_order_id = str(provider_result.get("providerOrderId") or "").strip()
            payment_params = provider_result.get("paymentParams")
            if not provider_order_id or not isinstance(payment_params, dict) or not payment_params:
                raise ValueError("payment provider returned an incomplete order")
            order = self.database.mark_payment_order_pending(
                order["id"], provider_order_id, payment_params, self.now()
            )
            return public_order(order)
        except ApiError:
            raise
        except Exception as error:
            self.database.mark_payment_order_failed(order["id"], "PAYMENT_PROVIDER_UNAVAILABLE", self.now())
            raise ApiError(
                503,
                "PAYMENT_PROVIDER_UNAVAILABLE",
                "支付服务暂时不可用，订单未完成创建",
                retryable=True,
                retry_after_seconds=30,
            ) from error

    def get_payment_order(self, user_id: str, order_id: str) -> Dict[str, Any]:
        return public_order(self.database.require_payment_order(user_id, order_id))

    def verify_payment_order(self, user_id: str, order_id: str) -> Dict[str, Any]:
        provider = self._require_provider(
            self.payment_provider,
            "PAYMENT_NOT_CONFIGURED",
            "支付服务尚未配置，无法核验订单",
        )
        order = self.database.require_payment_order(user_id, order_id)
        if order["status"] == "PAID":
            return public_order(order)
        if not order.get("provider_order_id"):
            raise ApiError(409, "PAYMENT_ORDER_NOT_READY", "订单尚未完成创建", retryable=True)
        try:
            provider_result = provider.query_order({
                "merchantOrderId": order["id"],
                "providerOrderId": order["provider_order_id"],
            })
        except Exception as error:
            raise ApiError(
                503,
                "PAYMENT_VERIFICATION_UNAVAILABLE",
                "暂时无法向支付渠道核验订单",
                retryable=True,
                retry_after_seconds=15,
            ) from error
        status = str(provider_result.get("status") or "").upper()
        if status not in {"PENDING", "PAID", "CLOSED", "FAILED"}:
            raise ApiError(502, "INVALID_PAYMENT_PROVIDER_RESPONSE", "支付渠道返回了无法识别的订单状态")
        order = self.database.update_payment_order_status(
            order["id"], status, self.now(), provider_result.get("paidAtEpochMs")
        )
        return public_order(order)

    def prepare_material(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        storage = self._require_provider(
            self.material_storage,
            "MATERIAL_STORAGE_NOT_CONFIGURED",
            "材料存储尚未配置，未创建上传任务",
        )
        context_id = require_context(payload.get("upgradeContextId"))
        file_name = bounded_text(payload.get("fileName"), "文件名", 1, 160)
        media_type = str(payload.get("mediaType") or "").lower()
        if media_type not in MATERIAL_MEDIA_TYPES:
            raise ApiError(400, "INVALID_MATERIAL_TYPE", "仅支持 JPEG、PNG 或 WebP 图片")
        size_bytes = bounded_int(payload.get("sizeBytes"), "材料大小", 1, 10 * 1024 * 1024)
        sha256 = str(payload.get("sha256") or "").lower()
        if not HEX_256_RE.fullmatch(sha256):
            raise ApiError(400, "INVALID_MATERIAL_HASH", "材料摘要格式不正确")
        consent_scope = str(payload.get("consentScope") or "")
        if consent_scope not in CONSENT_SCOPES:
            raise ApiError(400, "INVALID_CONSENT_SCOPE", "请选择明确的材料使用范围")
        scene_label = bounded_text(payload.get("sceneLabel"), "场景标签", 0, 48, allow_empty=True)
        material_id = random_id()
        try:
            prepared = storage.prepare_upload({
                "materialId": material_id,
                "userId": user_id,
                "fileName": file_name,
                "mediaType": media_type,
                "sizeBytes": size_bytes,
                "sha256": sha256,
            })
        except Exception as error:
            raise ApiError(503, "MATERIAL_STORAGE_UNAVAILABLE", "材料存储暂时不可用", retryable=True) from error
        object_key = str(prepared.get("objectKey") or "").strip()
        upload = prepared.get("upload")
        if not object_key or not isinstance(upload, dict) or not upload:
            raise ApiError(502, "INVALID_STORAGE_RESPONSE", "材料存储返回内容不完整")
        material = self.database.create_material(
            material_id=material_id,
            user_id=user_id,
            upgrade_context_id=context_id,
            object_key=object_key,
            file_name=file_name,
            media_type=media_type,
            size_bytes=size_bytes,
            sha256=sha256,
            consent_scope=consent_scope,
            scene_label=scene_label,
            now_ms=self.now(),
        )
        return {**public_material(material), "upload": upload}

    def confirm_material(self, user_id: str, material_id: str) -> Dict[str, Any]:
        storage = self._require_provider(
            self.material_storage,
            "MATERIAL_STORAGE_NOT_CONFIGURED",
            "材料存储尚未配置，无法核验上传",
        )
        material = self.database.require_material(user_id, material_id)
        try:
            verified = storage.verify_upload({
                "objectKey": material["object_key"],
                "sizeBytes": material["size_bytes"],
                "sha256": material["sha256"],
            })
        except Exception as error:
            raise ApiError(503, "MATERIAL_STORAGE_UNAVAILABLE", "暂时无法核验材料上传", retryable=True) from error
        if verified is not True:
            raise ApiError(409, "MATERIAL_UPLOAD_NOT_VERIFIED", "材料尚未完成上传或摘要不一致")
        return public_material(self.database.mark_material_ready(material_id, self.now()))

    def list_materials(self, user_id: str, context_id: str) -> list[Dict[str, Any]]:
        return [public_material(item) for item in self.database.list_materials(user_id, require_context(context_id))]

    def delete_material(self, user_id: str, material_id: str) -> None:
        storage = self._require_provider(
            self.material_storage,
            "MATERIAL_STORAGE_NOT_CONFIGURED",
            "材料存储尚未配置，无法确认远端删除",
        )
        material = self.database.require_material(user_id, material_id)
        try:
            storage.delete_object(material["object_key"])
        except Exception as error:
            raise ApiError(503, "MATERIAL_DELETE_UNAVAILABLE", "暂时无法删除远端材料", retryable=True) from error
        self.database.delete_material(user_id, material_id)

    def create_analysis_job(self, user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        order_id = bounded_identifier(payload.get("orderId"), "订单编号")
        order = self.database.require_payment_order(user_id, order_id)
        if order["status"] != "PAID":
            raise ApiError(409, "PAYMENT_NOT_VERIFIED", "订单尚未由服务端核验为已支付")
        plan_id = require_plan(payload.get("planId"))
        context_id = require_context(payload.get("upgradeContextId"))
        if plan_id != order["plan_id"] or context_id != order["upgrade_context_id"]:
            raise ApiError(409, "ANALYSIS_ORDER_MISMATCH", "分析任务与已支付订单不匹配")
        prompt_version = str(payload.get("promptTemplateVersion") or "")
        contract = PLAN_CONTRACTS[plan_id]
        if prompt_version != contract["promptTemplateVersion"]:
            raise ApiError(409, "PROMPT_TEMPLATE_MISMATCH", "报告提示词版本与套餐不匹配")
        material_ids = unique_identifiers(payload.get("materialIds"), "材料编号")
        if not material_ids or len(material_ids) > contract["imageLimit"]:
            raise ApiError(400, "INVALID_MATERIAL_COUNT", "材料数量不符合套餐限制")
        idempotency_key = require_idempotency(payload.get("idempotencyKey"))
        fingerprint = request_fingerprint({
            "orderId": order_id,
            "planId": plan_id,
            "upgradeContextId": context_id,
            "promptTemplateVersion": prompt_version,
            "materialIds": sorted(material_ids),
        })
        existing = self.database.get_analysis_job_by_idempotency(user_id, idempotency_key)
        if existing:
            require_same_request(existing, fingerprint)
            if existing["status"] != "CREATING":
                return public_job(existing)
            job = existing
        else:
            self._require_provider(
                self.analysis_provider,
                "AI_ANALYSIS_NOT_CONFIGURED",
                "分析模型尚未配置，未创建分析任务",
            )
            materials = self.database.require_ready_materials(user_id, context_id, material_ids)
            job_id = random_id()
            job = self.database.create_analysis_job_placeholder(
                job_id=job_id,
                user_id=user_id,
                order_id=order_id,
                upgrade_context_id=context_id,
                plan_id=plan_id,
                prompt_template_version=prompt_version,
                idempotency_key=idempotency_key,
                request_fingerprint=fingerprint,
                material_ids=material_ids,
                now_ms=self.now(),
            )
            require_same_request(job, fingerprint)
        provider = self._require_provider(
            self.analysis_provider,
            "AI_ANALYSIS_NOT_CONFIGURED",
            "分析模型尚未配置，分析任务未完成创建",
        )
        materials = self.database.require_ready_materials(user_id, context_id, material_ids)
        try:
            provider_result = provider.create_job({
                "jobId": job["id"],
                "idempotencyKey": idempotency_key,
                "userId": user_id,
                "planId": plan_id,
                "promptTemplateVersion": prompt_version,
                "materials": [provider_material(item) for item in materials],
            })
        except Exception as error:
            self.database.mark_analysis_job_failed(
                user_id, job["id"], "AI_ANALYSIS_UNAVAILABLE", self.now()
            )
            raise ApiError(503, "AI_ANALYSIS_UNAVAILABLE", "分析服务暂时不可用，未创建任务", retryable=True) from error
        provider_job_id = str(provider_result.get("providerJobId") or "").strip()
        if not provider_job_id:
            raise ApiError(502, "INVALID_ANALYSIS_PROVIDER_RESPONSE", "分析服务返回内容不完整")
        job = self.database.mark_analysis_job_queued(
            user_id, job["id"], provider_job_id, self.now()
        )
        return public_job(job)

    def get_analysis_job(self, user_id: str, job_id: str, refresh: bool = True) -> Dict[str, Any]:
        job = self.database.require_analysis_job(user_id, job_id)
        if not refresh or job["status"] in {"SUCCEEDED", "FAILED"}:
            return public_job(job)
        provider = self._require_provider(
            self.analysis_provider,
            "AI_ANALYSIS_NOT_CONFIGURED",
            "分析模型尚未配置，无法刷新任务",
        )
        try:
            result = provider.query_job(job["provider_job_id"])
        except Exception as error:
            raise ApiError(503, "AI_ANALYSIS_UNAVAILABLE", "暂时无法刷新分析任务", retryable=True) from error
        status = str(result.get("status") or "").upper()
        if status not in ANALYSIS_STATUSES:
            raise ApiError(502, "INVALID_ANALYSIS_PROVIDER_RESPONSE", "分析服务返回了无法识别的任务状态")
        if status == "SUCCEEDED":
            report = result.get("report")
            if not isinstance(report, dict) or not report:
                raise ApiError(502, "INVALID_ANALYSIS_REPORT", "分析服务未返回有效报告")
            report_id = random_id()
            job = self.database.complete_analysis_job(
                user_id=user_id,
                job_id=job_id,
                report_id=report_id,
                report_content=report,
                ai_content_label=str(result.get("aiContentLabel") or "AI_GENERATED"),
                now_ms=self.now(),
            )
        else:
            job = self.database.update_analysis_job_status(
                user_id, job_id, status, result.get("errorCode"), self.now()
            )
        return public_job(job)

    def get_report(self, user_id: str, report_id: str) -> Dict[str, Any]:
        report = self.database.require_report(user_id, report_id)
        return {
            "id": report["id"],
            "jobId": report["job_id"],
            "upgradeContextId": report["upgrade_context_id"],
            "planId": report["plan_id"],
            "promptTemplateVersion": report["prompt_template_version"],
            "aiContentLabel": report["ai_content_label"],
            "content": json.loads(report["content_json"]),
            "createdAtEpochMs": report["created_at_ms"],
        }

    def delete_account(self, user_id: str) -> Optional[str]:
        resources = self.database.account_resources(user_id)
        object_keys = resources["object_keys"]
        if object_keys:
            storage = self._require_provider(
                self.material_storage,
                "DATA_DELETION_DEPENDENCY_UNAVAILABLE",
                "远端材料存储不可用，账号尚未删除，请稍后重试",
            )
            try:
                for object_key in object_keys:
                    storage.delete_object(object_key)
            except Exception as error:
                raise ApiError(
                    503,
                    "DATA_DELETION_DEPENDENCY_UNAVAILABLE",
                    "远端材料暂时无法删除，账号尚未删除",
                    retryable=True,
                ) from error
        self.database.delete_account(user_id)
        return resources.get("avatar_filename")

    def create_share_code(self, scene_input: Any) -> Dict[str, Any]:
        provider = self._require_provider(
            self.share_code_provider,
            "SHARE_CODE_NOT_CONFIGURED",
            "小游戏码服务尚未配置",
        )
        scene = str(scene_input or "share-card").strip()
        if not re.fullmatch(r"[A-Za-z0-9_-]{1,32}", scene):
            raise ApiError(400, "INVALID_SHARE_CODE_SCENE", "小游戏码场景参数格式不正确")
        try:
            result = provider.create_code(scene)
        except Exception as error:
            raise ApiError(503, "SHARE_CODE_UNAVAILABLE", "小游戏码服务暂时不可用", retryable=True) from error
        download_url = str(result.get("downloadUrl") or "").strip()
        expires_at = result.get("expiresAt")
        if not re.fullmatch(r"https://[^\s]+", download_url) or not isinstance(expires_at, int) or expires_at <= self.now():
            raise ApiError(502, "INVALID_SHARE_CODE_RESPONSE", "小游戏码服务返回内容无效")
        return {"downloadUrl": download_url, "expiresAt": expires_at}

    @staticmethod
    def _require_provider(provider: Any, code: str, message: str) -> Any:
        if provider is None or getattr(provider, "available", False) is not True:
            raise ApiError(503, code, message, retryable=False)
        return provider


def request_fingerprint(value: Dict[str, Any]) -> str:
    encoded = json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


def require_same_request(existing: Dict[str, Any], fingerprint: str) -> None:
    if existing["request_fingerprint"] != fingerprint:
        raise ApiError(409, "IDEMPOTENCY_KEY_REUSED", "幂等键已用于另一份请求")


def require_plan(value: Any) -> str:
    plan_id = str(value or "")
    if plan_id not in PLAN_CONTRACTS:
        raise ApiError(400, "INVALID_PLAN", "分析套餐不存在")
    return plan_id


def require_context(value: Any) -> str:
    context_id = str(value or "")
    if not CONTEXT_RE.fullmatch(context_id):
        raise ApiError(400, "INVALID_UPGRADE_CONTEXT", "升级上下文编号格式不正确")
    return context_id


def require_idempotency(value: Any) -> str:
    key = str(value or "")
    if not IDEMPOTENCY_RE.fullmatch(key):
        raise ApiError(400, "INVALID_IDEMPOTENCY_KEY", "幂等键格式不正确")
    return key


def bounded_identifier(value: Any, label: str) -> str:
    identifier = str(value or "")
    if not CONTEXT_RE.fullmatch(identifier):
        raise ApiError(400, "INVALID_IDENTIFIER", f"{label}格式不正确")
    return identifier


def unique_identifiers(value: Any, label: str) -> list[str]:
    if not isinstance(value, list):
        raise ApiError(400, "INVALID_IDENTIFIER_LIST", f"{label}格式不正确")
    result = [bounded_identifier(item, label) for item in value]
    if len(result) != len(set(result)):
        raise ApiError(400, "DUPLICATE_IDENTIFIER", f"{label}不能重复")
    return result


def bounded_text(value: Any, label: str, minimum: int, maximum: int, allow_empty: bool = False) -> Optional[str]:
    text = str(value or "").strip()
    if not text and allow_empty:
        return None
    if len(text) < minimum or len(text) > maximum or any(ord(char) < 32 for char in text):
        raise ApiError(400, "INVALID_FIELD", f"{label}格式不正确")
    return text


def bounded_int(value: Any, label: str, minimum: int, maximum: int) -> int:
    if isinstance(value, bool):
        raise ApiError(400, "INVALID_FIELD", f"{label}格式不正确")
    try:
        result = int(value)
    except (TypeError, ValueError) as error:
        raise ApiError(400, "INVALID_FIELD", f"{label}格式不正确") from error
    if result < minimum or result > maximum:
        raise ApiError(400, "INVALID_FIELD", f"{label}超出允许范围")
    return result


def public_order(order: Dict[str, Any]) -> Dict[str, Any]:
    payment_params = json.loads(order["payment_params_json"]) if order.get("payment_params_json") else None
    return {
        "id": order["id"],
        "planId": order["plan_id"],
        "amountFen": order["amount_fen"],
        "upgradeContextId": order["upgrade_context_id"],
        "status": order["status"],
        "paymentParams": payment_params,
        "paidAtEpochMs": order.get("paid_at_ms"),
        "createdAtEpochMs": order["created_at_ms"],
        "updatedAtEpochMs": order["updated_at_ms"],
    }


def public_material(material: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "id": material["id"],
        "upgradeContextId": material["upgrade_context_id"],
        "fileName": material["original_file_name"],
        "mediaType": material["media_type"],
        "sizeBytes": material["size_bytes"],
        "sha256": material["sha256"],
        "consentScope": material["consent_scope"],
        "sceneLabel": material.get("scene_label"),
        "status": material["status"],
        "createdAtEpochMs": material["created_at_ms"],
        "updatedAtEpochMs": material["updated_at_ms"],
    }


def provider_material(material: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "id": material["id"],
        "objectKey": material["object_key"],
        "mediaType": material["media_type"],
        "sha256": material["sha256"],
        "consentScope": material["consent_scope"],
        "sceneLabel": material.get("scene_label"),
    }


def public_job(job: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "id": job["id"],
        "orderId": job["order_id"],
        "upgradeContextId": job["upgrade_context_id"],
        "planId": job["plan_id"],
        "promptTemplateVersion": job["prompt_template_version"],
        "status": job["status"],
        "errorCode": job.get("error_code"),
        "reportId": job.get("report_id"),
        "createdAtEpochMs": job["created_at_ms"],
        "updatedAtEpochMs": job["updated_at_ms"],
    }
