/**
 * ============================================================================
 * File: components/sections/RunANode.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] "Carry what you cannot read."
 * Replaces JoinNetwork on the homepage: the four-step slideshow with
 * orbiting dots, a 60-second rotating ring, fake progress bars and random
 * background lines is gone. What's here: three plain steps (install, carry,
 * watch), one honest node card the way Nodeboard would show it, the live
 * count of nodes online, and two doors — the node guide and Nodeboard.
 * Keeps the #join-network anchor.
 *
 * The node card is deliberately a mock ("Tokyo", 14 peers, 2.1 GB) and is
 * labelled by its own numbers, not the live API; the one live number on
 * this section is the node count from useNetworkStats.
 * ============================================================================
 */

import Container from '../ui/Container';
import useNetworkStats from '../../lib/hooks/useNetworkStats';

const NODE_GUIDE = 'https://docs.aeronyx.network/node-operators/rust-node-operations-and-health-checks';
const NODEBOARD = 'https://app.aeronyx.network/';
const MONO = { fontFamily: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace' };

function NodeCard({ card }) {
  const rows = [
    { label: card.peers, value: '14' },
    { label: card.carried, value: '2.1 GB' },
    { label: card.readable, value: card.readableValue, accent: true },
    { label: card.uptime, value: '99.9%' },
  ];
  return (
    <div className="ng-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-[12px]" style={{ background: 'rgba(116,98,247,0.16)' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#A594FF" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <rect x="4" y="5" width="16" height="6" rx="2" /><rect x="4" y="13" width="16" height="6" rx="2" /><path d="M8 8h.01M8 16h.01" />
            </svg>
          </span>
          <div>
            <div className="text-[13px] font-semibold text-white">{card.title} · {card.location}</div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/55">
              <span className="ng-live-dot" aria-hidden="true" />
              {card.status}
            </div>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-eyebrow text-white/35" style={MONO}>nodeboard</span>
      </div>
      <dl className="grid grid-cols-2">
        {rows.map((row, i) => (
          <div key={row.label} className={`px-5 py-4 ${i % 2 === 0 ? 'border-r border-white/[0.07]' : ''} ${i < 2 ? 'border-b border-white/[0.07]' : ''}`}>
            <dt className="text-[11px] uppercase tracking-eyebrow text-white/42">{row.label}</dt>
            <dd className="ng-display mt-1 text-[1.35rem] leading-none" style={{ color: row.accent ? '#A594FF' : '#fff' }}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function RunANode({ copy }) {
  const r = copy.runNode;
  const { stats } = useNetworkStats({ period: '30d', autoRefresh: true, refreshInterval: 30000 });
  const nodes = Number(stats.protocolReportedNodes || 0);

  return (
    <section id="join-network" className="ng-section scroll-mt-20 md:scroll-mt-24" style={{ background: 'var(--surface-1)' }}>
      <Container>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="ng-section-head">
            <p className="ng-eyebrow">{r.eyebrow}</p>
            <h2 className="mt-5 text-white">{r.title}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/58">{r.description}</p>

            <ol className="mt-8 grid gap-3 sm:grid-cols-3">
              {r.steps.map((step, i) => (
                <li key={step.title} className="rounded-[14px] border border-white/[0.08] p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="ng-display text-[12px] text-[#A594FF]">{String(i + 1).padStart(2, '0')}</div>
                  <div className="mt-2 text-sm font-semibold text-white">{step.title}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/55">{step.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a href={NODE_GUIDE} target="_blank" rel="noopener noreferrer" className="ng-btn ng-btn-primary w-full sm:w-auto">{r.ctaGuide}</a>
              <a href={NODEBOARD} target="_blank" rel="noopener noreferrer" className="ng-btn ng-btn-ghost w-full sm:w-auto">{r.ctaBoard}</a>
            </div>
          </div>

          <div>
            <NodeCard card={r.card} />
            <p className="mt-4 text-center text-xs text-white/45">
              <span className="ng-display text-[15px] text-white">{nodes > 0 ? nodes : '—'}</span> {r.liveLabel}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
