// Particle wallpaper — canvas, ~80 nodes, glow + connection lines
import React from 'react';
const { useEffect, useRef } = React;

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const nodesRef = useRef([]);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // seed nodes
    const N = 80;
    nodesRef.current = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1.3 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 0.8,
    }));

    function step(t) {
      if (!visibleRef.current) { rafRef.current = requestAnimationFrame(step); return; }
      ctx.clearRect(0, 0, w, h);

      // soft vignette / radial wash
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.45, 50, w * 0.5, h * 0.45, Math.max(w, h) * 0.7);
      grad.addColorStop(0, 'rgba(108,99,255,0.06)');
      grad.addColorStop(1, 'rgba(10,10,15,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const nodes = nodesRef.current;
      // update positions
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      }

      // connection lines
      const maxDist = 120;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < maxDist * maxDist) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / maxDist) * 0.18;
            ctx.strokeStyle = `rgba(108,99,255,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes with pulse glow
      const now = t * 0.001;
      for (const n of nodes) {
        const pulse = 0.55 + 0.45 * Math.sin(now * n.speed + n.phase);
        const r = n.r * (0.9 + 0.2 * pulse);
        // glow
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
        g.addColorStop(0, `rgba(108,99,255,${(0.45 * pulse).toFixed(3)})`);
        g.addColorStop(1, 'rgba(108,99,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2); ctx.fill();
        // core
        ctx.fillStyle = `rgba(180,175,255,${(0.55 + 0.35*pulse).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    const onVis = () => { visibleRef.current = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        display: 'block', zIndex: 0, pointerEvents: 'none',
      }}
    />
  );
}

window.ParticleCanvas = ParticleCanvas;
