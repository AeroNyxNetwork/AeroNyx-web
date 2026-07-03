/**
 * ============================================
 * File: components/sections/ProblemToX402.jsx
 * ============================================
 * Creation Reason: v1.0 — Merge of ProblemStatement (v3.0) and
 *   X402Showcase (v2.0) into a single narrative section for the
 *   approved top-tier homepage restructure. The two sections told two
 *   halves of one story (agents are blocked by 3 things → x402 already
 *   solves the payment one); presenting them separately caused ~12
 *   screens of overlapping "agents are locked out" messaging. This
 *   section states the blockade once, then resolves the payment blocker
 *   inline with the traditional-vs-x402 proof.
 *
 * Superseded files (kept in repo, no longer imported by index.js):
 *   - components/sections/ProblemStatement.js (v3.0)
 *   - components/sections/X402Showcase.js (v2.0)
 *   Recover their standalone forms from version history if needed.
 *
 * Main Functionality:
 *   - Headline + three blocker cards (account / payment / memory).
 *   - The payment blocker is the pivot: an inline tab switches the code
 *     panel between the traditional (human-gated) and x402 (autonomous)
 *     flows, proving the payment blocker is already solved.
 *   - Closing bridge line into the protocol section.
 *
 * Dependencies:
 *   - components/ui/Container; framer-motion
 *   - tailwind.config.js v2.0 tokens; _app.js v2.2 (Instrument Serif)
 *   - pages/index.js must import THIS instead of ProblemStatement +
 *     X402Showcase (see the updated import block delivered alongside).
 *
 * Main Logical Flow:
 *   1. Reveal headline + three blockers on scroll (shared EASE).
 *   2. codeTab state (traditional | x402) drives the inline code panel.
 *   3. Bridge line hands off to HowAILWorks.
 *
 * ⚠️ Important Notes for Next Developer:
 *   - No unsourced statistics (site-wide rule since ProductsEcosystem
 *     v2.3). No green, no emojis. Keep the Coinbase x402 attribution.
 *   - Instrument Serif headline is weight 400 — never bold; emphasis is
 *     italic + brand color.
 *
 * Last Modified: v1.0 — Initial merge
 * ============================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const EASE = [0.16, 1, 0.3, 1];

/* ---- Minimal blocker icons (no emojis) ---- */
const AccountIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warn">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20a8 8 0 0116 0" />
  </svg>
);
const PaymentIcon = ({ solved }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    className={solved ? 'text-brand-light' : 'text-warn'}>
    <rect x="2" y="5" width="20" height="14" rx="1" />
    <path d="M2 10h20" />
  </svg>
);
const MemoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warn">
    <rect x="5" y="5" width="14" height="14" rx="1" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </svg>
);

