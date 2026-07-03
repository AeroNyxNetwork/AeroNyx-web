/**
 * ============================================
 * File: pages/_app.js
 * ============================================
 * Modification Reason: v2.2 — Display typeface wired. Instrument Serif
 *   (Google Fonts, OFL) now drives --font-display for h1/h2 via the
 *   text-display-* scale; body remains Inter, code remains JetBrains
 *   Mono. This is the single highest-leverage "premium" change: the
 *   engineering-sans-body + characterful-serif-display pairing.
 *   (v2.0/v2.1 changes retained: delegated smooth scroll, zoom unlock,
 *   orientationchange --vh, next/font self-hosting.)
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Instrument Serif has weight 400 only — display headings must not
 *     request bold; use size/tracking for hierarchy.
 *   - To revert to a single-typeface look, change ONLY the
 *     --font-display line back to var(--font-inter).
 *
 * Last Modified: v2.2 — Instrument Serif display wiring
 * ============================================
 */

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import '../styles/globals.css';
import '../styles/scrollbar.css';
import { DEFAULT_LOCALE, getMessages } from '../lib/i18n';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-jbmono' });
const display = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument',
});

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
      className={`${inter.variable} ${mono.variable} ${display.variable}`}
      style={{
        '--font-sans': 'var(--font-inter)',
        '--font-display': 'var(--font-instrument)',
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
