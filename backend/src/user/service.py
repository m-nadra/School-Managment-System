from ..database import SessionDep, User
from sqlmodel import select
from typing import Sequence
from ..security import hash_password, check_if_hash_valid
from src.exceptions import UserNotFoundError, InvalidPassword
from . import model


def get_all_users(session: SessionDep) -> Sequence[User]:
    """Return all users."""
    return session.exec(select(User)).all()


def get_user_by_id(user_id: int, session: SessionDep) -> User:
    """Return a user by ID."""
    user = session.get(User, user_id)
    if not user:
        raise UserNotFoundError("There is no user with this ID.")
    return user


def add_user(user: User, session: SessionDep) -> User:
    """Add a new user and return created user as a response."""
    user.password = hash_password(user.password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def delete_user(user_id: int, session: SessionDep) -> None:
    """Delete a user by ID."""
    user = session.get(User, user_id)
    if not user:
        raise UserNotFoundError("There is no user with this ID.")
    session.delete(user)
    session.commit()


def update_user(oldUserData: User, newUserData: User, session: SessionDep) -> User:
    """Update a user by ID and return it as a response."""
    oldUserData.username = newUserData.username
    oldUserData.password = hash_password(newUserData.password)
    oldUserData.role = newUserData.role
    session.commit()
    session.refresh(oldUserData)
    return oldUserData


def change_password(
    user: User, body: model.ChangePasswordBody, session: SessionDep
) -> User:
    """Change the password of a user."""
    if not check_if_hash_valid(user.password, body.old_password):
        raise InvalidPassword("Old password is incorrect.")
    user.password = hash_password(body.new_password)
    session.commit()
    session.refresh(user)
    return user
