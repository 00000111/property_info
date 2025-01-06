from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

PROJECT_DIR = Path(__file__).parent.parent

class Settings(BaseSettings):
    PROVIDER1_BASE_URL: str
    PROVIDER2_BASE_URL: str

    PROVIDER1_API_KEY: str
    PROVIDER2_API_KEY: str

    model_config = SettingsConfigDict(
        env_file=f"{PROJECT_DIR}/.env", case_sensitive=True, extra="allow"
    )

settings = Settings()  # type: ignore
