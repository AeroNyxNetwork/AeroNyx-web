import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroLogo3D from '../ui/HeroLogo3D';
import EnhancedButton from '../ui/EnhancedButton';
import Container from '../ui/Container';
import DownloadsModal from '../ui/DownloadsModal';
import OnlyAdditionalMetrics from '../ui/OnlyAdditionalMetrics';

const ModernHero = () => {
  const [isDownloadsModalOpen, setIsDownloadsModalOpen] = useState(false);
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6
      }
    }
  };

  // Badge variants for the "New" tag
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: 1
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Subtle animated radial gradient for depth */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-neutral-900" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(119, 98, 243, 0.15), rgba(0, 0, 0, 0) 70%)',
              'radial-gradient(circle at 40% 50%, rgba(119, 98, 243, 0.12), rgba(0, 0, 0, 0) 70%)',
              'radial-gradient(circle at 60% 40%, rgba(119, 98, 243, 0.15), rgba(0, 0, 0, 0) 70%)',
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="lg:col-span-7 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* New version badge */}
            <motion.div
              className="inline-block mb-4"
              variants={badgeVariants}
            >
              <div className="flex items-center bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full pl-2 pr-4 py-1">
                <div className="bg-primary rounded-full h-6 w-6 flex items-center justify-center mr-2">
                  <span className="text-xs font-semibold">✦</span>
                </div>
                <span className="text-sm font-medium">AeroNyx Protocol v2.0 Released</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Privacy-First 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-primary to-secondary ml-3">
                Decentralized
              </span>
              <br />Computing Infrastructure
            </motion.h1>
            
            <motion.p 
              className="text-xl text-neutral-300 mb-8 max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              AeroNyx Network empowers billions of devices with its privacy-first SDK, 
              establishing a secure foundation for device-to-device collaboration in our global marketplace.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-8"
              variants={itemVariants}
            >
              <EnhancedButton 
                size="large"
                onClick={() => setIsDownloadsModalOpen(true)}
              >
                Download SDK
              </EnhancedButton>
              
              <EnhancedButton 
                variant="secondary" 
                size="large" 
                as="a" 
                href="https://docs.aeronyx.network/" 
                target="_blank"
                rel="noopener noreferrer"
              >
                View Documentation
              </EnhancedButton>
            </motion.div>
            
            {/* Only Additional Network Stats - no primary stats */}
            <motion.div
              variants={itemVariants}
            >
              <OnlyAdditionalMetrics />
            </motion.div>
          </motion.div>
          
          {/* 3D Logo Visual */}
          <motion.div 
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative">
              {/* Main 3D Logo */}
              <HeroLogo3D size={1.2} />
              
              {/* Floating Features */}
              <div className="absolute -top-8 -right-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 z-20 shadow-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Real-time Protection</div>
                    <div className="text-xs text-neutral-400">Zero-latency security</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-6 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 z-20 shadow-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">End-to-End Encrypted</div>
                    <div className="text-xs text-neutral-400">Military-grade security</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Download Call-to-Action */}
        <motion.div 
          className="mt-16 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Ready to join the decentralized revolution?</h3>
              <p className="text-neutral-300">Contribute your device resources and get rewarded.</p>
            </div>
            <EnhancedButton 
              size="large"
              onClick={() => setIsDownloadsModalOpen(true)}
            >
              Download Node Software
            </EnhancedButton>
          </div>
        </motion.div>
      </Container>
      
      {/* Trusted By Companies */}
      <motion.div 
        className="absolute bottom-4 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <div className="text-center">
          <div className="text-xs text-neutral-500 mb-2 uppercase tracking-widest">Trusted by industry leaders</div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['SOON', 'DePHY', 'WaterDrip', 'JRR Crypto', 'MIT'].map((brand, index) => (
              <div key={index} className="text-neutral-400 font-medium mx-2">{brand}</div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Downloads Modal */}
      <DownloadsModal 
        isOpen={isDownloadsModalOpen}
        onClose={() => setIsDownloadsModalOpen(false)}
      />
    </section>
  );
};

export default ModernHero;
