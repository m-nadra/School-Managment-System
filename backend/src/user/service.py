from ..database import SessionDep, User
from sqlmodel import select
from typing import Sequence
from ..auth.service import hash_password, check_if_hash_valid
from src.exceptions import UserNotFoundError, UserAlreadyExistsError, InvalidPassword
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
    try:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user
    except Exception:
        raise UserAlreadyExistsError(
            f"User with username {user.username} already exists"
        )


def delete_user(user_id: int, session: SessionDep) -> None:
    """Delete a user by ID."""
    user = session.get(User, user_id)
    if not user:
        raise UserNotFoundError("There is no user with this ID.")
    session.delete(user)
    session.commit()


def update_user(user_id: int, newUserData: User, session: SessionDep) -> None:
    """Update a user by ID and return it as a response."""
    user = session.get(User, user_id)
    if not user:
        raise UserNotFoundError("There is no user with this ID.")
    user.username = newUserData.username
    user.password = hash_password(newUserData.password)
    user.role = newUserData.role
    session.commit()


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
