import Head from 'next/head';

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
const SEO = ({ 
  title = 'AeroNyx | Encrypted coordination layer for autonomous agents',
  description = 'AeroNyx lets humans, apps, and AI agents route traffic, exchange encrypted messages, preserve private memory, and coordinate work through a blind, open protocol.',
  canonicalUrl = 'https://aeronyx.network/',
  ogImage = 'https://binary.aeronyx.network/aeronyx_logo.png',
  ogType = 'website',
  keywords = ['encrypted coordination layer', 'blind protocol', 'privacy network', 'private AI memory', 'encrypted messaging', 'agent coordination', 'open decentralized nodes']
}) => {
  // Canonical URL without trailing slash
  const canonical = canonicalUrl.endsWith('/') 
    ? canonicalUrl.slice(0, -1) 
    : canonicalUrl;
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
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
