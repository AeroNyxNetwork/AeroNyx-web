/**
 * ============================================
 * NarrativeHero.js - v6.0 Polish Pass
 * ============================================
 * 
 * Modification Reason: v6.0
 * - Buttons: 3 → 2, removed emoji from CTA, gradient border on primary
 * - "Run a Node" demoted to bottom text links
 * - Proof elements: 4 → 3 core metrics, cleaner spacing
 * - Bottom links: 3 → 2, removed duplicate
 * - Overall: more whitespace, less info density, more "breathing room"
 * 
 * Last Modified: v6.0 - Button redesign + info density reduction
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
          {/* TOP: Text + Visual Split */}
          {/* ============================================ */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 md:mb-20">
            
            {/* Left: Text */}
            <div className="max-w-2xl">
              
              {/* Badge — single clean line */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-xs sm:text-sm text-purple-200/80 font-medium">
                  MemChain — Encrypted AI Memory on DePIN
                </span>
              </motion.div>
              
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
              >
                Your AI Deserves
                <br />
                <span className="font-semibold">a Memory</span>
              </motion.h1>
              
              {/* Subheadline — shorter, punchier */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-8 max-w-lg"
              >
                Every conversation, every insight — signed, chained, and synced 
                across your devices through an encrypted tunnel.{' '}
                <span className="text-white/90">No cloud. No third party.</span>
              </motion.p>
              
              {/* Proof elements — 3 clean items */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-white/8"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-white/50">
                    <span className="text-white/80 font-medium">15,000+</span> Nodes
                  </span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <span className="text-sm text-white/50">
                  <span className="text-white/80 font-medium">147</span> Countries
                </span>
                <div className="w-px h-3 bg-white/10" />
                <span className="text-sm text-white/50">
                  <span className="text-white/80 font-medium">End-to-end</span> Encrypted
                </span>
              </motion.div>
              
              {/* CTAs — 2 buttons, clean hierarchy */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* Primary: Gradient border glow */}
                <a href="#memchain" className="group relative inline-block">
                  {/* Glow layer */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
                  <div className="relative px-8 py-4 bg-black rounded-lg text-center">
                    <span className="text-sm font-medium uppercase tracking-wider text-white">
                      Explore MemChain
                    </span>
                    <div className="text-xs text-white/40 mt-1">
                      Permanent AI memory, owned by you
                    </div>
                  </div>
                </a>
                
                {/* Secondary: Clean border */}
                <a
                  href="https://docs.aeronyx.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <div className="px-8 py-4 border border-white/15 hover:border-white/30 rounded-lg transition-all duration-300 text-center">
                    <span className="text-sm font-medium uppercase tracking-wider text-white/80">
                      Start Building
                    </span>
                    <div className="text-xs text-white/40 mt-1">
                      SDK docs & integration guide
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
            
            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="aspect-square max-w-[500px] mx-auto">
                <MemoryChainHeroVisual />
              </div>
            </motion.div>
          </div>
          
          {/* ============================================ */}
          {/* BOTTOM: Questions + Closing */}
          {/* ============================================ */}
          <div className="max-w-4xl mx-auto">
            
            {/* Questions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="space-y-5 mb-10 md:mb-14"
            >
              <div className="text-xs uppercase tracking-wider text-white/30 mb-5">
                The Future We're Building
              </div>
              
              {questions.map((item, index) => (
                <motion.div
                  key={index}
                  className={`border-l-2 pl-5 md:pl-6 cursor-pointer transition-all duration-300 ${
                    activeQuestion === index 
                      ? 'border-purple-400/60' 
                      : 'border-white/10 hover:border-white/25'
                  }`}
                  onClick={() => setActiveQuestion(index)}
                  whileHover={{ x: 3 }}
                >
                  <h3 className={`text-base sm:text-lg md:text-xl font-light mb-1 transition-colors duration-300 ${
                    activeQuestion === index ? 'text-white/90' : 'text-white/60'
                  }`}>
                    {item.q}
                  </h3>
                  <AnimatePresence>
                    {activeQuestion === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm sm:text-base text-white/45 leading-relaxed pt-1"
                      >
                        {item.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Closing — tighter, with inline links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="border-t border-white/8 pt-8"
            >
              <p className="text-sm md:text-base text-white/45 leading-relaxed mb-6 max-w-3xl">
                Built on 15,000+ nodes across 147 countries. AeroNyx combines{' '}
                <span className="text-white/70">encrypted memory chains</span>,{' '}
                <span className="text-white/70">x402 instant payments</span>, and{' '}
                <span className="text-white/70">zero-knowledge proofs</span> — infrastructure 
                where your AI truly belongs to you.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <a href="#how-it-works" className="text-white/30 hover:text-white/70 transition-colors">
                  <span className="text-xs uppercase tracking-wider">How It Works →</span>
                </a>
                <a href="#products" className="text-white/30 hover:text-white/70 transition-colors">
                  <span className="text-xs uppercase tracking-wider">All Products →</span>
                </a>
                <a
                  href="https://docs.aeronyx.network/decentralized-node-documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white/70 transition-colors"
                >
                  <span className="text-xs uppercase tracking-wider">Run a Node →</span>
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
