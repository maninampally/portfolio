import os
import httpx
from datetime import datetime, timedelta

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_USERNAME = os.getenv("GITHUB_USERNAME", "maninampally")
CACHE_TTL = 3600  # 1 hour

headers = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}

async def get_github_commits():
    """Fetch latest commits from GitHub."""
    try:
        async with httpx.AsyncClient() as client:
            # Get user repos
            repos_resp = await client.get(
                f"https://api.github.com/users/{GITHUB_USERNAME}/repos",
                headers=headers,
                params={"sort": "updated", "per_page": 10}
            )
            repos = repos_resp.json()

            commits = []
            for repo in repos[:5]:  # Get commits from top 5 repos
                try:
                    commits_resp = await client.get(
                        f"https://api.github.com/repos/{GITHUB_USERNAME}/{repo['name']}/commits",
                        headers=headers,
                        params={"per_page": 2}
                    )
                    repo_commits = commits_resp.json()
                    for commit in repo_commits[:1]:  # Top commit per repo
                        commits.append({
                            "repo": repo["name"],
                            "message": commit["commit"]["message"].split("\n")[0][:60],
                            "date": format_date(commit["commit"]["author"]["date"]),
                            "url": commit["html_url"]
                        })
                except:
                    pass

            return commits[:5]
    except Exception as e:
        print(f"GitHub error: {e}")
        return []

def format_date(iso_date: str):
    """Convert ISO date to relative time."""
    dt = datetime.fromisoformat(iso_date.replace("Z", "+00:00"))
    now = datetime.now(dt.tzinfo)
    delta = now - dt

    if delta.days > 7:
        return f"{delta.days // 7}w ago"
    elif delta.days > 0:
        return f"{delta.days}d ago"
    elif delta.seconds > 3600:
        return f"{delta.seconds // 3600}h ago"
    elif delta.seconds > 60:
        return f"{delta.seconds // 60}m ago"
    else:
        return "now"
