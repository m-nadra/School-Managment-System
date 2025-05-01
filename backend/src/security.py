from typing import Annotated
from fastapi import Depends
from datetime import datetime, timedelta, timezone
from os import getenv
from .database import SessionDep, User
from fastapi import HTTPException, Cookie
from sqlmodel import select
import jwt

SECRET_KEY = getenv("SECRET_KEY", "5974ba32fd3279e9d287a9f3926ebf4fa0d153c27775453e31af792afc1a95e0")
ALGORITHM = getenv("ALGORITHM", "HS256")
TOKEN_EXPIRE_MINUTES = int(getenv("TOKEN_EXPIRE_MINUTES", 30))


async def get_current_user(session: SessionDep, token: Annotated[str | None, Cookie()] = None) -> User:
    """Get the current user from the token."""
    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated",
        )
    username = decode_access_token(token)
    query = select(User).where(User.username == username)
    user = session.exec(query).first()
    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )
    return user


def create_access_token(data: dict) -> str:
    """Generate a JWT token with an expiration time."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> str:
    """Decode a JWT token and return the username."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token",
            )
        return username
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    
UserDep = Annotated[User, Depends(get_current_user)]