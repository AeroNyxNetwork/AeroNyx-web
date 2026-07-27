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
 * ============================================
 */

import { Suspense } from 'react';
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

function PlaneDiagram({ copy, reduceMotion }) {
  return (
    <div className="mt-12 grid gap-px overflow-hidden rounded border border-white/10 bg-white/10 lg:grid-cols-3">
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
  );
}

function BoundaryList({ title, items, tone }) {
  const protects = tone === 'protects';

  return (
    <article className="min-w-0 border-t border-white/12 py-8 sm:py-10">
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
        {items.map((item) => (
          <li
            key={item}
            className="grid min-w-0 grid-cols-[20px_1fr] gap-3 text-sm leading-6 text-white/58"
          >
            <span
              aria-hidden="true"
              className={`mt-[11px] h-px ${
                protects ? 'bg-brand-light/70' : 'bg-white/24'
              }`}
            />
            <span className="min-w-0 break-words">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function RelayJourney({ copy, reduceMotion }) {
  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-4">
      {copy.steps.map((step, index) => (
        <motion.article
          key={step.title}
          className="relative min-w-0 border-t border-white/12 pt-6"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.07 }}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs text-brand-light">
              0{index + 1}
            </span>
            {index < copy.steps.length - 1 ? (
              <span className="hidden h-px flex-1 bg-white/12 lg:block" />
            ) : null}
          </div>
          <h3 className="mt-5 text-lg font-medium text-white break-words">
            {step.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/52 break-words">
            {step.description}
          </p>
          <p className="mt-5 border-l border-brand-light/45 pl-4 text-xs leading-5 text-white/72 break-words">
            {step.evidence}
          </p>
        </motion.article>
      ))}
    </div>
  );
}

function ComparisonTable({ copy }) {
  return (
    <div className="mt-12 overflow-hidden border-y border-white/12">
      <div className="hidden grid-cols-[0.72fr_1.2fr_1fr] gap-px bg-white/10 text-xs font-semibold uppercase tracking-[0.14em] text-white/40 sm:grid">
        <div className="bg-[#09090E] px-5 py-4">{copy.dimensionLabel}</div>
        <div className="bg-brand-faint px-5 py-4 text-brand-light">
          {copy.columns.aeronyx}
        </div>
        <div className="bg-[#09090E] px-5 py-4">{copy.columns.general}</div>
      </div>
      {copy.rows.map((row) => (
        <div
          key={row.dimension}
          className="grid min-w-0 border-b border-white/8 py-6 last:border-b-0 sm:grid-cols-[0.72fr_1.2fr_1fr] sm:gap-px sm:bg-white/8 sm:py-0"
        >
          <div className="min-w-0 bg-[#09090E] px-5 pb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/40 sm:py-5">
            {row.dimension}
          </div>
          <div className="min-w-0 bg-[#09090E] px-5 pb-4 text-sm leading-6 text-white/76 sm:bg-[#10101A] sm:py-5">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-light sm:hidden">
              {copy.columns.aeronyx}
            </span>
            <span className="break-words">{row.aeronyx}</span>
          </div>
          <div className="min-w-0 bg-[#09090E] px-5 text-sm leading-6 text-white/48 sm:py-5">
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

export default function PrivacyCoordination({ pageLocale = DEFAULT_LOCALE }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const activeLocale = router.locale || pageLocale || DEFAULT_LOCALE;
  const messages = getMessages(activeLocale);
  const copy = messages.privacyCoordination;
  const canonicalPath = buildLocalizedPath(activeLocale, '/privacy-coordination');
  const docsPath = 'https://docs.aeronyx.network/';
  const appPath = 'https://app.aeronyx.network/';

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
            </Container>
          </section>

          <section className="border-b border-white/8 py-20 sm:py-24 lg:py-32">
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

          <section className="border-b border-white/8 py-20 sm:py-24 lg:py-32">
            <Container>
              <motion.div {...fadeIn}>
                <SectionHeading
                  eyebrow={copy.boundaries.eyebrow}
                  title={copy.boundaries.title}
                  description={copy.boundaries.description}
                />
              </motion.div>
              <div className="mt-12 grid gap-8 border-y border-white/8 lg:grid-cols-2 lg:gap-16">
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

          <section className="border-b border-white/8 py-20 sm:py-24 lg:py-32">
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

          <section className="border-b border-white/8 py-20 sm:py-24 lg:py-32">
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

          <section className="border-b border-white/8 py-20 sm:py-24 lg:py-32">
            <Container>
              <motion.div {...fadeIn}>
                <SectionHeading
                  eyebrow={copy.progress.eyebrow}
                  title={copy.progress.title}
                  description={copy.progress.description}
                />
              </motion.div>
              <div className="mt-12 grid gap-px overflow-hidden rounded border border-white/10 bg-white/10 md:grid-cols-2">
                {copy.progress.items.map((item) => (
                  <article
                    key={item.title}
                    className="min-w-0 bg-[#0A0A10] px-6 py-7 sm:px-8"
                  >
                    <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                      item.status === 'live' ? 'text-brand-light' : 'text-white/36'
                    }`}>
                      {item.status === 'live'
                        ? copy.progress.deliveredLabel
                        : copy.progress.buildingLabel}
                    </p>
                    <h3 className="mt-4 text-lg font-medium text-white break-words">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/52 break-words">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
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
              <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
                {copy.faq.items.map((item, index) => (
                  <article
                    key={item.question}
                    className="grid min-w-0 gap-4 py-7 sm:grid-cols-[32px_0.78fr_1.22fr] sm:gap-6 sm:py-8"
                  >
                    <span className="font-mono text-xs text-white/28">
                      0{index + 1}
                    </span>
                    <h3 className="min-w-0 text-base font-medium leading-7 text-white break-words">
                      {item.question}
                    </h3>
                    <p className="min-w-0 text-sm leading-6 text-white/54 break-words">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
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
