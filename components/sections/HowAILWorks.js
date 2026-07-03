/**
 * ============================================
 * File: components/sections/HowAILWorks.jsx
 * ============================================
 * Modification Reason: v3.0 — Premium narrative pass (2026 aesthetic).
 *   1. Step navigation upgraded from truncated-title buttons ("...") to
 *      numbered chapter navigation (mono 01-04 + phase + full short
 *      label). Truncation ellipses read as unfinished; chapters read
 *      as editorial.
 *   2. A11y/interaction: tablist semantics + ArrowLeft/ArrowRight
 *      keyboard navigation across steps.
 *   3. All four step visuals redrawn in the unified thin-line geometry
 *      language: emojis (🤖❌) removed; green/yellow semantic colors
 *      removed (homepage "no green" rule) — hierarchy now expressed via
 *      opacity/border layers of the brand palette.
 *   4. Content transition changed from lateral slide to 8px rise +
 *      fade (shared EASE); radii unified to 2/4/6px.
 *
 * Main Functionality:
 *   - Four-step protocol narrative (Problem → Protocol → State Layer →
 *     Service Layer), each with description, business context, technical
 *     bullets, and a dedicated visual.
 *
 * Dependencies:
 *   - components/ui/Container; framer-motion
 *   - tailwind.config.js v2.0 tokens
 *   - Section anchor #how-it-works (AILHeader nav + hero CTA target)
 *
 * Main Logical Flow:
 *   1. activeStep state → chapter nav (tablist, keyboard-navigable)
 *   2. AnimatePresence-free keyed motion swap of visual + content
 *   3. Docs CTA
 *
 * ⚠️ Important Notes for Next Developer:
 *   - v2.1 reframing stands: this section describes the privacy
 *     coordination protocol, NOT generic cloud payment automation.
 *   - Step copy objects preserved verbatim from v2.1 — do not trim.
 *   - Brand rule: no green, no emojis; visuals use brand/cipher/white-α.
 *
 * Last Modified: v3.0 — Chapter nav, keyboard a11y, visuals redrawn
 * ============================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const EASE = [0.16, 1, 0.3, 1];

const HowAILWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      phase: 'The Problem',
      shortTitle: 'Trusted middleboxes',
      title: 'Coordination Still Requires Trust',
      description: 'Humans, apps, and AI agents need to route traffic, exchange messages, and preserve memory. Today those flows usually pass through services that can observe content, metadata, or relationships.',
      businessContext: 'The next internet needs private coordination primitives, not another centralized account system that sees who talks to whom.',
      technical: [
        'Central relays can become surveillance points',
        'App servers often mix routing, identity, and content access',
        'Agent workflows need machine-readable access control',
        'Private memory should travel without vendor lock-in',
      ],
      visual: <ProblemVisual />,
    },
    {
      phase: 'The Protocol',
      shortTitle: 'Blind privacy fabric',
      title: 'Blind Privacy Fabric',
      description: 'AeroNyx Rust nodes exchange signed peer summaries, route encrypted payloads, and report only aggregate health. Nodes can help move data without reading user content.',
      businessContext: 'This is the trust boundary investors and users can understand: the protocol coordinates work, but the infrastructure is intentionally blind.',
      technical: [
        'Persistent peer store with lifecycle recovery',
        'Heartbeat summaries for privacy-safe public status',
        'Encrypted packet and traffic counters only in aggregate',
        'Foundation for future multi-hop routing',
      ],
      visual: <ProtocolVisual />,
    },
    {
      phase: 'The State Layer',
      shortTitle: 'User-owned memory',
      title: 'Memory Chain Travels With The User',
      description: 'Memory Chain is designed as an encrypted, signed, append-only record for private context. Clients and agents can sync useful state without handing raw history to an operator.',
      businessContext: 'If personal AI becomes important, private memory becomes infrastructure. AeroNyx treats it as user-owned protocol state.',
      technical: [
        'Ed25519 signed memory facts',
        'Hash-linked versions for auditability',
        'Encrypted storage and sync channels',
        'Coordinator cannot read raw content',
      ],
      visual: <TrustVisual />,
    },
    {
      phase: 'The Service Layer',
      shortTitle: 'Agent-native services',
      title: 'Agent-Native Services',
      description: 'x402-compatible payment flows let services quote access, receive payment, and execute work in a format autonomous agents can understand.',
      businessContext: 'AeroNyx can become the private service layer where agents route, remember, pay, and coordinate without defaulting to human-operated SaaS accounts.',
      technical: [
        'Request, quote, payment, execution lifecycle',
        'Wallet-based identity and service permissions',
        'Privacy protocol services before generic marketplaces',
        'Nodeboard and public stats expose health, not user data',
      ],
      visual: <ImpactVisual />,
    },
  ];

  /** Keyboard chapter navigation (v3.0) */
  const onNavKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveStep((s) => Math.min(s + 1, steps.length - 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveStep((s) => Math.max(s - 1, 0));
    }
  };

  return (
    <section id="how-it-works" className="py-12 md:py-24" style={{ background: 'var(--surface-1, #0C0C13)' }}>
      <Container>
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <h2 className="text-display-lg font-light mb-4 md:mb-6">
                From problem to protocol
              </h2>
              <p className="text-base md:text-xl text-white/60 max-w-copy leading-relaxed">
                AeroNyx is the privacy coordination protocol for encrypted routing,
                private memory, and agent-to-agent services.
              </p>
            </motion.div>
          </div>

          {/* Chapter navigation (v3.0) */}
          <div
            role="tablist"
            aria-label="Protocol narrative steps"
            onKeyDown={onNavKeyDown}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded overflow-hidden mb-10 md:mb-14"
          >
            {steps.map((step, index) => {
              const active = activeStep === index;
              return (
                <button
                  key={index}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`hiw-panel-${index}`}
                  onClick={() => setActiveStep(index)}
                  className={`relative text-left p-4 md:p-5 transition-colors duration-fast outline-none focus-visible:bg-brand-faint ${
                    active
                      ? 'bg-brand-faint text-white'
                      : 'bg-[var(--surface-1,#0C0C13)] text-white/45 hover:text-white/80'
                  }`}
                >
                  {active && (
                    <span aria-hidden="true" className="absolute left-0 top-0 h-0.5 w-full bg-brand-light" />
                  )}
                  <div className={`font-mono text-xs mb-2 ${active ? 'text-brand-light' : 'text-white/30'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase tracking-eyebrow mb-1 opacity-70">
                    {step.phase}
                  </div>
                  <div className="text-sm md:text-base leading-snug">
                    {step.shortTitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step content */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Visual */}
            <motion.div
              key={`visual-${activeStep}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="order-2 lg:order-1 hidden sm:block"
            >
              <div
                className="aspect-square border border-white/10 rounded-md p-4 md:p-8"
                style={{ background: 'var(--surface-0, #08080D)' }}
              >
                {steps[activeStep].visual}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              key={`content-${activeStep}`}
              id={`hiw-panel-${activeStep}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="order-1 lg:order-2"
            >
              <div className="mb-6 md:mb-8">
                <div className="font-mono text-xs text-brand-light mb-2">
                  {String(activeStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                </div>

                <h3 className="text-2xl md:text-3xl font-light mb-4">
                  {steps[activeStep].title}
                </h3>

                <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4">
                  {steps[activeStep].description}
                </p>

                <div className="bg-white/[0.03] border-l-2 border-brand/40 pl-4 py-3 mb-6">
                  <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-1">
                    Protocol Impact
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {steps[activeStep].businessContext}
                  </p>
                </div>
              </div>

              {/* Technical details */}
              <div className="space-y-2 md:space-y-3">
                <div className="text-[10px] uppercase tracking-eyebrow text-white/40">
                  How It Works
                </div>
                {steps[activeStep].technical.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, ease: EASE }}
                    className="flex items-start"
                  >
                    <div className="w-1 h-1 rounded-pill bg-brand-light/60 mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base text-white/60">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Progress indicator */}
          <div className="mt-8 md:mt-12 flex justify-center gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`h-0.5 transition-all duration-base ease-out-brand ${
                  index === activeStep ? 'w-8 bg-brand-light' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-12 md:mt-16 text-center"
          >
            
              href="https://docs.aeronyx.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded border border-white/20 hover:border-brand-line hover:bg-brand-faint transition-colors duration-fast"
            >
              <span className="text-sm uppercase tracking-eyebrow">
                Read the Technical Docs
              </span>
            </a>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

/* ============================================================
 * STEP VISUALS — unified thin-line geometry, brand palette only
 * ============================================================ */

/** 01 · Problem — agent above a boundary it cannot see through. */
const ProblemVisual = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 px-6">
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="text-center"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 rounded-md border border-cipher/30 bg-cipher/[0.05] flex items-center justify-center">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cipher-light">
          <rect x="5" y="7" width="14" height="12" rx="2" />
          <path d="M12 7V4M9 12h.01M15 12h.01M9 16h6" />
        </svg>
      </div>
      <div className="text-xs text-white/40">AI Agent</div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full text-center"
    >
      <div className="relative h-px w-full bg-white/15 mb-4">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--surface-0,#08080D)] px-3 text-[10px] uppercase tracking-eyebrow text-warn">
          Trusted boundary
        </span>
      </div>
      <div className="text-sm text-white/60 leading-relaxed">
        "Route this privately"
        <br />
        "Keep memory encrypted"
        <br />
        "Do not expose the graph"
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.35 }}
      transition={{ delay: 0.6 }}
      className="text-xs text-white/40"
    >
      Infrastructure that can read everything
    </motion.div>
  </div>
);

/** 02 · Protocol — four-stage flow, hierarchy via opacity layers. */
const ProtocolVisual = () => {
  const stages = [
    { n: '1', label: 'Peer Summary', code: 'signed peer view', accent: false },
    { n: '2', label: 'Health Sync', code: 'heartbeat aggregate', note: 'No user payloads', accent: true },
    { n: '3', label: 'Blind Relay', code: 'ciphertext packet', accent: true },
    { n: '4', label: 'Public Status', code: 'aggregate network stats', accent: false },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="space-y-3 w-full max-w-sm px-2">
        {stages.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.4, ease: EASE }}
            className={`rounded p-3 border ${
              s.accent
                ? 'border-brand-line bg-brand-faint'
                : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <div className={`flex items-baseline gap-2 text-xs mb-1 ${s.accent ? 'text-brand-light' : 'text-white/40'}`}>
              <span className="font-mono">{s.n}</span>
              <span>{s.label}</span>
            </div>
            <code className="text-xs text-white/70 break-all">{s.code}</code>
            {s.note && <div className="text-xs text-white/50 mt-1">{s.note}</div>}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-xs text-white/40 pt-2"
        >
          Nodes coordinate without reading content
        </motion.div>
      </div>
    </div>
  );
};

/** 03 · State — encrypted core with auditability waves. */
const TrustVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative">
      <motion.div
        className="w-24 h-24 md:w-32 md:h-32 rounded-pill border border-brand-line bg-brand-faint flex items-center justify-center relative z-10"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="text-center">
          <div className="text-sm md:text-base text-brand-light font-mono">MC</div>
          <div className="text-xs text-white/40">Encrypted</div>
        </div>
      </motion.div>

      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-brand/20 rounded-pill"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1 + i * 0.4, opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, repeatDelay: 0.8 }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center w-full"
      >
        <div className="text-xs text-white/40">
          Signed facts, hash-linked versions
          <br />
          <span className="text-white/60">Without exposing raw history</span>
        </div>
      </motion.div>
    </div>
  </div>
);

/** 04 · Service — lifecycle rows + protocol facts in mono. */
const ImpactVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="space-y-4 w-full max-w-sm px-2">
      <div className="text-center mb-6">
        <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-4">Service Lifecycle</div>

        {['quote', 'pay', 'run'].map((verb, i) => (
          <motion.div
            key={verb}
            className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded p-2.5 mb-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25, duration: 0.35, ease: EASE }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-pill bg-brand-light" />
              <span className="text-xs text-white/60">Step {i + 1}</span>
            </div>
            <span className="text-xs font-mono text-brand-light">{verb}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, ease: EASE }}
        className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10"
      >
        <div className="text-center">
          <div className="text-2xl font-light font-mono text-brand-light mb-1">402</div>
          <div className="text-xs text-white/40">Payment Flow</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-light font-mono text-brand-light mb-1">E2E</div>
          <div className="text-xs text-white/40">Payload Privacy</div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default HowAILWorks;
