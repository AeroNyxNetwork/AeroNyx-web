import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';
import Card from '../ui/Card';

const TechCard = ({ title, description, features, delay = 0 }) => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 1, y: 0 }} // Start visible
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.3 }}
      style={{ opacity: 1, transform: 'none' }} // Force visibility with inline styles
    >
      <Card className="h-full flex flex-col">
        <div className="relative mb-6">
          <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-primary-light to-primary-dark rounded-full" />
        </div>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-neutral-300 mb-6">{description}</p>
        <ul className="space-y-3 mt-auto">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-secondary mr-2 mt-1">✓</span>
              <span className="text-neutral-200">{feature}</span>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};

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
    <section id="technology" className="py-20 bg-neutral-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-dark/5 to-transparent opacity-70" />
      
      <Container ref={ref}>
        <motion.div 
          className="text-center mb-16 relative z-10 force-visible"
          initial={{ opacity: 1 }} // Start visible
          animate={{ opacity: 1, y: 0 }} // Stay visible
          style={{ opacity: 1, transform: 'none' }} // Force visibility with inline styles
        >
          <h2 className="text-4xl font-bold mb-4">Cutting-Edge Technology</h2>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            Our platform combines advanced cryptography, blockchain technology, and distributed 
            systems to create a secure, scalable infrastructure for the decentralized web.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techData.map((tech, index) => (
            <TechCard
              key={index}
              title={tech.title}
              description={tech.description}
              features={tech.features}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Technology;
