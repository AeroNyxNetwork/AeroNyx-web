/**
 * ============================================
 * ProblemStatement.js - NEW Component
 * ============================================
 * 
 * Last Modified: v1.0 - Initial creation
 * ============================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

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
      icon: "📊",
      title: "Billing Management",
      problem: "Monthly subscriptions require ongoing human management",
      stat: "Unsustainable"
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
          
          {/* Visual Demonstration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-16"
          >
            <div className="bg-black border border-white/10 rounded-xl p-6 md:p-10">
              <div className="flex flex-col items-center gap-6 md:gap-8">
                
                {/* AI Agent */}
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 border-2 border-blue-500/40 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">🤖</span>
                  </div>
                  <div className="text-sm md:text-base font-medium">Autonomous AI Agent</div>
                  <div className="text-xs text-white/40">Ready to execute tasks</div>
                </div>
                
                {/* Blockage */}
                <div className="flex items-center gap-3">
                  <div className="h-12 md:h-16 w-px bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl mb-2">⛔</div>
                    <div className="text-xs md:text-sm text-red-400 font-medium">Access Denied</div>
                  </div>
                  <div className="h-12 md:h-16 w-px bg-white/20"></div>
                </div>
                
                {/* Infrastructure (unreachable) */}
                <div className="text-center opacity-30">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-600/20 border-2 border-purple-500/40 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">☁️</span>
                  </div>
                  <div className="text-sm md:text-base font-medium">Cloud Infrastructure</div>
                  <div className="text-xs text-white/40">Unreachable</div>
                </div>
                
              </div>
            </div>
          </motion.div>
          
          {/* Three Blockers */}
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16">
            {blockers.map((blocker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-6"
              >
                <div className="text-3xl md:text-4xl mb-3">{blocker.icon}</div>
                <h3 className="text-base md:text-lg font-medium mb-2">{blocker.title}</h3>
                <p className="text-xs md:text-sm text-white/60 mb-3 leading-relaxed">
                  {blocker.problem}
                </p>
                <div className="text-xs font-medium text-red-400">{blocker.stat}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Impact Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 p-6 md:p-8 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="text-5xl md:text-6xl font-light text-red-400">99%</div>
              <div className="text-base md:text-lg font-medium">
                Of AI automation potential is blocked
              </div>
              <p className="text-xs md:text-sm text-white/60 max-w-md">
                Because current infrastructure was designed for humans, not autonomous agents.
                Every API call requires a human somewhere in the loop.
              </p>
            </div>
          </motion.div>
          
          {/* Transition to Solution */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-10 md:mt-16"
          >
            <div className="text-sm md:text-base text-white/40 mb-2">Until now...</div>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
};

export default ProblemStatement;
