import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const HowAILWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      phase: "Foundation",
      title: "Distributed Intelligence Nodes",
      description: "Every device in the network runs a lightweight AI agent that can make local decisions while contributing to global intelligence.",
      technical: [
        "Edge AI processing with <5ms latency",
        "Federated learning for collective improvement",
        "Local decision-making with global context"
      ],
      visual: <FoundationVisual />
    },
    {
      phase: "Communication",
      title: "Model Context Protocol",
      description: "Natural language becomes the universal interface. Express intentions, not instructions.",
      technical: [
        "Intent recognition and decomposition",
        "Cross-layer protocol translation",
        "Tool orchestration framework"
      ],
      visual: <CommunicationVisual />
    },
    {
      phase: "Trust",
      title: "Zero-Knowledge Verification",
      description: "Every action is cryptographically proven without revealing sensitive information.",
      technical: [
        "Hardware attestation via TEE",
        "Computation integrity proofs",
        "Privacy-preserving verification"
      ],
      visual: <TrustVisual />
    },
    {
      phase: "Evolution",
      title: "Autonomous Optimization",
      description: "The network continuously learns, adapts, and improves without human intervention.",
      technical: [
        "Self-healing algorithms",
        "Predictive resource allocation",
        "Emergent behavior patterns"
      ],
      visual: <EvolutionVisual />
    }
  ];
  
  return (
    <section id="how-it-works" className="py-12 md:py-24 bg-neutral-950">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
              How the Autonomous Intelligence Layer works
            </h2>
            <p className="text-base md:text-xl text-white/40 max-w-3xl">
              Four revolutionary components that transform traditional infrastructure 
              into self-managing, intelligent systems.
            </p>
          </div>
          
          {/* Step navigation - Horizontal scroll on mobile */}
          <div className="flex gap-4 md:gap-8 mb-8 md:mb-12 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex-shrink-0 transition-all duration-300 min-w-fit ${
                  activeStep === index ? 'opacity-100' : 'opacity-40 hover:opacity-60'
                }`}
              >
                <div className="text-xs sm:text-sm uppercase tracking-wider mb-1">{step.phase}</div>
                <div className="text-sm sm:text-lg whitespace-nowrap">{step.title}</div>
                <div className={`h-0.5 mt-2 transition-all duration-300 ${
                  activeStep === index ? 'bg-white w-full' : 'bg-white/20 w-12'
                }`} />
              </button>
            ))}
          </div>
          
          {/* Step content */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Visual side - Hidden on very small screens for better performance */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1 hidden sm:block"
            >
              <div className="aspect-square bg-black border border-white/10 rounded-lg p-4 md:p-8">
                {steps[activeStep].visual}
              </div>
            </motion.div>
            
            {/* Content side */}
            <motion.div
              key={`content-${activeStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <div className="mb-6 md:mb-8">
                <div className="text-xs sm:text-sm uppercase tracking-wider text-white/40 mb-2">
                  Phase {activeStep + 1}
                </div>
                <h3 className="text-2xl md:text-3xl font-light mb-4">
                  {steps[activeStep].title}
                </h3>
                <p className="text-sm md:text-lg text-white/60 leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </div>
              
              <div className="space-y-2 md:space-y-3">
                <div className="text-xs sm:text-sm uppercase tracking-wider text-white/40">
                  Technical Implementation
                </div>
                {steps[activeStep].technical.map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-1 h-1 rounded-full bg-white/40 mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base text-white/60">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-8 md:mt-12 flex justify-center">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`h-1 transition-all duration-300 ${
                    index === activeStep ? 'w-8 bg-white' : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

// Visual components for each step - Simplified for mobile performance
const FoundationVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="grid grid-cols-3 gap-2 md:gap-4">
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          className="w-12 h-12 md:w-16 md:h-16 border border-white/20 rounded"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const CommunicationVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="text-center">
      <motion.div
        className="text-lg md:text-2xl text-white/60 mb-4 md:mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        "Optimize for lowest cost"
      </motion.div>
      <motion.div
        className="h-12 md:h-16 border-l border-white/20 mx-auto"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      <motion.div
        className="mt-4 md:mt-8 space-y-1 md:space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="text-xs md:text-sm text-white/40">Decomposed into:</div>
        <div className="text-xs text-white/30">• Analyze resources</div>
        <div className="text-xs text-white/30">• Compare pricing</div>
        <div className="text-xs text-white/30">• Allocate optimal config</div>
      </motion.div>
    </div>
  </div>
);

const TrustVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative">
      <motion.div
        className="w-20 h-20 md:w-24 md:h-24 border-2 border-white/40 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white/60 text-sm md:text-base">ZK</div>
      </motion.div>
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-white/10 rounded-full"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1 + i * 0.3, opacity: 0.3 - i * 0.1 }}
          transition={{ duration: 1, delay: i * 0.2 }}
        />
      ))}
    </div>
  </div>
);

const EvolutionVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="space-y-3 md:space-y-4">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2 md:gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.3 }}
        >
          <div className="w-12 md:w-20 h-1 bg-white/20" />
          <div className="text-xs text-white/40">Gen {i + 1}</div>
          <div className={`w-${16 + i * 8} md:w-${20 + i * 10} h-1 bg-white/40`} />
        </motion.div>
      ))}
      <motion.div
        className="text-xs text-white/60 text-center mt-3 md:mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Continuous improvement
      </motion.div>
    </div>
  </div>
);

export default HowAILWorks;
