import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const JoinNetwork = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      number: "01",
      title: "Run a Node",
      subtitle: "Join the decentralized network",
      description: "Download and install the AeroNyx node software on your computer or server. One command, and you're part of the global network.",
      features: [
        "Works on Windows, Mac, Linux",
        "Lightweight: < 100MB RAM",
        "Auto-updates and self-heals",
        "Earn rewards while you sleep"
      ],
      cta: {
        text: "Download Node",
        link: "https://docs.aeronyx.network/node-setup"
      },
      visual: <NodeVisual />
    },
    {
      number: "02",
      title: "AI Takes Control",
      subtitle: "Natural language infrastructure management",
      description: "Once your node is running, the AeroNyx MCP AI becomes your infrastructure assistant. Just tell it what you want in plain English.",
      features: [
        '"Optimize my server for lowest cost"',
        '"Allocate 50% resources to mining"',
        '"Pause all tasks during work hours"',
        '"Show me my earnings dashboard"'
      ],
      cta: {
        text: "Explore AI Commands",
        link: "https://docs.aeronyx.network/mcp-ai"
      },
      visual: <AIVisual />
    },
    {
      number: "03",
      title: "Share Resources",
      subtitle: "Turn idle compute into income",
      description: "Your unused CPU, GPU, and storage become valuable assets. The AI automatically optimizes resource allocation to maximize your earnings.",
      features: [
        "Set your own availability schedule",
        "Choose what resources to share",
        "Privacy-first: your data stays yours",
        "Get paid in crypto or fiat"
      ],
      cta: {
        text: "Calculate Earnings",
        link: "https://aeronyx.network/calculator"
      },
      visual: <ResourceVisual />
    },
    {
      number: "04",
      title: "Build on AeroNyx",
      subtitle: "Access global compute instantly",
      description: "Need computing power? The network has you covered. Deploy applications, run AI models, or process data across thousands of nodes.",
      features: [
        "Pay only for what you use",
        "Scale from 1 to 10,000 nodes",
        "99.99% uptime guaranteed",
        "Built-in privacy and security"
      ],
      cta: {
        text: "Start Building",
        link: "https://docs.aeronyx.network/developers"
      },
      visual: <BuildVisual />
    }
  ];
  
  return (
    <section id="join-network" className="py-12 md:py-24 bg-black relative overflow-hidden">
      {/* Background network effect */}
      <div className="absolute inset-0 opacity-20">
        <NetworkBackground />
      </div>
      
      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
              Join the Network, Shape the Future
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto">
              Four simple steps to become part of the world's first autonomous infrastructure. 
              Run a node, let AI manage it, earn from your resources, and build amazing things.
            </p>
          </motion.div>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8 md:mb-12">
            <div className="flex items-center space-x-2 md:space-x-4">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`transition-all duration-300 ${
                      index === activeStep 
                        ? 'scale-110' 
                        : index < activeStep 
                        ? 'opacity-60' 
                        : 'opacity-30'
                    }`}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center ${
                      index === activeStep 
                        ? 'border-white bg-white text-black' 
                        : index < activeStep
                        ? 'border-white/60 bg-white/10'
                        : 'border-white/20'
                    }`}>
                      <span className="text-xs md:text-sm font-medium">{index + 1}</span>
                    </div>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`w-12 md:w-24 h-0.5 transition-all duration-300 ${
                      index < activeStep ? 'bg-white/60' : 'bg-white/20'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Step content */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            {/* Content */}
            <div className="order-2 md:order-1">
              <div className="mb-6">
                <div className="text-5xl md:text-6xl font-extralight text-white/20 mb-2">
                  {steps[activeStep].number}
                </div>
                <h3 className="text-2xl md:text-3xl font-light mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="text-lg text-white/60">
                  {steps[activeStep].subtitle}
                </p>
              </div>
              
              <p className="text-sm md:text-base text-white/80 mb-6 leading-relaxed">
                {steps[activeStep].description}
              </p>
              
              <div className="space-y-2 mb-8">
                {steps[activeStep].features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-1 h-1 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base text-white/60">{feature}</span>
                  </div>
                ))}
              </div>
              
              {steps[activeStep].cta && (
                <motion.a
                  href={steps[activeStep].cta.link}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 transition-all group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm uppercase tracking-wider">
                    {steps[activeStep].cta.text}
                  </span>
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>
              )}
            </div>
            
            {/* Visual */}
            <div className="order-1 md:order-2">
              <div className="aspect-square bg-black/50 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                {steps[activeStep].visual}
              </div>
            </div>
          </motion.div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-8 md:mt-12">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              className={`px-4 py-2 text-sm text-white/60 hover:text-white transition-colors ${
                activeStep === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>
            
            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              className={`px-4 py-2 text-sm text-white/60 hover:text-white transition-colors ${
                activeStep === steps.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              disabled={activeStep === steps.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

// Visual components for each step
const NodeVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Central node */}
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center">
        <div className="text-white/80">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
            <path d="M20.5 7.5L16 12l4.5 4.5M3.5 7.5L8 12l-4.5 4.5" />
          </svg>
        </div>
      </div>
      
      {/* Orbiting connections */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white/40 rounded-full"
          style={{
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [0, Math.cos(i * Math.PI / 2) * 80, 0],
            y: [0, Math.sin(i * Math.PI / 2) * 80, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        />
      ))}
    </motion.div>
  </div>
);

const AIVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="w-full max-w-sm">
      {/* Chat interface mock */}
      <div className="space-y-4">
        <motion.div
          className="bg-white/5 rounded-lg p-3 text-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-primary mb-1">You:</div>
          <div className="text-white/80">Optimize for maximum earnings</div>
        </motion.div>
        
        <motion.div
          className="bg-primary/10 rounded-lg p-3 text-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-primary mb-1">AI:</div>
          <div className="text-white/80">Analyzing network demand... Reallocating 70% GPU to AI tasks, 30% to mining. Estimated earnings increase: 45%</div>
        </motion.div>
        
        <motion.div
          className="flex items-center gap-2 text-white/40 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          AI is managing your infrastructure
        </motion.div>
      </div>
    </div>
  </div>
);

const ResourceVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="w-full">
      {/* Resource meters */}
      <div className="space-y-4">
        {[
          { name: 'CPU', usage: 35, earning: '$0.42/hr' },
          { name: 'GPU', usage: 78, earning: '$2.15/hr' },
          { name: 'Storage', usage: 45, earning: '$0.18/hr' },
          { name: 'Bandwidth', usage: 62, earning: '$0.95/hr' }
        ].map((resource, i) => (
          <motion.div
            key={resource.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-white/60">{resource.name}</span>
              <span className="text-xs text-green-400">{resource.earning}</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${resource.usage}%` }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
        
        <motion.div
          className="pt-4 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-xs text-white/40">Total earnings</div>
          <div className="text-2xl font-light text-green-400">$3.70/hr</div>
        </motion.div>
      </div>
    </div>
  </div>
);

const BuildVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="text-center">
      {/* Global network visualization */}
      <motion.div
        className="relative w-48 h-48 md:w-64 md:h-64 mx-auto"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {/* Globe outline */}
        <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
        
        {/* Network nodes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 50 + Math.cos(angle) * 35;
          const y = 50 + Math.sin(angle) * 35;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25
              }}
            />
          );
        })}
      </motion.div>
      
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-3xl font-light text-white/80">15,000+</div>
        <div className="text-sm text-white/40">Active Nodes Worldwide</div>
      </motion.div>
    </div>
  </div>
);

// Background network animation
const NetworkBackground = () => (
  <svg className="w-full h-full">
    <defs>
      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
        <circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    
    {/* Animated connection lines */}
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.line
        key={i}
        x1={`${Math.random() * 100}%`}
        y1={`${Math.random() * 100}%`}
        x2={`${Math.random() * 100}%`}
        y2={`${Math.random() * 100}%`}
        stroke="rgba(119, 98, 243, 0.2)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.5,
          repeatType: "reverse"
        }}
      />
    ))}
  </svg>
);

export default JoinNetwork;
