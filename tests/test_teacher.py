from fastapi.testclient import TestClient
from sqlmodel import Session
from src.database import Teacher


def test_root(session: Session, client: TestClient):
    teacher1 = Teacher(first_name="John", last_name="Doe")
    teacher2 = Teacher(first_name="Jane", last_name="Smith")
    session.add(teacher1)
    session.add(teacher2)
    session.commit()
    
    response = client.get("/teacher")
    assert response.status_code == 200
    
    response = response.json()
    assert len(response) == 2
    assert response[0]["first_name"] == "John"
    assert response[1]["first_name"] == "Jane"
    assert response[0]["id"] == 1
    assert response[1]["id"] == 2


def test_add_teacher(client: TestClient):
    response = client.post("/teacher", json={"first_name": "John", "last_name": "Doe"})
    assert response.status_code == 200
    
    response = response.json()
    assert response["id"] == 1
    assert response["first_name"] == "John"
    assert response["last_name"] == "Doe"


def test_get_teacher(client: TestClient, session: Session):
    teacher = Teacher(first_name="John", last_name="Doe")
    session.add(teacher)
    session.commit()
    
    response = client.get(f"/teacher/{teacher.id}")
    assert response.status_code == 200
    
    response = response.json()
    assert response["id"] == teacher.id
    assert response["first_name"] == "John"
    assert response["last_name"] == "Doe"


def test_teacher_not_found(client: TestClient):
    response = client.get("/teacher/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Teacher not found"}

    response2 = client.delete("/teacher/999")
    assert response2.status_code == 404
    assert response2.json() == {"detail": "Teacher not found"}

    response3 = client.put("/teacher/999", json={"first_name": "Jane", "last_name": "Smith"})
    assert response3.status_code == 404
    assert response3.json() == {"detail": "Teacher not found"}


def test_delete_teacher(client: TestClient, session: Session):
    teacher = Teacher(first_name="John", last_name="Doe")
    session.add(teacher)
    session.commit()
    
    response = client.delete(f"/teacher/{teacher.id}")
    assert response.status_code == 200
    
    response = client.get("/teacher")
    assert len(response.json()) == 0


def test_update_teacher(client: TestClient, session: Session):
    teacher = Teacher(first_name="John", last_name="Doe")
    session.add(teacher)
    session.commit()
    
    response = client.put(f"/teacher/{teacher.id}", json={"first_name": "Jane", "last_name": "Smith"})
    assert response.status_code == 200
    
    response = response.json()
    assert response["id"] == teacher.id
    assert response["first_name"] == "Jane"
    assert response["last_name"] == "Smith"