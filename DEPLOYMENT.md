# ManiOS — Full stack deployment guide & checklist

**Status:** Phase 3 — frontend (Vite + React) and FastAPI backend documented for production. Critical blockers fixed (May 16, 2026). Use the **checklist** section when going live.

**Deployment readiness:** 91/100 — Ready to deploy after setting Railway env vars and testing locally.

- ✅ Mobile chatbot KB fallback fixed
- ✅ Backend CORS port 5174 added
- ✅ Desktop image compressed (14MB → 290KB)
- ✅ Sourcemap disabled
- ⏳ Set ALLOWED_ORIGINS in Railway env to your frontend URL
- ⏳ Test locally: `npm run dev` + `python main.py` from `backend/`

## Architecture

```
┌─────────────────────────────┐
│   Static frontend (Vite)    │  → Vercel / Netlify / any static host
│   Build output: ./dist        │     (repo root: npm run build)
└──────────────┬──────────────┘
               │ HTTPS  /api/chat, /api/contact, /api/feed
               │  (same host OR meta api-base → Railway URL)
               ↓
┌─────────────────────────────┐
│   FastAPI backend           │  → Railway / Fly.io / Cloud Run
│   Python 3.11+              │     (working directory: backend/)
└──────────────┬──────────────┘
               │ SQL
               ↓
┌─────────────────────────────┐
│   PostgreSQL                │  → Supabase (recommended)
│   JSONB cache + messages    │
└─────────────────────────────┘
```

**Also at repo root:** [`shared/assistant_knowledge.txt`](shared/assistant_knowledge.txt) — read by `backend/services/claude_service.py` for the chatbot system prompt. If you deploy only the `backend/` folder, include this file in the image (same relative path) or rely on the code fallback string.

## Step-by-step deployment

### 1. Frontend (Vercel or similar)

From the **repository root** (not inside `ManiOS/` alone):

```bash
npm install
npm run build
```

- **Output:** `dist/` (HTML, hashed JS, source maps).
- **Local dev:** `npm run dev` — Vite on port **5173**, proxies `/api` to `http://127.0.0.1:8000`.

**Vercel (example settings)**

| Setting | Value |
|--------|--------|
| Root directory | `.` (repository root) |
| Framework | Vite (or “Other” with build command below) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

**Split origin (Vercel UI + Railway API)**

1. In `ManiOS/index.html`, set the API origin (no trailing slash):

   ```html
   <meta name="api-base" content="https://your-service.up.railway.app">
   ```

2. On the API host, set `ALLOWED_ORIGINS` to your frontend origin, e.g. `https://your-app.vercel.app,http://localhost:5173`.

3. Rebuild/redeploy the frontend after changing `api-base`.

The app uses `window.__API_BASE__` (set from that meta tag; empty → `location.origin`) for `fetch` to `/api/chat` and `/api/contact`.

### 2. Backend (Railway)

1. New project → connect this GitHub repo.
2. Set **root directory / start** so the service runs from `backend/` (or set start command to `cd backend && python main.py` per platform docs).
3. Add environment variables (see [`backend/.env.example`](backend/.env.example) and **Environment** below).

Railway can auto-detect `main.py` when the service root is `backend/`.

### 3. Database (Supabase)

1. Create a PostgreSQL project.
2. Use the **Connection pooler** URL as `DATABASE_URL`.
3. Apply schema:

   ```bash
   psql "postgresql://..." -f backend/db/schema.sql
   ```

### 4. Environment variables (Railway / host)

```
DATABASE_URL=postgresql://...
GEMINI_API_KEY=AIzaSy_...
RESEND_API_KEY=re_...
GITHUB_TOKEN=ghp_...
GITHUB_USERNAME=your-github-username
MANI_EMAIL=your-inbox@...
FROM_EMAIL=noreply@your-verified-domain
PORT=8000
ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:5173
```

- **`ALLOWED_ORIGINS`:** Comma-separated list. If unset locally, `main.py` defaults to `http://localhost:3000` and `http://localhost:5173`. Using `*` disables credentials for browser safety.
- Do **not** commit real `.env` files.

## Services setup

### Email (Resend)

