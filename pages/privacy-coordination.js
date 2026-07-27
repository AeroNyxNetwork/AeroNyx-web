/**
 * ============================================
 * File Creation/Modification Notes
 * ============================================
 * Creation Reason:
 *   Give AeroNyx Privacy Coordination Protocol a dedicated product and
 *   citation surface without framing the protocol as a general-purpose
 *   public blockchain.
 * Main Functionality:
 *   - Explains the privacy data, coordination, and evidence planes.
 *   - Defines what the verifiable coordination ledger records and what it
 *     must never record.
 *   - Shows how encrypted delivery can produce bounded public evidence while
 *     keeping payloads, identities, and complete routes private.
 *   - Publishes localized FAQ and TechArticle structured data for SEO/GEO.
 * Dependencies:
 *   - components/layout/SiteHeader and Footer for shared site chrome.
 *   - components/ui/SEO, Container, and ProtocolBackground.
 *   - lib/i18n.js for all seven supported locales.
 *
 * Main Logical Flow:
 *   1. Establish the protocol invariant and the three-plane architecture.
 *   2. Make the public-evidence/privacy boundary directly inspectable.
 *   3. Walk through a blind relay journey without exposing a complete path.
 *   4. Distinguish current signed evidence from public-chain consensus claims.
 *
 * Important Note for Next Developer:
 *   - [PRIVACY-COORDINATION 2026-07-27 by Codex] Keep the invariant:
 *     prove infrastructure behavior without publishing user activity.
 *   - Do not imply global consensus, transaction finality, smart contracts,
 *     or public user activity until those properties exist and are audited.
 *   - Message payload storage is separate, optional, client-controlled, and
 *     must never be represented as coordination-ledger content.
 *
 * Last Modified: v1.0 - Dedicated privacy coordination protocol page
 * Last Modified: v1.1 - [PRIVACY-COORDINATION-POLISH 2026-07-27 by Codex]
 * Added a compact long-page index, a restrained three-plane signal rail,
 * numbered public/private evidence boundaries, and a continuous blind-relay
 * path. These refinements improve orientation and mobile reading rhythm
 * without changing any protocol claim or adding decorative product noise.
 * Last Modified: v1.2 - [PRIVACY-COORDINATION-DETAILS 2026-07-27 by Codex]
 * Made every section destination visible on mobile, added semantic comparison
 * table roles, clarified delivery status as a four-step protocol track, and
 * converted the FAQ to native, keyboard-accessible disclosure controls. Direct
 * section links are realigned after web fonts settle so shared URLs do not
 * drift below the fixed navigation.
 * ============================================
 */

