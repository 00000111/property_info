from typing import Any

from app.providers.available import AVAILABLE_PROVIDERS
from fastapi import APIRouter, Query

from ..schemas.responses.property_details import MultiProviderPropertyDetalsResponse

router = APIRouter(prefix="/property")


@router.get("/details", response_model=MultiProviderPropertyDetalsResponse)
def get_property_details(address=Query(default=None)):
    data = [provider().get_details(address) for provider in AVAILABLE_PROVIDERS]

    return data
