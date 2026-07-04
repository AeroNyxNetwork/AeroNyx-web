/**
 * ============================================
 * File Creation/Modification Notes
 * ============================================
 * Creation Reason: Create a dedicated MemChain landing page so the homepage
 * can return to protocol-layer storytelling while Memory Chain gets a
 * citation-ready SEO/GEO surface of its own.
 * Modification Reason: v2.3 - Mobile hero proof rail stabilization.
 *   Hero proof cards now render as a stable mobile grid instead of a
 *   horizontal snap rail, preventing half-visible proof cards on iPhone-class
 *   screens while keeping the desktop three-column evidence layout.
 *
 * Modification Reason: v2.4 - Advantage lab mobile metric wrapping.
 *   The segmented axis selector now gives metric labels more width on
 *   phone/tablet layouts and slightly reduces tracking before the desktop
 *   grid takes over. This prevents long localized latency/privacy metrics from
 *   looking clipped or overly fragmented in Spanish, Russian, Japanese, and
 *   Korean.
 *
 * Modification Reason: v2.2 - Multilingual mobile resilience.
 *   Tightened long-locale wrapping for MemChain proof rails, comparison cards,
 *   mode cards, and the animated memory visual so Japanese, Korean, Russian,
 *   Spanish, Simplified Chinese, and Traditional Chinese can render without
 *   clipped metric labels or cramped card text on phone-class viewports.
 *
 * Historical Notes:
 * v2.1 - Secondary page internationalization.
 *   Moved the visible MemChain narrative, proof rails, memory visual labels,
 *   comparison lab, pipeline, pillars, benchmarks, comparison, FAQ, privacy
 *   boundary, and closing action copy into lib/i18n.js so every supported
 *   locale renders the full product page instead of falling back to English.
 *   Long localized headings now use safer wrapping while preserving the
 *   existing Apple-style hero typography and touch target rhythm.
 *
 * Historical Notes:
 * v2.0 - Secondary page action alignment.
 *   Aligned the MemChain hero and closing action buttons with the homepage
 *   product-action system: 48px touch targets, brand-primary emphasis,
 *   restrained tracking, visible focus states, and predictable mobile widths.
 *   This keeps MemChain visually connected to the protocol homepage while
 *   preserving the approved node-blind claims, routes, and privacy boundary.
 *
 * Historical Notes:
 * v1.9 - Homepage typography alignment.
 *   Aligned the MemChain hero with the homepage NarrativeHero typography by
 *   using the shared `.hero-title` contract and matching the lighter subtitle
 *   rhythm. This keeps the secondary product page visually connected to the
 *   protocol homepage without changing claims, routes, or data surfaces.
 *
 * Historical Notes:
 * v1.8 - Mobile product interaction polish.
 *   Tightened the MemChain mobile journey so the hero owns its spacing,
 *   proof cards use a touch-friendly snap rail, the memory animation is
 *   shorter on phone-class screens, and the advantage lab becomes a
 *   mobile segmented selector instead of a dense desktop control stack.
 *   No claims, privacy boundaries, or public routes were changed.
 *
 * Historical Notes:
 * v1.7 - Evidence lab refinement.
 *   Upgraded the interactive advantage lab so every selected axis explains
 *   the user outcome, what the storage node can see, and the public proof
 *   surface. This turns the section from a feature comparison into a
 *   VC-grade trust model without adding new files or weakening the
 *   node-blind privacy boundary.
 *
 * Historical Notes:
 * v1.6 - Protocol continuity bridge.
 *   Added a compact secondary-page bridge that connects MemChain to Privacy
 *   Network under the same blind AeroNyx protocol invariant: private traffic
 *   in motion and private memory at rest. Also removed finance-adjacent
 *   identity wording from the FAQ so the page stays focused on protocol
 *   identity, node-blind storage, and local-first memory. Mobile hero proof
 *   rails and the memory visual now collapse into compact state summaries so
 *   the first product bridge appears sooner on phone-class screens.
 *
 * Historical Notes:
 * v1.5 - Product-grade memory flow animation.
 *   Upgraded the hero visual from a static sealed-fact list into a live
 *   remember/store/recall flow: facts are sealed on device, synced as
 *   ciphertext to a blind node, and recalled back into the local hippocampus.
 *   The animation respects prefers-reduced-motion, avoids horizontal
 *   transforms on mobile, and keeps all privacy claims within the approved
 *   node-blind boundary.
 *
 * Historical Notes:
 * v1.4 - VC-grade product page refinement.
 *   Added a compact hero proof rail, converted the comparison table into
 *   responsive claim cards, and added a closing product action band. These
 *   changes make MemChain easier to understand from a first-principles
 *   product lens while preserving all existing privacy and benchmark limits.
 *   The hero visual now animates vertically to avoid transient horizontal
 *   overflow on iPhone-class screens.
 *
 * Historical Notes:
 * v1.3 - Advantage lab market context polish.
 *   Added an interactive comparison lab that makes MemChain's node-blind,
 *   low-latency, offline, bring-your-own-brain, and zero-retrieval-inference
 *   advantages visible before the detailed pipeline/table sections, with a
 *   concise market-category note for SEO/GEO readers.
 *
 * Historical Notes:
 *   v1.0 - New page for node-blind AI memory positioning.
 * Main Functionality:
 *   - Explains MemChain as a local-first, node-blind AI memory layer.
 *   - Shows the interactive advantage lab, remember/store/recall pipeline,
 *     privacy boundary, benchmark claims, comparison table, and FAQ based on
 *     the approved product material.
 * Dependencies:
 *   - components/layout/SiteHeader and Footer for shared site chrome.
 *   - components/ui/SEO and Container for metadata/layout.
 *   - components/ui/ProtocolBackground for the existing visual system.
 *
 * Main Logical Flow:
 *   1. Render SEO metadata and shared background/header.
 *   2. Present the MemChain hero and claim-safe positioning.
 *   3. Explain pipeline, pillars, benchmarks, comparison, privacy boundary,
 *      FAQ, and product actions without overstating formal privacy proofs or
 *      benchmark leadership.
 *
 * Important Note for Next Developer:
 *   - Do not call MemChain a public chain or a formal proof system.
 *   - Keep the external AI provider limitation visible: if users choose an
 *     external LLM for distillation/answers, relevant plaintext goes to that
 *     provider; AeroNyx storage nodes still cannot read memory contents.
 *   - Any future accuracy claim above the measured 66-68 percent end-to-end
 *     range must be backed by a fresh benchmark before it appears here.
 *
 * Last Modified: v1.1 - Secondary page typography polish
 * Last Modified: v1.2 - Interactive MemChain advantage lab
 * Last Modified: v1.3 - Market-category context and mobile metric polish
 * Last Modified: v1.4 - VC-grade product page refinement
 * Last Modified: v1.5 - Product-grade memory flow animation
 * Last Modified: v1.6 - Protocol continuity bridge
 * Last Modified: v1.7 - Evidence lab refinement
 * Last Modified: v1.8 - Mobile product interaction polish
 * Last Modified: v1.9 - Homepage typography alignment
 * Last Modified: v2.0 - Secondary page action alignment
 * Last Modified: v2.1 - Secondary page internationalization
 * Last Modified: v2.2 - Multilingual mobile resilience
 * Last Modified: v2.3 - Mobile hero proof rail stabilization
 * Last Modified: v2.4 - Advantage lab mobile metric wrapping
 * ============================================
 */

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import Container from '../components/ui/Container';
import SiteHeader from '../components/layout/SiteHeader';
import Footer from '../components/layout/Footer';
import { DEFAULT_LOCALE, getMessages } from '../lib/i18n';

