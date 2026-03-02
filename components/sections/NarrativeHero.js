/**
 * ============================================
 * NarrativeHero.js - v5.0 Visual Upgrade
 * ============================================
 * 
 * Modification Reason: v5.0 - Added MemoryChainHeroVisual as the
 * visual anchor. Hero now has a split layout on desktop: text left,
 * animated memory chain right. Mobile stacks vertically.
 * 
 * Last Modified: v5.0 - Visual hero upgrade with animated memory chain
 * ============================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';
import MemoryChainHeroVisual from '../ui/MemoryChainHeroVisual';

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
      <div className="flex flex-col pb-16">
        <Container className="relative z-10 w-full">
          
          {/* ============================================ */}
          {/* TOP SECTION: Text + Visual Split */}
          {/* ============================================ */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 md:mb-16">
            
            {/* Left: Text Content */}
            <div className="max-w-2xl">
              
              {/* Dual Badge */}
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
              
              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 md:mb-8"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 md:mb-6">
                  Your AI Deserves
                  <br />
                  <span className="font-semibold">a Memory</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed break-words">
                  Permanent. Encrypted. Yours.{' '}
                  <span className="text-white">Every conversation, every insight — stored on your personal 
                  memory chain, synced across all your devices through an invisible VPN tunnel.</span>
                </p>
              </motion.div>
              
              {/* Network Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap items-center gap-3 md:gap-5 mb-8 pb-6 border-b border-white/10"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/50">
                    <span className="text-white/80 font-medium">15,000+</span> Nodes
                  </span>
                </div>
                <div className="w-px h-3 bg-white/15 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🔐</span>
                  <span className="text-xs text-white/50">
                    <span className="text-white/80 font-medium">Ed25519</span> Signed
                  </span>
                </div>
                <div className="w-px h-3 bg-white/15 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">⛓️</span>
                  <span className="text-xs text-white/50">
                    <span className="text-white/80 font-medium">Merkle</span> Chained
                  </span>
                </div>
                <div className="w-px h-3 bg-white/15 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-white/50">
                    <span className="text-white/80 font-medium">147</span> Countries
                  </span>
                </div>
              </motion.div>
              
              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a href="#memchain" className="group inline-block">
                  <div className="px-8 py-4 bg-white text-black hover:bg-white/90 transition-all text-center">
                    <span className="text-sm font-medium uppercase tracking-wider">
                      🧠 Explore MemChain
                    </span>
                    <div className="text-xs text-black/60 mt-1">
                      Give your AI permanent memory
                    </div>
                  </div>
                </a>
                
                <a
                  href="https://docs.aeronyx.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block"
                >
                  <div className="px-8 py-4 border border-white/20 hover:border-white/40 transition-all text-center">
                    <span className="text-sm font-medium uppercase tracking-wider">
                      Start Building
                    </span>
                    <div className="text-xs text-white/60 mt-1">
                      Integrate in 5 minutes
                    </div>
                  </div>
                </a>
                
                <a
                  href="https://docs.aeronyx.network/decentralized-node-documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block"
                >
                  <div className="px-8 py-4 border border-white/20 hover:border-white/40 transition-all text-center">
                    <span className="text-sm font-medium uppercase tracking-wider">
                      Run a Node
                    </span>
                    <div className="text-xs text-white/60 mt-1">
                      Earn passive income
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
            
            {/* Right: Animated Memory Chain Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="aspect-square max-w-[500px] mx-auto">
                <MemoryChainHeroVisual />
              </div>
            </motion.div>
          </div>
          
          {/* ============================================ */}
          {/* BOTTOM SECTION: Questions + Closing */}
          {/* ============================================ */}
          <div className="max-w-5xl mx-auto">
            
            {/* Interactive Questions */}
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
            
            {/* Closing Proposition */}
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
                <a href="#how-it-works" className="text-white/40 hover:text-white transition-colors text-center sm:text-left">
                  <span className="text-xs sm:text-sm uppercase tracking-wider">See How It Works →</span>
                </a>
                <a href="#memchain" className="text-white/40 hover:text-white transition-colors text-center sm:text-left">
                  <span className="text-xs sm:text-sm uppercase tracking-wider">Explore MemChain →</span>
                </a>
                <a href="#products" className="text-white/40 hover:text-white transition-colors text-center sm:text-left">
                  <span className="text-xs sm:text-sm uppercase tracking-wider">All Products →</span>
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
