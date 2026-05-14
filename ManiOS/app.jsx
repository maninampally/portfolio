// Main App — ManiOS desktop
import React from 'react';
const { useState: useAS, useEffect: useAE, useCallback: useAC } = React;

// Initialize chat session
if (!window.chatSessionId) {
  window.chatSessionId = 'session_' + Math.random().toString(36).substr(2, 9);
}

// ============== App registry ==============
const APPS = [
  { id: 'home',     slug: 'home',     title: 'home',          icon: '◈', label: 'Home',         desc: 'Profile & intro', w: 640, h: 560, IconC: 'IconHome',    bg: 'linear-gradient(135deg, #6C63FF, #4B45C9)' },
  { id: 'about',    slug: 'about',    title: 'about_me',      icon: '◉', label: 'About',        desc: 'Who I am', w: 560, h: 600, IconC: 'IconUser',    bg: 'linear-gradient(135deg, #1DB88E, #178A6B)' },
  { id: 'projects', slug: 'projects', title: 'projects',      icon: '▣', label: 'Projects',     desc: 'Work samples', w: 720, h: 580, IconC: 'IconBox',     bg: 'linear-gradient(135deg, #F5A623, #C67E12)' },
  { id: 'exp',      slug: 'experience', title: 'experience',  icon: '▤', label: 'Experience',   desc: 'Background', w: 600, h: 540, IconC: 'IconBriefcase', bg: 'linear-gradient(135deg, #8C84FF, #6C63FF)' },
  { id: 'skills',   slug: 'skills',   title: 'skills',        icon: '◇', label: 'Skills',       desc: 'Expertise', w: 680, h: 580, IconC: 'IconChip',    bg: 'linear-gradient(135deg, #1DB88E, #F5A623)' },
  { id: 'certs',    slug: 'certifications', title: 'certs',   icon: '✦', label: 'Certs',        desc: 'Credentials', w: 560, h: 380, IconC: 'IconAward',   bg: 'linear-gradient(135deg, #F5A623, #F58523)' },
  { id: 'edu',      slug: 'education', title: 'education',    icon: '◐', label: 'Education',    desc: 'Degrees', w: 540, h: 480, IconC: 'IconGrad',    bg: 'linear-gradient(135deg, #6C63FF, #1DB88E)' },
  { id: 'feed',     slug: 'impact',   title: 'impact',        icon: '⌁', label: 'Impact',       desc: 'Activity feed', w: 760, h: 560, IconC: 'IconFeed',    bg: 'linear-gradient(135deg, #2A2A3A, #4a4a6a)' },
  { id: 'contact',  slug: 'contact',  title: 'contact',       icon: '✉', label: 'Contact',      desc: 'Get in touch', w: 520, h: 620, IconC: 'IconMail',    bg: 'linear-gradient(135deg, #FF6B6B, #C9474B)' },
  { id: 'resume',   slug: 'resume',   title: 'resume.pdf',    icon: '▾', label: 'Resume',       desc: 'Download PDF', w: 640, h: 620, IconC: 'IconDoc',     bg: 'linear-gradient(135deg, #F0F0FF, #8888AA)', fg: '#0a0a0f' },
  // Desktop-icon-only
  { id: 'artha',    slug: 'artha-ai', title: 'artha_ai',      icon: 'α', label: 'Artha AI',     desc: 'AI project', w: 700, h: 620, IconC: 'IconSparkle', bg: 'linear-gradient(135deg, #6C63FF, #1DB88E)' },
  { id: 'stock',    slug: 'finsentinel', title: 'finsentinel', icon: '▲', label: 'FinSentinel', desc: 'Finance app', w: 640, h: 540, IconC: 'IconChart', bg: 'linear-gradient(135deg, #1DB88E, #6C63FF)' },
  { id: 'testimonials', slug: 'snapshot', title: 'snapshot', icon: '❝', label: 'Snapshot', desc: 'Testimonials', w: 600, h: 580, IconC: 'IconQuote', bg: 'linear-gradient(135deg, #F5A623, #FF6B6B)' },
];

// Dock order: grouped by type (Profile → Work → Meta)
const DOCK_ORDER = ['home', 'about', 'projects', 'exp', 'skills', 'certs', 'edu', 'feed', 'contact', 'resume'];
const DESKTOP_ICONS = ['artha', 'stock', 'resume', 'feed', 'contact'];

function getApp(id) { return APPS.find(a => a.id === id); }

function renderContent(id, ctx) {
  switch (id) {
    case 'home':    return <window.HeroWindow onOpenWindow={ctx.open} />;
    case 'about':   return <window.AboutWindow />;
    case 'projects':return <window.ProjectsWindow onOpenWindow={ctx.open} />;
    case 'exp':     return <window.ExperienceWindow />;
    case 'skills':  return <window.SkillsWindow />;
    case 'certs':   return <window.CertsWindow />;
    case 'edu':     return <window.EducationWindow />;
    case 'feed':    return <window.FeedWindow />;
    case 'contact': return <window.ContactWindow />;
    case 'resume':  return <window.ResumeWindow />;
    case 'artha':   return <window.ArthaWindow onOpenWindow={ctx.open} />;
    case 'stock':   return <window.StockWindow />;
    case 'testimonials': return <window.TestimonialsWindow />;
    default: return null;
  }
}

