"""Endpoints for user management."""

from fastapi import APIRouter, HTTPException
from ..database import SessionDep, User
from ..security import UserDep
from typing import Sequence
from . import service, model

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/", status_code=200)
async def get_all_users(session: SessionDep) -> Sequence[User]:
    """Return all users."""
    return service.get_all_users(session)


@router.get("/{user_id}", status_code=200)
async def get_user(user_id: int, session: SessionDep) -> User:
    """Return a user by ID."""
    try:
        return service.get_user_by_id(user_id, session)
    except service.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")


@router.post("/", status_code=201)
async def add_user(user: User, session: SessionDep) -> User:
    """Add a new user and return created user as a response."""
    return service.add_user(user, session)


@router.delete("/{user_id}", status_code=204)
async def delete_user(user_id: int, session: SessionDep) -> None:
    """Delete a user by ID."""
    try:
        service.delete_user(user_id, session)
    except service.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")


@router.put("/{user_id}", status_code=204)
async def update_user(user_id: int, newUserData: User, session: SessionDep) -> None:
    """Update a user by ID and return it as a response."""
    try:
        service.update_user(user_id, newUserData, session)
    except service.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")


@router.post("/change_password", status_code=204)
async def change_password(
    body: model.ChangePasswordBody, session: SessionDep, loggedUser: UserDep
) -> None:
    """Change the password of a user."""
    try:
        service.change_password(loggedUser, body, session)
    except service.InvalidPassword:
        raise HTTPException(status_code=401, detail="Old password is incorrect")
