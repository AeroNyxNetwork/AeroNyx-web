/**
 * ============================================
 * MemoryChainHeroVisual.js - Animated Hero Visual
 * ============================================
 * 
 * Creation Reason: Provides the "wow factor" visual anchor for the
 * Hero section. An animated memory chain with floating fact nodes,
 * connection lines, and a pulsing central block counter.
 * 
 * Design: Dark, minimal, purple-accented — matches the brand.
 * Performance: Pure CSS + framer-motion, no canvas/WebGL overhead.
 * 
 * Last Modified: v1.0 - Initial creation
 * ============================================
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MemoryChainHeroVisual = () => {
  const [blockCount, setBlockCount] = useState(1847);
  const [factCount, setFactCount] = useState(23419);
  
  // Simulate live counter incrementing
  useEffect(() => {
    const interval = setInterval(() => {
      setFactCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    
    const blockInterval = setInterval(() => {
      setBlockCount(prev => prev + 1);
    }, 12000);
    
    return () => {
      clearInterval(interval);
      clearInterval(blockInterval);
    };
  }, []);
  
  // Floating fact nodes data
  const nodes = [
    { x: 15, y: 20, label: "user → prefers → dark_mode", delay: 0 },
    { x: 75, y: 15, label: "agent → learned → Rust", delay: 0.5 },
    { x: 85, y: 55, label: "user → speaks → 中文", delay: 1.0 },
    { x: 20, y: 70, label: "project → uses → Tokio", delay: 1.5 },
    { x: 55, y: 80, label: "memory → synced → ✓", delay: 2.0 },
    { x: 40, y: 35, label: "agent → recalls → context", delay: 0.3 },
  ];
  
  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
      
      {/* Connection lines (SVG layer) */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(168,85,247,0.15)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.05)" />
          </linearGradient>
        </defs>
        
        {/* Lines connecting nodes to center */}
        {nodes.map((node, i) => (
          <motion.line
            key={i}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2="50%"
            y2="50%"
            stroke="url(#lineGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: node.delay + 0.5 }}
          />
        ))}
        
        {/* Animated data pulse along lines */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="2"
            fill="rgba(168,85,247,0.8)"
            initial={{ opacity: 0 }}
            animate={{
              cx: [`${node.x}%`, "50%"],
              cy: [`${node.y}%`, "50%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: node.delay + 2,
              repeat: Infinity,
              repeatDelay: 4 + i * 0.7,
            }}
          />
        ))}
      </svg>
      
      {/* Floating fact nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: node.delay },
            scale: { duration: 0.5, delay: node.delay },
            y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            {/* Node dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400/60 ring-4 ring-purple-400/10" />
            
            {/* Label (hidden on mobile, shown on md+) */}
            <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap">
              <span className="text-[10px] font-mono text-white/25 bg-black/40 px-1.5 py-0.5 rounded">
                {node.label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Central Block Counter — The Visual Anchor */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {/* Outer ring pulse */}
        <motion.div
          className="absolute inset-0 rounded-full border border-purple-500/20"
          animate={{ scale: [1, 1.8, 1.8], opacity: [0.5, 0, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ width: 140, height: 140, marginLeft: -70, marginTop: -70, left: '50%', top: '50%' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-purple-500/15"
          animate={{ scale: [1, 2.2, 2.2], opacity: [0.3, 0, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          style={{ width: 140, height: 140, marginLeft: -70, marginTop: -70, left: '50%', top: '50%' }}
        />
        
        {/* Main circle */}
        <motion.div
          className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full bg-gradient-to-br from-purple-500/20 to-purple-900/30 border border-purple-500/30 backdrop-blur-sm flex flex-col items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        >
          <div className="text-[10px] uppercase tracking-widest text-purple-300/60 mb-1">
            Blocks
          </div>
          <motion.div
            className="text-2xl md:text-3xl font-light text-white tabular-nums"
            key={blockCount}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {blockCount.toLocaleString()}
          </motion.div>
          <div className="text-[10px] text-white/30 mt-1 tabular-nums">
            {factCount.toLocaleString()} facts
          </div>
        </motion.div>
      </div>
      
      {/* Orbiting blocks (3 small block icons) */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute left-1/2 top-1/2"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 20 + i * 5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ 
            width: 0, height: 0,
          }}
        >
          <motion.div
            className="absolute"
            style={{
              left: `${80 + i * 30}px`,
              top: `-6px`,
            }}
          >
            <div className="w-3 h-3 rounded-sm bg-purple-500/30 border border-purple-500/20" />
          </motion.div>
        </motion.div>
      ))}
      
    </div>
  );
};

export default MemoryChainHeroVisual;
