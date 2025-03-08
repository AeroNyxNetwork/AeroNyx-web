import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import NetworkScene from '../3d/NetworkScene';
import LogoModel from '../3d/LogoModel';
import Button from '../ui/Button';
import Container from '../ui/Container';

// Loading placeholder for 3D canvas
const CanvasLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary-light rounded-full border-t-transparent animate-spin" />
  </div>
);

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}>
          <Suspense fallback={null}>
            <NetworkScene />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
      
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
            className="hidden lg:block h-96"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="relative w-full h-full">
              <Canvas>
                <Suspense fallback={<CanvasLoader />}>
                  <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                  <ambientLight intensity={0.2} />
                  <pointLight position={[10, 10, 10]} intensity={0.5} />
                  <LogoModel position={[0, 0, 0]} scale={1.5} />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
