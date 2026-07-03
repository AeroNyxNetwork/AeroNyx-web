/**
 * ============================================
 * index.js - Homepage with Encrypted Coordination Layer Narrative
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
 * 7. MemChainShowcase    — Deep dive into AI Memory Chain
 * 8. VPNDownloadSection  — Download CTA
 * 9. FutureVision        — Roadmap
 * 10. SophisticatedCTA   — Final conversion
 *
 * Last Modified: v4.0 - Added MemChainShowcase
 * Last Modified: v4.1 - Added privacy-safe protocol network_story card sourced
 * from Rust peer discovery summaries and the backend public aggregate endpoint.
 * Last Modified: v4.2 - Added peer lifecycle activity sourced from
 * protocol_status.peer_store.peer_lifecycle. The homepage shows aggregate
 * accepted/refreshed/rejected peer events only, never node IDs, endpoints,
 * routes, public keys, encrypted payloads, or social graph edges.
 * Last Modified: v4.3 - Replaced the crowded seven-column protocol debug
 * cards with a compact signed peer fabric panel. The homepage now shows a
 * single protocol story with four readable metrics and a node-link visual.
 * Last Modified: v4.4 - Added public blind relay proof display sourced from
 * protocol_status.peer_store.blind_relay. The homepage now emphasizes actual
 * encrypted relay probe evidence instead of presenting lifecycle events as a
 * primary product claim.
 * Last Modified: v4.5 - Reframed the homepage protocol panel around
 * protocol_foundation readiness. The public view now shows four product-level
 * checks instead of lifecycle/debug counters while keeping all private node,
 * route, endpoint, payload, and social graph data out of the UI.
 * Last Modified: v4.6 - Added relay evidence mode display so public surfaces
 * distinguish real encrypted relay traffic from synthetic route probes.
 * Last Modified: v5.0 - 2026 brand pass. All green semantics in the
 * HomeNetworkStats panel migrated to the token system (homepage "no green"
 * rule established by NarrativeHero v7.x): ready/live status → brand purple,
 * forming/degraded → warn amber; live dot, check-ready dots, mesh visual,
 * and evidence chips restyled. Eyebrow tracking unified to tracking-eyebrow.
 * ALL data logic, stats fields, i18n fallback chains, and privacy boundaries
 * are preserved verbatim.
 * Last Modified: v5.1 - Aligned homepage narrative with the approved thesis:
 * "The encrypted coordination layer for autonomous agents." The first
 * viewport, SEO copy, and public protocol statistics now frame AeroNyx as a
 * blind open protocol for humans, apps, and AI agents to route traffic,
 * exchange encrypted messages, preserve private memory, and coordinate work.
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
    loading: () => <div className="fixed inset-0" style={{ background: 'var(--surface-0, #08080D)' }} />,
  }
);

// Import sections
import NarrativeHero from '../components/sections/NarrativeHero';
import ProblemToX402 from '../components/sections/ProblemToX402';
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
    refreshInterval: 30000,
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
      <Suspense fallback={<div className="fixed inset-0" style={{ background: 'var(--surface-0, #08080D)' }} />}>
        <MinimalAILBackground />
      </Suspense>

      {/* Custom header */}
      <AILHeader />

      {/* Main content */}
      <main className="relative z-10">
        {/* 1. Opening narrative */}
        <NarrativeHero />

        <HomeNetworkStats stats={stats} isLoading={isLoading} copy={copy} />

        <ProblemToX402 />

        {/* 4. How it works — technical deep-dive */}
        <HowAILWorks />

        {/* 5. Join the network */}
        <JoinNetwork />

        {/* 6. Products ecosystem (now includes MemChain as 5th product) */}
        <ProductsEcosystem />

        {/* 7. MemChain deep-dive — the killer app */}
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

/**
 * v5.0: status tones migrated to the token system.
 * ready/live/healthy → brand purple; forming/degraded/attention → warn.
 * NO GREEN (homepage brand rule).
 */
const protocolStatusTone = (status) => {
  if (['ready', 'live', 'healthy', 'peer_view_ready', 'relay_ready', 'onion_ready', 'observed'].includes(status)) {
    return 'border-brand-line bg-brand-faint text-brand-light';
  }
  if (['forming', 'degraded', 'attention'].includes(status)) {
    return 'border-warn/25 bg-warn/[0.06] text-warn';
  }
  return 'border-white/15 bg-white/5 text-white/60';
};

