from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core import config
from app.routes import mail


origins = ["http://localhost:3000", "http://127.0.0.1:3000"]


def get_application():
    _app = FastAPI(title=config.PROJECT_NAME, version=config.VERSION)

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


    return _app

app = get_application()

app.include_router(mail.router)