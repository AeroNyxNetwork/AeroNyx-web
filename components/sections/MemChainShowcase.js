/**
 * ============================================
 * MemChainShowcase.js - v2.0 Visual Upgrade
 * ============================================
 * 
 * Modification Reason: v2.0 - Replaced static terminal demo with
 * real typewriter effect (character-by-character, blinking cursor,
 * realistic inter-line delays). Added staggered pillar entrance.
 * 
 * Last Modified: v2.0 - Typewriter terminal + stagger animations
 * ============================================
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';

const MemChainShowcase = () => {
  return (
    <section id="memchain" className="py-16 md:py-28 bg-black relative overflow-hidden">
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <MemoryChainVisual />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TypewriterTerminal />
            </motion.div>
          </div>
          
          {/* Three Pillars — Staggered Entrance */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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
              {[
                {
                  icon: "🔐",
                  title: "Signed",
                  description: "Every memory is Ed25519 signed by your device. Nobody can forge your AI's thoughts.",
                  detail: "SHA-256 content hash + Ed25519 signature = tamper-proof"
                },
                {
                  icon: "⛓️",
                  title: "Chained",
                  description: "Memories are packed into blocks with Merkle roots. One changed bit breaks the entire chain.",
                  detail: "Block height + prev_hash + merkle_root = immutable history"
                },
                {
                  icon: "👻",
                  title: "Invisible",
                  description: "Memory sync hides inside normal VPN traffic. Network observers see nothing unusual.",
                  detail: "0xAE multiplexing inside ChaCha20-Poly1305 tunnel"
                }
              ].map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <PillarCard {...pillar} />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Cross-Device Sync */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <CrossDeviceSyncVisual />
          </motion.div>
          
          {/* OpenClaw Teaser */}
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

// ============================================
// Typewriter Terminal — Real character-by-character typing
// ============================================

const TypewriterTerminal = () => {
  const [lines, setLines] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [started, setStarted] = useState(false);
  
  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, []);
  
  const script = [
    { text: '$ curl -X POST /api/fact \\', color: 'text-green-400', delay: 30 },
    { text: '  -d \'{"subject":"user","predicate":"loves","object":"Rust"}\'', color: 'text-white/50', delay: 20 },
    { text: '', color: '', delay: 0, pause: 600 },
    { text: '→ 201 Created', color: 'text-blue-400', delay: 40 },
    { text: '  fact_id: a1b2c3d4e5f6...', color: 'text-purple-300', delay: 25 },
    { text: '  signed:  ✓ Ed25519', color: 'text-green-400', delay: 25 },
    { text: '  stored:  MemPool + AOF', color: 'text-white/50', delay: 25 },
    { text: '', color: '', delay: 0, pause: 1000 },
    { text: '⛏️  Miner: Packing block...', color: 'text-yellow-400', delay: 35 },
    { text: '  height:  43', color: 'text-purple-300', delay: 30 },
    { text: '  facts:   7', color: 'text-purple-300', delay: 30 },
    { text: '  merkle:  f8e2a9b1c3d5...', color: 'text-purple-300', delay: 20 },
    { text: '', color: '', delay: 0, pause: 800 },
    { text: '✅ Block #43 sealed & persisted', color: 'text-green-400', delay: 30 },
    { text: '  broadcast: BlockAnnounce → 3 peers', color: 'text-white/50', delay: 20 },
    { text: '  mempool:   cleared (0 pending)', color: 'text-white/50', delay: 20 },
    { text: '', color: '', delay: 0, pause: 500 },
    { text: '  Memory is now immutable. Tamper-proof forever.', color: 'text-white/25', delay: 25 },
  ];
  
  const typeLines = useCallback(async () => {
    for (let i = 0; i < script.length; i++) {
      const line = script[i];
      
      if (line.pause) {
        await new Promise(r => setTimeout(r, line.pause));
        setLines(prev => [...prev, { text: '', color: '' }]);
        continue;
      }
      
      if (!line.text) {
        setLines(prev => [...prev, { text: '', color: '' }]);
        continue;
      }
      
      // Type character by character
      let current = '';
      for (let c = 0; c < line.text.length; c++) {
        current += line.text[c];
        const snapshot = current;
        const color = line.color;
        
        setLines(prev => {
          const newLines = [...prev];
          // If last line is being typed, update it; otherwise add new
          if (newLines.length > 0 && newLines[newLines.length - 1]._typing) {
            newLines[newLines.length - 1] = { text: snapshot, color, _typing: true };
          } else {
            newLines.push({ text: snapshot, color, _typing: true });
          }
          return newLines;
        });
        
        await new Promise(r => setTimeout(r, line.delay));
      }
      
      // Finalize line (remove typing flag)
      setLines(prev => {
        const newLines = [...prev];
        if (newLines.length > 0) {
          newLines[newLines.length - 1] = { 
            text: line.text, 
            color: line.color, 
            _typing: false 
          };
        }
        return newLines;
      });
      
      // Small pause between lines
      await new Promise(r => setTimeout(r, 150));
    }
  }, []);
  
  useEffect(() => {
    if (started) {
      typeLines();
    }
  }, [started, typeLines]);
  
  return (
    <motion.div
      onViewportEnter={() => { if (!started) setStarted(true); }}
      viewport={{ once: true }}
      className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden"
    >
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
      <div className="p-4 md:p-6 font-mono text-xs sm:text-sm min-h-[380px] max-h-[420px] overflow-y-auto">
        {lines.map((line, i) => (
          <div key={i} className={`${line.color} leading-relaxed whitespace-pre-wrap break-all`}>
            {line.text || '\u00A0'}
            {/* Show cursor on the last typing line */}
            {line._typing && (
              <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
                ▌
              </span>
            )}
          </div>
        ))}
        
        {/* Resting cursor after all lines */}
        {lines.length > 0 && !lines[lines.length - 1]?._typing && started && lines.length >= script.length && (
          <div className="text-green-400 mt-2">
            $ <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>▌</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================
// Memory Chain Visualization (unchanged from v1)
// ============================================

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

// ============================================
// Supporting Components
// ============================================

const PillarCard = ({ icon, title, description, detail }) => (
  <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-5 md:p-6 hover:border-purple-500/30 transition-all duration-300 group">
    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h4 className="text-lg font-medium mb-2">{title}</h4>
    <p className="text-sm text-white/60 leading-relaxed mb-3">{description}</p>
    <div className="text-xs text-white/30 font-mono border-t border-white/5 pt-2">
      {detail}
    </div>
  </div>
);

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
      <DeviceCard icon="📱" name="Phone" status="Syncing..." memories={142} statusColor="text-yellow-400" />
      <SyncArrows />
      <DeviceCard icon="💻" name="Desktop" status="Up to date" memories={142} statusColor="text-green-400" />
      <div className="hidden md:block"><SyncArrows /></div>
      <div className="hidden md:block">
        <DeviceCard icon="🗄️" name="Home NAS" status="Full node" memories={2847} statusColor="text-green-400" />
      </div>
    </div>
  </div>
);

const SyncArrows = () => (
  <div className="flex flex-col items-center gap-1">
    <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-purple-400">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
        <path d="M0 8h28M20 2l8 6-8 6" stroke="currentColor" strokeWidth="2" />
      </svg>
    </motion.div>
    <div className="text-xs text-white/30">encrypted tunnel</div>
    <motion.div animate={{ x: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} className="text-purple-400">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
        <path d="M32 8H4M12 2L4 8l8 6" stroke="currentColor" strokeWidth="2" />
      </svg>
    </motion.div>
  </div>
);

const DeviceCard = ({ icon, name, status, memories, statusColor }) => (
  <div className="bg-black/50 border border-white/10 rounded-lg p-4 min-w-[120px] text-center">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-sm font-medium mb-1">{name}</div>
    <div className={`text-xs ${statusColor} mb-2`}>{status}</div>
    <div className="text-xs text-white/30">{memories} memories</div>
  </div>
);

const OpenClawTeaser = () => (
  <div className="bg-neutral-900/80 border border-white/10 rounded-xl overflow-hidden">
    <div className="grid md:grid-cols-2">
      <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🦞</span>
          <div>
            <div className="text-sm font-medium">OpenClaw AI</div>
            <div className="text-xs text-green-400">Connected to MemChain</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <ChatBubble sender="you" text="I'm working on a Rust project using Tokio for async" />
          <ChatBubble sender="ai" text="I remember you prefer Rust! Based on your previous conversations, you've been exploring distributed systems. Want me to suggest Tokio patterns for your use case?" />
          <div className="flex items-center gap-2 text-xs text-purple-400/60">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>3 memories recalled from Block #41</span>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-light mb-3">AI That Truly Knows You</h3>
        <p className="text-sm text-white/60 leading-relaxed mb-6">
          OpenClaw connects to your personal MemChain through the AeroNyx VPN. 
          Your AI assistant builds genuine understanding over time — and that 
          knowledge belongs to you, not a corporation.
        </p>
        
        <div className="space-y-3 mb-6">
          <IntegrationPoint text="Wallet-derived identity — backup your wallet, backup your memories" />
          <IntegrationPoint text="VPN tunnel carries memories invisibly alongside normal traffic" />
          <IntegrationPoint text="Switch AI models anytime — your memory chain stays with you" />
          <IntegrationPoint text="Local-first: works offline, syncs when connected" />
        </div>
        
        <a href="https://docs.aeronyx.network" target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 rounded-lg transition-all">
          <span className="text-sm font-medium text-purple-200">🦞 Learn More About OpenClaw</span>
        </a>
      </div>
    </div>
  </div>
);

const ChatBubble = ({ sender, text }) => (
  <div className={`flex ${sender === 'you' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
      sender === 'you' ? 'bg-blue-500/20 border border-blue-500/20 text-white/80' : 'bg-white/5 border border-white/10 text-white/70'
    }`}>{text}</div>
  </div>
);

const IntegrationPoint = ({ text }) => (
  <div className="flex items-start gap-2">
    <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-sm text-white/60">{text}</span>
  </div>
);

export default MemChainShowcase;
