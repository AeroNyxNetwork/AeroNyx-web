import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Container from '../ui/Container';

// Sophisticated geometric visualization
const GeometricIntelligence = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Geometric shapes */}
      <div className="absolute inset-0">
        {/* Central hexagon */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64"
          style={{
            x: useTransform(mouseX, [0, 1], [-20, 20]),
            y: useTransform(mouseY, [0, 1], [-20, 20]),
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 90,25 90,75 50,95 10,75 10,25"
              fill="none"
              stroke="rgba(119, 98, 243, 0.3)"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
        
        {/* Orbiting points */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2"
            animate={{
              x: [0, Math.cos(i * Math.PI / 3) * 150, 0],
              y: [0, Math.sin(i * Math.PI / 3) * 150, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            <div className="w-full h-full bg-white/20 rounded-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Clean data visualization
const IntelligenceMetrics = () => {
  const [metrics, setMetrics] = useState({
    nodes: 15743,
    throughput: 1.2,
    efficiency: 97.3,
    latency: 12
  });
  
  return (
    <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
      {[
        { label: 'Active Nodes', value: metrics.nodes.toLocaleString(), suffix: '' },
        { label: 'Throughput', value: metrics.throughput, suffix: 'M ops/s' },
        { label: 'Efficiency', value: metrics.efficiency, suffix: '%' },
        { label: 'Latency', value: metrics.latency, suffix: 'ms' }
      ].map((metric, i) => (
        <motion.div
          key={metric.label}
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + i * 0.1 }}
        >
          <div className="text-2xl font-light text-white/60">
            {metric.value}<span className="text-sm ml-1">{metric.suffix}</span>
          </div>
          <div className="text-xs uppercase tracking-wider text-white/40 mt-1">
            {metric.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const SophisticatedAILHero = () => {
  const [showDemo, setShowDemo] = useState(false);
  
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Sophisticated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
      
      {/* Geometric visualization */}
      <GeometricIntelligence />
      
      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Tagline */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block">
              <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                Autonomous Intelligence Layer
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </motion.div>
          
          {/* Main headline */}
          <motion.h1
            className="text-5xl md:text-7xl font-extralight mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Infrastructure that
            <br />
            <span className="font-normal">thinks for itself</span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-white/60 font-light mb-12 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The first network where intelligence isn't added—it's inherent. 
            Where optimization isn't scheduled—it's continuous. 
            Where management isn't required—it's autonomous.
          </motion.p>
          
          {/* Metrics */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <IntelligenceMetrics />
          </motion.div>
          
          {/* Actions */}
          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={() => setShowDemo(true)}
              className="group relative px-8 py-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white transition-transform group-hover:scale-x-100 scale-x-0 origin-left" />
              <span className="relative z-10 text-sm uppercase tracking-wider transition-colors group-hover:text-black">
                View Architecture
              </span>
            </button>
            
            <a
              href="https://docs.aeronyx.network"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-sm uppercase tracking-wider text-white/40 hover:text-white transition-colors"
            >
              Documentation
            </a>
          </motion.div>
        </div>
      </Container>
      
      {/* Architecture modal */}
      {showDemo && (
        <ArchitectureModal onClose={() => setShowDemo(false)} />
      )}
    </section>
  );
};

// Clean architecture visualization
const ArchitectureModal = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-neutral-900 border border-white/10 rounded-lg p-8 max-w-4xl w-full"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-light mb-2">System Architecture</h2>
            <p className="text-white/40">Autonomous Intelligence Layer</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Architecture diagram */}
        <div className="space-y-4">
          {[
            { layer: 'Intelligence', desc: 'Autonomous decision engine' },
            { layer: 'Protocol', desc: 'Model Context Protocol (MCP)' },
            { layer: 'Trust', desc: 'Zero-Knowledge verification' },
            { layer: 'Compute', desc: 'Distributed execution layer' },
            { layer: 'Network', desc: 'Global infrastructure mesh' }
          ].map((item, i) => (
            <div key={i} className="border border-white/10 p-4 hover:border-white/20 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{item.layer}</div>
                  <div className="text-sm text-white/40">{item.desc}</div>
                </div>
                <div className="text-xs text-white/20">Layer {i + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SophisticatedAILHero;
