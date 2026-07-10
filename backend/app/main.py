from fastapi import FastAPI

from app.api.router import router as api_router
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for ChatOrbit AI",
    version=settings.APP_VERSION,
)


@app.get("/", tags=["System"])
async def root():
    """Root endpoint."""
    return {
        "message": settings.APP_NAME,
        "status": "running",
    }


app.include_router(api_router)