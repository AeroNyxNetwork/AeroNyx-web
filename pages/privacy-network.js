/**
 * ============================================
 * privacy-network.js — the Privacy Network product page (Nightglass pass)
 * ============================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] Rebuilt to the same grammar and the
 * same plain register as the homepage.
 *
 * What it was: ten sections reading out of lib/i18n `privacyNetworkPage` and
 * `vpn` — Hero, TrustModelComparison, ProtocolContinuity, NorthStarPlan,
 * LiveProtocolStats, AssuranceModel, ProtectionSignals, PrivacyBoundary, FAQ
 * and the access section. Accurate, and written in a vocabulary
 * ("auditable decentralized node boundary", "user-level telemetry",
 * "signed capabilities", "aggregate health evidence") that only reads to
 * someone already inside the project. Several sections also said the same
 * thing to each other in slightly different words.
 *
 * What it is now, in the order a person actually asks the questions:
 *   1. PrivacyAccessSection — what it is, four reasons, and a phone whose
 *      switch you can throw                                 [#privacy-access]
 *   2. HowPrivate    — two hops, and what each one can see   [#how-it-works]
 *   3. NotAVpn       — the comparison people arrive wanting
 *   4. NetworkProof  — the network's real, aggregate-only numbers, shared
 *      with the homepage rather than reimplemented           [#protocol-stats]
 *   5. Limits        — what it does NOT do
 *   6. Faq           — four straight answers, plus FAQPage structured data
 *   7. ClosingCta    — the same closing band as the homepage
 *
 * `limits` is not a hedge, it is the argument: public/llms.txt commits us to
 * never implying AeroNyx removes every metadata risk, and a privacy page that
 * lists only strengths is exactly the kind of page nobody should believe.
 *
 * Anchors kept: #privacy-access (referenced by components/ui/SEO.js
 * structured data as downloadUrl), #protocol-stats, #privacy-network-faq.
 * Dropped: #north-star-plan — nothing in this repo linked to it here, and the
 * covenant band lives on the homepage.
 *
 * Copy: lib/i18n-privacy-network.js for this page's own sections,
 * lib/i18n-nightglass.js for the pieces shared with the homepage. lib/i18n is
 * untouched and still serves the header, footer and DownloadsModal.
 * ============================================
 */

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import SEO from '../components/ui/SEO';
import Container from '../components/ui/Container';
import SiteHeader from '../components/layout/SiteHeader';
import Footer from '../components/layout/Footer';
import RouteDiagram from '../components/ui/RouteDiagram';
import NetworkProof from '../components/sections/NetworkProof';
import ClosingCta from '../components/sections/ClosingCta';
import PrivacyAccessSection from '../components/sections/PrivacyAccessSection';
import useReducedMotion from '../lib/hooks/useReducedMotion';
import { DEFAULT_LOCALE, getMessages } from '../lib/i18n';
import { getNightglassCopy } from '../lib/i18n-nightglass';
import { getPrivacyNetworkCopy } from '../lib/i18n-privacy-network';

const ProtocolBackground = dynamic(
  () => import('../components/ui/ProtocolBackground'),
  {
    ssr: false,
    suspense: true,
    loading: () => <div className="fixed inset-0" style={{ background: 'var(--surface-0, #06060E)' }} />,
  }
);

const buildFaqStructuredData = (faqCopy, canonicalUrl) => {
  const items = Array.isArray(faqCopy?.items) ? faqCopy.items : [];
  const mainEntity = items
    .map((item) => {
      const question = String(item.q || '').trim();
      const answer = String(item.a || '').trim();
      if (!question || !answer) return null;
      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      };
    })
    .filter(Boolean);

  if (mainEntity.length === 0) return null;

  return {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity,
  };
};

export default function PrivacyNetworkPage() {
  const { locale } = useRouter();
  const activeLocale = locale || DEFAULT_LOCALE;
  const canonicalPath = activeLocale === DEFAULT_LOCALE ? '/privacy-network' : `/${activeLocale}/privacy-network`;
  const canonicalUrl = `https://aeronyx.network${canonicalPath}`;

  const messages = getMessages(activeLocale);
  const ng = getNightglassCopy(activeLocale);
  const pn = getPrivacyNetworkCopy(activeLocale);
  const faqStructuredData = buildFaqStructuredData(pn.faq, canonicalUrl);

  return (
    <>
      <SEO
        title={pn.seo.title}
        description={pn.seo.description}
        canonicalUrl={canonicalUrl}
        ogImageAlt={ng.seo.ogAlt}
        keywords={ng.seo.keywords}
        extraStructuredData={faqStructuredData}
      />

      <Suspense fallback={<div className="fixed inset-0" style={{ background: 'var(--surface-0, #06060E)' }} />}>
        <ProtocolBackground />
      </Suspense>

      <SiteHeader />

      <main className="relative z-10 overflow-x-hidden pt-20 md:pt-24">
        <PrivacyAccessSection />
        <HowPrivate copy={pn.how} />
        <NotAVpn copy={pn.vs} />
        <div id="protocol-stats" className="scroll-mt-20 md:scroll-mt-24">
          <NetworkProof copy={ng} messages={messages} locale={activeLocale} />
        </div>
        <Limits copy={pn.limits} />
        <Faq copy={pn.faq} />
        <ClosingCta copy={ng} />
      </main>

      <Footer activeLocale={activeLocale} />
    </>
  );
}

