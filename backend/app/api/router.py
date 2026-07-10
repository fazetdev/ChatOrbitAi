from fastapi import APIRouter

from app.core.config import settings
from app.modules.whatsapp.router import router as whatsapp_router

router = APIRouter(
    prefix=settings.API_PREFIX,
)


@router.get("/health", tags=["System"])
async def health():
    """Application health check."""
    return {
        "status": "healthy",
    }


router.include_router(whatsapp_router)