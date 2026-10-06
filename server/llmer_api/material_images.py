"""Bounded image decoding and ordered, overlapping views of one material.

DeepSeek rescales each image to about 1300x1300 pixels. Sending a tall image
whole destroys small text, even when its encoded byte size is small.
"""
import io
import logging
import math
import threading
import warnings
from contextlib import contextmanager

from PIL import Image, ImageOps, UnidentifiedImageError

from .errors import ApiError

MAX_SOURCE_PIXELS = 48_000_000
MAX_SOURCE_EDGE = 60_000
MAX_STORED_PIXELS = 24_000_000
MAX_SHORT_EDGE = 1440
MAX_VISION_PARTS = 16
VISION_EDGE = 4096
VISION_PIXELS = 1_600_000
OVERLAP = 96
_IMAGE_WORK = threading.BoundedSemaphore(1)
_LOG = logging.getLogger(__name__)


@contextmanager
def image_work():
    # Uploads run in a thread pool while extraction runs in the worker. Keep
    # their image allocations from overlapping within the 768 MiB service.
    if not _IMAGE_WORK.acquire(timeout=5):
        raise ApiError(503, 'IMAGE_PROCESSING_BUSY', '图片正在处理中，请稍后重试', retryable=True)
    try:
        yield
    finally:
        _IMAGE_WORK.release()


def jpeg_bytes(image):
    output = io.BytesIO()
    image.save(output, format='JPEG', quality=88, optimize=True, exif=b'', icc_profile=None)
    return output.getvalue()


def normalize_material_image(content):
    try:
        with image_work(), warnings.catch_warnings():
            warnings.simplefilter('error', Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(content)) as image:
                if image.format not in ('JPEG', 'PNG', 'WEBP'):
                    raise ApiError(415, 'UNSUPPORTED_MATERIAL_IMAGE', '请使用 JPG、PNG 或 WebP 图片')
                width, height = image.size
                if width * height > MAX_SOURCE_PIXELS or max(width, height) > MAX_SOURCE_EDGE:
                    _LOG.info('material_image_rejected reason=dimensions width=%s height=%s', width, height)
                    raise ApiError(413, 'MATERIAL_DIMENSIONS_EXCEEDED', '图片超过4800万像素或单边60000像素，请分段截图后重试')
                scale = min(1, MAX_SHORT_EDGE / min(width, height),
                            math.sqrt(MAX_STORED_PIXELS / (width * height)))
                # RGBA resizing creates full-size premultiplied copies inside
                # Pillow. Convert once and release its decoder first instead.
                # RGB JPEG can still use thumbnail's decoder draft optimization.
                normalized = image
                if image.mode != 'RGB':
                    normalized = image.convert('RGB')
                    image.close()
                try:
                    normalized.thumbnail((max(1, int(width * scale)), max(1, int(height * scale))))
                    normalized.load()
                    ImageOps.exif_transpose(normalized, in_place=True)
                    data = jpeg_bytes(normalized)
                finally:
                    if normalized is not image:
                        normalized.close()
                if len(data) > 16 * 1024 * 1024:
                    raise ApiError(413, 'MATERIAL_TOO_LARGE', '图片转换后仍过大，请适当压缩后重试')
                return data
    except (Image.DecompressionBombError, Image.DecompressionBombWarning) as error:
        raise ApiError(413, 'MATERIAL_DIMENSIONS_EXCEEDED', '图片分辨率过大，请分段截图后重试') from error
    except (UnidentifiedImageError, OSError, ValueError, SyntaxError) as error:
        _LOG.info('material_image_rejected reason=decode error_type=%s', type(error).__name__)
        raise ApiError(400, 'INVALID_MATERIAL_IMAGE', '图片内容无法读取，请重新选择原图或另存为 JPG、PNG 后重试') from error


def vision_parts(content):
    """Return at most 16 views, all covering one source without gaps.

    Coordinates refer to the normalized material, not separate uploads. Views
    overlap so a message straddling a boundary remains readable.
    """
    with image_work(), Image.open(io.BytesIO(content)) as image:
        width, height = image.size
        if width * height > MAX_STORED_PIXELS or max(width, height) > MAX_SOURCE_EDGE:
            raise ValueError('MATERIAL_IMAGE_BOUNDS')
        vertical = height >= width
        short, long = sorted((width, height))
        if long <= VISION_EDGE and long <= short * 2:
            return [{'box': [0, 0, width, height], 'content': content}], image.size
        span = min(VISION_EDGE, max(512, VISION_PIXELS // short,
            math.ceil((long + OVERLAP * (MAX_VISION_PARTS - 1)) / MAX_VISION_PARTS)))
        image.load()
        parts = []
        start = 0
        while start < long:
            end = min(start + span, long)
            box = [0, start, width, end] if vertical else [start, 0, end, height]
            with image.crop(box) as crop:
                parts.append({'box': box, 'content': jpeg_bytes(crop)})
            if end == long:
                break
            start = end - OVERLAP
        if len(parts) > MAX_VISION_PARTS or sum(len(p['content']) for p in parts) > 24 * 1024 * 1024:
            raise ValueError('MATERIAL_IMAGE_BOUNDS')
        return parts, image.size
