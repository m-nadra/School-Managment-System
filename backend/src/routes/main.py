from fastapi import FastAPI, Depends, HTTPException
from . import teacher, user
from ..database import createTables, User, SessionDep, Teacher, Roles
from contextlib import asynccontextmanager
from prometheus_client import make_asgi_app
from fastapi.middleware.cors import CORSMiddleware
from ..security import create_access_token, UserDep, check_if_hash_valid
from fastapi.security import OAuth2PasswordRequestForm
from os import getenv
from sqlmodel import select
from fastapi.responses import Response


@asynccontextmanager
async def lifespan(app: FastAPI):
    createTables()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(teacher)
app.include_router(user)
app.mount("/metrics", make_asgi_app(), name="metrics")

FRONTEND_URL : str = getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World!"}


@app.post("/token")
async def login(session: SessionDep, response: Response, form_data: OAuth2PasswordRequestForm = Depends()) -> dict:
    """Generates a JWT token for the user if user exists and password is correct."""
    query = select(User).where(User.username == form_data.username)
    user = session.exec(query).first()
    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )
    if not check_if_hash_valid(user.password, form_data.password):
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
    return {"username": f"{user.username}", "role": f"{user.role.value}"}


@app.get("/me")
async def read_user_profile(session: SessionDep, current_user: UserDep) -> dict:
    """Returns the current user profile."""
    personal_data = None
    match current_user.role:
        case Roles.ADMIN:
            pass
        case Roles.TEACHER:
            personal_data = session.get(Teacher, current_user.teacher.id)
        case Roles.STUDENT:
            pass
        case Roles.SECRETARY:
            pass
    return {
        "account_data": current_user,
        "personal_data": personal_data,
    }


@app.post("/logout")
async def logout(response: Response) -> dict:
    """Logs out the user by deleting the JWT token."""
    response.delete_cookie(key="token")
    return {"message": "Logged out successfully"}