"""Endpoints for user management."""

from fastapi import APIRouter, HTTPException
from ..database import SessionDep, User
from ..security import UserDep
from typing import Sequence
from . import service, model

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/")
async def get_all_users(session: SessionDep) -> Sequence[User]:
    """Return all users."""
    return service.get_all_users(session)


@router.post("/")
async def add_user(user: User, session: SessionDep) -> User:
    """Add a new user and return created user as a response."""
    return service.add_user(user, session)


@router.get("/{user_id}")
async def get_user(user_id: int, session: SessionDep) -> User:
    """Return a user by ID."""
    try:
        return service.get_user_by_id(user_id, session)
    except service.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")


@router.delete("/{user_id}")
async def delete_user(user_id: int, session: SessionDep) -> model.DeleteUserResponse:
    """Delete a user by ID."""
    try:
        service.delete_user(user_id, session)
    except service.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    return model.DeleteUserResponse(message="User deleted successfully")


@router.put("/{user_id}")
async def update_user(user_id: int, newUserData: User, session: SessionDep) -> User:
    """Update a user by ID and return it as a response."""
    try:
        userToUpdate = service.get_user_by_id(user_id, session)
    except service.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    return service.update_user(userToUpdate, newUserData, session)


@router.post("/change_password")
async def change_password(
    body: model.ChangePasswordBody, session: SessionDep, loggedUser: UserDep
) -> model.ChangePasswordResponse:
    """Change the password of a user."""
    try:
        service.change_password(loggedUser, body, session)
    except service.InvalidPassword:
        raise HTTPException(status_code=401, detail="Old password is incorrect")
    return model.ChangePasswordResponse(message="Password changed successfully")