// Default open cascade — auto-open hero window on load
function initialWindows() {
  return [
    {
      id: 'home',
      slug: 'home',
      title: 'home',
      icon: '◈',
      x: typeof window !== 'undefined' ? Math.max(40, (window.innerWidth - 640) / 2) : 100,
      y: 80,
      w: 640,
      h: 560,
      z: 20,
      minimized: false,
      maximized: false,
    },
  ];
}

function App() {
  const [theme, setTheme] = useAS('dark');
  const [windows, setWindows] = useAS(() => initialWindows());
  const [focusId, setFocusId] = useAS(null);
  const [zCounter, setZCounter] = useAS(20);
  const [spotlightOpen, setSpotlightOpen] = useAS(false);
  const [chatOpen, setChatOpen] = useAS(false);

  useAE(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Define window management functions first
  const open = useAC((id) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      const nextZ = zCounter + 1;
      setZCounter(nextZ);
      if (existing) {
        return prev.map(w => w.id === id ? { ...w, minimized: false, z: nextZ } : w);
      }
      const app = getApp(id);
      if (!app) return prev;
      // Center window on screen
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const ww = app.w || 640;
      const wh = app.h || 500;
      const cx = Math.max(12, Math.round((vw - ww) / 2));
      const cy = Math.max(38, Math.round((vh - wh - 88) / 2) + 38);
      return [...prev, {
        ...app,
        x: cx,
        y: cy,
        z: nextZ,
        minimized: false,
        maximized: false,
      }];
    });
    setFocusId(id);
  }, [zCounter]);

  const close = useAC((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimize = useAC((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
  }, []);

  const maximize = useAC((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w));
  }, []);

  const focus = useAC((id) => {
    const nextZ = zCounter + 1;
    setZCounter(nextZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, z: nextZ } : w));
    setFocusId(id);
  }, [zCounter]);

  const move = useAC((id, x, y) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  }, []);

  const resize = useAC((id, w, h) => {
    setWindows(prev => prev.map(win => win.id === id ? { ...win, w, h } : win));
  }, []);

  // Keyboard: '/' opens spotlight, 1-9 launches dock apps
  useAE(() => {
    const onKey = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setSpotlightOpen(true);
      }
      if (e.key === 'Escape') setSpotlightOpen(false);
      // Keyboard shortcuts 1-9 for dock apps
      if (/^[1-9]$/.test(e.key) && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        const idx = parseInt(e.key) - 1;
        const dockApp = DOCK_ORDER[idx];
        if (dockApp) {
          e.preventDefault();
          open(dockApp);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Dock apps
  const dockApps = DOCK_ORDER.map(id => {
    const app = getApp(id);
    const IC = window[app.IconC];
    return { ...app, icon: <IC /> };
  });

  // Desktop icons
  const desktopIcons = DESKTOP_ICONS.map(id => {
    const app = getApp(id);
    const IC = window[app.IconC];
    return { ...app, icon: <IC /> };
  });

  // Spotlight items
  const spotlightItems = APPS.map(a => {
    const IC = window[a.IconC];
    return {
      id: a.id, label: a.label, hint: a.slug, desc: a.desc,
      icon: <IC />,
    };
  });

  const openIds = windows.filter(w => !w.minimized).map(w => w.id);

  return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Wallpaper */}
      <img
        src="/assets/desktop.jpeg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'brightness(0.75) saturate(0.9)',
        }}
      />

      {/* Menu bar */}
      <window.MenuBar
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        onOpenSpotlight={() => setSpotlightOpen(true)}
        statusOnline={true}
      />

      {/* Hint banner */}
      <HintHud />

      {/* Desktop greeting — left side */}
      <DesktopGreeting onOpen={open} />

      {/* Desktop icons */}
      <window.DesktopIcons icons={desktopIcons} onOpen={open} />

      {/* Windows */}
      {windows.map(w => (
        <window.Window
          key={w.id}
          win={w}
          focused={focusId === w.id}
          onFocus={() => focus(w.id)}
          onClose={() => close(w.id)}
          onMin={() => minimize(w.id)}
          onMax={() => maximize(w.id)}
          onMove={(x, y) => move(w.id, x, y)}
          onResize={(width, height) => resize(w.id, width, height)}
        >
          {renderContent(w.id, { open })}
        </window.Window>
      ))}

      {/* Dock */}
      <window.Dock apps={dockApps} onLaunch={open} openIds={openIds} />

      {/* Spotlight */}
      <window.Spotlight
        open={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        items={spotlightItems}
        onPick={(it) => open(it.id)}
      />

      {/* Chatbot */}
      <window.ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
      <window.ChatBubble open={chatOpen} onToggle={() => setChatOpen(o => !o)} />

      {/* Minimized strip */}
      <MinimizedStrip
        windows={windows.filter(w => w.minimized)}
        onRestore={(id) => { open(id); }}
      />
    </div>
  );
}

