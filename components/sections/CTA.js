import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/20 to-secondary-dark/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/20 to-transparent" />
      </div>
      
      <Container ref={ref} className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-light to-secondary-light force-visible"
            initial={{ opacity: 1 }} // Start visible
            animate={{ opacity: 1, y: 0 }} // Stay visible
            style={{ opacity: 1, transform: 'none' }} // Force visibility with inline styles
          >
            Start Building the Decentralized Future
          </motion.h2>
          
          <motion.p 
            className="text-xl text-neutral-300 mb-10 force-visible"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ opacity: 1, transform: 'none' }}
          >
            Join thousands of developers and organizations already using AeroNyx 
            to power the next generation of privacy-first applications.
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-4 justify-center force-visible"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ opacity: 1, transform: 'none' }}
          >
            <Button size="large">Get Started</Button>
            <Button variant="secondary" size="large">Contact Us</Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
