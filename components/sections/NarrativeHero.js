/**
 * ============================================
 * NarrativeHero.js - Optimized Version
 * ============================================
 * Dependencies:
 * - Container component (ui/Container)
 * - Framer Motion for animations
 * ============================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';

const NarrativeHero = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  
  // Interactive questions - preserved from original for engagement
  // These create curiosity and invite exploration
  const questions = [
    {
      q: "What if infrastructure could think?",
      a: "Not just respond to commands, but anticipate needs, optimize itself, and evolve without human intervention."
    },
    {
      q: "What if every node had intelligence?",
      a: "Each device becomes a neuron in a global brain, contributing to collective decision-making."
    },
    {
      q: "What if privacy was guaranteed by math?",
      a: "Zero-knowledge proofs ensure complete privacy while enabling global coordination."
    }
  ];
  
  return (
    <section className="min-h-screen relative px-4 sm:px-6 lg:px-8">
      <div className="min-h-screen flex items-center pt-24 md:pt-0">
        <Container className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto">
            
            {/* Brand identifier - subtle and professional */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40 mb-6 md:mb-8"
            >
              AeroNyx Protocol
            </motion.div>
            
            {/* 
              PRIMARY VALUE PROPOSITION
              Goal: User understands core value in 3 seconds
              Format: Direct, specific, benefit-oriented
            */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 md:mb-8"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 md:mb-6">
                The Payment Layer
                <br />
                <span className="font-semibold">AI Agents Need</span>
              </h1>
              
              {/* Subheadline - specific and actionable */}
              <p className="text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl">
                Pay-per-API-call infrastructure.{' '}
                <span className="text-white">No accounts, no credit cards, just code.</span>
              </p>
            </motion.div>
            
            {/* 
              NETWORK PROOF ELEMENTS
              Social proof builds trust immediately
              Note: Replace with real-time data when API is available
            */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 md:gap-6 mb-10 md:mb-12 pb-8 border-b border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-white/60">
                  <span className="text-white font-medium">15,000+</span> Active Nodes
                </span>
              </div>
              
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-white/60">
                  <span className="text-white font-medium">147</span> Countries
                </span>
              </div>
              
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm text-white/60">
                  <span className="text-white font-medium">&lt;50ms</span> Latency
                </span>
              </div>
            </motion.div>
            
            {/* 
              DUAL CTA STRATEGY
              Different personas need different entry points
              - Developers: Technical integration
              - Node Operators: Economic opportunity
            */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16"
            >
              {/* Primary CTA - For Developers */}
              <a
                href="https://docs.aeronyx.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden inline-block"
              >
                <div className="relative z-10 px-8 py-4 bg-white text-black hover:bg-white/90 transition-all text-center">
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Start Building
                  </span>
                  <div className="text-xs text-black/60 mt-1">
                    Integrate in 5 minutes
                  </div>
                </div>
              </a>
              
              {/* Secondary CTA - For Node Operators */}
              <a
                href="https://docs.aeronyx.network/decentralized-node-documentation"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden inline-block"
              >
                <div className="relative z-10 px-8 py-4 border border-white/20 hover:border-white/40 transition-all text-center">
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Run a Node
                  </span>
                  <div className="text-xs text-white/60 mt-1">
                    Earn passive income
                  </div>
                </div>
              </a>
            </motion.div>
            
            {/* 
              INTERACTIVE QUESTIONS
              Preserved from original - creates engagement and invites exploration
              These work as a "second layer" for curious visitors
            */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="space-y-4 md:space-y-6 mb-8 md:mb-12"
            >
              <div className="text-xs sm:text-sm uppercase tracking-wider text-white/40 mb-4">
                The Future We're Building
              </div>
              
              {questions.map((item, index) => (
                <motion.div
                  key={index}
                  className={`border-l-2 pl-4 md:pl-6 cursor-pointer transition-all duration-300 ${
                    activeQuestion === index 
                      ? 'border-white/60' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onClick={() => setActiveQuestion(index)}
                  whileHover={{ x: 4 }}
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-light mb-2 text-white/80">
                    {item.q}
                  </h3>
                  <AnimatePresence>
                    {activeQuestion === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm sm:text-base text-white/60 leading-relaxed"
                      >
                        {item.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
            
            {/* 
              CLOSING PROPOSITION
              Bridges to the next section with context
              Maintains brand story while being grounded in business value
            */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="border-t border-white/10 pt-8"
            >
              <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed mb-6">
                Built on our proven privacy network with 15,000+ nodes, AeroNyx introduces{' '}
                <span className="text-white font-medium">HTTP 402 payments</span> and{' '}
                <span className="text-white font-medium">zero-knowledge proofs</span> to create 
                the first truly machine-native infrastructure — where AI agents can autonomously 
                discover, verify, and pay for resources without human intervention.
              </p>
              
              {/* Tertiary navigation for deeper exploration */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <a
                  href="#how-it-works"
                  className="text-white/40 hover:text-white transition-colors text-center sm:text-left"
                >
                  <span className="text-xs sm:text-sm uppercase tracking-wider">
                    See How It Works →
                  </span>
                </a>
                
                <a
                  href="#products"
                  className="text-white/40 hover:text-white transition-colors text-center sm:text-left"
                >
                  <span className="text-xs sm:text-sm uppercase tracking-wider">
                    Explore Products →
                  </span>
                </a>
              </div>
            </motion.div>
            
          </div>
        </Container>
      </div>
    </section>
  );
};

export default NarrativeHero;