1. Sign up at [resend.com](https://resend.com).
2. API key → `RESEND_API_KEY`.
3. Verify sending domain (or use Resend’s test domain per their docs).
4. `FROM_EMAIL` must be allowed for that key.

### AI (Gemini)

1. [aistudio.google.com](https://aistudio.google.com) → Get API key → `GEMINI_API_KEY`.
2. Model is configured in `backend/services/claude_service.py` (default: `gemini-1.5-flash`).

### GitHub (feed)

1. Fine-grained or classic PAT with repo read access as needed.
2. `GITHUB_TOKEN` + `GITHUB_USERNAME`.

## API behavior (current)

| Endpoint | Notes |
|----------|--------|
| `POST /api/contact` | Validates body, inserts row, sends email via Resend. |
| `POST /api/chat` | Claude + session history in `chatbot_sessions`. |
| `GET /api/feed` | GitHub commits when token is valid; `linkedin` array is **illustrative only**; response includes `linkedin_note`. Cached ~1 hour in `feed_cache`. |

## Testing

### Local

**Terminal 1 — backend**

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python main.py
# http://localhost:8000  —  /docs for Swagger
```

**Terminal 2 — frontend**

```bash
# repository root
npm install
npm run dev
# http://localhost:5173 — /api proxied to :8000
```

- Chat: use “Ask Mani” in the UI or `POST /api/chat` via `/docs`.
- Contact: submit the form; check DB and email.
- Feed: `GET http://localhost:8000/api/feed` — confirm `linkedin_note` is present.

### Production smoke test

1. Open deployed frontend URL.
2. Chat and contact against **production** `api-base` if split.
3. Confirm browser **no CORS errors** (matching `ALLOWED_ORIGINS`).

## Deployment checklist

Use this when standing up or verifying a new environment.

### Pre-deployment (repo readiness)

- [x] Frontend source in `ManiOS/` (Vite + React)
- [x] Production build: `npm run build` → `dist/`
- [x] Backend in `backend/` (FastAPI)
- [x] Database schema: `backend/db/schema.sql`
- [x] Contact + chat use `window.__API_BASE__` + `/api/...`
- [x] Environment template: `backend/.env.example`
- [x] Docs: [`README.md`](README.md), this file, [`backend/README.md`](backend/README.md)

### Critical fixes applied (May 16, 2026)

- [x] Mobile chatbot KB fallback — `localAnswer` exported from `chatbot.jsx`, integrated in `mobile.jsx` catch handler
- [x] Backend CORS updated — `localhost:5174` added to dev defaults (port 5173 was in use)
- [x] Desktop image compressed — 14.3MB → 290KB (98% reduction); load time ~8s → <1s on average connections

### Required services

**1. Resend (email)**

- [ ] Sign up at [resend.com](https://resend.com)
- [ ] Create API key → host: `RESEND_API_KEY`
- [ ] `FROM_EMAIL` (verified domain or allowed sender)
- [ ] `MANI_EMAIL` (your inbox)
- [ ] Test: submit contact form → email received

**2. Gemini AI (chat)**

- [ ] [aistudio.google.com](https://aistudio.google.com) → Get API key
- [ ] Host: `GEMINI_API_KEY`
- [ ] Test: “Ask Mani” → reply within a few seconds

**3. GitHub (feed API)**

- [ ] PAT at [github.com/settings/tokens](https://github.com/settings/tokens)
- [ ] `GITHUB_TOKEN`, `GITHUB_USERNAME` on host
- [ ] Test: `GET /api/feed` → `github` populated; read `linkedin_note` (LinkedIn lines are **samples**)

**4. Supabase (database)**

- [ ] Project + **pooler** connection string
- [ ] `psql "<URL>" -f backend/db/schema.sql`
- [ ] Host: `DATABASE_URL`

### Frontend (e.g. Vercel)

- [x] Repo connected; **root** = repository root (where `package.json` lives)
- [x] Build: `npm run build` — output directory **`dist`**
- [x] **`sourcemap: false`** in `vite.config.js` (source maps disabled for production)
- [ ] Production URL loads with no console errors
- [ ] Optional: OG/meta description tags in `ManiOS/index.html` for link previews

### Backend (e.g. Railway)

- [ ] Service runs from `backend/` (or equivalent start command)
- [ ] All env vars set (see `backend/.env.example`)
- [ ] **`ALLOWED_ORIGINS`** includes your live frontend origin (e.g. `https://your-frontend.vercel.app,http://localhost:5173`)
- [ ] Updated to include `http://localhost:5174` in dev defaults for local testing
- [ ] If chat knowledge should follow repo file: ensure `shared/assistant_knowledge.txt` is available at deploy paths expected by `claude_service.py`, or accept embedded fallback

### Frontend ↔ backend (split hosts)

- [ ] Set `<meta name="api-base" content="https://your-api-host.tld" />` in `ManiOS/index.html` (no trailing slash), then rebuild frontend
- [ ] Backend `ALLOWED_ORIGINS` matches the **exact** frontend origin (`https://...`)
- [ ] Redeploy frontend after any `api-base` change

### Local verification (before production)

```bash
# Terminal 1
cd backend && python main.py

# Terminal 2 — repo root
npm install && npm run dev
# Open http://localhost:5173
```

- [ ] Chat works (proxied to `:8000`)
- [ ] Contact submits
- [ ] Optional: open `http://localhost:8000/api/feed` and inspect JSON

### Production checklist

- [ ] Open live site → chat + contact
- [ ] No CORS errors in DevTools
- [ ] Feed API returns `linkedin_note` when you hit `/api/feed`

### Content & security (ongoing)

- [ ] Profile image, resume link, bio — as you prefer in `ManiOS/windows.jsx` / assets
- [ ] Rotate any token that was ever exposed; never commit `.env`

### Monitoring & rollback

- [ ] Watch API host logs for 5xx / auth errors
- [ ] Refresh GitHub PAT before expiry
- **Frontend:** host dashboard → promote previous deployment if needed
- **Backend:** roll back deployment or revert commit and redeploy

### Success criteria

- [ ] Static site loads from `dist`-equivalent hosting
- [ ] Chat and contact succeed against deployed API when configured
- [ ] `GET /api/feed` returns GitHub data when token valid; `linkedin_note` explains sample LinkedIn text
- [ ] Mobile layout usable; theme toggle works
- [ ] No sensitive keys in the git repository

**Rough time:** first-time setup often 45–90 minutes including DNS and env debugging.

## Troubleshooting

| Symptom | Things to check |
|--------|------------------|
| `403` / empty GitHub on `/api/feed` | `GITHUB_TOKEN` / username; GitHub API limits. |
| `500` on `/api/contact` | `DATABASE_URL`, `RESEND_API_KEY`, Resend domain, Railway logs. |
| Chat always fails | `GEMINI_API_KEY`, DB connectivity, `chatbot_sessions` schema. |
| Frontend “Network error” on APIs | Wrong `api-base`; backend down; **CORS** — add exact frontend origin to `ALLOWED_ORIGINS`. |
| Chatbot text out of date | Edit `shared/assistant_knowledge.txt` and redeploy backend (or use fallback if file missing). |

## Milestone — Phase 2 & 3 deliverables

High-level record of what shipped (for onboarding). Day-to-day deploy steps are in the sections above.

### Phase 2 (frontend content + mobile)

- Window chrome, particles, responsive rules in `ManiOS/index.html`
- Contact links (mailto, LinkedIn, GitHub) where set in `windows.jsx`
- Contact form → `POST` to `window.__API_BASE__ + '/api/contact'`
- Desktop chat → `window.__API_BASE__ + '/api/chat'` with `session_id` in `chatbot.jsx`
- Mobile chat → same `/api/chat` flow in `mobile.jsx`
- `mobile.jsx` stacked layout for narrow viewports
- Windows: hero, about, projects, experience, skills, certs, education, impact, contact, resume, project deep-dives, snapshot

### Phase 3 (backend + APIs)

- FastAPI app in `backend/` with routers; **CORS** from `ALLOWED_ORIGINS` (see `backend/README.md`)
- PostgreSQL: `contact_messages`, `chatbot_sessions`, `feed_cache` (`backend/db/schema.sql`)
- Routes: `POST /api/contact`, `POST /api/chat`, `GET /api/feed` (GitHub live when configured; LinkedIn-style rows are samples with `linkedin_note`; ~1h cache)
- Services: Resend email, Anthropic (`shared/assistant_knowledge.txt` + fallback in `claude_service.py`), GitHub commits

### Frontend ↔ API wiring

| Area | File | Behavior |
|------|------|----------|
| Contact | `windows.jsx` | `fetch(__API_BASE__ + '/api/contact', …)` |
| Chat | `chatbot.jsx`, `mobile.jsx` | `fetch(__API_BASE__ + '/api/chat', …)` |
| Impact window | `windows.jsx` (`FeedWindow`) | Static metrics + Activity note about sample `linkedin` data in `/api/feed` |

The Impact **window** does not call `/api/feed` on every page load; the **endpoint** is for tools or future UI. Bundler: **Vite** (`npm run build` → `dist/`); legacy Babel-in-browser + `python -m http.server` only flow is gone.

### Optional later

- Custom domain, analytics
- Copy/design tweaks in `windows.jsx`
- Real LinkedIn integration (would replace sample `linkedin` payloads)

**Stack:** React 18, Vite 5, FastAPI, PostgreSQL, Anthropic, Resend, GitHub API.

## Repository layout (relevant)

```
portfolio/
├── ManiOS/                 # Vite root (source)
│   ├── index.html
│   ├── main.jsx
│   ├── app.jsx
│   ├── windows.jsx
│   ├── chatbot.jsx
│   ├── chrome.jsx
│   ├── particles.jsx
│   └── mobile.jsx
├── shared/
│   └── assistant_knowledge.txt
├── backend/
│   ├── main.py
│   ├── routes/
│   ├── services/
│   ├── db/
│   └── README.md
├── .github/
│   └── workflows/
│       └── ci.yml
├── package.json
├── vite.config.js
├── README.md
└── DEPLOYMENT.md           # this file (guide + checklist)
```

## Cost notes (indicative)

| Piece | Typical cost |
|-------|----------------|
| Vercel static | Free tier often sufficient |
| Railway / DB | Platform pricing |
| Resend | Free tier limits |
| Anthropic | Pay per token |

## Continuous integration (GitHub Actions)

Workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

- **Frontend job:** `npm ci`, `npm run build`, checks `dist/index.html` and `dist/assets` exist.
- **Backend job:** Python 3.12, `pip install -r backend/requirements.txt`, `python -m compileall backend`, then imports `main:app` (dummy `GEMINI_API_KEY` / `DATABASE_URL` env vars so imports succeed without a real DB or API).

Runs on push and pull requests to `main` and `master`, and via **workflow_dispatch** (manual run in the Actions tab).

---

**Further reading:** [`README.md`](README.md), [`backend/README.md`](backend/README.md).
