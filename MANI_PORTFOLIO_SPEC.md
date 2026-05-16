# Mani Portfolio — Complete Build Specification
**Version:** 3.0 Final | **Owner:** Manivelrajan | **May 2026**
**Status:** All decisions locked. Build without asking clarifying questions.

> **Repository reality (May 2026):** The shipped app uses **Vite** at the repo root (`npm run build` → `dist/`), React modules under `ManiOS/`, and **inline styles in JSX** (this spec mentions Tailwind in places; the current UI does not use Tailwind). The database matches `backend/db/schema.sql` (`contact_messages`, `chatbot_sessions`, `feed_cache` — not a separate `chatbot_knowledge` table). `GET /api/feed` returns GitHub data when configured plus **sample** LinkedIn-style posts and a `linkedin_note` field. Split deployment uses `ManiOS/index.html` **`meta name="api-base"`** and backend **`ALLOWED_ORIGINS`**. Operational docs: [`README.md`](README.md), [`DEPLOYMENT.md`](DEPLOYMENT.md), [`backend/README.md`](backend/README.md).

---

## 1. Who This Is For

**Owner:** Manivelrajan — Data & AI Engineer, MS Information Technology & Management,
Florida Atlantic University, GPA 3.9, graduating May 2026.

**Target audiences:** Tech Recruiters, Hiring Managers, Collaborators, Side-project Partners.

**The ONE impression to create:**
> In the first 2 seconds, visitors must feel: *"He's a product thinker AND an engineer — he builds things people actually use."*

**Target roles:** Data Engineer, AI/ML Engineer, MLOps Engineer, Cloud Data Engineer.

---

## 2. Format — Custom Original OS Desktop

**This is NOT a macOS clone. NOT a Windows clone.**
Build a fully original "ManiOS" desktop environment with custom-designed UI chrome.
No Apple logos. No Windows Start button. No trademarked UI patterns.
Everything — window frames, dock, icons, taskbar — is original design.

### Core OS Components

| Component | Spec |
|---|---|
| **Top bar** | Custom menu bar — left: "ManiOS v1.0" wordmark, right: clock + dark/light toggle + status dot |
| **Wallpaper** | Live HTML5 Canvas particle animation — dark bg, glowing data nodes connecting with lines, subtle movement |
| **Desktop** | Icon grid — 6 shortcut icons arranged cleanly on the desktop |
| **Dock / Rail** | Bottom dock — frosted glass panel, icon labels on hover, subtle bounce on click |
| **Windows** | Custom window chrome — colored close/minimize/maximize dots, draggable title bar, resize handle |
| **Window stack** | Multiple windows open simultaneously, z-index management, click to bring to front |
| **Spotlight** | Press `/` or click search icon → command palette slides down → type to jump to any section |

### Default State on Page Load
When the portfolio first loads, **3 windows open automatically** in a staggered cascade:
1. **About** — top-left area
2. **Projects** — center
3. **Contact** — bottom-right

All other sections accessible via dock or desktop icons.

---

## 3. Visual Design Direction

### Aesthetic Tone
**"Precision Dark"** — the feeling of a senior engineer's workstation.
Dark, focused, warm accents. Not cold. Not neon cyberpunk. Not playful.
Think: a beautifully configured dev environment that also happens to be a portfolio.

### Color System (fully custom)
```
Background base:    #0a0a0f  (near black, slightly blue-tinted)
Surface / windows:  #13131a  (dark panel)
Surface elevated:   #1c1c26  (window title bar, dock)
Border:             #2a2a3a  (window edges)
Accent primary:     #6C63FF  (electric indigo — buttons, active states, links)
Accent secondary:   #1DB88E  (teal green — success, skills, tags)
Accent warm:        #F5A623  (amber — highlights, certifications)
Text primary:       #F0F0FF  (near white, slightly blue)
Text secondary:     #8888AA  (muted)
Text tertiary:      #4a4a6a  (hints, timestamps)
```

