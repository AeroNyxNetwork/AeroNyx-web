import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  // Handle scroll-based animations and effects
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight * 0.85) {
          el.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Added checks for Safari browser to apply specific fixes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Detect Safari browser
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isSafari) {
        // Add Safari-specific class to body for CSS targeting
        document.body.classList.add('safari');
        
        // Fix for potential Safari rendering issues
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans overflow-hidden relative">
      {/* Main layout - increased z-index to ensure content is above background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <motion.main
          className="flex-grow content-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
