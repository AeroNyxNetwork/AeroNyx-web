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
 * Modification Reason: v2.7 — Nightglass type system (2026-09-12 by Claude).
 *   Inter / Inter Tight / JetBrains Mono → Geist / Geist Mono (vendored
 *   variable WOFF2 via next/font/local) + Unbounded 700 for display.
 *   --font-display now resolves to Geist; the Unbounded face is exposed as
 *   --font-unbounded and used only by .ng-title / .ng-display. The root font
 *   variables are set with a styled-jsx global so `body { font-family }`
 *   actually receives the loaded face (the wrapper div below <body> never
 *   reached it). See docs/nightglass-web-brief.md.
 *
 * Modification Reason: v2.6 - Page SEO ownership cleanup.
 *   Page-specific SEO is now owned by components/ui/SEO.js, including canonical
 *   and hreflang alternates. _app keeps only global document-level metadata so
 *   MemChain, Privacy Network, homepage, and localized error pages do not emit
 *   duplicate canonical/Open Graph tags.
 *
 * ⚠️ Important Notes for Next Developer:
 *   - --font-display resolves to Geist (UI + headings); Unbounded is exposed
 *     as --font-unbounded and used only for .ng-title / .ng-display.
 *   - Several sections reference var(--font-display) inline; this file is the
 *     central switch for homepage headline readability.
 *   - Keep the root `lang` attribute. globals.css v3.2 uses it to apply
 *     Apple-grade CJK fallback and line-height rules for multilingual pages.
 *
 * Last Modified: v2.5 — Locale-aware typography root
 * Last Modified: v2.6 - Page SEO ownership cleanup
 * Last Modified: v2.7 — Nightglass type system
 * ============================================
 */

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { Unbounded } from 'next/font/google';
import localFont from 'next/font/local';
import '../styles/globals.css';
import '../styles/scrollbar.css';
import { DEFAULT_LOCALE } from '../lib/i18n';

// [NIGHTGLASS-WEB 2026-09-12 by Claude] The site sets the app's own type
// system: Geist for UI/body, Geist Mono for truth, Unbounded 700 for the one
// statement and the big numbers (docs/nightglass-web-brief.md §4). Geist /
// Geist Mono are vendored as variable WOFF2 (SIL OFL, from the `geist`
// package) under public/fonts — the package's own ESM entry needs Next 14+.
const geistSans = localFont({
  src: '../public/fonts/GeistVF.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: '../public/fonts/GeistMonoVF.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-geist-mono',
});
const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-unbounded-face',
});
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
      className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable}`}
      style={{
        '--font-sans': 'var(--font-geist-sans)',
        '--font-display': 'var(--font-geist-sans)',
        '--font-mono': 'var(--font-geist-mono)',
        '--font-unbounded': 'var(--font-unbounded-face)',
      }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="AeroNyx Network" />
      </Head>

      {/* Body-wide font variables must live on :root — body sits outside this
          wrapper, so a variable set here never reached `body { font-family }`
          and paragraph text fell back to the system face. This is the
          pages-router pattern from the next/font docs. */}
      <style jsx global>{`
        :root {
          --font-sans: ${geistSans.style.fontFamily};
          --font-display: ${geistSans.style.fontFamily};
          --font-mono: ${geistMono.style.fontFamily};
          --font-unbounded: ${unbounded.style.fontFamily};
        }
      `}</style>
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </div>
  );
}

export default MyApp;
