from fastapi import FastAPI
from . import teacher

app = FastAPI()
app.include_router(teacher)

@app.get("/")
async def root():
    return {"message": "Hello World!"}