/**
 * ============================================================================
 * File: components/ui/ProductLens.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-12 by Claude] The homepage's one signature
 * interaction. The real product — the Nightglass chat screen, an encrypted
 * conversation with a wallet receipt inside it — sits behind a lens the
 * visitor drags to reveal what a relay node actually holds: sealed blobs,
 * sizes, hop counts, no sender. The headline claims "private by
 * construction"; this lets the visitor prove it by hand.
 *
 * Ported from NarrativeHero v8 and kept: auto-sweep that stops forever once
 * the visitor takes over, pointer + touch drag, keyboard slider (role=slider,
 * arrow keys), reduced-motion static branch, and the earned stamp
 * ("PLAINTEXT RECOVERED: 0 B") that appears only after a MANUAL drag past
 * 92% — never during the auto-sweep, or it means nothing.
 *
 * What changed: the scene is the product, not a mock agent; the chassis is a
 * phone; the ciphertext comes from a fixed-seed PRNG so the server and the
 * client render the same bytes (no hydration drift).
 *
 * 2026-09-13 compatibility pass: phone height via .ng-phone::before padding
 * (aspect-ratio collapsed on older Safari/WebViews), -webkit-clip-path beside
 * clip-path, and touch-action:pan-y with horizontal-gesture detection so the
 * lens never swallows the page scroll on phones.
 *
 * 2026-09-13 LAYER FIX — the visible "the lens hides nothing" bug.
 * styles/globals.css carries two page-wide rules that hijack Tailwind utility
 * classes:
 *     .text-white, .text-neutral-300, .text-neutral-200 { position: relative;
 *                                                        z-index: 5 }
 *     .text-center                                      { position: relative;
 *                                                        z-index: 5 }
 * They exist so page copy floats above the background canvas, but they reach
 * inside every component. Every plaintext element in the phone carrying
 * `text-white` — the contact name, the received amount, the avatar, the tab
 * labels — was lifted to z-index 5 while the ciphertext overlay sat at
 * z-index auto, so the plaintext painted straight through the "sealed" view
 * wherever the lens was. The clip was never the problem. The two layers now
 * declare their own stacking order (0 / 1 / 2) and isolate themselves, so no
 * page-level utility rule can reorder what lives inside them.
 *
 * Dependencies: framer-motion; styles/globals.css (.ng-phone, .ng-glass,
 * .ng-display); lib/i18n-nightglass (copy.hero + copy.phone).
 * ============================================================================
 */

