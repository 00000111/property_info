from abc import ABC, abstractmethod
from typing import Any

import requests
from fastapi import HTTPException, status


class PropertyDetailsProvider(ABC):
    name: str = ""
    base_url: str = ""
    api_key: str = ""

    def __init__(self, base_url: str | None = None, api_key: str | None = None):
        self.base_url = self.base_url if base_url is None else base_url
        self.api_key = self.api_key if api_key is None else api_key

    @property
    def _auth_header(self) -> dict[str, str]:
        return {"X-API-KEY": self.api_key}

    def headers(self, auth_required: bool = True, **kwargs: str) -> dict[str, str]:
        headers = kwargs.copy()
        if auth_required:
            headers.update(self._auth_header)
        return headers

    def _call(self, method: str, **kwargs: str):
        return requests.request(
            method=method, url=self.base_url, params=kwargs, headers=self.headers()
        )

    @abstractmethod
    def normalize(self, response: dict[str, Any]) -> dict[str, Any]:
        raise NotImplementedError

    def get_details(self, address: str) -> dict[str, Any]:
        resp = self._call("GET", address=address)
        if resp.status_code == status.HTTP_200_OK:
            normalized_data = {"provider_name": self.name}
            normalized_data.update(self.normalize(resp.json()))
            return normalized_data
        raise HTTPException(status_code=resp.status_code, detail=resp.json())
