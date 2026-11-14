
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.resumes import router as resume_router
from app.api.matching import router as matching_router

app = FastAPI(
    title="HireSense API",
    description="AI-powered recruitment and candidate assessment platform",
    version="1.0.0",
)

# Allow the React frontend to communicate with FastAPI.
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes.
app.include_router(resume_router)
app.include_router(matching_router)


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
