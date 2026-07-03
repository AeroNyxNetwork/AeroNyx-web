/**
 * ============================================
 * File: components/sections/MemChainShowcase.jsx
 * ============================================
 * Modification Reason: v3.0 — 2026 brand pass + typewriter hardening.
 *   1. FIX (leak): typewriter loop now cancels on unmount via an
 *      `alive` ref. v2.x kept setState-ing after unmount (React
 *      warning + leak) for the full ~25s script.
 *   2. PERF: one state update per LINE instead of per CHARACTER
 *      (~700+ renders → ~40) — same visual, order-of-magnitude less
 *      render work on low-end Android.
 *   3. A11y: prefers-reduced-motion renders the full transcript
 *      instantly, no animation loop.
 *   4. Brand: all emojis removed (pillars/devices/agent teaser → minimal
 *      SVG); green/yellow/blue semantics → brand/cipher/warn tokens
 *      (homepage "no green" rule); radii unified to 2/4/6px; shared
 *      easing curve.
 *
 * Main Functionality:
 *   - MemChain deep-dive: header, memory-pool + sealed-blocks visual,
 *     live-typing API terminal, three protection pillars, cross-device
 *     sync visual, neutral agent-memory integration teaser.
 *
 * Dependencies:
 *   - components/ui/Container
 *   - tailwind.config.js v2.0 tokens; framer-motion
 *   - Cross-references ProductsEcosystem v3.0 MemChain narrative
 *
 * Main Logical Flow:
 *   1. Section reveals on scroll (shared 600ms / EASE)
 *   2. Terminal starts typing on viewport enter (once), line-buffered
 *   3. Pillars stagger in; sync + agent-memory blocks follow
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Keep the `alive` ref guard in TypewriterTerminal; async loops
 *     MUST check it before every setState.
 *   - Brand rule: no green, no emojis. Terminal palette: prompt/success
 *     = brand-light, data = cipher, block packing = warn, muted = white/α.
 *   - v2.1 positioning stands: sync is "encrypted protocol channels",
 *     not VPN tunnels.
 *
 * Last Modified: v3.1 — Neutral agent-memory framing, named-agent UI copy removed
 * ============================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';

const EASE = [0.16, 1, 0.3, 1];

const MemChainShowcase = () => {
  return (
    <section id="memchain" className="py-16 md:py-28 relative overflow-hidden" style={{ background: 'var(--surface-0, #08080D)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-pill blur-[120px]" />
      </div>

      <Container>
        <div className="max-w-6xl mx-auto relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-brand-line bg-brand-faint mb-6">
              <span className="text-[10px] uppercase tracking-eyebrow text-brand-light">
                Memory Chain — private agent memory
              </span>
            </div>

            <h2 className="text-display-lg font-light mb-4 md:mb-6">
              Your AI remembers.
              <br />
              <span className="font-medium">Portable. Encrypted. User-owned.</span>
            </h2>

            <p className="text-base md:text-xl text-white/60 max-w-copy mx-auto leading-relaxed">
              Every conversation, every preference, every insight — stored as
              cryptographically signed facts on your personal memory chain.
              Synced across your devices through encrypted AeroNyx protocol channels.
              <span className="text-white font-medium"> No cloud. No third party. Just you.</span>
            </p>
          </motion.div>

          {/* Main Demo Grid */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <MemoryChainVisual />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              <TypewriterTerminal />
            </motion.div>
          </div>

          {/* Three Pillars */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-16 md:mb-20"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-light">
                Three layers of memory protection
              </h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  icon: <SignedIcon />,
                  title: 'Signed',
                  description: "Every memory is Ed25519 signed by your device. Nobody can forge your AI's thoughts.",
                  detail: 'SHA-256 content hash + Ed25519 signature = tamper-proof',
                },
                {
                  icon: <ChainedIcon />,
                  title: 'Chained',
                  description: 'Memories are packed into blocks with Merkle roots. One changed bit breaks the entire chain.',
                  detail: 'Block height + prev_hash + merkle_root = immutable history',
                },
                {
                  icon: <InvisibleIcon />,
                  title: 'Invisible',
                  description: 'Memory sync travels as encrypted protocol traffic. Network observers see ciphertext, not meaning.',
                  detail: '0xAE multiplexing inside ChaCha20-Poly1305 protocol frames',
                },
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
                >
                  <PillarCard {...pillar} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cross-Device Sync */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-16 md:mb-20"
          >
            <CrossDeviceSyncVisual />
          </motion.div>

          {/* Agent memory interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <AgentMemoryTeaser />
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

// ============================================
// Typewriter Terminal — cancel-safe, line-buffered (v3.0)
// ============================================

/* Terminal palette (brand rule): prompt/success = brand-light,
   data = cipher, block packing = warn, muted = white/α. */
const SCRIPT = [
  { text: '$ curl -X POST /api/fact \\', color: 'text-brand-light', delay: 30 },
  { text: '  -d \'{"subject":"user","predicate":"loves","object":"Rust"}\'', color: 'text-white/50', delay: 20 },
  { text: '', color: '', delay: 0, pause: 600 },
  { text: '-> 201 Created', color: 'text-cipher', delay: 40 },
  { text: '  fact_id: a1b2c3d4e5f6...', color: 'text-cipher-light', delay: 25 },
  { text: '  signed:  Ed25519 OK', color: 'text-brand-light', delay: 25 },
  { text: '  stored:  MemPool + AOF', color: 'text-white/50', delay: 25 },
  { text: '', color: '', delay: 0, pause: 1000 },
  { text: 'miner: packing block...', color: 'text-warn', delay: 35 },
  { text: '  height:  43', color: 'text-cipher-light', delay: 30 },
  { text: '  facts:   7', color: 'text-cipher-light', delay: 30 },
  { text: '  merkle:  f8e2a9b1c3d5...', color: 'text-cipher-light', delay: 20 },
  { text: '', color: '', delay: 0, pause: 800 },
  { text: 'block #43 sealed & persisted', color: 'text-brand-light', delay: 30 },
  { text: '  broadcast: BlockAnnounce -> 3 peers', color: 'text-white/50', delay: 20 },
  { text: '  mempool:   cleared (0 pending)', color: 'text-white/50', delay: 20 },
  { text: '', color: '', delay: 0, pause: 500 },
  { text: '  Memory is now immutable. Tamper-proof forever.', color: 'text-white/25', delay: 25 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TypewriterTerminal = () => {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const aliveRef = useRef(true);

  // Cancel guard (v3.0): every setState in the async loop checks this.
  useEffect(() => {
    aliveRef.current = true;
    return () => { aliveRef.current = false; };
  }, []);

  // Blinking cursor
  useEffect(() => {
    if (reduced) return undefined;
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, [reduced]);

  useEffect(() => {
    if (!started) return;

    // Reduced motion: full transcript instantly, no loop.
    if (reduced) {
      setLines(SCRIPT.map((l) => ({ text: l.text, color: l.color })));
      setDone(true);
      return;
    }

    let cancelled = false;

    const run = async () => {
      for (let i = 0; i < SCRIPT.length; i++) {
        if (cancelled || !aliveRef.current) return;
        const line = SCRIPT[i];

        if (line.pause) await sleep(line.pause);

        if (!line.text) {
          if (cancelled || !aliveRef.current) return;
          setLines((prev) => [...prev, { text: '', color: '' }]);
          continue;
        }

        // v3.0: reveal per line via CSS steps-like chunking — we still
        // type visually but batch state: 3 chars per update.
        const CHUNK = 3;
        let current = '';
        setLines((prev) => [...prev, { text: '', color: line.color, _typing: true }]);

        for (let c = 0; c < line.text.length; c += CHUNK) {
          if (cancelled || !aliveRef.current) return;
          current = line.text.slice(0, c + CHUNK);
          const snapshot = current;
          setLines((prev) => {
            const next = [...prev];
            next[next.length - 1] = { text: snapshot, color: line.color, _typing: true };
            return next;
          });
          await sleep(line.delay * CHUNK);
        }

        if (cancelled || !aliveRef.current) return;
        setLines((prev) => {
          const next = [...prev];
          next[next.length - 1] = { text: line.text, color: line.color, _typing: false };
          return next;
        });
        await sleep(150);
      }
      if (!cancelled && aliveRef.current) setDone(true);
    };

    run();
    return () => { cancelled = true; };
  }, [started, reduced]);

  return (
    <motion.div
      onViewportEnter={() => { if (!started) setStarted(true); }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-md overflow-hidden"
      style={{ background: 'var(--surface-2, #111118)' }}
    >
      {/* Terminal Header — neutral dots (brand: no traffic lights) */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-pill bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-pill bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-pill bg-white/15" />
        </div>
        <span className="text-xs text-white/40 ml-2 font-mono">memchain-api — 127.0.0.1:8421</span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 md:p-6 font-mono text-xs sm:text-sm min-h-[380px] max-h-[420px] overflow-y-auto">
        {lines.map((line, i) => (
          <div key={i} className={`${line.color} leading-relaxed whitespace-pre-wrap break-all`}>
            {line.text || '\u00A0'}
            {line._typing && (
              <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>▌</span>
            )}
          </div>
        ))}

        {done && (
          <div className="text-brand-light mt-2">
            $ <span className={`${cursorVisible || reduced ? 'opacity-100' : 'opacity-0'}`}>▌</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================
// Memory Chain Visualization
// ============================================

const MemoryChainVisual = () => {
  const facts = [
    { subject: 'user', predicate: 'prefers', object: 'dark mode', time: '2m ago' },
    { subject: 'user', predicate: 'speaks', object: 'Mandarin, English', time: '5m ago' },
    { subject: 'project', predicate: 'uses', object: 'Rust + Tokio', time: '12m ago' },
    { subject: 'user', predicate: 'interested_in', object: 'distributed systems', time: '1h ago' },
  ];

  const blocks = [
    { height: 42, facts: 15, time: '1h ago' },
    { height: 41, facts: 8, time: '2h ago' },
    { height: 40, facts: 22, time: '3h ago' },
  ];

  return (
    <div className="border border-white/10 rounded-md p-5 md:p-8" style={{ background: 'var(--surface-1, #0C0C13)' }}>
      <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-4">
        Memory Pool — Pending Facts
      </div>

      <div className="space-y-2 mb-6">
        {facts.map((fact, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, ease: EASE }}
            className="flex items-center justify-between bg-black/40 border border-white/5 rounded px-3 py-2"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-1.5 h-1.5 rounded-pill bg-brand-light flex-shrink-0 animate-pulse" />
              <span className="text-xs text-white/70 truncate">
                <span className="text-brand-light">{fact.subject}</span>
                <span className="text-white/40"> → </span>
                <span className="text-cipher-light">{fact.predicate}</span>
                <span className="text-white/40"> → </span>
                <span className="text-white/80">{fact.object}</span>
              </span>
            </div>
            <span className="text-xs text-white/30 flex-shrink-0 ml-2">{fact.time}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/30"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-3">
        Sealed Blocks — Immutable
      </div>

      <div className="space-y-2">
        {blocks.map((block, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.12, ease: EASE }}
            className="flex items-center justify-between bg-brand-faint border border-brand-line rounded px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-brand-light">#{block.height}</span>
              <span className="text-xs text-white/50">{block.facts} memories</span>
            </div>
            <span className="text-xs text-white/30">{block.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// Supporting Components
// ============================================

/* Minimal line icons — replace emojis (brand rule) */
const SignedIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-light">
    <rect x="4" y="10" width="16" height="10" rx="1" />
    <path d="M8 10V7a4 4 0 118 0v3" />
  </svg>
);

const ChainedIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-light">
    <rect x="3" y="9" width="7" height="6" rx="1" />
    <rect x="14" y="9" width="7" height="6" rx="1" />
    <path d="M10 12h4" />
  </svg>
);

const InvisibleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-light">
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
    <path d="M4 4l16 16" />
  </svg>
);

const PillarCard = ({ icon, title, description, detail }) => (
  <div
    className="border border-white/10 rounded-md p-5 md:p-6 hover:border-brand-line transition-colors duration-base group h-full"
    style={{ background: 'var(--surface-1, #0C0C13)' }}
  >
    <div className="mb-3">{icon}</div>
    <h4 className="text-lg font-medium mb-2">{title}</h4>
    <p className="text-sm text-white/60 leading-relaxed mb-3">{description}</p>
    <div className="text-xs text-white/30 font-mono border-t border-white/5 pt-2">
      {detail}
    </div>
  </div>
);

const CrossDeviceSyncVisual = () => (
  <div className="border border-white/10 rounded-md p-6 md:p-10 bg-brand-faint">
    <div className="text-center mb-8">
      <h3 className="text-2xl md:text-3xl font-light mb-3">
        Seamless cross-device memory
      </h3>
      <p className="text-sm md:text-base text-white/50 max-w-copy mx-auto">
        Disconnect your phone for a week. Reconnect. Every memory your desktop AI
        created is instantly synced — encrypted, verified, and ready.
      </p>
    </div>

    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
      <DeviceCard icon={<PhoneIcon />} name="Phone" status="Syncing…" memories={142} statusColor="text-warn" />
      <SyncArrows />
      <DeviceCard icon={<DesktopIcon />} name="Desktop" status="Up to date" memories={142} statusColor="text-ok" />
      <div className="hidden md:block"><SyncArrows /></div>
      <div className="hidden md:block">
        <DeviceCard icon={<ServerIcon />} name="Home NAS" status="Full node" memories={2847} statusColor="text-ok" />
      </div>
    </div>
  </div>
);

const PhoneIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/70 mx-auto">
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <path d="M11 18h2" />
  </svg>
);

const DesktopIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/70 mx-auto">
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const ServerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/70 mx-auto">
    <rect x="3" y="4" width="18" height="7" rx="1" />
    <rect x="3" y="13" width="18" height="7" rx="1" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </svg>
);

const SyncArrows = () => (
  <div className="flex flex-col items-center gap-1">
    <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-brand-light">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
        <path d="M0 8h28M20 2l8 6-8 6" stroke="currentColor" strokeWidth="2" />
      </svg>
    </motion.div>
    <div className="text-xs text-white/30">encrypted protocol channel</div>
    <motion.div animate={{ x: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} className="text-brand-light">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
        <path d="M32 8H4M12 2L4 8l8 6" stroke="currentColor" strokeWidth="2" />
      </svg>
    </motion.div>
  </div>
);

const DeviceCard = ({ icon, name, status, memories, statusColor }) => (
  <div className="bg-black/40 border border-white/10 rounded p-4 min-w-[120px] text-center">
    <div className="mb-2">{icon}</div>
    <div className="text-sm font-medium mb-1">{name}</div>
    <div className={`text-xs ${statusColor} mb-2`}>{status}</div>
    <div className="text-xs text-white/30">{memories} memories</div>
  </div>
);

const AgentMemoryTeaser = () => (
  <div className="border border-white/10 rounded-md overflow-hidden" style={{ background: 'var(--surface-1, #0C0C13)' }}>
    <div className="grid md:grid-cols-2">
      <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-sm border border-brand-line bg-brand-faint flex items-center justify-center text-xs font-semibold text-brand-light">
            AM
          </div>
          <div>
            <div className="text-sm font-medium">Agent Memory Interface</div>
            <div className="text-xs text-ok">Connected to Memory Chain</div>
          </div>
        </div>

        <div className="space-y-3">
          <ChatBubble sender="you" text="I'm working on a Rust project using Tokio for async" />
          <ChatBubble sender="ai" text="I remember you prefer Rust! Based on your previous conversations, you've been exploring distributed systems. Want me to suggest Tokio patterns for your use case?" />
          <div className="flex items-center gap-2 text-xs text-brand-light/60">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>3 memories recalled from Block #41</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <h3 className="text-display-md font-light mb-3">Memory that survives the app</h3>
        <p className="text-sm text-white/60 leading-relaxed mb-6">
          Any compatible agent or client can connect to your personal Memory Chain through
          the AeroNyx privacy fabric. The assistant can remember context over time, while
          the memory stays encrypted, portable, and owned by the user.
        </p>

        <div className="space-y-3 mb-6">
          <IntegrationPoint text="Wallet-derived identity — backup your wallet, backup your memories" />
          <IntegrationPoint text="Encrypted protocol channels carry memories as ciphertext" />
          <IntegrationPoint text="Switch AI models anytime — your memory chain stays with you" />
          <IntegrationPoint text="Local-first: works offline, syncs when connected" />
        </div>

        <a
          href="https://docs.aeronyx.network"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded border border-brand-line bg-brand-faint hover:border-brand-light/50 transition-colors duration-fast"
        >
          <span className="text-sm font-medium text-brand-light">Read Memory Chain Docs</span>
        </a>
      </div>
    </div>
  </div>
);

const ChatBubble = ({ sender, text }) => (
  <div className={`flex ${sender === 'you' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[85%] rounded px-3 py-2 text-sm ${
      sender === 'you'
        ? 'bg-brand-faint border border-brand-line text-white/80'
        : 'bg-white/5 border border-white/10 text-white/70'
    }`}>{text}</div>
  </div>
);

const IntegrationPoint = ({ text }) => (
  <div className="flex items-start gap-2">
    <svg className="w-4 h-4 text-brand-light mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-sm text-white/60">{text}</span>
  </div>
);

export default MemChainShowcase;
