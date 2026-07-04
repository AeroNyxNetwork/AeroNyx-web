/**
 * ============================================
 * File: components/sections/FutureVision.jsx
 * ============================================
 * Modification Reason: v2.5 - Protocol identity wording.
 *   Replaced legacy credential roadmap wording with identity-derived key
 *   language so the future narrative stays focused on private memory, agent
 *   services, and the blind protocol.
 *
 * Modification Reason: v2.6 - Roadmap internationalization.
 *   Moved roadmap milestones, unlock labels, closing thesis, and final
 *   protocol promise into lib/i18n so localized homepages do not end with
 *   English-only roadmap content. Timeline text now uses safer line-height
 *   and break behavior for long translated phrases.
 *
 * Historical Notes:
 * v2.4 — Roadmap section rhythm polish.
 *   Added the shared homepage eyebrow pattern before the roadmap headline so
 *   the future narrative reads as a deliberate protocol roadmap rather than a
 *   separate marketing block.
 *
 * Historical Notes:
 * v2.0 — Copy credibility rewrite + token pass.
 *   ⚠️ CONTENT CHANGE (needs owner sign-off): the v1 copy ("The
 *   Conscious Web", "birthing a new form of technological life",
 *   "evolving beyond human comprehension", "infrastructure
 *   consciousness") framed the project as AGI mysticism — directly at
 *   odds with the site's engineering-first "privacy coordination
 *   protocol" positioning and a known negative signal for US VC
 *   audiences. Unverifiable claims ("10x cost reduction",
 *   "zero-downtime guaranteed") also violated the site-wide
 *   no-unverified-claims rule (ProductsEcosystem v2.3).
 *   The timeline structure, three milestones, animations, and layout
 *   are preserved; copy is rewritten as a protocol roadmap.
 *   Original copy recoverable from version history.
 *
 * Main Functionality:
 *   - Three-milestone vision timeline + closing statement.
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Roadmap items are stated as intentions ("we aim", "designed to"),
 *     never as guarantees. Keep it that way.
 *
 * Last Modified: v2.4 — Roadmap eyebrow rhythm alignment
 * Last Modified: v2.5 - Protocol identity wording
 * Last Modified: v2.6 - Roadmap internationalization
 * ============================================
 */

import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { DEFAULT_LOCALE, getMessages } from '../../lib/i18n';

const EASE = [0.16, 1, 0.3, 1];

const FutureVision = () => {
  const { locale } = useRouter();
  const messages = getMessages(locale || DEFAULT_LOCALE);
  const copy = messages.futureVision || getMessages(DEFAULT_LOCALE).futureVision;
  const visions = copy.visions || [];

  return (
    <section id="vision" className="scroll-mt-20 py-12 md:scroll-mt-24 md:py-20" style={{ background: 'var(--surface-1, #0C0C13)' }}>
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-3 text-[10px] uppercase tracking-eyebrow text-brand-light md:mb-4">
              {copy.eyebrow}
            </div>
            <h2 className="text-display-lg font-light mb-4 md:mb-6">
              {copy.title}
            </h2>
            <p className="text-base md:text-xl text-white/40 max-w-copy">
              {copy.description}
            </p>
          </motion.div>

          {/* Vision timeline */}
          <div className="space-y-4 md:space-y-5">
            {visions.map((vision, index) => (
              <motion.div
                key={vision.year}
                className="page-card grid gap-5 rounded border p-5 md:grid-cols-[0.72fr_2fr] md:gap-8 md:p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: EASE }}
              >
                <div className="md:text-right">
                  <div className="mb-1 font-mono text-3xl font-extralight text-white/18 md:text-5xl">
                    {vision.year}
                  </div>
                </div>

                <div>
                  <h3 className="text-display-md font-light mb-3 break-words md:mb-4">{vision.title}</h3>
                  <p className="text-sm md:text-base text-white/60 mb-4 md:mb-6 leading-relaxed break-words">
                    {vision.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-[10px] md:text-xs uppercase tracking-eyebrow text-white/40 mb-2 md:mb-3">
                      {copy.unlocksLabel}
                    </div>
                    {vision.implications.map((implication, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-px h-3 md:h-4 bg-brand-light/40 mr-2 md:mr-3 mt-0.5 md:mt-1" />
                        <span className="break-words text-sm leading-relaxed text-white/60 md:text-base">{implication}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing statement */}
          <motion.div
            className="mt-12 border-t border-white/10 pt-8 md:mt-16 md:pt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <h3 className="text-display-md font-light mb-6 md:mb-8">
                {copy.closingTitle}
              </h3>
              <p className="text-base md:text-xl text-white/60 max-w-copy mx-auto leading-relaxed px-4">
                {copy.closingDescription}
              </p>
              <p className="text-xl md:text-2xl font-light mt-6 md:mt-8 text-brand-light">
                {copy.finalLine}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FutureVision;
