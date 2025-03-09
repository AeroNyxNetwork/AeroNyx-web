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
    
    // Fix for animations - force all motion elements to be visible after a delay
    const forceVisibilityTimer = setTimeout(() => {
      document.querySelectorAll('[style*="opacity: 0"]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.classList.add('force-visible');
      });
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(forceVisibilityTimer);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen text-white font-sans">
      {/* Note: No background color to allow background effects to show through */}
      <div className="relative z-5 flex flex-col min-h-screen">
        <Header />
        <motion.main
          className="flex-grow"
          initial={{ opacity: 1 }} // Start visible
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'relative', zIndex: 5 }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
