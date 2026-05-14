# ManiOS Backend — Phase 3

FastAPI backend for ManiOS portfolio with contact form, AI chatbot, and GitHub/LinkedIn feed integration.

## Quick Start

### 1. Setup Local Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

Required:
- `DATABASE_URL` — PostgreSQL connection string
- `ANTHROPIC_API_KEY` — Claude API key (get from console.anthropic.com)
- `RESEND_API_KEY` — Email service (sign up at resend.com)
- `GITHUB_TOKEN` — Personal access token (github.com/settings/tokens)

Chatbot copy: when the service runs from a **full repo checkout**, `shared/assistant_knowledge.txt` at the repository root is loaded by `claude_service.py`. Backend-only deploys should include that file next to `backend/` (see `DEPLOYMENT.md`) or rely on the built-in fallback string in code.

### ALLOWED_ORIGINS & API base (split deploys)

The backend reads an optional `ALLOWED_ORIGINS` environment variable (comma-separated) to configure CORS. In production set this to your frontend origin(s) (for example, `https://your-site.vercel.app`). Example:

```bash
# allow only the production frontend and localhost for testing
export ALLOWED_ORIGINS="https://your-site.vercel.app,http://localhost:5173"
```

Notes:
- If you use `ALLOWED_ORIGINS="*"` the server will disable credentials for browser safety.
- When serving frontend and backend from different origins, set a runtime API base on the frontend. The `ManiOS/index.html` includes a `meta` tag you can set to point requests to the API host (defaults to same-origin):

```html
<meta name="api-base" content="https://api.your-site.com">
```

Or set the `content` at deploy-time in your hosting provider. The frontend will use `window.__API_BASE__` internally to call `/api/*` endpoints.

Security reminder: rotate any tokens that were exposed, and ensure `.env` is added to `.gitignore` so secrets are not committed.

### 3. Setup Database

```bash
# Using Supabase (recommended):
# 1. Create project at supabase.com
# 2. Get connection string from Settings > Database > Connection String
# 3. Paste into DATABASE_URL in .env

# Run schema
psql $DATABASE_URL < db/schema.sql
```

### 4. Run Locally

```bash
python main.py
# Runs on http://localhost:8000
```

Visit `http://localhost:8000/docs` for interactive API explorer.

## API Endpoints

### POST /api/contact
Submit contact form.

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Job Opportunity",
  "message": "Interested in working together..."
}
```

### POST /api/chat
Chat with Claude assistant.

```json
{
  "message": "What does Mani specialize in?",
  "session_id": "optional_session_id"
}
```

### GET /api/feed
Returns GitHub commit data (when `GITHUB_TOKEN` is set) plus an illustrative `linkedin` array. The response always includes `linkedin_note` explaining that LinkedIn lines are samples, not live posts.

## Deployment

### Railway (Recommended)

1. Push code to GitHub
2. Create new project at railway.app
3. Connect repository
4. Add environment variables in Railway dashboard
5. Deploy

Railway auto-detects `main.py` and deploys.

### Vercel (Frontend Only)

The UI is a **Vite + React** app under `ManiOS/`. From the repository root:

```bash
npm install
npm run build   # output: ../dist (served as static files)
npm run dev     # Vite on :5173, proxies /api → http://127.0.0.1:8000
```

Set the API host for split deploys with the `api-base` meta tag in `ManiOS/index.html` (see the **ALLOWED_ORIGINS & API base** section above). The built app uses `window.__API_BASE__` for `/api/chat` and `/api/contact`.

The FastAPI service must run separately (Railway, Fly.io, etc.) with `ALLOWED_ORIGINS` including your static site origin.

## Environment Variables Reference

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MANI_EMAIL=your-email@example.com
FROM_EMAIL=noreply@yourdomain.com

# AI (Anthropic)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# GitHub
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_USERNAME=your-github-username

# Server
PORT=8000
ENVIRONMENT=production

# CORS (production)
ALLOWED_ORIGINS=https://your-site.vercel.app
```

## Troubleshooting

**"ModuleNotFoundError: No module named 'psycopg2'"**
```bash
pip install psycopg2-binary
```

**"ANTHROPIC_API_KEY not found"**
- Create key at console.anthropic.com
- Add to `.env` file
- Restart server

**"Connection refused" on DATABASE_URL**
- Verify PostgreSQL is running
- Check connection string format
- For Supabase, use the "Connection Pooler" URL

## Files

```
backend/
├── main.py                # FastAPI app
├── routes/
│   ├── contact.py         # Contact form endpoint
│   ├── chat.py            # Chatbot endpoint
│   └── feed.py            # GitHub/LinkedIn feed endpoint
├── services/
│   ├── email_service.py   # Resend integration
│   ├── claude_service.py  # Anthropic; loads ../shared/assistant_knowledge.txt when present
│   └── github_service.py  # GitHub API fetching
├── db/
│   ├── connection.py      # Database helpers
│   └── schema.sql         # PostgreSQL schema
├── requirements.txt
├── .env.example
└── README.md
```
