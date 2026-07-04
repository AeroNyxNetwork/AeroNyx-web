/**
 * ============================================
 * File Creation/Modification Notes
 * ============================================
 * Creation Reason: Move the user-facing privacy network product story off the
 * homepage so the first page can focus on the AeroNyx protocol layer.
 * Modification Reason: v1.4 - North Star infrastructure narrative.
 *   Added the North Star Plan as the engineering covenant for the Privacy
 *   Network: more private, open source, globally usable, and built on Rust
 *   node infrastructure that can stand up to public audit and real operation.
 *   The hero assurance panel now animates vertically to avoid transient
 *   horizontal overflow on iPhone-class screens.
 *
 * Historical Notes:
 * v1.3 - Privacy Network narrative cleanup.
 *   Renames the active header/background/download section dependencies away
 *   from legacy AIL/VPN implementation names. Visible copy stays focused on
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
 *   3. State the North Star engineering covenant for Rust node infrastructure.
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
 * ============================================
 */

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
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

const protectionSignals = [
  {
    title: 'Your IP is masked',
    description: 'User traffic exits through privacy nodes instead of exposing the local network address to destinations.',
  },
  {
    title: 'Traffic travels encrypted',
    description: 'The page shows aggregate encrypted bytes and packets, never destinations, URLs, DNS contents, or browsing history.',
  },
  {
    title: 'Node health is aggregate-only',
    description: 'Public health surfaces show protocol readiness and encrypted relay evidence without user-level telemetry.',
  },
  {
    title: 'Built for humans and agents',
    description: 'The same privacy boundary supports people, apps, and autonomous agents coordinating through blind protocol primitives.',
  },
];

const northStarPrinciples = [
  {
    label: '01',
    title: 'More private by default',
    description:
      'The protocol boundary is blind first: nodes route encrypted operations and expose aggregate health, not user destinations, payloads, DNS contents, or browsing history.',
  },
  {
    label: '02',
    title: 'Open source infrastructure',
    description:
      'Rust node software, protocol surfaces, and operational assumptions should be inspectable so the network earns trust through review, not brand promises.',
  },
  {
    label: '03',
    title: 'Built for global use',
    description:
      'Independent nodes across regions should be able to join, recover, report health safely, and keep the network usable for humans, apps, and autonomous agents.',
  },
];

const privacyBoundaries = [
  'No packet payloads',
  'No DNS contents',
  'No domains or URLs',
  'No browsing history',
  'No node public keys on public cards',
  'No wallet-level traffic graph',
];

export default function PrivacyNetworkPage() {
  const { locale } = useRouter();
  const activeLocale = locale || DEFAULT_LOCALE;
  const canonicalPath = activeLocale === DEFAULT_LOCALE ? '/privacy-network' : `/${activeLocale}/privacy-network`;
  const copy = getMessages(activeLocale);
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
        title="AeroNyx Privacy Network | More private, open-source, global routing"
        description="AeroNyx Privacy Network is a more private, open-source network for global use, built on auditable Rust node infrastructure and a blind protocol boundary."
        canonicalUrl={`https://aeronyx.network${canonicalPath}`}
        keywords={[
          'AeroNyx Privacy Network',
          'AeroNyx Privacy Protocol',
          'open source privacy network',
          'Rust privacy infrastructure',
          'private routing',
          'encrypted routing',
          'blind relay network',
          'privacy-safe network stats',
          'AI agent privacy routing',
        ]}
      />

      <Suspense fallback={<div className="fixed inset-0" style={{ background: 'var(--surface-0, #08080D)' }} />}>
        <ProtocolBackground />
      </Suspense>

      <SiteHeader />

      <main className="relative z-10 pt-24 md:pt-32">
        <Hero />
        <NorthStarPlan />
        <LiveProtocolStats stats={stats} isLoading={isLoading} copy={copy} healthPercent={healthPercent} />
        <ProtectionSignals />
        <PrivacyBoundary />
        <PrivacyAccessSection />
      </main>

      <Footer />
    </>
  );
}

