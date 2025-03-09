import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Container from '../ui/Container';

// 由于我们在之前的构建中移除了drei依赖，这是一个简化版的Hero组件
// 完全不依赖drei或任何可能引发兼容性问题的组件
const Hero = () => {
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
              <Button size="large">Join The Network</Button>
              <Button variant="secondary" size="large">Read Whitepaper</Button>
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
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.93 19.07C5.76 17.97 7.21 16 12 16C16.79 16 18.24 17.96 19.07 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.93 4.93C5.76 6.03 7.21 8 12 8C16.79 8 18.24 6.04 19.07 4.93" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
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
    </section>
  );
};

export default Hero;
