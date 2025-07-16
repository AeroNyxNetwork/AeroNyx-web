import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const ImplementationRoadmap = () => {
  const [hoveredPhase, setHoveredPhase] = useState(null);
  
  const phases = [
    {
      id: 'foundation',
      quarter: 'Q1 2024',
      title: 'Foundation',
      status: 'completed',
      milestones: [
        'Core protocol design',
        'ZKP implementation',
        'Initial node software'
      ],
      deliverables: [
        'Whitepaper v1.0',
        'Testnet Alpha',
        'SDK Release'
      ]
    },
    {
      id: 'intelligence',
      quarter: 'Q2 2024',
      title: 'Intelligence Layer',
      status: 'in-progress',
      milestones: [
        'AI agent framework',
        'MCP integration',
        'Federated learning system'
      ],
      deliverables: [
        'AI Orchestrator',
        'Developer Portal',
        'Node Dashboard'
      ]
    },
    {
      id: 'network',
      quarter: 'Q3 2024',
      title: 'Network Launch',
      status: 'upcoming',
      milestones: [
        'Mainnet deployment',
        'Token generation event',
        'Initial node operators'
      ],
      deliverables: [
        'Public Network',
        'Governance Framework',
        'Staking Mechanism'
      ]
    },
    {
      id: 'scale',
      quarter: 'Q4 2024',
      title: 'Scale & Optimize',
      status: 'upcoming',
      milestones: [
        'Cross-chain bridges',
        'Enterprise partnerships',
        'Global expansion'
      ],
      deliverables: [
        '100K+ Nodes',
        'Enterprise SDK',
        'Compliance Framework'
      ]
    },
    {
      id: 'autonomy',
      quarter: 'Q1 2025',
      title: 'Full Autonomy',
      status: 'future',
      milestones: [
        'Self-governing network',
        'Emergent behaviors',
        'Complete decentralization'
      ],
      deliverables: [
        'DAO Transition',
        'Autonomous Economics',
        'Self-Evolution'
      ]
    }
  ];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'border-green-500/30 text-green-400';
      case 'in-progress': return 'border-yellow-500/30 text-yellow-400';
      case 'upcoming': return 'border-white/20 text-white/60';
      case 'future': return 'border-white/10 text-white/40';
      default: return 'border-white/10 text-white/40';
    }
  };
  
  return (
    <section className="py-24 bg-black">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Implementation Roadmap
            </h2>
            <p className="text-xl text-white/40 max-w-3xl">
              From concept to autonomous network — a methodical approach to 
              building infrastructure that thinks.
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-white/10 transform lg:-translate-x-1/2" />
            
            {/* Phases */}
            <div className="space-y-12 lg:space-y-24">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  className={`relative ${
                    index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredPhase(phase.id)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 lg:left-1/2 w-3 h-3 rounded-full transform lg:-translate-x-1/2 -translate-x-1/2 ${
                    phase.status === 'completed' ? 'bg-green-400' :
                    phase.status === 'in-progress' ? 'bg-yellow-400' :
                    'bg-white/20'
                  }`} />
                  
                  {/* Content */}
                  <div className={`pl-8 lg:pl-0 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className={`border p-6 rounded-lg transition-all duration-300 ${
                      getStatusColor(phase.status)
                    } ${hoveredPhase === phase.id ? 'bg-white/5' : ''}`}>
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-sm uppercase tracking-wider text-white/40 mb-1">
                            {phase.quarter}
                          </div>
                          <h3 className="text-2xl font-light">{phase.title}</h3>
                        </div>
                        <div className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full border ${
                          getStatusColor(phase.status)
                        }`}>
                          {phase.status.replace('-', ' ')}
                        </div>
                      </div>
                      
                      {/* Details */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-sm uppercase tracking-wider text-white/40 mb-3">
                            Key Milestones
                          </div>
                          <ul className="space-y-2">
                            {phase.milestones.map((milestone, i) => (
                              <li key={i} className="flex items-start">
                                <div className="w-1 h-1 rounded-full bg-white/40 mt-2 mr-2" />
                                <span className="text-sm text-white/60">{milestone}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="text-sm uppercase tracking-wider text-white/40 mb-3">
                            Deliverables
                          </div>
                          <ul className="space-y-2">
                            {phase.deliverables.map((deliverable, i) => (
                              <li key={i} className="flex items-start">
                                <div className="w-1 h-1 rounded-full bg-white/40 mt-2 mr-2" />
                                <span className="text-sm text-white/60">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Current focus */}
          <motion.div
            className="mt-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-block">
              <div className="text-sm uppercase tracking-wider text-white/40 mb-2">
                Current Focus
              </div>
              <div className="text-2xl font-light">
                Building the intelligence layer that will power autonomous infrastructure
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ImplementationRoadmap;
