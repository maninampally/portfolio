from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import json
from db.connection import execute_insert
from services.email_service import send_contact_email

router = APIRouter(prefix="/api", tags=["contact"])

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@router.post("/contact")
async def submit_contact(data: ContactMessage):
    """Handle contact form submission."""
    try:
        # Save to database
        query = """
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (%s, %s, %s, %s)
        """
        execute_insert(query, (data.name, data.email, data.subject, data.message))

        # Send email
        email_result = await send_contact_email(data.name, data.email, data.subject, data.message)

        return {
            "success": email_result["success"],
            "message": "Message received! I'll respond within 24 hours."
        }
    except Exception as e:
        print(f"Contact error: {e}")
        raise HTTPException(status_code=500, detail="Failed to process contact form")
