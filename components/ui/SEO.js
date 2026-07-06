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
 * Modification Reason: v1.4 - Entity structured data for GEO.
 *   Added JSON-LD Organization, WebSite, WebPage, and SoftwareApplication
 *   graph data plus Open Graph locale/site metadata. This gives AI search and
 *   traditional crawlers a consistent entity model for AeroNyx, Privacy
 *   Network, MemChain, docs, app, GitHub, and social surfaces.
 *
 * Modification Reason: v1.5 - Error-page index control.
 *   Added an explicit noIndex prop so localized 404/500 pages can keep their
 *   polished user experience while telling search engines not to index error
 *   surfaces as product content.
 *
 * Modification Reason: v1.6 - Page-specific structured data extension.
 *   Added an additive JSON-LD graph extension path so product pages can expose
 *   claim-safe FAQPage, Article, or other schema nodes while preserving the
 *   shared AeroNyx Organization, WebSite, WebPage, and SoftwareApplication
 *   graph. This improves GEO extraction without duplicating base metadata.
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
 *   - Emits shared JSON-LD entity graph and optional page-specific graph
 *     additions for answer-engine citation surfaces.
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
 * Last Modified: v1.4 - Entity structured data for GEO
 * Last Modified: v1.5 - Error-page index control
 * Last Modified: v1.6 - Page-specific structured data extension
 * ============================================
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.canonicalUrl - Canonical URL for the page
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type
 * @param {Array} props.keywords - Array of keywords for the page
 * @param {Object} props.structuredData - Optional JSON-LD override
 * @param {Object|Array} props.extraStructuredData - Optional additive JSON-LD graph nodes
 * @param {boolean} props.noIndex - Whether crawlers should avoid indexing page
 */
const SITE_ORIGIN = 'https://aeronyx.network';
const ENTITY_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

const OG_LOCALE_BY_CODE = {
  en: 'en_US',
  ru: 'ru_RU',
  'zh-Hant': 'zh_TW',
  'zh-Hans': 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
  es: 'es_ES',
};

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

const getLocaleFromCanonical = (canonical) => {
  const url = new URL(canonical, SITE_ORIGIN);
  const firstSegment = url.pathname.split('/').filter(Boolean)[0];
  const localeCodes = new Set(SUPPORTED_LOCALES.map((locale) => locale.code));
  return localeCodes.has(firstSegment) ? firstSegment : DEFAULT_LOCALE;
};

const buildStructuredData = ({
  title,
  description,
  canonical,
  keywordText,
  ogImage,
}) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ENTITY_ID,
      name: 'AeroNyx',
      url: SITE_ORIGIN,
      logo: 'https://binary.aeronyx.network/aeronyx_logo.png',
      sameAs: [
        'https://github.com/AeroNyxNetwork',
        'https://twitter.com/AeroNyxNetwork',
        'https://t.me/AeroNyxNetwork',
        'https://docs.aeronyx.network/',
        'https://app.aeronyx.network/',
      ],
      description: 'AeroNyx is a blind open coordination protocol for private routing, encrypted messaging, private memory, and autonomous agent coordination.',
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_ORIGIN,
      name: 'AeroNyx',
      publisher: { '@id': ENTITY_ID },
      inLanguage: SUPPORTED_LOCALES.map((locale) => locale.code),
    },
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      keywords: keywordText,
      image: ogImage,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ENTITY_ID },
      publisher: { '@id': ENTITY_ID },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_ORIGIN}/#aeronyx-app`,
      name: 'AeroNyx',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'iOS, Android, macOS, Windows, Linux',
      url: 'https://app.aeronyx.network/',
      downloadUrl: `${SITE_ORIGIN}/privacy-network#privacy-access`,
      description: 'AeroNyx provides access to the Privacy Network, encrypted messaging, private memory, and blind coordination protocol surfaces.',
      publisher: { '@id': ENTITY_ID },
    },
  ],
});

const normalizeStructuredDataItems = (items) => {
  if (!items) {
    return [];
  }

  return (Array.isArray(items) ? items : [items]).filter(Boolean);
};

const mergeStructuredData = (baseData, extraItems) => {
  const additions = normalizeStructuredDataItems(extraItems);

  if (additions.length === 0) {
    return baseData;
  }

  const baseGraph = Array.isArray(baseData?.['@graph'])
    ? baseData['@graph']
    : normalizeStructuredDataItems(baseData);

  return {
    '@context': baseData?.['@context'] || 'https://schema.org',
    '@graph': [...baseGraph, ...additions],
  };
};

const SEO = ({ 
  title = 'AeroNyx | Encrypted coordination layer for autonomous agents',
  description = 'AeroNyx lets humans, apps, and AI agents route traffic, exchange encrypted messages, preserve private memory, and coordinate work through a blind, open protocol.',
  canonicalUrl = 'https://aeronyx.network/',
  ogImage = 'https://binary.aeronyx.network/aeronyx_logo.png',
  ogType = 'website',
  keywords = ['encrypted coordination layer', 'blind protocol', 'privacy network', 'private AI memory', 'encrypted messaging', 'agent coordination', 'open decentralized nodes'],
  structuredData,
  extraStructuredData,
  noIndex = false,
}) => {
  const canonical = getCanonicalUrl(canonicalUrl);
  const keywordText = Array.isArray(keywords) ? keywords.join(', ') : String(keywords || '');
  const activeLocale = getLocaleFromCanonical(canonical);
  const ogLocale = OG_LOCALE_BY_CODE[activeLocale] || OG_LOCALE_BY_CODE[DEFAULT_LOCALE];
  const jsonLd = mergeStructuredData(structuredData || buildStructuredData({
    title,
    description,
    canonical,
    keywordText,
    ogImage,
  }), extraStructuredData);
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordText} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
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
      <meta property="og:site_name" content="AeroNyx" />
      <meta property="og:locale" content={ogLocale} />
      {SUPPORTED_LOCALES
        .filter((item) => item.code !== activeLocale)
        .map((item) => (
          <meta
            key={item.code}
            property="og:locale:alternate"
            content={OG_LOCALE_BY_CODE[item.code] || item.code}
          />
        ))}
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
      <meta name="twitter:site" content="@AeroNyxNetwork" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};

export default SEO;
