"""Endpoints for user management."""

from fastapi import APIRouter, HTTPException
from ..database import SessionDep, User
from sqlmodel import select
from ..security import UserDep, hash_password, check_if_hash_valid
from pydantic import BaseModel
from typing import Sequence

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/")
async def get_all_users(session: SessionDep) -> Sequence[User]:
    """Return all users."""
    return session.exec(select(User)).all()


@router.post("/")
async def add_user(user: User, session: SessionDep) -> User:
    """Add a new user and return created user as a response."""
    user.password = hash_password(user.password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.get("/{user_id}")
async def get_user(user_id: int, session: SessionDep) -> User:
    """Return a user by ID."""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/{user_id}")
async def delete_user(user_id: int, session: SessionDep) -> dict:
    """Delete a user by ID."""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return {"message": "User deleted successfully"}


@router.put("/{user_id}")
async def update_user(user_id: int, user: User, session: SessionDep) -> User:
    """Update a user by ID and return it as a response."""
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.username = user.username
    db_user.password = hash_password(user.password)
    db_user.role = user.role
    session.commit()
    session.refresh(db_user)
    return db_user


class ChangePasswordBody(BaseModel):
    old_password: str
    new_password: str


@router.post("/change_password")
async def change_password(
    body: ChangePasswordBody, session: SessionDep, current_user: UserDep
) -> dict:
    """Change the password of a user."""
    if not check_if_hash_valid(current_user.password, body.old_password):
        raise HTTPException(status_code=401, detail="Old password is incorrect")
    current_user.password = hash_password(body.new_password)
    session.commit()
    session.refresh(current_user)
    return {"message": "Password changed successfully"}
