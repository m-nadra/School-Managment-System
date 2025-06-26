from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select
from typing import Annotated
from ..database import SessionDep, User, Teacher, Roles
from ..security import create_access_token, UserDep, check_if_hash_valid
from . import model

router = APIRouter(tags=["auth"])


@router.post("/token", status_code=200)
async def login(
    session: SessionDep,
    response: Response,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> model.LoginResponse:
    """Generates a JWT token for the user if user exists and password is correct."""
    query = select(User).where(User.username == form_data.username)
    user = session.exec(query).first()
    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )
    if not check_if_hash_valid(user.password, form_data.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid password",
        )
    token = create_access_token(data={"sub": form_data.username})
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False,
        expires=60 * 30,
    )
    return model.LoginResponse(
        username=user.username,
        role=user.role,
    )


@router.get("/me", status_code=200)
async def read_user_profile(
    session: SessionDep, current_user: UserDep
) -> Teacher | None:
    """Returns the current user profile."""
    match current_user.role:
        case Roles.ADMIN:
            pass
        case Roles.TEACHER:
            query = select(Teacher).where(Teacher.user_id == current_user.id)
            teacher = session.exec(query).first()
            if not teacher:
                raise HTTPException(
                    status_code=404,
                    detail="Teacher not found",
                )
            return teacher
        case Roles.STUDENT:
            pass
        case Roles.SECRETARY:
            pass
    return None


@router.post("/logout", status_code=204)
async def logout(response: Response) -> None:
    """Logs out the user by deleting the JWT token."""
    response.delete_cookie(key="token")
