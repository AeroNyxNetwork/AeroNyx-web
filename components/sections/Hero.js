import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Container from '../ui/Container';
import AnimatedLogo from '../ui/AnimatedLogo';
import DownloadsModal from '../ui/DownloadsModal';

// Updated Hero component with Downloads button and optimized modal
const Hero = () => {
  // State for managing download modal
  const [isDownloadsModalOpen, setIsDownloadsModalOpen] = useState(false);
  
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary-dark/5 to-transparent opacity-70" />
      
      <Container className="relative z-10 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Privacy-First Computing Infrastructure
            </motion.h1>
            
            <motion.p 
              className="text-xl text-neutral-300 mb-8 max-w-xl"
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
              <Button variant="secondary" as="a" href="https://app.aeronyx.network/" target="_blank" rel="noopener noreferrer" size="large">Building a decentralized node</Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/30 to-secondary-dark/20 rounded-2xl" />
              <div className="relative z-10 p-8">
                <AnimatedLogo className="w-32 h-32" />
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Secure Privacy Layer</h3>
                  <p className="text-neutral-300 mb-6">
                    End-to-end encrypted communications with zero-knowledge proofs for maximum privacy.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">GPU Resources</h4>
                    <p className="text-sm text-neutral-400">Trade computing power globally</p>
                  </div>
                  <div className="bg-neutral-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Bandwidth</h4>
                    <p className="text-sm text-neutral-400">Share network connections securely</p>
                  </div>
                  <div className="bg-neutral-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Storage</h4>
                    <p className="text-sm text-neutral-400">Decentralized encrypted storage</p>
                  </div>
                  <div className="bg-neutral-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">CPU</h4>
                    <p className="text-sm text-neutral-400">Distributed computing power</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
      
      {/* Optimized Downloads Modal */}
      <DownloadsModal 
        isOpen={isDownloadsModalOpen}
        onClose={() => setIsDownloadsModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
