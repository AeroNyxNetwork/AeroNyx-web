/**
 * ============================================
 * HowAILWorks.js - Optimized Version
 * ============================================
 * 
 * 
 * Last Modified: v2.1 - Reframed the section from generic cloud payment
 * automation into AeroNyx's privacy coordination protocol: blind relay,
 * signed peer state, encrypted memory, and agent-native service access.
 * ============================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const HowAILWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  /**
   * STEP STRUCTURE
   * Each step follows: Business Problem → Technical Solution → Impact
   * This helps both investors and technical users understand value
   */
  const steps = [
    {
      phase: "The Problem",
      title: "Coordination Still Requires Trust",
      description: "Humans, apps, and AI agents need to route traffic, exchange messages, and preserve memory. Today those flows usually pass through services that can observe content, metadata, or relationships.",
      businessContext: "The next internet needs private coordination primitives, not another centralized account system that sees who talks to whom.",
      technical: [
        "Central relays can become surveillance points",
        "App servers often mix routing, identity, and content access",
        "Agent workflows need machine-readable access control",
        "Private memory should travel without vendor lock-in"
      ],
      visual: <ProblemVisual />
    },
    {
      phase: "The Protocol",
      title: "Blind Privacy Fabric",
      description: "AeroNyx Rust nodes exchange signed peer summaries, route encrypted payloads, and report only aggregate health. Nodes can help move data without reading user content.",
      businessContext: "This is the trust boundary investors and users can understand: the protocol coordinates work, but the infrastructure is intentionally blind.",
      technical: [
        "Persistent peer store with lifecycle recovery",
        "Heartbeat summaries for privacy-safe public status",
        "Encrypted packet and traffic counters only in aggregate",
        "Foundation for future multi-hop routing"
      ],
      visual: <ProtocolVisual />
    },
    {
      phase: "The State Layer",
      title: "Memory Chain Travels With The User",
      description: "Memory Chain is designed as an encrypted, signed, append-only record for private context. Clients and agents can sync useful state without handing raw history to an operator.",
      businessContext: "If personal AI becomes important, private memory becomes infrastructure. AeroNyx treats it as user-owned protocol state.",
      technical: [
        "Ed25519 signed memory facts",
        "Hash-linked versions for auditability",
        "Encrypted storage and sync channels",
        "Coordinator cannot read raw content"
      ],
      visual: <TrustVisual />
    },
    {
      phase: "The Service Layer",
      title: "Agent-Native Services",
      description: "x402-compatible payment flows let services quote access, receive payment, and execute work in a format autonomous agents can understand.",
      businessContext: "AeroNyx can become the private service layer where agents route, remember, pay, and coordinate without defaulting to human-operated SaaS accounts.",
      technical: [
        "Request, quote, payment, execution lifecycle",
        "Wallet-based identity and service permissions",
        "Privacy protocol services before generic marketplaces",
        "Nodeboard and public stats expose health, not user data"
      ],
      visual: <ImpactVisual />
    }
  ];
  
  return (
    <section id="how-it-works" className="py-12 md:py-24 bg-neutral-950">
      <Container>
        <div className="max-w-6xl mx-auto">
          
          {/* Section header with business context */}
          <div className="mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
                From Problem to Protocol
              </h2>
              <p className="text-base md:text-xl text-white/60 max-w-3xl leading-relaxed">
                AeroNyx is the privacy coordination protocol for encrypted routing,
                private memory, and agent-to-agent services.
              </p>
            </motion.div>
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
                <div className="text-xs sm:text-sm uppercase tracking-wider mb-1 text-left">
                  {step.phase}
                </div>
                <div className="text-sm sm:text-base md:text-lg whitespace-nowrap text-left">
                  {step.title.split(' ').slice(0, 3).join(' ')}...
                </div>
                <div className={`h-0.5 mt-2 transition-all duration-300 ${
                  activeStep === index ? 'bg-white w-full' : 'bg-white/20 w-12'
                }`} />
              </button>
            ))}
          </div>
          
          {/* Step content */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Visual side - Hidden on very small screens for performance */}
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
                {/* Phase indicator */}
                <div className="text-xs sm:text-sm uppercase tracking-wider text-white/40 mb-2">
                  {activeStep + 1} of {steps.length}
                </div>
                
                {/* Step title */}
                <h3 className="text-2xl md:text-3xl font-light mb-4">
                  {steps[activeStep].title}
                </h3>
                
                {/* Main description */}
                <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4">
                  {steps[activeStep].description}
                </p>
                
                {/* Business context - NEW: Adds commercial value */}
                <div className="bg-white/5 border-l-2 border-white/20 pl-4 py-3 mb-6">
                  <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
                    Protocol Impact
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {steps[activeStep].businessContext}
                  </p>
                </div>
              </div>
              
              {/* Technical details */}
              <div className="space-y-2 md:space-y-3">
                <div className="text-xs sm:text-sm uppercase tracking-wider text-white/40">
                  How It Works
                </div>
                {steps[activeStep].technical.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-1 h-1 rounded-full bg-white/40 mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base text-white/60">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-8 md:mt-12 flex justify-center gap-2">
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
          
          {/* CTA after explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 md:mt-16 text-center"
          >
            <a
              href="https://docs.aeronyx.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border border-white/20 hover:border-white/40 transition-all"
            >
              <span className="text-sm uppercase tracking-wider">
                Read the Technical Docs
              </span>
            </a>
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
};

/**
 * VISUAL COMPONENTS
 * Simplified for mobile performance while maintaining impact
 * Each visual tells the story of its step
 */

// Problem Visual - Shows the blockage AI agents face
const ProblemVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="text-center">
      {/* AI Agent trying to access */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-blue-500/20 border-2 border-blue-500/40 flex items-center justify-center mb-2">
          <span className="text-2xl">🤖</span>
        </div>
        <div className="text-xs text-white/40">AI Agent</div>
      </motion.div>
      
      {/* Blockage */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="mb-8"
      >
        <div className="text-4xl mb-2">❌</div>
        <div className="text-sm text-white/60 max-w-xs">
          "Route this privately"
          <br />
          "Keep memory encrypted"
          <br />
          "Do not expose the graph"
        </div>
      </motion.div>
      
      {/* Infrastructure (blocked) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-white/40"
      >
        Trusted infrastructure boundary
      </motion.div>
    </div>
  </div>
);

// Protocol Visual - Shows x402 flow
const ProtocolVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="space-y-3 sm:space-y-4 w-full max-w-sm px-2">
      {/* Request */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="bg-white/5 rounded p-2 sm:p-3 border border-white/10"
      >
        <div className="text-xs text-white/40 mb-1">1. Peer Summary</div>
        <code className="text-xs break-all">signed peer view</code>
      </motion.div>
      
      {/* 402 Response */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 rounded p-2 sm:p-3 border border-purple-500/30"
      >
        <div className="text-xs text-purple-400 mb-1">2. Health Sync</div>
        <code className="text-xs break-all">heartbeat aggregate</code>
        <div className="text-xs text-white/60 mt-1">No user payloads</div>
      </motion.div>
      
      {/* Payment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 rounded p-2 sm:p-3 border border-green-500/30"
      >
        <div className="text-xs text-green-400 mb-1">3. Blind Relay</div>
        <code className="text-xs break-all">ciphertext packet</code>
      </motion.div>
      
      {/* Access Granted */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white/5 rounded p-2 sm:p-3 border border-white/10"
      >
        <div className="text-xs text-white/40 mb-1">4. Public Status</div>
        <code className="text-xs break-all">aggregate network stats</code>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center text-xs text-white/40 pt-2"
      >
        Nodes coordinate without reading content
      </motion.div>
    </div>
  </div>
);

// Trust Visual - ZK proofs
const TrustVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative">
      {/* Central node with ZK proof */}
      <motion.div
        className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500/40 to-purple-500/20 flex items-center justify-center relative z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="text-sm md:text-base text-white/80 font-mono">MC</div>
          <div className="text-xs text-white/40">Encrypted</div>
        </div>
      </motion.div>
      
      {/* Proof waves */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-purple-500/20 rounded-full"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ 
            scale: 1 + i * 0.4, 
            opacity: [0, 0.5, 0] 
          }}
          transition={{ 
            duration: 2, 
            delay: i * 0.4,
            repeat: Infinity,
            repeatDelay: 0.8
          }}
        />
      ))}
      
      {/* Memory facts stay encrypted while versions remain auditable. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center w-full"
      >
        <div className="text-xs text-white/40">
          Signed facts, hash-linked versions
          <br />
          <span className="text-white/60">Without exposing raw history</span>
        </div>
      </motion.div>
    </div>
  </div>
);

// Impact Visual - Real-time settlement
const ImpactVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="space-y-4 w-full">
      {/* Transaction flow */}
      <div className="text-center mb-6">
        <div className="text-sm text-white/40 mb-4">Service Lifecycle</div>
        
        {/* Animated transactions */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="flex items-center justify-between bg-white/5 rounded p-2 mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3, duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-white/60">Step {i}</span>
            </div>
            <span className="text-xs text-green-400">{['quote', 'pay', 'run'][i - 1]}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10"
      >
        <div className="text-center">
          <div className="text-2xl font-light text-white mb-1">
            <span className="text-green-400">402</span>
          </div>
          <div className="text-xs text-white/40">Payment Flow</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-light text-white mb-1">
            <span className="text-green-400">E2E</span>
          </div>
          <div className="text-xs text-white/40">Payload Privacy</div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default HowAILWorks;
