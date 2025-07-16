import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';

const IntelligenceArchitecture = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  
  const layers = [
    {
      id: 'cognition',
      name: 'Cognition Layer',
      description: 'Distributed decision-making engine',
      details: [
        'Pattern recognition across network state',
        'Predictive resource allocation',
        'Self-optimization algorithms',
        'Emergent behavior coordination'
      ],
      metrics: {
        'Decisions/second': '1.2M',
        'Accuracy': '99.7%',
        'Latency': '3ms'
      }
    },
    {
      id: 'protocol',
      name: 'Protocol Layer',
      description: 'Model Context Protocol implementation',
      details: [
        'Natural language processing',
        'Intent decomposition engine',
        'Tool orchestration framework',
        'Cross-layer communication'
      ],
      metrics: {
        'Throughput': '10GB/s',
        'Protocols': '147',
        'Uptime': '99.99%'
      }
    },
    {
      id: 'verification',
      name: 'Verification Layer',
      description: 'Zero-knowledge proof system',
      details: [
        'Hardware attestation',
        'Computation verification',
        'Privacy preservation',
        'Trust propagation'
      ],
      metrics: {
        'Proofs/second': '50K',
        'False positive': '0%',
        'Verification time': '1ms'
      }
    }
  ];
  
  return (
    <section className="py-20 bg-black">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">
              Intelligence Architecture
            </h2>
            <p className="text-white/40 text-lg">
              Three layers of autonomous infrastructure
            </p>
          </div>
          
          {/* Architecture visualization */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.id}
                className={`
                  border border-white/10 rounded-lg p-6 cursor-pointer
                  transition-all duration-300
                  ${activeLayer === layer.id ? 'border-white/30 bg-white/5' : 'hover:border-white/20'}
                `}
                onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Layer header */}
                <div className="mb-4">
                  <h3 className="text-xl font-normal mb-2">{layer.name}</h3>
                  <p className="text-sm text-white/40">{layer.description}</p>
                </div>
                
                {/* Quick metrics */}
                <div className="space-y-2 text-sm">
                  {Object.entries(layer.metrics).slice(0, 2).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-white/40">{key}</span>
                      <span className="text-white/60">{value}</span>
                    </div>
                  ))}
                </div>
                
                {/* Expand indicator */}
                <div className="mt-4 text-xs text-white/40">
                  {activeLayer === layer.id ? 'Click to collapse' : 'Click for details'}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Detailed view */}
          <AnimatePresence>
            {activeLayer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border border-white/10 rounded-lg p-8 bg-white/5"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Details */}
                  <div>
                    <h4 className="text-lg font-normal mb-4">
                      {layers.find(l => l.id === activeLayer)?.name} Details
                    </h4>
                    <ul className="space-y-2">
                      {layers.find(l => l.id === activeLayer)?.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-1 h-1 rounded-full bg-white/40 mt-2 mr-3" />
                          <span className="text-white/60">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Metrics */}
                  <div>
                    <h4 className="text-lg font-normal mb-4">Performance Metrics</h4>
                    <div className="space-y-3">
                      {Object.entries(layers.find(l => l.id === activeLayer)?.metrics || {}).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-white/40">{key}</span>
                            <span className="text-sm text-white/80">{value}</span>
                          </div>
                          <div className="h-1 bg-white/10 rounded">
                            <div 
                              className="h-full bg-gradient-to-r from-primary/50 to-primary rounded"
                              style={{ width: `${Math.random() * 40 + 60}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <a
              href="https://docs.aeronyx.network/whitepaper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white/40 hover:text-white transition-colors"
            >
              <span className="text-sm uppercase tracking-wider">Read Technical Whitepaper</span>
              <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default IntelligenceArchitecture;
