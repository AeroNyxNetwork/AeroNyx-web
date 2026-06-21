/**
 * ============================================
 * index.js - Homepage with MemChain Integration
 * ============================================
 * 
 * Modification Reason: v4.0 - Added MemChainShowcase section between
 * ProductsEcosystem and VPNDownloadSection. Narrative flow now includes
 * the AI memory story as a killer app demonstration.
 * 
 * Section Order (v4.0):
 * 1. NarrativeHero      — "Infrastructure AI Agents Can Use"
 * 2. ProblemStatement    — AI paradox (accounts, payments, memory lock-in)
 * 3. X402Showcase        — x402 protocol solution
 * 4. HowAILWorks         — Technical deep-dive
 * 5. JoinNetwork         — Node operator CTA
 * 6. ProductsEcosystem   — 5 products (VPN, Compute, CDN, Network, MemChain)
 * 7. MemChainShowcase    — 🌟 NEW: Deep dive into AI Memory Chain
 * 8. VPNDownloadSection  — Download CTA
 * 9. FutureVision        — Roadmap
 * 10. SophisticatedCTA   — Final conversion
 * 
 * Last Modified: v4.0 - Added MemChainShowcase
 * Last Modified: v4.1 - Added privacy-safe protocol network_story card sourced
 * from Rust peer discovery summaries and the backend public aggregate endpoint.
 * ============================================
 */

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// Import SEO component
import SEO from '../components/ui/SEO';
import Container from '../components/ui/Container';
import AnimatedMessageCounter from '../components/ui/AnimatedMessageCounter';
import { DEFAULT_LOCALE, getMessages } from '../lib/i18n';
import useNetworkStats from '../lib/hooks/useNetworkStats';

// Import custom header
import AILHeader from '../components/layout/AILHeader';

// Import the enhanced background with constellations
const MinimalAILBackground = dynamic(
  () => import('../components/ui/MinimalAILBackground'), 
  { 
    ssr: false, 
    suspense: true,
    loading: () => <div className="fixed inset-0 bg-black" />
  }
);

// Import sections
import NarrativeHero from '../components/sections/NarrativeHero';
import ProblemStatement from '../components/sections/ProblemStatement';
import X402Showcase from '../components/sections/X402Showcase';
import HowAILWorks from '../components/sections/HowAILWorks';
import JoinNetwork from '../components/sections/JoinNetwork';
import ProductsEcosystem from '../components/sections/ProductsEcosystem';
import MemChainShowcase from '../components/sections/MemChainShowcase';
import VPNDownloadSection from '../components/sections/VPNDownloadSection';
import FutureVision from '../components/sections/FutureVision';
import SophisticatedCTA from '../components/sections/SophisticatedCTA';
import Footer from '../components/layout/Footer';

