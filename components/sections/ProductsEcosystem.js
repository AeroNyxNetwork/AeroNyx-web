/**
 * ============================================
 * File: components/sections/ProductsEcosystem.js
 * ============================================
 * Modification Reason: v4.8 - Localized product visual microcopy.
 *   Product illustration captions now read `productsEcosystem.visualCopy`
 *   instead of hardcoded English labels, keeping the homepage product index
 *   visually coherent across all supported languages.
 *
 * Modification Reason: v4.9 - Mobile product tab wrapping.
 *   Product selector tabs now allow localized product names and categories to
 *   wrap instead of truncating. This preserves the horizontal snap interaction
 *   while making Russian, Spanish, Japanese, Korean, and CJK labels feel
 *   intentional rather than clipped on iPhone-class screens.
 *
 * Modification Reason: v5.0 - Homepage ecosystem evidence polish.
 *   North Star, core product entrances, active product details, and the bottom
 *   invariant now use the same evidence-surface rhythm as the refreshed
 *   Privacy Network and MemChain pages. Product routes, localized copy, tab
 *   behavior, and Downloads/Docs links are unchanged.
 *
 * Modification Reason: v5.1 - Service relay CTA link hygiene.
 *   Replaced the obsolete app waitlist destination with the maintained
 *   developer documentation path so the homepage never routes users to a 404
 *   while the encrypted service relay remains a coming-soon protocol surface.
 *
 * Modification Reason: v5.2 - Maintained protocol docs routes.
 *   Developer-documentation URLs were retired in the docs site. Relay and
 *   foundation product CTAs now resolve to the maintained node discovery and
 *   relay foundation page, and the foundation label no longer promises SDK
 *   docs that are not currently published.
 *
 * Modification Reason: v4.6 - North Star anchor entry.
 *   Added a stable homepage `#north-star-plan` anchor for the promoted North
 *   Star Plan covenant so the hero can link directly into the infrastructure
 *   promise. This keeps the concept discoverable from the first viewport and
 *   shareable as a URL fragment.
 *
 * Modification Reason: v4.7 - Homepage ecosystem i18n shell.
 *   Moved the ecosystem header, North Star covenant, core-card labels, tab
 *   status labels, use-case labels, comparison labels, and bottom invariant
 *   into lib/i18n. Privacy Network and MemChain now accept localized product
 *   overrides so the homepage's two primary product paths stay coherent when
 *   users switch language.
 *
 * Historical Notes:
 * v4.5 - North Star Plan visibility.
 *   Promoted the North Star Plan / 北極星計劃 into a visible homepage covenant
 *   band before the core product cards. This makes the privacy infrastructure
 *   promise legible on the first page instead of hiding it in a later
 *   Privacy Network detail section, while keeping the component focused on
 *   load-bearing protocol/product surfaces.
 *
 * Historical Notes:
 * v4.4 - Core product entrance polish.
 *   Added a dedicated two-card "core systems" entrance for Privacy Network
 *   and MemChain before the product tab index. This makes the homepage read
 *   as two load-bearing products on one blind protocol instead of a flat list
 *   of capabilities, while preserving the existing tabbed architecture index.
 *
 * Historical Notes:
 * v4.3 - Decentralized node product naming.
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
 * Last Modified: v4.4 - Core product entrance polish
 * Last Modified: v4.5 - North Star Plan visibility
 * Last Modified: v4.6 - North Star anchor entry
 * Last Modified: v4.7 - Homepage ecosystem i18n shell
 * Last Modified: v4.8 - Localized product visual microcopy
 * Last Modified: v4.9 - Mobile product tab wrapping
 * Last Modified: v5.0 - Homepage ecosystem evidence polish
 * ============================================
 */

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container';
import { DEFAULT_LOCALE, getMessages } from '../../lib/i18n';

const EASE = [0.16, 1, 0.3, 1];

/* Single source of truth for status presentation (brand: no green). */
const STATUS_BADGES = {
  live: { label: 'Live', className: 'text-ok border-brand-line bg-brand-faint' },
  beta: { label: 'Beta', className: 'text-warn border-warn/25 bg-warn/[0.06]' },
  'coming-soon': { label: 'Coming Soon', className: 'text-white/40 border-white/10 bg-white/[0.03]' },
};

const CORE_PRODUCT_IDS = new Set(['vpn', 'memchain']);

const NORTH_STAR_SIGNALS = [
  {
    label: '01',
    title: 'More private',
    detail: 'Nodes route ciphertext and signed state without turning public health into user surveillance.',
  },
  {
    label: '02',
    title: 'Open source',
    detail: 'The decentralized node foundation is built to be inspected, operated, and improved in public.',
  },
  {
    label: '03',
    title: 'Global by default',
    detail: 'Independent nodes can join the privacy fabric and harden the protocol across regions.',
  },
];

