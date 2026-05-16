import os
from resend import Resend

client = Resend(api_key=os.getenv("RESEND_API_KEY"))
MANI_EMAIL = os.getenv("MANI_EMAIL", "manikanthnampally94@gmail.com")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@manios.dev")

async def send_contact_email(name: str, email: str, subject: str, message: str):
    """Send contact form email via Resend."""
    try:
        result = client.emails.send({
            "from": FROM_EMAIL,
            "to": MANI_EMAIL,
            "reply_to": email,
            "subject": f"ManiOS Contact: {subject}",
            "html": f"""
            <h2>New message from {name}</h2>
            <p><strong>From:</strong> {email}</p>
            <p><strong>Subject:</strong> {subject}</p>
            <hr />
            <p>{message.replace(chr(10), '<br>')}</p>
            """,
        })
        return {"success": True, "id": result.get("id")}
    except Exception as e:
        print(f"Email error: {e}")
        return {"success": False, "error": str(e)}
