"""This file contains the database models for the application."""

from sqlmodel import SQLModel, Field
from .database import SessionDep, createTables

__all__ = ["SessionDep", "createTables"]

class Base(SQLModel):
    pass

class Teacher(Base, table=True):
    id: int | None = Field(default=None, primary_key=True)
    first_name: str = Field(max_length=50 , nullable=False)
    last_name: str = Field(max_length=50 , nullable=False)
