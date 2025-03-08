import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';

const Step = ({ number, title, description, isInView, delay = 0 }) => {
  return (
    <motion.div 
      className="flex gap-6 mb-16 last:mb-0"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex-shrink-0">
        <div className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xl font-bold">
          {number}
        </div>
        <div className="h-full w-px bg-gradient-to-b from-primary/50 to-transparent mx-auto mt-3 last:hidden" />
      </div>
      <div className="pt-3">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-neutral-300">{description}</p>
      </div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const steps = [
    {
      title: 'Install Privacy SDK',
      description: 'Developers integrate our lightweight SDK into their applications, enabling end-to-end encrypted communications and secure resource sharing while preserving user privacy.'
    },
    {
      title: 'Define Resource Availability',
      description: 'Device owners specify which computing resources they're willing to share (GPU, CPU, bandwidth, storage) and under what conditions, maintaining complete sovereignty over their hardware.'
    },
    {
      title: 'Join the Global Marketplace',
      description: 'Resources are automatically listed on our decentralized marketplace, where they can be discovered and utilized by applications seeking computational power.'
    },
    {
      title: 'Secure Resource Exchange',
      description: 'Zero-knowledge proofs and blockchain-based verification ensure all parties fulfill their obligations without revealing sensitive data, creating a trustless computing environment.'
    },
    {
      title: 'Earn Rewards',
      description: 'Resource providers earn tokens based on their contributions to the network, creating a sustainable economic model that incentivizes long-term participation.'
    }
  ];
  
  return (
    <section id="how-it-works" className="py-20 bg-neutral-800 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(110,86,207,0.15),transparent_70%)]" />
      </div>
      
      <Container>
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">How AeroNyx Works</h2>
            <p className="text-lg text-neutral-300">
              Our technology seamlessly connects disparate devices into a secure, privacy-preserving 
              network that powers the next generation of decentralized applications.
            </p>
          </motion.div>
          
          <div ref={ref} className="relative z-10">
            {steps.map((step, index) => (
              <Step 
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
                isInView={isInView}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
