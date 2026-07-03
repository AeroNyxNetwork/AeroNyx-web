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
 * Last Modified: v2.0 — whileInView fix, URL alignment
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
    <section className="py-16 md:py-32 border-t border-white/10" style={{ background: 'var(--surface-0, #08080D)' }}>
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Main message — whileInView (v2.0 fix) */}
          <motion.div
            className="mb-8 md:mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-display-xl font-extralight mb-4 md:mb-6 px-4">
              {copy.line1}
              <span className="block font-normal">{copy.line2}</span>
            </h2>

            <p className="text-base md:text-xl text-white/40 font-light max-w-copy mx-auto px-4">
              {copy.description}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            
              href="https://docs.aeronyx.network/aeronyx-whitepaper/technical-white-paper"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto"
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
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default SophisticatedCTA;
