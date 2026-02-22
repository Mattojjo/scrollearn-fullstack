"""Pydantic schemas for request/response validation"""

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ItemBase(BaseModel):
    """Base item schema"""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)


class ItemCreate(ItemBase):
    """Schema for creating items"""
    pass


class ItemUpdate(BaseModel):
    """Schema for updating items"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)


class Item(ItemBase):
    """Schema for item response"""
    id: int
    date: datetime
    user_id: int

    class Config:
        from_attributes = True
