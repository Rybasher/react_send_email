import os
from sendgrid import SendGridAPIClient
from app.core import config


def getSendGridClient():
    return SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))