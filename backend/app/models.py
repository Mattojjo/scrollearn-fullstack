"""Database models for ScrolLearn"""

from sqlalchemy import Column, Integer, String, DateTime, func
from app.database import Base


class Item(Base):
    """Item model - represents a card/learning item"""
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    description = Column(String(1000), nullable=True)
    date = Column(DateTime, default=func.now(), index=True)
    user_id = Column(Integer, index=True, default=1)  # For future multi-user support

    class Config:
        from_attributes = True
