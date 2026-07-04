/**
 * ============================================
 * File: components/sections/ProductsEcosystem.js
 * ============================================
 * Modification Reason: v4.3 - Decentralized node product naming.
 *   Product ecosystem copy now describes open decentralized nodes and the
 *   Decentralized Node Layer instead of presenting implementation language as
 *   the user-facing product category.
 *
 * Historical Notes:
 * v4.2 - MemChain terminology and visual cleanup.
 *   Removed legacy ledger/reward wording from the MemChain tab so the homepage
 *   presents MemChain as node-blind, local-first encrypted memory. The visual
 *   now labels it as an encrypted memory flow.
 *
 * Historical Notes:
 * v4.1 - North Star privacy infrastructure wording.
 *   Tightened the Privacy Network and Protocol Foundation tabs around the
 *   North Star Plan: more private, open source, globally usable networking
 *   built on auditable decentralized node infrastructure.
 *
 * Historical Notes:
 * v4.0 - Privacy Network naming and selector polish.
 *   Renamed the user-facing first product to Privacy Network so the homepage
 *   reads as a protocol/product system rather than a
 *   download funnel. Mobile selector tabs now keep stable widths and truncate
 *   secondary labels cleanly.
 *
 * Historical Notes:
 * v3.9 - Homepage focus pass.
 *   Removed the standalone payment-services tab from the homepage product
 *   index. Downstream service monetization remains a protocol direction, but
 *   the first-page product story now stays centered on private connection,
 *   private memory, encrypted relay, and protocol foundation.
 *
 * Historical Notes:
 * v3.4 — Product hierarchy order correction.
 *   Privacy Network and MemChain are intentionally ordered first so the
 *   homepage presents AeroNyx's live privacy and private memory layers before
 *   downstream protocol services.
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
 *   - Four-product ecosystem selector (Privacy Network, MemChain, Encrypted
 *     Service Relay, Protocol Foundation)
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
 *   - Keep this as a capability index, not a roadmap dump. Homepage tabs
 *     should only represent load-bearing protocol/product surfaces.
 *   - Brand rule: no green, no emojis. Status colors come from the
 *     STATUS_BADGES map only.
 *
 * Last Modified: v3.3 — Homepage product index spacing and interaction polish
 * Last Modified: v3.4 — Privacy Network and MemChain ordered before downstream services
 * Last Modified: v3.5 — Mobile snap selector and detail card rhythm polish
 * Last Modified: v3.8 - Reframed after CorePrimitives section
 * Last Modified: v3.9 - Removed standalone payment rails tab from homepage
 * Last Modified: v4.0 - Privacy Network naming and selector polish
 * Last Modified: v4.1 - North Star privacy infrastructure wording
 * Last Modified: v4.2 - MemChain terminology and visual cleanup
 * Last Modified: v4.3 - Decentralized node product naming
 * ============================================
 */

