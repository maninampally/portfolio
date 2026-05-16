"""
Minimal standalone server — serves /api/github-activity only.
No DB, no psycopg2. Run with:
  python github_server.py
"""
import os
import time
import asyncio
from datetime import datetime, timezone

import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

GITHUB_USERNAME = os.getenv("GITHUB_USERNAME", "maninampally")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
TTL = 3600  # 1 hour

app = FastAPI(title="ManiOS GitHub Feed", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

_cache: dict = {"data": None, "at": 0.0}


def _headers():
    h = {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}
    if GITHUB_TOKEN:
        h["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    return h


def _relative(iso: str) -> str:
    dt = datetime.fromisoformat(iso.replace("Z", "+00:00"))
    delta = datetime.now(timezone.utc) - dt
    if delta.days > 7:
        return f"{delta.days // 7}w ago"
    if delta.days > 0:
        return f"{delta.days}d ago"
    if delta.seconds > 3600:
        return f"{delta.seconds // 3600}h ago"
    if delta.seconds > 60:
        return f"{delta.seconds // 60}m ago"
    return "just now"


async def _fetch_commits():
    async with httpx.AsyncClient(timeout=10) as client:
        repos_r = await client.get(
            f"https://api.github.com/users/{GITHUB_USERNAME}/repos",
            headers=_headers(),
            params={"sort": "updated", "per_page": 10, "type": "owner"},
        )
        repos_r.raise_for_status()
        repos = repos_r.json()

        commits = []
        for repo in repos[:6]:
            try:
                c_r = await client.get(
                    f"https://api.github.com/repos/{GITHUB_USERNAME}/{repo['name']}/commits",
                    headers=_headers(),
                    params={"per_page": 2},
                )
                if c_r.status_code != 200:
                    continue
                for c in c_r.json()[:1]:
                    commits.append({
                        "repo": repo["name"],
                        "message": c["commit"]["message"].split("\n")[0][:72],
                        "date": _relative(c["commit"]["author"]["date"]),
                        "url": c["html_url"],
                        "author": c["commit"]["author"]["name"],
                    })
            except Exception:
                continue

        return commits[:8]


@app.get("/")
async def root():
    return {"status": "ok", "service": "ManiOS GitHub Feed"}


@app.get("/api/github-activity")
async def github_activity():
    global _cache
    now = time.time()
    if _cache["data"] and (now - _cache["at"]) < TTL:
        return _cache["data"]

    try:
        commits = await _fetch_commits()
        result = {
            "commits": commits,
            "cached_at": datetime.utcnow().isoformat(),
            "ttl_seconds": TTL,
            "username": GITHUB_USERNAME,
        }
        _cache = {"data": result, "at": now}
        return result
    except Exception as e:
        print(f"GitHub fetch error: {e}")
        if _cache["data"]:
            return _cache["data"]
        return {"commits": [], "error": str(e), "cached_at": None}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("GITHUB_SERVER_PORT", 8001))
    print(f"Starting GitHub feed server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
