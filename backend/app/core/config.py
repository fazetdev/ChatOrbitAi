from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration."""

    APP_NAME: str = "ChatOrbit AI Backend"
    APP_VERSION: str = "0.1.0"
    API_PREFIX: str = "/api/v1"

    DEBUG: bool = False

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    LOG_LEVEL: str = "INFO"

    DATABASE_URL: str = (
        "postgresql+psycopg://postgres:postgres@localhost:5432/chatorbit_ai"
    )
    DB_ECHO: bool = False

    WHATSAPP_VERIFY_TOKEN: str = "chatorbit-development-token"
    WHATSAPP_API_VERSION: str = "v23.0"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    """Return a cached settings instance."""
    return Settings()


settings = get_settings()