import { Suspense, useEffect } from 'react';
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
    loading: () => (
      <div
        className="fixed inset-0"
        style={{ background: 'var(--surface-0, #08080D)' }}
      />
    ),
  }
);

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const buildLocalizedPath = (locale, path) => (
  locale === DEFAULT_LOCALE ? path : `/${locale}${path}`
);

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center';

  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-display-md font-medium text-white break-words">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-white/58 sm:text-lg sm:leading-8 break-words">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PageIndex({ copy }) {
  const items = [
    { href: '#architecture', label: copy.planes.eyebrow },
    { href: '#evidence-boundary', label: copy.boundaries.eyebrow },
    { href: '#relay-evidence', label: copy.journey.eyebrow },
    { href: '#protocol-delivery', label: copy.progress.eyebrow },
  ];

  return (
    <nav
      aria-label={copy.eyebrow}
      className="mt-14 border-t border-white/10 pt-4 sm:mt-16 sm:pt-5"
    >
      <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-4">
        {items.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className="group flex min-h-[58px] min-w-0 items-center gap-3 bg-[#09090E] px-3 py-3 text-left transition-colors hover:bg-[#101018] focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light sm:min-h-[62px] sm:px-4"
          >
            <span className="shrink-0 font-mono text-[10px] text-brand-light/72">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 break-words text-[11px] font-semibold uppercase leading-4 tracking-[0.1em] text-white/42 transition-colors group-hover:text-white/72 sm:text-xs sm:leading-5 sm:tracking-[0.12em]">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function PlaneDiagram({ copy, reduceMotion }) {
  return (
    <div className="mt-12 overflow-hidden rounded border border-white/10 bg-white/10">
      <div
        aria-hidden="true"
        className="relative hidden h-16 overflow-hidden bg-[#08080D] lg:block"
      >
        <div className="absolute left-[16.66%] right-[16.66%] top-1/2 h-px bg-white/12" />
        {[16.66, 50, 83.33].map((left, index) => (
          <span
            key={left}
            className="absolute top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-[#08080D]"
            style={{ left: `${left}%` }}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${
              index === 1 ? 'bg-brand-light' : 'bg-white/35'
            }`} />
          </span>
        ))}
        <motion.span
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-light shadow-[0_0_14px_rgba(151,136,247,0.8)]"
          initial={{ left: '16.66%', opacity: 0.2 }}
          animate={reduceMotion
            ? { left: '50%', opacity: 0.7 }
            : { left: ['16.66%', '83.33%'], opacity: [0.2, 1, 0.2] }}
          transition={reduceMotion
            ? { duration: 0 }
            : { duration: 3.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="grid gap-px bg-white/10 lg:grid-cols-3">
        {copy.items.map((plane, index) => (
          <motion.article
            key={plane.title}
            className="relative min-w-0 bg-[#0A0A10] px-6 py-7 sm:px-8 sm:py-9"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-white/36">
                0{index + 1}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-brand-light/60 to-transparent" />
            </div>
            <h3 className="mt-8 text-xl font-medium text-white break-words">
              {plane.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-white/54 break-words">
              {plane.description}
            </p>
            <dl className="mt-8 space-y-4 border-t border-white/8 pt-5">
              <div className="grid min-w-0 grid-cols-[auto_1fr] gap-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/34">
                  {copy.visibleLabel}
                </dt>
                <dd className="min-w-0 text-right text-xs leading-5 text-white/72 break-words">
                  {plane.visible}
                </dd>
              </div>
              <div className="grid min-w-0 grid-cols-[auto_1fr] gap-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-light">
                  {copy.privateLabel}
                </dt>
                <dd className="min-w-0 text-right text-xs leading-5 text-white/72 break-words">
                  {plane.private}
                </dd>
              </div>
            </dl>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function BoundaryList({ title, items, tone }) {
  const protects = tone === 'protects';

  return (
    <article className={`min-w-0 py-8 sm:py-10 ${
      protects ? 'lg:pr-12' : 'lg:border-l lg:border-white/10 lg:pl-12'
    }`}>
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`h-2 w-2 rounded-full ${
            protects ? 'bg-brand-light' : 'border border-white/36'
          }`}
        />
        <h3 className="text-lg font-medium text-white">{title}</h3>
      </div>
      <ul className="mt-7 space-y-5">
        {items.map((item, index) => (
          <li
            key={item}
            className="grid min-w-0 grid-cols-[28px_1fr] gap-3 text-sm leading-6 text-white/58"
          >
            <span
              className={`font-mono text-[10px] leading-6 ${
                protects ? 'text-brand-light/78' : 'text-white/26'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 break-words">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function RelayJourney({ copy, reduceMotion }) {
  return (
    <div className="relative mt-12">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[23px] top-0 w-px bg-white/10 lg:bottom-auto lg:left-[12.5%] lg:right-[12.5%] lg:top-[23px] lg:h-px lg:w-auto"
      />
      <motion.span
        aria-hidden="true"
        className="absolute left-[20px] top-0 h-2 w-2 rounded-full bg-brand-light shadow-[0_0_14px_rgba(151,136,247,0.8)] lg:hidden"
        initial={{ opacity: 0.25 }}
        whileInView={reduceMotion
          ? { opacity: 0.7 }
          : { top: ['0%', '96%'], opacity: [0.2, 1, 0.2] }}
        viewport={{ once: false, amount: 0.2 }}
        transition={reduceMotion
          ? { duration: 0 }
          : { duration: 4.6, repeat: Infinity, ease: 'linear' }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute left-[12.5%] top-[20px] hidden h-2 w-2 rounded-full bg-brand-light shadow-[0_0_14px_rgba(151,136,247,0.8)] lg:block"
        initial={{ opacity: 0.25 }}
        whileInView={reduceMotion
          ? { opacity: 0.7 }
          : { left: ['12.5%', '87.5%'], opacity: [0.2, 1, 0.2] }}
        viewport={{ once: false, amount: 0.2 }}
        transition={reduceMotion
          ? { duration: 0 }
          : { duration: 4.6, repeat: Infinity, ease: 'linear' }}
      />
      <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
        {copy.steps.map((step, index) => (
          <motion.article
            key={step.title}
            className="relative min-w-0 pl-16 lg:pl-0"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.07 }}
          >
            <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-[#08080D] font-mono text-xs text-brand-light lg:relative lg:mx-auto">
              0{index + 1}
            </div>
            <div className="lg:mt-6">
              <h3 className="text-lg font-medium text-white break-words">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/52 break-words">
                {step.description}
              </p>
              <p className="mt-5 border-l border-brand-light/45 pl-4 text-xs leading-5 text-white/72 break-words">
                {step.evidence}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function ComparisonTable({ copy }) {
  return (
    <div
      role="table"
      aria-label={copy.title}
      className="mt-12 overflow-hidden border-y border-white/12"
    >
      <div
        role="row"
        className="hidden grid-cols-[0.72fr_1.2fr_1fr] gap-px bg-white/10 text-xs font-semibold uppercase tracking-[0.14em] text-white/40 sm:grid"
      >
        <div role="columnheader" className="bg-[#09090E] px-5 py-4">
          {copy.dimensionLabel}
        </div>
        <div role="columnheader" className="bg-brand-faint px-5 py-4 text-brand-light">
          {copy.columns.aeronyx}
        </div>
        <div role="columnheader" className="bg-[#09090E] px-5 py-4">
          {copy.columns.general}
        </div>
      </div>
      {copy.rows.map((row) => (
        <div
          key={row.dimension}
          role="row"
          className="grid min-w-0 border-b border-white/8 py-6 last:border-b-0 sm:grid-cols-[0.72fr_1.2fr_1fr] sm:gap-px sm:bg-white/8 sm:py-0"
        >
          <div
            role="rowheader"
            className="min-w-0 bg-[#09090E] px-5 pb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/40 sm:py-5"
          >
            {row.dimension}
          </div>
          <div
            role="cell"
            className="min-w-0 bg-[#09090E] px-5 pb-4 text-sm leading-6 text-white/76 sm:bg-[#10101A] sm:py-5"
          >
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-light sm:hidden">
              {copy.columns.aeronyx}
            </span>
            <span className="break-words">{row.aeronyx}</span>
          </div>
          <div
            role="cell"
            className="min-w-0 bg-[#09090E] px-5 text-sm leading-6 text-white/48 sm:py-5"
          >
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/34 sm:hidden">
              {copy.columns.general}
            </span>
            <span className="break-words">{row.general}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DeliveryProgress({ copy }) {
  return (
    <div className="mt-12 border-y border-white/10">
      <div
        aria-hidden="true"
        className="relative hidden grid-cols-4 px-[12.5%] pt-8 sm:grid"
      >
        <span className="absolute left-[12.5%] right-[12.5%] top-[35px] h-px bg-white/12" />
        {copy.items.map((item) => (
          <span
            key={item.title}
            className={`relative z-10 mx-auto h-2 w-2 rounded-full ${
              item.status === 'live'
                ? 'bg-brand-light shadow-[0_0_12px_rgba(151,136,247,0.55)]'
                : 'border border-white/32 bg-[#08080D]'
            }`}
          />
        ))}
      </div>
      <div className="grid gap-px bg-white/10 md:grid-cols-2">
        {copy.items.map((item, index) => (
          <article
            key={item.title}
            className="grid min-w-0 grid-cols-[32px_1fr] gap-3 bg-[#0A0A10] px-5 py-7 sm:grid-cols-[40px_1fr] sm:gap-4 sm:px-8 sm:py-8"
          >
            <span className={`font-mono text-xs ${
              item.status === 'live' ? 'text-brand-light' : 'text-white/28'
            }`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                item.status === 'live' ? 'text-brand-light' : 'text-white/36'
              }`}>
                {item.status === 'live'
                  ? copy.deliveredLabel
                  : copy.buildingLabel}
              </p>
              <h3 className="mt-4 text-lg font-medium text-white break-words">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/52 break-words">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProtocolFaq({ copy }) {
  return (
    <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
      {copy.items.map((item, index) => (
        <details
          key={item.question}
          open={index === 0}
          className="group"
        >
          <summary className="grid min-h-[72px] cursor-pointer list-none grid-cols-[32px_minmax(0,1fr)_32px] items-center gap-3 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light [&::-webkit-details-marker]:hidden sm:min-h-[82px] sm:grid-cols-[40px_minmax(0,1fr)_40px] sm:gap-5 sm:py-6">
            <span className="font-mono text-xs text-white/28 transition-colors group-open:text-brand-light">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 text-base font-medium leading-7 text-white break-words">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className="relative h-8 w-8 rounded-full border border-white/14 transition-colors group-hover:border-white/28 group-open:border-brand-light/40"
            >
              <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-white/60" />
              <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-white/60 transition-transform duration-200 group-open:scale-y-0" />
            </span>
          </summary>
          <div className="grid grid-cols-[32px_minmax(0,1fr)_32px] gap-3 pb-7 sm:grid-cols-[40px_minmax(0,1fr)_40px] sm:gap-5 sm:pb-8">
            <p className="col-start-2 min-w-0 max-w-3xl text-sm leading-6 text-white/54 break-words">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}

export default function PrivacyCoordination({ pageLocale = DEFAULT_LOCALE }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const activeLocale = router.locale || pageLocale || DEFAULT_LOCALE;
  const messages = getMessages(activeLocale);
  const copy = messages.privacyCoordination;
  const canonicalPath = buildLocalizedPath(activeLocale, '/privacy-coordination');
  const docsPath = 'https://docs.aeronyx.network/';
  const appPath = 'https://app.aeronyx.network/';

  useEffect(() => {
    if (!router.isReady || !window.location.hash) {
      return undefined;
    }

    // [PRIVACY-COORDINATION-DETAILS 2026-07-27 by Codex] Web-font
    // metrics can shift long localized pages after the initial hash jump.
    const sectionId = decodeURIComponent(window.location.hash.slice(1));
    let cancelled = false;

    const alignSection = () => {
      if (!cancelled) {
        document.getElementById(sectionId)?.scrollIntoView({ block: 'start' });
      }
    };

    const frameId = window.requestAnimationFrame(alignSection);
    document.fonts?.ready.then(alignSection);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [router.asPath, router.isReady]);

  const structuredData = [
    {
      '@type': 'TechArticle',
      '@id': `https://aeronyx.network${canonicalPath}#article`,
      headline: copy.seo.title,
      description: copy.seo.description,
      author: {
        '@type': 'Organization',
        name: 'AeroNyx',
        url: 'https://aeronyx.network/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'AeroNyx',
        url: 'https://aeronyx.network/',
      },
      mainEntityOfPage: `https://aeronyx.network${canonicalPath}`,
      inLanguage: activeLocale,
      dateModified: '2026-07-27',
    },
    {
      '@type': 'FAQPage',
      '@id': `https://aeronyx.network${canonicalPath}#faq`,
      mainEntity: copy.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <>
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalUrl={`https://aeronyx.network${canonicalPath}`}
        keywords={copy.seo.keywords}
        extraStructuredData={structuredData}
      />

      <div className="relative min-h-screen overflow-x-clip bg-[#08080D] text-white">
        <Suspense fallback={null}>
          <ProtocolBackground />
        </Suspense>
        <SiteHeader />

        <main className="relative z-10">
          <section className="border-b border-white/8 pt-28 sm:pt-32 lg:pt-36">
            <Container className="pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20">
              <div className="grid min-w-0 items-end gap-12 lg:grid-cols-[minmax(0,1.18fr)_minmax(280px,0.62fr)] lg:gap-16">
                <motion.div
                  className="min-w-0"
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
                    {copy.eyebrow}
                  </p>
                  <h1 className="hero-title mt-6 max-w-5xl font-medium text-white break-words">
                    {copy.title}
                  </h1>
                  <p className="mt-7 max-w-3xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8 break-words">
                    {copy.description}
                  </p>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/privacy-network"
                      locale={activeLocale}
                      className="inline-flex min-h-[48px] items-center justify-center rounded-sm bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/88 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      {copy.primaryCta}
                    </Link>
                    <a
                      href={docsPath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[48px] items-center justify-center rounded-sm border border-white/16 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      {copy.secondaryCta}
                    </a>
                  </div>
                </motion.div>

                <motion.aside
                  className="min-w-0 border-l border-brand-light/50 pl-6 sm:pl-8"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.2 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/38">
                    {copy.invariant.label}
                  </p>
                  <p className="mt-4 text-xl font-medium leading-8 text-white sm:text-2xl sm:leading-9 break-words">
                    {copy.invariant.text}
                  </p>
                  <p className="mt-6 font-mono text-xs leading-5 text-white/36 break-words">
                    {copy.heroProof}
                  </p>
                </motion.aside>
              </div>
              <PageIndex copy={copy} />
            </Container>
          </section>

          <section id="architecture" className="scroll-mt-20 border-b border-white/8 py-20 sm:scroll-mt-24 sm:py-24 lg:py-32">
            <Container>
              <motion.div {...fadeIn}>
                <SectionHeading
                  eyebrow={copy.planes.eyebrow}
                  title={copy.planes.title}
                  description={copy.planes.description}
                />
              </motion.div>
              <PlaneDiagram copy={copy.planes} reduceMotion={reduceMotion} />
            </Container>
          </section>

          <section id="evidence-boundary" className="scroll-mt-20 border-b border-white/8 py-20 sm:scroll-mt-24 sm:py-24 lg:py-32">
            <Container>
              <motion.div {...fadeIn}>
                <SectionHeading
                  eyebrow={copy.boundaries.eyebrow}
                  title={copy.boundaries.title}
                  description={copy.boundaries.description}
                />
              </motion.div>
              <div className="mt-12 grid gap-0 border-y border-white/8 lg:grid-cols-2">
                <BoundaryList
                  title={copy.boundaries.recordsTitle}
                  items={copy.boundaries.records}
                  tone="protects"
                />
                <BoundaryList
                  title={copy.boundaries.neverTitle}
                  items={copy.boundaries.never}
                  tone="private"
                />
              </div>
              <p className="mt-6 max-w-4xl text-xs leading-5 text-white/34 break-words">
                {copy.boundaries.note}
              </p>
            </Container>
          </section>

          <section id="relay-evidence" className="scroll-mt-20 border-b border-white/8 py-20 sm:scroll-mt-24 sm:py-24 lg:py-32">
            <Container>
              <motion.div {...fadeIn}>
                <SectionHeading
                  eyebrow={copy.journey.eyebrow}
                  title={copy.journey.title}
                  description={copy.journey.description}
                />
              </motion.div>
              <RelayJourney copy={copy.journey} reduceMotion={reduceMotion} />
            </Container>
          </section>

          <section id="ledger-difference" className="scroll-mt-20 border-b border-white/8 py-20 sm:scroll-mt-24 sm:py-24 lg:py-32">
            <Container>
              <motion.div {...fadeIn}>
                <SectionHeading
                  eyebrow={copy.comparison.eyebrow}
                  title={copy.comparison.title}
                  description={copy.comparison.description}
                />
              </motion.div>
              <ComparisonTable copy={copy.comparison} />
            </Container>
          </section>

          <section id="protocol-delivery" className="scroll-mt-20 border-b border-white/8 py-20 sm:scroll-mt-24 sm:py-24 lg:py-32">
            <Container>
              <motion.div {...fadeIn}>
                <SectionHeading
                  eyebrow={copy.progress.eyebrow}
                  title={copy.progress.title}
                  description={copy.progress.description}
                />
              </motion.div>
              <DeliveryProgress copy={copy.progress} />
            </Container>
          </section>

          <section id="faq" className="border-b border-white/8 py-20 sm:py-24 lg:py-32">
            <Container>
              <motion.div {...fadeIn}>
                <SectionHeading
                  eyebrow={copy.faq.eyebrow}
                  title={copy.faq.title}
                  description={copy.faq.description}
                />
              </motion.div>
              <ProtocolFaq copy={copy.faq} />
            </Container>
          </section>

          <section className="py-20 sm:py-24 lg:py-32">
            <Container>
              <div className="grid min-w-0 gap-10 border-t border-brand-light/45 pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
                    {copy.closing.eyebrow}
                  </p>
                  <h2 className="mt-5 max-w-4xl text-display-md font-medium text-white break-words">
                    {copy.closing.title}
                  </h2>
                  <p className="mt-5 max-w-3xl text-base leading-7 text-white/54 break-words">
                    {copy.closing.description}
                  </p>
                </div>
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row lg:flex-col">
                  <a
                    href={appPath}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-sm bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/88 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  >
                    {copy.closing.primaryCta}
                  </a>
                  <a
                    href={docsPath}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-sm border border-white/16 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  >
                    {copy.closing.secondaryCta}
                  </a>
                </div>
              </div>
            </Container>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      pageLocale: locale || DEFAULT_LOCALE,
    },
  };
}
