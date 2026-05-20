from fastapi import APIRouter, HTTPException
from datetime import datetime
import json
import time
from db.connection import execute_single, execute_insert
from services.github_service import get_github_commits

router = APIRouter(prefix="/api", tags=["feed"])

# In-memory cache — no DB required
_gh_cache: dict = {"data": None, "at": 0}
_GH_TTL = 3600  # 1 hour


@router.get("/github-activity")
async def github_activity():
    """Live GitHub commits with in-memory cache. No DB needed."""
    global _gh_cache
    now = time.time()
    if _gh_cache["data"] and (now - _gh_cache["at"]) < _GH_TTL:
        return _gh_cache["data"]
    try:
        commits = await get_github_commits()
        result = {
            "commits": commits,
            "cached_at": datetime.utcnow().isoformat(),
            "ttl_seconds": _GH_TTL,
        }
        _gh_cache = {"data": result, "at": now}
        return result
    except Exception as e:
        print(f"GitHub activity error: {e}")
        if _gh_cache["data"]:
            return _gh_cache["data"]
        raise HTTPException(status_code=503, detail="GitHub API unavailable")

LINKEDIN_NOTE = (
    "The `linkedin` array contains illustrative sample-style items only; "
    "they are not synced from LinkedIn."
)


def _ensure_feed_metadata(payload):
    """Attach disclaimer for cached JSONB dicts that predate `linkedin_note`."""
    if payload is None:
        return payload
    if isinstance(payload, str):
        try:
            payload = json.loads(payload)
        except json.JSONDecodeError:
            return payload
    if not isinstance(payload, dict):
        return payload
    out = dict(payload)
    out.setdefault("linkedin_note", LINKEDIN_NOTE)
    return out


LINKEDIN_POSTS = [
    {
        "text": "Three things I learned shipping my first production RAG system — context windows, eval discipline, and never trusting cosine similarity blindly.",
        "date": "3d ago"
    },
    {
        "text": "Why I think dbt + Airflow still wins for mid-sized teams in 2026.",
        "date": "1w ago"
    },
    {
        "text": "A weekend rewrite of my Power BI dashboard taught me more about caching than any blog post ever did.",
        "date": "2w ago"
    },
    {
        "text": "Just passed AWS AI Practitioner. Notes + study plan in comments.",
        "date": "3w ago"
    },
    {
        "text": "On building portfolios that actually feel like the engineer who built them.",
        "date": "1mo ago"
    }
]

_feed_mem_cache: dict = {"data": None, "at": 0}
_FEED_TTL = 3600


@router.get("/feed")
async def get_feed():
    """Fetch GitHub commits plus illustrative LinkedIn-style samples (not live LinkedIn)."""
    global _feed_mem_cache
    now = time.time()

    # Try DB cache first
    try:
        cached = execute_single(
            "SELECT data, cached_at FROM feed_cache WHERE key = 'live_feed' AND expires_at > NOW()"
        )
        if cached:
            return _ensure_feed_metadata(cached["data"])
    except Exception as e:
        print(f"Feed DB cache read skipped: {e}")

    # In-memory cache fallback
    if _feed_mem_cache["data"] and (now - _feed_mem_cache["at"]) < _FEED_TTL:
        return _feed_mem_cache["data"]

    # Fetch fresh
    try:
        github_commits = await get_github_commits()
    except Exception as e:
        print(f"GitHub fetch error: {e}")
        github_commits = []

    feed_data = {
        "github": github_commits,
        "linkedin": LINKEDIN_POSTS,
        "linkedin_note": LINKEDIN_NOTE,
        "timestamp": datetime.utcnow().isoformat(),
    }

    _feed_mem_cache = {"data": feed_data, "at": now}

    # Try DB write (best-effort)
    try:
        execute_insert(
            "INSERT INTO feed_cache (key, data, expires_at) VALUES (%s, %s, NOW() + INTERVAL '1 hour') ON CONFLICT (key) DO UPDATE SET data = %s, expires_at = NOW() + INTERVAL '1 hour'",
            ("live_feed", json.dumps(feed_data), json.dumps(feed_data))
        )
    except Exception as e:
        print(f"Feed DB cache write skipped: {e}")

    return feed_data
