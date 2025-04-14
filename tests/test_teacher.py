from fastapi.testclient import TestClient
from src.routes.teacher import router
client = TestClient(router)

def test_root():
    response = client.get("/teacher")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello Teachers!"}