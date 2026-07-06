import Head from 'next/head';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../../lib/i18n';

/**
 * ============================================
 * File Creation/Modification Notes
 * ============================================
 * File Purpose:
 *   Shared SEO metadata component for AeroNyx website pages.
 *
 * Modification Reason: v1.2 - Decentralized node keyword alignment.
 *   Replaced implementation-language fallback keywords with public product
 *   wording so metadata describes open decentralized nodes rather than the
 *   underlying implementation language.
 *
 * Modification Reason: v1.3 - Multilingual alternate links.
 *   The shared SEO surface now emits hreflang alternates for every supported
 *   locale plus x-default. This helps search engines and AI retrieval systems
 *   connect the English, Russian, Chinese, Japanese, Korean, and Spanish
 *   versions of the same page without relying on client-side locale switches.
 *
 * Historical Notes:
 * v1.1 - Protocol-first default metadata.
 *   Replaced legacy fallback keywords with AeroNyx's current protocol narrative
 *   so future pages that do not provide explicit metadata still describe the
 *   open blind coordination layer.
 *
 * Main Functionality:
 *   - Emits title, description, keywords, canonical, Open Graph, and Twitter
 *     metadata for page-level SEO/GEO surfaces.
 *
 * Dependencies:
 *   - next/head for document metadata injection.
 *
 * Important Note for Next Developer:
 *   - Page-specific SEO props should still be preferred.
 *   - Keep fallback copy aligned with the protocol narrative: encrypted
 *     routing, encrypted messaging, private memory, and blind open protocol.
 *
 * Last Modified: v1.1 - Protocol-first default metadata
 * Last Modified: v1.2 - Decentralized node keyword alignment
 * Last Modified: v1.3 - Multilingual alternate links
 * ============================================
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.canonicalUrl - Canonical URL for the page
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type
 * @param {Array} props.keywords - Array of keywords for the page
 */
const SITE_ORIGIN = 'https://aeronyx.network';

const getCanonicalUrl = (canonicalUrl) => {
  try {
    const url = new URL(canonicalUrl, SITE_ORIGIN);
    const href = url.toString();
    return href.endsWith('/') && url.pathname !== '/' ? href.slice(0, -1) : href.replace(/\/$/, '');
  } catch {
    return SITE_ORIGIN;
  }
};

const stripLocalePrefix = (pathname) => {
  const localeCodes = new Set(SUPPORTED_LOCALES.map((locale) => locale.code));
  const segments = String(pathname || '/').split('/').filter(Boolean);
  if (segments.length > 0 && localeCodes.has(segments[0])) {
    segments.shift();
  }

  return segments.length > 0 ? `/${segments.join('/')}` : '';
};

const buildLocaleUrl = (canonical, localeCode) => {
  const url = new URL(canonical, SITE_ORIGIN);
  const basePath = stripLocalePrefix(url.pathname);
  const localizedPath = localeCode === DEFAULT_LOCALE
    ? basePath
    : `/${localeCode}${basePath}`;

  return `${SITE_ORIGIN}${localizedPath}`;
};

const SEO = ({ 
  title = 'AeroNyx | Encrypted coordination layer for autonomous agents',
  description = 'AeroNyx lets humans, apps, and AI agents route traffic, exchange encrypted messages, preserve private memory, and coordinate work through a blind, open protocol.',
  canonicalUrl = 'https://aeronyx.network/',
  ogImage = 'https://binary.aeronyx.network/aeronyx_logo.png',
  ogType = 'website',
  keywords = ['encrypted coordination layer', 'blind protocol', 'privacy network', 'private AI memory', 'encrypted messaging', 'agent coordination', 'open decentralized nodes']
}) => {
  const canonical = getCanonicalUrl(canonicalUrl);
  const keywordText = Array.isArray(keywords) ? keywords.join(', ') : String(keywords || '');
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordText} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={buildLocaleUrl(canonical, DEFAULT_LOCALE)} />
      {SUPPORTED_LOCALES.map((item) => (
        <link
          key={item.code}
          rel="alternate"
          hrefLang={item.code}
          href={buildLocaleUrl(canonical, item.code)}
        />
      ))}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
};

export default SEO;
