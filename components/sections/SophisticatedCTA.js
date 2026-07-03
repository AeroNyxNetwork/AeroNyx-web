/**
 * ============================================
 * File: components/sections/SophisticatedCTA.jsx
 * ============================================
 * Modification Reason: v2.0 — Interaction fix + alignment.
 *   1. FIX: entrance animations used `animate` (fired on page mount) —
 *      this section sits at the very bottom, so the animation always
 *      completed long before the user scrolled to it. Now whileInView.
 *   2. Whitepaper URL aligned with Footer's canonical deep link
 *      (docs.aeronyx.network/aeronyx-whitepaper/technical-white-paper);
 *      the previous /whitepaper path was inconsistent.
 *   3. Tracking values (0.15em/0.2em) unified to the eyebrow token;
 *      primary CTA hover aligned to brand hover language.
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Keep whileInView here — do not revert to animate.
 *   - Whitepaper URL must match Footer; change both together.
 *
 * Last Modified: v2.3 — Final CTA control geometry polish
 * ============================================
 */

import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { DEFAULT_LOCALE, getMessages } from '../../lib/i18n';

const EASE = [0.16, 1, 0.3, 1];

const SophisticatedCTA = () => {
  const { locale } = useRouter();
  const copy = getMessages(locale || DEFAULT_LOCALE).cta;

  return (
    <section className="border-t border-white/10 py-14 md:py-24" style={{ background: 'var(--surface-0, #08080D)' }}>
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Main message — whileInView (v2.0 fix) */}
          <motion.div
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-display-xl font-light mb-4 md:mb-6 px-4">
              {copy.line1}
              <span className="block font-medium">{copy.line2}</span>
            </h2>

            <p className="text-base md:text-xl text-white/50 font-light max-w-copy mx-auto px-4 leading-relaxed">
              {copy.description}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            <a
              href="https://docs.aeronyx.network/aeronyx-whitepaper/technical-white-paper"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto"
            >
              <div className="flex min-h-[50px] items-center justify-center rounded border border-white/20 px-8 py-3.5 text-center transition-colors duration-fast group-hover:border-brand-line group-hover:bg-brand-faint sm:px-12 sm:py-4">
                <span className="text-xs sm:text-sm uppercase tracking-eyebrow">
                  {copy.whitepaper}
                </span>
              </div>
            </a>

            <a
              href="mailto:partnerships@aeronyx.network"
              className="inline-flex min-h-[44px] items-center justify-center rounded px-4 py-2 text-white/40 hover:text-white transition-colors duration-fast"
            >
              <span className="text-xs sm:text-sm uppercase tracking-eyebrow">
                {copy.partnership}
              </span>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default SophisticatedCTA;
