from fastapi import FastAPI, Depends, HTTPException
from . import teacher
from ..database import createTables, User, SessionDep
from contextlib import asynccontextmanager
from prometheus_client import make_asgi_app
from fastapi.middleware.cors import CORSMiddleware
from ..security import create_access_token, UserDep
from fastapi.security import OAuth2PasswordRequestForm
from os import getenv
from sqlmodel import select
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from fastapi.responses import Response
from pydantic import BaseModel


@asynccontextmanager
async def lifespan(app: FastAPI):
    createTables()
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(teacher)
app.mount("/metrics", make_asgi_app(), name="metrics")

FRONTEND_URL : str = getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ph = PasswordHasher()


@app.get("/")
async def root():
    return {"message": "Hello World!"}

class Token(BaseModel):
    access_token: str
    token_type: str

@app.post("/token")
async def login(session: SessionDep, response: Response, form_data: OAuth2PasswordRequestForm = Depends()) -> Token:
    """Generates a JWT token for the user if user exists and password is correct."""
    query = select(User).where(User.username == form_data.username)
    user = session.exec(query).first()
    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )
    try:
        ph.verify(user.password, form_data.password)
    except VerifyMismatchError:
        raise HTTPException(
            status_code=401,
            detail="Invalid password",
        )
    token = create_access_token(
        data={"sub": form_data.username}
    )
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False,
        expires=60 * 30,
    )
    return Token(
        access_token=token,
        token_type="bearer",
    )


@app.get("/me")
async def read_user_profile(current_user: UserDep) -> User:
    """Returns the current user profile."""
    return current_user


@app.post("/logout")
async def logout(response: Response):
    """Logs out the user by deleting the JWT token."""
    response.delete_cookie(key="token")
    return {"message": "Logged out successfully"}