/**
 * ============================================
 * HowAILWorks.js - Optimized Version
 * ============================================
 * Last Modified: v2.0 - Business narrative optimization
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
      title: "AI Agents Can't Use Infrastructure",
      description: "Current cloud services require humans to sign up, verify emails, and manage credit cards. AI agents can't do any of this, blocking 99% of automation potential.",
      businessContext: "Every AI agent hitting AWS Lambda needs a human to set up the account. This breaks the promise of autonomous systems.",
      technical: [
        "No API can create accounts autonomously",
        "CAPTCHA blocks non-human access",
        "Credit card verification requires humans",
        "Monthly billing doesn't work for agents"
      ],
      visual: <ProblemVisual />
    },
    {
      phase: "The Protocol",
      title: "HTTP 402: The Missing Status Code",
      description: "Designed in 1997 but never implemented. We built x402 - a protocol that lets any API request include instant payment, enabling true machine-to-machine commerce.",
      businessContext: "With x402, infrastructure becomes pay-per-use by default. No accounts, no subscriptions, just instant transactions.",
      technical: [
        "HTTP 402 + Lightning/USDC payments",
        "Request → Price quote → Payment → Access",
        "Works with existing HTTP infrastructure",
        "Sub-second settlement on Base"
      ],
      visual: <ProtocolVisual />
    },
    {
      phase: "The Trust Layer",
      title: "Zero-Knowledge Hardware Proofs",
      description: "Every node cryptographically proves its hardware capabilities without revealing sensitive information. Agents can verify quality before paying.",
      businessContext: "Eliminates fake nodes and ensures service quality. Users always get what they pay for, guaranteed by mathematics.",
      technical: [
        "Hardware attestation via TEE",
        "ZK-proofs of compute capacity",
        "Privacy-preserving verification",
        "On-chain reputation system"
      ],
      visual: <TrustVisual />
    },
    {
      phase: "The Impact",
      title: "Real-Time Economic Settlement",
      description: "Payments flow instantly as services are consumed. No invoices, no delays, no disputes. Just pure, frictionless machine commerce.",
      businessContext: "Node operators earn in real-time. AI agents pay only for what they use. The economy moves at the speed of code.",
      technical: [
        "Microsecond payment verification",
        "Automatic resource allocation",
        "Dynamic pricing based on demand",
        "Instant revenue for node operators"
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
                How we're solving the AI infrastructure paradox with HTTP 402 payments 
                and zero-knowledge proofs — making infrastructure truly autonomous.
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
                    Business Impact
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
          "Please verify email"
          <br />
          "Enter credit card"
          <br />
          "Complete CAPTCHA"
        </div>
      </motion.div>
      
      {/* Infrastructure (blocked) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-white/40"
      >
        Infrastructure (Unreachable)
      </motion.div>
    </div>
  </div>
);

// Protocol Visual - Shows x402 flow
const ProtocolVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="space-y-4 w-full max-w-sm">
      {/* Request */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="bg-white/5 rounded p-3 border border-white/10"
      >
        <div className="text-xs text-white/40 mb-1">1. Request</div>
        <code className="text-xs text-white/80">GET /bandwidth</code>
      </motion.div>
      
      {/* 402 Response */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 rounded p-3 border border-purple-500/30"
      >
        <div className="text-xs text-purple-400 mb-1">2. Price Quote</div>
        <code className="text-xs text-white/80">402 Payment Required</code>
        <div className="text-xs text-white/60 mt-1">Price: $0.008</div>
      </motion.div>
      
      {/* Payment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 rounded p-3 border border-green-500/30"
      >
        <div className="text-xs text-green-400 mb-1">3. Instant Payment</div>
        <code className="text-xs text-white/80">X-PAYMENT: 0x...</code>
      </motion.div>
      
      {/* Access Granted */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white/5 rounded p-3 border border-white/10"
      >
        <div className="text-xs text-white/40 mb-1">4. Access Granted</div>
        <code className="text-xs text-white/80">200 OK + Resource</code>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center text-xs text-white/40 pt-2"
      >
        Total time: &lt;200ms
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
          <div className="text-sm md:text-base text-white/80 font-mono">ZK</div>
          <div className="text-xs text-white/40">Verified</div>
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
      
      {/* Hardware specs (proven without revealing) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center w-full"
      >
        <div className="text-xs text-white/40">
          Proven: 32GB RAM, 8-core CPU
          <br />
          <span className="text-white/60">Without revealing identity</span>
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
        <div className="text-sm text-white/40 mb-4">Live Settlement</div>
        
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
              <span className="text-xs text-white/60">Node {i}</span>
            </div>
            <span className="text-xs text-green-400">+$0.008</span>
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
            <span className="text-green-400">&lt;1s</span>
          </div>
          <div className="text-xs text-white/40">Settlement Time</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-light text-white mb-1">
            <span className="text-green-400">$0</span>
          </div>
          <div className="text-xs text-white/40">Disputes</div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default HowAILWorks;
