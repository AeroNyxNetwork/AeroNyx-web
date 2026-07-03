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
 * ⚠️ Important Notes for Next Developer:
 *   - Keep --font-display on var(--font-display-tight). It is the approved
 *     display face for the autonomous-agent coordination narrative.
 *   - Several sections reference var(--font-display) inline; this file is the
 *     central switch for homepage headline readability.
 *   - Keep the root `lang` attribute. globals.css v3.2 uses it to apply
 *     Apple-grade CJK fallback and line-height rules for multilingual pages.
 *
 * Last Modified: v2.5 — Locale-aware typography root
 * ============================================
 */

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import '../styles/scrollbar.css';
import { DEFAULT_LOCALE, getMessages } from '../lib/i18n';

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap', variable: '--font-inter' });
const display = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-display-tight',
});
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-jbmono' });
function MyApp({ Component, pageProps, router }) {
  const locale = router.locale || DEFAULT_LOCALE;
  const copy = getMessages(locale);
  const canonicalPath = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const canonicalUrl = `https://aeronyx.network${canonicalPath}/`;

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
        <title>{copy.seo.title}</title>
        <meta name="description" content={copy.seo.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={copy.seo.title} />
        <meta property="og:description" content={copy.seo.description} />
        <meta property="og:image" content="https://binary.aeronyx.network/aeronyx_logo.png" />
        <meta property="og:locale" content={locale} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={copy.seo.title} />
        <meta property="twitter:description" content={copy.seo.description} />
        <meta property="twitter:image" content="https://binary.aeronyx.network/aeronyx_logo.png" />
        <meta name="keywords" content={copy.seo.keywords.join(', ')} />
        <meta name="author" content="AeroNyx Network" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </div>
  );
}

export default MyApp;
