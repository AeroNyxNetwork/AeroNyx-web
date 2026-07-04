/**
 * ============================================
 * File: components/sections/CorePrimitives.js
 * ============================================
 * Creation Reason: Homepage core narrative restructure.
 *   The homepage needed a dedicated module that makes Privacy Network and
 *   MemChain read as one protocol story instead of two unrelated product
 *   cards. This section sits immediately after live protocol evidence and
 *   explains the two load-bearing primitives:
 *   1. private traffic in motion
 *   2. private memory at rest
 *
 * Main Functionality:
 *   - Presents AeroNyx Privacy Network and MemChain as paired privacy
 *     primitives connected by the same blind, open protocol invariant.
 *   - Links to /privacy-network and /memchain without changing those routes.
 *   - Uses only static copy and CSS/SVG/motion; no API calls and no private
 *     telemetry.
 *
 * Dependencies:
 *   - components/ui/Container
 *   - next/link
 *   - framer-motion
 *   - tailwind.config.js v2.x brand/surface/radius/motion tokens
 *
 * Main Logical Flow:
 *   1. Section header states the "connection + context" thesis.
 *   2. Two primitive cards explain motion/at-rest privacy.
 *   3. A central protocol spine visually shows both primitives sharing the
 *      same node-blind invariant.
 *   4. Proof strip reinforces "infrastructure routes/stores ciphertext only".
 *
 * Modification Reason: v1.1 - Proof strip and mobile CTA polish.
 *   The three proof cells now read as product invariants instead of abstract
 *   protocol labels. Primitive CTAs also keep full-width touch geometry on
 *   iPhone-class screens while preserving compact desktop alignment.
 *
 * ⚠️ Important Note for Next Developer:
 *   - Do not turn this section into another feature grid. It exists to make
 *     Privacy Network and MemChain feel like one protocol-level product.
 *   - Do not add unverifiable scale, security, or benchmark claims here.
 *   - Brand rule: no green, no emojis, no rounded-xl/2xl.
 *
 * Last Modified: v1.0 - Initial core primitives section
 * Last Modified: v1.1 - Proof strip and mobile CTA polish
 * ============================================
 */

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';

const EASE = [0.16, 1, 0.3, 1];

const primitiveCards = [
  {
    id: 'privacy-network',
    eyebrow: 'Private Traffic',
    title: 'Privacy Network',
    label: 'Traffic in motion',
    description:
      'AeroNyx Privacy Network gives humans, apps, and agents a blind routing layer for live encrypted traffic. Nodes coordinate packets and relay state without reading user content.',
    cta: 'Explore Privacy Network',
    href: '/privacy-network',
    checks: [
      'Blind relay boundary',
      'Aggregate health only',
      'Agent-ready private access',
    ],
    visual: 'motion',
  },
  {
    id: 'memchain',
    eyebrow: 'Private Context',
    title: 'MemChain',
    label: 'Memory at rest',
    description:
      'MemChain preserves durable personal and agent context as encrypted, versioned memory. Storage nodes can help synchronize state, but they cannot read the memory they hold.',
    cta: 'Explore MemChain',
    href: '/memchain',
    checks: [
      'Node-blind encrypted memory',
      'Local-first recall path',
      'Portable agent context',
    ],
    visual: 'memory',
  },
];

const proofItems = [
  {
    value: 'Node-blind',
    label: 'Infrastructure cannot read payloads or memory.',
    detail: 'Nodes route and store ciphertext only',
  },
  {
    value: 'Local-first',
    label: 'Private memory remains useful from the device path.',
    detail: 'Designed for offline recall and fast sync',
  },
  {
    value: 'Protocol',
    label: 'Humans, apps, and agents share one coordination layer.',
    detail: 'Routing + memory hold the same invariant',
  },
];

