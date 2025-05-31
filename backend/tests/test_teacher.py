import pytest
from fastapi.testclient import TestClient
from typing import Generator


@pytest.fixture
def teacher(client: TestClient, token: str) -> Generator[dict, None, None]:
    """Fixture to create a teacher for testing."""
    teacher = client.post(
        "/teacher",
        json={
            "firstname": "John",
            "secondname": "Doe",
            "lastname": "Smith",
            "email": "jdoe@example.com",
        },
    )
    assert teacher.status_code == 200
    yield teacher.json()


def test_teacher_create(client: TestClient, teacher: dict) -> None:
    """Test creating a teacher and user associated with teacher."""
    assert teacher["id"] == 1
    assert teacher["firstname"] == "John"
    assert teacher["secondname"] == "Doe"
    assert teacher["lastname"] == "Smith"
    assert teacher["email"] == "jdoe@example.com"
    user = client.get(f"/user/{teacher['user_id']}")
    assert user.status_code == 200
    user = user.json()
    assert user["username"] == "johsmi"
    assert user["role"] == "teacher"


def test_read_teacher(client: TestClient, teacher: dict) -> None:
    teacher2 = client.post(
        "/teacher",
        json={
            "firstname": "Jane",
            "secondname": "Anna",
            "lastname": "Smith",
            "email": "jsmi@example.com",
        },
    )
    assert teacher2.status_code == 200
    response = client.get("/teacher")
    assert response.status_code == 200
    response = response.json()
    assert len(response) == 2
    assert response[0]["firstname"] == teacher["firstname"]
    assert response[1]["firstname"] == "Jane"


def test_teacher_delete(client: TestClient, teacher: dict) -> None:
    """Test deleting a teacher and user associated with teacher."""
    teacher_exists_response = client.get(f"/teacher/{teacher['id']}")
    assert teacher_exists_response.status_code == 200
    user_id = teacher["user_id"]
    user_exists_response = client.get(f"/user/{user_id}")
    assert user_exists_response.status_code == 200

    delete_response = client.delete(f"/teacher/{teacher['id']}")
    assert delete_response.status_code == 200

    teacher_not_found_response = client.get(f"/teacher/{teacher['id']}")
    assert teacher_not_found_response.status_code == 404
    assert teacher_not_found_response.json() == {"detail": "Teacher not found"}
    user_not_found_response = client.get(f"/user/{user_id}")
    assert user_not_found_response.status_code == 404
    assert user_not_found_response.json() == {"detail": "User not found"}


def test_delete_teacher_not_found(client: TestClient, token: str) -> None:
    """Test deleting a teacher that does not exist."""
    response = client.delete("/teacher/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Teacher not found"}


def test_update_teacher(client: TestClient, teacher: dict) -> None:
    """Test updating a teacher."""
    update_response = client.put(
        f"/teacher/{teacher['id']}",
        json={
            "firstname": "Jane",
            "secondname": "Doe",
            "lastname": "Smith",
            "email": "",
        },
    )
    assert update_response.status_code == 200
    updated_teacher = update_response.json()
    assert updated_teacher["firstname"] == "Jane"
    assert updated_teacher["email"] == ""


def test_update_teacher_not_found(client: TestClient, token: str) -> None:
    """Test updating a teacher that does not exist."""
    response = client.put(
        "/teacher/999",
        json={
            "firstname": "Jane",
            "secondname": "Doe",
            "lastname": "Smith",
            "email": "",
        },
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "Teacher not found"}
