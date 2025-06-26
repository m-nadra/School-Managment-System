from sqlmodel import select
from ..database import SessionDep, Teacher, User, Roles
from ..user.service import add_user, delete_user
from typing import Sequence
from src import exceptions


def get_all_teachers(session: SessionDep) -> Sequence[Teacher]:
    """Return all teachers."""
    return session.exec(select(Teacher)).all()


def get_teacher_by_id(teacher_id: int, session: SessionDep) -> Teacher:
    """Return a teacher by ID."""
    teacher = session.get(Teacher, teacher_id)
    if not teacher:
        raise exceptions.TeacherNotFoundError("Teacher not found")
    return teacher


def create_user_account_for_teacher(teacher: Teacher, session: SessionDep) -> User:
    """Create a user account for the teacher and associate it with the teacher."""
    user = User(
        username=f"{teacher.firstname[:3]}{teacher.lastname[:3]}".lower(),
        password="password",
        role=Roles.TEACHER,
    )
    try:
        user = add_user(user, session)
        session.refresh(user)
        return user
    except exceptions.UserAlreadyExistsError:
        raise exceptions.UserAlreadyExistsError(
            f"User with username {user.username} already exists"
        )


def add_teacher(teacher: Teacher, session: SessionDep) -> Teacher:
    """Add a new teacher and create a user account associated with the teacher."""
    try:
        user = create_user_account_for_teacher(teacher, session)
        if user.id is None:
            raise exceptions.TeacherAdditionError("Failed to create user account")
        teacher.user_id = user.id
        session.add(teacher)
        session.commit()
        session.refresh(teacher)
        return teacher
    except exceptions.UserAlreadyExistsError:
        raise exceptions.TeacherAdditionError(
            "Failed to add teacher due to user account issue"
        )


def delete_teacher(teacher_id: int, session: SessionDep) -> None:
    """Delete a teacher by ID."""
    teacher = session.get(Teacher, teacher_id)
    if not teacher:
        raise exceptions.TeacherNotFoundError("Teacher not found")
    session.delete(teacher)
    delete_user(teacher.user_id, session)
    session.commit()


def update_teacher(
    oldTeacherData: Teacher, newTeacherData: Teacher, session: SessionDep
) -> Teacher:
    """Update a teacher by ID and return it as a response."""
    oldTeacherData.firstname = newTeacherData.firstname
    oldTeacherData.secondname = newTeacherData.secondname
    oldTeacherData.lastname = newTeacherData.lastname
    oldTeacherData.email = newTeacherData.email
    session.commit()
    session.refresh(oldTeacherData)
    return oldTeacherData
