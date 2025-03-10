import Head from 'next/head';

/**
 * SEO component for page-specific metadata
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.canonicalUrl - Canonical URL for the page
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type
 * @param {Array} props.keywords - Array of keywords for the page
 */
const SEO = ({ 
  title = 'AeroNyx Network | Privacy-First Decentralized Computing',
  description = 'AeroNyx Network empowers billions of devices with its privacy-first SDK, establishing a secure foundation for decentralized networks.',
  canonicalUrl = 'https://aeronyx.network/',
  ogImage = 'https://binary.aeronyx.network/aeronyx_logo.png',
  ogType = 'website',
  keywords = ['privacy', 'decentralized computing', 'blockchain', 'network', 'SDK', 'secure computing', 'privacy-first']
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
