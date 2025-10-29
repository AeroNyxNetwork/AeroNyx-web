/**
 * ============================================
 * X402Showcase.js - NEW Component
 * ============================================
 * 
 * Creation Reason:
 * - Immediately showcase x402 as core differentiator after Hero
 * - Give proper credit to Coinbase for x402 protocol invention
 * - Demonstrate AeroNyx's unique application: x402 + ZKP + DePIN
 * - Provide tangible before/after comparison for quick understanding
 * Last Modified: v1.0 - Initial creation
 * ============================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const X402Showcase = () => {
  const [activeTab, setActiveTab] = useState('traditional');
  
  return (
    <section className="py-12 md:py-20 bg-black border-y border-white/5">
      <Container>
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <span className="text-xs sm:text-sm font-medium text-purple-300">
                The x402 Difference
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              From Impossible to Instant
            </h2>
            
            <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
              Built on <span className="text-white font-medium">Coinbase's x402 protocol</span>, 
              AeroNyx makes infrastructure truly autonomous — no human intervention required.
            </p>
          </motion.div>
          
          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-lg bg-white/5 border border-white/10">
              <button
                onClick={() => setActiveTab('traditional')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'traditional'
                    ? 'bg-white text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Traditional API
              </button>
              <button
                onClick={() => setActiveTab('x402')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'x402'
                    ? 'bg-white text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                With x402
              </button>
            </div>
          </div>
          
          {/* Comparison Content */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
            
            {/* Flow Visualization */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="order-2 md:order-1"
            >
              {activeTab === 'traditional' ? (
                <TraditionalFlow />
              ) : (
                <X402Flow />
              )}
            </motion.div>
            
            {/* Code Example */}
            <motion.div
              key={`code-${activeTab}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="order-1 md:order-2"
            >
              <div className="bg-neutral-900 rounded-lg border border-white/10 overflow-hidden">
                {/* Code Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-xs text-white/40 ml-2">
                      {activeTab === 'traditional' ? 'traditional_api.js' : 'x402_api.js'}
                    </span>
                  </div>
                </div>
                
                {/* Code Content */}
                <div className="p-4 font-mono text-sm overflow-x-auto">
                  {activeTab === 'traditional' ? (
                    <TraditionalCode />
                  ) : (
                    <X402Code />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Innovation Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10 rounded-xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">
                  AeroNyx's Innovation: x402 + ZKP + DePIN
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  We combine <span className="text-white">Coinbase's x402 protocol</span> with 
                  zero-knowledge hardware proofs and a 15,000-node decentralized network — 
                  creating the first infrastructure where AI agents can verify quality, 
                  pay instantly, and access resources without any human setup.
                </p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
};

/**
 * Traditional API Flow Visualization
 * Shows the painful multi-step process with human intervention
 */
const TraditionalFlow = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-light mb-6 text-red-400">
      ❌ Traditional API: Impossible for AI Agents
    </h3>
    
    <FlowStep 
      number="1" 
      title="Create Account" 
      description="Human must sign up, verify email"
      status="blocked"
      icon="👤"
    />
    
    <FlowStep 
      number="2" 
      title="Add Payment Method" 
      description="Human must enter credit card details"
      status="blocked"
      icon="💳"
    />
    
    <FlowStep 
      number="3" 
      title="Configure Billing" 
      description="Human must set up monthly subscription"
      status="blocked"
      icon="📊"
    />
    
    <FlowStep 
      number="4" 
      title="Get API Key" 
      description="Finally... access infrastructure"
      status="slow"
      icon="🔑"
    />
    
    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
      <div className="flex items-start gap-3">
        <span className="text-xl">⏱️</span>
        <div>
          <div className="font-medium text-red-300 mb-1">Result: 2-5 days setup time</div>
          <div className="text-sm text-white/60">
            Requires human for every step. AI agents completely blocked.
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * x402 Flow Visualization
 * Shows the instant, autonomous process
 */
const X402Flow = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-light mb-6 text-green-400">
      ✅ With x402: Instant & Autonomous
    </h3>
    
    <FlowStep 
      number="1" 
      title="Request Resource" 
      description="AI agent sends HTTP request"
      status="success"
      icon="🤖"
    />
    
    <FlowStep 
      number="2" 
      title="Receive Price Quote" 
      description="Server responds with 402 + price"
      status="success"
      icon="💰"
    />
    
    <FlowStep 
      number="3" 
      title="Auto-Pay with x402" 
      description="Wallet signs payment automatically"
      status="success"
      icon="⚡"
    />
    
    <FlowStep 
      number="4" 
      title="Get Access" 
      description="Instant resource delivery"
      status="success"
      icon="✨"
    />
    
    <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
      <div className="flex items-start gap-3">
        <span className="text-xl">⚡</span>
        <div>
          <div className="font-medium text-green-300 mb-1">Result: &lt;200ms total time</div>
          <div className="text-sm text-white/60">
            Fully autonomous. No human intervention needed at any step.
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Flow Step Component
 */
const FlowStep = ({ number, title, description, status, icon }) => {
  const statusColors = {
    blocked: 'border-red-500/30 bg-red-500/5',
    slow: 'border-yellow-500/30 bg-yellow-500/5',
    success: 'border-green-500/30 bg-green-500/5'
  };
  
  return (
    <div className={`p-4 rounded-lg border ${statusColors[status]}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium">
            {number}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{icon}</span>
            <h4 className="font-medium text-sm">{title}</h4>
          </div>
          <p className="text-xs text-white/60">{description}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Traditional API Code Example
 */
const TraditionalCode = () => (
  <pre className="text-xs leading-relaxed">
    <code>
      <span className="text-gray-500">// Step 1: Human signs up manually</span>{'\n'}
      <span className="text-gray-500">// Step 2: Human adds credit card</span>{'\n'}
      <span className="text-gray-500">// Step 3: Human gets API key</span>{'\n'}
      {'\n'}
      <span className="text-purple-400">const</span> <span className="text-blue-300">apiKey</span> = <span className="text-green-300">'sk_live_...'</span>; <span className="text-gray-500">// From dashboard</span>{'\n'}
      {'\n'}
      <span className="text-purple-400">const</span> <span className="text-blue-300">response</span> = <span className="text-purple-400">await</span> <span className="text-yellow-300">fetch</span>(<span className="text-green-300">'https://api.example.com'</span>, {'{'}{'\n'}
      {'  '}<span className="text-blue-300">headers</span>: {'{'}{'\n'}
      {'    '}<span className="text-green-300">'Authorization'</span>: <span className="text-green-300">`Bearer </span>${'{'}apiKey{'}'}<span className="text-green-300">`</span>{'\n'}
      {'  }'}{'\n'}
      {'}'});{'\n'}
      {'\n'}
      <span className="text-gray-500">// ❌ Problem: AI agents can't get apiKey</span>{'\n'}
      <span className="text-gray-500">// ❌ Requires human intervention</span>{'\n'}
      <span className="text-gray-500">// ❌ Monthly billing = inflexible</span>
    </code>
  </pre>
);

/**
 * x402 API Code Example
 */
const X402Code = () => (
  <pre className="text-xs leading-relaxed">
    <code>
      <span className="text-gray-500">// That's it! No sign-up, no API keys needed</span>{'\n'}
      {'\n'}
      <span className="text-purple-400">const</span> <span className="text-blue-300">response</span> = <span className="text-purple-400">await</span> <span className="text-yellow-300">fetch</span>(<span className="text-green-300">'https://aeronyx.network/compute'</span>, {'{'}{'\n'}
      {'  '}<span className="text-blue-300">headers</span>: {'{'}{'\n'}
      {'    '}<span className="text-green-300">'X-Payment'</span>: <span className="text-purple-400">await</span> wallet.<span className="text-yellow-300">signPayment</span>(){'\n'}
      {'  }'}{'\n'}
      {'}'});{'\n'}
      {'\n'}
      <span className="text-gray-500">// ✅ Fully autonomous</span>{'\n'}
      <span className="text-gray-500">// ✅ Instant payment (&lt;200ms)</span>{'\n'}
      <span className="text-gray-500">// ✅ Pay only for what you use</span>{'\n'}
      {'\n'}
      <span className="text-gray-500">// Behind the scenes:</span>{'\n'}
      <span className="text-gray-500">// 1. Server responds 402 Payment Required</span>{'\n'}
      <span className="text-gray-500">// 2. Wallet auto-signs payment via x402</span>{'\n'}
      <span className="text-gray-500">// 3. Request retried with payment proof</span>{'\n'}
      <span className="text-gray-500">// 4. Resource delivered instantly</span>
    </code>
  </pre>
);

export default X402Showcase;
