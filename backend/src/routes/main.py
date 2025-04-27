from fastapi import FastAPI
from . import teacher
from ..database import createTables
from contextlib import asynccontextmanager
from prometheus_client import make_asgi_app

@asynccontextmanager
async def lifespan(app: FastAPI):
    createTables()
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(teacher)

app.mount("/metrics", make_asgi_app(), name="metrics")

@app.get("/")
async def root():
    return {"message": "Hello World!"}