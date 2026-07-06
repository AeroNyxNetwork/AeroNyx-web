/**
 * ============================================
 * File Creation/Modification Notes
 * ============================================
 * Creation Reason: Move the user-facing privacy network product story off the
 * homepage so the first page can focus on the AeroNyx protocol layer.
 * Modification Reason: v2.5 - Mobile proof rail stabilization.
 *   Hero and protocol-visibility proof cards now render as a stable mobile
 *   grid instead of a horizontal snap rail. This avoids half-visible cards on
 *   iPhone-class screens while preserving the desktop three-column proof layout.
 *
 * Modification Reason: v2.6 - Status evidence panel polish.
 *   Hero protection signals and live protocol metrics now read as numbered
 *   status evidence surfaces with calmer hierarchy, stronger mobile wrapping,
 *   and restrained product-page depth. Aggregate data logic, privacy boundary
 *   wording, and public telemetry limits remain unchanged.
 *
 * Modification Reason: v2.7 - Protection assurance surface polish.
 *   Assurance, daily protection, and telemetry boundary sections now use
 *   numbered evidence cards, status dots, and stronger mobile wrapping so the
 *   page closes with the same mature product rhythm as the hero. No user-level
 *   telemetry, API behavior, or visible narrative copy was changed.
 *
 * Modification Reason: v2.8 - Traditional VPN trust model contrast.
 *   Added a concise trust-model comparison after the hero so users understand
 *   why AeroNyx Privacy Network is an open blind protocol rather than another
 *   centralized VPN provider. The comparison is explicitly bounded: it explains
 *   reduced infrastructure visibility without claiming that every metadata risk
 *   disappears or that unlawful activity becomes lawful.
 *
 * Modification Reason: v2.4 - Secondary page internationalization.
 *   Moved the Privacy Network hero, protocol bridge, North Star Plan, live
 *   protocol proof, assurance model, daily dashboard signals, and telemetry
 *   boundary copy into lib/i18n.js. Long-language mobile layouts now use
 *   safer wrapping and compact rails so Russian, Spanish, Korean, Japanese,
 *   Traditional Chinese, and Simplified Chinese remain polished.
 *
 * Historical Notes:
 * v2.3 - North Star Plan visibility.
 *   Made the North Star Plan / 北極星計劃 directly visible and anchorable on the
 *   Privacy Network page so the infrastructure covenant is not reduced to a
 *   small English eyebrow. The section now states the same product thesis as
 *   the homepage: more private, open source, and global by default.
 *
 * Historical Notes:
 * v2.2 - Secondary page action alignment.
 *   Aligned the Privacy Network hero actions with the homepage product-action
 *   system: 48px touch targets, brand-primary emphasis, restrained tracking,
 *   visible focus states, and predictable mobile widths. This keeps the page
 *   premium and consistent without changing the Privacy Network narrative,
 *   aggregate stats, public telemetry boundary, or download route.
 *
 * Historical Notes:
 * v2.1 - Homepage typography alignment.
 *   Aligned the Privacy Network hero with the homepage NarrativeHero
 *   typography by using the shared `.hero-title` contract and matching
 *   the lighter subtitle rhythm. The page keeps the existing Privacy
 *   Network narrative, aggregate stats, and public telemetry boundary.
 *
 * Historical Notes:
 * v2.0 - Mobile protection experience polish.
 *   Tightened the Privacy Network mobile journey so the hero owns its
 *   spacing, protection signals appear as a touch-friendly status rail,
 *   the blind-route visual is shorter on phones, and aggregate evidence
 *   cards avoid cramped three-column text on small screens.
 *
 * Historical Notes:
 * v1.9 - Decentralized node naming.
 *   Replaced user-facing implementation-language node wording with
 *   decentralized node language so the public page describes the product
 *   network instead of the implementation language. Technical source-path
 *   comments remain intact for maintainers.
 *
 * Historical Notes:
 * v1.8 - Trustworthy stats dashboard.
 *   Refined the live protocol stats section into a protection evidence panel:
 *   each metric now states the user-facing signal and the privacy-preserving
 *   public evidence boundary. This keeps the page product-grade while avoiding
 *   user-level telemetry or route disclosure.
 *
 * Historical Notes:
 * v1.7 - Product continuity bridge.
 *   Added a secondary-page bridge that connects Privacy Network to MemChain
 *   as the same blind protocol trust boundary: private traffic in motion and
 *   private memory at rest. Public telemetry wording was also tightened away
 *   from finance-adjacent identity language. Mobile route visuals now collapse
 *   actor cards and privacy boundary chips into compact status summaries so
 *   the first bridge and North Star sections appear sooner on phone screens.
 *
 * Historical Notes:
 * v1.6 - Blind routing animation polish.
 *   Replaced the static hero assurance list with a protocol route visual that
 *   shows humans, apps, and agents entering a blind routing boundary while only
 *   aggregate health evidence exits. The animation respects reduced motion,
 *   avoids horizontal page overflow, and reinforces the Privacy Network story
 *   without exposing user-level telemetry.
 *
 * Historical Notes:
 * v1.5 - Product assurance bridge.
 *   Added a user promise/protocol evidence bridge so the page explains how
 *   daily protection signals map to auditable decentralized node evidence without
 *   exposing user telemetry. This makes the secondary page feel like a mature
 *   product surface instead of a collection of engineering claims.
 *
 * Historical Notes:
 * v1.4 - North Star infrastructure narrative.
 *   Added the North Star Plan as the engineering covenant for the Privacy
 *   Network: more private, open source, globally usable, and built on decentralized
 *   node infrastructure that can stand up to public audit and real operation.
 *   The hero assurance panel now animates vertically to avoid transient
 *   horizontal overflow on iPhone-class screens.
 *
 * Historical Notes:
 * v1.3 - Privacy Network narrative cleanup.
 *   Renames the active header/background/download section dependencies away
 *   from legacy tunnel implementation names. Visible copy stays focused on
 *   Privacy Network and AeroNyx Privacy Protocol.
 *
 * Historical Notes:
 *   v1.0 - New secondary page for the privacy network product surface.
 * Main Functionality:
 *   - Presents AeroNyx Privacy Network as an application built on the
 *     AeroNyx Privacy Protocol.
 *   - Shows user-facing protection signals, aggregate protocol statistics,
 *     and the existing download/app visual section.
 * Dependencies:
 *   - components/sections/PrivacyAccessSection keeps the existing download
 *     modal contract while visible copy remains Privacy Network.
 *   - lib/hooks/useNetworkStats for public aggregate protocol counters.
 *   - components/ui/AnimatedMessageCounter for live privacy-safe counters.
 *
 * Main Logical Flow:
 *   1. Render SEO and shared site chrome.
 *   2. Explain what the privacy network gives users without making the
 *      homepage product-heavy.
 *   3. State the North Star engineering covenant for decentralized node infrastructure.
 *   4. Show aggregate encrypted traffic/packet/health metrics and route users
 *      to downloads.
 *
 * Important Note for Next Developer:
 *   - Keep visible language as "Privacy Network" or "AeroNyx Privacy
 *     Protocol". Do not rebrand the public page around legacy tunnel terms.
 *   - The Rust/backend endpoint path still contains vpn for backward
 *     compatibility; do not rename API paths without coordinating clients.
 *
 * Last Modified: v1.3 - Removed old download surface wording
 * Last Modified: v1.4 - North Star infrastructure narrative
 * Last Modified: v1.5 - Product assurance bridge
 * Last Modified: v1.6 - Blind routing animation polish
 * Last Modified: v1.7 - Product continuity bridge
 * Last Modified: v1.8 - Trustworthy stats dashboard
 * Last Modified: v1.9 - Decentralized node naming
 * Last Modified: v2.0 - Mobile protection experience polish
 * Last Modified: v2.1 - Homepage typography alignment
 * Last Modified: v2.2 - Secondary page action alignment
 * Last Modified: v2.3 - North Star Plan visibility
 * Last Modified: v2.4 - Secondary page internationalization
 * Last Modified: v2.5 - Mobile proof rail stabilization
 * Last Modified: v2.6 - Status evidence panel polish
 * Last Modified: v2.7 - Protection assurance surface polish
 * Last Modified: v2.8 - Traditional VPN trust model contrast
 * ============================================
 */

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import Container from '../components/ui/Container';
import AnimatedMessageCounter from '../components/ui/AnimatedMessageCounter';
import SiteHeader from '../components/layout/SiteHeader';
import Footer from '../components/layout/Footer';
import PrivacyAccessSection from '../components/sections/PrivacyAccessSection';
import useNetworkStats from '../lib/hooks/useNetworkStats';
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

