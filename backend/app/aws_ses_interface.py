import os
from app.schemas import ContactForm
import boto3
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

def send_contact_email_via_ses(form_data: ContactForm):
    # Configure AWS SES client
    ses_client = boto3.client(
        'ses',
        region_name=os.getenv('AWS_REGION'),
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
    )
    
    # Prepare email content
    subject = f"Contact Form: Message from {form_data.name}"
    body_text = f"""
    You received a message from your website contact form:
    
    Name: {form_data.name}
    Email: {form_data.email}
    
    Message:
    {form_data.message}
    """
    
    try:
        # Send email using AWS SES
        response = ses_client.send_email(
            Source=os.getenv('EMAIL_SENDER'),
            Destination={
                'ToAddresses': [os.getenv('EMAIL_RECIPIENT')]
            },
            Message={
                'Subject': {'Data': subject},
                'Body': {
                    'Text': {'Data': body_text}
                }
            }
        )
        return {"message": "Email sent successfully", "messageId": response['MessageId']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")