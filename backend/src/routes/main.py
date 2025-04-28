from fastapi import FastAPI, Depends
from . import teacher
from ..database import createTables
from contextlib import asynccontextmanager
from prometheus_client import make_asgi_app
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from ..security import get_current_user, User, generate_token
from os import getenv

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


@app.get("/")
async def root():
    return {"message": "Hello World!"}


@app.post("/token")
async def login():
    return {"access_token": f"{generate_token()}", "token_type": "bearer"}


@app.get("/me")
async def read_user_profile(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user