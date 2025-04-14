from fastapi import APIRouter

router = APIRouter(prefix="/teacher", tags=["teacher"])

@router.get("/")
async def root():
    return {"message": "Hello Teachers!"}