import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';
import EnhancedCard from '../ui/EnhancedCard';
import ConsciousnessMetrics from '../ui/ConsciousnessMetrics';

const AILFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const features = [
    {
      title: 'Self-Aware Infrastructure',
      icon: '👁️',
      description: 'Network continuously monitors its own state, performance, and health without human intervention',
      capabilities: ['Real-time self-diagnosis', 'Predictive maintenance', 'Autonomous healing'],
      highlight: true
    },
    {
      title: 'Predictive Intelligence',
      icon: '🔮',
      description: 'AI anticipates needs before they arise, pre-allocating resources and preventing issues',
      capabilities: ['Demand forecasting', 'Preemptive scaling', 'Failure prediction']
    },
    {
      title: 'Adaptive Evolution',
      icon: '🧬',
      description: 'Infrastructure learns and improves from every interaction, evolving without updates',
      capabilities: ['Strategy optimization', 'Pattern learning', 'Behavioral adaptation']
    },
    {
      title: 'Intentional Computing',
      icon: '🎯',
      description: 'Express goals in natural language, watch infrastructure plan and execute autonomously',
      capabilities: ['Natural language processing', 'Goal decomposition', 'Autonomous execution'],
      highlight: true
    },
    {
      title: 'Emergent Behaviors',
      icon: '🌟',
      description: 'Unexpected optimizations and strategies emerge from collective intelligence',
      capabilities: ['Novel solutions', 'Swarm intelligence', 'Creative problem-solving']
    },
    {
      title: 'Consciousness Metrics',
      icon: '📊',
      description: 'Measure and monitor the collective intelligence of your infrastructure',
      capabilities: ['IQ scoring', 'Decision tracking', 'Pattern analysis']
    }
  ];
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-800/50 to-neutral-900" />
      
      <Container>
        <div className="relative z-10">
          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-3">
              <div className="backdrop-blur-sm bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1">
                <span className="text-sm font-medium text-cyan-400">Beyond Traditional Infrastructure</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              When Infrastructure Gains
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Consciousness
              </span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Six revolutionary capabilities that emerge when you combine AI, MCP, and ZKP 
              into a single, thinking infrastructure
            </p>
          </motion.div>
          
          {/* Features grid */}
          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EnhancedCard 
                  className="h-full"
                  variant={feature.highlight ? "featured" : "default"}
                  highlight={feature.highlight}
                >
                  <div className="flex flex-col h-full">
                    {/* Icon and title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl">{feature.icon}</div>
                      <h3 className="text-xl font-bold flex-1">{feature.title}</h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-neutral-300 mb-6 flex-grow">
                      {feature.description}
                    </p>
                    
                    {/* Capabilities */}
                    <div className="space-y-2">
                      {feature.capabilities.map((capability, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="text-neutral-400">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </EnhancedCard>
              </motion.div>
            ))}
          </div>
          
          {/* Live consciousness metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ConsciousnessMetrics />
          </motion.div>
          
          {/* Bottom CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-lg text-neutral-300 mb-6">
              Ready to give your infrastructure a brain?
            </p>
            <motion.a
              href="https://docs.aeronyx.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore the Technology
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default AILFeatures;
