import os
from dotenv import load_dotenv
from starlette.config import Config
from starlette.datastructures import Secret


load_dotenv()

config = Config(".env")

PROJECT_NAME = "Kirill Leontiev test project"
VERSION = "1.0.0"
API_PREFIX = "/api"
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY', '')
EMAIL_FROM = os.environ.get('EMAIL_FROM', '')
EMAIL_TO = os.environ.get('EMAIL_TO', '')