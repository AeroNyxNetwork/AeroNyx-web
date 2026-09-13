/**
 * ============================================================================
 * File: components/sections/Roadmap.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] "The plan, in plain words." Three
 * milestones and one closing line. Replaces FutureVision on the homepage
 * (same three dates, said without the protocol vocabulary). Keeps the
 * #vision anchor.
 * ============================================================================
 */

import Container from '../ui/Container';

export default function Roadmap({ copy }) {
  const r = copy.roadmap;

  return (
    <section id="vision" className="ng-section scroll-mt-20 md:scroll-mt-24" style={{ background: 'var(--surface-0)' }}>
      <Container>
        <div className="ng-section-head mx-auto max-w-2xl text-center">
          <p className="ng-eyebrow">{r.eyebrow}</p>
          <h2 className="mt-5 text-white">{r.title}</h2>
        </div>

        <ol className="ng-surface mx-auto mt-12 grid max-w-6xl overflow-hidden md:grid-cols-3">
          {r.items.map((item, i) => (
            <li
              key={item.when}
              className={`p-6 md:p-8 ${i < r.items.length - 1 ? 'border-b border-white/[0.07] md:border-b-0 md:border-r' : ''}`}
            >
              <div className="ng-display text-[1.6rem] leading-none text-[#A594FF]">{item.when}</div>
              <h3 className="mt-4 text-[1.1rem] font-semibold leading-snug text-white" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/58">{item.body}</p>
            </li>
          ))}
        </ol>

        <p className="ng-display mx-auto mt-10 max-w-3xl text-center text-[1.3rem] leading-snug text-white md:text-[1.6rem]">
          {r.closing}
        </p>
      </Container>
    </section>
  );
}
