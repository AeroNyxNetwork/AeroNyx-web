/**
 * ============================================
 * File: components/sections/ClosingVision.jsx
 * ============================================
 * Creation Reason: v1.0 — Merge of FutureVision (v2.0) and
 *   SophisticatedCTA (v2.0) into one closing section for the approved
 *   top-tier homepage restructure. Presented separately they cost two
 *   full screens at the end (roadmap screen, then CTA screen), draining
 *   momentum twice. Merged, the roadmap becomes a compact timeline that
 *   flows straight into the conversion — one decisive close.
 *
 * Superseded files (kept in repo, no longer imported by index.js):
 *   - components/sections/FutureVision.js (v2.0)
 *   - components/sections/SophisticatedCTA.js (v2.0)
 *   Recover standalone forms from version history if needed.
 *
 * Main Functionality:
 *   - Compact three-milestone roadmap (2026 / 2028 / 2030) as a single
 *     vertical timeline, a closing conviction line, then the primary
 *     whitepaper CTA + partnership contact.
 *
 * Dependencies:
 *   - components/ui/Container; framer-motion; lib/i18n (cta copy)
 *   - tailwind.config.js v2.0 tokens; _app.js v2.2 (Instrument Serif)
 *   - pages/index.js imports THIS instead of FutureVision +
 *     SophisticatedCTA (updated import block delivered alongside).
 *
 * Main Logical Flow:
 *   1. Header + roadmap reveal on scroll (shared EASE).
 *   2. Conviction line.
 *   3. CTA row (whileInView — this sits at page bottom; animate-on-mount
 *      would fire before the user ever scrolled here — SophisticatedCTA
 *      v2.0 fix, preserved).
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Roadmap copy is roadmap-tone (intentions, never guarantees) and
 *     free of unverified metrics — do not reintroduce "10x", "conscious
 *     web", etc. (rewrite rationale in FutureVision v2.0 header).
 *   - Whitepaper URL MUST match Footer's canonical deep link; change
 *     both together.
 *   - i18n: CTA text uses copy.cta.* (all locales). The roadmap strings
 *     are English-first hardcoded; localize later if desired.
 *   - Instrument Serif is weight 400 — never bold; emphasis = italic +
 *     brand color.
 *
 * Last Modified: v1.0 — Initial merge
 * ============================================
 */

import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { DEFAULT_LOCALE, getMessages } from '../../lib/i18n';

const EASE = [0.16, 1, 0.3, 1];

const ROADMAP = [
  {
    year: '2026',
    title: 'The fabric hardens',
    description:
      'The blind relay foundation moves from proof to product: verified peer views, multi-hop routing, and restart recovery across a growing set of independent node operators.',
  },
  {
    year: '2028',
    title: 'Memory becomes portable',
    description:
      'Memory Chain matures into a cross-client standard — encrypted personal context that follows the user between AI tools instead of dying inside each vendor.',
  },
  {
    year: '2030',
    title: 'Agent-native economy',
    description:
      'Services quote, agents pay, work executes — over x402 rails and blind routing. Coordination without accounts, without middlemen reading the flow.',
  },
];

const ClosingVision = () => {
  const { locale } = useRouter();
  const copy = getMessages(locale || DEFAULT_LOCALE).cta;

  return (
    <section
      className="py-16 md:py-28 border-t border-white/10"
      style={{ background: 'var(--surface-0, #08080D)' }}
    >
      <Container>
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 md:mb-16 max-w-3xl"
          >
            <h2
              className="mb-4 md:mb-6"
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.015em',
              }}
            >
              The road to a network that
              <br />
              can't <em className="text-brand-light" style={{ fontStyle: 'italic' }}>betray</em> its users.
            </h2>
            <p className="text-base md:text-xl text-white/50 leading-relaxed">
              As agents become participants in the economy, the infrastructure they run on
              decides who sees what. We're building the version where the answer is: nobody
              in the middle.
            </p>
          </motion.div>

          {/* Compact roadmap timeline */}
          <div className="relative mb-16 md:mb-24">
            {/* vertical spine */}
            <div className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-2 bottom-2 w-px bg-gradient-to-b from-brand-light/40 via-white/10 to-transparent" />

            <div className="space-y-8 md:space-y-12">
              {ROADMAP.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
                  className="relative grid md:grid-cols-2 md:gap-12 items-start"
                >
                  {/* left column (year) — desktop right-aligned to spine */}
                  <div className="pl-8 md:pl-0 md:pr-10 md:text-right">
                    {/* node dot */}
                    <span
                      className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1.5 h-3.5 w-3.5 rounded-pill border-2 border-brand-light bg-[var(--surface-0,#08080D)]"
                      aria-hidden="true"
                    />
                    <div className="font-mono text-3xl md:text-4xl font-extralight text-white/20">
                      {item.year}
                    </div>
                  </div>

                  {/* right column (content) */}
                  <div className="pl-8 md:pl-10 mt-1 md:mt-0">
                    <h3 className="text-lg md:text-xl font-light mb-2">{item.title}</h3>
                    <p className="text-sm md:text-base text-white/55 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Conviction + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center border-t border-white/10 pt-12 md:pt-16"
          >
            <p
              className="mb-8 md:mb-10 max-w-2xl mx-auto"
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontWeight: 400,
                fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
                lineHeight: 1.2,
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              Privacy not as a feature —
              <br className="hidden sm:block" /> as the coordination layer itself.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center px-4">
              
                href="https://docs.aeronyx.network/aeronyx-whitepaper/technical-white-paper"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto"
              >
                <div className="px-8 sm:px-12 py-4 sm:py-5 rounded border border-white/20 group-hover:border-brand-line group-hover:bg-brand-faint transition-colors duration-fast text-center">
                  <span className="text-xs sm:text-sm uppercase tracking-eyebrow">
                    {copy.whitepaper}
                  </span>
                </div>
              </a>

              
                href="mailto:partnerships@aeronyx.network"
                className="text-white/40 hover:text-white transition-colors duration-fast px-4 py-2"
              >
                <span className="text-xs sm:text-sm uppercase tracking-eyebrow">
                  {copy.partnership}
                </span>
              </a>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default ClosingVision;
