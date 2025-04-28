from fastapi import FastAPI, Depends, HTTPException
from . import teacher
from ..database import createTables, User, SessionDep
from contextlib import asynccontextmanager
from prometheus_client import make_asgi_app
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from ..security import get_current_user, create_access_token, Token
from fastapi.security import OAuth2PasswordRequestForm
from os import getenv
from sqlmodel import select
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

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


@app.post("/token")
async def login(session: SessionDep, form_data: OAuth2PasswordRequestForm = Depends()) -> Token:
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
            detail="Invalid username or password",
        )
    token = create_access_token(
        data={"sub": form_data.username}
    )
    return Token(
        access_token=token,
        token_type="bearer"
    )


@app.get("/me")
async def read_user_profile(current_user: Annotated[User, Depends(get_current_user)]) -> User:
    return current_user