import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import '../styles/globals.css';
import '../styles/scrollbar.css'; // Import the new scrollbar CSS
import { DEFAULT_LOCALE, getMessages } from '../lib/i18n';

function MyApp({ Component, pageProps, router }) {
  const locale = router.locale || DEFAULT_LOCALE;
  const copy = getMessages(locale);
  const canonicalPath = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const canonicalUrl = `https://aeronyx.network${canonicalPath}/`;

  // Handle smooth scrolling
  useEffect(() => {
    // Add 'loaded' class for fade-in animation
    document.documentElement.classList.add('loaded');
    
    // Set anchor smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add viewport height fix for mobile
    const appHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Call the function on first load
    appHeight();
    
    // Add event listener for resize
    window.addEventListener('resize', appHeight);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', appHeight);
    };
  }, []);

  return (
    <>
      <Head>
        {/* Default SEO tags - will be overridden by page-specific tags */}
        <title>{copy.seo.title}</title>
        <meta name="description" content={copy.seo.description} />
        
        {/* Responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
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
