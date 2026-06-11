/**
 * ============================================================================
 * File: components/sections/NarrativeHero.js
 * ============================================================================
 * Version: 7.0.0
 *
 * Modification Reason:
 *   v7.0 — Full replacement of the v6 "question list" hero with the
 *   cinematic Act I: the Privacy Lens (signature interaction) over a live
 *   Watcher Field background. A draggable divider splits one warm scene
 *   (you + your AI agent booking a flight, paying via x402) from the same
 *   scene as the network sees it (unreadable ciphertext). As the encryption
 *   frontier advances, the watching eyes behind it go dark — privacy is the
 *   visitor turning the watchers off.
 *
 * Main Functionality:
 *   - WatcherField: section-scoped canvas of eyes that blink (asymmetric),
 *     track the cursor (spring-lagged pupils), and get blinded by the
 *     encryption frontier. Relay mesh + hex packets travel between them.
 *   - Privacy Lens: auto-sweeps until the visitor drags; stamps
 *     "PLAINTEXT RECOVERED: 0 B" at the cipher end.
 *   - Eye silencing is driven by the Lens split via splitRef (shared ref),
 *     read fresh every animation frame — no React re-render in the hot loop.
 *
 * Dependencies:
 *   - framer-motion (already in project)
 *   - ../ui/Container (project layout primitive)
 *   Provides: the <NarrativeHero /> section consumed by pages/index.js
 *
 * Main Logical Flow:
 *   1. WatcherField builds eyes/nodes/edges sized to the section, runs rAF.
 *   2. Hero owns `split` state; splitRef mirrors it each render.
 *   3. Each frame: frontierX = split% × canvasWidth → eyes left of it close.
 *   4. Auto-sweep animates split; pointer drag overrides it.
 *
 * ⚠️ Important Notes for Next Developer:
 *   - The eyes canvas is position:absolute (section-scoped) and sits ABOVE
 *     the global MinimalAILBackground via a solid section backdrop. Do NOT
 *     make it fixed/inset-0 again or it will cover the whole site.
 *   - Brand palette only: purple #7762F3 / #9788F7, blue #5FBBF7. No green.
 *   - prefers-reduced-motion: eyes freeze half-open, packets off, Lens is a
 *     static 50/50 split. Keep this branch intact for accessibility.
 *   - splitRef.current is assigned during render on purpose (cheap, keeps the
 *     rAF loop dependency-free). Do not move it into the hot loop's deps.
 *
 * Last Modified: v7.4.0 — Restraint pass: copy down to headline + one-line
 *   subhead + CTAs; sparser/dimmer/slower eyes; Lens stripped to scene +
 *   divider + minimal drag hint (removed scanlines, footer monitor, stamp).
 * ============================================================================
 */

import { useState, useEffect, useRef } from 'react';
import Container from '../ui/Container';

