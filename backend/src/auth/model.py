from pydantic import BaseModel


class LoginResponse(BaseModel):
    username: str
    role: str


class AuthData(BaseModel):
    username: str
    password: str
