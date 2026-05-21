// Main App — ManiOS desktop
import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import { PERSON, PROJECTS } from './data.js';
import { MenuBar, Window, Dock, DesktopIcons, Spotlight } from './chrome.jsx';
import {
  HeroWindow,
  AboutWindow,
  ProjectsWindow,
  ExperienceWindow,
  SkillsWindow,
  CertsWindow,
  EducationWindow,
  FeedWindow,
  ContactWindow,
  ResumeWindow,
  ArthaWindow,
  StockWindow,
  TestimonialsWindow,
  TerminalWindow,
  IconHome,
  IconUser,
  IconBox,
  IconBriefcase,
  IconChip,
  IconAward,
  IconGrad,
  IconFeed,
  IconMail,
  IconDoc,
  IconSparkle,
  IconChart,
  IconQuote,
  IconTerm,
} from './windows.jsx';
import { ChatBubble, ChatPanel } from './chatbot.jsx';
import { MobileApp } from './mobile.jsx';

const createChatSessionId = () => (
  globalThis.crypto?.randomUUID ? `session_${globalThis.crypto.randomUUID()}` : `session_${Math.random().toString(36).slice(2, 11)}`
);

// Initialize chat session
if (!globalThis.chatSessionId) {
  globalThis.chatSessionId = createChatSessionId();
}

// ============== App registry ==============
const APPS = [
  { id: 'home',     slug: 'home',     title: 'home',          icon: '◈', label: 'Home',         desc: 'Profile & intro', w: 640, h: 700, IconC: IconHome,    bg: 'linear-gradient(135deg, #6C63FF, #4B45C9)' },
  { id: 'about',    slug: 'about',    title: 'about_me',      icon: '◉', label: 'About',        desc: 'Who I am', w: 560, h: 600, IconC: IconUser,    bg: 'linear-gradient(135deg, #1DB88E, #178A6B)' },
  { id: 'projects', slug: 'projects', title: 'projects',      icon: '▣', label: 'Projects',     desc: 'Work samples', w: 720, h: 580, IconC: IconBox,     bg: 'linear-gradient(135deg, #F5A623, #C67E12)' },
  { id: 'exp',      slug: 'experience', title: 'experience',  icon: '▤', label: 'Experience',   desc: 'Background', w: 600, h: 540, IconC: IconBriefcase, bg: 'linear-gradient(135deg, #F97316, #EA580C)' },
  { id: 'skills',   slug: 'skills',   title: 'skills',        icon: '◇', label: 'Skills',       desc: 'Expertise', w: 680, h: 580, IconC: IconChip,    bg: 'linear-gradient(135deg, #1DB88E, #F5A623)' },
  { id: 'certs',    slug: 'certifications', title: 'certs',   icon: '✦', label: 'Certs',        desc: 'Credentials', w: 560, h: 380, IconC: IconAward,   bg: 'linear-gradient(135deg, #EAB308, #CA8A04)', fg: '#0a0a0f' },
  { id: 'edu',      slug: 'education', title: 'education',    icon: '◐', label: 'Education',    desc: 'Degrees', w: 540, h: 480, IconC: IconGrad,    bg: 'linear-gradient(135deg, #0EA5E9, #0284C7)' },
  { id: 'feed',     slug: 'impact',   title: 'impact',        icon: '⌁', label: 'Impact',       desc: 'Activity feed', w: 760, h: 560, IconC: IconFeed,    bg: 'linear-gradient(135deg, #9333EA, #6D28D9)' },
  { id: 'contact',  slug: 'contact',  title: 'contact',       icon: '✉', label: 'Contact',      desc: 'Get in touch', w: 520, h: 620, IconC: IconMail,    bg: 'linear-gradient(135deg, #FF6B6B, #C9474B)' },
  { id: 'resume',   slug: 'resume',   title: 'resume.pdf',    icon: '▾', label: 'Resume',       desc: 'Download PDF', w: 640, h: 620, IconC: IconDoc,     bg: 'linear-gradient(135deg, #F0F0FF, #8888AA)', fg: '#0a0a0f' },
  // Desktop-icon-only
  { id: 'artha',    slug: 'artha-ai', title: 'artha_ai',      icon: 'α', label: 'Artha AI',     desc: 'AI project', w: 700, h: 620, IconC: IconSparkle, bg: 'linear-gradient(135deg, #6C63FF, #1DB88E)' },
  { id: 'stock',    slug: 'finsentinel', title: 'finsentinel', icon: '▲', label: 'FinSentinel', desc: 'Finance app', w: 640, h: 540, IconC: IconChart, bg: 'linear-gradient(135deg, #1DB88E, #6C63FF)' },
  { id: 'testimonials', slug: 'snapshot', title: 'snapshot', icon: '❝', label: 'Snapshot', desc: 'Testimonials', w: 600, h: 580, IconC: IconQuote, bg: 'linear-gradient(135deg, #F5A623, #FF6B6B)' },
  { id: 'terminal', slug: 'terminal', title: 'terminal', icon: '$', label: 'Terminal', desc: 'Interactive shell', w: 660, h: 460, IconC: IconTerm, bg: 'linear-gradient(135deg, #10B981, #047857)' },
];