const ProtocolBackground = dynamic(
  () => import('../components/ui/ProtocolBackground'),
  {
    ssr: false,
    suspense: true,
    loading: () => <div className="fixed inset-0" style={{ background: 'var(--surface-0, #08080D)' }} />,
  }
);

const EASE = [0.16, 1, 0.3, 1];

export default function MemChainPage() {
  const { locale } = useRouter();
  const activeLocale = locale || DEFAULT_LOCALE;
  const canonicalPath = activeLocale === DEFAULT_LOCALE ? '/memchain' : `/${activeLocale}/memchain`;
  const copy = getMessages(activeLocale);
  const pageCopy = copy.memchainPage || getMessages(DEFAULT_LOCALE).memchainPage;

  return (
    <>
      <SEO
        title={pageCopy.seo.title}
        description={pageCopy.seo.description}
        canonicalUrl={`https://aeronyx.network${canonicalPath}`}
        keywords={pageCopy.seo.keywords}
      />

      <Suspense fallback={<div className="fixed inset-0" style={{ background: 'var(--surface-0, #08080D)' }} />}>
        <ProtocolBackground />
      </Suspense>

      <SiteHeader />

      <main className="relative z-10 pt-24 md:pt-32">
        <Hero copy={pageCopy.hero} />
        <ProtocolContinuity copy={pageCopy.protocolContinuity} />
        <MemoryAdvantageLab copy={pageCopy.advantageLab} />
        <Pipeline copy={pageCopy.pipeline} />
        <Pillars copy={pageCopy.pillars} />
        <Benchmarks copy={pageCopy.benchmarks} />
        <Comparison copy={pageCopy.comparison} />
        <PrivacyBoundary copy={pageCopy.privacyBoundary} />
        <FAQ copy={pageCopy.faq} />
        <MemChainAction copy={pageCopy.action} />
      </main>

      <Footer />
    </>
  );
}

