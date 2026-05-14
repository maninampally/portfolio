from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import uuid
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

        # Get conversation history from cache (or start new)
        cached = execute_single(
            "SELECT messages FROM chatbot_sessions WHERE id = %s",
            (session_id,)
        )
        # Database returns JSONB as Python objects via RealDictCursor; ensure we have a list
        if cached and cached.get('messages') is not None:
            history = cached.get('messages')
            if not isinstance(history, list):
                try:
                    import json as _json
                    history = _json.loads(history)
                except Exception:
                    history = create_chat_session()
        else:
            history = create_chat_session()

        # Get Claude response
        result = await chat_with_claude(data.message, history)
        reply = result["reply"]
        new_history = result["history"]

        # Cache updated history
        import json
        execute_insert(
            "INSERT INTO chatbot_sessions (id, messages, updated_at) VALUES (%s, %s, NOW()) ON CONFLICT (id) DO UPDATE SET messages = %s, updated_at = NOW()",
            (session_id, json.dumps(new_history), json.dumps(new_history))
        )

        return {
            "reply": reply,
            "session_id": session_id
        }
    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="Chat failed")