// ---- Brand palette (no green) ----
const ACCENT = '#7762F3';     // brand purple — packets, verified, primary CTA
const ACCENT_LT = '#9788F7';  // light purple — glow accents
const SCAN = '#5FBBF7';       // brand blue — Lens divider / cipher view

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
// BACKGROUND — WatcherField (section-scoped canvas of eyes)
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
      // Eye count self-scales with area; sparse on purpose — peripheral unease,
      // not foreground noise. Desktop ~8-12, mobile ~4-6.
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

    // Static render for reduced-motion: frozen half-open eyes, no packets.
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

      // Encryption frontier: the Lens split (0-100%) mapped to canvas x.
      // Everything left of it is "encrypted" → those eyes go blind.
      const frontierX = (splitRef.current / 100) * W;
      const idle = !mouse.current.active && now - lastMove.current > 10000;
      const idlePhase = idle ? Math.min((now - lastMove.current - 10000) / 1000, 1) : 0;
      const cx = W / 2, cy = H / 2;

      // --- mesh edges ---
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(119,98,243,0.05)';
      edges.forEach((e) => {
        ctx.beginPath();
        ctx.moveTo(nodes[e.a].x, nodes[e.a].y);
        ctx.lineTo(nodes[e.b].x, nodes[e.b].y);
        ctx.stroke();
      });
      // --- relay nodes ---
      nodes.forEach((nd) => {
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(119,98,243,0.18)';
        ctx.fill();
      });

      // --- packets (hex ciphertext travelling the relay mesh) — quiet, no glow ---
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

      // --- eyes ---
      eyes.forEach((e) => {
        // Eyes inside the encrypted region go dark; reopen if frontier recedes.
        const blinded = e.x <= frontierX;

        if (blinded) {
          e.target = 0; // encrypted: nothing to see, eye closes
        } else if (now > e.nextBlink) {
          e.target = 0;
          if (e.open < 0.06) {
            e.target = 1;
            e.nextBlink = now + 2500 + Math.random() * 6000;
          }
        } else {
          e.target = 1;
        }

        // Asymmetric blink: close fast, open slow (blinded = calm shutdown).
        const closing = e.target < e.open;
        const lidSpeed = closing ? (blinded ? 13 : 22) : 7;
        e.open += (e.target - e.open) * Math.min(dt * lidSpeed, 1);

        // Gaze target: idle-converge → cursor → nearest packet → wander.
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

        // Pupil spring: ~150ms lag + slight overshoot = lifelike.
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

    // NOTE: section-scoped → use offset coords relative to the canvas rect.
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
// FOREGROUND — Privacy Lens scene (warm) / cipher view (cold)
// ============================================================================
function Bubble({ msg, cipher, idx }) {
  const isYou = msg.from === 'you';
  if (cipher)
    return (
      <div className={`flex ${isYou ? 'justify-end' : 'justify-start'} mb-3`}>
        <div className="max-w-[78%] rounded-2xl px-4 py-3"
          style={{ background: 'rgba(95,187,247,0.04)', border: '1px solid rgba(95,187,247,0.14)' }}>
          <div className="text-[9px] break-all leading-relaxed"
            style={{ fontFamily: 'monospace', color: 'rgba(95,187,247,0.45)' }}>
            {CIPHER[idx].hex}
          </div>
          <div className="text-[8px] mt-1.5 tracking-wider"
            style={{ fontFamily: 'monospace', color: 'rgba(95,187,247,0.3)' }}>
            TLS 1.3 · {CIPHER[idx].size} B · sender unknown
          </div>
        </div>
      </div>
    );
  if (msg.receipt)
    return (
      <div className="flex justify-start mb-3">
        <div className="max-w-[78%] rounded-2xl px-4 py-3"
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
            style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)' }}>
            548 USDC · x402 · signed Ed25519 ✓
          </div>
        </div>
      </div>
    );
  return (
    <div className={`flex ${isYou ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className="max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
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
            style={{ fontFamily: 'monospace', color: 'rgba(95,187,247,0.45)' }}>
            INTERCEPT — udp :51820 · classified: HTTPS
          </span>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
              style={{ background: 'rgba(119,98,243,0.18)', color: ACCENT_LT }}>A</div>
            <div>
              <div className="text-sm font-medium">Aria — your agent</div>
              <div className="text-[9px] tracking-wide" style={{ color: ACCENT_LT, fontFamily: 'monospace' }}>
                🔒 end-to-end encrypted · verified
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
// NarrativeHero — Act I
// ============================================================================
const NarrativeHero = () => {
  // SSR-safe: assume motion on the server, detect reduced-motion after mount
  // to avoid hydration mismatch. WatcherField re-inits when `reduced` flips.
  const [reduced, setReduced] = useState(false);
  const [split, setSplit] = useState(50);
  const [hint, setHint] = useState(true);

  const boxRef = useRef(null);
  const scrub = useRef(false);
  const auto = useRef(true);
  const dir = useRef(1);
  const splitRef = useRef(50);

  // Mirror split into a ref so the rAF loop reads it without re-subscribing.
  splitRef.current = split;

  // Detect reduced-motion preference once mounted (client only).
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange); // Safari < 14
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else if (mq.removeListener) mq.removeListener(onChange);
    };
  }, []);

  // Auto-sweep the Lens gently until the visitor interacts. Quiet loop —
  // no stamp/ceremony, just a slow back-and-forth so the idea reads itself.
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

  // Drag the divider → manual control. Pointer events cover mouse + most
  // touch; explicit touch listeners are the iOS Safari fallback (non-passive
  // so we can preventDefault and stop the page from scrolling mid-drag).
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
      scrub.current = true; auto.current = false; setHint(false);
      moveTo(e.clientX);
    };
    const move = (e) => { if (scrub.current) moveTo(e.clientX); };
    const up = () => { scrub.current = false; };

    const tStart = (e) => {
      if (!inside(e.target)) return;
      scrub.current = true; auto.current = false; setHint(false);
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

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#05050a' }}
    >
      {/* Solid backdrop: covers the global star background within this section. */}
      <div className="absolute inset-0" style={{ background: '#05050a', zIndex: 0 }} />

      {/* Eyes background (section-scoped) */}
      <WatcherField reduced={reduced} splitRef={splitRef} />

      <style>{`
        @keyframes nh-nudge { 0%,100% { transform: translateX(0); } 50% { transform: translateX(7px); } }
      `}</style>

      <Container className="relative">
        <div className="relative pt-28 sm:pt-32 md:pt-28 pb-16 md:pb-24" style={{ zIndex: 10 }}>

          {/* Desktop: two columns (copy left, Lens right). Mobile: stacked. */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">

            {/* ---- Left: copy + CTAs ---- */}
            <div className="text-center lg:text-left order-1">
              <h1 className="font-light leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(2rem, 3.4vw, 3.4rem)', letterSpacing: '-0.025em' }}>
                Your AI knows
                <br className="hidden sm:block" /> everything about you.
                <br />
                <span className="font-semibold">
                  No one else <span style={{ color: ACCENT_LT }}>should</span>.
                </span>
              </h1>

              <p className="text-base sm:text-lg font-light leading-relaxed mb-10 max-w-md mx-auto lg:mx-0"
                style={{ color: 'rgba(255,255,255,0.6)' }}>
                A private network for the AI era.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start">
                <a href="#download-vpn"
                  className="px-7 py-3.5 rounded-lg text-sm font-medium tracking-wide transition-transform hover:scale-[1.03]"
                  style={{ background: ACCENT, color: '#fff', boxShadow: `0 0 30px ${ACCENT}55` }}>
                  Get the private network
                </a>
                <a href="#how-it-works"
                  className="px-7 py-3.5 rounded-lg text-sm tracking-wide border transition-colors hover:border-white/40"
                  style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)' }}>
                  How it works
                </a>
              </div>
            </div>

            {/* ---- Right: the Privacy Lens ---- */}
            <div className="order-2">
              <p className="text-center text-[11px] sm:text-xs tracking-wide mb-3"
                style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                ◂ drag the line · see what the network sees ▸
              </p>

              <div ref={boxRef}
                className="relative w-full rounded-2xl border overflow-hidden select-none mx-auto"
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
                }}>
                <Scene cipher={false} />
                {/* clipPath inset() — fully supported in all evergreen browsers */}
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

                {hint && !reduced && (
                  <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none text-[9px] sm:text-[10px] tracking-widest whitespace-nowrap"
                    style={{ bottom: '20px', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace',
                      animation: 'nh-nudge 1.6s ease-in-out infinite' }}>
                    ◂ DRAG ▸
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default NarrativeHero;