const ProblemToX402 = () => {
  const [codeTab, setCodeTab] = useState('x402');

  const blockers = [
    {
      icon: <AccountIcon />,
      title: 'Account Creation',
      problem: "Agents can't verify emails or solve CAPTCHAs to open accounts.",
      status: 'Blocked',
      statusTone: 'text-warn',
    },
    {
      icon: <PaymentIcon solved />,
      title: 'Payment Setup',
      problem: 'No cards, no bank accounts, no human to configure billing.',
      status: 'Solved by x402',
      statusTone: 'text-brand-light',
      pivot: true,
    },
    {
      icon: <MemoryIcon />,
      title: 'Memory Lock-in',
      problem: 'Agent memory is trapped in vendor silos — switch tools, lose everything.',
      status: 'Solved by MemChain',
      statusTone: 'text-brand-light',
    },
  ];

  return (
    <section className="py-14 md:py-24 border-y border-white/5" style={{ background: 'var(--surface-1, #0C0C13)' }}>
      <Container>
        <div className="max-w-6xl mx-auto">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center mb-12 md:mb-16"
          >
            <h2
              className="mb-5"
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.015em',
              }}
            >
              We built agents that can think.
              <br />
              Then locked them <em className="text-brand-light" style={{ fontStyle: 'italic' }}>out.</em>
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-copy mx-auto leading-relaxed">
              Autonomous agents can write code, analyze data, and make decisions — but the
              infrastructure they need was built for a human at a keyboard.
            </p>
          </motion.div>

          {/* Three blockers */}
          <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-12">
            {blockers.map((b, index) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: EASE }}
                className={`rounded-md border p-5 md:p-6 ${
                  b.pivot
                    ? 'border-brand-line bg-brand-faint'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <div className="mb-3">{b.icon}</div>
                <h3 className="text-base md:text-lg font-medium mb-2">{b.title}</h3>
                <p className="text-xs md:text-sm text-white/60 mb-3 leading-relaxed">{b.problem}</p>
                <div className={`text-[10px] uppercase tracking-eyebrow font-medium ${b.statusTone}`}>
                  {b.status}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pivot: resolve the payment blocker inline (the x402 proof) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-md border border-white/10 overflow-hidden"
            style={{ background: 'var(--surface-0, #08080D)' }}
          >
            {/* Pivot header */}
            <div className="p-5 md:p-8 border-b border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-eyebrow text-brand-light border border-brand-line bg-brand-faint rounded-sm px-2 py-0.5">
                  The x402 Advantage
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-light mb-2">
                The payment blocker is already gone.
              </h3>
              <p className="text-sm md:text-base text-white/60 max-w-2xl leading-relaxed">
                With the <span className="text-white font-medium">x402 protocol</span>, an agent pays
                per request over HTTP — no account, no card on file, no human in the loop. Days of
                setup collapse into a single call.
              </p>
            </div>

            {/* Inline code proof with tab switch */}
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* Flow steps */}
              <div className="p-5 md:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                {codeTab === 'traditional' ? <TraditionalFlow /> : <X402Flow />}
              </div>

              {/* Code panel */}
              <div className="p-5 md:p-8">
                <div className="inline-flex p-1 rounded border border-white/10 bg-white/[0.03] mb-4">
                  {[
                    { id: 'traditional', label: 'Traditional API' },
                    { id: 'x402', label: 'With x402' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setCodeTab(tab.id)}
                      className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-medium transition-colors duration-fast ${
                        codeTab === tab.id ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="rounded border border-white/10 overflow-x-auto" style={{ background: 'var(--surface-2, #111118)' }}>
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-pill bg-white/15" />
                      <div className="w-2.5 h-2.5 rounded-pill bg-white/15" />
                      <div className="w-2.5 h-2.5 rounded-pill bg-white/15" />
                    </div>
                    <span className="text-xs text-white/40 ml-2 font-mono">
                      {codeTab === 'traditional' ? 'traditional_api.js' : 'x402_api.js'}
                    </span>
                  </div>
                  <div className="p-4 font-mono text-xs sm:text-sm min-w-0">
                    {codeTab === 'traditional' ? <TraditionalCode /> : <X402Code />}
                  </div>
                </div>
              </div>
            </div>

            {/* Attribution */}
            <div className="px-5 md:px-8 py-3 border-t border-white/10 text-xs text-white/40">
              x402 protocol developed by Coinbase (2024)
            </div>
          </motion.div>

          {/* Bridge into the protocol */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mt-12 md:mt-16"
          >
            <p className="text-sm md:text-base text-white/50 max-w-copy mx-auto">
              Payment and memory are two blockers down. The third — trust —
              is what the rest of the protocol removes.
            </p>
            <div className="h-px w-24 mx-auto mt-5 bg-gradient-to-r from-transparent via-brand-light/30 to-transparent" />
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

/* ---- Flow steps ---- */
const FlowStep = ({ number, title, description, tone }) => {
  const tones = {
    warn: 'border-warn/25 bg-warn/[0.05]',
    ok: 'border-brand-line bg-brand-faint',
    neutral: 'border-white/10 bg-white/[0.03]',
  };
  const numberTone = {
    warn: 'text-warn border-warn/30',
    ok: 'text-brand-light border-brand-line',
    neutral: 'text-white/50 border-white/15',
  };
  return (
    <div className={`p-3 rounded border ${tones[tone]} mb-2`}>
      <div className="flex items-start gap-3">
        <div className={`w-7 h-7 rounded-sm border flex items-center justify-center text-xs font-mono flex-shrink-0 ${numberTone[tone]}`}>
          {number}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm mb-0.5">{title}</h4>
          <p className="text-xs text-white/60">{description}</p>
        </div>
      </div>
    </div>
  );
};

const TraditionalFlow = () => (
  <div>
    <h4 className="text-sm font-medium mb-4 text-warn">Traditional API — human at every step</h4>
    <FlowStep number="1" title="Create Account" description="Human signs up, verifies email" tone="warn" />
    <FlowStep number="2" title="Add Payment Method" description="Human enters credit card details" tone="warn" />
    <FlowStep number="3" title="Configure Billing" description="Human sets up subscription" tone="warn" />
    <FlowStep number="4" title="Get API Key" description="Finally… access infrastructure" tone="neutral" />
    <div className="mt-4 p-3 rounded border border-warn/25 bg-warn/[0.06]">
      <div className="text-sm text-white/60">Days of setup. Agents blocked.</div>
    </div>
  </div>
);

const X402Flow = () => (
  <div>
    <h4 className="text-sm font-medium mb-4 text-brand-light">With x402 — autonomous</h4>
    <FlowStep number="1" title="Request Resource" description="Agent sends HTTP request" tone="ok" />
    <FlowStep number="2" title="Receive Quote" description="Server responds 402 + price" tone="ok" />
    <FlowStep number="3" title="Auto-Pay" description="Wallet signs payment automatically" tone="ok" />
    <FlowStep number="4" title="Get Access" description="Instant resource delivery" tone="ok" />
    <div className="mt-4 p-3 rounded border border-brand-line bg-brand-faint">
      <div className="text-sm text-white/60">One request-cycle. No human needed.</div>
    </div>
  </div>
);

/* ---- Code samples (strings in cipher blue; no green) ---- */
const TraditionalCode = () => (
  <pre className="text-xs leading-relaxed whitespace-pre-wrap break-words">
    <code className="block">
      <span className="text-white/35">// Human signs up, adds card, gets key</span>{'\n'}
      {'\n'}
      <span className="text-brand-light">const</span> <span className="text-cipher-light">apiKey</span> = <span className="text-cipher">'sk_live_...'</span>;{'\n'}
      {'\n'}
      <span className="text-brand-light">const</span> <span className="text-cipher-light">res</span> = <span className="text-brand-light">await</span> <span className="text-white/80">fetch</span>(<span className="text-cipher">'https://api.example.com'</span>, {'{'}{'\n'}
      {'  '}<span className="text-cipher-light">headers</span>: {'{'} <span className="text-cipher">'Authorization'</span>: <span className="text-cipher">`Bearer ${'{'}apiKey{'}'}`</span> {'}'}{'\n'}
      {'}'});{'\n'}
      {'\n'}
      <span className="text-white/35">// Agents can't obtain apiKey</span>{'\n'}
      <span className="text-white/35">// Requires human intervention</span>
    </code>
  </pre>
);

const X402Code = () => (
  <pre className="text-xs leading-relaxed whitespace-pre-wrap break-words">
    <code className="block">
      <span className="text-white/35">// No sign-up. No card on file.</span>{'\n'}
      {'\n'}
      <span className="text-brand-light">const</span> <span className="text-cipher-light">res</span> = <span className="text-brand-light">await</span> <span className="text-white/80">fetch</span>(<span className="text-cipher">'https://aeronyx.network/compute'</span>, {'{'}{'\n'}
      {'  '}<span className="text-cipher-light">headers</span>: {'{'}{'\n'}
      {'    '}<span className="text-cipher">'X-Payment'</span>: <span className="text-brand-light">await</span> wallet.<span className="text-white/80">signPayment</span>(){'\n'}
      {'  }'}{'\n'}
      {'}'});{'\n'}
      {'\n'}
      <span className="text-white/35">// Fully autonomous · pay per request</span>{'\n'}
      <span className="text-white/35">// 402 -> wallet signs -> retried -> served</span>
    </code>
  </pre>
);

export default ProblemToX402;