### Typography
```
Display headings:   'Syne' (Google Fonts) — bold, geometric
Body text:          'Inter' — clean, readable
Monospace accents:  'JetBrains Mono' — for code snippets, skill tags, metadata
```

### Window Chrome Design
- Title bar: `#1c1c26`, 36px tall, draggable
- Window control dots: left-aligned, 12px circles
  - Close: `#FF5F57`
  - Minimize: `#FEBC2E`
  - Maximize: `#28C840`
- Window title: centered, 13px, text-secondary, monospace font
- Body: `#13131a` background, 1px border `#2a2a3a`, `border-radius: 10px`
- Resize handle: bottom-right corner grip icon

### Dock Design
- Height: 60px, `border-radius: 16px`
- Background: `rgba(28, 28, 38, 0.75)` with `backdrop-filter: blur(20px)`
- Border: `1px solid rgba(255,255,255,0.08)`
- Icon size: 40px default, magnifies to 56px on hover (Framer Motion spring)
- Icon labels: appear above on hover, 11px monospace font

### Particle Wallpaper
- Canvas fills full viewport behind everything
- ~80 nodes, slow random movement
- Nodes: small circles, `rgba(108, 99, 255, 0.6)`
- Connection lines when nodes within 120px: `rgba(108, 99, 255, 0.15)`
- Subtle pulse animation on nodes
- Uses requestAnimationFrame, pauses when tab not visible

---

## 4. All 13 Sections

### Dock Icons (10 windows)

**1. Hero / Home**
- Full name: Manivelrajan (goes by Mani)
- Title: "Data & AI Engineer"
- Tagline: "I build data systems, AI products, and tools people actually use."
- Status badge: green dot + "Open to Work"
- Links: GitHub, LinkedIn, Resume download
- Location: Boca Raton, FL

**2. About Me** ← opens by default
- Short bio — PLACEHOLDER until Mani provides
- Photo: circle avatar, initials "MR" in accent color (placeholder)
- Quick facts: University, GPA, Graduation, OPT eligible
- Personality line: "I think like a product person and build like an engineer."

**3. Projects** ← opens by default
- Card grid, 2 columns
- Each card: name, 1-line description, tech stack tags, status badge, link icon
- Projects (PLACEHOLDER — Mani to fill descriptions):
  - Artha AI — fintech philosophy-based stock research platform
  - Power BI Stock Dashboard — yfinance → PostgreSQL → Power BI
  - Additional projects Mani provides

**4. Experience**
- Vertical timeline
- Opsylux LLC — Data Engineer Intern (current)
- LTIMindtree — Data Engineer (prior)
- PLACEHOLDER bullets — Mani to fill

**5. Skills & Tools**
- Grouped by category:
  - Languages: Python, SQL, Scala
  - Data Engineering: PySpark, Airflow, dbt, Databricks, Kafka
  - Cloud: AWS, Azure, Terraform
  - Containers: Docker, Kubernetes
  - AI/ML: PyTorch, TensorFlow, MLflow, RAG, LangGraph, FastAPI
  - Databases: PostgreSQL, Redis, pgvector
  - BI & Viz: Power BI, Tableau

**6. Certifications**
- AWS Cloud Practitioner
- AWS AI Practitioner
- Badge card design with verify link

**7. Education**
- Florida Atlantic University
- MS Information Technology & Management
- GPA: 3.9 | Graduation: May 2026 | Boca Raton, FL

**8. Blog / Updates (Live Feed)**
- Two columns: GitHub activity (left) + LinkedIn posts (right)
- GitHub: latest 5 commits via GitHub REST API
- LinkedIn: latest 5 posts via manual JSON or RSS
- "Last updated" timestamp shown

**9. Contact** ← opens by default
- Form: Name, Email, Subject (dropdown), Message
- Subject options: Job Opportunity, Collaboration, General
- Submit → POST /api/contact → email to Mani
- Social links: LinkedIn, GitHub, Email
- Location note: open to remote + relocation

**10. Resume**
- PDF embedded (iframe) + Download button
- "Last updated" date shown

