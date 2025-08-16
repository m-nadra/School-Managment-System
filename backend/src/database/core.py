"""Database connection and session management for FastAPI"""

from sqlmodel import SQLModel, create_engine, Session
from typing import Annotated, Iterator
from fastapi import Depends
from sqlite3 import IntegrityError
from . import models  # noqa: F401

engine = create_engine("sqlite:///database.db")


def createTables() -> None:
    SQLModel.metadata.create_all(engine)


def getSession() -> Iterator[Session]:
    with Session(engine) as session:
        yield session


def addAdminAccount() -> None:
    try:
        with Session(engine) as session:
            admin = models.User(username="admin", password="$argon2i$v=19$m=16,t=2,p=1$YWRSeXp1NTUxdVg4QWZPVQ$c740bFBtLgvagnNeV263VA", role="admin")
            session.add(admin)
            session.commit()
    except IntegrityError:
        print("Admin account already exists. Skipping creation.")
    except Exception as e:
        print(f"Admin account creation failed: {e}")


SessionDep = Annotated[Session, Depends(getSession)]
