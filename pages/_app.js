/**
 * ============================================
 * File: pages/_app.js
 * ============================================
 * Modification Reason: v2.5 — Locale-aware 2026 trust typography system.
 *   --font-display now resolves to Inter Tight while body copy remains Inter
 *   and code/ciphertext remains JetBrains Mono. This creates the polished
 *   VC-deck feel the homepage needs without returning to a hard-to-read
 *   editorial serif. Cyrillic subsets are loaded for Russian pages; CJK pages
 *   keep native system fallback for readability.
 *   (v2.0/v2.1 changes retained: delegated smooth scroll, zoom unlock,
 *   orientationchange --vh, next/font self-hosting.)
 *
 * Modification Reason: v2.6 - Page SEO ownership cleanup.
 *   Page-specific SEO is now owned by components/ui/SEO.js, including canonical
 *   and hreflang alternates. _app keeps only global document-level metadata so
 *   MemChain, Privacy Network, homepage, and localized error pages do not emit
 *   duplicate canonical/Open Graph tags.
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Keep --font-display on var(--font-display-tight). It is the approved
 *     display face for the autonomous-agent coordination narrative.
 *   - Several sections reference var(--font-display) inline; this file is the
 *     central switch for homepage headline readability.
 *   - Keep the root `lang` attribute. globals.css v3.2 uses it to apply
 *     Apple-grade CJK fallback and line-height rules for multilingual pages.
 *
 * Last Modified: v2.5 — Locale-aware typography root
 * Last Modified: v2.6 - Page SEO ownership cleanup
 * ============================================
 */

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import '../styles/scrollbar.css';
import { DEFAULT_LOCALE } from '../lib/i18n';

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap', variable: '--font-inter' });
const display = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-display-tight',
});
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-jbmono' });
function MyApp({ Component, pageProps, router }) {
  const locale = router.locale || DEFAULT_LOCALE;

  useEffect(() => {
    document.documentElement.classList.add('loaded');

    const onDocumentClick = (e) => {
      if (e.defaultPrevented) return;
      const anchor = e.target.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      let target = null;
      try {
        target = document.querySelector(href);
      } catch {
        return;
      }
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };
    document.addEventListener('click', onDocumentClick);

    const appHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    appHeight();
    window.addEventListener('resize', appHeight);
    window.addEventListener('orientationchange', appHeight);

    return () => {
      document.removeEventListener('click', onDocumentClick);
      window.removeEventListener('resize', appHeight);
      window.removeEventListener('orientationchange', appHeight);
    };
  }, []);

  return (
    <div
      lang={locale}
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
      style={{
        '--font-sans': 'var(--font-inter)',
        '--font-display': 'var(--font-display-tight)',
        '--font-mono': 'var(--font-jbmono)',
      }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="AeroNyx Network" />
      </Head>

      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </div>
  );
}

export default MyApp;
