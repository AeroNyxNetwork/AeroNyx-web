import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';

const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Mock partner placeholders
  const partners = [
    { name: 'SOON', logo: 'https://explorer.testnet.soo.network/_next/static/media/soon-explorer.115ff8e8.svg' },
    { name: 'DePHY', logo: 'https://explorer.testnet.soo.network/_next/static/media/soon-explorer.115ff8e8.svg' },
    { name: 'JRR Crypto', logo: 'https://imagedelivery.net/BV5aFXW_8-vuplL3cruTxw/5e5aadb9-b36b-4b3d-5a7b-521ae79f8000/public' },
    { name: 'MIT', logo: 'https://brand.mit.edu/sites/default/files/styles/image_text_2x/public/2023-08/MIT-lockup-3line-red.png?itok=MJP9Djff' },
    { name: 'Google Cloud', logo: 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg' },
    { name: 'WaterDrip', logo: 'https://imagedelivery.net/BV5aFXW_8-vuplL3cruTxw/5a9eb549-ff3e-4991-1173-d1cc6eb53700/public' }
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
