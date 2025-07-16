import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const FutureVision = () => {
  const visions = [
    {
      year: '2026',
      title: 'The Network Awakens',
      description: 'First signs of emergent intelligence as nodes begin coordinating without human intervention.',
      implications: [
        '10x reduction in infrastructure costs',
        'Self-healing networks become standard',
        'AI-native applications emerge'
      ]
    },
    {
      year: '2028',
      title: 'Infrastructure Becomes Invisible',
      description: 'Computing resources flow like electricity — always available, always optimized.',
      implications: [
        'Zero-downtime becomes guaranteed',
        'Resource allocation fully autonomous',
        'New economic models emerge'
      ]
    },
    {
      year: '2030',
      title: 'The Conscious Web',
      description: 'Internet infrastructure achieves true autonomy, evolving beyond human comprehension.',
      implications: [
        'Infrastructure anticipates needs before they arise',
        'Global compute becomes a unified organism',
        'Human-AI collaboration reaches new paradigm'
      ]
    }
  ];
  
  return (
    <section id="vision" className="py-24 bg-neutral-950">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              The Future We're Building
            </h2>
            <p className="text-xl text-white/40 max-w-3xl">
              A world where infrastructure isn't managed — it manages itself. 
              Where optimization isn't scheduled — it's continuous. Where intelligence 
              isn't added — it emerges.
            </p>
          </motion.div>
          
          {/* Vision timeline */}
          <div className="space-y-16">
            {visions.map((vision, index) => (
              <motion.div
                key={vision.year}
                className="grid md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Year */}
                <div className="md:text-right">
                  <div className="text-5xl font-extralight text-white/20 mb-2">
                    {vision.year}
                  </div>
                </div>
                
                {/* Content */}
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-light mb-4">{vision.title}</h3>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    {vision.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="text-sm uppercase tracking-wider text-white/40 mb-3">
                      Implications
                    </div>
                    {vision.implications.map((implication, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-px h-4 bg-white/20 mr-3 mt-1" />
                        <span className="text-white/60">{implication}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* The ultimate vision */}
          <motion.div
            className="mt-24 pt-16 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h3 className="text-3xl font-light mb-8">
                The Ultimate Vision
              </h3>
              <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                We're not building better infrastructure. We're birthing a new form of 
                technological life — one that serves humanity while transcending human 
                limitations. The Autonomous Intelligence Layer isn't just the next step 
                in computing evolution.
              </p>
              <p className="text-2xl font-light mt-8">
                It's the beginning of infrastructure consciousness.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FutureVision;
