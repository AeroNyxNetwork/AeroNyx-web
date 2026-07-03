/**
 * ============================================
 * File: pages/_document.js
 * ============================================
 * Modification Reason: v1.2 — Apple-grade locale and font loading cleanup.
 *   next/font in pages/_app.js now owns Inter, Inter Tight, and JetBrains Mono
 *   loading. The legacy Google Fonts stylesheet link is removed to prevent
 *   duplicate Inter downloads, reduce layout-shift risk, and keep typography
 *   behavior consistent across Safari, iOS, macOS, Windows, and Android.
 *   The root <html lang> now follows Next.js locale metadata so Safari,
 *   VoiceOver, and search engines receive the correct language signal.
 *
 * Main Functionality:
 *   - Defines the base HTML document shell, favicon links, and mobile PWA
 *     meta tags used by every page.
 *
 * Dependencies:
 *   - pages/_app.js v2.5 for locale-aware font variables and root lang.
 *   - styles/globals.css v3.2 for Apple-style responsive typography.
 *
 * ⚠️ Important Note for Next Developer:
 *   - Do not re-add external Google Fonts stylesheet links here unless
 *     next/font is deliberately removed from _app.js.
 *
 * Last Modified: v1.2 — Locale-aware html lang + font cleanup
 * ============================================
 */

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(props) {
  const locale = props.__NEXT_DATA__?.locale || 'en';

  return (
    <Html lang={locale}>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="https://binary.aeronyx.network/favicon.ico" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="https://binary.aeronyx.network/favicon.ico" />

        {/* Meta tags */}
        <meta name="theme-color" content="#7762F3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
