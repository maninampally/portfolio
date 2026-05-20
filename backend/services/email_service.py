import os
import resend

resend.api_key = os.getenv("RESEND_API_KEY", "")
MANI_EMAIL = os.getenv("MANI_EMAIL", "manikanthnampally94@gmail.com")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@manios.dev")

async def send_contact_email(name: str, email: str, subject: str, message: str):
    """Send contact form email via Resend."""
    try:
        if not resend.api_key:
            return {"success": False, "error": "RESEND_API_KEY not configured"}

        result = await resend.Emails.send_async({
            "from": FROM_EMAIL,
            "to": [MANI_EMAIL],
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
        return {"success": True, "id": getattr(result, "id", None)}
    except Exception as e:
        print(f"Email error: {e}")
        return {"success": False, "error": str(e)}
