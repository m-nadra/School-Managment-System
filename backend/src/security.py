from pydantic import BaseModel
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class User(BaseModel):
    username: str
    password: str

def fake_decode_token(token):
    return User(
        username=token + "fakedecoded", password="fakehashed" + token
    )

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    return user

def generate_token():
    return "fake-token"