### Desktop Icons (6 shortcuts)

**11. Artha AI Spotlight**
- Flagship project deep-dive window
- Product name, tagline, 5-layer architecture overview
- Tech stack, status: In Development
- CTA: "Want to collaborate?" → opens Contact window

**12. Stock Dashboard**
- Power BI project window
- Description + tech stack

**13. Testimonials**
- LinkedIn recommendation cards
- PLACEHOLDER — Mani to provide text

---

## 5. AI Chatbot — "Ask Mani"

- Floating button: bottom-right corner, always visible
- Opens as a standard window, title: "Ask Mani — AI Assistant"
- Powered by: Claude API (`claude-sonnet-4-20250514`)
- Backend endpoint: `POST /api/chat`

### Chatbot System Prompt
```
You are Mani's portfolio assistant. You help recruiters and visitors learn
about Manivelrajan — a Data & AI Engineer graduating from Florida Atlantic
University (MS, GPA 3.9, May 2026, Boca Raton FL).

Key facts:
- Skills: Python, PySpark, Airflow, dbt, Databricks, Kafka, AWS, Azure,
  Terraform, Docker, Kubernetes, FastAPI, PyTorch, TensorFlow, MLflow, RAG/LLM
- Experience: Data Engineer Intern at Opsylux LLC; Data Engineer at LTIMindtree
- Certifications: AWS Cloud Practitioner, AWS AI Practitioner
- Projects: Artha AI, Power BI Stock Market Dashboard
- Open to work. OPT eligible. Based in Boca Raton FL, open to remote/relocation.

Rules:
- Be friendly, concise, professional
- Never invent facts not listed above
- If unsure, say: "You can reach Mani directly via the Contact window"
- Keep answers under 3 sentences unless detail is requested
```

---

## 6. Tech Stack

### Frontend
```
Framework:    Next.js 14 (App Router, TypeScript)
Styling:      Tailwind CSS (custom color tokens configured)
Animation:    Framer Motion
State:        Zustand
Icons:        Lucide React
Fonts:        Syne + Inter + JetBrains Mono (Google Fonts)
Canvas:       Vanilla JS (particle wallpaper — no library)
```

### Backend
```
Framework:    FastAPI (Python 3.11+)
Email:        Resend
Cache:        In-memory TTL for feed data (1hr)
```

### Database
```
Engine:       PostgreSQL + pgvector (Supabase free tier)
Tables:       contact_messages, chatbot_knowledge, feed_cache
```

### Hosting
```
Frontend:     Vercel (free tier, GitHub auto-deploy)
Backend:      Railway (free tier)
Database:     Supabase
```

---

## 7. Folder Structure

```
mani-portfolio/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── os/
│   │   │   ├── Desktop.tsx
│   │   │   ├── Dock.tsx
│   │   │   ├── MenuBar.tsx
│   │   │   ├── Window.tsx
│   │   │   ├── WindowControls.tsx
│   │   │   ├── Spotlight.tsx
│   │   │   └── ParticleCanvas.tsx
│   │   ├── windows/
│   │   │   ├── HeroWindow.tsx
│   │   │   ├── AboutWindow.tsx
│   │   │   ├── ProjectsWindow.tsx
│   │   │   ├── ExperienceWindow.tsx
│   │   │   ├── SkillsWindow.tsx
│   │   │   ├── CertsWindow.tsx
│   │   │   ├── EducationWindow.tsx
│   │   │   ├── FeedWindow.tsx
│   │   │   ├── ContactWindow.tsx
│   │   │   ├── ResumeWindow.tsx
│   │   │   ├── ArthaAIWindow.tsx
│   │   │   └── TestimonialsWindow.tsx
│   │   └── chatbot/
│   │       ├── ChatBubble.tsx
│   │       └── ChatWindow.tsx
│   ├── store/
│   │   └── windowStore.ts
│   ├── hooks/
│   │   └── useDrag.ts
│   └── lib/
│       ├── constants.ts
│       └── theme.ts
│
├── backend/
│   ├── main.py
│   ├── routes/
│   │   ├── chat.py
│   │   ├── contact.py
│   │   └── feed.py
│   ├── services/
│   │   ├── claude_service.py
│   │   ├── github_service.py
│   │   └── email_service.py
│   ├── db/
│   │   ├── connection.py
│   │   └── schema.sql
│   └── requirements.txt
│
└── README.md
```