/* Two hops, and what each one can see. The diagram is the same SVG the
   homepage uses, relabelled: here the far end is a site, not a person. */
const HowPrivate = ({ copy }) => {
  const reduced = useReducedMotion();
  return (
    <section id="how-it-works" className="ng-section scroll-mt-20 md:scroll-mt-24" style={{ background: 'var(--surface-0)' }}>
      <Container>
        <div className="ng-section-head mx-auto max-w-2xl text-center">
          <p className="ng-eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-5 text-white">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/58">{copy.description}</p>
        </div>

        <div className="ng-surface mx-auto mt-12 max-w-6xl overflow-hidden">
          <div className="border-b border-white/[0.07] px-4 pb-2 pt-6 md:px-10 md:pt-8">
            <RouteDiagram labels={copy.diagram} reduced={reduced} />
          </div>
          <ol className="grid md:grid-cols-3">
            {copy.steps.map((step, i) => (
              <li
                key={step.title}
                className={`p-6 md:p-8 ${i < copy.steps.length - 1 ? 'border-b border-white/[0.07] md:border-b-0 md:border-r' : ''}`}
              >
                <div className="ng-display text-[12px] text-[#A594FF]">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-3 text-[1.05rem] font-semibold leading-snug text-white" style={{ letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/58">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mx-auto mt-6 max-w-3xl px-1 text-center text-xs leading-relaxed text-white/45">{copy.note}</p>
      </Container>
    </section>
  );
};

/* The comparison people arrive wanting. Two columns, deliberately unequal in
   emphasis but equal in structure, so the difference is the content. */
const NotAVpn = ({ copy }) => (
  <section className="ng-section" style={{ background: 'var(--surface-1)' }}>
    <Container>
      <div className="ng-section-head mx-auto max-w-2xl text-center">
        <p className="ng-eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-5 text-white">{copy.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/58">{copy.description}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
        {[
          { side: copy.them, tone: 'them' },
          { side: copy.us, tone: 'us' },
        ].map(({ side, tone }) => (
          <div
            key={side.title}
            className="rounded-ng-lg p-6 md:p-8"
            style={tone === 'us'
              ? { background: 'rgba(116,98,247,0.07)', border: '1px solid rgba(165,148,255,0.28)' }
              : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h3
              className="text-[1.05rem] font-semibold text-white"
              style={{ letterSpacing: '-0.01em', color: tone === 'us' ? '#fff' : 'rgba(255,255,255,0.72)' }}
            >
              {side.title}
            </h3>
            <ul className="mt-5 grid gap-3.5">
              {side.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: tone === 'us' ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.55)' }}>
                  <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-pill" style={{ background: tone === 'us' ? '#A594FF' : 'rgba(255,255,255,0.3)' }} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

/* The edges, said out loud. */
const Limits = ({ copy }) => (
  <section className="ng-section" style={{ background: 'var(--surface-0)' }}>
    <Container>
      <div className="ng-section-head mx-auto max-w-2xl text-center">
        <p className="ng-eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-5 text-white">{copy.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/58">{copy.description}</p>
      </div>

      <ul className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3">
        {copy.items.map((item) => (
          <li key={item.title} className="ng-card p-6">
            <h3 className="text-[1rem] font-semibold leading-snug text-white" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-white/58">{item.body}</p>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);

/* Native <details>: keyboard-operable and open-able with JavaScript off, and
   the answers are in the DOM either way for crawlers. The first is open so
   the section is not a wall of closed rows at rest. */
const Faq = ({ copy }) => (
  <section id="privacy-network-faq" className="ng-section scroll-mt-20 md:scroll-mt-24" style={{ background: 'var(--surface-1)' }}>
    <Container>
      <div className="ng-section-head mx-auto max-w-2xl text-center">
        <p className="ng-eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-5 text-white">{copy.title}</h2>
      </div>

      <div className="ng-surface mx-auto mt-12 max-w-3xl overflow-hidden">
        {copy.items.map((item, i) => (
          <details
            key={item.q}
            open={i === 0}
            className={`ng-faq group ${i < copy.items.length - 1 ? 'border-b border-white/[0.07]' : ''}`}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[0.95rem] font-semibold text-white md:px-8">
              {item.q}
              <span className="ng-faq-mark shrink-0 text-[#A594FF]" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p className="px-6 pb-6 text-sm leading-relaxed text-white/58 md:px-8">{item.a}</p>
          </details>
        ))}
      </div>
    </Container>
  </section>
);
