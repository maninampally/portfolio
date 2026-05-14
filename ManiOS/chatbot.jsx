// Ask Mani — floating chatbot
import React from 'react';

const { useState: useChatS, useRef: useChatR, useEffect: useChatE } = React;

function ChatBubble({ open, onToggle, unread, compact }) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: 'fixed', right: 20, bottom: compact ? 14 : 74, zIndex: 800,
        width: 56, height: 56, borderRadius: 18,
        background: open
          ? 'var(--elev-2)'
          : 'linear-gradient(135deg, var(--primary), var(--primary-2))',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: open
          ? '0 10px 24px -6px rgba(0,0,0,0.5)'
          : '0 14px 30px -6px rgba(108,99,255,0.6), inset 0 0 0 1px rgba(255,255,255,0.15)',
        color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 0,
        transition: 'transform 200ms cubic-bezier(.34,1.56,.64,1), box-shadow 200ms',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      title="Ask Mani"
    >
      {open
        ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12 M18 6L6 18"/></svg>
        : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 1-13.6 7.75L3 21l1.25-4.4A9 9 0 1 1 21 12z"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/></svg>}
    </button>
  );
}

function ChatPanel({ open, onClose }) {
  const [messages, setMessages] = useChatS([
    { role: 'assistant', content: "Hey — I'm Mani's portfolio assistant. Ask me about his experience, projects, or skills." },
  ]);
  const [input, setInput] = useChatS('');
  const [thinking, setThinking] = useChatS(false);
  const scrollRef = useChatR(null);

  useChatE(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  const suggestions = [
    'What roles is Mani open to?',
    'Tell me about Artha AI',
    'What stack does he know?',
  ];

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
        body: JSON.stringify({ message: q, session_id: window.chatSessionId })
      });
      const data = await res.json();
      window.chatSessionId = data.session_id;
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([...next, { role: 'assistant', content: "You can reach Mani directly via the Contact window." }]);
    }
    setThinking(false);
  }

  if (!open) return null;

  return (
    <div style={{
      position: 'absolute', right: 20, bottom: 130, zIndex: 850,
      width: 360, height: 480,
      background: 'var(--surface)',
      border: '1px solid var(--border-2)',
      borderRadius: 14,
      boxShadow: '0 30px 60px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(108,99,255,0.18)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 14px',
        background: 'linear-gradient(180deg, var(--elev-2), var(--elev))',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: 'linear-gradient(135deg, var(--primary), var(--teal))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)',
        }}>α</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>Ask Mani</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)' }} /> AI assistant · online
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-2)', padding: 4 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12 M18 6L6 18"/></svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: 'auto', padding: 14,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '82%',
            padding: '8px 12px',
            borderRadius: 12,
            fontSize: 13, lineHeight: 1.5,
            background: m.role === 'user'
              ? 'var(--primary)'
              : 'var(--elev)',
            color: m.role === 'user' ? '#fff' : 'var(--text)',
            border: m.role === 'user' ? 'none' : '1px solid var(--border)',
            borderTopRightRadius: m.role === 'user' ? 4 : 12,
            borderTopLeftRadius:  m.role === 'user' ? 12 : 4,
          }}>{m.content}</div>
        ))}
        {thinking && (
          <div style={{
            alignSelf: 'flex-start', padding: '10px 14px', borderRadius: 12,
            background: 'var(--elev)', border: '1px solid var(--border)',
            borderTopLeftRadius: 4,
          }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 5, height: 5, borderRadius: '50%', background: 'var(--text-2)',
                  animation: `bounce 1.2s ${i * 0.15}s infinite ease-in-out`,
                }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div style={{ padding: '0 12px 8px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => send(s)} style={{
              textAlign: 'left',
              padding: '6px 10px', borderRadius: 8,
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-2)', fontSize: 11.5,
              fontFamily: 'var(--font-mono)',
            }}>{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={e => { e.preventDefault(); send(); }} data-no-drag style={{
        display: 'flex', gap: 6, padding: 10,
        borderTop: '1px solid var(--border)', background: 'var(--elev)',
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask anything about Mani…"
          style={{
            flex: 1, background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '8px 10px', color: 'var(--text)', fontSize: 13,
            outline: 'none',
          }}
        />
        <button type="submit" style={{
          background: 'var(--primary)', color: '#fff', border: 'none',
          borderRadius: 8, padding: '0 12px', fontSize: 13, fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </form>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { ChatBubble, ChatPanel });
