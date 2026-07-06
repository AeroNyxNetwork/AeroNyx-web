/**
 * ============================================
 * File Creation/Modification Notes
 * ============================================
 * Creation Reason:
 *   Next.js default 404 output is English-only. AeroNyx now serves localized
 *   marketing pages, so missing-route handling must use the same multilingual
 *   trust surface as the rest of the website.
 *
 * Modification Reason:
 *   v1.0 - Localized custom 404 page.
 *
 * Modification Reason: v1.1 - Error page noindex control.
 *   The shared 404/500 shell now passes noIndex into SEO so polished localized
 *   error pages remain user-friendly without being indexed as product content.
 *
 * Main Functionality:
 *   - Renders a localized missing-route page for every configured locale.
 *   - Keeps AeroNyx's protocol-first visual language, header, footer, SEO, and
 *     CTA hierarchy consistent with the main website.
 *   - Exports ErrorPageShell so pages/500.js can reuse the same shell without
 *     duplicating layout logic.
 *
 * Dependencies:
 *   - next/link and next/router for locale-aware navigation.
 *   - components/layout/SiteHeader and Footer for shared navigation surfaces.
 *   - components/ui/SEO for page metadata.
 *   - lib/i18n errorPages copy.
 *
 * Main Logical Flow:
 *   1. Resolve the active locale from Next.js router metadata.
 *   2. Select localized error-page copy, falling back to English if needed.
 *   3. Render a compact protocol-status style error surface with safe CTAs.
 *
 * Important Note for Next Developer:
 *   - Keep this page content-only. Do not add tracking, diagnostics, request
 *     identifiers, or user-level metadata to public error pages.
 *   - Keep pages/500.js importing ErrorPageShell from this file unless a real
 *     divergence in behavior is needed.
 *
 * Last Modified: v1.0 - Localized 404 page
 * Last Modified: v1.1 - Error page noindex control
 * ============================================
 */

import Link from 'next/link';
import { useRouter } from 'next/router';
import SEO from '../components/ui/SEO';
import SiteHeader from '../components/layout/SiteHeader';
import Footer from '../components/layout/Footer';
import { DEFAULT_LOCALE, getMessages } from '../lib/i18n';

const docsHref = 'https://docs.aeronyx.network/';

export const ErrorPageShell = ({ kind = 'notFound', statusCode = '404' }) => {
  const { locale } = useRouter();
  const activeLocale = locale || DEFAULT_LOCALE;
  const messages = getMessages(activeLocale);
  const fallbackMessages = getMessages(DEFAULT_LOCALE);
  const pageCopy = messages.errorPages?.[kind] || fallbackMessages.errorPages[kind];
  const canonicalPath = activeLocale === DEFAULT_LOCALE ? '' : `/${activeLocale}`;

  return (
    <>
      <SEO
        title={`${pageCopy.title} | AeroNyx`}
        description={pageCopy.description}
        canonicalUrl={`https://aeronyx.network${canonicalPath}/`}
        keywords={messages.seo.keywords}
        noIndex
      />

      <SiteHeader />

      <main className="relative min-h-screen overflow-hidden border-b border-white/10 pt-28" style={{ background: 'var(--surface-0, #08080D)' }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.24) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div className="absolute left-1/2 top-28 h-64 w-64 -translate-x-1/2 rounded-pill border border-brand-line/25 opacity-30" />
        <div className="absolute left-[12%] top-[38%] h-px w-[76%] bg-gradient-to-r from-transparent via-brand-light/30 to-transparent" />

        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-5xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid w-full gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div className="min-w-0">
              <div className="inline-flex max-w-full items-center gap-2 border border-brand-line bg-brand-faint px-3 py-1.5 text-[10px] uppercase leading-4 tracking-eyebrow text-brand-light">
                <span className="break-words">{pageCopy.eyebrow}</span>
              </div>
              <div className="mt-8 font-mono text-[clamp(4rem,22vw,9rem)] font-light leading-none text-white/12">
                {statusCode}
              </div>
            </div>

            <div className="page-surface min-w-0 border p-5 sm:p-7 md:p-9">
              <div className="mb-4 text-[10px] uppercase tracking-eyebrow text-white/35">
                {pageCopy.statusLabel}
              </div>
              <h1 className="max-w-3xl break-words text-display-md font-light leading-tight text-white md:text-display-lg">
                {pageCopy.title}
              </h1>
              <p className="mt-5 max-w-copy text-sm leading-relaxed text-white/56 md:text-base">
                {pageCopy.description}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/"
                  locale={activeLocale}
                  className="flex min-h-[52px] items-center justify-center rounded border border-brand-line bg-brand-faint px-5 py-3 text-center text-sm uppercase tracking-eyebrow text-white transition-colors hover:bg-brand/15"
                >
                  {pageCopy.primaryCta}
                </Link>
                <a
                  href={docsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[52px] items-center justify-center rounded border border-white/15 px-5 py-3 text-center text-sm uppercase tracking-eyebrow text-white/68 transition-colors hover:border-brand-line hover:bg-white/[0.035] hover:text-white"
                >
                  {pageCopy.secondaryCta}
                </a>
              </div>

              <div className="mt-6 border border-white/10 bg-black/25 px-3 py-2 text-xs leading-relaxed text-white/42">
                {pageCopy.boundary}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

const Custom404 = () => <ErrorPageShell kind="notFound" statusCode="404" />;

export default Custom404;
