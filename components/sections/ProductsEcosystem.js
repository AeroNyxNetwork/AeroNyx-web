/**
 * ============================================
 * File: components/sections/ProductsEcosystem.js
 * ============================================
 * Modification Reason: v3.4 — Product hierarchy order correction.
 *   Privacy Access and MemChain are intentionally ordered before Agent
 *   Payment Rails / x402 so the homepage presents AeroNyx's live privacy and
 *   private memory layers before the agent payment layer.
 *
 * Historical Notes:
 * v3.2 — Protocol-layer homepage handoff.
 *   Product CTAs now route to dedicated secondary pages for MemChain and
 *   Privacy Network. The homepage keeps this component as a protocol capability
 *   index instead of hosting long product deep-dives directly.
 *
 *   v3.0 — 2026 brand/aesthetic + interaction pass.
 *   1. Brand: all green/yellow semantic colors migrated to the token 
 *      system (homepage "no green" rule): Live badge → ok (brand light
 *      purple), Beta badge → warn (muted amber), Protocol Value /
 *      comparison highlight / closing statement → brand-light.
 *   2. Brand: ⏳ emoji in MemChain visual replaced with a minimal
 *      dashed-outline pending block (no emojis in new sections).
 *   3. A11y/interaction: product selector now has proper tab semantics
 *      (role=tablist/tab, aria-selected) and a brand-colored active
 *      indicator readable while horizontally scrolling on mobile.
 *   4. Perf: CDNVisual infinite rotation respects prefers-reduced-motion;
 *      product detail render switched from map-and-filter to direct
 *      lookup inside AnimatePresence.
 *   5. Geometry/motion: radii unified to 2/4/6px; easing unified to the
 *      shared brand curve; durations to the 300/600ms ladder.
 *
 * Main Functionality:
 *   - Five-product ecosystem selector (Privacy Access, Agent Payment
 *     Rails, Encrypted Service Relay, Protocol Foundation, MemChain)
 *     with per-product use case, architecture comparison, features,
 *     status badge, CTA, and a dedicated visual.
 *
 * Dependencies:
 *   - components/ui/Container
 *   - tailwind.config.js v2.0 tokens (brand/ok/warn/surface, radii,
 *     eyebrow tracking)
 *   - pages/_app.js v2.x: global delegated anchor handler. The local
 *     handleCtaClick preventDefaults FIRST for '#' links; the delegated
 *     handler checks e.defaultPrevented and yields. Do not remove either
 *     side without re-testing anchor scrolling.
 *
 * Main Logical Flow:
 *   1. selectedProduct state → tablist buttons
 *   2. AnimatePresence swaps the active product detail (direct lookup)
 *   3. ProductVisual renders the per-product SVG/blocks illustration
 *
 * ⚠️ Important Notes for Next Developer:
 *   - v2.3 rule stands: no unverified scale/cost claims in product copy.
 *   - All five product data objects preserved verbatim from v2.3 except
 *     color/emoji presentation — do not trim fields; MemChainShowcase
 *     and the secondary pages cross-reference this narrative.
 *   - Brand rule: no green, no emojis. Status colors come from the
 *     STATUS_BADGES map only.
 *
 * Last Modified: v3.3 — Homepage product index spacing and interaction polish
 * Last Modified: v3.4 — Privacy Access and MemChain ordered before x402 rails
 * ============================================
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';

const EASE = [0.16, 1, 0.3, 1];

/* Single source of truth for status presentation (brand: no green). */
const STATUS_BADGES = {
  live: { label: 'Live', className: 'text-ok border-brand-line bg-brand-faint' },
  beta: { label: 'Beta', className: 'text-warn border-warn/25 bg-warn/[0.06]' },
  'coming-soon': { label: 'Coming Soon', className: 'text-white/40 border-white/10 bg-white/[0.03]' },
};

