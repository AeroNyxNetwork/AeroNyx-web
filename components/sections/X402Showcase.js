/**
 * ============================================
 * File: components/sections/X402Showcase.jsx
 * ============================================
 * Modification Reason: v2.1 — Remove legacy node-economy positioning from visible copy.
 *   v2.1 keeps the x402 section focused on AeroNyx as a blind, open privacy
 *   protocol for autonomous agents. The old node-economy category label is
 *   removed because it no longer matches the protocol/product separation used
 *   across the homepage.
 *
 * Historical Notes:
 *   v2.0 — 2026 brand/aesthetic + credibility pass.
 *   1. FIX (credibility): removed the unverified "15,000-node" scale
 *      claim. ProductsEcosystem v2.3 already removed unverified scale
 *      claims site-wide; this one was missed and directly contradicts
 *      the live aggregate stats shown one screen above.
 *   2. Brand: all emojis removed (replaced with numbered steps and
 *      minimal SVG). Green/red/yellow semantic colors replaced with the
 *      token system: success/ready = brand purple (ok), blocked/slow =
 *      muted amber (warn). No green anywhere (hero brand rule).
 *   3. Geometry: rounded-xl/full → sharp radii (2/4/6px). Motion uses
 *      shared tokens (600ms, ease-out-brand equivalent curve).
 *   4. Code block: string literals restyled cipher blue (was green).
 *
 * Main Functionality:
 *   - Interactive comparison of traditional API onboarding vs x402
 *     autonomous payment flow, with tab switcher, step flows, code
 *     examples, and innovation statement.
 *
 * Dependencies:
 *   - components/ui/Container
 *   - tailwind.config.js v2.0 tokens (brand/cipher/ok/warn/surface)
 *   - framer-motion
 *
 * Main Logical Flow:
 *   1. Tab state (traditional | x402) → flow viz + code example swap
 *   2. Innovation statement with x402 attribution
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Do NOT reintroduce specific node-count / cost / speed claims
 *     without a verifiable source; the site shows live aggregates.
 *   - Keep the Coinbase x402 attribution line.
 *   - Brand rule: no green, no emojis in this section.
 *
 * Last Modified: v2.1 — Protocol narrative cleanup
 * ============================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const EASE = [0.16, 1, 0.3, 1];

const X402Showcase = () => {
  const [activeTab, setActiveTab] = useState('traditional');

  return (
    <section className="py-12 md:py-20 border-y border-white/5" style={{ background: 'var(--surface-1, #0C0C13)' }}>
      <Container>
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-brand-line bg-brand-faint mb-5">
              <span className="text-[10px] uppercase tracking-eyebrow text-brand-light">
                The x402 Advantage
              </span>
            </div>

            <h2 className="text-display-lg font-light mb-4">
              From impossible to instant
            </h2>

            <p className="text-base md:text-lg text-white/60 max-w-copy mx-auto">
              Using the <span className="text-white font-medium">x402 protocol</span>,
              AeroNyx makes infrastructure truly autonomous — no human intervention required.
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded border border-white/10 bg-white/[0.03]">
              {[
                { id: 'traditional', label: 'Traditional API' },
                { id: 'x402', label: 'With x402' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-sm text-sm font-medium transition-colors duration-fast ${
                    activeTab === tab.id
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Content */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-12">

            {/* Flow Visualization */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="order-2 md:order-1"
            >
              {activeTab === 'traditional' ? <TraditionalFlow /> : <X402Flow />}
            </motion.div>

            {/* Code Example */}
            <motion.div
              key={`code-${activeTab}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="order-1 md:order-2"
            >
              <div className="w-full overflow-hidden">
                <div className="rounded-md border border-white/10 overflow-x-auto" style={{ background: 'var(--surface-2, #111118)' }}>
                  {/* Code Header — neutral window dots (brand: no green) */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-pill bg-white/15" />
                        <div className="w-2.5 h-2.5 rounded-pill bg-white/15" />
                        <div className="w-2.5 h-2.5 rounded-pill bg-white/15" />
                      </div>
                      <span className="text-xs text-white/40 ml-2 font-mono">
                        {activeTab === 'traditional' ? 'traditional_api.js' : 'x402_api.js'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 font-mono text-xs sm:text-sm min-w-0">
                    {activeTab === 'traditional' ? <TraditionalCode /> : <X402Code />}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Innovation Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="border border-white/10 rounded-md p-6 md:p-8 bg-brand-faint"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded border border-brand-line bg-brand-faint flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">
                  AeroNyx Innovation: x402 + ZKP + Blind Routing
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-3">
                  {/* v2.0: unverified node-count claim removed */}
                  We combine <span className="text-white">x402 instant payments</span> with
                  zero-knowledge hardware proofs on a decentralized node network —
                  creating infrastructure where AI agents can verify quality,
                  pay instantly, and access resources without any human setup.
                </p>
                <div className="text-xs text-white/40 pt-2 border-t border-white/10">
                  x402 protocol developed by Coinbase (2024)
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

/** Traditional API flow — human-gated steps (warn tone). */
const TraditionalFlow = () => (
  <div className="space-y-3">
    <h3 className="text-xl font-light mb-6 text-warn">
      Traditional API: impossible for AI agents
    </h3>

    <FlowStep number="1" title="Create Account" description="Human must sign up, verify email" tone="warn" />
    <FlowStep number="2" title="Add Payment Method" description="Human must enter credit card details" tone="warn" />
    <FlowStep number="3" title="Configure Billing" description="Human must set up monthly subscription" tone="warn" />
    <FlowStep number="4" title="Get API Key" description="Finally… access infrastructure" tone="neutral" />

    <div className="mt-6 p-4 rounded border border-warn/25 bg-warn/[0.06]">
      <div className="font-medium text-warn mb-1 text-sm">Result: days of setup time</div>
      <div className="text-sm text-white/60">
        Requires a human at every step. Autonomous agents are blocked.
      </div>
    </div>
  </div>
);

/** x402 flow — autonomous steps (brand tone). */
const X402Flow = () => (
  <div className="space-y-3">
    <h3 className="text-xl font-light mb-6 text-brand-light">
      With x402: instant &amp; autonomous
    </h3>

    <FlowStep number="1" title="Request Resource" description="AI agent sends HTTP request" tone="ok" />
    <FlowStep number="2" title="Receive Price Quote" description="Server responds with 402 + price" tone="ok" />
    <FlowStep number="3" title="Auto-Pay with x402" description="Wallet signs payment automatically" tone="ok" />
    <FlowStep number="4" title="Get Access" description="Instant resource delivery" tone="ok" />

    <div className="mt-6 p-4 rounded border border-brand-line bg-brand-faint">
      <div className="font-medium text-brand-light mb-1 text-sm">Result: one request-cycle</div>
      <div className="text-sm text-white/60">
        Fully autonomous. No human intervention needed at any step.
      </div>
    </div>
  </div>
);

/** Single flow step. tone: 'ok' | 'warn' | 'neutral' */
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
    <div className={`p-4 rounded border ${tones[tone]}`}>
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

/** Code samples — strings in cipher blue (brand: no green in syntax). */
const TraditionalCode = () => (
  <pre className="text-xs leading-relaxed whitespace-pre-wrap break-words">
    <code className="block">
      <span className="text-white/35">// Step 1: Human signs up manually</span>{'\n'}
      <span className="text-white/35">// Step 2: Human adds credit card</span>{'\n'}
      <span className="text-white/35">// Step 3: Human gets API key</span>{'\n'}
      {'\n'}
      <span className="text-brand-light">const</span> <span className="text-cipher-light">apiKey</span> = <span className="text-cipher">'sk_live_...'</span>; <span className="text-white/35">// Dashboard</span>{'\n'}
      {'\n'}
      <span className="text-brand-light">const</span> <span className="text-cipher-light">response</span> = <span className="text-brand-light">await</span> <span className="text-white/80">fetch</span>(<span className="text-cipher">'https://api.example.com'</span>, {'{'}{'\n'}
      {'  '}<span className="text-cipher-light">headers</span>: {'{'}{'\n'}
      {'    '}<span className="text-cipher">'Authorization'</span>: <span className="text-cipher">`Bearer </span>${'{'}apiKey{'}'}<span className="text-cipher">`</span>{'\n'}
      {'  }'}{'\n'}
      {'}'});{'\n'}
      {'\n'}
      <span className="text-white/35">// Agents can't obtain apiKey</span>{'\n'}
      <span className="text-white/35">// Requires human intervention</span>{'\n'}
      <span className="text-white/35">// Monthly billing inflexible</span>
    </code>
  </pre>
);

const X402Code = () => (
  <pre className="text-xs leading-relaxed whitespace-pre-wrap break-words">
    <code className="block">
      <span className="text-white/35">// That's it — no sign-up needed</span>{'\n'}
      {'\n'}
      <span className="text-brand-light">const</span> <span className="text-cipher-light">response</span> = <span className="text-brand-light">await</span> <span className="text-white/80">fetch</span>(<span className="text-cipher">'https://aeronyx.network/compute'</span>, {'{'}{'\n'}
      {'  '}<span className="text-cipher-light">headers</span>: {'{'}{'\n'}
      {'    '}<span className="text-cipher">'X-Payment'</span>: <span className="text-brand-light">await</span> wallet.<span className="text-white/80">signPayment</span>(){'\n'}
      {'  }'}{'\n'}
      {'}'});{'\n'}
      {'\n'}
      <span className="text-white/35">// Fully autonomous</span>{'\n'}
      <span className="text-white/35">// Instant per-request payment</span>{'\n'}
      <span className="text-white/35">// Pay only what you use</span>{'\n'}
      {'\n'}
      <span className="text-white/35">// Behind the scenes:</span>{'\n'}
      <span className="text-white/35">// 1. Server: 402 Payment Required</span>{'\n'}
      <span className="text-white/35">// 2. Wallet auto-signs via x402</span>{'\n'}
      <span className="text-white/35">// 3. Request retried with payment</span>{'\n'}
      <span className="text-white/35">// 4. Resource delivered instantly</span>
    </code>
  </pre>
);

export default X402Showcase;
