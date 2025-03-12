import React, { useState, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Button from '../ui/Button';
import Container from '../ui/Container';

// Dynamically import the enhanced background component
const EnhancedBackground = dynamic(
  () => import('./EnhancedBackground'),
  { ssr: false }
);

// Dynamically import the optimized logo component
const OptimizedLogoComponent = dynamic(
  () => import('./OptimizedLogoComponent'),
  { ssr: false }
);

// Fallback simpler logo for initial load or low-end devices
const SimpleLogo = ({ width = 120, height = 120 }) => (
  <div 
    className="relative w-32 h-32 mx-auto mb-6 rounded-full 
              bg-gradient-to-br from-primary to-secondary 
              flex items-center justify-center"
    style={{ width, height }}
  >
    <svg 
      width="60%" 
      height="60%" 
      viewBox="0 0 512 512" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0,512) scale(0.1,-0.1)" fill="white">
        <path d="M1277 3833 l-1277 -1278 0 -1275 0 -1275 1280 1280 1280 1280 -2 1273 -3 1272 -1278 -1277z" />
        <path d="M3838 3833 l-1278 -1278 0 -1275 0 -1275 1280 1280 1280 1280 -2 1273-3 1272-1277 -1277z" />
      </g>
    </svg>
    <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-xl"></div>
  </div>
);

// New modal component for downloads
const DownloadsModal = dynamic(
  () => import('../ui/DownloadsModal'),
  { ssr: false }
);

// Enhanced Hero component
const EnhancedHero = () => {
  // State for managing download modal
  const [isDownloadsModalOpen, setIsDownloadsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    isMobile: false,
    preferReducedMotion: false
  });
  
  // Check device capabilities on mount
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;
    
    // Device detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    setDeviceCapabilities({
      isMobile,
      preferReducedMotion
    });
    
    // Mark component as loaded after a short delay to allow transitions
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Enhanced background effect */}
      <Suspense fallback={<div className="fixed inset-0 bg-neutral-900"></div>}>
        <EnhancedBackground className="z-0" />
      </Suspense>
      
      {/* Main content */}
      <Container className="relative z-10 h-full flex flex-col justify-center py-32 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Privacy-First Computing Infrastructure
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-neutral-300 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AeroNyx Network empowers billions of devices with its privacy-first SDK, 
              establishing a secure foundation for decentralized networks.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Downloads button that opens the modal */}
              <Button 
                size="large"
                onClick={() => setIsDownloadsModalOpen(true)}
              >
                Downloads
              </Button>
              <Button 
                variant="secondary" 
                as="a" 
                href="https://docs.aeronyx.network/decentralized-node-documentation/run-aeronyx-decentralized-nodes-on-your-server-using-docker" 
                target="_blank" 
                rel="noopener noreferrer" 
                size="large"
              >
                Build a Node
              </Button>
            </motion.div>
          </div>
          
          {/* Right side content - animated logo and information */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="w-full relative bg-neutral-900/30 backdrop-blur-sm rounded-2xl border border-white/5 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/20 to-secondary-dark/10 rounded-2xl" />
              
              <div className="relative z-10 p-8 flex flex-col items-center">
                {/* Use optimized 3D logo if device supports it, otherwise use simple logo */}
                <Suspense fallback={<SimpleLogo />}>
                  {isLoaded && !deviceCapabilities.preferReducedMotion ? (
                    <OptimizedLogoComponent className="mb-6" size={0.8} />
                  ) : (
                    <SimpleLogo />
                  )}
                </Suspense>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Secure Privacy Layer</h3>
                  <p className="text-neutral-300 mb-6">
                    End-to-end encrypted communications with zero-knowledge proofs for maximum privacy.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-neutral-800/50 p-4 rounded-lg border border-white/5 shadow-inner">
                    <h4 className="font-semibold mb-2">GPU Resources</h4>
                    <p className="text-sm text-neutral-400">Trade computing power globally</p>
                  </div>
                  <div className="bg-neutral-800/50 p-4 rounded-lg border border-white/5 shadow-inner">
                    <h4 className="font-semibold mb-2">Bandwidth</h4>
                    <p className="text-sm text-neutral-400">Share network connections securely</p>
                  </div>
                  <div className="bg-neutral-800/50 p-4 rounded-lg border border-white/5 shadow-inner">
                    <h4 className="font-semibold mb-2">Storage</h4>
                    <p className="text-sm text-neutral-400">Decentralized encrypted storage</p>
                  </div>
                  <div className="bg-neutral-800/50 p-4 rounded-lg border border-white/5 shadow-inner">
                    <h4 className="font-semibold mb-2">CPU</h4>
                    <p className="text-sm text-neutral-400">Distributed computing power</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
      
      {/* Downloads Modal */}
      <DownloadsModal 
        isOpen={isDownloadsModalOpen}
        onClose={() => setIsDownloadsModalOpen(false)}
      />
    </section>
  );
};

export default EnhancedHero;
