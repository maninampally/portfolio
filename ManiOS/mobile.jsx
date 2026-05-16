// Mobile fallback — stacked scroll layout for < 768px
import React from 'react';
import { PERSON } from './data.js';
const { useState: useMS, useEffect: useME, useRef: useMR } = React;

function MobileApp() {
  const [activeSection, setActiveSection] = useMS('home');
  const [navOpen, setNavOpen] = useMS(false);
  const [chatOpen, setChatOpen] = useMS(false);

  const sections = [
    { id: 'home',     label: 'Home',         Component: window.HeroWindow },
    { id: 'about',    label: 'About',        Component: window.AboutWindow },
    { id: 'projects', label: 'Projects',     Component: window.ProjectsWindow },
    { id: 'artha',    label: 'Artha AI',     Component: window.ArthaWindow },
    { id: 'exp',      label: 'Experience',   Component: window.ExperienceWindow },
    { id: 'skills',   label: 'Skills',       Component: window.SkillsWindow },
    { id: 'certs',    label: 'Certs',        Component: window.CertsWindow },
    { id: 'edu',      label: 'Education',    Component: window.EducationWindow },
    { id: 'feed',     label: 'Impact',       Component: window.FeedWindow },
    { id: 'stock',    label: 'FinSentinel',  Component: window.StockWindow },
    { id: 'testimonials', label: 'Snapshot', Component: window.TestimonialsWindow },
    { id: 'contact',  label: 'Contact',      Component: window.ContactWindow },
    { id: 'resume',   label: 'Résumé',       Component: window.ResumeWindow },
  ];

  // Track scroll → active section (intersection observer)
  useME(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.1, 0.5] }
    );
    sections.forEach(s => {
      const el = document.getElementById(`m-${s.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(`m-${id}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setNavOpen(false);
  };

  const ctx = { open: scrollTo };

  return (
    <div style={{
      position: 'relative', minHeight: '100vh',
      background: 'var(--bg)', color: 'var(--text)',
      overflow: 'auto',
    }}>
      {/* Sticky top nav */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(16px) saturate(140%)', WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <window.Logo size={18} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)',
              fontWeight: 600, letterSpacing: '0.06em',
            }}>ManiOS</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)',
            }}>v1.0</span>
          </div>
          <button onClick={() => setNavOpen(o => !o)} style={{
            background: 'var(--elev-2)', border: '1px solid var(--border)',
            color: 'var(--text)', padding: '6px 10px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-mono)', fontSize: 11,
          }}>
            <span style={{ color: 'var(--primary-2)' }}>
              {sections.find(s => s.id === activeSection)?.label || 'Menu'}
            </span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: navOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>

        {/* Dropdown nav */}
        {navOpen && (
          <div style={{
            borderTop: '1px solid var(--border)',
            padding: 8, display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', gap: 6,
            background: 'rgba(19,19,26,0.95)',
            maxHeight: '70vh', overflowY: 'auto',
          }}>
            {sections.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} style={{
                padding: '10px 12px', textAlign: 'left',
                background: activeSection === s.id ? 'var(--elev-2)' : 'transparent',
                border: '1px solid ' + (activeSection === s.id ? 'var(--border-2)' : 'var(--border)'),
                borderRadius: 8, color: 'var(--text)',
                fontFamily: 'var(--font-mono)', fontSize: 12,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {activeSection === s.id && (
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 6px var(--primary)' }} />
                )}
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status pill */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 12px', borderRadius: 999,
          background: 'var(--elev)', border: '1px solid var(--border)',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 6px var(--teal)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)' }}>Data Engineer</span>
          <span style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>·</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>FAU · May 2026</span>
        </div>
      </div>

      {/* Stacked sections */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {sections.map((s, i) => {
          const Comp = s.Component;
          return (
            <section
              key={s.id}
              id={`m-${s.id}`}
              style={{
                scrollMarginTop: 64,
                paddingTop: 8, paddingBottom: 8,
              }}
            >
              <div style={{
                padding: '20px 16px 8px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)',
                  letterSpacing: '0.2em',
                }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ height: 1, flex: 0, width: 18, background: 'var(--border)' }} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--primary-2)',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                }}>{s.label}</span>
              </div>
              <div style={{
                margin: '0 12px 12px',
                background: 'var(--surface)', borderRadius: 12,
                border: '1px solid var(--border)', overflow: 'hidden',
              }}>
                <Comp onOpenWindow={scrollTo} />
              </div>
            </section>
          );
        })}
      </div>

      <div style={{
        textAlign: 'center', padding: '24px 16px 100px',
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)',
      }}>
        ManiOS v1.0 · Built with ◈ in {PERSON.location}
      </div>

      {/* Chatbot */}
      <window.ChatPanelMobile open={chatOpen} onClose={() => setChatOpen(false)} />
      <window.ChatBubble compact open={chatOpen} onToggle={() => setChatOpen(o => !o)} />
    </div>
  );
}

