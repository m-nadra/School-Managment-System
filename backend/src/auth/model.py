from pydantic import BaseModel


class LoginResponse(BaseModel):
    username: str
    role: str
