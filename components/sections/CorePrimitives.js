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
 * Modification Reason: v1.4 - Decentralized node public naming.
 *   Public primitive copy now says decentralized nodes instead of exposing the
 *   implementation language, keeping the homepage product-led for users and
 *   investors.
 *
 * Modification Reason: v1.5 - Homepage primitive internationalization.
 *   Moved the section header, primitive card copy, proof strip, protocol spine
 *   labels, and compact SVG captions into lib/i18n so Privacy Network and
 *   MemChain remain one coherent story across supported languages. CTA and
 *   proof labels now use safer line-height/word breaking for Russian, Spanish,
 *   Japanese, Korean, and Chinese mobile layouts.
 *
 * Modification Reason: v1.6 - Homepage primitive evidence polish.
 *   The paired Privacy Network and MemChain cards now use numbered evidence
 *   surfaces, stronger mobile wrapping, and the same restrained product-page
 *   rhythm as the secondary pages. Routes, localized copy, and privacy claims
 *   are unchanged.
 *
 * Historical Notes:
 * v1.3 - Homepage primitive animation handoff.
 *   Polished the two homepage primitive cards so they visually hand off to the
 *   deeper MemChain and Privacy Network pages: subtle hover lift, a breathing
 *   protocol spine, richer encrypted-route motion, and a sealed-memory flow
 *   that keeps the node-blind invariant visible before users click through.
 *
 * Historical Notes:
 * v1.2 - Privacy Network North Star wording.
 *   Refined the Privacy Network card so the homepage names the product as a
 *   more private, open source network for global use and tees up the decentralized node
 *   infrastructure story now carried by /privacy-network.
 *
 * Historical Notes:
 * v1.1 - Proof strip and mobile CTA polish.
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
 * Last Modified: v1.2 - Privacy Network North Star wording
 * Last Modified: v1.3 - Homepage primitive animation handoff
 * Last Modified: v1.4 - Decentralized node public naming
 * Last Modified: v1.5 - Homepage primitive internationalization
 * Last Modified: v1.6 - Homepage primitive evidence polish
 * ============================================
 */

import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';
import { DEFAULT_LOCALE, getMessages } from '../../lib/i18n';

const EASE = [0.16, 1, 0.3, 1];

const normalizeLocaleCode = (locale, asPath) => {
  const candidate = locale || String(asPath || '').split('/').filter(Boolean)[0];
  if (candidate === 'kr' || String(candidate).toLowerCase().startsWith('ko')) return 'ko';
  return candidate || DEFAULT_LOCALE;
};