import { memo, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NYX = '#7462F7';
const NYX_LT = '#A594FF';
const CYAN = '#00C2E0';
const SIGNAL = '#14F195';
const COMPACT_START = 72; // small screens start readable, the visitor drags into ciphertext
const MONO = { fontFamily: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace' };

// Fixed-seed PRNG: the "intercepted" bytes must be byte-identical on the
// server and the client, or React reports a hydration mismatch on every load.
function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const rand = seeded(0x4e59);
const HEX = '0123456789abcdef';
const hex = (n) => Array.from({ length: n }, () => HEX[Math.floor(rand() * 16)]).join('');
const BLOBS = [
  { bytes: 164, hex: hex(52) },
  { bytes: 182, hex: hex(64) },
  { bytes: 233, hex: hex(84) },
  { bytes: 148, hex: hex(56) },
  { bytes: 96, hex: hex(40) },
];

const TAB_ICONS = ['chat', 'globe', 'sparkle', 'wallet', 'person'];
// Computed once: anything drawn from the PRNG inside render would differ
// between the server pass and the client pass.
const TAB_HEX = TAB_ICONS.map(() => hex(4));

/* Nyx Glyphs 2 — 24 grid, stroke 1.75, round caps (mirrors the app). */
function Glyph({ name, className = '', style }) {
  const paths = {
    chat: <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3.5V16a2 2 0 0 1-1-1.7V6z" />,
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
      </>
    ),
    sparkle: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />,
    wallet: (
      <>
        <path d="M3 8a3 3 0 0 1 3-3h12v4H6a3 3 0 0 1-3-3z" />
        <path d="M3 8v9a3 3 0 0 0 3 3h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H6" />
        <circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </>
    ),
    send: <path d="M3 11l18-8-6 18-3-7-9-3z" />,
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Bubble({ side, cipher, blob, meta, children }) {
  const right = side === 'right';
  if (cipher) {
    return (
      <div
        className={`max-w-[84%] rounded-[14px] px-3 py-2.5 ${right ? 'self-end' : 'self-start'}`}
        style={{ background: 'rgba(0,194,224,0.05)', border: '1px solid rgba(0,194,224,0.14)' }}
      >
        <div className="break-all text-[9px] leading-relaxed" style={{ ...MONO, color: 'rgba(0,194,224,0.5)' }}>
          {blob.hex}
        </div>
        <div className="mt-1.5 text-[8px] tracking-wider" style={{ ...MONO, color: 'rgba(0,194,224,0.34)' }}>
          {meta.replace('{bytes}', String(blob.bytes))}
        </div>
      </div>
    );
  }
  return (
    <div
      className={`max-w-[80%] rounded-[14px] px-3.5 py-2.5 text-[13px] leading-snug ${right ? 'self-end' : 'self-start'}`}
      style={right
        ? { background: NYX, color: '#fff' }
        : { background: 'var(--ng-slate2)', color: 'rgba(255,255,255,0.88)' }}
    >
      {children}
    </div>
  );
}

/* memo: the sweep changes `split` up to 60×/s on the wrapper above. Neither
   screen depends on it, and both props are referentially stable, so the two
   ~80-node subtrees are reconciled once instead of once per frame. */
const PhoneScreen = memo(function PhoneScreen({ phone, cipher }) {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: cipher ? '#070A14' : 'var(--ng-ink)' }}>
      {/* Header (status-bar height reserved for the island) */}
      <div
        className="flex items-center gap-3 px-4 pb-3"
        style={{ paddingTop: 46, borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {cipher ? (
          <div className="flex w-full items-center justify-between">
            <span className="text-[10px] uppercase tracking-eyebrow" style={{ ...MONO, color: CYAN }}>
              {phone.cipherHeader}
            </span>
            <span className="text-[10px]" style={{ ...MONO, color: 'rgba(0,194,224,0.55)' }}>TLS 1.3</span>
          </div>
        ) : (
          <>
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] text-sm font-semibold text-white"
              style={{ background: NYX }}
            >
              {phone.contact.slice(0, 1)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold text-white">{phone.contact}</div>
              <div className="mt-0.5 flex items-center gap-1 text-[11px] text-white/55">
                <Glyph name="lock" className="h-3 w-3" />
                <span className="truncate">{phone.status}</span>
              </div>
            </div>
            <Glyph name="mic" className="h-4 w-4 text-white/55" />
          </>
        )}
      </div>

      {/* Conversation */}
      <div className="flex flex-1 flex-col justify-end gap-2.5 px-3 pb-3">
        <Bubble side="left" cipher={cipher} blob={BLOBS[0]} meta={phone.cipherMeta}>{phone.m0}</Bubble>
        <Bubble side="right" cipher={cipher} blob={BLOBS[1]} meta={phone.cipherMeta}>{phone.m1}</Bubble>
        <Bubble side="left" cipher={cipher} blob={BLOBS[2]} meta={phone.cipherMeta}>{phone.m2}</Bubble>
        {cipher ? (
          <Bubble side="left" cipher blob={BLOBS[3]} meta={phone.cipherMeta} />
        ) : (
          <div
            className="max-w-[78%] self-start rounded-[14px] px-4 py-3"
            style={{ background: 'var(--ng-slate)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-eyebrow" style={{ color: SIGNAL }}>
              <span aria-hidden="true">↓</span>
              {phone.received}
            </div>
            <div className="ng-display mt-1 text-[26px] leading-none text-white">{phone.receivedAmount}</div>
            <div className="mt-1.5 text-[11px] text-white/45" style={MONO}>{phone.receivedMeta}</div>
          </div>
        )}
        <Bubble side="right" cipher={cipher} blob={BLOBS[4]} meta={phone.cipherMeta}>{phone.m3}</Bubble>
      </div>

      {/* Composer */}
      <div className="px-3 pb-2">
        {cipher ? (
          <div
            className="rounded-[14px] px-3 py-2.5 text-[9px] uppercase tracking-wider"
            style={{ ...MONO, color: 'rgba(0,194,224,0.42)', border: '1px solid rgba(0,194,224,0.12)' }}
          >
            {phone.cipherFooter}
          </div>
        ) : (
          <div
            className="flex items-center gap-3 rounded-[14px] px-3 py-2.5"
            style={{ background: 'var(--ng-slate)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Glyph name="plus" className="h-4 w-4 text-white/55" />
            <span className="flex-1 text-[13px] text-white/40">{phone.composer}</span>
            <Glyph name="mic" className="h-4 w-4 text-white/55" />
            <Glyph name="send" className="h-4 w-4" style={{ color: NYX_LT }} />
          </div>
        )}
      </div>

      {/* Glass tab bar — five tabs, exactly the app's */}
      <div className={`mx-3 mb-3 flex items-center justify-between rounded-[20px] px-1.5 py-1.5 ${cipher ? '' : 'ng-glass'}`}
        style={cipher ? { border: '1px solid rgba(0,194,224,0.1)' } : undefined}
      >
        {phone.tabs.map((label, i) => (
          <div
            key={label}
            className="flex flex-1 flex-col items-center gap-1 rounded-[14px] py-1.5 text-[9px] font-medium"
            style={cipher
              ? { color: 'rgba(0,194,224,0.22)' }
              : i === 0
                ? { background: 'rgba(116,98,247,0.2)', color: '#fff' }
                : { color: 'rgba(255,255,255,0.5)' }}
          >
            <span className="relative">
              <Glyph name={TAB_ICONS[i]} className="h-4 w-4" />
              {!cipher && i === 0 && (
                <span
                  className="absolute -right-2 -top-1.5 rounded-pill px-1 text-[8px] font-semibold text-white"
                  style={{ background: '#FF3B5C', lineHeight: '12px' }}
                >
                  7
                </span>
              )}
            </span>
            <span className={cipher ? 'opacity-60' : ''} style={cipher ? MONO : undefined}>
              {cipher ? TAB_HEX[i] : label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default function ProductLens({ copy, reduced }) {
  const { hero, phone } = copy;
  const [split, setSplit] = useState(50);
  const [compact, setCompact] = useState(false);
  const [touched, setTouched] = useState(false);
  const boxRef = useRef(null);
  const scrub = useRef(false);
  const auto = useRef(true);
  const dir = useRef(1);

  // Small screens: a vertical split cannot feel effortless on first paint,
  // so start almost fully readable and let the visitor drag into ciphertext.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = (q) => setCompact(Boolean(q.matches));
    sync(mq);
    if (mq.addEventListener) mq.addEventListener('change', sync);
    else if (mq.addListener) mq.addListener(sync);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', sync);
      else if (mq.removeListener) mq.removeListener(sync);
    };
  }, []);

  // Auto-sweep — pauses forever once the visitor takes over.
  useEffect(() => {
    if (compact) { setSplit(COMPACT_START); return undefined; }
    if (reduced) { setSplit(50); return undefined; }
    let raf;
    let segStart = performance.now();
    const loop = (now) => {
      if (scrub.current || !auto.current) { segStart = now; raf = requestAnimationFrame(loop); return; }
      const t = (now - segStart) / 5200;
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
  }, [reduced, compact]);

  // Pointer (mouse / pen) + touch drag.
  //
  // Touch is the compatibility-sensitive path. The first version claimed the
  // whole phone with touch-action:none and preventDefault'ed every touchmove,
  // so on a real phone a thumb landing on the lens could no longer scroll the
  // page — the hero felt stuck. Now the box allows vertical panning
  // (touch-action: pan-y) and a touch only becomes a scrub once it has moved
  // ~8px and is clearly more horizontal than vertical; a vertical swipe is
  // handed back to the browser untouched. Touch pointers are ignored by the
  // pointer handlers so the gesture is decided in one place.
  useEffect(() => {
    if (reduced) return undefined;
    const moveTo = (cx) => {
      const r = boxRef.current?.getBoundingClientRect();
      if (!r || !r.width || cx == null) return;
      setSplit(Math.max(0, Math.min(100, ((cx - r.left) / r.width) * 100)));
    };
    const inside = (target) => boxRef.current?.contains(target);
    const takeOver = () => { scrub.current = true; auto.current = false; setTouched(true); };
    const down = (e) => {
      if (e.pointerType === 'touch' || !inside(e.target)) return;
      takeOver();
      moveTo(e.clientX);
    };
    const move = (e) => { if (scrub.current && e.pointerType !== 'touch') moveTo(e.clientX); };
    const up = () => { scrub.current = false; };

    const gesture = { active: false, decided: false, x: 0, y: 0 };
    const tStart = (e) => {
      const t = e.touches?.[0];
      if (!t || !inside(e.target)) return;
      gesture.active = true; gesture.decided = false; gesture.x = t.clientX; gesture.y = t.clientY;
    };
    const tMove = (e) => {
      if (!gesture.active) return;
      const t = e.touches?.[0];
      if (!t) return;
      if (!gesture.decided) {
        const dx = Math.abs(t.clientX - gesture.x);
        const dy = Math.abs(t.clientY - gesture.y);
        if (dx < 8 && dy < 8) return;
        gesture.decided = true;
        if (dy >= dx) { gesture.active = false; return; } // a scroll — the browser keeps it
        takeOver();
      }
      if (!scrub.current) return;
      if (e.cancelable) e.preventDefault();
      moveTo(t.clientX);
    };
    const tEnd = () => { gesture.active = false; scrub.current = false; };
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    window.addEventListener('touchstart', tStart, { passive: true });
    window.addEventListener('touchmove', tMove, { passive: false });
    window.addEventListener('touchend', tEnd);
    window.addEventListener('touchcancel', tEnd);
    return () => {
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      window.removeEventListener('touchstart', tStart);
      window.removeEventListener('touchmove', tMove);
      window.removeEventListener('touchend', tEnd);
      window.removeEventListener('touchcancel', tEnd);
    };
  }, [reduced]);

  const onKeyDown = (e) => {
    if (reduced) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    auto.current = false;
    setTouched(true);
    setSplit((s) => Math.max(0, Math.min(100, s + (e.key === 'ArrowRight' ? 4 : -4))));
  };

  // Earned payoff: only after MANUAL interaction, at near-full cipher view.
  const showStamp = touched && split > 92;

  return (
    <div className="mx-auto w-full max-w-[340px]">
      <div
        ref={boxRef}
        role="slider"
        tabIndex={0}
        aria-label={hero.sliderLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        onKeyDown={onKeyDown}
        className="ng-phone relative select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#A594FF]/60"
        style={{ touchAction: 'pan-y', cursor: reduced ? 'default' : 'ew-resize' }}
      >
        {/* Height comes from .ng-phone::before (padding-top 211.11% = 9:19), not
            from aspect-ratio: Safari < 15 and older WebViews ignore aspect-ratio
            and collapsed the phone to a 1px line.

            zIndex + isolation on BOTH screens is load-bearing, not decoration:
            without a stacking context of their own, the page-wide
            `.text-white { position: relative; z-index: 5 }` rule in globals.css
            lifts individual plaintext nodes above the sealed overlay and the
            lens stops hiding anything. See the header note. */}
        <div className="absolute inset-0" style={{ zIndex: 0, isolation: 'isolate' }}>
          <PhoneScreen phone={phone} cipher={false} />
        </div>
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            isolation: 'isolate',
            WebkitClipPath: `inset(0 0 0 ${split}%)`,
            clipPath: `inset(0 0 0 ${split}%)`,
          }}
        >
          <PhoneScreen phone={phone} cipher />
        </div>

        {/* Dynamic island */}
        <div className="pointer-events-none absolute left-1/2 top-3 h-[22px] w-[88px] -translate-x-1/2 rounded-pill bg-black" style={{ zIndex: 2 }} />

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute bottom-0 top-0 w-[2px]"
          style={{
            zIndex: 2,
            left: `${split}%`,
            transform: 'translateX(-1px)',
            background: `linear-gradient(to bottom, transparent, ${CYAN}, transparent)`,
            boxShadow: '0 0 24px 4px rgba(0,194,224,0.25)',
          }}
        />
        <div
          className="pointer-events-none absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill"
          style={{
            zIndex: 2,
            left: `${split}%`,
            top: '50%',
            background: 'rgba(6,6,14,0.92)',
            border: `1px solid ${CYAN}`,
            boxShadow: '0 0 18px rgba(0,194,224,0.35)',
          }}
        >
          <span style={{ color: CYAN, fontSize: 12, letterSpacing: '-2px' }}>‹ ›</span>
        </div>

        <AnimatePresence>
          {showStamp && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              className="absolute right-4 top-14 rounded-[10px] border px-2.5 py-1.5 text-[10px] tracking-[0.12em]"
              style={{ ...MONO, zIndex: 2, color: CYAN, borderColor: 'rgba(0,194,224,0.4)', background: 'rgba(7,10,20,0.92)' }}
            >
              {hero.stamp}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
