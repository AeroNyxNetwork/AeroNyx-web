/**
 * ============================================
 * File: pages/_app.js
 * ============================================
 * Modification Reason: v2.0 — Platform-compatibility and interaction pass.
 *   1. FIX (a11y/Android): viewport meta no longer disables pinch-zoom.
 *      `maximum-scale=1.0, user-scalable=no` removed (WCAG 1.4.4; iOS has
 *      ignored it since iOS 10, Android was genuinely locked out).
 *   2. FIX (memory/interaction): per-anchor click listeners replaced with
 *      ONE delegated document listener with proper cleanup. Old code
 *      attached listeners only to anchors present at mount (missed the
 *      mobile menu / re-rendered links), never removed them, double-fired
 *      alongside AILHeader/NarrativeHero handlers, and threw on href="#".
 *   3. --vh updater now also listens to orientationchange (iOS/Android
 *      rotation without resize event edge cases).
 *
 * Main Functionality:
 *   - Global app shell: SEO defaults, global CSS, page transitions,
 *     smooth-scroll delegation, dynamic viewport height variable.
 *
 * Dependencies:
 *   - styles/globals.css v3.0, styles/scrollbar.css
 *   - lib/i18n (locale-aware default SEO)
 *   - Respected by: AILHeader / NarrativeHero anchor handlers (they
 *     preventDefault first; the delegated handler defers to them via
 *     e.defaultPrevented).
 *
 * Main Logical Flow:
 *   1. Resolve locale → default SEO meta (overridden per-page by SEO.js)
 *   2. Mount: add `loaded` class, delegated anchor listener, --vh updater
 *   3. Cleanup all listeners on unmount
 *
 * ⚠️ Important Notes for Next Developer:
 *   - Do NOT reintroduce per-element anchor listeners; delegation is
 *     intentional and must check e.defaultPrevented so component-level
 *     handlers (header, hero CTAs) keep priority.
 *   - Do NOT re-add user-scalable=no; it is an accessibility violation.
 *   - Font variables (--font-sans/display/mono) are wired here once the
 *     Next.js version is confirmed to support next/font (see globals.css
 *     fallbacks — site works without it).
 *
 * Last Modified: v2.0 — Delegated smooth scroll, zoom unlock, vh fix
 * ============================================
 */

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import '../styles/globals.css';
import '../styles/scrollbar.css';
import { DEFAULT_LOCALE, getMessages } from '../lib/i18n';

function MyApp({ Component, pageProps, router }) {
  const locale = router.locale || DEFAULT_LOCALE;
  const copy = getMessages(locale);
  const canonicalPath = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const canonicalUrl = `https://aeronyx.network${canonicalPath}/`;

  useEffect(() => {
    document.documentElement.classList.add('loaded');

    // ---- Delegated smooth scroll for in-page anchors (v2.0) ----
    // One listener for the whole document: covers dynamically rendered
    // links (mobile menu, locale switches) and cannot leak or stack.
    const onDocumentClick = (e) => {
      // A component-level handler (AILHeader / hero CTA) already handled it.
      if (e.defaultPrevented) return;

      const anchor = e.target.closest?.('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return; // guard: '#' is not a valid selector

      let target = null;
      try {
        target = document.querySelector(href);
      } catch {
        return; // malformed selector — let the browser do its default thing
      }

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };
    document.addEventListener('click', onDocumentClick);

    // ---- Dynamic viewport height (--vh) for mobile browsers ----
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
    <>
      <Head>
        {/* Default SEO tags — overridden by page-specific SEO component */}
        <title>{copy.seo.title}</title>
        <meta name="description" content={copy.seo.description} />

        {/* v2.0: pinch-zoom re-enabled (accessibility) */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={copy.seo.title} />
        <meta property="og:description" content={copy.seo.description} />
        <meta property="og:image" content="https://aeronyx.network/og-image.jpg" />
        <meta property="og:locale" content={locale} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={copy.seo.title} />
        <meta property="twitter:description" content={copy.seo.description} />
        <meta property="twitter:image" content="https://aeronyx.network/twitter-image.jpg" />

        {/* Additional SEO tags */}
        <meta name="keywords" content={copy.seo.keywords.join(', ')} />
        <meta name="author" content="AeroNyx Network" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