const protocolText = (protocolCopy, key, fallback) => protocolCopy[key] || fallback;

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
    protocolCopy.foundationStatusLabels?.[stats.protocolFoundationStatus]
    || protocolCopy.statusLabels[stats.protocolStatus]
    || protocolCopy.statusLabels.syncing
  );
  const foundationStageLabel = (
    protocolCopy.foundationStageLabels?.[stats.protocolFoundationStage]
    || protocolCopy.networkStoryStatusLabels?.[stats.protocolNetworkStoryStatus]
    || protocolCopy.networkStoryStatusLabels?.syncing
    || copy.homeStats.syncing
  );
  const blindRelayStatusLabel = (
    protocolCopy.blindRelayStatusLabels?.[stats.protocolBlindRelayStatus]
    || protocolCopy.blindRelayStatusLabels?.syncing
    || copy.homeStats.syncing
  );
  const evidenceModeLabel = (
    protocolCopy.evidenceModeLabels?.[stats.protocolFoundationRelayEvidenceMode]
    || protocolCopy.evidenceModeLabels?.idle
    || stats.protocolFoundationRelayEvidenceMode
    || copy.homeStats.syncing
  );
  const readinessReasonLabel = (
    protocolCopy.readinessReasonLabels?.[stats.protocolFoundationRelayReadinessReason]
    || protocolCopy.readinessReasonLabels?.idle_waiting_for_relay
    || stats.protocolFoundationRelayReadinessReason
    || copy.homeStats.syncing
  );
  const recoverySources = (stats.protocolRecoverySources || [])
    .map((source) => protocolCopy.recoverySources[source] || source.replace(/_/g, ' '))
    .join(' · ');
  const blindRelayFailures = (
    Number(stats.protocolBlindRelayRejected || 0)
    + Number(stats.protocolBlindRelayForwardFailed || 0)
    + Number(stats.protocolBlindRelayNoRoute || 0)
  );
  const blindRelayProofDetail = protocolText(
    protocolCopy,
    'blindRelayProofDetail',
    '{forwarded} forwarded · {terminal} terminal · {failures} failures across {nodes} nodes'
  )
    .replace('{forwarded}', formatCompactCount(stats.protocolBlindRelayForwarded))
    .replace('{terminal}', formatCompactCount(stats.protocolBlindRelayTerminal))
    .replace('{failures}', formatCompactCount(blindRelayFailures))
    .replace('{nodes}', formatCompactCount(stats.protocolBlindRelayReportedNodes));
  const relayEvidenceDetail = protocolText(
    protocolCopy,
    'foundationEvidenceDetail',
    '{mode} · {reason} · real {real} · probe {probe}'
  )
    .replace('{mode}', evidenceModeLabel)
    .replace('{reason}', readinessReasonLabel)
    .replace('{real}', formatCompactCount(stats.protocolFoundationRealRelayReadyNodes))
    .replace('{probe}', formatCompactCount(stats.protocolFoundationSyntheticProbeReadyNodes));
  const foundationChecksLabel = protocolText(
    protocolCopy,
    'foundationChecks',
    '{passed}/{total} checks'
  )
    .replace('{passed}', formatCompactCount(stats.protocolFoundationChecksPassed))
    .replace('{total}', formatCompactCount(stats.protocolFoundationChecksTotal || 4));
  const foundationHeadline = (
    protocolText(protocolCopy, 'foundationTitle', '')
    || stats.protocolFoundationHeadline
    || protocolCopy.networkStory
  );
  const foundationDescription = protocolText(
    protocolCopy,
    'foundationDescription',
    protocolCopy.description
  );
  const foundationChecks = [
    {
      label: protocolText(protocolCopy, 'foundationLocalRelay', 'Local relay'),
      ready: stats.protocolFoundationLocalRelayReady,
      detail: protocolText(protocolCopy, 'foundationLocalRelayDetail', 'node can advertise blind relay capability'),
      value: `${formatCompactCount(stats.protocolLocalRelaySafeToAdvertiseNodes)} / ${formatCompactCount(stats.protocolReportedNodes)}`,
    },
    {
      label: protocolText(protocolCopy, 'foundationPeerMesh', 'Peer mesh'),
      ready: stats.protocolFoundationPeerMeshReady,
      detail: protocolText(protocolCopy, 'foundationPeerMeshDetail', 'verified peer view and route candidates are available'),
      value: formatCompactCount(stats.protocolFoundationVerifiedPeerCount || stats.protocolNetworkStoryMaxValidNodes),
    },
    {
      label: protocolText(protocolCopy, 'foundationBlindRelay', 'Blind relay proof'),
      ready: stats.protocolFoundationBlindRelayReady,
      detail: relayEvidenceDetail,
      value: evidenceModeLabel,
    },
    {
      label: protocolText(protocolCopy, 'foundationRecovery', 'Restart recovery'),
      ready: stats.protocolFoundationRestartRecoveryReady,
      detail: recoverySources || protocolCopy.recoveryPending,
      value: `${formatCompactCount(stats.protocolCacheRecoveredNodes)} / ${formatCompactCount(stats.protocolReportedNodes)}`,
    },
  ];
  const fabricMetrics = [
    {
      label: protocolText(protocolCopy, 'foundationPeerMesh', protocolCopy.peerSync),
      value: formatCompactCount(stats.protocolFoundationVerifiedPeerCount || stats.protocolNetworkStoryMaxValidNodes),
      detail: protocolText(protocolCopy, 'foundationPeerMeshDetail', protocolCopy.peerSyncDetail),
    },
    {
      label: protocolText(protocolCopy, 'foundationRouteableRelays', 'Routeable relays'),
      value: formatCompactCount(stats.protocolFoundationRouteableRelayCount || stats.protocolNetworkStoryMaxRouteableChatRelays),
      detail: protocolText(protocolCopy, 'foundationRouteableRelaysDetail', 'privacy relay candidates ready for encrypted routing'),
    },
    {
      label: protocolText(protocolCopy, 'foundationEvidence', 'Relay evidence'),
      value: evidenceModeLabel,
      detail: relayEvidenceDetail,
    },
    {
      label: protocolCopy.restartRecovery,
      value: `${formatCompactCount(stats.protocolCacheRecoveredNodes)} / ${formatCompactCount(stats.protocolReportedNodes)}`,
      detail: recoverySources || protocolCopy.recoveryPending,
    },
  ];
  const meshNodeCount = Math.max(2, Math.min(4, Number(stats.protocolNetworkStoryReportedNodes || stats.protocolReportedNodes || 2)));

  return (
    <section aria-label={copy.homeStats.ariaLabel} className="relative z-20 -mt-6 md:-mt-10 pb-10 md:pb-16">
      <Container>
        <div className="mx-auto max-w-6xl border border-white/10 bg-black/70 backdrop-blur-md">
          <div className="grid gap-0 xl:grid-cols-[0.8fr_2.2fr]">
            <div className="border-b border-white/10 p-5 md:p-6 xl:border-b-0 xl:border-r">
              <div className="flex items-center gap-2 text-xs uppercase tracking-eyebrow text-brand-light">
                <span className="h-2 w-2 rounded-pill bg-brand-light shadow-[0_0_12px_rgba(151,136,247,0.6)]" />
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
                  <div className="mt-2 min-h-[2.5rem] text-[10px] uppercase leading-relaxed tracking-eyebrow text-white/40 md:text-xs">
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
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr] lg:items-stretch">
              <div className="flex min-w-0 flex-col justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex rounded-pill border px-2.5 py-1 text-[11px] uppercase tracking-eyebrow ${protocolStatusTone(stats.protocolFoundationStatus)}`}>
                    {protocolStatusLabel}
                  </span>
                  <span className="text-xs uppercase tracking-eyebrow text-white/35">
                    {protocolCopy.eyebrow}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-light tracking-normal text-white md:text-3xl">
                  {foundationHeadline}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                  {foundationDescription}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-eyebrow text-white/35">
                  <span className="border border-white/10 bg-white/[0.025] px-2.5 py-1">
                    {foundationStageLabel}
                  </span>
                  <span className="border border-white/10 bg-white/[0.025] px-2.5 py-1">
                    {foundationChecksLabel}
                  </span>
                  <span className="border border-brand-line bg-brand-faint px-2.5 py-1 text-brand-light/80">
                    {protocolText(protocolCopy, 'foundationEvidence', 'Relay evidence')} · {evidenceModeLabel}
                  </span>
                  <span className={`border px-2.5 py-1 ${protocolStatusTone(stats.protocolBlindRelayStatus)}`}>
                    {blindRelayStatusLabel} · {protocolText(protocolCopy, 'blindRelayProof', 'Relay Proof')}
                  </span>
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {foundationChecks.map((check) => (
                    <div key={check.label} className="min-w-0 border border-white/10 bg-white/[0.018] p-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate text-[10px] uppercase tracking-eyebrow text-white/45">
                          {check.label}
                        </span>
                        <span className={`h-2.5 w-2.5 shrink-0 rounded-pill ${check.ready ? 'bg-brand-light shadow-[0_0_10px_rgba(151,136,247,0.55)]' : 'bg-white/20'}`} />
                      </div>
                      <div className="mt-2 truncate text-lg font-light text-white">
                        {check.value || copy.homeStats.syncing}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[13rem] overflow-hidden border border-white/10 bg-white/[0.018] p-5">
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.24) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <div className="absolute left-[14%] right-[14%] top-1/2 h-px bg-gradient-to-r from-transparent via-brand-light/40 to-transparent" />
                <div className="absolute left-[24%] right-[24%] top-[39%] h-px -rotate-6 bg-gradient-to-r from-transparent via-cipher/20 to-transparent" />
                <div className="absolute left-[24%] right-[24%] top-[61%] h-px rotate-6 bg-gradient-to-r from-transparent via-cipher/20 to-transparent" />
                <div className="relative z-10 flex h-full min-h-[11rem] items-center justify-between gap-4">
                  {Array.from({ length: meshNodeCount }).map((_, index) => (
                    <div key={index} className="flex min-w-0 flex-1 flex-col items-center">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-pill border border-brand-line bg-brand-faint shadow-[0_0_24px_rgba(119,98,243,0.10)]">
                        <span className="h-2.5 w-2.5 rounded-pill bg-brand-light shadow-[0_0_14px_rgba(151,136,247,0.7)]" />
                        <span className="absolute inset-2 rounded-pill border border-brand/10" />
                      </div>
                      <div className="mt-3 max-w-[8rem] text-center text-[10px] uppercase leading-4 tracking-eyebrow text-white/38">
                        {index === 0
                          ? protocolText(protocolCopy, 'foundationLocalRelay', protocolCopy.mesh)
                          : index === meshNodeCount - 1
                            ? protocolText(protocolCopy, 'blindRelayProof', 'Relay Proof')
                            : protocolText(protocolCopy, 'foundationPeerMesh', protocolCopy.peerSync)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-5 right-5 z-10 grid gap-2 text-[10px] uppercase tracking-eyebrow text-white/35 sm:grid-cols-3">
                  <span className="border border-white/10 bg-black/40 px-2.5 py-2">
                    {evidenceModeLabel}
                  </span>
                  <span className="border border-white/10 bg-black/40 px-2.5 py-2">
                    {formatCompactCount(stats.protocolFoundationRealRelayReadyNodes)} {protocolText(protocolCopy, 'realRelayNodes', 'real')}
                  </span>
                  <span className="border border-white/10 bg-black/40 px-2.5 py-2">
                    {formatCompactCount(stats.protocolFoundationSyntheticProbeReadyNodes)} {protocolText(protocolCopy, 'syntheticProbeNodes', 'probe')}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {fabricMetrics.map((item) => (
                <div key={item.label} className="min-w-0 border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-2xl font-light tracking-normal text-white md:text-3xl">
                    {isLoading ? (
                      <span className="block h-8 w-20 animate-pulse bg-white/10" />
                    ) : (
                      item.value || copy.homeStats.syncing
                    )}
                  </div>
                  <div className="mt-2 text-[10px] uppercase leading-relaxed tracking-eyebrow text-white/42">
                    {item.label}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/38">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
