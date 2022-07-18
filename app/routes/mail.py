from fastapi import APIRouter, Depends
from app.services.mail import send_message
from app.models.email import EmailRequest
from fastapi.responses import JSONResponse
from sendgrid import SendGridAPIClient
from app.dependencies.send_grid import getSendGridClient



router = APIRouter(tags=['email'])


@router.post('/send_email')
async def send_email(body: EmailRequest, sg: SendGridAPIClient = Depends(getSendGridClient)) -> JSONResponse:
    return await send_message(request=body, sg=sg)
