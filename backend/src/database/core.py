"""Database connection and session management for FastAPI"""

from sqlmodel import SQLModel, create_engine, Session
from typing import Annotated, Iterator
from fastapi import Depends
from . import models  # noqa: F401

engine = create_engine("sqlite:///database.db")


def createTables() -> None:
    SQLModel.metadata.create_all(engine)


def getSession() -> Iterator[Session]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(getSession)]
