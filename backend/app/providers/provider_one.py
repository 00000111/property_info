from typing import Any

from app.config import settings

from .base import PropertyDetailsProvider
from .schemas.normalized_data import Provider1NormalizedData


class Provider1(PropertyDetailsProvider):
    name = "Provider 1"
    base_url = settings.PROVIDER1_BASE_URL
    api_key = settings.PROVIDER1_API_KEY

    def normalize(self, response: dict[str, Any]):
        return Provider1NormalizedData.model_validate(
            response.get("data", {})
        ).model_dump()
