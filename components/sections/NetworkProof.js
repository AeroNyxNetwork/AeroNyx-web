/**
 * ============================================================================
 * File: components/sections/NetworkProof.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-12 by Claude] Four numbers, no console.
 *
 * Replaces the HomeNetworkStats panel that lived inside pages/index.js. That
 * panel exposed the node-readiness diagnostics ("awaiting evidence · 0 real ·
 * 6 probe") on the front page; those belong on /privacy-network, which is
 * where the footer link sends the reader. What stays are the strongest,
 * privacy-safe aggregates: bytes carried (live), packets forwarded (live),
 * nodes reporting, and the route-readiness stage — all sourced from
 * GET /api/privacy_network/vpn/public/network-stats/ through the existing
 * useNetworkStats hook. Localized stage labels come from lib/i18n
 * (homeStats.protocol.foundationStageLabels), so no translation is lost.
 *
 * The verifiable blind ledger card (v6.2/6.3 on main: witness-certified
 * commitment coverage) is carried over as a fifth tile, shown only when
 * ledger evidence has actually been reported — logic and localized strings
 * (homeStats.protocol.commitment*) are the ones HomeNetworkStats used.
 * ============================================================================
 */

import Link from 'next/link';
import Container from '../ui/Container';
import AnimatedMessageCounter from '../ui/AnimatedMessageCounter';
import useNetworkStats from '../../lib/hooks/useNetworkStats';

const formatCount = (value) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(value || 0));

export default function NetworkProof({ copy, messages, locale }) {
  const p = copy.proof;
  const { stats, isLoading } = useNetworkStats({ period: '30d', autoRefresh: true, refreshInterval: 30000 });
  const stageLabels = messages.homeStats?.protocol?.foundationStageLabels || {};
  const syncing = messages.homeStats?.syncing || 'Syncing';
  const readiness = stageLabels[stats.protocolFoundationStage] || syncing;
  const nodes = Number(stats.protocolReportedNodes || 0);

  // Verifiable blind ledger — same derivation as the retired HomeNetworkStats.
  const protocolCopy = messages.homeStats?.protocol || {};
  const text = (key, fallback) => protocolCopy[key] || fallback;
  const ledgerNodes = Number(stats.protocolCommitmentReportedNodes || 0);
  const ledgerStatus = (
    protocolCopy.blockConfirmationStatusLabels?.[stats.protocolBlockConfirmationState]
    || protocolCopy.commitmentStatusLabels?.[stats.protocolMemoryChainStatus]
    || protocolCopy.commitmentStatusLabels?.syncing
    || syncing
  );
  const hasBlockConfirmationEvidence = (
    ledgerNodes > 0
    && stats.protocolBlockConfirmationState !== 'unavailable'
    && stats.protocolBlockConfirmationState !== 'unknown'
  );
  const ledgerDetail = hasBlockConfirmationEvidence
    ? text('commitmentDetail', '{certified}/{tip} blocks independently certified · {pending} awaiting evidence · witness lease {granted}/{required}')
      .replace('{certified}', formatCount(stats.protocolCommitmentCertifiedTipHeight))
      .replace('{tip}', formatCount(stats.protocolCommitmentTipHeight))
      .replace('{pending}', formatCount(stats.protocolCommitmentUncertifiedBlocks))
      .replace('{granted}', formatCount(stats.protocolCommitmentLeaseGrantedWitnesses))
      .replace('{required}', formatCount(stats.protocolCommitmentLeaseRequiredWitnesses))
    : text('commitmentLegacyDetail', '{blocks} verified blocks · {commitments} opaque commitments · witness lease {granted}/{required}')
      .replace('{blocks}', formatCount(stats.protocolCommitmentVerifiedBlocks))
      .replace('{commitments}', formatCount(stats.protocolCommitmentVerifiedCommitments))
      .replace('{granted}', formatCount(stats.protocolCommitmentLeaseGrantedWitnesses))
      .replace('{required}', formatCount(stats.protocolCommitmentLeaseRequiredWitnesses));
  const showLedger = ledgerNodes > 0;

  return (
    <section id="proof" className="ng-section relative" style={{ background: 'var(--surface-0)' }}>
      <Container>
        <div className="ng-section-head mx-auto max-w-2xl text-center">
          <p className="ng-eyebrow">{p.eyebrow}</p>
          <h2 className="mt-5 text-white">{p.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/58">{p.description}</p>
        </div>

        <div className={`ng-surface mx-auto mt-12 grid max-w-6xl grid-cols-1 overflow-hidden sm:grid-cols-2 ${showLedger ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
          <Tile label={p.traffic} detail={p.trafficDetail}>
            {isLoading ? (
              <span className="text-white/40">{syncing}</span>
            ) : (
              <div className="ng-counter">
                <AnimatedMessageCounter
                  value={stats.encryptedTrafficBytes}
                  fallback={stats.encryptedTraffic || syncing}
                  suffix={messages.join?.stats?.bytesUnit || 'bytes'}
                  pulseLabel="live"
                  defaultStep={1024}
                />
              </div>
            )}
          </Tile>
          <Tile label={p.packets} detail={p.packetsDetail}>
            {isLoading ? (
              <span className="text-white/40">{syncing}</span>
            ) : (
              <div className="ng-counter">
                <AnimatedMessageCounter
                  value={stats.encryptedMessagesRaw}
                  fallback={stats.encryptedMessages || syncing}
                  suffix={messages.join?.stats?.packetsUnit || 'packets'}
                  pulseLabel="live"
                  defaultStep={1}
                />
              </div>
            )}
          </Tile>
          <Tile label={p.nodes} detail={p.nodesDetail}>
            <span className="ng-display text-[2.25rem] leading-none text-white md:text-[2.75rem]">
              {nodes > 0 ? formatCount(nodes) : '—'}
            </span>
          </Tile>
          <Tile label={p.readiness} detail={p.readinessDetail}>
            <span className="ng-display text-[1.35rem] leading-tight text-[#A594FF] md:text-[1.6rem]">{readiness}</span>
          </Tile>
          {showLedger && (
            <Tile label={text('commitmentLedger', 'Verifiable blind ledger')} detail={ledgerDetail}>
              <span className="ng-display text-[1.35rem] leading-tight text-white md:text-[1.6rem]">{ledgerStatus}</span>
            </Tile>
          )}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-white/40">
          <Link href="/privacy-network" locale={locale} className="text-white/70 underline-offset-4 hover:text-white hover:underline">
            {p.link} →
          </Link>
        </p>
      </Container>
    </section>
  );
}

function Tile({ label, detail, children }) {
  return (
    <div className="flex min-w-0 flex-col gap-3 border-b border-white/[0.07] p-6 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0 md:p-7">
      <div className="text-[11px] font-medium uppercase tracking-eyebrow text-white/45">{label}</div>
      <div className="min-h-[3rem]">{children}</div>
      <div className="text-xs leading-relaxed text-white/40">{detail}</div>
    </div>
  );
}
