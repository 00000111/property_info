from fastapi import APIRouter
from .endpoints.property_details import router as property_details_router

api_router = APIRouter(prefix="/api")
api_router.include_router(property_details_router, tags=["property"])


