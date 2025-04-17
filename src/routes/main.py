from fastapi import FastAPI
from . import teacher
from database import createTables
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    createTables()
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(teacher)

@app.get("/")
async def root():
    return {"message": "Hello World!"}