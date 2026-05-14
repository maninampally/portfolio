import asyncio
import os
from pathlib import Path

import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

_SHARED_KNOWLEDGE = Path(__file__).resolve().parents[2] / "shared" / "assistant_knowledge.txt"

_FALLBACK_KNOWLEDGE = """Manikanth Nampally (Mani) is a Data Engineer with 2.5 years of experience, graduating May 2026 from Florida Atlantic University with an MS in Information Technology & Management (GPA 3.9), based in Boca Raton, FL.

Skills: Python, PySpark, SQL, Scala, Bash, SparkSQL, Apache Spark, Spark Structured Streaming, Kafka, Flink, Airflow, dbt Core, Databricks, Delta Lake, Apache Iceberg, Apache Beam, Great Expectations, AWS, GCP, Azure, Snowflake, Redshift, BigQuery, PostgreSQL, TimescaleDB, MongoDB, MLflow, LangGraph, pgvector, PyTorch, TensorFlow, FinBERT, Evidently AI, Docker, Kubernetes, GitHub Actions, Power BI, Tableau.

Experience: Data Engineer at Opsylux LLC (Nov 2025–Present); Data Engineer at LTIMindtree (May 2022–Jul 2024).

Impact: 10+ TB/day, 708M+ auth events, 99%+ reliability, 2h to <5min latency, 0.992 F1.

Certifications: AWS Cloud Practitioner, AWS AI Practitioner.

Projects (selected): Real-Time Security Analytics; Artha AI; FinSentinel; Network Security; Repo2Jac; StockSense; Fintech Pipeline; MLOps Suite.

Status: Based in Boca Raton FL, open to remote and relocation.

Target roles: Data Engineer, AI/ML Engineer, MLOps Engineer, Cloud Data Engineer."""


def _load_assistant_knowledge() -> str:
    try:
        return _SHARED_KNOWLEDGE.read_text(encoding="utf-8").strip()
    except OSError:
        return _FALLBACK_KNOWLEDGE.strip()


SYSTEM_PROMPT = f"""You are Mani's portfolio assistant. You help recruiters and visitors learn about Manikanth Nampally.

Rules:
- Be friendly, concise, professional
- Never invent facts not listed in the knowledge below
- If unsure, say: "You can reach Mani directly via the Contact window"
- Keep answers under 3 sentences unless detail is requested

Knowledge:
{_load_assistant_knowledge()}
"""


def create_chat_session():
    """Create new conversation history."""
    return []


async def chat_with_gemini(message: str, conversation_history: list = None):
    """Send message to Gemini and get response."""
    if conversation_history is None:
        conversation_history = []

    try:
        # Initialize Gemini model
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=SYSTEM_PROMPT,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=500,
                temperature=0.7
            )
        )

        # Build chat history for Gemini
        # Gemini expects list of {"role": "user"/"model", "parts": [{"text": "..."}]}
        gemini_history = []
        for msg in conversation_history:
            gemini_history.append({
                "role": msg["role"],
                "parts": [{"text": msg["content"]}]
            })

        # Start chat session
        chat_session = model.start_chat(history=gemini_history)

        # Send message and get response (run in thread to avoid blocking)
        response = await asyncio.to_thread(
            chat_session.send_message,
            message
        )

        assistant_message = response.text

        # Append user and assistant messages to history
        conversation_history.append({
            "role": "user",
            "content": message
        })
        conversation_history.append({
            "role": "assistant",
            "content": assistant_message
        })

        return {
            "reply": assistant_message,
            "history": conversation_history[-6:]  # Keep last 3 exchanges
        }
    except Exception as e:
        print(f"Gemini error: {e}")
        return {
            "reply": "Sorry, I'm having trouble responding. Try again or reach out via the Contact window.",
            "history": conversation_history
        }


# Maintain backward compatibility alias
async def chat_with_claude(message: str, conversation_history: list = None):
    """Backward compatible wrapper for chat_with_gemini."""
    return await chat_with_gemini(message, conversation_history)
