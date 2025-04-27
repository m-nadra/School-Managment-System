from fastapi import FastAPI
from . import teacher
from ..database import createTables
from contextlib import asynccontextmanager
from prometheus_client import make_asgi_app
from fastapi.middleware.cors import CORSMiddleware
import os

FRONTEND_URL : str = os.getenv("FRONTEND_URL", "http://localhost:5173")

@asynccontextmanager
async def lifespan(app: FastAPI):
    createTables()
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(teacher)

app.mount("/metrics", make_asgi_app(), name="metrics")
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