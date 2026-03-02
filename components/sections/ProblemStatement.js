/**
 * ============================================
 * ProblemStatement.js - v2.0 Scroll-Driven Upgrade
 * ============================================
 * 
 * Modification Reason: v2.0 - Added scroll-driven animations:
 * - ⛔ blockage icon scales up as user scrolls into view
 * - Blocker cards stagger in with offset delays
 * - 99% counter animates from 0 on viewport enter
 * - Infrastructure fades from blurred to clear
 * 
 * Last Modified: v2.0 - Scroll-driven animation upgrade
 * ============================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';

/**
 * Animated counter that counts up when visible
 */
const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();
    
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    
    requestAnimationFrame(tick);
  }, [isInView, target]);
  
  return <span ref={ref}>{count}{suffix}</span>;
};

const ProblemStatement = () => {
  const blockers = [
    {
      icon: "📧",
      title: "Account Creation",
      problem: "AI agents can't verify emails or solve CAPTCHAs",
      stat: "100% blocked"
    },
    {
      icon: "💳",
      title: "Payment Setup",
      problem: "No credit cards, no bank accounts, no human to set them up",
      stat: "100% blocked"
    },
    {
      icon: "🧠",
      title: "Memory Lock-in",
      problem: "AI memories are trapped in vendor silos — switch tools, lose everything",
      stat: "Zero portability"
    }
  ];
  
  return (
    <section className="py-12 md:py-20 bg-neutral-950 border-y border-white/5">
      <Container>
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
              The AI Infrastructure Paradox
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              We built autonomous AI agents that can write code, analyze data, and make decisions.
              But they can't access the infrastructure they need to execute.
            </p>
          </motion.div>
          
          {/* Visual Demonstration — Scroll-Driven */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-16"
          >
            <div className="bg-black border border-white/10 rounded-xl p-6 md:p-10">
              <div className="flex flex-col items-center gap-6 md:gap-8">
                
                {/* AI Agent — slides in from left */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 border-2 border-blue-500/40 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">🤖</span>
                  </div>
                  <div className="text-sm md:text-base font-medium">Autonomous AI Agent</div>
                  <div className="text-xs text-white/40">Ready to execute tasks</div>
                </motion.div>
                
                {/* Blockage — scales up dramatically on scroll */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 15 
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="h-12 md:h-16 w-px bg-white/20"></div>
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        rotate: [0, -5, 5, -5, 0],
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 1.2,
                        repeat: 2,
                        repeatDelay: 3 
                      }}
                      className="text-4xl md:text-6xl mb-2"
                    >
                      ⛔
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                      className="text-xs md:text-sm text-red-400 font-medium"
                    >
                      Access Denied
                    </motion.div>
                  </div>
                  <div className="h-12 md:h-16 w-px bg-white/20"></div>
                </motion.div>
                
                {/* Infrastructure — fades in blurred then clears, stays dim */}
                <motion.div
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  whileInView={{ opacity: 0.3, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-600/20 border-2 border-purple-500/40 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">☁️</span>
                  </div>
                  <div className="text-sm md:text-base font-medium">Cloud Infrastructure</div>
                  <div className="text-xs text-white/40">Unreachable</div>
                </motion.div>
                
              </div>
            </div>
          </motion.div>
          
          {/* Three Blockers — Staggered entrance */}
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16">
            {blockers.map((blocker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-6 cursor-default"
              >
                <motion.div 
                  className="text-3xl md:text-4xl mb-3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.3 + index * 0.15, 
                    type: "spring", 
                    stiffness: 300 
                  }}
                >
                  {blocker.icon}
                </motion.div>
                <h3 className="text-base md:text-lg font-medium mb-2">{blocker.title}</h3>
                <p className="text-xs md:text-sm text-white/60 mb-3 leading-relaxed">
                  {blocker.problem}
                </p>
                <div className="text-xs font-medium text-red-400">{blocker.stat}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Impact Statement — Animated counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 p-6 md:p-8 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="text-5xl md:text-6xl font-light text-red-400">
                <AnimatedCounter target={99} suffix="%" />
              </div>
              <div className="text-base md:text-lg font-medium">
                Of AI automation potential is blocked
              </div>
              <p className="text-xs md:text-sm text-white/60 max-w-md">
                Because current infrastructure was designed for humans, not autonomous agents.
                Every API call requires a human somewhere in the loop.
              </p>
            </div>
          </motion.div>
          
          {/* Transition */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-10 md:mt-16"
          >
            <motion.div 
              className="text-sm md:text-base text-white/40 mb-2"
              initial={{ y: 10 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
            >
              Until now...
            </motion.div>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
};

export default ProblemStatement;
