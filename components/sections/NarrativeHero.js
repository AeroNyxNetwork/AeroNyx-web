/**
 * ============================================================================
 * File: components/sections/NarrativeHero.js
 * ============================================================================
 * Version: 8.0.0
 *
 * Modification Reason:
 *   v8.0 — Foreground rebuilt copy-first for the approved top-tier pass.
 *   The Lens demonstrates "the network sees only ciphertext"; the headline
 *   now IS that claim ("Built to see nothing"), so the interaction proves
 *   the copy instead of sitting beside it.
 *   NEW: staged entrance choreography; keyboard-driven Lens (role=slider,
 *   arrow keys); earned payoff stamp "PLAINTEXT RECOVERED: 0 B" at >92%
 *   manual drag; live encrypted-traffic counter embedded as on-page proof;
 *   Instrument Serif display headline; geometry aligned to 2/4/6px tokens.
 *   REMOVED: the three feature chips (clutter; their content lives in
 *   ProductsEcosystem) and the weak "◂ drag ▸" mono hint (elevated into
 *   the caption copy). Recoverable from v7.5 in version history.
 *
 * PRESERVED VERBATIM (do not touch):
 *   - WatcherField canvas engine (eyes, blink physics, pupil springs,
 *     packet mesh, splitRef contract, reduced-motion static branch)
 *   - Lens auto-sweep + pointer/touch drag logic
 *   - CONVO/CIPHER scene data, SSR-safe reduced-motion detection
 *
 * Dependencies:
 *   - framer-motion, ../ui/Container, ../ui/AnimatedMessageCounter (v2.0),
 *     ../../lib/hooks/useNetworkStats (already multi-consumer safe:
 *     Home + JoinNetwork call it concurrently)
 *   - pages/_app.js v2.2 (--font-display = Instrument Serif)
 *
 * ⚠️ Important Notes for Next Developer:
 *   - The eyes canvas is position:absolute (section-scoped). Do NOT make
 *     it fixed/inset-0 or it will cover the whole site.
 *   - Brand palette only: purple #7762F3 / #9788F7, blue #5FBBF7. No green.
 *   - Instrument Serif has weight 400 only — never bold the headline;
 *     emphasis = italic + ACCENT_LT.
 *   - splitRef.current is assigned during render on purpose. Keep it.
 *   - The payoff stamp must remain earned (manual drag only, >92%) — do
 *     not show it during auto-sweep or it loses all meaning.
 *
 * Last Modified: v8.0.0 — Copy-first foreground rebuild
 * ============================================================================
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';
import AnimatedMessageCounter from '../ui/AnimatedMessageCounter';
import useNetworkStats from '../../lib/hooks/useNetworkStats';

// ---- Brand palette (no green) ----
const ACCENT = '#7762F3';
const ACCENT_LT = '#9788F7';
const SCAN = '#5FBBF7';

const EASE = [0.16, 1, 0.3, 1];

const HEXC = '0123456789abcdef';
const rhex = (n) =>
  Array.from({ length: n }, () => HEXC[(Math.random() * 16) | 0]).join('');

// ---- The warm scene the Lens reveals ----
const CONVO = [
  { from: 'you', text: 'Find me a flight to Tokyo next Friday. Under $600.' },
  { from: 'ai', text: 'NH 854, nonstop, lands 4:10pm — $548. Want it?' },
  { from: 'you', text: 'Book it. Pay from my wallet.' },
  { from: 'ai', receipt: true },
];
const CIPHER = CONVO.map((m) => ({
  hex: rhex(m.receipt ? 96 : Math.min((m.text ? m.text.length * 2 : 60), 72)),
  size: m.receipt ? 412 : 180 + ((Math.random() * 140) | 0),
}));

// ============================================================================
// BACKGROUND — WatcherField (PRESERVED VERBATIM from v7.5)
// ============================================================================
function WatcherField({ reduced, splitRef }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const lastMove = useRef(performance.now());

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let W, H, dpr;
    let eyes = [], nodes = [], edges = [], packets = [];
    let raf, last = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const build = () => {
      eyes = [];
      const n = Math.max(4, Math.floor((W * H) / 110000));
      for (let i = 0; i < n; i++) {
        eyes.push({
          x: 40 + Math.random() * (W - 80),
          y: 40 + Math.random() * (H - 80),
          s: 10 + Math.random() * 16,
          open: reduced ? 0.5 : 0,
          target: reduced ? 0.5 : 1,
          glow: 0.1,
          nextBlink: performance.now() + 2000 + Math.random() * 9000,
          wander: Math.random() * Math.PI * 2,
          wspd: 0.12 + Math.random() * 0.22,
          px: 0, py: 0, pvx: 0, pvy: 0,
        });
      }
      nodes = [];
      const nn = Math.floor(W / 110) + 6;
      for (let i = 0; i < nn; i++)
        nodes.push({ x: Math.random() * W, y: Math.random() * H });
      edges = [];
      nodes.forEach((a, i) => {
        const ds = nodes
          .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
          .filter((o) => o.j !== i)
          .sort((p, q) => p.d - q.d)
          .slice(0, 2);
        ds.forEach((o) => {
          const key = [Math.min(i, o.j), Math.max(i, o.j)].join('-');
          if (!edges.find((e) => e.key === key)) edges.push({ key, a: i, b: o.j });
        });
      });
      packets = [];
    };

    const spawnPacket = () => {
      if (!edges.length) return;
      const e = edges[(Math.random() * edges.length) | 0];
      packets.push({ a: e.a, b: e.b, t: 0, spd: 0.08 + Math.random() * 0.1, hex: rhex(4), x: 0, y: 0 });
    };

    const eyePath = (e) => {
      const h = e.s * 0.55 * Math.max(e.open, 0.02);
      ctx.beginPath();
      ctx.moveTo(e.x - e.s, e.y);
      ctx.quadraticCurveTo(e.x, e.y - h * 2, e.x + e.s, e.y);
      ctx.quadraticCurveTo(e.x, e.y + h * 2, e.x - e.s, e.y);
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(119,98,243,0.05)';
      edges.forEach((e) => {
        ctx.beginPath();
        ctx.moveTo(nodes[e.a].x, nodes[e.a].y);
        ctx.lineTo(nodes[e.b].x, nodes[e.b].y);
        ctx.stroke();
      });
      nodes.forEach((nd) => {
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(119,98,243,0.18)';
        ctx.fill();
      });
      eyes.forEach((e) => {
        e.open = 0.5;
        eyePath(e);
        ctx.strokeStyle = 'rgba(138,209,255,0.18)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, W, H);

      const frontierX = (splitRef.current / 100) * W;
      const idle = !mouse.current.active && now - lastMove.current > 10000;
      const idlePhase = idle ? Math.min((now - lastMove.current - 10000) / 1000, 1) : 0;
      const cx = W / 2, cy = H / 2;

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(119,98,243,0.05)';
      edges.forEach((e) => {
        ctx.beginPath();
        ctx.moveTo(nodes[e.a].x, nodes[e.a].y);
        ctx.lineTo(nodes[e.b].x, nodes[e.b].y);
        ctx.stroke();
      });
      nodes.forEach((nd) => {
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(119,98,243,0.18)';
        ctx.fill();
      });

      if (packets.length < 5 && Math.random() < 0.02) spawnPacket();
      packets = packets.filter((p) => p.t <= 1);
      packets.forEach((p) => {
        p.t += p.spd * dt * 2;
        const A = nodes[p.a], B = nodes[p.b];
        p.x = A.x + (B.x - A.x) * p.t;
        p.y = A.y + (B.y - A.y) * p.t;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(119,98,243,0.5)';
        ctx.fill();
        if (p.t >= 1) {
          const nexts = edges.filter((e) => e.a === p.b || e.b === p.b);
          if (nexts.length && Math.random() < 0.7) {
            const ne = nexts[(Math.random() * nexts.length) | 0];
            p.a = p.b;
            p.b = ne.a === p.b ? ne.b : ne.a;
            p.t = 0;
            p.hex = rhex(4);
          }
        }
      });

      eyes.forEach((e) => {
        const blinded = e.x <= frontierX;

        if (blinded) {
          e.target = 0;
        } else if (now > e.nextBlink) {
          e.target = 0;
          if (e.open < 0.06) {
            e.target = 1;
            e.nextBlink = now + 2500 + Math.random() * 6000;
          }
        } else {
          e.target = 1;
        }

        const closing = e.target < e.open;
        const lidSpeed = closing ? (blinded ? 13 : 22) : 7;
        e.open += (e.target - e.open) * Math.min(dt * lidSpeed, 1);

        let gx, gy, interest = 0;
        if (idlePhase > 0) {
          gx = e.x + (cx - e.x) * idlePhase;
          gy = e.y + (cy - e.y) * idlePhase;
          interest = 0.4 * idlePhase;
        } else {
          const md = Math.hypot(mouse.current.x - e.x, mouse.current.y - e.y);
          let pd = 1e9, pp = null;
          packets.forEach((p) => {
            const d = Math.hypot(p.x - e.x, p.y - e.y);
            if (d < pd) { pd = d; pp = p; }
          });
          if (mouse.current.active && md < 260) {
            gx = mouse.current.x; gy = mouse.current.y; interest = 1 - md / 260;
          } else if (pp && pd < 150) {
            gx = pp.x; gy = pp.y; interest = (1 - pd / 150) * 0.6;
          } else {
            e.wander += e.wspd * dt;
            gx = e.x + Math.cos(e.wander) * 100;
            gy = e.y + Math.sin(e.wander * 0.7) * 60;
          }
        }
        e.glow += ((0.08 + interest * 0.38) - e.glow) * Math.min(dt * 5, 1);

        const dx = gx - e.x, dy = gy - e.y;
        const d = Math.hypot(dx, dy) || 1;
        const m = e.s * 0.24;
        const tx = (dx / d) * m;
        const ty = (dy / d) * m * 0.6;
        const k = 60, damp = 9;
        e.pvx += (tx - e.px) * k * dt - e.pvx * damp * dt;
        e.pvy += (ty - e.py) * k * dt - e.pvy * damp * dt;
        e.px += e.pvx * dt;
        e.py += e.pvy * dt;

        const a = e.glow * Math.max(e.open, 0.15);
        eyePath(e);
        ctx.strokeStyle = `rgba(138,209,255,${0.1 + a * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (e.open > 0.18) {
          ctx.save();
          eyePath(e);
          ctx.clip();
          const px = e.x + e.px, py = e.y + e.py;
          ctx.beginPath();
          ctx.arc(px, py, e.s * 0.3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(138,209,255,${0.08 + a * 0.35})`;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(px, py, e.s * 0.14, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(138,209,255,${0.18 + a * 0.6})`;
          ctx.fill();
          ctx.restore();
        }
      });

      raf = requestAnimationFrame(frame);
    };

    const onMove = (ev) => {
      const r = cv.getBoundingClientRect();
      mouse.current = { x: ev.clientX - r.left, y: ev.clientY - r.top, active: true };
      lastMove.current = performance.now();
    };
    const onLeave = () => { mouse.current.active = false; };

    resize();
    window.addEventListener('resize', resize);
    if (!reduced) {
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(frame);
    } else {
      renderStatic();
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced, splitRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// ============================================================================
// FOREGROUND — scene bubbles (radii aligned to tokens in v8.0)
// ============================================================================
function Bubble({ msg, cipher, idx }) {
  const isYou = msg.from === 'you';
  if (cipher)
    return (
      <div className={`flex ${isYou ? 'justify-end' : 'justify-start'} mb-3`}>
        <div className="max-w-[78%] rounded-md px-4 py-3"
          style={{ background: 'rgba(95,187,247,0.04)', border: '1px solid rgba(95,187,247,0.14)' }}>
          <div className="text-[9px] break-all leading-relaxed"
            style={{ fontFamily: 'var(--font-mono), monospace', color: 'rgba(95,187,247,0.45)' }}>
            {CIPHER[idx].hex}
          </div>
          <div className="text-[8px] mt-1.5 tracking-wider"
            style={{ fontFamily: 'var(--font-mono), monospace', color: 'rgba(95,187,247,0.3)' }}>
            TLS 1.3 · {CIPHER[idx].size} B · sender unknown
          </div>
        </div>
      </div>
    );
  if (msg.receipt)
    return (
      <div className="flex justify-start mb-3">
        <div className="max-w-[78%] rounded-md px-4 py-3"
          style={{ background: 'rgba(119,98,243,0.08)', border: '1px solid rgba(119,98,243,0.28)' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px]"
              style={{ background: ACCENT, color: '#fff' }}>✓</span>
            <span className="text-xs font-medium" style={{ color: ACCENT_LT }}>Booked &amp; paid</span>
          </div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>
            NH 854 · Fri 09:40 → 16:10
          </div>
          <div className="text-[9px] mt-1.5 tracking-wide"
            style={{ fontFamily: 'var(--font-mono), monospace', color: 'rgba(255,255,255,0.35)' }}>
            548 USDC · x402 · signed Ed25519 ✓
          </div>
        </div>
      </div>
    );
  return (
    <div className={`flex ${isYou ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className="max-w-[78%] rounded-md px-4 py-2.5 text-sm leading-relaxed"
        style={isYou
          ? { background: 'rgba(119,98,243,0.12)', border: '1px solid rgba(119,98,243,0.2)', color: 'rgba(255,255,255,0.92)' }
          : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)' }}>
        {msg.text}
      </div>
    </div>
  );
}

function Scene({ cipher }) {
  return (
    <div className="absolute inset-0 flex flex-col px-5 sm:px-8 pt-5 pb-12">
      <div className="flex items-center justify-between pb-4 mb-4 border-b"
        style={{ borderColor: cipher ? 'rgba(95,187,247,0.1)' : 'rgba(255,255,255,0.07)' }}>
        {cipher ? (
          <span className="text-[10px] tracking-widest"
            style={{ fontFamily: 'var(--font-mono), monospace', color: 'rgba(95,187,247,0.45)' }}>
            INTERCEPT — udp :51820 · classified: HTTPS
          </span>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
              style={{ background: 'rgba(119,98,243,0.18)', color: ACCENT_LT }}>A</div>
            <div>
              <div className="text-sm font-medium">Aria — your agent</div>
              <div className="text-[9px] tracking-wide" style={{ color: ACCENT_LT, fontFamily: 'var(--font-mono), monospace' }}>
                end-to-end encrypted · verified
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1">
        {CONVO.map((m, i) => <Bubble key={i} msg={m} cipher={cipher} idx={i} />)}
      </div>
    </div>
  );
}

// ============================================================================
// NarrativeHero — v8.0
// ============================================================================

// Entrance choreography: eyes wake first (canvas), then copy rises in order.
const stageContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};
const stageItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const NarrativeHero = () => {
  const [reduced, setReduced] = useState(false);
  const [split, setSplit] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);

  const boxRef = useRef(null);
  const scrub = useRef(false);
  const auto = useRef(true);
  const dir = useRef(1);
  const splitRef = useRef(50);

  splitRef.current = split;

  const { stats } = useNetworkStats({
    period: '30d',
    autoRefresh: true,
    refreshInterval: 30000,
  });

  // SSR-safe reduced-motion detection (preserved from v7.5)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else if (mq.removeListener) mq.removeListener(onChange);
    };
  }, []);

  // Auto-sweep (preserved) — pauses forever once the visitor takes over.
  useEffect(() => {
    if (reduced) { setSplit(50); return; }
    let raf, segStart = performance.now();
    const loop = (now) => {
      if (scrub.current || !auto.current) { segStart = now; raf = requestAnimationFrame(loop); return; }
      const period = 5200;
      const t = (now - segStart) / period;
      if (t >= 1) {
        segStart = now;
        dir.current *= -1;
      } else {
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const from = dir.current === 1 ? 18 : 82;
        const to = dir.current === 1 ? 82 : 18;
        setSplit(from + (to - from) * e);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // Pointer + touch drag (preserved from v7.5)
  useEffect(() => {
    if (reduced) return;
    const moveTo = (cx) => {
      const r = boxRef.current?.getBoundingClientRect();
      if (!r || cx == null) return;
      setSplit(Math.max(0, Math.min(100, ((cx - r.left) / r.width) * 100)));
    };
    const inside = (target) => boxRef.current?.contains(target);

    const down = (e) => {
      if (!inside(e.target)) return;
      scrub.current = true; auto.current = false; setHasInteracted(true);
      moveTo(e.clientX);
    };
    const move = (e) => { if (scrub.current) moveTo(e.clientX); };
    const up = () => { scrub.current = false; };

    const tStart = (e) => {
      if (!inside(e.target)) return;
      scrub.current = true; auto.current = false; setHasInteracted(true);
      moveTo(e.touches?.[0]?.clientX);
    };
    const tMove = (e) => {
      if (!scrub.current) return;
      e.preventDefault();
      moveTo(e.touches?.[0]?.clientX);
    };
    const tEnd = () => { scrub.current = false; };

    window.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('touchstart', tStart, { passive: true });
    window.addEventListener('touchmove', tMove, { passive: false });
    window.addEventListener('touchend', tEnd);
    return () => {
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('touchstart', tStart);
      window.removeEventListener('touchmove', tMove);
      window.removeEventListener('touchend', tEnd);
    };
  }, [reduced]);

  // Keyboard-driven Lens (v8.0): focus the card, arrow keys sweep.
  const onLensKeyDown = (e) => {
    if (reduced) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    auto.current = false;
    setHasInteracted(true);
    setSplit((s) => Math.max(0, Math.min(100, s + (e.key === 'ArrowRight' ? 4 : -4))));
  };

  // Earned payoff: only after MANUAL interaction, at near-full cipher view.
  const showStamp = hasInteracted && split > 92;

  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--surface-0, #08080D)' }}>
      {/* Solid backdrop covers the global background within this section. */}
      <div className="absolute inset-0" style={{ background: 'var(--surface-0, #08080D)', zIndex: 0 }} />

      {/* Eyes background (section-scoped) */}
      <WatcherField reduced={reduced} splitRef={splitRef} />

      <Container className="relative">
        <div className="relative pt-28 sm:pt-32 md:pt-28 pb-16 md:pb-24" style={{ zIndex: 10 }}>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">

            {/* ---- Left: the claim ---- */}
            <motion.div
              className="text-center lg:text-left order-1"
              variants={stageContainer}
              initial={reduced ? false : 'hidden'}
              animate="show"
            >
              <motion.div
                variants={stageItem}
                className="inline-flex items-center gap-2 border px-3 py-1.5 text-[10px] uppercase tracking-eyebrow mb-6 rounded-sm"
                style={{
                  borderColor: 'rgba(151,136,247,0.22)',
                  background: 'rgba(119,98,243,0.06)',
                  color: 'rgba(210,205,255,0.78)',
                }}
              >
                Open privacy coordination protocol
              </motion.div>

              <motion.h1
                variants={stageItem}
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-display), Georgia, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(2.6rem, 5.2vw, 5rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.01em',
                }}
              >
                The network built
                <br />
                to see{' '}
                <em style={{ color: ACCENT_LT, fontStyle: 'italic' }}>nothing.</em>
              </motion.h1>

              <motion.p
                variants={stageItem}
                className="text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                Encrypted routing, private memory, and agent-native payments —
                coordinated over a blind relay fabric.{' '}
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                  What the network can't see, it can't leak, sell, or surrender.
                </span>
              </motion.p>

              <motion.div
                variants={stageItem}
                className="flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start mb-8"
              >
                <a href="#how-it-works"
                  className="px-7 py-3.5 rounded text-sm font-medium tracking-wide transition-transform duration-fast hover:scale-[1.02]"
                  style={{ background: ACCENT, color: '#fff', boxShadow: `0 0 30px ${ACCENT}40` }}>
                  Explore the protocol
                </a>
                <a href="#join-network"
                  className="px-7 py-3.5 rounded text-sm tracking-wide border transition-colors duration-fast hover:border-white/40"
                  style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)' }}>
                  Run a node
                </a>
              </motion.div>

              {/* Live proof (v8.0): the claim, happening right now */}
              <motion.div
                variants={stageItem}
                className="inline-block border border-white/10 rounded bg-white/[0.02] px-4 py-3 text-left"
              >
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-eyebrow text-white/35 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: ACCENT_LT }} />
                  Live — encrypted traffic relayed
                </div>
                <div className="max-w-[16rem]">
                  <AnimatedMessageCounter
                    value={stats.encryptedTrafficBytes}
                    fallback={stats.encryptedTraffic || 'Syncing'}
                    suffix="bytes"
                    pulseLabel="live"
                    defaultStep={1024}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* ---- Right: the proof ---- */}
            <motion.div
              className="order-2"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            >
              {/* Caption elevated from hint to narrative (v8.0) */}
              <p className="text-center text-xs tracking-wide mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Drag the lens — <span style={{ color: 'rgba(138,209,255,0.75)' }}>see what the network sees.</span>
              </p>

              <div
                ref={boxRef}
                role="slider"
                tabIndex={0}
                aria-label="Privacy lens: reveal what the network sees. Use left and right arrow keys."
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(split)}
                onKeyDown={onLensKeyDown}
                className="relative w-full rounded-md border overflow-hidden select-none mx-auto outline-none focus-visible:ring-1"
                style={{
                  maxWidth: '560px',
                  borderColor: 'rgba(255,255,255,0.1)',
                  background: 'rgba(10,10,17,0.92)',
                  WebkitBackdropFilter: 'blur(6px)',
                  backdropFilter: 'blur(6px)',
                  height: '440px',
                  touchAction: 'none',
                  cursor: reduced ? 'default' : 'ew-resize',
                  boxShadow: '0 0 80px rgba(0,0,0,0.8)',
                }}
              >
                <Scene cipher={false} />
                <div className="absolute inset-0"
                  style={{ clipPath: `inset(0 0 0 ${split}%)`, background: '#070c10' }}>
                  <Scene cipher />
                </div>

                {/* divider + handle */}
                <div className="absolute top-0 bottom-0 pointer-events-none"
                  style={{ left: `${split}%`, width: '2px', transform: 'translateX(-1px)',
                    background: `linear-gradient(to bottom, transparent, ${SCAN}, transparent)`,
                    boxShadow: `0 0 24px 4px ${SCAN}44` }} />
                <div className="absolute pointer-events-none flex items-center justify-center"
                  style={{ left: `${split}%`, top: '50%', transform: 'translate(-50%,-50%)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(6,6,10,0.9)', border: `1px solid ${SCAN}`, boxShadow: `0 0 18px ${SCAN}55` }}>
                    <span style={{ color: SCAN, fontSize: 13, letterSpacing: '-2px' }}>‹ ›</span>
                  </div>
                </div>

                {/* Earned payoff stamp (v8.0): manual full-cipher view only */}
                <AnimatePresence>
                  {showStamp && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="absolute top-4 right-4 px-2.5 py-1.5 text-[10px] tracking-[0.14em] rounded-sm border"
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        color: SCAN,
                        borderColor: `${SCAN}55`,
                        background: 'rgba(7,12,16,0.9)',
                        boxShadow: `0 0 16px ${SCAN}22`,
                      }}
                    >
                      PLAINTEXT RECOVERED: 0 B
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default NarrativeHero;