// Mobile-tuned chat panel — full-width sheet from bottom
function ChatPanelMobile({ open, onClose }) {
  // Reuse the same chat panel; restyle as sheet on mobile
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 850,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      background: 'rgba(0,0,0,0.5)',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        height: '80vh',
        background: 'var(--surface)',
        borderTopLeftRadius: 18, borderTopRightRadius: 18,
        border: '1px solid var(--border-2)',
        borderBottom: 'none',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <MobileChatContent onClose={onClose} />
      </div>
    </div>
  );
}

function MobileChatContent({ onClose }) {
  const [messages, setMessages] = useMS([
    { role: 'assistant', content: "Hey — I'm Mani's portfolio assistant. Ask me anything about his experience, projects, or skills." },
  ]);
  const [input, setInput] = useMS('');
  const [thinking, setThinking] = useMS(false);
  const scrollRef = useMR(null);

  useME(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  async function send(text) {
    const q = (text ?? input).trim();
    if (!q || thinking) return;
    const next = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setInput('');
    setThinking(true);
    try {
      const res = await fetch(window.__API_BASE__ + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, session_id: window.chatSessionId }),
      });
      const data = await res.json();
      window.chatSessionId = data.session_id;
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch {
      const reply = (typeof window.localAnswer === 'function')
        ? window.localAnswer(q)
        : "You can reach Mani directly via the Contact section.";
      setMessages([...next, { role: 'assistant', content: reply }]);
    }
    setThinking(false);
  }

  return (
    <React.Fragment>
      <div style={{
        padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10,
        background: 'linear-gradient(180deg, var(--elev-2), var(--elev))',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'linear-gradient(135deg, var(--primary), var(--teal))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)',
        }}>α</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Ask Mani</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)' }}>AI assistant · online</div>
        </div>
        <button onClick={onClose} style={{
          background: 'var(--elev-2)', border: '1px solid var(--border)',
          color: 'var(--text)', padding: 6, borderRadius: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12 M18 6L6 18"/></svg>
        </button>
      </div>

      <div ref={scrollRef} style={{
        flex: 1, overflowY: 'auto', padding: 14,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%', padding: '10px 14px', borderRadius: 14,
            fontSize: 14, lineHeight: 1.5,
            background: m.role === 'user' ? 'var(--primary)' : 'var(--elev)',
            color: m.role === 'user' ? '#fff' : 'var(--text)',
            border: m.role === 'user' ? 'none' : '1px solid var(--border)',
          }}>{m.content}</div>
        ))}
        {thinking && (
          <div style={{ alignSelf: 'flex-start', padding: '12px 16px', borderRadius: 14, background: 'var(--elev)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-2)', animation: `bounce 1.2s ${i*0.15}s infinite ease-in-out` }} />)}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={e => { e.preventDefault(); send(); }} style={{
        display: 'flex', gap: 8, padding: 12,
        borderTop: '1px solid var(--border)', background: 'var(--elev)',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask anything…"
          style={{
            flex: 1, background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '12px 14px', color: 'var(--text)', fontSize: 14,
            outline: 'none',
          }}
        />
        <button type="submit" style={{
          background: 'var(--primary)', color: '#fff', border: 'none',
          borderRadius: 10, padding: '0 16px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </form>
    </React.Fragment>
  );
}

Object.assign(window, { MobileApp, ChatPanelMobile });
