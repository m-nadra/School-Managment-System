from fastapi import FastAPI
from .auth.controller import router as auth
from .user.controller import router as user
from .teacher.controller import router as teacher


def include_routers(app: FastAPI) -> None:
    """Includes all routers in the FastAPI app."""
    app.include_router(auth)
    app.include_router(user)
    app.include_router(teacher)
