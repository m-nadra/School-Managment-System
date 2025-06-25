"""Endpoints for managing teachers."""

from fastapi import APIRouter, HTTPException
from ..database import SessionDep, Roles, Teacher
from ..security import UserDep
from typing import Sequence
from . import service
from src import exceptions

router = APIRouter(prefix="/teacher", tags=["teacher"])


@router.get("/")
async def get_all_teachers(
    session: SessionDep, current_user: UserDep
) -> Sequence[Teacher]:
    """Return all teachers."""
    return service.get_all_teachers(session)


@router.post("/")
async def add_teacher(
    teacher: Teacher, session: SessionDep, current_user: UserDep
) -> Teacher:
    """Add a new teacher and create a user account associated with the teacher. Return created teacher as a response."""
    if current_user.role not in [Roles.ADMIN, Roles.SECRETARY]:
        raise HTTPException(
            status_code=405, detail="You are not allowed to add a teacher"
        )
    try:
        return service.add_teacher(teacher, session)
    except exceptions.TeacherAdditionError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{teacher_id}")
async def get_teacher(
    teacher_id: int, session: SessionDep, current_user: UserDep
) -> Teacher:
    """Return a teacher by ID."""
    try:
        return service.get_teacher_by_id(teacher_id, session)
    except exceptions.TeacherNotFoundError:
        raise HTTPException(status_code=404, detail="Teacher not found")


@router.delete("/{teacher_id}")
async def delete_teacher(
    teacher_id: int, session: SessionDep, current_user: UserDep
) -> dict:
    """Delete a teacher by ID."""
    if current_user.role not in [Roles.ADMIN, Roles.SECRETARY]:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete a teacher"
        )
    try:
        service.delete_teacher(teacher_id, session)
    except exceptions.TeacherNotFoundError:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return {"message": "Teacher deleted successfully"}


@router.put("/{teacher_id}")
async def update_teacher(
    teacher_id: int, teacherNewData: Teacher, session: SessionDep, current_user: UserDep
) -> Teacher:
    """Update a teacher by ID and return it as a response."""
    if current_user.role == Roles.STUDENT:
        raise HTTPException(
            status_code=405, detail="You are not allowed to update a teacher"
        )
    try:
        teacherToUpdate = service.get_teacher_by_id(teacher_id, session)
    except exceptions.TeacherNotFoundError:
        raise HTTPException(status_code=404, detail="Teacher not found")
    if (
        current_user.id != teacherToUpdate.user_id
        and current_user.role == Roles.TEACHER
    ):
        raise HTTPException(
            status_code=405, detail="You can only update your own teacher profile"
        )
    return service.update_teacher(teacherToUpdate, teacherNewData, session)