export default function Home() {
  const { locale } = useRouter();
  const activeLocale = locale || DEFAULT_LOCALE;
  const copy = getMessages(activeLocale);
  const canonicalPath = activeLocale === DEFAULT_LOCALE ? '' : `/${activeLocale}`;
  const { stats, isLoading } = useNetworkStats({
    period: '30d',
    autoRefresh: true,
    refreshInterval: 30000
  });

  return (
    <>
      <SEO 
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalUrl={`https://aeronyx.network${canonicalPath}/`}
        ogImage="https://binary.aeronyx.network/aeronyx_logo.png"
        keywords={copy.seo.keywords}
      />
      
      {/* Enhanced background with constellations */}
      <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
        <MinimalAILBackground />
      </Suspense>
      
      {/* Custom header */}
      <AILHeader />
      
      {/* Main content */}
      <main className="relative z-10">
        {/* 1. Opening narrative */}
        <NarrativeHero />

        <HomeNetworkStats stats={stats} isLoading={isLoading} copy={copy} />
        
        {/* 2. Problem Statement — AI infrastructure paradox */}
        <ProblemStatement />
        
        {/* 3. X402 Showcase — the payment solution */}
        <X402Showcase />
        
        {/* 4. How it works — technical deep-dive */}
        <HowAILWorks />
        
        {/* 5. Join the network */}
        <JoinNetwork />
        
        {/* 6. Products ecosystem (now includes MemChain as 5th product) */}
        <ProductsEcosystem />
        
        {/* 7. 🌟 NEW: MemChain deep-dive — the killer app */}
        <MemChainShowcase />
        
        {/* 8. VPN download section */}
        <VPNDownloadSection />
        
        {/* 9. Vision for the future */}
        <FutureVision />
        
        {/* 10. Call to action */}
        <SophisticatedCTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}

const formatCompactCount = (value) => (
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
);

const protocolStatusTone = (status) => {
  if (['healthy', 'peer_view_ready', 'relay_ready', 'onion_ready'].includes(status)) return 'border-green-400/30 bg-green-400/10 text-green-200';
  if (['degraded', 'attention'].includes(status)) return 'border-yellow-400/30 bg-yellow-400/10 text-yellow-200';
  return 'border-white/15 bg-white/5 text-white/60';
};

const formatBlockerSummary = (blockerCounts) => {
  const entries = Object.entries(blockerCounts || {})
    .filter(([, count]) => Number(count) > 0)
    .sort((left, right) => Number(right[1]) - Number(left[1]) || left[0].localeCompare(right[0]))
    .slice(0, 2);

  return entries
    .map(([key, count]) => `${key.replace(/_/g, ' ')} ${formatCompactCount(count)}`)
    .join(' · ');
};

const HomeNetworkStats = ({ stats, isLoading, copy }) => {
  // Live homepage counters are sourced from:
  //   GET /api/privacy_network/vpn/public/network-stats/
  // Backend:
  //   /root/aeronyx/privacy_network/api/vpn_observability.py
  // Rust packet/traffic sources:
  //   /root/open/AeroNyx/crates/aeronyx-server/src/api/vpn_health.rs
  //   /root/open/AeroNyx/crates/aeronyx-server/src/handlers/packet.rs
  const items = [
    {
      label: copy.join.stats.encryptedTraffic,
      description: copy.join.stats.encryptedTrafficDescription,
      value: stats.encryptedTraffic,
      liveValue: stats.encryptedTrafficBytes,
      isLiveCounter: true,
      suffix: copy.join.stats.bytesUnit,
      defaultStep: 1024,
    },
    {
      label: copy.join.stats.encryptedMessages,
      description: copy.join.stats.encryptedMessagesDescription,
      value: stats.encryptedMessages,
      liveValue: stats.encryptedMessagesRaw,
      isLiveCounter: true,
      suffix: copy.join.stats.packetsUnit,
      defaultStep: 1,
    },
  ];
  const protocolCopy = copy.homeStats.protocol;
  const protocolStatusLabel = (
    protocolCopy.statusLabels[stats.protocolStatus]
    || protocolCopy.statusLabels.syncing
  );
  const localRelayStatusLabel = (
    protocolCopy.localRelayStatusLabels?.[stats.protocolLocalRelayStatus]
    || protocolCopy.localRelayStatusLabels?.syncing
    || copy.homeStats.syncing
  );
  const networkStoryStatusLabel = (
    protocolCopy.networkStoryStatusLabels?.[stats.protocolNetworkStoryStatus]
    || protocolCopy.networkStoryStatusLabels?.syncing
    || copy.homeStats.syncing
  );
  const recoverySources = (stats.protocolRecoverySources || [])
    .map((source) => protocolCopy.recoverySources[source] || source.replace(/_/g, ' '))
    .join(' · ');
  const localRelayBlockers = formatBlockerSummary(stats.protocolLocalRelayBlockerCounts);
  const localRelayDetail = localRelayBlockers
    ? `${localRelayStatusLabel} · ${localRelayBlockers}`
    : `${localRelayStatusLabel} · safe ${formatCompactCount(stats.protocolLocalRelaySafeToAdvertiseNodes)} / ${formatCompactCount(stats.protocolReportedNodes)} · runtime ${formatCompactCount(stats.protocolLocalRelayRuntimeReadyNodes)} / ${formatCompactCount(stats.protocolReportedNodes)}`;
  const protocolCards = [
    {
      label: protocolCopy.networkStory,
      value: networkStoryStatusLabel,
      detail: protocolCopy.networkStoryDetail
        .replace('{nodes}', formatCompactCount(stats.protocolNetworkStoryReportedNodes))
        .replace('{valid}', formatCompactCount(stats.protocolNetworkStoryMaxValidNodes))
        .replace('{relays}', formatCompactCount(stats.protocolNetworkStoryMaxRouteableChatRelays))
        .replace('{onion}', formatCompactCount(stats.protocolNetworkStoryMaxRouteableOnionHops)),
      tone: protocolStatusTone(stats.protocolNetworkStoryStatus),
    },
    {
      label: protocolCopy.mesh,
      value: `${formatCompactCount(stats.protocolHealthyNodes)} / ${formatCompactCount(stats.protocolReportedNodes)}`,
      detail: protocolCopy.meshDetail,
    },
    {
      label: protocolCopy.peerSync,
      value: formatCompactCount(stats.protocolValidPeerCount),
      detail: protocolCopy.peerSyncDetail,
    },
    {
      label: protocolCopy.localRelay,
      value: `${formatCompactCount(stats.protocolLocalRelaySafeToAdvertiseNodes)} / ${formatCompactCount(stats.protocolReportedNodes)}`,
      detail: localRelayDetail,
    },
    {
      label: protocolCopy.restartRecovery,
      value: `${formatCompactCount(stats.protocolCacheRecoveredNodes)} / ${formatCompactCount(stats.protocolReportedNodes)}`,
      detail: recoverySources || protocolCopy.recoveryPending,
    },
    {
      label: protocolCopy.memoryChain,
      value: protocolCopy.memoryChainMode,
      detail: protocolCopy.memoryChainDetail,
    },
  ];

  return (
    <section aria-label={copy.homeStats.ariaLabel} className="relative z-20 -mt-6 md:-mt-10 pb-10 md:pb-16">
      <Container>
        <div className="mx-auto max-w-6xl border border-white/10 bg-black/70 backdrop-blur-md">
          <div className="grid gap-0 xl:grid-cols-[0.8fr_2.2fr]">
            <div className="border-b border-white/10 p-5 md:p-6 xl:border-b-0 xl:border-r">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-green-300">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_16px_rgba(74,222,128,0.75)]" />
                {copy.homeStats.eyebrow}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {copy.homeStats.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {items.map((item) => (
                <div key={item.label} className="min-w-0 border-t border-white/10 p-5 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0 md:p-6">
                  <div className="min-h-[2.65rem] min-w-0 font-light text-white">
                    {isLoading ? (
                      <span className="block h-8 w-28 animate-pulse bg-white/10" />
                    ) : item.isLiveCounter ? (
                      <AnimatedMessageCounter
                        value={item.liveValue}
                        fallback={item.value || copy.homeStats.syncing}
                        suffix={item.suffix}
                        pulseLabel={copy.homeStats.lastSync}
                        defaultStep={item.defaultStep}
                      />
                    ) : (
                      item.value || copy.homeStats.syncing
                    )}
                  </div>
                  <div className="mt-2 min-h-[2.5rem] text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/40 md:text-xs">
                    {item.label}
                  </div>
                  <p className="mt-2 max-w-[34rem] text-xs leading-relaxed text-white/45 md:text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 p-5 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] ${protocolStatusTone(stats.protocolStatus)}`}>
                    {protocolStatusLabel}
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-white/35">
                    {protocolCopy.eyebrow}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {protocolCopy.description}
                </p>
              </div>
              <div className="grid w-full gap-2 sm:grid-cols-2 lg:max-w-3xl xl:grid-cols-6">
                {protocolCards.map((item) => (
                  <div key={item.label} className="min-w-0 border border-white/10 bg-white/[0.025] p-3">
                    <div className={`truncate text-lg font-light md:text-xl ${item.tone ? `rounded-sm border px-2 py-1 text-sm uppercase tracking-[0.12em] ${item.tone}` : 'text-white'}`}>
                      {isLoading ? (
                        <span className="block h-6 w-16 animate-pulse bg-white/10" />
                      ) : (
                        item.value || copy.homeStats.syncing
                      )}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40">
                      {item.label}
                    </div>
                    <p className="mt-2 text-[11px] leading-4 text-white/35">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
