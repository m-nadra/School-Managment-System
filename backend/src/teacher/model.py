from pydantic import BaseModel


class Teacher(BaseModel):
    id: int
    firstname: str
    secondname: str
    lastname: str
    email: str
