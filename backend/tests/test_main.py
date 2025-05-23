from fastapi.testclient import TestClient

def test_root(client: TestClient):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World!"}


def test_token_create_invalid_user(client: TestClient):
    response = client.post("/token", data={"username": "invaliduser", "password": "invalidpassword"})
    assert response.status_code == 401
    assert response.json() == {"detail": "User not found"}

    response2 = client.post("/token", data={"username": "testuser", "password": "invalidpassword"})
    assert response2.status_code == 401
    assert response2.json() == {"detail": "Invalid password"}


def test_me(client: TestClient, token: str):
    response = client.get("/me")
    assert response.status_code == 200
    assert response.json() is None