// Dock order: grouped by type (Profile → Work → Meta)
const DOCK_ORDER = ['home', 'about', 'projects', 'exp', 'skills', 'certs', 'edu', 'feed', 'contact', 'terminal'];
const DESKTOP_ICONS = ['artha', 'stock', 'terminal', 'feed', 'contact'];

function getApp(id) { return APPS.find(a => a.id === id); }

function getWallpaperFilter() {
  const h = new Date().getHours();
  if (h >= 6 && h < 12)  return 'brightness(0.88) saturate(0.9) sepia(0.08)';        // morning — warm soft
  if (h >= 12 && h < 18) return 'brightness(1.0) saturate(1.05)';                     // afternoon — full daylight
  if (h >= 18 && h < 24) return 'brightness(0.52) saturate(1.05) hue-rotate(15deg)';  // evening — deeper tones
  return 'brightness(0.3) saturate(0.5) hue-rotate(190deg)';                           // night — dark blue
}

function renderContent(id, ctx) {
  switch (id) {
    case 'home':    return <HeroWindow onOpenWindow={ctx.open} />;
    case 'about':   return <AboutWindow />;
    case 'projects':return <ProjectsWindow onOpenWindow={ctx.open} />;
    case 'exp':     return <ExperienceWindow />;
    case 'skills':  return <SkillsWindow />;
    case 'certs':   return <CertsWindow />;
    case 'edu':     return <EducationWindow />;
    case 'feed':    return <FeedWindow />;
    case 'contact': return <ContactWindow />;
    case 'resume':  return <ResumeWindow />;
    case 'artha':   return <ArthaWindow onOpenWindow={ctx.open} />;
    case 'stock':   return <StockWindow />;
    case 'testimonials': return <TestimonialsWindow />;
    case 'terminal':   return <TerminalWindow onOpenWindow={ctx.open} />;
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
  const [theme, setTheme] = useState('dark');
  const [windows, setWindows] = useState(() => initialWindows());
  const [focusId, setFocusId] = useState(null);
  const [zCounter, setZCounter] = useState(20);
  const zCounterRef = useRef(20);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [tourStep, setTourStep] = useState(null);
  const [recruiterActive, setRecruiterActive] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    zCounterRef.current = zCounter;
  }, [zCounter]);

  // Define window management functions first
  const open = useCallback((id) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      const nextZ = zCounterRef.current + 1;
      zCounterRef.current = nextZ;
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
  }, []);

  const close = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimize = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
  }, []);

  const maximize = useCallback((id) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w));
  }, []);

  const focus = useCallback((id) => {
    const nextZ = zCounterRef.current + 1;
    zCounterRef.current = nextZ;
    setZCounter(nextZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, z: nextZ } : w));
    setFocusId(id);
  }, []);

  const move = useCallback((id, x, y) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  }, []);

  const resize = useCallback((id, w, h) => {
    setWindows(prev => prev.map(win => win.id === id ? { ...win, w, h } : win));
  }, []);

  const recruiterMode = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gap = 8;
    const px = 12;
    const y = 48;
    const h = Math.max(420, vh - 38 - 88 - 20);
    const colW = Math.floor((vw - px * 2 - gap * 2) / 3);
    const layout = [
      { id: 'resume',   x: px,                        y, w: colW, h },
      { id: 'exp',      x: px + colW + gap,            y, w: colW, h },
      { id: 'projects', x: px + (colW + gap) * 2,      y, w: colW, h },
    ];
    setWindows(prev => {
      let next = [...prev];
      let nextZ = zCounterRef.current;
      layout.forEach((cfg, i) => {
        const z = nextZ + i + 1;
        const app = getApp(cfg.id);
        const idx = next.findIndex(w => w.id === cfg.id);
        if (idx >= 0) {
          next[idx] = { ...next[idx], ...cfg, z, minimized: false, maximized: false };
        } else {
          next.push({ ...app, ...cfg, z, minimized: false, maximized: false });
        }
      });
      nextZ += 3;
      zCounterRef.current = nextZ;
      setZCounter(nextZ);
      return next;
    });
    setFocusId('projects');
    setRecruiterActive(true);
    setToast('Most-viewed sections loaded · ~90 seconds to learn everything');
    setTimeout(() => setToast(null), 4000);
  }, []);

  const exitRecruiterMode = useCallback(() => {
    setWindows(prev => prev.filter(w => !['resume', 'exp', 'projects'].includes(w.id)));
    setRecruiterActive(false);
  }, []);

  const TOUR_STEPS = [
    { id: 'home',    label: 'This is who I am',      sub: 'Intro · photo · stats · links' },
    { id: 'exp',     label: "Here's my work history", sub: `${PERSON.currentCompany} · LTIMindtree · ${PERSON.yearsExp} years` },
    { id: 'projects',label: "Here's what I built",   sub: `${PROJECTS.length} projects · real metrics · live code` },
    { id: 'contact', label: "Let's talk",             sub: 'Open to roles · replies in 24h' },
  ];

  const startTour = useCallback(() => {
    open('home');
    setTourStep(0);
  }, [open]);

  const advanceTour = useCallback(() => {
    setTourStep(prev => {
      const next = prev + 1;
      if (next >= TOUR_STEPS.length) return null;
      open(TOUR_STEPS[next].id);
      return next;
    });
  }, [open]);

  // Keyboard: '/' opens spotlight, 1-9 launches dock apps
  useEffect(() => {
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
    const Icon = app.IconC;
    return { ...app, icon: <Icon /> };
  });

  // Desktop icons
  const desktopIcons = DESKTOP_ICONS.map(id => {
    const app = getApp(id);
    const Icon = app.IconC;
    return { ...app, icon: <Icon /> };
  });

  // Spotlight items
  const spotlightItems = APPS.map(a => {
    const Icon = a.IconC;
    return {
      id: a.id, label: a.label, hint: a.slug, desc: a.desc,
      icon: <Icon />,
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
          filter: getWallpaperFilter(),
          transition: 'filter 2s ease',
        }}
      />

      {/* Menu bar */}
      <MenuBar
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        onOpenSpotlight={() => setSpotlightOpen(true)}
        statusOnline={true}
        onRecruiterMode={recruiterActive ? exitRecruiterMode : recruiterMode}
        recruiterActive={recruiterActive}
      />

      {/* Hint banner */}
      <HintHud />

      {/* Desktop greeting — left side */}
      <DesktopGreeting onOpen={open} onStartTour={startTour} />

      {/* Desktop icons */}
      <DesktopIcons icons={desktopIcons} onOpen={open} />

      {/* Windows */}
      {windows.map(w => (
        <Window
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
          <WindowErrorBoundary windowId={w.id}>
            {renderContent(w.id, { open })}
          </WindowErrorBoundary>
        </Window>
      ))}

      {/* Dock */}
      <Dock apps={dockApps} onLaunch={open} openIds={openIds} />

      {/* Spotlight */}
      <Spotlight
        open={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        items={spotlightItems}
        onPick={(it) => open(it.id)}
      />

      {/* Chatbot */}
      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
      <ChatBubble open={chatOpen} onToggle={() => setChatOpen(o => !o)} />

      {/* Toast */}
      <Toast message={toast} />

      {/* Tour overlay */}
      {tourStep !== null && (
        <TourOverlay
          step={TOUR_STEPS[tourStep]}
          stepIndex={tourStep}
          totalSteps={TOUR_STEPS.length}
          onNext={advanceTour}
          onSkip={() => setTourStep(null)}
        />
      )}

      {/* Minimized strip */}
      <MinimizedStrip
        windows={windows.filter(w => w.minimized)}
        onRestore={(id) => { open(id); }}
      />
    </div>
  );
}

