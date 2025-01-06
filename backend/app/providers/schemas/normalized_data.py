from pydantic import BaseModel, Field, AliasPath, AliasChoices, computed_field

SQ_FT_PER_ACRE = 43560

class NormalizedData(BaseModel):
    normalized_address: str = Field(validation_alias=AliasChoices("formattedAddress", "NormalizedAddress"))
    square_footage: int = Field(validation_alias=AliasChoices("squareFootage", "SquareFootage"))
    year_built: int = Field(validation_alias=AliasChoices("yearBuilt", "YearConstructed"))
    bedrooms: int = Field(validation_alias=AliasChoices("bedrooms", "Bedrooms"))
    bathrooms: int = Field(validation_alias=AliasChoices("bathrooms", "Bathrooms"))
    room_count: int | None = Field(validation_alias=AliasChoices(AliasPath("features", "roomCount"), "RoomCount"), default=None)
    septic_system: bool = Field(validation_alias=AliasChoices(AliasPath("features", "septicSystem"), "SepticSystem"), default=False)
    sale_price: float = Field(validation_alias=AliasChoices("lastSalePrice", "SalePrice"))
    property_type: str = Field(validation_alias=AliasChoices("propertyType", "PropertyType"))


class Provider1NormalizedData(NormalizedData):
    lot_size_sq_ft: float = Field(alias="lotSizeSqFt", exclude=True) # TODO: convert from sqare ft to acres

    @computed_field
    @property
    def lot_size_in_acres(self) -> float:
        return round(self.lot_size_sq_ft / SQ_FT_PER_ACRE, 2)


class Provider2NormalizedData(NormalizedData):
    lot_size_in_acres: float = Field(alias="LotSizeAcres")