export default function PrivacyNetworkPage() {
  const { locale } = useRouter();
  const activeLocale = locale || DEFAULT_LOCALE;
  const canonicalPath = activeLocale === DEFAULT_LOCALE ? '/privacy-network' : `/${activeLocale}/privacy-network`;
  const copy = getMessages(activeLocale);
  const pageCopy = copy.privacyNetworkPage || getMessages(DEFAULT_LOCALE).privacyNetworkPage;
  const { stats, isLoading } = useNetworkStats({
    period: '30d',
    autoRefresh: true,
    refreshInterval: 30000,
  });

  const healthPercent = Number(stats.protocolFoundationChecksTotal || 0) > 0
    ? Math.round((Number(stats.protocolFoundationChecksPassed || 0) / Number(stats.protocolFoundationChecksTotal || 1)) * 100)
    : 0;

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

      <main className="relative z-10 overflow-x-hidden pt-24 md:pt-32">
        <Hero copy={pageCopy.hero} />
        <TrustModelComparison copy={pageCopy.trustModel} />
        <ProtocolContinuity copy={pageCopy.protocolContinuity} />
        <NorthStarPlan copy={pageCopy.northStar} />
        <LiveProtocolStats
          stats={stats}
          isLoading={isLoading}
          siteCopy={copy}
          copy={pageCopy.liveProtocolStats}
          healthPercent={healthPercent}
        />
        <AssuranceModel copy={pageCopy.assurance} />
        <ProtectionSignals copy={pageCopy.protection} />
        <PrivacyBoundary copy={pageCopy.boundary} />
        <PrivacyAccessSection />
      </main>

      <Footer />
    </>
  );
}

