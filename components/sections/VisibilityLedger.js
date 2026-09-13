/**
 * ============================================================================
 * File: components/sections/VisibilityLedger.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-12 by Claude] "Who sees what" as a three-column
 * ledger: your phone, the nodes on the way, this website — each with what it
 * can and cannot see.
 *
 * 2026-09-13: rows now come from lib/i18n-nightglass (copy.ledger.rows) in
 * plain language, instead of the protocol-vocabulary rows in lib/i18n
 * protocolArchitecture.visibility.items ("signed routing metadata", "TTL",
 * "producer-scoped commitments"). Same claim, said the way a person would
 * say it; the technical table still lives on /privacy-network.
 * ============================================================================
 */

import Container from '../ui/Container';

export default function VisibilityLedger({ copy }) {
  const l = copy.ledger;
  const rows = l.rows || [];
  if (!rows.length) return null;

  return (
    <section id="visibility" className="ng-section" style={{ background: 'var(--surface-0)' }}>
      <Container>
        <div className="ng-section-head mx-auto max-w-2xl text-center">
          <p className="ng-eyebrow">{l.eyebrow}</p>
          <h2 className="mt-5 text-white">{l.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/58">{l.description}</p>
        </div>

        <div className="ng-surface mx-auto mt-12 grid max-w-6xl overflow-hidden md:grid-cols-3">
          {rows.map((item, i) => (
            <div
              key={item.surface}
              className={`flex flex-col gap-5 p-6 md:p-8 ${i < rows.length - 1 ? 'border-b border-white/[0.07] md:border-b-0 md:border-r' : ''}`}
            >
              <h3 className="text-lg font-semibold text-white" style={{ letterSpacing: '-0.01em' }}>{item.surface}</h3>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-eyebrow text-white/45">{l.canSee}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/85">{item.canSee}</p>
              </div>
              <div className="rounded-[14px] px-4 py-3" style={{ background: 'rgba(116,98,247,0.07)', border: '1px solid rgba(165,148,255,0.18)' }}>
                <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-eyebrow text-[#A594FF]">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  {l.cannotSee}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.cannotSee}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
