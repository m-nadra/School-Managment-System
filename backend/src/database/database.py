"""Database connection and session management for FastAPI"""

from sqlmodel import SQLModel, create_engine, Session
from typing import Annotated
from fastapi import Depends

engine = create_engine("sqlite:///database.db")

def createTables():
    SQLModel.metadata.create_all(engine)

def getSession():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(getSession)]