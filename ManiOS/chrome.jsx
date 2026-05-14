// OS chrome: MenuBar, Window, Dock, Desktop icons, Spotlight
import React from 'react';
const { useEffect, useRef, useState, useCallback } = React;

// ============================================================
// MENU BAR — top
// ============================================================
function MenuBar({ theme, onToggleTheme, onOpenSpotlight, statusOnline }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 32, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 14px',
      background: 'linear-gradient(180deg, rgba(28,28,38,0.85), rgba(19,19,26,0.75))',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      fontSize: 12,
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-2)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* ManiOS wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo size={14} />
          <span style={{ color: 'var(--text)', fontWeight: 600, letterSpacing: '0.04em' }}>ManiOS</span>
          <span style={{ color: 'var(--text-3)' }}>v1.0</span>
        </div>
        <div style={{ display: 'flex', gap: 12, color: 'var(--text-2)' }}>
          <MenuItem label="File" />
          <MenuItem label="View" />
          <MenuItem label="Window" />
          <MenuItem label="Help" />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onOpenSpotlight} title="Search (/)" style={iconBtn}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        </button>
        <button onClick={onToggleTheme} title="Toggle theme" style={iconBtn}>
          {theme === 'dark'
            ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
            : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 8, borderLeft: '1px solid var(--border)' }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: statusOnline ? 'var(--teal)' : 'var(--text-3)',
            boxShadow: statusOnline ? '0 0 8px var(--teal)' : 'none',
          }} />
          <span style={{ color: 'var(--text)' }}>Data Engineer</span>
        </div>
        <span>{date}</span>
        <span style={{ color: 'var(--text)' }}>{time}</span>
      </div>
    </div>
  );
}

function MenuItem({ label }) {
  return <button style={{ ...iconBtn, padding: '4px 6px', color: 'var(--text-2)' }}>{label}</button>;
}

const iconBtn = {
  background: 'transparent', border: 'none', color: 'var(--text-2)',
  padding: '4px 6px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6,
  fontFamily: 'inherit', fontSize: 'inherit',
};

// ============================================================
// LOGO — original mark: stacked offset chevrons
// ============================================================
function Logo({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 8 L12 3 L21 8 L12 13 Z" fill="var(--primary)" />
      <path d="M3 13 L12 8 L21 13 L12 18 Z" fill="var(--primary)" opacity="0.55" />
      <path d="M3 18 L12 13 L21 18 L12 23 Z" fill="var(--primary)" opacity="0.25" />
    </svg>
  );
}

