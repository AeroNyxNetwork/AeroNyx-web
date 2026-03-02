/**
 * ============================================
 * MemChainShowcase.js - AI Memory Chain Demo
 * ============================================
 * 
 * Creation Reason: Showcase MemChain as the killer app that makes
 * AeroNyx's abstract infrastructure tangible. This section tells the
 * story of "Your AI has permanent, encrypted, cross-device memory."
 * 
 * Positioned after ProductsEcosystem, before VPNDownloadSection.
 * 
 * Main Functionality:
 * - Visual demo of the Memory Chain concept
 * - Live-feel terminal showing Fact creation → Block mining
 * - OpenClaw integration teaser
 * - Cross-device sync visualization
 * 
 * Last Modified: v1.0 - Initial creation
 * ============================================
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';

const MemChainShowcase = () => {
  return (
    <section id="memchain" className="py-16 md:py-28 bg-black relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>
      
      <Container>
        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="text-lg">🧠</span>
              <span className="text-xs sm:text-sm font-medium text-purple-300">
                MemChain — AI Memory Blockchain
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
              Your AI Remembers.
              <br />
              <span className="font-semibold">Forever. Everywhere. Privately.</span>
            </h2>
            
            <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Every conversation, every preference, every insight — stored as 
              cryptographically signed facts on your personal memory chain. 
              Synced across all your devices through the encrypted VPN tunnel.
              <span className="text-white font-medium"> No cloud. No third party. Just you.</span>
            </p>
          </motion.div>
          
          {/* Main Demo Grid */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
            
            {/* Left: Memory Chain Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <MemoryChainVisual />
            </motion.div>
            
            {/* Right: Live Terminal Demo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LiveTerminalDemo />
            </motion.div>
          </div>
          
          {/* How It Works - Three Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-light">
                Three Layers of Memory Protection
              </h3>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
              <PillarCard
                icon="🔐"
                title="Signed"
                description="Every memory is Ed25519 signed by your device. Nobody can forge your AI's thoughts."
                detail="SHA-256 content hash + Ed25519 signature = tamper-proof"
              />
              <PillarCard
                icon="⛓️"
                title="Chained"
                description="Memories are packed into blocks with Merkle roots. One changed bit breaks the entire chain."
                detail="Block height + prev_hash + merkle_root = immutable history"
              />
              <PillarCard
                icon="👻"
                title="Invisible"
                description="Memory sync hides inside normal VPN traffic. Network observers see nothing unusual."
                detail="0xAE multiplexing inside ChaCha20-Poly1305 tunnel"
              />
            </div>
          </motion.div>
          
          {/* Cross-Device Sync Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <CrossDeviceSyncVisual />
          </motion.div>
          
          {/* OpenClaw Integration Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <OpenClawTeaser />
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
};

/**
 * Memory Chain Visualization
 * Shows facts flowing into blocks visually
 */
const MemoryChainVisual = () => {
  const facts = [
    { subject: "user", predicate: "prefers", object: "dark mode", time: "2m ago" },
    { subject: "user", predicate: "speaks", object: "Mandarin, English", time: "5m ago" },
    { subject: "project", predicate: "uses", object: "Rust + Tokio", time: "12m ago" },
    { subject: "user", predicate: "interested_in", object: "distributed systems", time: "1h ago" },
  ];
  
  const blocks = [
    { height: 42, facts: 15, time: "1h ago" },
    { height: 41, facts: 8, time: "2h ago" },
    { height: 40, facts: 22, time: "3h ago" },
  ];
  
  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-5 md:p-8">
      <div className="text-xs uppercase tracking-wider text-white/40 mb-4">
        Memory Pool — Pending Facts
      </div>
      
      {/* Pending Facts */}
      <div className="space-y-2 mb-6">
        {facts.map((fact, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between bg-black/50 border border-white/5 rounded-lg px-3 py-2"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
              <span className="text-xs text-white/70 truncate">
                <span className="text-purple-300">{fact.subject}</span>
                <span className="text-white/40"> → </span>
                <span className="text-blue-300">{fact.predicate}</span>
                <span className="text-white/40"> → </span>
                <span className="text-green-300">{fact.object}</span>
              </span>
            </div>
            <span className="text-xs text-white/30 flex-shrink-0 ml-2">{fact.time}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Arrow */}
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/30"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
      
      {/* Mined Blocks */}
      <div className="text-xs uppercase tracking-wider text-white/40 mb-3">
        ⛏️ Sealed Blocks — Immutable
      </div>
      
      <div className="space-y-2">
        {blocks.map((block, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.15 }}
            className="flex items-center justify-between bg-purple-500/5 border border-purple-500/20 rounded-lg px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-purple-300">#{block.height}</span>
              <span className="text-xs text-white/50">{block.facts} memories</span>
            </div>
            <span className="text-xs text-white/30">{block.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/**
 * Live Terminal Demo
 * Simulates the API interaction with typewriter effect
 */
const LiveTerminalDemo = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 2500),
      setTimeout(() => setStep(3), 4000),
      setTimeout(() => setStep(4), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  
  return (
    <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs text-white/40 ml-2">memchain-api — 127.0.0.1:8421</span>
      </div>
      
      {/* Terminal Body */}
      <div className="p-4 md:p-6 font-mono text-xs sm:text-sm space-y-3 min-h-[320px]">
        
        {/* Step 1: Write a memory */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1"
            >
              <div className="text-green-400">$ curl -X POST /api/fact</div>
              <div className="text-white/50 pl-2 break-all">
                {'{"subject":"user","predicate":"loves","object":"Rust"}'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Step 2: Response */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1"
            >
              <div className="text-blue-400">→ 201 Created</div>
              <div className="text-white/50 pl-2">
                <span className="text-purple-300">fact_id:</span> a1b2c3d4...
                <br />
                <span className="text-purple-300">signed:</span> <span className="text-green-400">✓ Ed25519</span>
                <br />
                <span className="text-purple-300">stored:</span> MemPool + AOF
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Step 3: Miner kicks in */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1"
            >
              <div className="text-yellow-400">⛏️ Miner: Packing block...</div>
              <div className="text-white/50 pl-2">
                <span className="text-purple-300">height:</span> 43
                <br />
                <span className="text-purple-300">facts:</span> 7
                <br />
                <span className="text-purple-300">merkle:</span> f8e2a9...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Step 4: Block mined + broadcast */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1"
            >
              <div className="text-green-400">✅ Block #43 sealed & persisted</div>
              <div className="text-white/50 pl-2">
                <span className="text-purple-300">broadcast:</span> BlockAnnounce → 3 peers
                <br />
                <span className="text-purple-300">mempool:</span> cleared (0 pending)
              </div>
              <div className="pt-2 text-white/30 text-xs">
                Memory is now immutable. Tamper-proof forever.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/**
 * Pillar Card Component
 */
const PillarCard = ({ icon, title, description, detail }) => (
  <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-5 md:p-6 hover:border-purple-500/30 transition-all duration-300">
    <div className="text-3xl mb-3">{icon}</div>
    <h4 className="text-lg font-medium mb-2">{title}</h4>
    <p className="text-sm text-white/60 leading-relaxed mb-3">{description}</p>
    <div className="text-xs text-white/30 font-mono border-t border-white/5 pt-2">
      {detail}
    </div>
  </div>
);

/**
 * Cross-Device Sync Visualization
 */
const CrossDeviceSyncVisual = () => (
  <div className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 border border-white/10 rounded-xl p-6 md:p-10">
    <div className="text-center mb-8">
      <h3 className="text-2xl md:text-3xl font-light mb-3">
        Seamless Cross-Device Memory
      </h3>
      <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto">
        Disconnect your phone for a week. Reconnect. Every memory your desktop AI 
        created is instantly synced — encrypted, verified, and ready.
      </p>
    </div>
    
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
      {/* Phone */}
      <DeviceCard 
        icon="📱" 
        name="Phone" 
        status="Syncing..." 
        memories={142}
        statusColor="text-yellow-400"
      />
      
      {/* Sync arrows */}
      <div className="flex flex-col items-center gap-1">
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-purple-400"
        >
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
            <path d="M0 8h28M20 2l8 6-8 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>
        <div className="text-xs text-white/30">encrypted tunnel</div>
        <motion.div
          animate={{ x: [0, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          className="text-purple-400"
        >
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
            <path d="M32 8H4M12 2L4 8l8 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>
      </div>
      
      {/* Desktop */}
      <DeviceCard 
        icon="💻" 
        name="Desktop" 
        status="Up to date" 
        memories={142}
        statusColor="text-green-400"
      />
      
      {/* Sync arrows */}
      <div className="hidden md:flex flex-col items-center gap-1">
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          className="text-purple-400"
        >
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
            <path d="M0 8h28M20 2l8 6-8 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>
        <div className="text-xs text-white/30">encrypted tunnel</div>
        <motion.div
          animate={{ x: [0, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
          className="text-purple-400"
        >
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
            <path d="M32 8H4M12 2L4 8l8 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>
      </div>
      
      {/* NAS */}
      <DeviceCard 
        icon="🗄️" 
        name="Home NAS" 
        status="Full node" 
        memories={2847}
        statusColor="text-green-400"
      />
    </div>
  </div>
);

/**
 * Device Card
 */
const DeviceCard = ({ icon, name, status, memories, statusColor }) => (
  <div className="bg-black/50 border border-white/10 rounded-lg p-4 min-w-[120px] text-center">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-sm font-medium mb-1">{name}</div>
    <div className={`text-xs ${statusColor} mb-2`}>{status}</div>
    <div className="text-xs text-white/30">{memories} memories</div>
  </div>
);

/**
 * OpenClaw Integration Teaser
 */
const OpenClawTeaser = () => (
  <div className="bg-neutral-900/80 border border-white/10 rounded-xl overflow-hidden">
    <div className="grid md:grid-cols-2">
      
      {/* Left: Chat Preview */}
      <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🦞</span>
          <div>
            <div className="text-sm font-medium">OpenClaw AI</div>
            <div className="text-xs text-green-400">Connected to MemChain</div>
          </div>
        </div>
        
        {/* Chat bubbles */}
        <div className="space-y-3">
          <ChatBubble 
            sender="you" 
            text="I'm working on a Rust project using Tokio for async" 
          />
          <ChatBubble 
            sender="ai" 
            text="I remember you prefer Rust! Based on your previous conversations, you've been exploring distributed systems. Want me to suggest Tokio patterns for your use case?" 
          />
          <div className="flex items-center gap-2 text-xs text-purple-400/60">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>3 memories recalled from Block #41</span>
          </div>
        </div>
      </div>
      
      {/* Right: Integration Info */}
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-light mb-3">
          AI That Truly Knows You
        </h3>
        <p className="text-sm text-white/60 leading-relaxed mb-6">
          OpenClaw connects to your personal MemChain through the AeroNyx VPN. 
          Your AI assistant builds genuine understanding over time — and that 
          knowledge belongs to you, not a corporation.
        </p>
        
        <div className="space-y-3 mb-6">
          <IntegrationPoint 
            text="Wallet-derived identity — backup your wallet, backup your memories" 
          />
          <IntegrationPoint 
            text="VPN tunnel carries memories invisibly alongside normal traffic" 
          />
          <IntegrationPoint 
            text="Switch AI models anytime — your memory chain stays with you" 
          />
          <IntegrationPoint 
            text="Local-first: works offline, syncs when connected" 
          />
        </div>
        
        <a
          href="https://docs.aeronyx.network"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 rounded-lg transition-all"
        >
          <span className="text-sm font-medium text-purple-200">
            🦞 Learn More About OpenClaw
          </span>
        </a>
      </div>
    </div>
  </div>
);

/**
 * Chat Bubble Component
 */
const ChatBubble = ({ sender, text }) => (
  <div className={`flex ${sender === 'you' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
      sender === 'you' 
        ? 'bg-blue-500/20 border border-blue-500/20 text-white/80' 
        : 'bg-white/5 border border-white/10 text-white/70'
    }`}>
      {text}
    </div>
  </div>
);

/**
 * Integration Point
 */
const IntegrationPoint = ({ text }) => (
  <div className="flex items-start gap-2">
    <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-sm text-white/60">{text}</span>
  </div>
);

export default MemChainShowcase;