// DesktopGreeting — left-side panel visible on the empty desktop
function DesktopGreeting({ onOpen, onStartTour }) {
  const sections = [
    { id: 'exp',     label: 'Experience',     icon: '▤', desc: `${PERSON.companies} companies · ${PERSON.yearsExp} years` },
    { id: 'edu',     label: 'Education',      icon: '◐', desc: `${PERSON.universityShort} MS · GPA ${PERSON.gpa}` },
    { id: 'certs',   label: 'Certifications', icon: '✦', desc: 'AWS Cloud · AI Practitioner' },
    { id: 'skills',  label: 'Skills',         icon: '◇', desc: 'Spark · AWS · GCP · MLOps' },
    { id: 'projects',label: 'Projects',       icon: '▣', desc: `${PROJECTS.length} projects · Artha AI · FinSentinel` },
    { id: 'contact', label: 'Contact',        icon: '✉', desc: PERSON.email },
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
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--primary)', letterSpacing: '0.18em', marginBottom: 6 }}>{PERSON.name.toUpperCase()}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{PERSON.titleFull}</div>
        <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.5 }}>{PERSON.tagline}</div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[['🟢', PERSON.title],['📍', PERSON.location],['🎓', `${PERSON.universityShort} · ${PERSON.graduation}`]].map(([icon, label]) => (
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

      {/* Start Tour */}
      <button onClick={onStartTour} style={{
        width: '100%', padding: '10px 14px',
        background: 'rgba(29,184,142,0.12)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(29,184,142,0.25)',
        borderRadius: 10, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--teal)',
        transition: 'background 140ms, border-color 140ms',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(29,184,142,0.2)'; e.currentTarget.style.borderColor = 'rgba(29,184,142,0.4)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(29,184,142,0.12)'; e.currentTarget.style.borderColor = 'rgba(29,184,142,0.25)'; }}
      >
        <span style={{ fontSize: 13 }}>▶</span>
        <span style={{ fontWeight: 600 }}>Start Tour</span>
        <span style={{ color: 'var(--text-3)', marginLeft: 'auto' }}>4 stops · ~60s</span>
      </button>

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
  const [hide, setHide] = useState(false);
  useEffect(() => {
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

function TourOverlay({ step, stepIndex, totalSteps, onNext, onSkip }) {
  const isLast = stepIndex === totalSteps - 1;
  return (
    <div style={{
      position: 'absolute', bottom: 110, left: '50%', transform: 'translateX(-50%)',
      zIndex: 1600, width: 360,
      background: 'rgba(19,19,26,0.95)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(29,184,142,0.35)',
      borderRadius: 14,
      boxShadow: '0 20px 50px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(29,184,142,0.12)',
      padding: '16px 18px',
      animation: 'toastIn 280ms cubic-bezier(.34,1.56,.64,1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} style={{
            height: 3, flex: 1, borderRadius: 2,
            background: i <= stepIndex ? 'var(--teal)' : 'var(--border)',
            transition: 'background 300ms',
          }} />
        ))}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--teal)', letterSpacing: '0.14em', marginBottom: 6 }}>
        STOP {stepIndex + 1} / {totalSteps}
      </div>
      <div style={{ fontSize: 18, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
        {step.label}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 14 }}>{step.sub}</div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button onClick={onSkip} style={{
          background: 'transparent', border: '1px solid var(--border)',
          borderRadius: 8, padding: '6px 12px',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)',
          cursor: 'pointer',
        }}>Skip</button>
        <button onClick={isLast ? onSkip : onNext} style={{
          background: 'var(--teal)', border: 'none',
          borderRadius: 8, padding: '6px 14px',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: '#0a0a0f',
          fontWeight: 700, cursor: 'pointer',
        }}>{isLast ? 'Done ✓' : 'Next →'}</button>
      </div>
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{
      position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)',
      zIndex: 1500, padding: '10px 20px', borderRadius: 999,
      background: 'rgba(108,99,255,0.92)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.15)',
      fontFamily: 'var(--font-mono)', fontSize: 12, color: '#fff',
      whiteSpace: 'nowrap', pointerEvents: 'none',
      boxShadow: '0 8px 28px rgba(108,99,255,0.45)',
      display: 'flex', alignItems: 'center', gap: 8,
      animation: 'toastIn 280ms cubic-bezier(.34,1.56,.64,1)',
    }}>
      <span>✓</span>{message}
      <style>{`@keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(12px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}

export function Root() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('is-mobile', isMobile);
    document.body.classList.toggle('is-desktop', !isMobile);
    document.documentElement.classList.toggle('is-mobile', isMobile);
    document.documentElement.classList.toggle('is-desktop', !isMobile);
  }, [isMobile]);
  return isMobile ? <MobileApp /> : <App />;
}

class WindowErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, color: 'var(--red)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          Window {this.props.windowId} failed to render.
        </div>
      );
    }
    return this.props.children;
  }
}
