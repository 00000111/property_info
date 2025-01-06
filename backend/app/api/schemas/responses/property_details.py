from pydantic import BaseModel, RootModel


class PropertyDetailsResponse(BaseModel):
    provider_name: str
    normalized_address: str
    square_footage: int
    year_built: int
    bedrooms: int
    bathrooms: int
    room_count: int
    septic_system: bool
    sale_price: float
    lot_size_in_acres: float
    property_type: str


MultiProviderPropertyDetalsResponse = RootModel[list[PropertyDetailsResponse]]
