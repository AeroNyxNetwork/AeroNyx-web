/**
 * ============================================
 * File: components/sections/ProtocolArchitecture.js
 * ============================================
 * Modification Reason: v4.9 - Visibility boundary polish.
 *   Added a compact "who can see what" boundary strip before the two
 *   architecture pillars. This translates the blind protocol invariant into
 *   an investor/user-readable trust model: clients can read local plaintext,
 *   decentralized nodes only see ciphertext plus signed metadata, and the
 *   public site only exposes aggregate health.
 *
 * Historical Notes:
 * v4.8 - Decentralized node public naming.
 *   The public architecture copy now describes decentralized protocol nodes
 *   instead of exposing the underlying implementation language in user-facing
 *   narrative.
 *
 * Historical Notes:
 * v4.7 - Motion accessibility and identity wording.
 *   The architecture visuals now respect prefers-reduced-motion so the public
 *   protocol page keeps Apple-grade accessibility. Service-layer copy also
 *   moves from legacy credential wording to identity-derived permission scopes,
 *   matching the current protocol narrative without implying a finance surface.
 *
 * Historical Notes:
 * v4.5 - Source cleanup and protocol naming alignment.
 *   Renamed the active architecture section so the visible two-layer story
 *   and layout are preserved while stale implementation naming is removed.
 *
 * Historical Notes:
 * v4.0 — Narrative compression for the approved
 *   top-tier restructure. Cut from four steps to the two load-bearing
 *   ones: Blind Fabric and Agent-Native Services. The removed steps are
 *   fully covered elsewhere and were causing homepage repetition.
 *   Layout shifts from a slideshow (numbered chapter nav + one panel at
 *   a time) to two concepts presented together — a pillar pair — which
 *   reads as architecture, not a walkthrough. This also removes the
 *   tab/keyboard nav machinery (no longer needed for two items).
 *
 *   (v3.0 changes retained where still relevant: thin-line visuals,
 *   brand-only palette, no green, no emojis, shared EASE, 2/4/6px radii.)
 *
 * Main Functionality:
 *   - Section header + two pillars (Blind Fabric / Agent Services), each
 *     with description, protocol-impact callout, technical bullets, and
 *     a dedicated thin-line visual. Docs CTA.
 *
 * Dependencies:
 *   - components/ui/Container; framer-motion
 *   - tailwind.config.js v2.1 tokens; _app.js v2.4 (Inter Tight display)
 *   - Section anchor #how-it-works (SiteHeader nav + hero CTA target)
 *
 * Main Logical Flow:
 *   1. Header reveals on scroll.
 *   2. Two pillars reveal with stagger; each is self-contained (no
 *      active-step state).
 *   3. Docs CTA.
 *
 * ⚠️ Important Notes for Next Developer:
 *   - v2.1 reframing stands: privacy coordination protocol, not generic
 *     cloud automation.
 *   - The two remaining pillars' copy is preserved verbatim from the v3.0
 *     Protocol + Service steps. Do not re-add the Problem/State steps here.
 *   - Brand rule: no green, no emojis; visuals use brand/cipher/white-α.
 *   - Section headline uses the shared text-display-lg token. Keep the
 *     architecture tone precise and avoid decorative display styling.
 *
 * Last Modified: v4.5 - Renamed active section to ProtocolArchitecture
 * Last Modified: v4.6 - Reframed service layer away from payment-first copy
 * and toward encrypted coordination services.
 * Last Modified: v4.7 - Reduced-motion support and identity wording
 * Last Modified: v4.8 - Decentralized node public naming
 * Last Modified: v4.9 - Visibility boundary polish
 * ============================================
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';

const EASE = [0.16, 1, 0.3, 1];

const PILLARS = [
  {
    tag: 'The Protocol',
    title: 'Blind Privacy Fabric',
    description:
      'AeroNyx decentralized protocol nodes exchange signed peer summaries, route encrypted payloads, and report only aggregate health. Nodes move data without ever reading user content.',
    impact:
      'The trust boundary investors and users can understand: the protocol coordinates the work, but the infrastructure is intentionally blind.',
    technical: [
      'Persistent peer store with lifecycle recovery',
      'Heartbeat summaries for privacy-safe public status',
      'Encrypted packet and traffic counters only in aggregate',
      'Foundation for future multi-hop routing',
    ],
    visual: 'fabric',
  },
  {
    tag: 'The Service Layer',
    title: 'Encrypted Coordination Services',
    description:
      'Humans, apps, and agents use the same private service surface to route traffic, exchange encrypted messages, preserve context, and request work without exposing payloads to infrastructure.',
    impact:
      'The product surface investors can remember: private connection plus private memory becomes an open coordination layer agents can actually use.',
    technical: [
      'Blind relay and encrypted message routing',
      'MemChain context handoff without node-readable memory',
      'Identity-derived permissions and service scopes',
      'Public stats expose health, not user data',
    ],
    visual: 'service',
  },
];

const VISIBILITY_BOUNDARY = [
  {
    surface: 'Client',
    canSee: 'Local plaintext before encryption',
    cannotSee: 'Never leaves the device unless encrypted',
  },
  {
    surface: 'Decentralized nodes',
    canSee: 'Ciphertext, TTL, signed routing metadata',
    cannotSee: 'No payloads, memory, domains, or social graph',
  },
  {
    surface: 'Public status',
    canSee: 'Aggregate health and relay evidence',
    cannotSee: 'No node-level user activity or destinations',
  },
];

const ProtocolArchitecture = () => {
  const reduced = useReducedMotion();

  return (
    <section id="how-it-works" className="scroll-mt-20 py-12 md:scroll-mt-24 md:py-20" style={{ background: 'var(--surface-0, #08080D)' }}>
      <Container>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10 max-w-3xl md:mb-14"
          >
            <div className="mb-3 text-[10px] uppercase tracking-eyebrow text-brand-light md:mb-4">
              Protocol Architecture
            </div>
            <h2 className="text-display-lg font-light mb-4 md:mb-6">
              Two layers. One <em className="text-brand-light" style={{ fontStyle: 'italic' }}>invariant.</em>
            </h2>
            <p className="text-base md:text-xl text-white/60 leading-relaxed">
              A blind fabric that routes what it can't read, and a service layer agents
              can use directly. Both hold the same line: coordinate the work, never see the content.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-6 page-surface overflow-hidden rounded border md:mb-8"
          >
            <div className="grid gap-0 lg:grid-cols-[0.72fr_2.28fr]">
              <div className="border-b border-white/10 p-4 md:p-5 lg:border-b-0 lg:border-r">
                <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">
                  Visibility Boundary
                </div>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/50">
                  The protocol is designed around a simple promise: each layer only
                  sees the minimum it needs to do its job.
                </p>
              </div>
              <div className="grid gap-0 md:grid-cols-3">
                {VISIBILITY_BOUNDARY.map((item) => (
                  <div key={item.surface} className="min-w-0 border-t border-white/10 p-4 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0 md:p-5">
                    <div className="text-[10px] uppercase tracking-eyebrow text-white/38">
                      {item.surface}
                    </div>
                    <div className="mt-3 text-sm leading-relaxed text-white/74">
                      {item.canSee}
                    </div>
                    <div className="mt-3 border-t border-white/10 pt-3 text-xs leading-relaxed text-brand-light/72">
                      {item.cannotSee}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Two pillars */}
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: EASE }}
                className="page-card flex min-h-full flex-col overflow-hidden rounded border"
              >
                {/* Visual */}
                <div
                  className="aspect-[16/10] border-b border-white/10 p-5 md:p-8"
                  style={{ background: 'var(--surface-0, #08080D)' }}
                >
                  {pillar.visual === 'service' ? <ServiceVisual reduced={reduced} /> : <FabricVisual reduced={reduced} />}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 md:p-7">
                  <div className="text-[10px] uppercase tracking-eyebrow text-brand-light mb-2">
                    {pillar.tag}
                  </div>
                  <h3 className="text-display-md font-light mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
                    {pillar.description}
                  </p>

                  <div className="mb-6 border-l-2 border-brand/40 bg-white/[0.03] py-3 pl-4 pr-3">
                    <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-1">
                      Protocol Impact
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {pillar.impact}
                    </p>
                  </div>

                  <div className="space-y-2.5 mt-auto">
                    <div className="text-[10px] uppercase tracking-eyebrow text-white/40">
                      How It Works
                    </div>
                    {pillar.technical.map((item, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-1 h-1 rounded-pill bg-brand-light/60 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm leading-relaxed text-white/60">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-10 text-center md:mt-14"
          >
            <a
              href="https://docs.aeronyx.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/20 px-8 py-3.5 text-center hover:border-brand-line hover:bg-brand-faint transition-colors duration-fast"
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
 * PILLAR VISUALS — thin-line geometry, brand palette
 * ============================================================ */

/** Blind Fabric — a mesh routing a ciphertext packet, eyes closed. */
function FabricVisual({ reduced }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 320 180" className="w-full h-full max-w-[420px]" fill="none">
        {/* mesh edges */}
        {[
          [40, 60, 130, 40], [130, 40, 220, 70], [220, 70, 285, 45],
          [40, 60, 90, 130], [90, 130, 180, 120], [180, 120, 220, 70],
          [90, 130, 200, 150], [180, 120, 285, 130], [130, 40, 180, 120],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(119,98,243,0.18)" strokeWidth="1" />
        ))}
        {/* nodes */}
        {[
          [40, 60], [130, 40], [220, 70], [285, 45],
          [90, 130], [180, 120], [200, 150], [285, 130],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="rgba(119,98,243,0.5)" />
        ))}
        {/* travelling ciphertext packet */}
        <motion.circle
          r="3.5"
          fill="#9788F7"
          initial={{ cx: 40, cy: 60 }}
          animate={reduced ? { cx: 220, cy: 70 } : { cx: [40, 130, 220, 285], cy: [60, 40, 70, 45] }}
          transition={reduced ? { duration: 0 } : { duration: 3.5, repeat: Infinity, ease: 'linear' }}
        />
        {/* hex label following the packet feel — static, quiet */}
        <text x="160" y="172" textAnchor="middle"
          style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 9, fill: 'rgba(151,136,247,0.5)' }}>
          ciphertext · relayed · unread
        </text>
      </svg>
    </div>
  );
}

/** Agent Services — route → recall → coordinate, in mono. */
function ServiceVisual({ reduced }) {
  const steps = ['route', 'recall', 'coordinate'];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-[300px] space-y-2.5">
        {steps.map((verb, i) => (
          <motion.div
            key={verb}
            className="flex items-center justify-between rounded border border-white/10 bg-white/[0.03] px-3.5 py-2.5"
            initial={reduced ? false : { opacity: 0, x: -12 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-white/40">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm text-white/70">Step {i + 1}</span>
            </div>
            <span className="font-mono text-sm text-brand-light">{verb}</span>
          </motion.div>
        ))}
        <motion.div
          className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
        >
          <div className="text-center">
            <div className="font-mono text-xl font-light text-brand-light">E2E</div>
            <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mt-0.5">Payload Privacy</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-xl font-light text-brand-light">BLIND</div>
            <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mt-0.5">Node Boundary</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProtocolArchitecture;