// DesktopGreeting — left-side panel visible on the empty desktop
function DesktopGreeting({ onOpen }) {
  const sections = [
    { id: 'exp',   label: 'Experience',     icon: '▤', desc: '2 companies · 2.5 years' },
    { id: 'edu',   label: 'Education',      icon: '◐', desc: 'FAU MS · GPA 3.9' },
    { id: 'certs', label: 'Certifications', icon: '✦', desc: 'AWS Cloud · AI Practitioner' },
    { id: 'skills',label: 'Skills',         icon: '◇', desc: 'Spark · AWS · GCP · MLOps' },
    { id: 'projects', label: 'Projects',   icon: '▣', desc: '4 projects · Artha AI · FinSentinel' },
    { id: 'contact',  label: 'Contact',    icon: '✉', desc: 'manikanthnampally94@gmail.com' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 28, top: 52,
      width: 300, zIndex: 5,
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      {/* Name card */}
      <div style={{
        padding: '18px 20px',
        background: 'rgba(19,19,26,0.82)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(108,99,255,0.2)',
        borderRadius: 14,
        boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--primary)', letterSpacing: '0.18em', marginBottom: 6 }}>MANIKANTH NAMPALLY</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>Data &amp; AI Engineer</div>
        <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.5 }}>Building production pipelines, AI products, and tools people actually use.</div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[['🟢','Data Engineer'],['📍','Boca Raton, FL'],['🎓','FAU · May 2026']].map(([icon, label]) => (
            <span key={label} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: 4 }}>{icon} {label}</span>
          ))}
        </div>
      </div>

      {/* Quick-open section list */}
      <div style={{
        padding: '12px 14px',
        background: 'rgba(19,19,26,0.82)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.18em', marginBottom: 10, textTransform: 'uppercase' }}>Quick Open</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => onOpen(s.id)}
              style={{
                background: 'transparent', border: 'none', borderRadius: 8,
                padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 10,
                textAlign: 'left', width: '100%', cursor: 'pointer',
                transition: 'background 140ms',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,99,255,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--primary)', width: 20, textAlign: 'center', flexShrink: 0 }}>{s.icon}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{s.label}</div>
                <div style={{ fontSize: 9, color: 'var(--text-2)', fontFamily: 'var(--font-mono)', marginTop: 2, lineHeight: 1.2 }}>{s.desc}</div>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div style={{
        padding: '10px 12px',
        background: 'rgba(108,99,255,0.12)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(108,99,255,0.2)',
        borderRadius: 10,
        fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ fontSize: 12 }}>⌨</span>
        Press <kbd style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 3, padding: '2px 6px', fontFamily: 'inherit', fontSize: 9, fontWeight: 600 }}>/</kbd> to search or click below to explore
      </div>
    </div>
  );
}

function HintHud() {
  const [hide, setHide] = useAS(false);
  useAE(() => {
    const t = setTimeout(() => setHide(true), 6000);
    return () => clearTimeout(t);
  }, []);
  if (hide) return null;
  return (
    <div style={{
      position: 'absolute', top: 50, left: '50%', transform: 'translateX(-50%)',
      zIndex: 60, padding: '10px 16px', borderRadius: 999,
      background: 'rgba(108,99,255,0.2)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(108,99,255,0.3)',
      fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)',
      display: 'flex', alignItems: 'center', gap: 8,
      animation: 'slideOutUp 6s ease-out forwards',
      boxShadow: '0 8px 24px rgba(108,99,255,0.2)',
    }}>
      <span style={{ fontWeight: 500 }}>💡 Tip:</span>
      <kbd style={{
        fontFamily: 'inherit', fontSize: 11, padding: '3px 7px',
        background: 'var(--primary)', color: 'white', borderRadius: 4, border: 'none',
        fontWeight: 600,
      }}>/</kbd>
      <span>to search</span>
      <style>{`@keyframes slideOutUp { 0%, 75% { opacity: 1; transform: translateX(-50%) translateY(0); } 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); } }`}</style>
    </div>
  );
}

function MinimizedStrip({ windows: mins, onRestore }) {
  if (mins.length === 0) return null;
  return (
    <div style={{
      position: 'absolute', bottom: 86, left: 20, zIndex: 750,
      display: 'flex', gap: 8,
    }}>
      {mins.map(w => (
        <button key={w.id} onClick={() => onRestore(w.id)} style={{
          padding: '6px 10px', borderRadius: 8,
          background: 'rgba(28,28,38,0.75)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 11,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ color: 'var(--primary)' }}>{w.icon}</span>
          {w.title}
        </button>
      ))}
    </div>
  );
}

export function Root() {
  const [isMobile, setIsMobile] = useAS(() => window.innerWidth < 768);
  useAE(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useAE(() => {
    document.body.classList.toggle('is-mobile', isMobile);
    document.body.classList.toggle('is-desktop', !isMobile);
    document.documentElement.classList.toggle('is-mobile', isMobile);
    document.documentElement.classList.toggle('is-desktop', !isMobile);
  }, [isMobile]);
  return isMobile ? <window.MobileApp /> : <App />;
}
