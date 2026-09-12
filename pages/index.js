/**
 * ============================================
 * index.js - Homepage, product-led (Nightglass pass)
 * ============================================
 * [NIGHTGLASS-WEB 2026-09-12 by Claude] Section order:
 *   1. NightglassHero       — the claim, the Product Lens, the live proof strip
 *   2. NetworkProof         — five privacy-safe aggregates (traffic, packets,
 *                             nodes, route readiness, verifiable blind ledger)
 *   3. OneKey               — messages / confidential AI / wallet, one key
 *   4. VisibilityLedger     — what each layer can see
 *   5. NorthStarBand        — the covenant (#north-star-plan kept)
 *   6. ProtocolArchitecture — how it works (#how-it-works kept)
 *   7. JoinNetwork          — run a node (#join-network)
 *   8. FutureVision         — roadmap (#vision)
 *   9. SophisticatedCTA     — final conversion
 *
 * Kept from v6.x: getStaticProps({ locale }) → pageLocale, explicit
 * activeLocale propagation into the locale-aware sections and the footer,
 * and the SEO component contract (canonical + hreflang live in SEO.js).
 *
 * What left this page: NarrativeHero (protocol-first headline, eye canvas,
 * mock agent), HomeNetworkStats (readiness diagnostics on the front page —
 * its ledger evidence moved into NetworkProof), CorePrimitives and
 * ProductsEcosystem (their content lives on /privacy-network and /memchain,
 * which stay and are linked from OneKey and the nav). Rationale, the VC read
 * and the type/color decisions: docs/nightglass-web-brief.md.
 *
 * Copy for the new sections: lib/i18n-nightglass.js (7 locales, deep-merged
 * over English). Existing sections keep reading lib/i18n.
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
import ProtocolArchitecture from '../components/sections/ProtocolArchitecture';
import JoinNetwork from '../components/sections/JoinNetwork';
import FutureVision from '../components/sections/FutureVision';
import SophisticatedCTA from '../components/sections/SophisticatedCTA';

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
        keywords={messages.seo.keywords}
      />

      <Suspense fallback={<div className="fixed inset-0" style={{ background: 'var(--surface-0, #06060E)' }} />}>
        <ProtocolBackground />
      </Suspense>

      <SiteHeader />

      <main className="relative z-10">
        <NightglassHero copy={copy} messages={messages} />
        <NetworkProof copy={copy} messages={messages} locale={activeLocale} />
        <OneKey copy={copy} locale={activeLocale} />
        <VisibilityLedger copy={copy} messages={messages} />
        <NorthStarBand messages={messages} />
        <ProtocolArchitecture activeLocale={activeLocale} />
        <JoinNetwork activeLocale={activeLocale} />
        <FutureVision activeLocale={activeLocale} />
        <SophisticatedCTA />
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
