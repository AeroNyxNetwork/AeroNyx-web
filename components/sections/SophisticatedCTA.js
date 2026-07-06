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
 * Modification Reason: v2.9 - Partnership inbox alignment.
 *   The quiet partnership link now uses hi@aeronyx.network, matching the
 *   official contact inbox used by the site footer.
 *
 * Modification Reason: v3.0 - Closing app action alignment.
 *   The final action surface now labels the app/operator destination as
 *   "Launch App" instead of "Open Nodeboard" so the homepage closes with the
 *   same product-level IA used by the hero, header, and footer.
 *
 * Modification Reason: v3.1 - Closing protocol promise polish.
 *   The final proof area now reads as one protocol promise strip instead of
 *   three separated mini cards. CTA typography and spacing use clamp-based
 *   sizing so the closing conversion surface feels deliberate on mobile and
 *   desktop without changing destinations or copy.
 *
 * Historical Notes:
 * v2.5 — Product-action closing surface.
 *   Replaced the two-action whitepaper/contact ending with a clearer
 *   three-action product surface: protocol docs, MemChain, and app access.
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
 *   - Keep the third action product-level ("Launch App"). Nodeboard belongs in
 *     node-operator context, not as a global homepage closing action.
 *
 * Last Modified: v2.4 — Final CTA eyebrow rhythm alignment
 * Last Modified: v2.5 — Product-action closing surface
 * Last Modified: v2.6 — Closing proof strip
 * Last Modified: v2.7 - Closing eyebrow internationalization
 * Last Modified: v2.8 - Protocol docs URL alignment
 * Last Modified: v2.9 - Partnership inbox alignment
 * Last Modified: v3.0 - Closing app action alignment
 * Last Modified: v3.1 - Closing protocol promise polish
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
    { value: 'Useful', label: 'Privacy Network, MemChain, and App access are entry points.' },
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
      label: copy.app || 'Launch App',
      href: 'https://app.aeronyx.network/',
      external: true,
      tone: 'secondary',
    },
  ];

  return (
    <section className="border-t border-white/10 py-14 md:py-24" style={{ background: 'var(--surface-0, #08080D)' }}>
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          {/* Main message — whileInView (v2.0 fix) */}
          <motion.div
            className="mx-auto mb-8 max-w-4xl md:mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="mb-3 text-[10px] uppercase tracking-eyebrow text-brand-light md:mb-4">
              {copy.eyebrow || 'Build On AeroNyx'}
            </div>
            <h2 className="mb-4 text-[clamp(2.55rem,11vw,6.5rem)] font-light leading-[0.94] tracking-normal md:mb-6">
              {copy.line1}
              <span className="block font-medium">{copy.line2}</span>
            </h2>

            <p className="mx-auto max-w-copy text-base font-light leading-relaxed text-white/55 md:text-xl">
              {copy.description}
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mb-8 grid max-w-4xl grid-cols-1 overflow-hidden rounded border border-white/10 bg-white/[0.025] text-left sm:grid-cols-3 md:mb-10"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            {proofItems.map((item, index) => (
              <div
                key={item.value}
                className={`min-w-0 px-4 py-4 md:px-5 md:py-5 ${
                  index > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''
                }`}
              >
                <div className="font-mono text-xl font-light leading-none text-brand-light md:text-2xl">
                  {item.value}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-white/58 md:min-h-[3.5rem]">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div
            className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
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
                  className={`group flex min-h-[54px] items-center justify-center rounded border px-5 py-3 text-center transition-colors duration-fast ${
                    action.tone === 'primary'
                      ? 'border-brand-line bg-brand-faint text-white shadow-[0_18px_70px_rgba(119,98,243,0.12)] hover:bg-brand/15'
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
                  className="group flex min-h-[54px] items-center justify-center rounded border border-white/15 px-5 py-3 text-center text-white/68 transition-colors duration-fast hover:border-brand-line hover:bg-white/[0.035] hover:text-white"
                >
                  <span className="text-xs uppercase tracking-eyebrow sm:text-[13px]">
                    {action.label}
                  </span>
                </Link>
              )
            ))}
          </motion.div>

          <motion.a
            href="mailto:hi@aeronyx.network"
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
