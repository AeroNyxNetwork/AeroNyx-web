/**
 * ============================================
 * File: components/sections/SophisticatedCTA.jsx
 * ============================================
 * Modification Reason: v2.6 — Closing proof strip.
 *   Added a compact proof strip between the final thesis and the action
 *   buttons so the homepage closes on the protocol's three memorable
 *   qualities: blind, open, and useful. The primary actions remain unchanged.
 *
 * Modification Reason: v2.7 - Closing eyebrow internationalization.
 *   The final "Build on AeroNyx" eyebrow now comes from lib/i18n so localized
 *   homepages do not end with an English-only section label.
 *
 * Modification Reason: v2.8 - Protocol docs URL alignment.
 *   The final primary action now points to the maintained Protocol
 *   Architecture docs page instead of the retired whitepaper slug. Keep this
 *   destination aligned with the Footer's protocol architecture resource link.
 *
 * Historical Notes:
 * v2.5 — Product-action closing surface.
 *   Replaced the two-action whitepaper/contact ending with a clearer
 *   three-action product surface: protocol docs, MemChain, and Nodeboard.
 *   The partnership email remains as a quiet secondary link below the main
 *   actions so the page resolves into what users can actually do next.
 *
 * Historical Notes:
 * v2.4 — Final conversion rhythm polish.
 *   Added a restrained final eyebrow before the closing CTA so the bottom of
 *   the homepage resolves with the same protocol-first hierarchy established
 *   by the hero, product index, architecture, and roadmap sections.
 *
 * Historical Notes:
 * v2.0 — Interaction fix + alignment.
 *   1. FIX: entrance animations used `animate` (fired on page mount) —
 *      this section sits at the very bottom, so the animation always
 *      completed long before the user scrolled to it. Now whileInView.
 *   2. The legacy whitepaper URL was aligned with Footer at the time; v2.8
 *      replaces that retired slug with the maintained protocol architecture
 *      docs page.
 *   3. Tracking values (0.15em/0.2em) unified to the eyebrow token;
 *      primary CTA hover aligned to brand hover language.
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Keep whileInView here — do not revert to animate.
 *   - Protocol docs URL must match Footer; change both together.
 *
 * Last Modified: v2.4 — Final CTA eyebrow rhythm alignment
 * Last Modified: v2.5 — Product-action closing surface
 * Last Modified: v2.6 — Closing proof strip
 * Last Modified: v2.7 - Closing eyebrow internationalization
 * Last Modified: v2.8 - Protocol docs URL alignment
 * ============================================
 */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { DEFAULT_LOCALE, getMessages } from '../../lib/i18n';

const EASE = [0.16, 1, 0.3, 1];

const SophisticatedCTA = () => {
  const { locale } = useRouter();
  const copy = getMessages(locale || DEFAULT_LOCALE).cta;
  const proofItems = copy.proofs || [
    { value: 'Blind', label: 'Nodes coordinate without reading payloads.' },
    { value: 'Open', label: 'Protocol docs, public code, aggregate health.' },
    { value: 'Useful', label: 'Privacy Network, MemChain, and Nodeboard are entry points.' },
  ];
  const actions = [
    {
      label: copy.docs || copy.whitepaper,
      href: 'https://docs.aeronyx.network/intro/aeronyx-app-and-protocol-architecture',
      external: true,
      tone: 'primary',
    },
    {
      label: copy.memchain || 'Explore MemChain',
      href: '/memchain',
      external: false,
      tone: 'secondary',
    },
    {
      label: copy.nodeboard || 'Open Nodeboard',
      href: 'https://app.aeronyx.network/',
      external: true,
      tone: 'secondary',
    },
  ];

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
            <div className="mb-3 text-[10px] uppercase tracking-eyebrow text-brand-light md:mb-4">
              {copy.eyebrow || 'Build On AeroNyx'}
            </div>
            <h2 className="text-display-xl font-light mb-4 md:mb-6 px-4">
              {copy.line1}
              <span className="block font-medium">{copy.line2}</span>
            </h2>

            <p className="text-base md:text-xl text-white/50 font-light max-w-copy mx-auto px-4 leading-relaxed">
              {copy.description}
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mb-8 grid max-w-3xl grid-cols-1 gap-2.5 px-4 sm:grid-cols-3 md:mb-10"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            {proofItems.map((item) => (
              <div key={item.value} className="page-card min-w-0 border px-4 py-4 text-left sm:text-center">
                <div className="font-mono text-lg font-light leading-none text-brand-light md:text-xl">
                  {item.value}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-white/58">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div
            className="mx-auto grid max-w-3xl grid-cols-1 gap-3 px-4 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            {actions.map((action) => (
              action.external ? (
                <a
                  key={action.href}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex min-h-[52px] items-center justify-center rounded border px-5 py-3 text-center transition-colors duration-fast ${
                    action.tone === 'primary'
                      ? 'border-brand-line bg-brand-faint text-white hover:bg-brand/15'
                      : 'border-white/15 text-white/68 hover:border-brand-line hover:bg-white/[0.035] hover:text-white'
                  }`}
                >
                  <span className="text-xs uppercase tracking-eyebrow sm:text-[13px]">
                    {action.label}
                  </span>
                </a>
              ) : (
                <Link
                  key={action.href}
                  href={action.href}
                  locale={locale || DEFAULT_LOCALE}
                  className="group flex min-h-[52px] items-center justify-center rounded border border-white/15 px-5 py-3 text-center text-white/68 transition-colors duration-fast hover:border-brand-line hover:bg-white/[0.035] hover:text-white"
                >
                  <span className="text-xs uppercase tracking-eyebrow sm:text-[13px]">
                    {action.label}
                  </span>
                </Link>
              )
            ))}
          </motion.div>

          <motion.a
            href="mailto:partnerships@aeronyx.network"
            className="mx-auto mt-6 inline-flex min-h-[44px] items-center justify-center rounded px-4 py-2 text-white/40 transition-colors duration-fast hover:text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
          >
            <span className="text-xs uppercase tracking-eyebrow sm:text-sm">
              {copy.partnership}
            </span>
          </motion.a>
        </div>
      </Container>
    </section>
  );
};

export default SophisticatedCTA;
