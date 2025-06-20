from fastapi import FastAPI
from . import teacher, user, auth
from ..database import createTables
from contextlib import asynccontextmanager
from prometheus_client import make_asgi_app
from fastapi.middleware.cors import CORSMiddleware
from os import getenv
from typing import AsyncIterator


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    createTables()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(auth)
app.include_router(teacher)
app.include_router(user)
app.mount("/metrics", make_asgi_app(), name="metrics")

FRONTEND_URL: str = getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
