import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';
import Card from '../ui/Card';

// Feature icons (unchanged)
const PrivacyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.93 19.07C5.76 17.97 7.21 16 12 16C16.79 16 18.24 17.96 19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.93 4.93C5.76 6.03 7.21 8 12 8C16.79 8 18.24 6.04 19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Other icons remain unchanged...

const featuresData = [
  {
    title: 'Privacy-First SDK',
    description: 'Our lightweight SDK implements state-of-the-art cryptographic protocols that ensure end-to-end privacy while enabling secure device-to-device connections.',
    icon: <PrivacyIcon />
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
    icon: <SecurityIcon />
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

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <section id="features" className="py-20 bg-neutral-900 relative">
      {/* Add semi-transparent overlay to ensure text clarity */}
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-70 z-0"></div>
      
      <Container className="relative z-10">
        <div className="text-center mb-16 relative">
          {/* Added backdrop for enhanced text clarity */}
          <div className="absolute inset-0 -mx-8 -my-4 bg-neutral-900 bg-opacity-50 blur-sm rounded-lg"></div>
          
          <motion.h2 
            className="section-heading text-shadow relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Redefining Decentralized Computing
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral-300 max-w-3xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our comprehensive privacy infrastructure enables a new generation of secure, 
            decentralized applications while creating new markets for previously untapped computing resources.
          </motion.p>
        </div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial
