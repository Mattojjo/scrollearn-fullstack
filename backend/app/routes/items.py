"""Item endpoints for card management"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Item as ItemModel
from app.schemas import Item, ItemCreate, ItemUpdate

router = APIRouter(prefix="/items", tags=["items"])


@router.post("/", response_model=Item)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    """Create a new item (card)"""
    db_item = ItemModel(
        name=item.name,
        description=item.description,
        user_id=1  # Development mode - hardcoded user
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.get("/", response_model=List[Item])
def read_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get all items with pagination"""
    items = db.query(ItemModel).offset(skip).limit(limit).all()
    return items


@router.get("/{item_id}", response_model=Item)
def read_item(item_id: int, db: Session = Depends(get_db)):
    """Get a single item by ID"""
    item = db.query(ItemModel).filter(ItemModel.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.put("/{item_id}", response_model=Item)
def update_item(
    item_id: int,
    item_update: ItemUpdate,
    db: Session = Depends(get_db)
):
    """Update an item"""
    item = db.query(ItemModel).filter(ItemModel.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    if item_update.name is not None:
        item.name = item_update.name
    if item_update.description is not None:
        item.description = item_update.description

    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    """Delete an item"""
    item = db.query(ItemModel).filter(ItemModel.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(item)
    db.commit()
    return {"ok": True}


@router.delete("/")
def delete_all_items(db: Session = Depends(get_db)):
    """Delete all items (for development only)"""
    db.query(ItemModel).delete()
    db.commit()
    return {"deleted": True}
