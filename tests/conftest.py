import pytest
from sqlmodel import create_engine, SQLModel, Session
from sqlmodel.pool import StaticPool
from src.database.database import getSession
from src.routes.main import app
from fastapi.testclient import TestClient


@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")  
def client_fixture(session: Session):  
    def getSessionTestDatabase():  
        return session

    app.dependency_overrides[getSession] = getSessionTestDatabase

    client = TestClient(app)  
    yield client  
    app.dependency_overrides.clear()  