const Hero = ({ copy }) => (
  <section data-hero-section className="pb-12 md:pb-24">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="min-w-0"
        >
          <div className="inline-flex max-w-full items-center gap-2 border border-brand-line bg-brand-faint px-3 py-1.5 text-[10px] uppercase tracking-eyebrow text-brand-light">
            <span className="break-words">{copy.eyebrow}</span>
          </div>
          <h1 className="hero-title mt-6 max-w-4xl break-words text-white">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/62 sm:text-lg md:text-xl">
            {copy.description}
            <span className="hidden sm:inline">
              {' '}{copy.desktopDescription}
            </span>
          </p>
          <div className="mt-8 flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="/privacy-network"
              className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded border border-brand-line bg-brand px-7 py-3.5 text-center text-sm font-semibold tracking-wide text-white shadow-[0_18px_50px_rgba(119,98,243,0.22)] transition duration-fast hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-light sm:w-auto"
            >
              {copy.primaryCta}
            </Link>
            <a
              href="#privacy-boundary"
              className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded border border-white/15 px-7 py-3.5 text-center text-sm font-medium tracking-wide text-white/78 transition duration-fast hover:-translate-y-0.5 hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 sm:w-auto"
            >
              {copy.secondaryCta}
            </a>
          </div>

          <div className="mt-8 grid gap-2.5 min-[480px]:grid-cols-3">
            {copy.proofs.map((item) => (
              <div key={item.label} className="page-card min-w-0 border p-3 md:p-4">
                <div className="font-mono text-[1.55rem] font-light leading-none text-white md:text-3xl">
                  {item.value}
                </div>
                <div className="mt-2 break-words text-[9px] uppercase leading-4 tracking-eyebrow text-brand-light">
                  {item.label}
                </div>
                <div className="mt-2 hidden text-xs leading-relaxed text-white/42 sm:block">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className="min-w-0"
        >
          <MemoryVisual copy={copy.visual} />
        </motion.div>
      </div>
    </Container>
  </section>
);

const ProtocolContinuity = ({ copy }) => (
  <section className="pb-12 md:pb-20">
    <Container>
      <div className="page-surface border p-4 md:p-6">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">
              {copy.eyebrow}
            </div>
            <h2 className="mt-3 max-w-3xl break-words text-display-md font-light text-white">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-copy text-sm leading-relaxed text-white/58 md:text-base">
              {copy.description}
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 md:gap-3">
            {copy.cards.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group min-w-0 border border-white/10 bg-white/[0.025] p-3 transition-colors duration-fast hover:border-brand-line hover:bg-brand-faint md:p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/35">
                    {item.label}
                  </span>
                  <span className="h-2 w-2 rounded-pill bg-brand-light/70 transition-transform duration-fast group-hover:scale-125" />
                </div>
                <h3 className="mt-4 break-words text-lg font-light text-white md:text-xl">{item.title}</h3>
                <p className="mt-3 hidden text-sm leading-relaxed text-white/56 sm:block">{item.description}</p>
                <div className="mt-5 break-words border border-brand-line bg-black/20 px-2.5 py-2 font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-brand-light md:px-3">
                  {item.signal}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  </section>
);

const MemoryVisual = ({ copy }) => {
  const reduced = useReducedMotion();

  return (
    <div className="page-surface relative min-h-[20rem] overflow-hidden border p-3 sm:min-h-[24rem] sm:p-4 md:min-h-[34rem] md:p-5">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.24) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/50 to-transparent" />

      <div className="relative z-10 flex h-full min-h-[18rem] flex-col sm:min-h-[22rem] md:min-h-[31rem]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <span className="min-w-0 break-words font-mono text-xs uppercase tracking-eyebrow text-white/35">{copy.boundaryLabel}</span>
          <span className="shrink-0 border border-brand-line bg-brand-faint px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-brand-light">{copy.localFirstLabel}</span>
        </div>

        <div className="relative mt-4 overflow-hidden border border-white/10 bg-black/30 p-3 sm:mt-5 sm:p-4 md:p-5">
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            <MemoryNodeCard
              {...copy.nodes.device}
              tone="device"
            />
            <MemoryNodeCard
              {...copy.nodes.blindNode}
              tone="node"
            />
            <MemoryNodeCard
              {...copy.nodes.recall}
              tone="recall"
            />
          </div>

          <div className="relative mt-4 h-32 overflow-hidden sm:mt-5 sm:h-28">
            <div className="absolute left-[10%] right-[10%] top-[36%] h-px bg-white/10" />
            <motion.div
              className="absolute left-[10%] top-[36%] h-px w-[80%] origin-left bg-brand-light/70"
              initial={{ scaleX: 0 }}
              animate={reduced ? { scaleX: 1 } : { scaleX: [0, 0.48, 0.72, 1] }}
              transition={reduced ? { duration: 0 } : { duration: 4.8, repeat: Infinity, ease: EASE, times: [0, 0.42, 0.68, 1] }}
            />
            <motion.div
              className="absolute top-[36%] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-pill border border-brand-line bg-brand-faint shadow-[0_0_28px_rgba(151,136,247,0.35)]"
              initial={{ left: '8%' }}
              animate={reduced ? { left: '50%' } : { left: ['8%', '39%', '66%', '88%'] }}
              transition={reduced ? { duration: 0 } : { duration: 4.8, repeat: Infinity, ease: EASE, times: [0, 0.42, 0.68, 1] }}
            >
              <span className="h-2 w-2 rounded-pill bg-brand-light" />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {copy.flowStages.map((stage, index) => (
                <motion.div
                  key={stage.label}
                  className="min-w-0 border border-white/10 bg-white/[0.025] px-2 py-2"
                  initial={{ opacity: 0.45, y: 8 }}
                  animate={reduced ? { opacity: 1, y: 0 } : { opacity: [0.45, 1, 0.58], y: [8, 0, 8] }}
                  transition={reduced ? { duration: 0 } : { duration: 4.8, repeat: Infinity, delay: index * 0.62, ease: EASE }}
                >
                  <div className="break-words text-[9px] uppercase leading-4 tracking-[0.12em] text-brand-light">{stage.label}</div>
                  <div className="mt-1 min-h-[2rem] break-words text-xs leading-snug text-white/72 sm:min-h-0">{stage.title}</div>
                  <div className="mt-0.5 hidden break-words text-[10px] leading-snug text-white/42 sm:block">{stage.detail}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 md:gap-3">
          {copy.sealedLabels.map((label, index) => (
            <motion.div
              key={label}
              className="border border-white/10 bg-black/40 p-2.5 md:p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + index * 0.08, ease: EASE }}
            >
              <div className="font-mono text-sm text-white md:text-lg">0x{label.length}ae</div>
              <div className="mt-1 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/36">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MemoryNodeCard = ({ label, title, detail, tone }) => {
  const active = tone !== 'node';

  return (
    <div className={`min-w-0 border p-2.5 md:p-3 ${
      active ? 'border-brand-line bg-brand-faint' : 'border-white/10 bg-white/[0.025]'
    }`}>
      <div className={`mb-3 flex h-7 w-7 items-center justify-center rounded-pill border md:mb-4 md:h-9 md:w-9 ${
        active ? 'border-brand-line text-brand-light' : 'border-white/10 text-white/36'
      }`}>
        <span className="h-2 w-2 rounded-pill bg-current" />
      </div>
      <div className="break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/35">{label}</div>
      <h3 className="mt-2 hidden break-words text-sm font-medium leading-snug text-white md:block">{title}</h3>
      <p className="mt-2 hidden text-xs leading-relaxed text-white/45 md:block">{detail}</p>
    </div>
  );
};

const MemoryAdvantageLab = ({ copy }) => {
  const [activeAxisId, setActiveAxisId] = useState(copy.axes[0]?.id || 'blind');
  const activeAxis = copy.axes.find((axis) => axis.id === activeAxisId) || copy.axes[0];

  return (
    <section className="border-y border-white/10 bg-white/[0.015] py-12 md:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
            className="min-w-0 lg:sticky lg:top-28"
          >
            <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">
              {copy.eyebrow}
            </div>
            <h2 className="mt-4 max-w-3xl break-words text-display-lg font-light text-white">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-copy text-base leading-relaxed text-white/58 md:text-lg">
              {copy.description}
            </p>
            <div className="mt-4 max-w-copy border border-white/10 bg-black/20 px-3 py-2 text-[11px] uppercase leading-relaxed tracking-[0.14em] text-white/34">
              {copy.categoryContext}
            </div>

            <div className="-mx-4 mt-6 flex max-w-full snap-x gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0">
              {copy.axes.map((axis) => {
                const active = axis.id === activeAxisId;
                return (
                  <button
                    key={axis.id}
                    type="button"
                    onClick={() => setActiveAxisId(axis.id)}
                    className={`grid min-h-[52px] min-w-[10rem] snap-start grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded border px-4 py-3 text-left transition-colors duration-fast lg:min-w-0 ${
                      active
                        ? 'border-brand-line bg-brand-faint text-white'
                        : 'border-white/10 bg-white/[0.02] text-white/58 hover:border-white/20 hover:text-white'
                    }`}
                    aria-pressed={active}
                  >
                    <span className="min-w-0 break-words text-sm font-medium leading-snug">{axis.label}</span>
                    <span className={`max-w-[7.5rem] break-words text-right font-mono text-[10px] uppercase leading-4 tracking-[0.12em] md:max-w-[8.5rem] lg:max-w-[5.5rem] lg:tracking-[0.14em] ${
                      active ? 'text-brand-light' : 'text-white/36'
                    }`}>
                      {axis.metric}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            key={activeAxis.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="page-surface min-w-0 overflow-hidden rounded border"
          >
            <div className="border-b border-white/10 p-5 md:p-6">
              <div className="mb-3 inline-flex border border-brand-line bg-brand-faint px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-brand-light">
                {activeAxis.metric}
              </div>
              <h3 className="break-words text-display-md font-light text-white">{activeAxis.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/58 md:text-base">
                {activeAxis.description}
              </p>
              <div className="mt-5 border border-brand-line bg-brand-faint p-3 sm:hidden">
                <div className="text-[9px] uppercase tracking-[0.12em] text-brand-light">{copy.labels.proofSurface}</div>
                <div className="mt-1 text-xs leading-relaxed text-white/72">{activeAxis.proofSurface}</div>
              </div>
              <div className="mt-5 hidden grid-cols-3 gap-2 sm:grid">
                {[
                  [copy.labels.userOutcome, activeAxis.userOutcome],
                  [copy.labels.nodeView, activeAxis.nodeView],
                  [copy.labels.proofSurface, activeAxis.proofSurface],
                ].map(([label, value]) => (
                  <div key={label} className="min-w-0 border border-white/10 bg-white/[0.025] p-2.5 md:p-3">
                    <div className="text-[9px] uppercase tracking-[0.12em] text-white/34">{label}</div>
                    <div className="mt-2 break-words text-xs leading-snug text-white/68 md:text-sm md:leading-relaxed">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_0.42fr_1fr]">
              <MemoryModeCard mode={activeAxis.memchain} tone="memchain" />
              <MemoryAxisVisual axis={activeAxis} />
              <MemoryModeCard mode={activeAxis.cloud} tone="cloud" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

const MemoryModeCard = ({ mode, tone }) => {
  const isMemChain = tone === 'memchain';

  return (
    <div className={`min-h-full border-b border-white/10 p-4 md:p-6 lg:border-b-0 ${
      isMemChain ? 'bg-brand-faint/60 lg:border-r' : 'bg-black/25 lg:border-l'
    } border-white/10`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className={`text-[10px] uppercase tracking-eyebrow ${
          isMemChain ? 'text-brand-light' : 'text-white/36'
        }`}>
          {mode.title}
        </span>
        <span className={`h-2 w-2 rounded-pill ${
          isMemChain ? 'bg-brand-light shadow-[0_0_12px_rgba(151,136,247,0.75)]' : 'bg-white/20'
        }`} />
      </div>
      <h4 className="break-words text-xl font-light leading-tight text-white md:text-3xl">{mode.headline}</h4>
      <div className={`mt-5 break-words border px-3 py-2 font-mono text-xs uppercase leading-5 tracking-[0.14em] ${
        isMemChain
          ? 'border-brand-line bg-black/25 text-brand-light'
          : 'border-white/10 bg-white/[0.025] text-white/40'
      }`}>
        {mode.proof}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-white/58">{mode.detail}</p>
    </div>
  );
};

const MemoryAxisVisual = ({ axis }) => {
  const [cloudLabel, memchainLabel] = axis.visualLabels;

  return (
    <div className="relative flex min-h-[12rem] items-center justify-center overflow-hidden border-b border-white/10 bg-black/35 p-4 md:min-h-[16rem] md:p-5 lg:border-b-0">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.26) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.26) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative z-10 w-full max-w-[15rem]">
        <div className="mb-4 flex items-start justify-between gap-3 font-mono text-[10px] uppercase leading-4 tracking-[0.14em]">
          <span className="min-w-0 break-words text-white/34">{cloudLabel}</span>
          <span className="min-w-0 break-words text-right text-brand-light">{memchainLabel}</span>
        </div>
        <div className="relative h-2 overflow-hidden rounded-pill bg-white/10">
          <motion.div
            key={axis.id}
            initial={{ width: '18%' }}
            animate={{ width: axis.id === 'speed' ? '96%' : '86%' }}
            transition={{ duration: 0.75, ease: EASE }}
            className="h-full rounded-pill bg-brand-light"
          />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-2">
          {axis.steps.map((step, index) => (
            <motion.div
              key={`${axis.id}-${step}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08, ease: EASE }}
              className="border border-white/10 bg-white/[0.035] px-2 py-3 text-center"
            >
              <div className="mx-auto mb-2 h-2 w-2 rounded-pill bg-brand-light/80" />
              <div className="break-words font-mono text-[9px] uppercase leading-4 tracking-[0.12em] text-white/42">
                {step}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Pipeline = ({ copy }) => (
  <section className="border-y border-white/10 bg-white/[0.015] py-12 md:py-20">
    <Container>
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {copy.items.map((item, index) => (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
            className="page-card min-w-0 border p-4 md:p-5"
          >
            <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">{item.label}</div>
            <h2 className="mt-4 break-words text-2xl font-light text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/58">{item.description}</p>
            <ul className="mt-5 space-y-2">
              {item.details.map((detail) => (
                <li key={detail} className="flex gap-2 text-sm text-white/48">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-pill bg-brand-light/70" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Container>
  </section>
);

const Pillars = ({ copy }) => (
  <section className="py-14 md:py-20">
    <Container>
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {copy.items.map((pillar) => (
          <article key={pillar.title} className="page-card min-w-0 border p-4 md:p-5">
            <h2 className="break-words text-2xl font-light text-white">{pillar.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/58">{pillar.description}</p>
            <div className="mt-5 break-words border border-brand-line bg-brand-faint p-3 text-xs leading-relaxed text-brand-light/88">
              {pillar.boundary}
            </div>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

const Benchmarks = ({ copy }) => (
  <section className="border-y border-white/10 bg-black/40 py-14 md:py-20">
    <Container>
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {copy.cards.map((item) => (
          <div key={item.label} className="page-card min-w-0 border p-4 md:p-5">
            <div className="font-mono text-3xl font-light text-white md:text-4xl">{item.value}</div>
            <div className="mt-3 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/42">{item.label}</div>
            <p className="mt-3 text-xs leading-relaxed text-white/46">{item.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 border border-warn/25 bg-warn/[0.06] p-4 text-sm leading-relaxed text-white/60">
        {copy.honestBoundary}
      </div>
    </Container>
  </section>
);

const Comparison = ({ copy }) => (
  <section className="py-14 md:py-20">
    <Container>
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="mt-10 grid gap-3">
        {copy.rows.map((row) => (
          <article key={row.dimension} className="page-card grid min-w-0 gap-4 border p-4 md:grid-cols-[0.72fr_1fr_1fr] md:p-5">
            <div className="min-w-0">
              <div className="break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/35">{copy.labels.dimension}</div>
              <h3 className="mt-2 break-words text-lg font-light text-white">{row.dimension}</h3>
            </div>
            <div className="min-w-0 border border-brand-line bg-brand-faint p-3">
              <div className="break-words text-[10px] uppercase leading-4 tracking-eyebrow text-brand-light">{copy.labels.memchain}</div>
              <p className="mt-2 break-words text-sm leading-relaxed text-white">{row.memchain}</p>
            </div>
            <div className="min-w-0 border border-white/10 bg-black/25 p-3">
              <div className="break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/34">{copy.labels.cloud}</div>
              <p className="mt-2 break-words text-sm leading-relaxed text-white/50">{row.cloud}</p>
            </div>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

const PrivacyBoundary = ({ copy }) => (
  <section id="privacy-boundary" className="border-y border-white/10 bg-white/[0.015] py-14 md:py-20">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">{copy.eyebrow}</div>
          <h2 className="mt-4 max-w-3xl break-words text-display-md font-light text-white">{copy.title}</h2>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-white/62">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

const FAQ = ({ copy }) => (
  <section className="py-14 md:py-20">
    <Container>
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {copy.items.map((item) => (
          <article key={item.q} className="page-card border p-4 md:p-5">
            <h2 className="break-words text-lg font-medium text-white">{item.q}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/58">{item.a}</p>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

const MemChainAction = ({ copy }) => (
  <section className="border-t border-white/10 py-14 md:py-20" style={{ background: 'var(--surface-1, #0C0C13)' }}>
    <Container>
      <div className="page-surface border p-5 text-center md:p-8">
        <div className="mx-auto mb-4 inline-flex border border-brand-line bg-brand-faint px-3 py-1.5 text-[10px] uppercase tracking-eyebrow text-brand-light">
          {copy.eyebrow}
        </div>
        <h2 className="mx-auto max-w-3xl break-words text-display-md font-light text-white">
          {copy.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/58 md:text-lg">
          {copy.description}
        </p>
        <div className="mx-auto mt-7 grid max-w-2xl gap-3 sm:grid-cols-2 sm:gap-4">
          <Link
            href="/privacy-network"
            className="inline-flex min-h-[48px] items-center justify-center rounded border border-brand-line bg-brand px-6 py-3.5 text-center text-sm font-semibold tracking-wide text-white shadow-[0_18px_50px_rgba(119,98,243,0.18)] transition duration-fast hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-light"
          >
            {copy.primaryCta}
          </Link>
          <a
            href="#privacy-boundary"
            className="inline-flex min-h-[48px] items-center justify-center rounded border border-white/15 px-6 py-3.5 text-center text-sm font-medium tracking-wide text-white/76 transition duration-fast hover:-translate-y-0.5 hover:bg-white/[0.035] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            {copy.secondaryCta}
          </a>
        </div>
      </div>
    </Container>
  </section>
);

const SectionHeader = ({ eyebrow, title, description }) => (
  <div className="max-w-3xl">
    <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">{eyebrow}</div>
    <h2 className="mt-3 max-w-3xl break-words text-display-md font-light text-white">{title}</h2>
    <p className="mt-4 text-base leading-relaxed text-white/58 md:text-lg">{description}</p>
  </div>
);
