"""Database configuration and session management"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Use SQLite by default, but allow PostgreSQL for production
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./scrollearn.db")

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """Get database session dependency"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
