import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
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
  }, []);

  return (
    <>
      <Head>
        {/* Default SEO tags - will be overridden by page-specific tags */}
        <title>AeroNyx Network | Privacy-First Decentralized Computing</title>
        <meta name="description" content="AeroNyx Network empowers billions of devices with its privacy-first SDK, establishing a secure foundation for decentralized networks." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aeronyx.network/" />
        <meta property="og:title" content="AeroNyx Network | Privacy-First Decentralized Computing" />
        <meta property="og:description" content="AeroNyx Network empowers billions of devices with its privacy-first SDK, establishing a secure foundation for decentralized networks." />
        <meta property="og:image" content="https://aeronyx.network/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://aeronyx.network/" />
        <meta property="twitter:title" content="AeroNyx Network | Privacy-First Decentralized Computing" />
        <meta property="twitter:description" content="AeroNyx Network empowers billions of devices with its privacy-first SDK, establishing a secure foundation for decentralized networks." />
        <meta property="twitter:image" content="https://aeronyx.network/twitter-image.jpg" />
        
        {/* Additional SEO tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="privacy, decentralized computing, blockchain, network, SDK, secure computing, privacy-first" />
        <meta name="author" content="AeroNyx Network" />
        <link rel="canonical" href="https://aeronyx.network/" />
      </Head>
      
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
