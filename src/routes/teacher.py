from fastapi import APIRouter
from database import SessionDep, Teacher
from sqlmodel import select

router = APIRouter(prefix="/teacher", tags=["teacher"])

@router.get("/")
async def root(session: SessionDep) -> list[Teacher]:
    """Return all teachers."""
    return session.exec(select(Teacher)).all()