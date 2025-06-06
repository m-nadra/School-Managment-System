"""Endpoints for managing teachers."""

from fastapi import APIRouter, HTTPException
from ..database import SessionDep, Teacher, User, Roles
from sqlmodel import select
from .user import add_user, delete_user
from ..security import UserDep
from typing import Sequence

router = APIRouter(prefix="/teacher", tags=["teacher"])


@router.get("/")
async def get_all_teachers(
    session: SessionDep, current_user: UserDep
) -> Sequence[Teacher]:
    """Return all teachers."""
    return session.exec(select(Teacher)).all()


@router.post("/")
async def add_teacher(
    teacher: Teacher, session: SessionDep, current_user: UserDep
) -> Teacher:
    """Add a new teacher and create a user account associated with the teacher. Return created teacher as a response."""
    if current_user.role not in [Roles.ADMIN, Roles.SECRETARY]:
        raise HTTPException(status_code=403, detail="Not authorized to add a teacher")
    user = User(
        username=f"{teacher.firstname[:3]}{teacher.lastname[:3]}".lower(),
        password="password",
        role=Roles.TEACHER,
    )
    await add_user(user, session)
    session.refresh(user)
    if user.id is None:
        raise HTTPException(status_code=500, detail="Failed to create user account")
    teacher.user_id = user.id
    session.add(teacher)
    session.commit()
    session.refresh(teacher)
    return teacher


@router.get("/{teacher_id}")
async def get_teacher(
    teacher_id: int, session: SessionDep, current_user: UserDep
) -> Teacher:
    """Return a teacher by ID."""
    teacher = session.get(Teacher, teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher


@router.delete("/{teacher_id}")
async def delete_teacher(
    teacher_id: int, session: SessionDep, current_user: UserDep
) -> dict:
    """Delete a teacher by ID."""
    if current_user.role not in [Roles.ADMIN, Roles.SECRETARY]:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete a teacher"
        )
    teacher = session.get(Teacher, teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    session.delete(teacher)
    await delete_user(teacher.user_id, session)
    session.commit()
    return {"message": "Teacher deleted successfully"}


@router.put("/{teacher_id}")
async def update_teacher(
    teacher_id: int, teacher: Teacher, session: SessionDep, current_user: UserDep
) -> Teacher:
    """Update a teacher by ID and return it as a response."""
    if current_user.role == Roles.STUDENT:
        raise HTTPException(
            status_code=403, detail="Not authorized to update a teacher"
        )

    db_teacher = session.get(Teacher, teacher_id)
    if not db_teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    if current_user.id != db_teacher.user_id and current_user.role == Roles.TEACHER:
        raise HTTPException(
            status_code=403, detail="You can only update your own teacher profile"
        )

    db_teacher.firstname = teacher.firstname
    db_teacher.secondname = teacher.secondname
    db_teacher.lastname = teacher.lastname
    db_teacher.email = teacher.email
    session.commit()
    session.refresh(db_teacher)
    return db_teacher
