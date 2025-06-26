from fastapi import FastAPI
from .auth.routes import router as auth
from .user.routes import router as user
from .teacher.routes import router as teacher


def include_routers(app: FastAPI) -> None:
    """Includes all routers in the FastAPI app."""
    app.include_router(auth)
    app.include_router(user)
    app.include_router(teacher)
