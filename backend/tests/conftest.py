import pytest
from sqlmodel import create_engine, SQLModel, Session
from sqlmodel.pool import StaticPool
from src.database.core import getSession
from src.main import app
from fastapi.testclient import TestClient
from src.database import User
from argon2 import PasswordHasher
from typing import Generator


@pytest.fixture(name="session")
def session_fixture() -> Generator[Session, None, None]:
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(session: Session) -> Generator[TestClient, None, None]:
    def getSessionTestDatabase() -> Session:
        return session

    app.dependency_overrides[getSession] = getSessionTestDatabase

    ph = PasswordHasher()
    hashed_password = ph.hash("testpassword")
    test_user = User(username="testuser", password=hashed_password, role="admin")
    session.add(test_user)
    session.commit()

    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


@pytest.fixture
def token(client: TestClient) -> None:
    response = client.post(
        "/token",
        json={"username": "testuser", "password": "testpassword"},
    )
    assert response.status_code == 200