const ProductsEcosystem = () => {
  const [selectedProduct, setSelectedProduct] = useState('vpn');
  const tabRefs = useRef({});
  const { locale } = useRouter();
  const messages = getMessages(locale || DEFAULT_LOCALE);
  const copy = messages.productsEcosystem || getMessages(DEFAULT_LOCALE).productsEcosystem;
  const northStarSignals = copy.northStar?.signals || NORTH_STAR_SIGNALS;

  const baseProducts = [
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
      proof: 'Encrypted traffic in motion',
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
      proof: 'Encrypted memory at rest',
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
      cta: { text: 'Read Protocol Docs', link: 'https://docs.aeronyx.network/network/node-discovery-and-relay-foundation' },
      proof: 'Encrypted delivery for services',
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
      cta: { text: 'Read Node Docs', link: 'https://docs.aeronyx.network/network/node-discovery-and-relay-foundation' },
      proof: 'Signed node state and public aggregates',
    },
  ];

  const products = baseProducts.map((product) => {
    const override = copy.products?.[product.id] || {};
    return {
      ...product,
      ...override,
      useCase: {
        ...product.useCase,
        ...(override.useCase || {}),
      },
      comparison: {
        ...product.comparison,
        ...(override.comparison || {}),
      },
      cta: {
        ...product.cta,
        ...(override.cta || {}),
      },
    };
  });

  const activeProduct = products.find((p) => p.id === selectedProduct) || products[0];
  const coreProducts = products.filter((product) => CORE_PRODUCT_IDS.has(product.id));

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
      <span className={`inline-flex max-w-full break-words rounded-sm border px-2 py-0.5 text-[10px] uppercase leading-4 tracking-eyebrow ${badge.className}`}>
        {copy.statusLabels?.[status] || badge.label}
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
              {copy.eyebrow}
            </div>
            <h2 className="text-display-lg font-light mb-4 md:mb-6">
              {copy.title}
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-copy mx-auto px-4">
              {copy.description}
            </p>
          </div>

          <div id="north-star-plan" className="relative mb-8 scroll-mt-24 overflow-hidden border-y border-white/10 bg-white/[0.014] px-4 py-5 text-left md:mb-10 md:px-5 md:py-6">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/45 to-transparent" />
            <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div className="min-w-0">
                <div className="break-words text-[10px] uppercase leading-4 tracking-eyebrow text-brand-light">
                  {copy.northStar?.eyebrow}
                </div>
                <h3 className="mt-3 break-words text-2xl font-light leading-tight text-white md:text-display-md">
                  {copy.northStar?.title}
                </h3>
                <p className="mt-3 max-w-2xl break-words text-sm leading-relaxed text-white/58 md:text-base">
                  {copy.northStar?.description}
                </p>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {northStarSignals.map((item) => (
                  <div key={item.title} className="relative min-w-0 overflow-hidden border border-white/10 bg-black/20 p-3 md:p-4">
                    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-brand-light/35 to-transparent" />
                    <div className="font-mono text-xs text-brand-light">{item.label}</div>
                    <div className="mt-3 break-words text-sm font-medium leading-snug text-white">{item.title}</div>
                    <p className="mt-2 break-words text-xs leading-relaxed text-white/52 md:text-sm">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-3 md:mb-10 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-4">
            {coreProducts.map((product, index) => (
              <Link
                key={product.id}
                href={product.cta.link}
                className={`group page-surface relative min-w-0 overflow-hidden rounded border p-5 transition-colors duration-base hover:border-brand-line md:p-6 ${
                  index === 0 ? 'order-1 md:order-none' : 'order-3 md:order-none md:col-start-3 md:row-start-1'
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/35 to-transparent opacity-70" />
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="break-words text-[10px] uppercase leading-4 tracking-eyebrow text-brand-light">
                      {(copy.coreSystemLabel || 'Core System 0{index}').replace('{index}', index + 1)}
                    </div>
                    <h3 className="mt-3 break-words text-display-md font-light text-white">
                      {product.name}
                    </h3>
                  </div>
                  <span className="max-w-[9.5rem] shrink-0 break-words border border-white/10 bg-white/[0.025] px-2.5 py-1 text-right text-[10px] uppercase leading-4 tracking-eyebrow text-white/42 transition-colors duration-fast group-hover:border-brand-line group-hover:text-brand-light">
                    {product.category}
                  </span>
                </div>
                <p className="mt-4 max-w-xl break-words text-sm leading-relaxed text-white/60 md:text-base">
                  {product.tagline}
                </p>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  <div className="min-w-0 border border-white/10 bg-black/20 p-3">
                    <div className="break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/34">{copy.protectsLabel}</div>
                    <div className="mt-2 break-words text-sm leading-relaxed text-white/72">
                      {product.proof}
                    </div>
                  </div>
                  <div className="min-w-0 border border-white/10 bg-black/20 p-3">
                    <div className="break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/34">{copy.invariantLabel}</div>
                    <div className="mt-2 break-words text-sm leading-relaxed text-brand-light/86">
                      {copy.invariantValue}
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            <div className="order-2 flex min-h-[4.75rem] items-center justify-center rounded border border-white/10 bg-white/[0.018] px-4 py-4 md:order-none md:col-start-2 md:row-start-1 md:min-h-full md:w-28 md:flex-col">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-light/28 to-transparent md:h-auto md:w-px md:bg-gradient-to-b" />
              <div className="mx-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-brand-light/80 md:mx-0 md:my-3 md:[writing-mode:vertical-rl]">
                {copy.spineLabel}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-light/28 to-transparent md:h-auto md:w-px md:bg-gradient-to-b" />
            </div>
          </div>

          {/* Product selector — tab semantics (v3.0) */}
          <div
            role="tablist"
            aria-label={copy.tabAriaLabel}
            className="mb-8 flex snap-x snap-mandatory flex-nowrap gap-3 overflow-x-auto pb-1 scrollbar-hide md:mb-12 md:justify-center md:gap-4"
          >
            {products.map((product) => {
              const active = selectedProduct === product.id;
              const isCoreProduct = CORE_PRODUCT_IDS.has(product.id);
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
                  className={`relative min-h-[72px] w-[15rem] flex-shrink-0 snap-start rounded border px-4 py-3 text-left transition-colors duration-fast md:min-h-[64px] md:w-auto md:min-w-[12rem] md:px-5 md:py-3 ${
                    active
                      ? 'border-brand-line bg-brand-faint text-white'
                      : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {active && (
                    <span aria-hidden="true" className="absolute left-0 top-0 h-full w-0.5 bg-brand-light" />
                  )}
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <div className="min-w-0 break-words text-xs font-medium leading-snug md:text-sm">{product.name}</div>
                    {isCoreProduct && (
                      <span className="shrink-0 rounded-sm border border-brand-line bg-brand-faint px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em] text-brand-light">
                        {copy.coreBadge}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 break-words text-xs leading-snug opacity-60">{product.category}</div>
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
                <ProductVisual productId={activeProduct.id} visualCopy={copy.visualCopy} />
              </div>

              {/* Content */}
              <div className="order-1 min-w-0 md:order-2">
                <div className="mb-3 flex flex-wrap items-center gap-3 md:gap-4">
                  <h3 className="break-words text-display-md font-light">{activeProduct.name}</h3>
                  {getStatusBadge(activeProduct.status)}
                </div>

                <p className="mb-5 break-words text-base leading-relaxed text-white/48 md:mb-6 md:text-lg">
                  {activeProduct.tagline}
                </p>

                {/* USE CASE */}
                <div className="page-card relative mb-5 min-w-0 overflow-hidden rounded border p-4 md:mb-6 md:p-5">
                  <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-brand-light/45 to-transparent" />
                  <div className="grid gap-3.5">
                    <div className="min-w-0">
                      <div className="mb-1 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/40">{copy.labels.pain}</div>
                      <p className="break-words text-sm leading-relaxed text-white/70">{activeProduct.useCase.pain}</p>
                    </div>
                    <div className="min-w-0">
                      <div className="mb-1 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/40">{copy.labels.solution}</div>
                      <p className="break-words text-sm leading-relaxed text-white/70">{activeProduct.useCase.solution}</p>
                    </div>
                    <div className="min-w-0 border border-brand-line bg-brand-faint px-3 py-2.5">
                      <div className="mb-1 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-brand-light">{copy.labels.protocolValue}</div>
                      <p className="break-words text-sm font-medium leading-relaxed text-brand-light">{activeProduct.useCase.savings}</p>
                    </div>
                  </div>
                </div>

                {/* Architecture Comparison */}
                <div className="page-card mb-6 min-w-0 rounded border p-4 md:mb-8 md:p-5">
                  <div className="mb-3 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/40">{copy.labels.architectureComparison}</div>
                  <div className="space-y-2">
                    <div className="grid gap-1 border border-white/10 bg-black/20 px-3 py-2 text-sm sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-4">
                      <span className="shrink-0 break-words text-white/60">{copy.labels.traditional}</span>
                      <span className="break-words text-white/80 sm:text-right">{activeProduct.comparison.traditional}</span>
                    </div>
                    <div className="grid gap-1 border border-brand-line bg-brand-faint px-3 py-2 text-sm sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-4">
                      <span className="shrink-0 text-white/60">AeroNyx</span>
                      <span className="break-words font-medium text-brand-light sm:text-right">{activeProduct.comparison.aeronyx}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2">
                      <div className="break-words text-center font-medium leading-relaxed text-brand-light">
                        {activeProduct.comparison.savings}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6 space-y-2 md:mb-8 md:space-y-3">
                  <div className="mb-2 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/40">{copy.labels.keyFeatures}</div>
                  {activeProduct.features.map((feature, i) => (
                    <div key={feature} className="flex min-w-0 items-start border border-white/10 bg-white/[0.02] px-3 py-2">
                      <div className="mr-2 mt-1.5 h-1 w-1 flex-shrink-0 rounded-pill bg-brand-light/60 md:mr-3 md:mt-2" />
                      <span className="min-w-0 break-words text-sm text-white/60 md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {activeProduct.cta && (
                  activeProduct.cta.link.startsWith('/') ? (
                    <Link
                      href={activeProduct.cta.link}
                      className="inline-flex min-h-[44px] w-full max-w-xs min-w-0 items-center justify-center break-words rounded border border-white/20 px-6 py-2.5 text-center transition-colors duration-fast hover:border-brand-line hover:bg-brand-faint sm:w-auto md:px-8 md:py-3"
                    >
                      <span className="text-xs uppercase leading-snug tracking-eyebrow md:text-sm">
                        {activeProduct.cta.text}
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={activeProduct.cta.link}
                      onClick={(e) => handleCtaClick(e, activeProduct.cta.link)}
                      target={activeProduct.cta.link.startsWith('http') ? '_blank' : undefined}
                      rel={activeProduct.cta.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-[44px] w-full max-w-xs min-w-0 items-center justify-center break-words rounded border border-white/20 px-6 py-2.5 text-center transition-colors duration-fast hover:border-brand-line hover:bg-brand-faint sm:w-auto md:px-8 md:py-3"
                    >
                      <span className="text-xs uppercase leading-snug tracking-eyebrow md:text-sm">
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
            className="page-surface relative mt-10 overflow-hidden rounded border p-6 text-center md:mt-14 md:p-8"
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/45 to-transparent" />
            <div className="mx-auto mb-5 h-2 w-2 rounded-pill bg-brand-light/70 shadow-[0_0_18px_rgba(151,136,247,0.5)]" />
            <h3 className="mb-3 break-words text-display-md font-light">
              {copy.bottomTitle}
            </h3>
            <p className="mx-auto max-w-copy break-words text-sm leading-relaxed text-white/60 md:text-base">
              {copy.bottomDescription}
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

const ProductVisual = ({ productId, visualCopy = {} }) => {
  const visuals = {
    foundation: <FoundationVisual />,
    vpn: <PrivacyAccessVisual copy={visualCopy.privacyNetwork} />,
    cdn: <CDNVisual copy={visualCopy.encryptedRelay} />,
    memchain: <MemChainProductVisual copy={visualCopy.memchain} />,
  };

  return (
    <div
      className="page-card flex aspect-square items-center justify-center rounded border p-8"
      style={{ background: 'var(--surface-1, #0C0C13)' }}
    >
      {visuals[productId] || <div className="text-white/20">{visualCopy.defaultLabel || 'Visual'}</div>}
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

const PrivacyAccessVisual = ({ copy = {} }) => (
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
      <div className="text-sm text-white/60">{copy.caption || 'Blind · Private · Verifiable'}</div>
    </div>
  </div>
);

const CDNVisual = ({ copy = {} }) => {
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
        <div className="mt-4 text-xs text-white/40">{copy.caption || 'Encrypted Relay'}</div>
      </div>
    </div>
  );
};

const MemChainProductVisual = ({ copy = {} }) => (
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
          <div className="text-xs text-white/40">{String(copy.factCount || '{count} facts').replace('{count}', height * 5 + 3)}</div>
        </motion.div>
      ))}

      {/* Pending block — dashed outline, no emoji (v3.0) */}
      <div className="flex items-center gap-3 opacity-60">
        <div className="w-10 h-10 rounded-sm border border-dashed border-white/20 flex items-center justify-center flex-shrink-0">
          <span className="block w-2 h-2 rounded-pill bg-white/25 animate-pulse" />
        </div>
        <div className="flex-1 h-px bg-white/10" />
        <div className="text-xs text-white/30 font-mono">{copy.pending || 'pending'}</div>
      </div>

      <div className="text-center pt-4 text-xs text-white/40">
        {copy.caption || 'Encrypted Memory Flow'}
      </div>
    </div>
  </div>
);

export default ProductsEcosystem;