// ============================================================
// WINDOW — draggable, resizable-ish, custom chrome
// Original chrome: 3 small rounded squares with glyph icons,
// in indigo/amber/teal brand colors (not circular traffic lights).
// ============================================================
function Window({ win, focused, onFocus, onClose, onMin, onMax, onMove, onResize, children }) {
  const startRef = useRef(null);
  const winRef = useRef(null);

  const onMouseDown = (e) => {
    if (e.target.closest('[data-no-drag]')) return;
    onFocus();
    startRef.current = { x: e.clientX, y: e.clientY, ox: win.x, oy: win.y };
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const dy = ev.clientY - startRef.current.y;
      onMove(Math.max(0, startRef.current.ox + dx), Math.max(32, startRef.current.oy + dy));
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  const onResizeDown = (e) => {
    e.preventDefault();
    onFocus();
    const startX = e.clientX, startY = e.clientY;
    const startW = win.w || 640, startH = win.h || 480;
    const move = (ev) => {
      const dw = ev.clientX - startX;
      const dh = ev.clientY - startY;
      onResize && onResize(Math.max(300, startW + dw), Math.max(200, startH + dh));
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (win.minimized) return null;

  const w = win.maximized ? window.innerWidth - 24 : win.w;
  const h = win.maximized ? window.innerHeight - 32 - 88 : win.h;
  const x = win.maximized ? 12 : win.x;
  const y = win.maximized ? 38 : win.y;

  return (
    <div
      ref={winRef}
      onMouseDown={onFocus}
      style={{
        position: 'absolute', left: x, top: y, width: w, height: h,
        background: 'var(--surface)',
        border: `1px solid ${focused ? 'var(--border-2)' : 'var(--border)'}`,
        borderRadius: 12,
        boxShadow: focused
          ? '0 24px 60px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(108,99,255,0.15)'
          : '0 14px 32px -10px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column',
        zIndex: win.z,
        overflow: 'hidden',
        transition: 'box-shadow 180ms ease, border-color 180ms ease',
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={onMouseDown}
        onDoubleClick={onMax}
        style={{
          height: 38, flexShrink: 0,
          background: 'linear-gradient(180deg, var(--elev), var(--elev-2))',
          borderBottom: '1px solid var(--border)',
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center', padding: '0 12px',
          cursor: 'grab',
        }}
      >
        {/* Controls — original square brand-colored buttons with glyphs */}
        <div data-no-drag style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <WinBtn color="var(--red)"   onClick={onClose} glyph="close"  title="Close" />
          <WinBtn color="var(--amber)" onClick={onMin}   glyph="min"    title="Minimize" />
          <WinBtn color="var(--teal)"  onClick={onMax}   glyph="max"    title={win.maximized ? 'Restore' : 'Maximize'} />
          <div style={{
            marginLeft: 10, fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--text-3)', letterSpacing: '0.04em'
          }}>
            ~/{win.slug}
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: focused ? 'var(--text)' : 'var(--text-2)',
          letterSpacing: '0.06em', textTransform: 'lowercase',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {win.icon && <span style={{ color: 'var(--primary)' }}>{win.icon}</span>}
          {win.title}
        </div>
        <div data-no-drag style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, color: 'var(--text-3)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{win.badge || ''}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{
        flex: 1, overflow: 'auto', position: 'relative',
        background: 'var(--surface)',
      }}>
        {children}
      </div>

      {/* Resize handle (interactive) */}
      <div onMouseDown={onResizeDown} style={{
        position: 'absolute', right: 0, bottom: 0, width: 20, height: 20,
        cursor: 'se-resize', opacity: 0.6, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
        padding: '4px 4px',
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 10 L10 2 M5 11 L11 5 M8 11 L11 8" stroke="var(--text-3)" strokeWidth="1" /></svg>
      </div>
    </div>
  );
}

function WinBtn({ color, onClick, glyph, title }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={title}
      style={{
        width: 14, height: 14, borderRadius: 4,
        background: color,
        border: '1px solid rgba(0,0,0,0.25)',
        padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 120ms ease, transform 120ms',
        boxShadow: hover ? '0 2px 6px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <svg width="8" height="8" viewBox="0 0 8 8" style={{ opacity: hover ? 1 : 0.95 }}>
        {glyph === 'close' && <path d="M2 2 L6 6 M6 2 L2 6" stroke="rgba(0,0,0,0.8)" strokeWidth="1.4" strokeLinecap="round"/>}
        {glyph === 'min'   && <path d="M2 4 L6 4" stroke="rgba(0,0,0,0.8)" strokeWidth="1.4" strokeLinecap="round"/>}
        {glyph === 'max'   && <path d="M2 2 L6 2 L6 6 L2 6 Z" stroke="rgba(0,0,0,0.8)" strokeWidth="1" fill="none"/>}
      </svg>
    </button>
  );
}

// ============================================================
// DOCK — bottom, frosted, with hover lift + label + shortcuts
// ============================================================
function Dock({ apps, onLaunch, openIds }) {
  const [hover, setHover] = useState(null);
  const [clicked, setClicked] = useState(null);
  const dockRef = useRef(null);
  const iconRefs = useRef([]);
  const [pointerX, setPointerX] = useState(null);

  const handleClick = (appId) => {
    setClicked(appId);
    setTimeout(() => setClicked(null), 400);
    onLaunch(appId);
  };

  return (
    <>
      <style>{`
        @keyframes dockGlow {
          0%, 100% { filter: drop-shadow(0 8px 16px rgba(108,99,255,0.3)); }
          50% { filter: drop-shadow(0 12px 28px rgba(108,99,255,0.6)); }
        }
        @keyframes dockBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes dockRotate {
          0% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(8deg); }
        }
        .dock-icon-hover {
          animation: dockGlow 1.2s ease-in-out infinite;
        }
      `}</style>
      <div style={{
        position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
        zIndex: 900, display: 'flex', alignItems: 'flex-end', gap: 8,
        padding: '14px 18px',
        background: 'rgba(28,28,38,0.65)',
        backdropFilter: 'blur(24px) saturate(140%)', WebkitBackdropFilter: 'blur(24px) saturate(140%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24,
        boxShadow: '0 18px 40px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      ref={dockRef}
      onMouseMove={(e) => {
        if (!dockRef.current) return;
        const dockRect = dockRef.current.getBoundingClientRect();
        const x = e.clientX - dockRect.left;
        setPointerX(x);

        let nearest = null;
        let nearestDistance = Infinity;
        iconRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const centerX = rect.left - dockRect.left + rect.width / 2;
          const distance = Math.abs(x - centerX);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = idx;
          }
        });
        setHover(nearest);
      }}
      onMouseLeave={() => {
        setPointerX(null);
        setHover(null);
      }}>
        {apps.map((app, i) => {
          const isHover = hover === i;
          const isOpen = openIds.includes(app.id);
          const isClickBouncing = clicked === app.id;
          const shortcutKey = i + 1;
          const centerX = pointerX === null || !dockRef.current || !iconRefs.current[i]
            ? null
            : (iconRefs.current[i].getBoundingClientRect().left - dockRef.current.getBoundingClientRect().left)
              + (iconRefs.current[i].getBoundingClientRect().width / 2);
          const hoverDistance = pointerX === null || !dockRef.current || !iconRefs.current[i]
            ? null
            : Math.abs(pointerX - (
                iconRefs.current[i].getBoundingClientRect().left - dockRef.current.getBoundingClientRect().left +
                iconRefs.current[i].getBoundingClientRect().width / 2
              ));
          const shiftAmount = pointerX === null || centerX === null
            ? 0
            : Math.max(-18, Math.min(18, (pointerX - centerX) * 0.14));
          const magnifyScale = hoverDistance === null
            ? 1
            : Math.max(1, 1.34 - (hoverDistance * 0.0065));
          const liftAmount = hoverDistance === null
            ? 0
            : Math.max(0, 20 - (hoverDistance * 0.09));
          const glowStrength = hoverDistance === null
            ? 0
            : Math.max(0, 1 - (hoverDistance / 220));
          return (
            <div key={app.id}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{
                position: 'absolute', inset: -10,
                borderRadius: '50%',
                background: isHover
                  ? 'radial-gradient(circle, rgba(108,99,255,0.42) 0%, rgba(108,99,255,0.22) 38%, rgba(108,99,255,0.0) 72%)'
                  : 'transparent',
                filter: 'blur(4px)',
                transform: isHover ? 'scale(1.1)' : 'scale(0.9)',
                transition: 'transform 220ms cubic-bezier(.34,1.56,.64,1), background 180ms',
                pointerEvents: 'none',
              }} />
              {isHover && (
                <div style={{
                  position: 'absolute', bottom: 'calc(100% + 22px)', zIndex: 5,
                  background: 'rgba(10,10,15,0.96)', color: '#F0F0FF',
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)',
                  whiteSpace: 'nowrap', pointerEvents: 'none',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.65)',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5,
                  animation: 'slideInDown 200ms ease-out',
                  backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 13, letterSpacing: '0.01em' }}>{app.label}</div>
                  {app.desc && <div style={{ fontSize: 10, color: '#cfd3e6', fontFamily: 'var(--font-body)', lineHeight: 1.25 }}>{app.desc}</div>}
                  <div style={{ fontSize: 10, color: '#aab0ca', marginTop: 2 }}>Press <kbd style={{ background: 'var(--primary)', color: 'white', padding: '1px 5px', borderRadius: 3, fontFamily: 'inherit' }}>{shortcutKey}</kbd></div>
                </div>
              )}
              <button
                ref={el => { iconRefs.current[i] = el; }}
                onClick={() => handleClick(app.id)}
                title={`${app.label} (${shortcutKey})`}
                className={isHover ? 'dock-icon-hover' : ''}
                style={{
                  width: 60, height: 60, borderRadius: '9999px',
                  background: app.bg || 'linear-gradient(135deg, #2a2a40, #1c1c26)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: isClickBouncing 
                    ? 'translateY(-12px) scale(1.2) rotateZ(-5deg)'
                    : `translateX(${shiftAmount}px) translateY(${-liftAmount}px) scale(${magnifyScale}) rotateZ(${isHover ? 3 : 0}deg)`,
                  transition: 'transform 220ms cubic-bezier(.34,1.56,.64,1), box-shadow 180ms, filter 200ms',
                  boxShadow: isClickBouncing 
                    ? '0 18px 36px -6px rgba(108,99,255,0.55), 0 0 0 2px rgba(108,99,255,0.4), 0 0 24px rgba(108,99,255,0.28)'
                    : isHover 
                      ? `0 14px 24px -6px rgba(108,99,255,${0.45 + (glowStrength * 0.15)}), 0 0 ${18 + (glowStrength * 16)}px rgba(108,99,255,${0.20 + (glowStrength * 0.22)}), 0 0 0 2px rgba(255,255,255,0.12) inset`
                      : glowStrength > 0
                        ? `0 8px 18px -8px rgba(108,99,255,${0.18 + (glowStrength * 0.12)}), 0 0 ${10 + (glowStrength * 12)}px rgba(108,99,255,${0.08 + (glowStrength * 0.12)})`
                        : '0 4px 12px rgba(0,0,0,0.35)',
                  color: app.fg || 'var(--primary-2)',
                  fontSize: 20,
                  cursor: 'pointer',
                  willChange: 'transform, box-shadow, filter',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {app.icon}
              </button>
              <div style={{
                width: 3, height: 3, borderRadius: '50%', marginTop: 2,
                background: isOpen ? 'var(--primary)' : 'transparent',
                boxShadow: isOpen ? '0 0 4px var(--primary)' : 'none',
                transition: 'background 180ms',
              }} />
            </div>
          );
        })}
      </div>
    </>
  );
}

// ============================================================
// DESKTOP ICONS — grid, top-right area
// ============================================================
function DesktopIcons({ icons, onOpen }) {
  return (
    <div style={{
      position: 'absolute', top: 56, right: 24,
      display: 'grid', gridTemplateColumns: 'repeat(2, 88px)', gap: 18,
      zIndex: 10,
    }}>
      {icons.map(icon => (
        <button
          key={icon.id}
          onDoubleClick={() => onOpen(icon.id)}
          onClick={(e) => { if (e.detail === 1) e.currentTarget.classList.toggle('sel'); }}
          style={{
            background: 'transparent', border: 'none', padding: '6px 4px', borderRadius: 8,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            color: 'var(--text)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,99,255,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: icon.bg || 'linear-gradient(135deg, #1c1c26, #13131a)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: icon.fg || 'var(--primary-2)',
            boxShadow: '0 8px 18px -6px rgba(0,0,0,0.6)',
          }}>
            {icon.icon}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text)',
            textShadow: '0 1px 4px rgba(0,0,0,0.7)',
            maxWidth: 80, textAlign: 'center', lineHeight: 1.2,
          }}>{icon.label}</div>
        </button>
      ))}
    </div>
  );
}

// ============================================================
// SPOTLIGHT — slides down from top, type to jump
// ============================================================
function Spotlight({ open, onClose, items, onPick }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (open) { setQ(''); setTimeout(() => inputRef.current && inputRef.current.focus(), 30); }
  }, [open]);
  const filtered = items.filter(it =>
    !q || it.label.toLowerCase().includes(q.toLowerCase()) || (it.hint||'').toLowerCase().includes(q.toLowerCase()) || (it.desc||'').toLowerCase().includes(q.toLowerCase())
  ).slice(0, 8);

  if (!open) return null;

  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 2000,
      background: 'rgba(10,10,15,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: 560, background: 'var(--elev)', border: '1px solid var(--border-2)',
        borderRadius: 14, overflow: 'hidden',
        boxShadow: '0 30px 80px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(108,99,255,0.15)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 18px', borderBottom: '1px solid var(--border)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-2)" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'Enter' && filtered[0]) { onPick(filtered[0]); onClose(); }
            }}
            placeholder="Jump to a section, project, or skill…"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text)', fontSize: 16, fontFamily: 'var(--font-body)',
            }}
          />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)',
            padding: '2px 6px', border: '1px solid var(--border)', borderRadius: 4,
          }}>ESC</span>
        </div>
        <div style={{ padding: 6, maxHeight: 360, overflowY: 'auto' }}>
          {filtered.length === 0 && (
            <div style={{ padding: 24, color: 'var(--text-3)', textAlign: 'center', fontSize: 13 }}>
              No matches for "{q}"
            </div>
          )}
          {filtered.map((it, i) => (
            <button key={it.id} onClick={() => { onPick(it); onClose(); }}
              style={{
                width: '100%', textAlign: 'left', background: i === 0 ? 'var(--elev-2)' : 'transparent',
                border: 'none', padding: '10px 12px', borderRadius: 8,
                display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--elev-2)'}
              onMouseLeave={e => e.currentTarget.style.background = i === 0 ? 'var(--elev-2)' : 'transparent'}
            >
              <span style={{
                width: 28, height: 28, borderRadius: 6, background: 'var(--surface)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--primary-2)',
              }}>{it.icon}</span>
              <span style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{it.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text-2)', marginTop: 2 }}>{it.desc}</div>
                {it.hint && <div style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>~/{it.hint}</div>}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>↵</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MenuBar, Window, Dock, DesktopIcons, Spotlight, Logo });
