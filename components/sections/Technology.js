import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';
import Card from '../ui/Card';

const Technology = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const techData = [
    {
      title: 'Privacy Infrastructure',
      description: 'Our core privacy layer creates the foundation for secure, private computing across untrusted networks and devices.',
      features: [
        'End-to-end encryption for all data and communications',
        'Zero-knowledge proofs for privacy-preserving verification',
        'Multi-party computation for collaborative AI training',
        'Homomorphic encryption for secure computation on encrypted data'
      ]
    },
    {
      title: 'Decentralized Marketplace',
      description: 'Our marketplace technology creates efficient allocation of global computing resources with minimal overhead.',
      features: [
        'Smart contract-based resource allocation and payment',
        'Reputation systems for provider quality assurance',
        'Dynamic pricing based on real-time supply and demand',
        'Cross-chain compatibility for maximum liquidity'
      ]
    },
    {
      title: 'Distributed AI Framework',
      description: 'Our AI infrastructure enables collaborative model training while preserving data privacy and ownership.',
      features: [
        'Federated learning across distributed devices',
        'Privacy-preserving model aggregation',
        'Differential privacy for training data protection',
        'Decentralized model governance and improvement'
      ]
    },
    {
      title: 'Tokenomic Model',
      description: 'Our economic framework ensures sustainable growth and fair value distribution across the network.',
      features: [
        'Utility tokens for marketplace transactions',
        'Governance tokens for protocol development',
        'Staking mechanisms for network security',
        'Automated market makers for resource pricing'
      ]
    }
  ];
  
  return (
    <section id="technology" className="py-20 relative overflow-hidden" style={{ position: 'relative', zIndex: 20 }}>
      {/* Semi-transparent background to ensure text visibility */}
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-50" style={{ zIndex: -1 }}></div>
      
      <Container ref={ref}>
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          style={{ zIndex: 10 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-shadow">Cutting-Edge Technology</h2>
          
          {/* This is the paragraph that wasn't displaying */}
          <p className="text-lg text-white max-w-3xl mx-auto" style={{ 
            position: 'relative', 
            zIndex: 15,
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            fontWeight: 500
          }}>
            Our platform combines advanced cryptography, blockchain technology, and distributed 
            systems to create a secure, scalable infrastructure for the decentralized web.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techData.map((tech, index) => (
            <motion.div
              key={index}
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ zIndex: 10 }}
            >
              <Card className="h-full flex flex-col">
                <div className="relative mb-6">
                  <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-primary-light to-primary-dark rounded-full"></div>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{tech.title}</h3>
                <p className="text-neutral-300 mb-6">{tech.description}</p>
                <ul className="space-y-3 mt-auto">
                  {tech.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-secondary mr-2 mt-1">✓</span>
                      <span className="text-neutral-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Technology;
