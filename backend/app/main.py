from fastapi import FastAPI


app = FastAPI(
    title="WhatsApp AI SaaS Backend",
    description="Backend API for the WhatsApp AI Automation platform",
    version="0.1.0",
)


@app.get("/")
async def root():
    return {
        "message": "WhatsApp AI SaaS Backend",
        "status": "running",
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
    }
