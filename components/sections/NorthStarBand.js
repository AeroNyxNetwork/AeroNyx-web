/**
 * ============================================================================
 * File: components/sections/NorthStarBand.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-12 by Claude] The North Star covenant ("More
 * private. Open source. Global by default.") as one quiet band between the
 * product and how it works. The `#north-star-plan` anchor is kept.
 *
 * 2026-09-13: copy moved from lib/i18n productsEcosystem.northStar ("node
 * infrastructure covenant", "user-level telemetry", "signed state") to
 * lib/i18n-nightglass copy.northStar — the same three promises, in plain
 * words. /privacy-network keeps its own NorthStarPlan and its own copy.
 * ============================================================================
 */

import Container from '../ui/Container';

export default function NorthStarBand({ copy }) {
  const ns = copy?.northStar;
  if (!ns) return null;
  const signals = ns.signals || [];

  return (
    <section id="north-star-plan" className="scroll-mt-20 py-14 md:scroll-mt-24 md:py-20" style={{ background: 'var(--surface-1)' }}>
      <Container>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="ng-eyebrow">{ns.eyebrow}</p>
            <h2 className="ng-display mt-5 text-[1.6rem] leading-tight text-white md:text-[2rem]">{ns.title}</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/58">{ns.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {signals.map((signal) => (
              <div key={signal.label} className="ng-card p-5">
                <div className="ng-display text-[12px] text-[#A594FF]">{signal.label}</div>
                <div className="mt-3 text-base font-semibold text-white">{signal.title}</div>
                <p className="mt-2 text-xs leading-relaxed text-white/55">{signal.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