const ProductsEcosystem = () => {
  const [selectedProduct, setSelectedProduct] = useState('vpn');

  const products = [
    {
      id: 'vpn',
      name: 'AeroNyx Privacy Access',
      category: 'Protocol Application',
      tagline: 'Private routing without trusting a company',
      useCase: {
        pain: 'Centralized privacy apps ask users to trust one company with all routing metadata',
        solution: 'AeroNyx routes through a blind privacy protocol where nodes see encrypted operations, not user content',
        savings: 'Use privacy as a protocol primitive, not another subscription silo.',
      },
      features: [
        'Blind relay fabric for encrypted routing',
        'Public aggregate network health without user-level telemetry',
        'Privacy access for humans, apps, and autonomous agents',
        'x402-ready payment rails for protocol services',
      ],
      comparison: {
        traditional: 'Centralized privacy app: trust the provider',
        aeronyx: 'AeroNyx: verify the protocol boundary',
        savings: 'Own the privacy layer',
      },
      status: 'live',
      cta: { text: 'Get Privacy Access', link: '/privacy-network' },
    },
    {
      id: 'memchain',
      name: 'MemChain',
      category: 'Encrypted Memory Layer',
      tagline: 'Versioned private memory for humans and agents',
      useCase: {
        pain: 'AI memories are trapped in vendor silos — switch tools, lose everything',
        solution: 'A personal, encrypted append-only memory chain that can travel across clients and agent tools',
        savings: 'Own the private context layer without exposing raw conversation history.',
      },
      features: [
        'Ed25519 signed, SHA-256 hashed memory facts',
        'Merkle tree blocks mined every hour',
        'Cross-device sync via encrypted protocol channels',
        'Agent integration with wallet-based identity',
      ],
      comparison: {
        traditional: 'Vendor memory: locked to one platform',
        aeronyx: 'MemChain: Owned by you, on your devices',
        savings: 'Total data sovereignty',
      },
      status: 'beta',
      cta: { text: 'Explore MemChain', link: '/memchain' },
    },
    {
      id: 'compute',
      name: 'Agent Payment Rails',
      category: 'Protocol Services',
      tagline: 'Machine-readable access for autonomous work',
      useCase: {
        pain: 'Agents still need human-owned accounts, API keys, billing pages, and trusted middlemen to use paid services',
        solution: 'AeroNyx prepares x402-compatible flows where a service quotes, an agent pays, and access is granted per request',
        savings: 'Turn paid access into a protocol primitive instead of another SaaS account.',
      },
      features: [
        'Request, quote, payment, and execution lifecycle',
        'Wallet-based identity for humans, apps, and agents',
        'Built for privacy-preserving service access',
        'Compatible with future node-operated protocol services',
      ],
      comparison: {
        traditional: 'Traditional API: account + billing portal',
        aeronyx: 'AeroNyx: quote + pay + execute',
        savings: 'Agent-native access',
      },
      status: 'beta',
      cta: { text: 'Join Beta', link: 'https://app.aeronyx.network' },
    },
    {
      id: 'cdn',
      name: 'Encrypted Service Relay',
      category: 'Developer Layer',
      tagline: 'Private routing for app and agent traffic',
      useCase: {
        pain: 'Apps and agents need to exchange data without exposing content, social graphs, or user-level telemetry to infrastructure operators',
        solution: 'AeroNyx nodes relay ciphertext and signed metadata while public dashboards only expose aggregate protocol health',
        savings: 'Ship privacy-preserving services without running a centralized trust boundary.',
      },
      features: [
        'Blind relay boundary for encrypted payloads',
        'Offline delivery primitives for secure messaging',
        'Privacy-safe lifecycle and peer health reporting',
        'Foundation for future multi-hop routing',
      ],
      comparison: {
        traditional: 'Central relay: operator sees the trust boundary',
        aeronyx: 'AeroNyx: nodes route ciphertext only',
        savings: 'Lower metadata exposure',
      },
      status: 'coming-soon',
      cta: { text: 'Join Waitlist', link: 'https://app.aeronyx.network/waitlist' },
    },
    {
      id: 'foundation',
      name: 'Privacy Protocol Foundation',
      category: 'Foundation Layer',
      tagline: 'Open Rust nodes, signed peer state, public health',
      useCase: {
        pain: 'Privacy products fail when every feature depends on a centralized service that can observe or be forced to disclose user behavior',
        solution: 'AeroNyx separates protocol state, node operations, public aggregates, and user-encrypted payloads from the start',
        savings: 'Build on an auditable privacy boundary instead of retrofitting one later.',
      },
      features: [
        'Rust node peer discovery and persistent peer store',
        'Privacy-safe heartbeat and lifecycle event reporting',
        'Nodeboard operations for health, capacity, and incidents',
        'Public network stats without user-level surveillance',
      ],
      comparison: {
        traditional: 'App stack: centralized observability first',
        aeronyx: 'AeroNyx: protocol privacy boundary first',
        savings: 'Credible by design',
      },
      status: 'live',
      cta: { text: 'View SDK Docs', link: 'https://docs.aeronyx.network/developer-documentation/overview' },
    },
  ];

  const activeProduct = products.find((p) => p.id === selectedProduct) || products[0];

  const getStatusBadge = (status) => {
    const badge = STATUS_BADGES[status];
    if (!badge) return null;
    return (
      <span className={`inline-flex rounded-sm border px-2 py-0.5 text-[10px] uppercase tracking-eyebrow ${badge.className}`}>
        {badge.label}
      </span>
    );
  };

  /**
   * Local anchor handler for '#' CTAs. Contract with _app.js v2.x:
   * this preventDefaults first; the global delegated handler checks
   * e.defaultPrevented and yields. Keep both sides in sync.
   */
  const handleCtaClick = (e, link) => {
    if (link && link.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="products" className="py-12 md:py-20" style={{ background: 'var(--surface-0, #08080D)' }}>
      <Container>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-8 text-center md:mb-12">
            <h2 className="text-display-lg font-light mb-4 md:mb-6">
              Protocol layers &amp; products
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-copy mx-auto px-4">
              AeroNyx separates the open privacy protocol from the products built on
              top: privacy access, encrypted relay, Memory Chain, and agent-native services.
            </p>
          </div>

          {/* Product selector — tab semantics (v3.0) */}
          <div
            role="tablist"
            aria-label="AeroNyx products"
            className="-mx-4 mb-8 flex flex-nowrap gap-3 overflow-x-auto px-4 scrollbar-hide md:mx-0 md:mb-12 md:justify-center md:gap-4 md:px-0"
          >
            {products.map((product) => {
              const active = selectedProduct === product.id;
              return (
                <button
                  key={product.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`product-panel-${product.id}`}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`relative min-h-[52px] min-w-fit flex-shrink-0 rounded border px-4 py-2 text-left transition-colors duration-fast md:px-6 md:py-3 ${
                    active
                      ? 'border-brand-line bg-brand-faint text-white'
                      : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {active && (
                    <span aria-hidden="true" className="absolute left-0 top-0 h-full w-0.5 bg-brand-light" />
                  )}
                  <div className="text-xs md:text-sm font-medium whitespace-nowrap">{product.name}</div>
                  <div className="text-xs opacity-60 mt-1">{product.category}</div>
                </button>
              );
            })}
          </div>

          {/* Product details — direct lookup (v3.0) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              id={`product-panel-${activeProduct.id}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="grid items-start gap-8 md:grid-cols-2 md:gap-12"
            >
              {/* Visual */}
              <div className="order-2 md:order-1 hidden md:block">
                <ProductVisual productId={activeProduct.id} />
              </div>

              {/* Content */}
              <div className="order-1 md:order-2">
                <div className="mb-3 flex flex-wrap items-center gap-3 md:gap-4">
                  <h3 className="text-display-md font-light">{activeProduct.name}</h3>
                  {getStatusBadge(activeProduct.status)}
                </div>

                <p className="text-base md:text-lg text-white/40 mb-6">
                  {activeProduct.tagline}
                </p>

                {/* USE CASE */}
                <div className="page-card mb-6 rounded border border-l-2 border-l-brand/40 p-4 md:p-5">
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-1">Pain Point</div>
                      <p className="text-sm text-white/70">{activeProduct.useCase.pain}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-1">Solution</div>
                      <p className="text-sm text-white/70">{activeProduct.useCase.solution}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-eyebrow text-brand-light mb-1">Protocol Value</div>
                      <p className="text-sm text-brand-light font-medium">{activeProduct.useCase.savings}</p>
                    </div>
                  </div>
                </div>

                {/* Architecture Comparison */}
                <div className="page-card mb-6 rounded border p-4 md:mb-8 md:p-5">
                  <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-3">Architecture Comparison</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-white/60 flex-shrink-0">Traditional</span>
                      <span className="text-white/80 text-right">{activeProduct.comparison.traditional}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-white/60 flex-shrink-0">AeroNyx</span>
                      <span className="text-brand-light font-medium text-right">{activeProduct.comparison.aeronyx}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <div className="text-center text-brand-light font-medium">
                        {activeProduct.comparison.savings}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-2">Key Features</div>
                  {activeProduct.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="w-1 h-1 rounded-pill bg-brand-light/60 mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0" />
                      <span className="text-sm md:text-base text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {activeProduct.cta && (
                  activeProduct.cta.link.startsWith('/') ? (
                    <Link
                      href={activeProduct.cta.link}
                      className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/20 px-6 py-2.5 text-center hover:border-brand-line hover:bg-brand-faint transition-colors duration-fast md:px-8 md:py-3"
                    >
                      <span className="text-xs md:text-sm uppercase tracking-eyebrow">
                        {activeProduct.cta.text}
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={activeProduct.cta.link}
                      onClick={(e) => handleCtaClick(e, activeProduct.cta.link)}
                      target={activeProduct.cta.link.startsWith('http') ? '_blank' : undefined}
                      rel={activeProduct.cta.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/20 px-6 py-2.5 text-center hover:border-brand-line hover:bg-brand-faint transition-colors duration-fast md:px-8 md:py-3"
                    >
                      <span className="text-xs md:text-sm uppercase tracking-eyebrow">
                        {activeProduct.cta.text}
                      </span>
                    </a>
                  )
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom value proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="page-surface mt-10 rounded border p-6 text-center md:mt-14 md:p-8"
          >
            <h3 className="text-display-md font-light mb-3">
              Why this belongs at the protocol layer
            </h3>
            <p className="text-sm md:text-base text-white/60 max-w-copy mx-auto">
              Privacy access, encrypted messaging, private memory, and agent-to-agent services all
              need the same invariant: infrastructure can route, meter, and coordinate work without
              reading user content or turning public health data into user surveillance.
            </p>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

// ============================================
// Product Visual Components
// ============================================

const ProductVisual = ({ productId }) => {
  const visuals = {
    foundation: <FoundationVisual />,
    vpn: <VPNVisual />,
    compute: <ComputeVisual />,
    cdn: <CDNVisual />,
    memchain: <MemChainProductVisual />,
  };

  return (
    <div
      className="page-card flex aspect-square items-center justify-center rounded border p-8"
      style={{ background: 'var(--surface-1, #0C0C13)' }}
    >
      {visuals[productId] || <div className="text-white/20">Visual</div>}
    </div>
  );
};

const FoundationVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg className="w-48 h-48 md:w-64 md:h-64" viewBox="0 0 192 192">
      {Array.from({ length: 6 }).map((_, i) => {
        const angle1 = (i / 6) * Math.PI * 2;
        const angle2 = ((i + 1) / 6) * Math.PI * 2;
        const x1 = 96 + Math.cos(angle1) * 60;
        const y1 = 96 + Math.sin(angle1) * 60;
        const x2 = 96 + Math.cos(angle2) * 60;
        const y2 = 96 + Math.sin(angle2) * 60;

        return (
          <g key={i}>
            <circle cx={x1} cy={y1} r="4" fill="rgba(119, 98, 243, 0.6)" />
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(119, 98, 243, 0.3)" strokeWidth="1" />
            <line x1={x1} y1={y1} x2="96" y2="96" stroke="rgba(119, 98, 243, 0.2)" strokeWidth="1" />
          </g>
        );
      })}
      <circle cx="96" cy="96" r="6" fill="rgba(119, 98, 243, 0.8)" />
    </svg>
  </div>
);

const VPNVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-4 rounded-pill border-2 border-white/20 flex items-center justify-center">
        <div className="w-16 h-16 rounded-pill bg-gradient-to-br from-brand/40 to-brand/20 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            <path d="M12 8v8" />
            <path d="M12 8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
        </div>
      </div>
      <div className="text-sm text-white/60">Blind · Private · Verifiable</div>
    </div>
  </div>
);

const ComputeVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-10 h-10 md:w-12 md:h-12 border border-white/20 rounded-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.08, ease: EASE }}
        >
          <div className="text-xs text-white/40 font-mono">402</div>
        </motion.div>
      ))}
    </div>
  </div>
);

const CDNVisual = () => {
  const reduced = useReducedMotion();

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="relative w-32 h-32 mx-auto"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={reduced ? undefined : { duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 border-2 border-white/20 rounded-pill" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = 50 + Math.cos(angle) * 40;
            const y = 50 + Math.sin(angle) * 40;

            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-brand-light rounded-pill"
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            );
          })}
        </motion.div>
        <div className="mt-4 text-xs text-white/40">Encrypted Relay</div>
      </div>
    </div>
  );
};

const MemChainProductVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="space-y-3 w-full max-w-xs">
      {[3, 2, 1].map((height) => (
        <motion.div
          key={height}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (3 - height) * 0.15, ease: EASE }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-sm bg-brand-faint border border-brand-line flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-mono text-brand-light">#{height}</span>
          </div>
          <div className="flex-1 h-px bg-brand/20" />
          <div className="text-xs text-white/40">{height * 5 + 3} facts</div>
        </motion.div>
      ))}

      {/* Pending block — dashed outline, no emoji (v3.0) */}
      <div className="flex items-center gap-3 opacity-60">
        <div className="w-10 h-10 rounded-sm border border-dashed border-white/20 flex items-center justify-center flex-shrink-0">
          <span className="block w-2 h-2 rounded-pill bg-white/25 animate-pulse" />
        </div>
        <div className="flex-1 h-px bg-white/10" />
        <div className="text-xs text-white/30 font-mono">pending</div>
      </div>

      <div className="text-center pt-4 text-xs text-white/40">
        Private Memory Chain
      </div>
    </div>
  </div>
);

export default ProductsEcosystem;
