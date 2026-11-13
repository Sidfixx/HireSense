
from fastapi import FastAPI

from app.api.resumes import router as resume_router

app = FastAPI(
    title="HireSense API",
    description="AI-powered recruitment and candidate assessment platform",
    version="1.0.0",
)

# Register resume routes
app.include_router(resume_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to HireSense API",
        "status": "running",
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "application": "HireSense",
    }
