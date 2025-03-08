import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import '@/styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  // Add smooth scroll behavior
  useEffect(() => {
    // Add 'loaded' class for fade-in animations
    document.documentElement.classList.add('loaded');
    
    // Set up smooth anchor scrolling
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
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