const CorePrimitives = () => {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-white/5 py-12 md:py-20" style={{ background: 'var(--surface-1, #0C0C13)' }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/30 to-transparent" />
      <Container>
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-9 max-w-3xl md:mb-12"
          >
            <div className="mb-3 text-[10px] uppercase tracking-eyebrow text-brand-light md:mb-4">
              Two Private Primitives
            </div>
            <h2 className="text-display-lg font-light">
              Private connection and private memory, under one blind protocol.
            </h2>
            <p className="mt-4 max-w-copy text-base leading-relaxed text-white/58 md:text-xl">
              AeroNyx protects what agents send and what agents remember. The same
              invariant holds across both: infrastructure can coordinate work, but
              it cannot read the content or own the context.
            </p>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.24fr_1fr] lg:items-stretch lg:gap-5">
            <PrimitiveCard primitive={primitiveCards[0]} reduced={reduced} />
            <ProtocolSpine reduced={reduced} />
            <PrimitiveCard primitive={primitiveCards[1]} reduced={reduced} />
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="mt-4 grid gap-2.5 sm:grid-cols-3 md:mt-5"
          >
            {proofItems.map((item) => (
              <div key={item.label} className="page-card min-w-0 rounded border px-4 py-4 md:min-h-[8.25rem] md:px-5">
                <div className="font-mono text-lg font-light leading-none text-brand-light md:text-xl">
                  {item.value}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.label}
                </div>
                <div className="mt-3 text-[10px] uppercase leading-4 tracking-eyebrow text-white/38">
                  {item.detail}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

const PrimitiveCard = ({ primitive, reduced }) => (
  <motion.div
    initial={reduced ? false : { opacity: 0, y: 18 }}
    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, ease: EASE }}
    className="page-surface group relative min-w-0 overflow-hidden rounded border p-5 md:p-6"
  >
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/35 to-transparent opacity-60" />
    <div className="grid gap-5 md:grid-cols-[0.92fr_1.08fr] md:items-center lg:block">
      <PrimitiveVisual type={primitive.visual} reduced={reduced} />

      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-sm border border-brand-line bg-brand-faint px-2 py-1 text-[10px] uppercase tracking-eyebrow text-brand-light">
            {primitive.eyebrow}
          </span>
          <span className="text-[10px] uppercase tracking-eyebrow text-white/35">
            {primitive.label}
          </span>
        </div>
        <h3 className="text-display-md font-light text-white">
          {primitive.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/62 md:text-base">
          {primitive.description}
        </p>

        <div className="mt-5 grid gap-2">
          {primitive.checks.map((check) => (
            <div key={check} className="flex items-start gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-pill bg-brand-light/70" />
              <span className="text-sm leading-relaxed text-white/58">{check}</span>
            </div>
          ))}
        </div>

        <Link
          href={primitive.href}
          className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded border border-white/15 px-5 py-2.5 text-center text-xs uppercase tracking-eyebrow text-white/72 transition-colors duration-fast hover:border-brand-line hover:bg-brand-faint hover:text-white sm:w-auto"
        >
          {primitive.cta}
        </Link>
      </div>
    </div>
  </motion.div>
);

const ProtocolSpine = ({ reduced }) => (
  <motion.div
    initial={reduced ? false : { opacity: 0, scale: 0.98 }}
    whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
    className="relative flex min-h-[8rem] items-center justify-center overflow-hidden rounded border border-white/10 bg-white/[0.02] px-4 py-5 lg:min-h-full lg:px-2"
  >
    <div className="absolute left-1/2 top-4 hidden h-[calc(100%-2rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-light/30 to-transparent lg:block" />
    <div className="absolute inset-y-1/2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-brand-light/30 to-transparent lg:hidden" />
    <div className="relative z-10 grid grid-cols-3 gap-2 text-center sm:gap-3 lg:grid-cols-1">
      {['Route', 'Coordinate', 'Remember'].map((word) => (
        <div key={word} className="rounded-sm border border-white/10 bg-black/35 px-1.5 py-2 sm:px-2.5">
          <div className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-brand-light sm:text-xs sm:tracking-eyebrow">
            {word}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const PrimitiveVisual = ({ type, reduced }) => (
  <div className="relative mb-5 h-44 overflow-hidden rounded border border-white/10 bg-black/25 md:mb-0 lg:mb-6">
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.28) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
    {type === 'motion' ? <TrafficVisual reduced={reduced} /> : <MemoryVisual reduced={reduced} />}
  </div>
);

const TrafficVisual = ({ reduced }) => (
  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 180" fill="none">
    <line x1="52" y1="92" x2="368" y2="92" stroke="rgba(151,136,247,0.22)" />
    <line x1="126" y1="52" x2="294" y2="128" stroke="rgba(95,187,247,0.14)" />
    {[52, 154, 266, 368].map((x, index) => (
      <g key={x}>
        <circle cx={x} cy="92" r="18" fill="rgba(119,98,243,0.07)" stroke="rgba(151,136,247,0.22)" />
        <circle cx={x} cy="92" r="3" fill="rgba(151,136,247,0.72)" />
        <text x={x} y="130" textAnchor="middle" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, fill: 'rgba(255,255,255,0.34)' }}>
          N{index + 1}
        </text>
      </g>
    ))}
    <motion.circle
      r="4"
      fill="#9788F7"
      initial={{ cx: 52, cy: 92, opacity: 0.6 }}
      animate={reduced ? undefined : { cx: [52, 154, 266, 368], opacity: [0.45, 1, 1, 0.45] }}
      transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: 'linear' }}
    />
    <text x="210" y="44" textAnchor="middle" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, fill: 'rgba(95,187,247,0.6)' }}>
      ciphertext in motion
    </text>
  </svg>
);

const MemoryVisual = ({ reduced }) => (
  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 180" fill="none">
    {[0, 1, 2].map((index) => {
      const x = 86 + index * 92;
      const y = 56 + index * 18;
      return (
        <motion.g
          key={index}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.12, ease: EASE }}
        >
          <rect x={x} y={y} width="74" height="46" rx="4" fill="rgba(119,98,243,0.07)" stroke="rgba(151,136,247,0.22)" />
          <path d={`M${x + 12} ${y + 16}H${x + 50}`} stroke="rgba(255,255,255,0.28)" />
          <path d={`M${x + 12} ${y + 27}H${x + 36}`} stroke="rgba(95,187,247,0.24)" />
          <text x={x + 37} y={y + 60} textAnchor="middle" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, fill: 'rgba(255,255,255,0.34)' }}>
            v{index + 1}
          </text>
        </motion.g>
      );
    })}
    <path d="M160 82H178M252 100H270" stroke="rgba(151,136,247,0.24)" />
    <text x="210" y="36" textAnchor="middle" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, fill: 'rgba(95,187,247,0.6)' }}>
      encrypted context chain
    </text>
  </svg>
);

export default CorePrimitives;
