"""FastAPI application entry point"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import items

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="ScrolLearn API",
    description="Backend API for ScrolLearn - A card-based learning platform",
    version="1.0.0"
)

# Enable CORS for frontend and mobile access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(items.router)


@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Welcome to ScrolLearn API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
