from distutils.command.config import config
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.dependencies.send_grid import getSendGridClient
from app.models.email import EmailRequest
from fastapi.responses import JSONResponse
from fastapi import status, Depends
from app.core.config import EMAIL_FROM, EMAIL_TO

async def send_message(request: EmailRequest, sg: SendGridAPIClient) -> JSONResponse:
    print(request)
    mail = Mail(
        from_email=EMAIL_FROM,
        to_emails=EMAIL_TO,
        subject=request.subject,
        html_content=f"""
        <div>
            <p><strong>{request.content}</strong><p> 
            <p>client email: {request.from_email}<p>
        <div>"""
    )
    try:
        response = sg.send(mail)
        print(sg)
        print(response.body)
        return JSONResponse(
            status_code=status.HTTP_202_ACCEPTED, 
            content={
                "message": "Message sent"
            }
        )
    except Exception as error:
        return JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN,
            content={
                'message': 'email not sent',
                'reason': f"{error}"
            }
        )
