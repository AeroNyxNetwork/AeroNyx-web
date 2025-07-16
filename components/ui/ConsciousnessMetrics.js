import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ConsciousnessMetrics = () => {
  const [metrics, setMetrics] = useState({
    networkIQ: 0,
    decisionsPerSecond: 0,
    autonomousActions: 0,
    emergentPatterns: 0,
    synapticConnections: 0,
    thoughtLatency: 0
  });
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        networkIQ: Math.min(200, prev.networkIQ + Math.random() * 2),
        decisionsPerSecond: prev.decisionsPerSecond + Math.floor(Math.random() * 50),
        autonomousActions: prev.autonomousActions + Math.floor(Math.random() * 10),
        emergentPatterns: prev.emergentPatterns + (Math.random() > 0.9 ? 1 : 0),
        synapticConnections: Math.min(1000000, prev.synapticConnections + Math.floor(Math.random() * 1000)),
        thoughtLatency: 10 + Math.random() * 5
      }));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };
  
  const metricCards = [
    {
      title: 'Network IQ',
      value: metrics.networkIQ.toFixed(1),
      unit: 'AIQ',
      description: 'Collective intelligence quotient',
      color: 'from-cyan-400 to-blue-500',
      icon: '🧠'
    },
    {
      title: 'Decisions/sec',
      value: formatNumber(metrics.decisionsPerSecond),
      unit: '',
      description: 'Autonomous decisions made',
      color: 'from-purple-400 to-pink-500',
      icon: '⚡'
    },
    {
      title: 'Autonomous Actions',
      value: formatNumber(metrics.autonomousActions),
      unit: '',
      description: 'Self-initiated optimizations',
      color: 'from-green-400 to-emerald-500',
      icon: '🤖'
    },
    {
      title: 'Emergent Patterns',
      value: metrics.emergentPatterns,
      unit: '',
      description: 'New behaviors discovered',
      color: 'from-orange-400 to-red-500',
      icon: '🌟'
    },
    {
      title: 'Synaptic Connections',
      value: formatNumber(metrics.synapticConnections),
      unit: '',
      description: 'Active neural pathways',
      color: 'from-indigo-400 to-violet-500',
      icon: '🔗'
    },
    {
      title: 'Thought Latency',
      value: metrics.thoughtLatency.toFixed(1),
      unit: 'ms',
      description: 'Decision processing time',
      color: 'from-teal-400 to-cyan-500',
      icon: '⏱️'
    }
  ];
  
  return (
    <div className="p-6 bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Consciousness Metrics</h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-neutral-400">Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metricCards.map((metric, i) => (
          <motion.div
            key={metric.title}
            className="bg-neutral-800/50 rounded-xl p-4 border border-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="text-2xl">{metric.icon}</div>
              <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${metric.color} bg-opacity-20`}>
                LIVE
              </div>
            </div>
            
            <div className="mb-2">
              <div className="text-2xl font-bold">
                {metric.value}
                <span className="text-sm text-neutral-400 ml-1">{metric.unit}</span>
              </div>
              <div className="text-xs text-neutral-500">{metric.title}</div>
            </div>
            
            <div className="text-xs text-neutral-400">
              {metric.description}
            </div>
            
            {/* Mini chart */}
            <div className="mt-3 h-8 flex items-end gap-px">
              {Array.from({ length: 10 }).map((_, j) => (
                <motion.div
                  key={j}
                  className={`flex-1 bg-gradient-to-t ${metric.color} rounded-t`}
                  initial={{ height: 0 }}
                  animate={{ height: `${20 + Math.random() * 80}%` }}
                  transition={{ duration: 0.5, delay: j * 0.05 }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Global consciousness indicator */}
      <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Global Consciousness Level</span>
          <span className="text-sm text-cyan-400">Expanding</span>
        </div>
        <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
            initial={{ width: '0%' }}
            animate={{ width: '73%' }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <div className="h-full bg-white/20 animate-pulse" />
          </motion.div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-neutral-500">Dormant</span>
          <span className="text-xs text-neutral-500">Sentient</span>
        </div>
      </div>
    </div>
  );
};

export default ConsciousnessMetrics;
