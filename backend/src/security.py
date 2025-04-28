from pydantic import BaseModel
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from datetime import datetime, timedelta, timezone
from os import getenv
from .database import SessionDep, User
from fastapi import HTTPException
from sqlmodel import select
import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = getenv("SECRET_KEY", "5974ba32fd3279e9d287a9f3926ebf4fa0d153c27775453e31af792afc1a95e0")
ALGORITHM = getenv("ALGORITHM", "HS256")
TOKEN_EXPIRE_MINUTES = int(getenv("TOKEN_EXPIRE_MINUTES", 30))

class Token(BaseModel):
    access_token: str
    token_type: str

async def get_current_user(session: SessionDep, token: Annotated[str, Depends(oauth2_scheme)]) -> User:
    """Get the current user from the token."""
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
            raise jwt.credentials_exception
        return username
    except jwt.JWTError:
        raise jwt.credentials_exception