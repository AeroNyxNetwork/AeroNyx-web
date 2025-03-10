import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';

const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Mock partner placeholders
  const partners = [
    { name: 'SOON', logo: '#' },
    { name: 'DePHY', logo: '#' },
    { name: 'JRR Crypto', logo: '#' },
    { name: 'Massachusetts Institute', logo: '#' },
    { name: 'Google Cloud', logo: '#' },
    { name: 'Anthropic', logo: '#' }
  ];
  
  return (
    <section id="ecosystem" className="py-20 bg-neutral-900">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">Our respected partners</h2>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            AeroNyx is building partnerships with leading organizations across the technology 
            landscape to create a robust decentralized computing infrastructure.
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              className="bg-neutral-800/50 border border-neutral-700/30 rounded-lg p-4 flex items-center justify-center h-24 grayscale hover:grayscale-0 hover:border-primary/30 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
              whileHover={{ y: -5 }}
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-12 max-w-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Partners;
