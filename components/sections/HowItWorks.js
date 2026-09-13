/**
 * ============================================================================
 * File: components/sections/HowItWorks.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] "Sealed on your phone. Opened on
 * theirs." Three plain steps and the route diagram. Replaces
 * ProtocolArchitecture on the homepage (two "pillars", a visibility table,
 * technical bullet grids) — the same idea, said once, in words a person
 * would use. Keeps the #how-it-works anchor the hero's second button points
 * at, and links out to the technical architecture for readers who want it.
 * ============================================================================
 */

import Container from '../ui/Container';
import RouteDiagram from '../ui/RouteDiagram';
import useReducedMotion from '../../lib/hooks/useReducedMotion';
import { ARCHITECTURE_DOCS } from '../../lib/external-links';

export default function HowItWorks({ copy }) {
  const h = copy.howItWorks;
  const reduced = useReducedMotion();

  return (
    <section id="how-it-works" className="ng-section scroll-mt-20 md:scroll-mt-24" style={{ background: 'var(--surface-0)' }}>
      <Container>
        <div className="ng-section-head mx-auto max-w-2xl text-center">
          <p className="ng-eyebrow">{h.eyebrow}</p>
          <h2 className="mt-5 text-white">{h.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/58">{h.description}</p>
        </div>

        <div className="ng-surface mx-auto mt-12 max-w-6xl overflow-hidden">
          <div className="border-b border-white/[0.07] px-4 pb-2 pt-6 md:px-10 md:pt-8">
            <RouteDiagram labels={h.diagram} reduced={reduced} />
          </div>
          <ol className="grid md:grid-cols-3">
            {h.steps.map((step, i) => (
              <li
                key={step.title}
                className={`p-6 md:p-8 ${i < h.steps.length - 1 ? 'border-b border-white/[0.07] md:border-b-0 md:border-r' : ''}`}
              >
                <div className="ng-display text-[12px] text-[#A594FF]">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-3 text-[1.1rem] font-semibold leading-snug text-white" style={{ letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/58">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mx-auto mt-6 flex max-w-6xl flex-col items-start justify-between gap-3 px-1 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-xs leading-relaxed text-white/45">{h.note}</p>
          <a href={ARCHITECTURE_DOCS} target="_blank" rel="noopener noreferrer" className="ng-link shrink-0">
            {h.link} →
          </a>
        </div>
      </Container>
    </section>
  );
}
