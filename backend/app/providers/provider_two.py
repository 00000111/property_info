from typing import Any

from app.config import settings

from .base import PropertyDetailsProvider
from .schemas.normalized_data import Provider2NormalizedData


class Provider2(PropertyDetailsProvider):
    name = "Provider 2"
    base_url = settings.PROVIDER2_BASE_URL
    api_key = settings.PROVIDER2_API_KEY

    def normalize(self, response: dict[str, Any]):
        return Provider2NormalizedData.model_validate(
            response.get("data", {})
        ).model_dump()