const Hero = () => (
  <section className="pb-12 md:pb-24">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="inline-flex items-center gap-2 border border-brand-line bg-brand-faint px-3 py-1.5 text-[10px] uppercase tracking-eyebrow text-brand-light">
            More private. Open source. Global.
          </div>
          <h1 className="mt-6 max-w-4xl text-display-xl font-light text-white">
            A more private, open source network for global use.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/62 md:text-xl">
            AeroNyx Privacy Network lets humans, apps, and autonomous agents route
            traffic through encrypted protocol nodes without turning public
            observability into user surveillance. The Rust node layer is built as
            real privacy infrastructure: auditable, blind by default, and designed
            to run across independent operators worldwide.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#privacy-access"
              className="inline-flex min-h-[44px] items-center justify-center bg-white px-6 py-3 text-center text-xs uppercase leading-none tracking-eyebrow text-black transition-colors hover:bg-white/90 md:text-sm"
            >
              Get Privacy Network
            </a>
            <a
              href="#protocol-stats"
              className="inline-flex min-h-[44px] items-center justify-center border border-white/10 px-6 py-3 text-center text-xs uppercase leading-none tracking-eyebrow text-white/60 transition-colors hover:border-brand-line hover:text-white md:text-sm"
            >
              View protocol health
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className="page-surface border p-4 md:p-5"
        >
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-[10px] uppercase tracking-eyebrow text-white/36">connection assurance</span>
            <span className="border border-brand-line bg-brand-faint px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-brand-light">protected</span>
          </div>
          <div className="space-y-4">
            {['Encrypted route established', 'Public IP hidden', 'Open Rust node foundation', 'Protocol health verified'].map((item) => (
              <div key={item} className="flex items-center justify-between gap-4 border border-white/10 bg-white/[0.025] p-4">
                <span className="min-w-0 text-sm text-white/70">{item}</span>
                <span className="h-2.5 w-2.5 rounded-pill bg-brand-light shadow-[0_0_12px_rgba(151,136,247,0.75)]" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Container>
  </section>
);

const NorthStarPlan = () => (
  <section className="border-y border-white/10 bg-white/[0.012] py-14 md:py-20">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">North Star Plan</div>
          <h2 className="mt-3 text-display-md font-light text-white">
            Rust nodes that can survive global audit and real operation.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/58 md:text-lg">
            The Privacy Network is not a closed app feature. It is the public
            operating surface for AeroNyx's blind protocol: open Rust nodes,
            privacy-safe telemetry, signed peer state, restart recovery, and
            route evidence that can be inspected without exposing users.
          </p>
        </motion.div>

        <div className="grid gap-3">
          {northStarPrinciples.map((item, index) => (
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
                  <h3 className="text-xl font-light text-white">{item.title}</h3>
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

const LiveProtocolStats = ({ stats, isLoading, copy, healthPercent }) => {
  const metrics = [
    {
      label: 'Encrypted traffic',
      description: 'Total encrypted payload bytes relayed by AeroNyx protocol nodes.',
      liveValue: stats.encryptedTrafficBytes,
      fallback: stats.encryptedTraffic,
      suffix: copy.join.stats.bytesUnit,
      defaultStep: 1024,
    },
    {
      label: 'Encrypted packets',
      description: 'Encrypted protocol packets forwarded for routing, messaging, memory, and agent coordination.',
      liveValue: stats.encryptedMessagesRaw,
      fallback: stats.encryptedMessages,
      suffix: copy.join.stats.packetsUnit,
      defaultStep: 1,
    },
    {
      label: 'Protocol health',
      description: 'Readiness score from aggregate protocol foundation checks.',
      fallback: `${healthPercent}%`,
      suffix: 'ready',
    },
  ];

  return (
    <section id="protocol-stats" className="border-y border-white/10 bg-white/[0.015] py-14 md:py-20">
      <Container>
        <div className="mb-10 max-w-3xl">
          <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">AeroNyx Privacy Protocol</div>
          <h2 className="mt-3 text-display-md font-light text-white">A dashboard users can trust.</h2>
          <p className="mt-4 text-base leading-relaxed text-white/58 md:text-lg">
            The product shows enough to feel protected without exposing who users are,
            where they go, or what they send.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {metrics.map((item) => (
            <article key={item.label} className="page-card min-w-0 border p-4 md:p-5">
              <div className="min-h-[3rem] font-light text-white">
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
              <div className="mt-3 text-[10px] uppercase tracking-eyebrow text-white/42">{item.label}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/48">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

const ProtectionSignals = () => (
  <section className="py-14 md:py-20">
    <Container>
      <div className="mb-10 max-w-3xl">
        <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">User-facing assurance</div>
        <h2 className="mt-3 text-display-md font-light text-white">Show protection, not debug counters.</h2>
        <p className="mt-4 text-base leading-relaxed text-white/58 md:text-lg">
          Privacy products should make users feel protected every time they open
          the app. The interface should prioritize clear status over raw node internals.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {protectionSignals.map((item) => (
          <article key={item.title} className="page-card border p-4 md:p-5">
            <h2 className="text-xl font-light text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/56">{item.description}</p>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

const PrivacyBoundary = () => (
  <section className="border-y border-white/10 bg-black/40 py-14 md:py-20">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="text-[10px] uppercase tracking-eyebrow text-brand-light">Public telemetry boundary</div>
          <h2 className="mt-3 text-display-md font-light text-white">Aggregate health only.</h2>
          <p className="mt-4 text-base leading-relaxed text-white/58">
            The public website can show encrypted traffic, encrypted packets, relay
            evidence, and protocol readiness. It must never become a user surveillance surface.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {privacyBoundaries.map((item) => (
            <div key={item} className="page-card border p-4 text-sm text-white/62">
              {item}
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);
