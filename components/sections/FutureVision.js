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
 * Modification Reason: v2.7 - Protocol roadmap panel polish.
 *   Roadmap milestones now render as calm protocol-stage panels with compact
 *   proof chips and a dedicated closing promise card, reducing mobile bulk
 *   while keeping roadmap copy unchanged and credibility-bounded.
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
 * Last Modified: v2.7 - Protocol roadmap panel polish
 * ============================================
 */

import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { DEFAULT_LOCALE, getMessages } from '../../lib/i18n';

const EASE = [0.16, 1, 0.3, 1];

const normalizeLocaleCode = (locale, asPath) => {
  const candidate = locale || String(asPath || '').split('/').filter(Boolean)[0];
  if (candidate === 'kr' || String(candidate).toLowerCase().startsWith('ko')) return 'ko';
  return candidate || DEFAULT_LOCALE;
};

const FutureVision = ({ activeLocale: providedLocale }) => {
  const { locale, asPath } = useRouter();
  const activeLocale = normalizeLocaleCode(providedLocale || locale, asPath);
  const messages = getMessages(activeLocale);
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
            <h2 className="mb-4 text-[clamp(2.35rem,9vw,5.5rem)] font-light leading-[0.96] tracking-normal md:mb-6">
              {copy.title}
            </h2>
            <p className="max-w-copy text-base leading-relaxed text-white/48 md:text-xl">
              {copy.description}
            </p>
          </motion.div>

          {/* Vision timeline */}
          <div className="space-y-3 md:space-y-4" role="list">
            {visions.map((vision, index) => (
              <motion.div
                key={vision.year}
                role="listitem"
                className="page-card relative overflow-hidden rounded border p-4 md:p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: EASE }}
              >
                <div className="grid gap-5 md:grid-cols-[0.64fr_2fr] md:gap-8">
                  <div className="flex items-start justify-between gap-4 md:block md:text-right">
                    <div className="font-mono text-[11px] uppercase tracking-eyebrow text-brand-light/70">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="font-mono text-[clamp(2.1rem,13vw,4.6rem)] font-extralight leading-none text-white/16">
                      {vision.year}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 break-words text-[clamp(1.5rem,6vw,2.55rem)] font-light leading-[1.04] tracking-normal md:mb-4">
                      {vision.title}
                    </h3>
                    <p className="mb-4 break-words text-sm leading-relaxed text-white/62 md:mb-6 md:text-base">
                      {vision.description}
                    </p>

                    <div>
                      <div className="mb-2 text-[10px] uppercase tracking-eyebrow text-white/40 md:mb-3 md:text-xs">
                        {copy.unlocksLabel}
                      </div>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {vision.implications.map((implication, i) => (
                          <div
                            key={implication}
                            className="min-h-[4.25rem] rounded border border-white/10 bg-white/[0.025] p-3"
                          >
                            <div className="mb-2 font-mono text-[10px] uppercase tracking-eyebrow text-brand-light/65">
                              {String(i + 1).padStart(2, '0')}
                            </div>
                            <span className="break-words text-sm leading-relaxed text-white/60">{implication}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing statement */}
          <motion.div
            className="page-card mt-10 rounded border p-6 text-center md:mt-14 md:p-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="mb-5 text-[clamp(1.75rem,7vw,3.35rem)] font-light leading-[1.02] tracking-normal md:mb-7">
                {copy.closingTitle}
              </h3>
              <p className="mx-auto max-w-copy text-base leading-relaxed text-white/62 md:text-xl">
                {copy.closingDescription}
              </p>
              <p className="mt-6 text-lg font-light leading-relaxed text-brand-light md:mt-8 md:text-2xl">
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
