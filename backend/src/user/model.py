from pydantic import BaseModel


class User(BaseModel):
    id: int
    username: str
    password: str
    role: str


class ChangePasswordBody(BaseModel):
    old_password: str
    new_password: str