---

## 8. API Contracts

```
POST /api/chat
  Request:  { "message": string, "session_id": string }
  Response: { "reply": string }

POST /api/contact
  Request:  { "name": string, "email": string, "subject": string, "message": string }
  Response: { "success": boolean }

GET /api/feed
  Response: {
    "github": [{ "repo": string, "message": string, "date": string, "url": string }],
    "linkedin": [{ "text": string, "date": string }],   // illustrative samples; not live LinkedIn
    "linkedin_note": string,
    "timestamp": string
  }
```

---

## 9. Mobile Behavior

On screens < 768px — graceful degradation:
- No windows, no dock, no drag interaction
- Same dark color scheme and typography
- Sections stack vertically with smooth scroll
- Sticky top nav replaces dock
- Chatbot bubble stays bottom-right

---

## 10. Build Phases

### Phase 1 — OS Shell
- [ ] Next.js + Tailwind + Framer Motion + Zustand setup
- [ ] tailwind.config.ts — custom color tokens from Section 3
- [ ] ParticleCanvas.tsx
- [ ] MenuBar.tsx
- [ ] Window.tsx + WindowControls.tsx
- [ ] windowStore.ts (open, close, minimize, z-index, position)
- [ ] Dock.tsx with hover magnification
- [ ] Desktop.tsx with icon grid
- [ ] page.tsx — wire everything, 3 default windows open on load
- [ ] Spotlight.tsx
- [ ] Mobile fallback scaffold
- [ ] Deploy to Vercel ← Phase 1 complete

### Phase 2 — Content
- [ ] All 13 windows filled with real content
- [ ] Resume PDF embedded
- [ ] Mobile layout complete

### Phase 3 — AI + Backend
- [ ] FastAPI deployed to Railway
- [ ] PostgreSQL + pgvector on Supabase
- [ ] Claude API chatbot wired
- [ ] GitHub commits in `/api/feed` + **sample** LinkedIn-style lines (see `linkedin_note`; live LinkedIn TBD)
- [ ] Contact form → email working

---

## 11. Content Mani Must Provide Before Phase 2

- [ ] Profile photo (square, min 400×400px)
- [ ] Resume PDF
- [ ] Full bio (2–3 paragraphs)
- [ ] Project descriptions
- [ ] GitHub username
- [ ] LinkedIn URL
- [ ] LinkedIn recommendation text
- [ ] Chatbot knowledge base document

---

## 12. Instructions — Read Before Starting

**DO NOT ask clarifying design questions. All decisions are locked in this document.**

1. Start Phase 1 only. Use placeholder content in all windows.
2. Do not begin Phase 2 until Phase 1 is deployed on Vercel.
3. Do not use any Apple, Microsoft, or Google trademarked UI patterns.
4. The OS is fully original — "ManiOS" brand, custom colors, custom icons.
5. Follow the exact color system in Section 3. No deviations.
6. One component per file. No file should exceed 150 lines.
7. Use Zustand for all window state. No prop drilling.

### First commands after reading this file:
```bash
npx create-next-app@latest frontend --typescript --tailwind --app
cd frontend
npm install framer-motion zustand lucide-react
```

### Build order for Phase 1:
1. tailwind.config.ts — color tokens
2. ParticleCanvas.tsx
3. MenuBar.tsx
4. Window.tsx + WindowControls.tsx
5. windowStore.ts
6. Dock.tsx
7. Desktop.tsx
8. page.tsx
9. Spotlight.tsx
10. Mobile fallback
11. `vercel deploy`

---

*To start: "Read MANI_PORTFOLIO_SPEC.md and build Phase 1. No questions."*