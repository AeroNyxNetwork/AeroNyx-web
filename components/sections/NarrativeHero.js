/**
 * ============================================
 * NarrativeHero.js - Optimized Version
 * ============================================
 * 
 * Modification Reason: v4.0 - Complete Hero rewrite with MemChain-first
 * narrative. "Your AI Deserves a Memory" as emotional hook, then bridges
 * to infrastructure story. Badge updated to MemChain + x402 dual identity.
 * 
 * Last Modified: v4.0 - MemChain-first emotional narrative
 * ============================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';

const NarrativeHero = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  
  const questions = [
    {
      q: "What if your AI never forgot?",
      a: "MemChain stores every insight as a cryptographically signed fact on your personal memory chain. Synced across devices, encrypted end-to-end, owned by you alone."
    },
    {
      q: "What if switching AI tools didn't erase everything?",
      a: "Your memory chain is portable. Move from ChatGPT to Claude to OpenClaw — your AI's knowledge follows you, not the vendor."
    },
    {
      q: "What if infrastructure just worked for machines?",
      a: "x402 instant payments let AI agents access compute, storage, and bandwidth without accounts, credit cards, or human setup."
    }
  ];
  
  return (
    <section className="relative px-6 sm:px-8 lg:px-8 pt-48 sm:pt-52 md:pt-40">
      <div className="flex flex-col pb-16 min-h-[calc(100vh-12rem)]">
        <Container className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto">
            
            {/* Dual Badge — MemChain + x402 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-6 md:mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                <span className="text-sm">🧠</span>
                <span className="text-xs sm:text-sm text-purple-200 font-medium">
                  MemChain — AI Memory Blockchain
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs sm:text-sm text-white/60 font-medium">
                  First DePIN with x402
                </span>
              </div>
            </motion.div>
            
            {/* PRIMARY VALUE PROPOSITION — Emotional Hook */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 md:mb-8"
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 md:mb-6">
                Your AI Deserves
                <br />
                <span className="font-semibold">a Memory</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-2xl text-white/70 leading-relaxed max-w-3xl break-words">
                Permanent. Encrypted. Yours.{' '}
                <span className="text-white">Every conversation, every insight — stored on your personal 
                memory chain, synced across all your devices through an invisible VPN tunnel.</span>
              </p>
            </motion.div>
            
            {/* NETWORK PROOF ELEMENTS */}
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
                <span className="text-sm">🔐</span>
                <span className="text-sm text-white/60">
                  <span className="text-white font-medium">Ed25519</span> Signed
                </span>
              </div>
              
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              
              <div className="flex items-center gap-2">
                <span className="text-sm">⛓️</span>
                <span className="text-sm text-white/60">
                  <span className="text-white font-medium">Merkle</span> Chained
                </span>
              </div>
            </motion.div>
            
            {/* TRIPLE CTA — Three Personas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16"
            >
              {/* Primary CTA — MemChain / AI Users */}
              <a
                href="#memchain"
                className="group relative overflow-hidden inline-block"
              >
                <div className="relative z-10 px-8 py-4 bg-white text-black hover:bg-white/90 transition-all text-center">
                  <span className="text-sm font-medium uppercase tracking-wider">
                    🧠 Explore MemChain
                  </span>
                  <div className="text-xs text-black/60 mt-1">
                    Give your AI permanent memory
                  </div>
                </div>
              </a>
              
              {/* Secondary CTA — Developers */}
              <a
                href="https://docs.aeronyx.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden inline-block"
              >
                <div className="relative z-10 px-8 py-4 border border-white/20 hover:border-white/40 transition-all text-center">
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Start Building
                  </span>
                  <div className="text-xs text-white/60 mt-1">
                    Integrate in 5 minutes
                  </div>
                </div>
              </a>
              
              {/* Tertiary CTA — Node Operators */}
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
            
            {/* INTERACTIVE QUESTIONS */}
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
            
            {/* CLOSING PROPOSITION */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="border-t border-white/10 pt-8"
            >
              <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed mb-6">
                Built on a proven privacy network with 15,000+ nodes across 147 countries. 
                AeroNyx combines{' '}
                <span className="text-white font-medium">MemChain encrypted memory</span> with{' '}
                <span className="text-white font-medium">x402 instant payments</span> and{' '}
                <span className="text-white font-medium">zero-knowledge proofs</span> — creating 
                the first platform where your AI truly belongs to you: its knowledge, its memory, 
                its infrastructure. No corporations in the middle.
              </p>
              
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
                  href="#memchain"
                  className="text-white/40 hover:text-white transition-colors text-center sm:text-left"
                >
                  <span className="text-xs sm:text-sm uppercase tracking-wider">
                    Explore MemChain →
                  </span>
                </a>
                
                <a
                  href="#products"
                  className="text-white/40 hover:text-white transition-colors text-center sm:text-left"
                >
                  <span className="text-xs sm:text-sm uppercase tracking-wider">
                    All Products →
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