import React, { useRef, useState } from 'react';
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
  const tabRefs = useRef({});

  const products = [
    {
      id: 'vpn',
      name: 'Privacy Network',
      category: 'Private Routing Layer',
      tagline: 'More private, open source, globally usable',
      useCase: {
        pain: 'Centralized privacy apps ask users to trust one company with routing metadata and operational visibility',
        solution: 'AeroNyx routes through open decentralized nodes where public health is aggregate-only and user payloads remain encrypted',
        savings: 'Use privacy as a global protocol primitive, not another closed subscription silo.',
      },
      features: [
        'Open decentralized node infrastructure',
        'Blind relay fabric for encrypted routing',
        'Public aggregate network health without user-level telemetry',
        'Privacy access for humans, apps, and autonomous agents',
      ],
      comparison: {
        traditional: 'Centralized privacy app: trust the provider',
        aeronyx: 'AeroNyx: inspect the protocol boundary',
        savings: 'A more private network for global use',
      },
      status: 'live',
      cta: { text: 'Explore Privacy Network', link: '/privacy-network' },
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
        'Node-blind encrypted memory records',
        'Local-first recall path for fast private context',
        'Cross-device sync through encrypted protocol channels',
        'Bring-your-own-brain model choice',
      ],
      comparison: {
        traditional: 'Vendor memory: locked to one platform',
        aeronyx: 'MemChain: memory belongs to the user',
        savings: 'Private context without readable server memory',
      },
      status: 'beta',
      cta: { text: 'Explore MemChain', link: '/memchain' },
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
      name: 'Protocol Foundation',
      category: 'Decentralized Node Layer',
      tagline: 'Auditable decentralized nodes, signed peer state, public health',
      useCase: {
        pain: 'Privacy products fail when every feature depends on a centralized service that can observe or be forced to disclose user behavior',
        solution: 'AeroNyx separates protocol state, node operations, public aggregates, and user-encrypted payloads so the node layer can be audited worldwide',
        savings: 'Build on an auditable privacy boundary instead of retrofitting one later.',
      },
      features: [
        'Decentralized node peer discovery and persistent peer store',
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

  const focusProductTab = (productId) => {
    if (typeof window === 'undefined') return;
    window.requestAnimationFrame(() => {
      tabRefs.current[productId]?.focus();
    });
  };

  const selectProductByIndex = (index, shouldFocus = false) => {
    const product = products[index];
    if (!product) return;
    setSelectedProduct(product.id);
    if (shouldFocus) {
      focusProductTab(product.id);
    }
  };

  const selectAdjacentProduct = (productId, direction) => {
    const currentIndex = products.findIndex((product) => product.id === productId);
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + direction + products.length) % products.length;
    selectProductByIndex(nextIndex, true);
  };

  const handleProductTabKeyDown = (event, productId) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      selectAdjacentProduct(productId, 1);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectAdjacentProduct(productId, -1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      selectProductByIndex(0, true);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      selectProductByIndex(products.length - 1, true);
    }
  };

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
    <section id="products" className="scroll-mt-20 py-12 md:scroll-mt-24 md:py-20" style={{ background: 'var(--surface-0, #08080D)' }}>
      <Container>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-8 text-center md:mb-12">
            <div className="mb-3 text-[10px] uppercase tracking-eyebrow text-brand-light md:mb-4">
              Built On The Two Primitives
            </div>
            <h2 className="text-display-lg font-light mb-4 md:mb-6">
              From private connection to agent services.
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-copy mx-auto px-4">
              Privacy Network and MemChain form the foundation. The layers below
              turn private routing and private context into encrypted relay,
              protocol services, and agent-native coordination.
            </p>
          </div>

          {/* Product selector — tab semantics (v3.0) */}
          <div
            role="tablist"
            aria-label="AeroNyx products"
            className="mb-8 flex snap-x snap-mandatory flex-nowrap gap-3 overflow-x-auto pb-1 scrollbar-hide md:mb-12 md:justify-center md:gap-4"
          >
            {products.map((product) => {
              const active = selectedProduct === product.id;
              return (
                <button
                  key={product.id}
                  ref={(node) => {
                    if (node) tabRefs.current[product.id] = node;
                  }}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`product-panel-${product.id}`}
                  tabIndex={active ? 0 : -1}
                  onKeyDown={(event) => handleProductTabKeyDown(event, product.id)}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`relative min-h-[58px] w-[14rem] flex-shrink-0 snap-start rounded border px-4 py-2.5 text-left transition-colors duration-fast md:w-auto md:min-w-[12rem] md:px-6 md:py-3 ${
                    active
                      ? 'border-brand-line bg-brand-faint text-white'
                      : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {active && (
                    <span aria-hidden="true" className="absolute left-0 top-0 h-full w-0.5 bg-brand-light" />
                  )}
                  <div className="truncate text-xs font-medium md:text-sm">{product.name}</div>
                  <div className="mt-1 truncate text-xs opacity-60">{product.category}</div>
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

                <p className="mb-5 text-base text-white/48 md:mb-6 md:text-lg">
                  {activeProduct.tagline}
                </p>

                {/* USE CASE */}
                <div className="page-card mb-5 rounded border border-l-2 border-l-brand/40 p-4 md:mb-6 md:p-5">
                  <div className="space-y-3.5">
                    <div>
                      <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-1">Pain Point</div>
                      <p className="text-sm leading-relaxed text-white/70">{activeProduct.useCase.pain}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-1">Solution</div>
                      <p className="text-sm leading-relaxed text-white/70">{activeProduct.useCase.solution}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-eyebrow text-brand-light mb-1">Protocol Value</div>
                      <p className="text-sm font-medium leading-relaxed text-brand-light">{activeProduct.useCase.savings}</p>
                    </div>
                  </div>
                </div>

                {/* Architecture Comparison */}
                <div className="page-card mb-6 rounded border p-4 md:mb-8 md:p-5">
                  <div className="text-[10px] uppercase tracking-eyebrow text-white/40 mb-3">Architecture Comparison</div>
                  <div className="space-y-2">
                    <div className="grid gap-1 text-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
                      <span className="text-white/60 flex-shrink-0">Traditional</span>
                      <span className="text-white/80 sm:text-right">{activeProduct.comparison.traditional}</span>
                    </div>
                    <div className="grid gap-1 text-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
                      <span className="text-white/60 flex-shrink-0">AeroNyx</span>
                      <span className="font-medium text-brand-light sm:text-right">{activeProduct.comparison.aeronyx}</span>
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
                      className="inline-flex min-h-[44px] w-full items-center justify-center rounded border border-white/20 px-6 py-2.5 text-center transition-colors duration-fast hover:border-brand-line hover:bg-brand-faint sm:w-auto md:px-8 md:py-3"
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
                      className="inline-flex min-h-[44px] w-full items-center justify-center rounded border border-white/20 px-6 py-2.5 text-center transition-colors duration-fast hover:border-brand-line hover:bg-brand-faint sm:w-auto md:px-8 md:py-3"
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
    vpn: <PrivacyAccessVisual />,
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

const PrivacyAccessVisual = () => (
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
        Encrypted Memory Flow
      </div>
    </div>
  </div>
);

export default ProductsEcosystem;