const defaultPrimitiveCards = [
  {
    id: 'privacy-network',
    eyebrow: 'Private Traffic',
    title: 'Privacy Network',
    label: 'Traffic in motion',
    description:
      'AeroNyx Privacy Network is a more private, open source network for global use. Decentralized nodes coordinate encrypted traffic and relay state without reading user content.',
    cta: 'Explore Privacy Network',
    href: '/privacy-network',
    checks: [
      'Open decentralized node infrastructure',
      'Blind relay boundary',
      'Aggregate health only',
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

const defaultProofItems = [
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

const CorePrimitives = ({ activeLocale: providedLocale }) => {
  const { locale, asPath } = useRouter();
  const activeLocale = normalizeLocaleCode(providedLocale || locale, asPath);
  const messages = getMessages(activeLocale);
  const copy = messages.corePrimitives || getMessages(DEFAULT_LOCALE).corePrimitives;
  const reduced = useReducedMotion();
  const primitiveCards = defaultPrimitiveCards.map((card, index) => ({
    ...card,
    ...(copy.cards?.[index] || {}),
  }));
  const proofItems = defaultProofItems.map((item, index) => ({
    ...item,
    ...(copy.proofItems?.[index] || {}),
  }));
  const spineWords = copy.spineWords || ['Route', 'Coordinate', 'Remember'];

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
              {copy.eyebrow}
            </div>
            <h2 className="text-display-lg font-light">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-copy text-base leading-relaxed text-white/58 md:text-xl">
              {copy.description}
            </p>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.24fr_1fr] lg:items-stretch lg:gap-5">
            <PrimitiveCard primitive={primitiveCards[0]} reduced={reduced} index={0} />
            <ProtocolSpine words={spineWords} reduced={reduced} />
            <PrimitiveCard primitive={primitiveCards[1]} reduced={reduced} index={1} />
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="mt-4 grid gap-2.5 sm:grid-cols-3 md:mt-5"
          >
            {proofItems.map((item, index) => (
              <div key={item.label} className="page-card relative min-w-0 overflow-hidden rounded border px-4 py-4 md:min-h-[8.25rem] md:px-5">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/35 to-transparent" />
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="h-2 w-2 shrink-0 rounded-pill bg-brand-light/70" />
                  <div className="shrink-0 font-mono text-xs leading-none text-white/18">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="break-words font-mono text-lg font-light leading-none text-brand-light md:text-xl">
                  {item.value}
                </div>
                <div className="mt-2 break-words text-sm leading-relaxed text-white/70">
                  {item.label}
                </div>
                <div className="mt-3 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/38">
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

const PrimitiveCard = ({ primitive, reduced, index }) => (
  <motion.div
    initial={reduced ? false : { opacity: 0, y: 18 }}
    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
    whileHover={reduced ? undefined : { y: -4 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, ease: EASE }}
    className="page-surface group relative min-w-0 overflow-hidden rounded border p-5 transition-colors duration-base hover:border-brand-line md:p-6"
  >
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/35 to-transparent opacity-60" />
    <div className="pointer-events-none absolute right-5 top-5 font-mono text-5xl font-light leading-none text-white/[0.055]">
      {String(index + 1).padStart(2, '0')}
    </div>
    <div className="grid gap-5 md:grid-cols-[0.92fr_1.08fr] md:items-center lg:block">
      <PrimitiveVisual type={primitive.visual} reduced={reduced} visualCopy={primitive.visualCopy} />

      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="max-w-full break-words rounded-sm border border-brand-line bg-brand-faint px-2 py-1 text-[10px] uppercase leading-4 tracking-eyebrow text-brand-light">
            {primitive.eyebrow}
          </span>
          <span className="min-w-0 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/35">
            {primitive.label}
          </span>
        </div>
        <h3 className="break-words pr-8 text-display-md font-light text-white">
          {primitive.title}
        </h3>
        <p className="mt-3 break-words text-sm leading-relaxed text-white/62 md:text-base">
          {primitive.description}
        </p>

        <div className="mt-5 grid gap-2">
          {primitive.checks.map((check) => (
            <div key={check} className="flex min-w-0 items-start gap-3 border border-white/10 bg-white/[0.02] px-3 py-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-pill bg-brand-light/70" />
              <span className="min-w-0 break-words text-sm leading-relaxed text-white/58">{check}</span>
            </div>
          ))}
        </div>

        <Link
          href={primitive.href}
          className="mt-6 inline-flex min-h-[44px] w-full max-w-xs min-w-0 items-center justify-center break-words rounded border border-white/15 px-5 py-2.5 text-center text-xs uppercase leading-snug tracking-eyebrow text-white/72 transition-colors duration-fast hover:border-brand-line hover:bg-brand-faint hover:text-white sm:w-auto"
        >
          {primitive.cta}
        </Link>
      </div>
    </div>
  </motion.div>
);

const ProtocolSpine = ({ words, reduced }) => (
  <motion.div
    initial={reduced ? false : { opacity: 0, scale: 0.98 }}
    whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
    className="relative flex min-h-[8rem] items-center justify-center overflow-hidden rounded border border-white/10 bg-white/[0.02] px-4 py-5 lg:min-h-full lg:px-2"
  >
    <div className="absolute left-1/2 top-4 hidden h-[calc(100%-2rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-light/30 to-transparent lg:block" />
    <div className="absolute inset-y-1/2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-brand-light/30 to-transparent lg:hidden" />
    <motion.div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-pill border border-brand-line bg-brand-faint"
      animate={reduced ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.42, 0.82, 0.42] }}
      transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: EASE }}
    />
    <div className="relative z-10 grid grid-cols-3 gap-2 text-center sm:gap-3 lg:grid-cols-1">
      {words.map((word, index) => (
        <div key={word} className="rounded-sm border border-white/10 bg-black/35 px-1.5 py-2 sm:px-2.5">
          <div className="mb-1 font-mono text-[8px] leading-none text-white/24">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="break-words font-mono text-[9px] uppercase leading-4 tracking-[0.14em] text-brand-light sm:text-xs sm:tracking-eyebrow">
            {word}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const PrimitiveVisual = ({ type, reduced, visualCopy }) => (
  <div className="relative mb-5 h-48 overflow-hidden rounded border border-white/10 bg-black/25 md:mb-0 lg:mb-6">
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.28) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
    {type === 'motion' ? <TrafficVisual reduced={reduced} copy={visualCopy} /> : <MemoryVisual reduced={reduced} copy={visualCopy} />}
  </div>
);

const TrafficVisual = ({ reduced, copy = {} }) => (
  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 190" fill="none">
    <path d="M48 104H372" stroke="rgba(151,136,247,0.16)" />
    <path d="M72 68C136 36 224 42 348 76" stroke="rgba(95,187,247,0.12)" />
    <path d="M72 140C148 164 236 152 348 112" stroke="rgba(95,187,247,0.10)" />
    <motion.path
      d="M48 104H372"
      stroke="rgba(151,136,247,0.62)"
      strokeWidth="1.4"
      initial={{ pathLength: 0, opacity: 0.4 }}
      animate={reduced ? { pathLength: 1, opacity: 0.65 } : { pathLength: [0, 1, 1], opacity: [0.28, 0.75, 0.28] }}
      transition={reduced ? { duration: 0 } : { duration: 3.4, repeat: Infinity, ease: EASE }}
    />
    {[48, 156, 264, 372].map((x, index) => (
      <g key={x}>
        <circle cx={x} cy="104" r="18" fill="rgba(119,98,243,0.07)" stroke="rgba(151,136,247,0.22)" />
        <circle cx={x} cy="104" r="3" fill="rgba(151,136,247,0.72)" />
        <text x={x} y="143" textAnchor="middle" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, fill: 'rgba(255,255,255,0.34)' }}>
          N{index + 1}
        </text>
      </g>
    ))}
    <motion.circle
      r="4"
      fill="#9788F7"
      initial={{ cx: 48, cy: 104, opacity: 0.6 }}
      animate={reduced ? undefined : { cx: [48, 156, 264, 372], opacity: [0.45, 1, 1, 0.45] }}
      transition={reduced ? undefined : { duration: 3.4, repeat: Infinity, ease: 'linear' }}
    />
    <motion.circle
      r="3"
      fill="#8AD1FF"
      initial={{ cx: 72, cy: 68, opacity: 0.45 }}
      animate={reduced ? undefined : { cx: [72, 156, 264, 348], cy: [68, 54, 60, 76], opacity: [0.28, 0.8, 0.8, 0.28] }}
      transition={reduced ? undefined : { duration: 4.2, repeat: Infinity, ease: 'linear', delay: 0.45 }}
    />
    <text x="210" y="42" textAnchor="middle" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, fill: 'rgba(95,187,247,0.6)' }}>
      {copy.caption || 'encrypted route · aggregate health only'}
    </text>
  </svg>
);

const MemoryVisual = ({ reduced, copy = {} }) => (
  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 190" fill="none">
    <text x="210" y="38" textAnchor="middle" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, fill: 'rgba(95,187,247,0.6)' }}>
      {copy.caption || 'local memory · sealed sync · blind node'}
    </text>
    {[
      { x: 42, title: copy.localTitle || 'local', body: copy.localBody || 'fact' },
      { x: 172, title: copy.sealedTitle || 'sealed', body: copy.sealedBody || 'cipher' },
      { x: 302, title: copy.blindTitle || 'blind', body: copy.blindBody || 'node' },
    ].map((item, index) => (
      <motion.g
        key={item.title}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.12, ease: EASE }}
      >
        <rect x={item.x} y="70" width="78" height="58" rx="4" fill={index === 1 ? 'rgba(119,98,243,0.09)' : 'rgba(255,255,255,0.025)'} stroke={index === 1 ? 'rgba(151,136,247,0.28)' : 'rgba(255,255,255,0.12)'} />
        <text x={item.x + 39} y="94" textAnchor="middle" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, fill: index === 1 ? 'rgba(151,136,247,0.88)' : 'rgba(255,255,255,0.42)' }}>
          {item.title}
        </text>
        <text x={item.x + 39} y="113" textAnchor="middle" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, fill: 'rgba(255,255,255,0.34)' }}>
          {item.body}
        </text>
      </motion.g>
    ))}
    <path d="M120 99H172M250 99H302" stroke="rgba(151,136,247,0.22)" />
    <motion.circle
      r="4"
      fill="#9788F7"
      initial={{ cx: 81, cy: 99, opacity: 0.58 }}
      animate={reduced ? undefined : { cx: [81, 211, 341], opacity: [0.42, 1, 0.42] }}
      transition={reduced ? undefined : { duration: 3.6, repeat: Infinity, ease: 'linear' }}
    />
    <text x="210" y="154" textAnchor="middle" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, fill: 'rgba(255,255,255,0.34)' }}>
      {copy.footer || 'node stores memory it cannot read'}
    </text>
  </svg>
);

export default CorePrimitives;
