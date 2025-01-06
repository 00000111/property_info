from typing import TYPE_CHECKING, Type
from .provider_one import Provider1
from .provider_two import Provider2

if TYPE_CHECKING:
    from .base import PropertyDetailsProvider

AVAILABLE_PROVIDERS: tuple[Type["PropertyDetailsProvider"], ...] = (Provider1, Provider2)
