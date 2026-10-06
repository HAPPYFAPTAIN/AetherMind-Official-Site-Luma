"""New release closes legacy issuance and checkout, retaining history delivery."""
import os
from .errors import ApiError

def v4_only():
    return os.getenv('LLMER_ASSESSMENT_V4_ONLY','true')=='true'

def require_legacy_creation():
    if v4_only():
        raise ApiError(410,'ASSESSMENT_VERSION_RETIRED','旧版题组与付费入口已关闭，请更新小游戏；已有记录仍可查看。')
