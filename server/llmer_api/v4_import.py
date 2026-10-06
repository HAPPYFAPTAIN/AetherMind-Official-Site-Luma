"""Shared workbook normalization; source code strings are never executed."""
from __future__ import annotations
import json
from pathlib import Path
import openpyxl

def text(value):
    return str(value).strip() if value is not None else ""


def load_rows(path: Path, sheet: str):
    book = openpyxl.load_workbook(path, read_only=True, data_only=True)
    rows = list(book[sheet].values)
    book.close()
    header = [text(value) for value in rows[0]]
    return [dict(zip(header, row)) for row in rows[1:] if any(value is not None for value in row)]


def load_exam_rows(path: Path):
    book = openpyxl.load_workbook(path, read_only=True, data_only=True)
    rows = list(book["真题题库"].values)
    book.close()
    header_index = next(index for index, row in enumerate(rows) if text(row[0]) == "题目ID")
    header = [text(value) for value in rows[header_index]]
    return [dict(zip(header, row)) for row in rows[header_index + 1:] if any(value is not None for value in row)]


def metadata(row):
    raw = text(row.get("其他元数据(JSON)"))
    if not raw:
        return {}
    try:
        return json.loads(raw)
    except json.JSONDecodeError as error:
        raise ValueError(f"{row.get('题目ID')}: metadata JSON invalid") from error


def options(row, scored=False):
    raw = text(row.get("选项信息(JSON)"))
    parsed = []
    if raw:
        try:
            value = json.loads(raw)
            if isinstance(value, list):
                parsed = value
        except json.JSONDecodeError as error:
            raise ValueError(f"{row.get('题目ID')}: option JSON invalid") from error
    result = []
    labels = [row.get(f"选项{i}") for i in range(1, 6)]
    for index, label in enumerate(labels):
        label = text(label)
        if not label:
            continue
        item = parsed[index] if index < len(parsed) and isinstance(parsed[index], dict) else {}
        option_id = text(item.get("id")) or f"op_{index + 1}"
        option_style = item.get("style") if isinstance(item.get("style"), dict) else {}
        style = {key: option_style.get(key, 1) for key in ("novelty", "warmth", "directness")}
        correct = item.get("ok") == 1 or item.get("correct") is True
        result.append({
            "id": option_id,
            "label": label,
            "score": 1 if correct else 0,
            "correct": correct,
            "style": style,
            "rationale": text(item.get("r") or item.get("reason") or item.get("c")),
            "rawStyle": item.get("style") if isinstance(item.get("style"), dict) else {},
            "reply": text(item.get("reply")),
            "nextNode": text(item.get("go")),
            "thinking": text(item.get("think")),
            "tags": item.get("tr") if isinstance(item.get("tr"), list) else [],
            "end": item.get("end"),
        })
    return result


def normalize_humanbench(row):
    meta = metadata(row)
    qid = text(row.get("题目ID"))
    source_kind = text(row.get("来源分类"))
    scored = source_kind == "能力题" and meta.get("scored") is True
    item = {
        "id": qid,
        "sourceKind": source_kind,
        "subtype": text(row.get("子分类")),
        "prompt": text(row.get("题干/用户输入")),
        "scene": text(row.get("子分类")) or "综合题",
        "facet": meta.get("facet") or text(row.get("子分类")),
        "options": options(row, scored=scored),
        "explanation": text(row.get("题目说明")),
        "scored": scored,
        "responseKind": meta.get("responseKind") or ("single_choice" if scored else "style_or_dialogue"),
        "scoringType": meta.get("scoringType") or ("exact_choice" if scored else "none"),
        "primaryDimension": meta.get("primaryDimension"),
        "difficulty": meta.get("lv"),
        "difficultyStatus": meta.get("difficultyStatus"),
        "correctOptionIds": meta.get("correctOptionIds") or [],
        "familyId": meta.get("duplicateFamilyId") or meta.get("familyId") or f"item:{qid}",
        "duplicateFamilyId": meta.get("duplicateFamilyId") or f"item:{qid}",
        "exposureExclusionGroups": meta.get("exposureExclusionGroups") or [],
        "conceptTags": meta.get("conceptTags") or [],
        "governanceRole": meta.get("governanceRole"),
        "reviewStatus": meta.get("reviewStatus"),
        "deploymentEligible": meta.get("deploymentEligible") is True,
        "styleAxis": meta.get("styleAxis"),
        "rawMetadata": meta,
        "rawOptions": json.loads(text(row.get("选项信息(JSON)")) or '[]'),
        "assetType": text(row.get("素材类型")),
        "assetKey": text(row.get("素材键")),
        "assetSource": text(row.get("素材原始数据")),
    }
    if scored:
        correct = [option["id"] for option in item["options"] if option["correct"]]
        item["correctOptionIds"] = correct or item["correctOptionIds"]
        item["correctOptionId"] = item["correctOptionIds"][0] if item["correctOptionIds"] else None
        item["dimension"] = item["primaryDimension"]
        item["pool"] = "ability"
        item["mode"] = "both"
        item["scoringWeight"] = 1
    if item["responseKind"] == "style_or_dialogue":
        original = meta.get("originalMetadata") or {}
        item["dialogueScene"] = original.get("scene")
        item["dialogueNodes"] = original.get("nodes") or {}
    return item


def normalize_icebreaker(row):
    meta = metadata(row)
    parsed = options(row, scored=False)
    for option in parsed:
        raw = option.get("rawStyle") or {}
        option["vibe"] = ""
        option["style"] = {
            "novelty": raw.get("novelty", 1),
            "warmth": raw.get("warmth", 1),
            "directness": raw.get("directness", 1),
        }
        for candidate in (meta.get("original", {}).get("options", []) if isinstance(meta.get("original"), dict) else []):
            if candidate.get("id") == option["id"]:
                option["vibe"] = text(candidate.get("vibe"))
                break
    return {
        "id": text(row.get("题目ID")),
        "sourceKind": "破冰题",
        "subtype": "icebreaker",
        "type": "icebreaker",
        "prompt": text(row.get("题干/用户输入")),
        "scene": text(row.get("子分类")) or "随手一题",
        "category": meta.get("original", {}).get("category") or text(row.get("子分类")),
        "options": parsed,
        "scored": False,
        "responseKind": "icebreaker",
        "scoringType": "none",
        "familyId": f"item:{text(row.get('题目ID'))}",
        "rawMetadata": meta,
    }


def normalize_exam(row):
    labels = [text(row.get(key)) for key in ("A选项", "B选项", "C选项", "D选项")]
    answer = text(row.get("正确答案"))
    return {
        "id": text(row.get("题目ID")),
        "sourceKind": "真题",
        "category": text(row.get("分类")),
        "type": text(row.get("类型")),
        "prompt": text(row.get("题干")),
        "options": [{"id": letter, "label": label, "score": 0, "correct": letter == answer}
                    for letter, label in zip("ABCD", labels) if label],
        "correctOptionId": answer,
        "explanation": text(row.get("解析")),
        "source": text(row.get("来源")),
        "scored": False,
        "responseKind": "exam_practice",
        "scoringType": "none",
        "reviewStatus": text(row.get("机器质检")),
    }
