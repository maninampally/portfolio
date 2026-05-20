from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import uuid
import json
from services.claude_service import chat_with_claude, create_chat_session
from db.connection import execute_single, execute_insert

router = APIRouter(prefix="/api", tags=["chat"])

class ChatMessage(BaseModel):
    message: str
    session_id: str = None

@router.post("/chat")
async def chat(data: ChatMessage):
    """Handle chat messages via Claude."""
    try:
        session_id = data.session_id or str(uuid.uuid4())

        # Try to load session history from DB (best-effort)
        history = create_chat_session()
        try:
            cached = execute_single(
                "SELECT messages FROM chatbot_sessions WHERE id = %s",
                (session_id,)
            )
            if cached and cached.get('messages') is not None:
                raw = cached.get('messages')
                if isinstance(raw, list):
                    history = raw
                else:
                    try:
                        history = json.loads(raw)
                    except Exception:
                        pass
        except Exception as e:
            print(f"Chat DB session read skipped: {e}")

        result = await chat_with_claude(data.message, history)
        reply = result["reply"]
        new_history = result["history"]

        # Persist session (best-effort)
        try:
            execute_insert(
                "INSERT INTO chatbot_sessions (id, messages, updated_at) VALUES (%s, %s, NOW()) ON CONFLICT (id) DO UPDATE SET messages = %s, updated_at = NOW()",
                (session_id, json.dumps(new_history), json.dumps(new_history))
            )
        except Exception as e:
            print(f"Chat DB session write skipped: {e}")

        return {
            "reply": reply,
            "session_id": session_id
        }
    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="Chat failed")
