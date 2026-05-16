# ManiOS portfolio

Interactive portfolio (desktop OS metaphor) with an optional **FastAPI** backend for contact, chat, and feed APIs.

## Frontend (Vite + React)

```bash
npm install
npm run dev     # http://localhost:5173 — proxies /api to http://127.0.0.1:8000
npm run build   # static output in ./dist
```

- Source lives in [`ManiOS/`](ManiOS/index.html).
- **Split deploy:** set `<meta name="api-base" content="https://your-api-host" />` in `ManiOS/index.html` (trimmed; empty means same-origin). The app calls `window.__API_BASE__ + '/api/...'`.
- Assistant facts for the **API chatbot** are loaded from [`shared/assistant_knowledge.txt`](shared/assistant_knowledge.txt) on the server (`backend/services/claude_service.py`).

## CI

GitHub Actions runs on every push/PR to `main` or `master`: Vite production build + Python `compileall` and FastAPI import. See [`.github/workflows/ci.yml`](.github/workflows/ci.yml) and [`DEPLOYMENT.md`](DEPLOYMENT.md#continuous-integration-github-actions).

## Backend

See [`backend/README.md`](backend/README.md). Set `ALLOWED_ORIGINS` to your frontend origin(s) in production. Never commit `.env`; rotate any token that was exposed in git history.

**Deploy tip:** If the API is built from a **backend-only** artifact, ship [`shared/assistant_knowledge.txt`](shared/assistant_knowledge.txt) alongside it (or rely on the Python fallback in `claude_service.py`). Full layout, checklist, and phase-2/3 milestone notes: [`DEPLOYMENT.md`](DEPLOYMENT.md).