const Hero = ({ copy }) => (
  <section data-hero-section className="pb-12 md:pb-24">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
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
            <a
              href="#privacy-access"
              className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded border border-brand-line bg-brand px-7 py-3.5 text-center text-sm font-semibold tracking-wide text-white shadow-[0_18px_50px_rgba(119,98,243,0.22)] transition duration-fast hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-light sm:w-auto"
            >
              {copy.primaryCta}
            </a>
            <a
              href="#protocol-stats"
              className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded border border-white/15 px-7 py-3.5 text-center text-sm font-medium tracking-wide text-white/78 transition duration-fast hover:-translate-y-0.5 hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 sm:w-auto"
            >
              {copy.secondaryCta}
            </a>
          </div>

          <div className="mt-8 grid gap-2.5 min-[480px]:grid-cols-3">
            {copy.signals.map((item, index) => (
              <div key={item.label} className="page-card relative min-w-0 overflow-hidden border p-3 md:p-4">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/35 to-transparent" />
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="min-w-0 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/36">{item.label}</div>
                  <div className="shrink-0 font-mono text-xs leading-none text-brand-light/70">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="break-words text-lg font-light leading-tight text-white md:text-2xl">{item.value}</div>
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
          <PrivacyRouteVisual copy={copy.visual} />
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
                <div className="mt-5 min-w-0 break-words border border-brand-line bg-black/20 px-2.5 py-2 font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-brand-light md:px-3">
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

const TrustModelComparison = ({ copy }) => (
  <section className="pb-12 md:pb-20">
    <Container>
      <div className="page-surface relative overflow-hidden border p-4 md:p-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/55 to-transparent" />
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.58, ease: EASE }}
            className="min-w-0 lg:sticky lg:top-28"
          >
            <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">
              {copy.eyebrow}
            </div>
            <h2 className="mt-3 max-w-3xl break-words text-display-md font-light text-white">
              {copy.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
              {copy.description}
            </p>
            <div className="mt-5 border border-brand-line bg-brand-faint p-3 md:p-4">
              <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">
                {copy.boundaryLabel}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/64">
                {copy.boundary}
              </p>
            </div>
          </motion.div>

          <div className="min-w-0">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="border border-white/10 bg-white/[0.018] px-3 py-2.5 text-[10px] uppercase tracking-eyebrow text-white/42 md:px-4">
                {copy.legacyLabel}
              </div>
              <div className="border border-brand-line bg-brand-faint px-3 py-2.5 text-[10px] uppercase tracking-eyebrow text-brand-light md:px-4">
                {copy.aeronyxLabel}
              </div>
            </div>

            <div className="mt-2 grid gap-2">
              {copy.rows.map((row, index) => (
                <motion.article
                  key={row.axis}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.48, delay: index * 0.045, ease: EASE }}
                  className="grid min-w-0 gap-2 sm:grid-cols-2"
                >
                  <div className="min-w-0 border border-white/10 bg-black/20 p-3 md:p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="min-w-0 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/30">
                        {row.axis}
                      </div>
                      <div className="shrink-0 font-mono text-xs leading-none text-white/16">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <p className="break-words text-sm leading-relaxed text-white/52 md:text-base">
                      {row.legacy}
                    </p>
                  </div>
                  <div className="min-w-0 border border-brand-line bg-brand-faint p-3 md:p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="min-w-0 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-brand-light">
                        {row.axis}
                      </div>
                      <div className="h-2 w-2 shrink-0 rounded-pill bg-brand-light shadow-[0_0_12px_rgba(151,136,247,0.55)]" />
                    </div>
                    <p className="break-words text-sm leading-relaxed text-white/74 md:text-base">
                      {row.aeronyx}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

const PrivacyRouteVisual = ({ copy }) => {
  const reduced = useReducedMotion();

  return (
    <div className="page-surface relative min-h-[20rem] w-full max-w-full overflow-hidden border p-3 sm:min-h-[24rem] sm:p-4 md:min-h-[32rem] md:p-5">
      <div className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/60 to-transparent" />

      <div className="relative z-10 flex min-h-[18rem] flex-col sm:min-h-[22rem] md:min-h-[29rem]">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-4 sm:mb-5">
          <span className="min-w-0 break-words text-[10px] uppercase tracking-eyebrow text-white/36">{copy.boundaryLabel}</span>
          <span className="shrink-0 border border-brand-line bg-brand-faint px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-brand-light">{copy.protectedLabel}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {copy.actors.map((actor, index) => (
            <motion.div
              key={actor.label}
              className="border border-white/10 bg-white/[0.025] p-2.5 md:p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 + index * 0.07, ease: EASE }}
            >
              <div className="break-words text-[10px] uppercase tracking-eyebrow text-white/34">{actor.label}</div>
              <div className="mt-2 hidden text-xs leading-relaxed text-white/58 md:block">{actor.detail}</div>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-4 flex flex-1 items-center justify-center overflow-hidden border border-white/10 bg-black/35 p-3 sm:mt-5 sm:p-4">
          <div className="absolute left-5 right-5 top-1/2 h-px bg-white/10" />
          <div className="absolute left-1/2 top-5 bottom-5 w-px bg-white/10" />

          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute h-28 w-28 rounded-pill border border-brand/20 md:h-36 md:w-36"
              initial={{ scale: 0.82, opacity: 0 }}
              animate={reduced ? { scale: 1, opacity: 0.22 } : { scale: [0.82, 1.35, 1.7], opacity: [0, 0.34, 0] }}
              transition={reduced ? { duration: 0 } : { duration: 3.4, repeat: Infinity, delay: ring * 0.9, ease: EASE }}
            />
          ))}

          <div className="relative z-10 grid w-full max-w-full grid-cols-1 items-center gap-3 sm:max-w-sm sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <div className="space-y-2">
              {copy.privateLabels.map((label, index) => (
                <motion.div
                  key={label}
                  className="border border-white/10 bg-white/[0.025] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-white/42"
                  animate={reduced ? undefined : { opacity: [0.45, 1, 0.45] }}
                  transition={reduced ? undefined : { duration: 2.8, repeat: Infinity, delay: index * 0.42 }}
                >
                  {label}
                </motion.div>
              ))}
            </div>

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-pill border border-brand-line bg-brand-faint sm:h-24 sm:w-24 md:h-28 md:w-28">
              <motion.div
                className="absolute inset-3 rounded-pill border border-brand-light/40"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <div className="text-center">
                <div className="font-mono text-lg text-white">0x</div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-brand-light">{copy.blindLabel}</div>
              </div>
            </div>

            <div className="space-y-2">
              {copy.evidence.map((label, index) => (
                <motion.div
                  key={label}
                  className="border border-brand-line bg-brand-faint px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-brand-light"
                  initial={{ opacity: 0.55, x: 8 }}
                  animate={reduced ? { opacity: 1, x: 0 } : { opacity: [0.55, 1, 0.72], x: [8, 0, 8] }}
                  transition={reduced ? { duration: 0 } : { duration: 3.2, repeat: Infinity, delay: index * 0.38, ease: EASE }}
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 md:gap-3">
          {copy.boundaries.map((item) => (
            <div key={item} className="border border-white/10 bg-white/[0.025] p-2.5 text-center text-[10px] uppercase tracking-eyebrow text-white/42 md:p-3">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NorthStarPlan = ({ copy }) => (
  <section id="north-star-plan" className="scroll-mt-24 border-y border-white/10 bg-white/[0.012] py-14 md:py-20">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">
            {copy.eyebrow}
          </div>
          <h2 className="mt-3 max-w-3xl break-words text-display-md font-light text-white">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/58 md:text-lg">
            {copy.description}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/48 md:text-base">
            {copy.secondaryDescription}
          </p>
        </motion.div>

        <div className="grid gap-3">
          {copy.principles.map((item, index) => (
            <motion.article
              key={item.title}
              className="page-card border p-4 md:p-5"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="font-mono text-sm text-brand-light">{item.label}</div>
                <div>
                  <h3 className="break-words text-xl font-light text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/56 md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

const LiveProtocolStats = ({ stats, isLoading, siteCopy, copy, healthPercent }) => {
  const metrics = [
    {
      ...copy.metrics.encryptedTraffic,
      liveValue: stats.encryptedTrafficBytes,
      fallback: stats.encryptedTraffic,
      suffix: siteCopy.join.stats.bytesUnit,
      defaultStep: 1024,
    },
    {
      ...copy.metrics.encryptedPackets,
      liveValue: stats.encryptedMessagesRaw,
      fallback: stats.encryptedMessages,
      suffix: siteCopy.join.stats.packetsUnit,
      defaultStep: 1,
    },
    {
      ...copy.metrics.protocolHealth,
      fallback: `${healthPercent}%`,
      suffix: copy.metrics.protocolHealth.suffix,
    },
  ];

  return (
    <section id="protocol-stats" className="border-y border-white/10 bg-white/[0.015] py-14 md:py-20">
      <Container>
        <div className="mb-10 max-w-3xl">
          <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">{copy.eyebrow}</div>
          <h2 className="mt-3 max-w-3xl break-words text-display-md font-light text-white">{copy.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/58 md:text-lg">
            {copy.description}
          </p>
        </div>
        <div className="mb-4 grid gap-2 min-[480px]:grid-cols-3">
          {copy.visibility.map((item, index) => (
            <div key={item.label} className="relative min-w-0 overflow-hidden border border-white/10 bg-black/25 px-3 py-2.5">
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-brand-light/35 to-transparent" />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 break-words text-[9px] uppercase leading-4 tracking-[0.12em] text-white/34">{item.label}</div>
                <div className="shrink-0 font-mono text-[10px] leading-4 text-white/22">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
              <div className="mt-1 text-xs leading-relaxed text-white/62 md:hidden">{item.mobileValue}</div>
              <div className="mt-1 hidden text-sm leading-relaxed text-white/62 md:block">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {metrics.map((item, index) => (
            <article key={item.label} className="page-card relative min-w-0 overflow-hidden border p-4 md:p-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/45 to-transparent" />
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="min-w-0 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/42">{item.label}</div>
                <div className="shrink-0 font-mono text-2xl font-light leading-none text-white/14">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
              <div className="min-h-[3.35rem] min-w-0 break-words font-light leading-none text-white">
                {isLoading ? (
                  <span className="block h-8 w-28 animate-pulse bg-white/10" />
                ) : item.liveValue !== undefined ? (
                  <AnimatedMessageCounter
                    value={item.liveValue}
                    fallback={item.fallback}
                    suffix={item.suffix}
                    defaultStep={item.defaultStep}
                  />
                ) : (
                  <span className="text-3xl md:text-4xl">{item.fallback}</span>
                )}
              </div>
              <p className="mt-3 hidden text-sm leading-relaxed text-white/48 sm:block">{item.description}</p>
              <div className="mt-5 grid gap-2">
                <div className="border border-brand-line bg-brand-faint px-3 py-2">
                  <div className="text-[9px] uppercase tracking-[0.12em] text-brand-light">{copy.userSignalLabel}</div>
                  <div className="mt-1 text-xs leading-relaxed text-white/70">{item.userSignal}</div>
                </div>
                <div className="hidden border border-white/10 bg-black/25 px-3 py-2 md:block">
                  <div className="text-[9px] uppercase tracking-[0.12em] text-white/34">{copy.publicEvidenceLabel}</div>
                  <div className="mt-1 text-xs leading-relaxed text-white/50">{item.publicEvidence}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

const AssuranceModel = ({ copy }) => (
  <section className="py-14 md:py-20">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="lg:sticky lg:top-28"
        >
          <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">{copy.eyebrow}</div>
          <h2 className="mt-3 max-w-3xl break-words text-display-md font-light text-white">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/58 md:text-lg">
            {copy.description}
          </p>
        </motion.div>

        <div className="grid gap-3">
          {copy.pairs.map((item, index) => (
            <motion.article
              key={item.promise}
              className="page-card relative min-w-0 overflow-hidden border p-4 md:p-5"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: EASE }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/35 to-transparent" />
              <div className="grid gap-4 md:grid-cols-[0.74fr_1.26fr] md:items-start">
                <div className="min-w-0">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="min-w-0 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-white/34">{copy.userPromiseLabel}</div>
                    <div className="shrink-0 font-mono text-2xl font-light leading-none text-white/12">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <h3 className="mt-2 break-words text-xl font-light text-white">{item.promise}</h3>
                </div>
                <div className="min-w-0 border border-brand-line bg-brand-faint p-3 md:p-4">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-pill bg-brand-light shadow-[0_0_12px_rgba(151,136,247,0.55)]" />
                    <div className="min-w-0 break-words text-[10px] uppercase leading-4 tracking-eyebrow text-brand-light">{copy.protocolEvidenceLabel}</div>
                  </div>
                  <p className="mt-2 break-words text-sm leading-relaxed text-white/64 md:text-base">{item.evidence}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

const ProtectionSignals = ({ copy }) => (
  <section className="border-y border-white/10 bg-white/[0.012] py-14 md:py-20">
    <Container>
      <div className="mb-10 max-w-3xl">
        <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">{copy.eyebrow}</div>
        <h2 className="mt-3 max-w-3xl break-words text-display-md font-light text-white">{copy.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-white/58 md:text-lg">
          {copy.description}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {copy.signals.map((item, index) => (
          <article key={item.title} className="page-card relative min-w-0 overflow-hidden border p-4 md:p-5">
            <div className="absolute right-4 top-4 font-mono text-3xl font-light leading-none text-white/10">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-pill border border-brand-line bg-brand-faint text-brand-light">
              <span className="h-2 w-2 rounded-pill bg-current" />
            </div>
            <h2 className="break-words pr-8 text-xl font-light leading-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/56">{item.description}</p>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

const PrivacyBoundary = ({ copy }) => (
  <section className="border-y border-white/10 bg-black/40 py-14 md:py-20">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="min-w-0 lg:sticky lg:top-28">
          <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">{copy.eyebrow}</div>
          <h2 className="mt-3 max-w-3xl break-words text-display-md font-light text-white">{copy.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/58">
            {copy.description}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {copy.items.map((item, index) => (
            <div key={item} className="page-card relative min-w-0 overflow-hidden border p-4 text-sm leading-relaxed text-white/62">
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="h-2 w-2 shrink-0 rounded-pill bg-brand-light/70" />
                <span className="font-mono text-xs leading-none text-white/18">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="break-words">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);
