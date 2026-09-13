/**
 * ============================================
 * index.js - Homepage, product-led (Nightglass pass)
 * ============================================
 * [NIGHTGLASS-WEB 2026-09-12 by Claude] Section order:
 *   1. NightglassHero   — the claim, the Product Lens, the live proof strip
 *   2. NetworkProof     — privacy-safe network totals (traffic, packets,
 *                         nodes, private routes, verifiable ledger)
 *   3. OneKey           — messages / private AI / wallet, one key
 *   4. VisibilityLedger — who sees what (#visibility)
 *   5. NorthStarBand    — the covenant (#north-star-plan kept)
 *   6. HowItWorks       — sealed → carried → opened (#how-it-works kept)
 *   7. RunANode         — install / carry / watch (#join-network kept)
 *   8. Roadmap          — 2026 / 2028 / 2030 in plain words (#vision kept)
 *   9. ClosingCta       — download / docs / talk to us
 *
 * 2026-09-13: sections 6–9 replaced ProtocolArchitecture, JoinNetwork,
 * FutureVision and SophisticatedCTA. Those read protocol vocabulary out of
 * lib/i18n and JoinNetwork carried a four-step slideshow (orbiting dots,
 * rotating ring, random background lines, height jumps on step change).
 * The new sections speak the same plain register as the hero and read from
 * lib/i18n-nightglass; the anchors the header and the hero rely on are kept.
 *
 * Kept from v6.x: getStaticProps({ locale }) → pageLocale, explicit
 * activeLocale propagation into the locale-aware sections and the footer,
 * and the SEO component contract (canonical + hreflang live in SEO.js).
 * Rationale, the VC read and the type/color decisions:
 * docs/nightglass-web-brief.md.
 * ============================================
 */

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import SEO from '../components/ui/SEO';
import SiteHeader from '../components/layout/SiteHeader';
import Footer from '../components/layout/Footer';
import { DEFAULT_LOCALE, getMessages } from '../lib/i18n';
import { getNightglassCopy } from '../lib/i18n-nightglass';

import NightglassHero from '../components/sections/NightglassHero';
import NetworkProof from '../components/sections/NetworkProof';
import OneKey from '../components/sections/OneKey';
import VisibilityLedger from '../components/sections/VisibilityLedger';
import NorthStarBand from '../components/sections/NorthStarBand';
import HowItWorks from '../components/sections/HowItWorks';
import RunANode from '../components/sections/RunANode';
import Roadmap from '../components/sections/Roadmap';
import ClosingCta from '../components/sections/ClosingCta';

const ProtocolBackground = dynamic(
  () => import('../components/ui/ProtocolBackground'),
  {
    ssr: false,
    suspense: true,
    loading: () => <div className="fixed inset-0" style={{ background: 'var(--surface-0, #06060E)' }} />,
  }
);

export default function Home({ pageLocale = DEFAULT_LOCALE }) {
  const { locale } = useRouter();
  const activeLocale = pageLocale || locale || DEFAULT_LOCALE;
  const messages = getMessages(activeLocale);
  const copy = getNightglassCopy(activeLocale);
  const canonicalPath = activeLocale === DEFAULT_LOCALE ? '' : `/${activeLocale}`;

  return (
    <>
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalUrl={`https://aeronyx.network${canonicalPath}/`}
        ogImageAlt={copy.seo.ogAlt}
        keywords={copy.seo.keywords}
      />

      <Suspense fallback={<div className="fixed inset-0" style={{ background: 'var(--surface-0, #06060E)' }} />}>
        <ProtocolBackground />
      </Suspense>

      <SiteHeader />

      <main className="relative z-10">
        <NightglassHero copy={copy} messages={messages} />
        <NetworkProof copy={copy} messages={messages} locale={activeLocale} />
        <OneKey copy={copy} locale={activeLocale} />
        <VisibilityLedger copy={copy} />
        <NorthStarBand copy={copy} />
        <HowItWorks copy={copy} />
        <RunANode copy={copy} />
        <Roadmap copy={copy} />
        <ClosingCta copy={copy} />
      </main>

      <Footer activeLocale={activeLocale} />
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
