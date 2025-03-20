import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';
import EnhancedCard from '../ui/EnhancedCard';

// Feature icons
const PrivacyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ResourceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SecurityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DeviceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TokenIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 9.5C15 8.12 13.88 7 12.5 7H11.5C10.12 7 9 8.12 9 9.5C9 10.88 10.12 12 11.5 12H12.5C13.88 12 15 13.12 15 14.5C15 15.88 13.88 17 12.5 17H11.5C10.12 17 9 15.88 9 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const featuresData = [
  {
    title: 'Privacy-First SDK',
    description: 'Our lightweight SDK implements state-of-the-art cryptographic protocols that ensure end-to-end privacy while enabling secure device-to-device connections.',
    icon: <PrivacyIcon />,
    highlight: true
  },
  {
    title: 'Resource Marketplace',
    description: 'Create new value from underutilized computing resources. Trade GPU, CPU, bandwidth, and storage in a global, decentralized marketplace with instant settlement.',
    icon: <ResourceIcon />
  },
  {
    title: 'Decentralized AI Infrastructure',
    description: 'Contribute to and benefit from distributed AI training and inference. Keep data local while participating in global model improvement.',
    icon: <AIIcon />
  },
  {
    title: 'Zero-Knowledge Security',
    description: 'Advanced zero-knowledge protocols allow verification without revealing sensitive data, enabling secure transactions between untrusted parties.',
    icon: <SecurityIcon />,
    highlight: true
  },
  {
    title: 'Device Sovereignty',
    description: 'Maintain complete control over your device\'s participation in the network. Set custom policies for resource sharing and privacy preferences.',
    icon: <DeviceIcon />
  },
  {
    title: 'Tokenized Incentives',
    description: 'Earn rewards for contributing to the network. Our tokenomic model ensures fair compensation for computing resources and network participation.',
    icon: <TokenIcon />
  }
];

const ModernFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
        damping: 20
      }
    }
  };
  
  // Glass gradient for section background
  const GlassGradient = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Dark base background */}
      <div className="absolute inset-0 bg-neutral-900" />
      
      {/* Gradient blobs */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-secondary/20 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl opacity-20" />
      
      {/* Glass overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-neutral-900/70" />
      
      {/* Top and bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
  
  return (
    <section id="features" className="relative py-20 overflow-hidden">
      <GlassGradient />
      
      <Container>
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-3">
              <div className="backdrop-blur-sm bg-primary/10 border border-primary/20 rounded-full px-4 py-1">
                <span className="text-sm font-medium">Core Technology</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4">Redefining Decentralized Computing</h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              Our comprehensive privacy infrastructure enables a new generation of secure, 
              decentralized applications while creating new markets for previously untapped computing resources.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuresData.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <EnhancedCard 
                className="h-full"
                variant={feature.highlight ? "featured" : "default"}
                highlight={feature.highlight}
              >
                <div className="flex flex-col h-full">
                  <div className="p-3 mb-5 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/20">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-neutral-300 flex-grow">{feature.description}</p>
                  
                  <div className="mt-6 pt-4 border-t border-neutral-800/50">
                    <motion.a 
                      href="#" 
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-light"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      Learn more
                      <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </EnhancedCard>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Highlight featured technologies */}
        <motion.div
          className="mt-16 backdrop-blur-md bg-white/5 border border-primary/20 rounded-xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Want to learn more about our technology?</h3>
              <p className="text-neutral-300">Explore our technical documentation for developers.</p>
            </div>
            
            <motion.a 
              href="https://docs.aeronyx.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-6 py-3 rounded-xl overflow-hidden group whitespace-nowrap"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-90" />
              
              {/* Glass overlay */}
              <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />
              
              {/* Highlight effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-white/30" />
              
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/40 blur-xl" />
              
              {/* Button text */}
              <span className="relative z-10 font-medium flex items-center">
                View Documentation
                <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ModernFeatures;
