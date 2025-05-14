"""This file contains the database models for the application."""

from sqlmodel import SQLModel, Field, Relationship, Enum
from .database import SessionDep, createTables
from typing import Optional
import enum

__all__ = ["SessionDep", "createTables"]


class Base(SQLModel):
    pass


class Roles(str, enum.Enum):
    ADMIN = "admin"
    TEACHER = "teacher"
    STUDENT = "student"
    SECRETARY = "secretary"


class Teacher(Base, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    firstname: str = Field(max_length=20 , nullable=False)
    secondname: Optional[str] = Field(max_length=20 , nullable=True)
    lastname: str = Field(max_length=30, nullable=False)
    email: str = Field(max_length=40 , nullable=False, unique=True)
    user_id: Optional[int] = Field(foreign_key="user.id")
    user: "User" = Relationship(back_populates="teacher")


class User(Base, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(max_length=50, nullable=False, unique=True)
    password: str = Field(max_length=200, nullable=False)
    role: Roles = Field(Enum(Roles), nullable=False)
    teacher: Optional[Teacher] = Relationship(back_populates="user")
