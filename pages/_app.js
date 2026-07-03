/**
 * ============================================
 * File: pages/_app.js
 * ============================================
 * Modification Reason: v2.1 — Wired next/font (Next 13.4 confirmed via
 *   package.json). Inter (variable) now self-hosted and injected as
 *   --font-sans / --font-display / --font-mono CSS variables consumed
 *   by tailwind.config.js v2.0 and globals.css v3.0. Eliminates FOUT
 *   and third-party font requests on all platforms.
 *   (v2.0 changes retained: delegated smooth scroll, zoom unlock,
 *   orientationchange --vh updater. See v2.0 header notes.)
 *
 * ⚠️ Important Notes for Next Developer:
 *   - next/font must be called at module scope (Next.js constraint).
 *   - --font-display currently maps to Inter; if a display serif is
 *     approved later, add a second next/font call and change ONLY the
 *     --font-display line in the wrapper div style.
 *   - Do NOT reintroduce per-element anchor listeners or user-scalable=no.
 *
 * Last Modified: v2.1 — next/font wiring
 * ============================================
 */

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import '../styles/scrollbar.css';
import { DEFAULT_LOCALE, getMessages } from '../lib/i18n';

// Module scope (Next.js requirement)
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
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
      className={`${inter.variable} ${mono.variable}`}
      style={{
        '--font-sans': 'var(--font-inter)',
        '--font-display': 'var(--font-inter)',
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
