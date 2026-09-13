/**
 * ============================================================================
 * File: components/sections/ClosingCta.js
 * ============================================================================
 * [NIGHTGLASS-WEB 2026-09-13 by Claude] "Try it in a minute." The page ends
 * on the product: download (the same modal the hero opens), the docs for
 * builders, and a plain email for everyone else. Replaces SophisticatedCTA.
 * ============================================================================
 */

import { useState } from 'react';
import Container from '../ui/Container';
import DownloadsModal from '../ui/DownloadsModal';

const DOCS = 'https://docs.aeronyx.network/';
const CONTACT = 'mailto:hi@aeronyx.network';

export default function ClosingCta({ copy }) {
  const c = copy.closing;
  const [downloadsOpen, setDownloadsOpen] = useState(false);

  return (
    <section className="ng-section" style={{ background: 'var(--surface-1)' }}>
      <Container>
        <div className="ng-surface relative mx-auto max-w-4xl overflow-hidden px-6 py-12 text-center md:px-12 md:py-16">
          <div className="ng-hero-field" aria-hidden="true" />
          <div className="relative">
            <h2 className="ng-title text-[clamp(1.9rem,4vw,3rem)]">{c.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/62">{c.description}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => setDownloadsOpen(true)} className="ng-btn ng-btn-primary w-full sm:w-auto">{c.download}</button>
              <a href={DOCS} target="_blank" rel="noopener noreferrer" className="ng-btn ng-btn-ghost w-full sm:w-auto">{c.docs}</a>
              <a href={CONTACT} className="ng-link px-2 py-3">{c.talk} →</a>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {c.proofs.map((proof) => (
                <li key={proof} className="ng-chip">{proof}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
      <DownloadsModal isOpen={downloadsOpen} onClose={() => setDownloadsOpen(false)} />
    </section>
  );
}
