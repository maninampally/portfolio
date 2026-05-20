from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from routes import contact, chat, feed

app = FastAPI(title="ManiOS Backend", version="1.0.0")

# CORS middleware
# Configure CORS from environment for safer production defaults.
def _normalize_origin(origin: str) -> str:
    value = origin.strip()
    if not value:
        return ""
    if "://" not in value:
        value = f"https://{value}"
    return value.rstrip("/")


origins_env = os.getenv("ALLOWED_ORIGINS", "")
if origins_env:
    allow_origins = [
        normalized
        for normalized in (_normalize_origin(o) for o in origins_env.split(","))
        if normalized
    ]
else:
    # sensible dev defaults; override ALLOWED_ORIGINS in production
    allow_origins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"]

allow_origin_regex = os.getenv("ALLOWED_ORIGIN_REGEX", "").strip() or None
if allow_origin_regex is None and os.getenv("ENABLE_VERCEL_PREVIEW_ORIGINS", "true").lower() in {"1", "true", "yes", "on"}:
    allow_origin_regex = r"^https://.*\.vercel\.app$"

# If wildcard is used, disallow credentials for browser safety
allow_credentials = False if allow_origins == ["*"] else True

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_origin_regex=allow_origin_regex,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(contact.router)
app.include_router(chat.router)
app.include_router(feed.router)

@app.get("/")
async def root():
    """Health check."""
    return {"status": "ok", "service": "ManiOS Backend"}

@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
