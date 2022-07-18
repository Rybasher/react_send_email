from pydantic import BaseModel
from app.core import config

class EmailRequest(BaseModel):
    from_email: str = config.EMAIL_FROM
    to_emails: str = config.EMAIL_TO
    subject: str
    content: str
