import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const CognitiveInfrastructure = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [dataFlow, setDataFlow] = useState(false);
  
  const layers = [
    {
      id: 'consciousness',
      name: 'Consciousness Layer',
      subtitle: 'I think, therefore I optimize',
      color: 'from-cyan-400 to-blue-500',
      icon: '🧠',
      description: 'AI orchestration and decision-making layer that coordinates all network activities',
      capabilities: ['Pattern Recognition', 'Predictive Analytics', 'Autonomous Decision Making', 'Self-Learning']
    },
    {
      id: 'language',
      name: 'Language Layer',
      subtitle: 'Universal protocol for thought',
      color: 'from-purple-400 to-pink-500',
      icon: '💬',
      description: 'MCP enables seamless communication between AI and infrastructure components',
      capabilities: ['Natural Language Processing', 'Protocol Translation', 'Intent Recognition', 'Tool Orchestration']
    },
    {
      id: 'trust',
      name: 'Trust Layer',
      subtitle: 'Proof without revelation',
      color: 'from-green-400 to-emerald-500',
      icon: '🔐',
      description: 'Zero-Knowledge Proofs ensure every action is verifiable without exposing sensitive data',
      capabilities: ['Hardware Verification', 'Computation Attestation', 'Privacy Preservation', 'Cryptographic Proofs']
    },
    {
      id: 'action',
      name: 'Action Layer',
      subtitle: 'Thought becomes reality',
      color: 'from-orange-400 to-red-500',
      icon: '⚡',
      description: 'Distributed compute resources execute AI decisions across the global network',
      capabilities: ['Resource Allocation', 'Task Execution', 'Load Balancing', 'Performance Optimization']
    },
    {
      id: 'nervous',
      name: 'Nervous System',
      subtitle: 'Signals flow like synapses',
      color: 'from-indigo-400 to-violet-500',
      icon: '🔗',
      description: 'High-speed network infrastructure connects all components with minimal latency',
      capabilities: ['Data Routing', 'Signal Transmission', 'Network Topology', 'Fault Tolerance']
    }
  ];
  
  return (
    <section className="py-20 relative overflow-hidden bg-neutral-900">
      <Container>
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The Cognitive Stack
          </motion.h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Five integrated layers that transform dumb infrastructure into conscious, 
            self-managing systems
          </p>
        </div>
        
        {/* Main visualization */}
        <div className="max-w-5xl mx-auto">
          {/* Stack visualization */}
          <div className="relative mb-8">
            {/* Background glow effect */}
            {activeLayer && (
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${
                  layers.find(l => l.id === activeLayer)?.color
                } opacity-10 blur-3xl`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
              />
            )}
            
            {/* Stack layers */}
            <div className="space-y-2">
              {layers.map((layer, index) => (
                <LayerComponent
                  key={layer.id}
                  layer={layer}
                  index={index}
                  totalLayers={layers.length}
                  isActive={activeLayer === layer.id}
                  onHover={() => setActiveLayer(layer.id)}
                  onLeave={() => setActiveLayer(null)}
                  dataFlow={dataFlow}
                />
              ))}
            </div>
            
            {/* Data flow visualization */}
            {dataFlow && <DataFlowVisualization layers={layers} />}
          </div>
          
          {/* Control buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setDataFlow(!dataFlow)}
              className={`px-6 py-3 rounded-lg transition-all ${
                dataFlow 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              {dataFlow ? '⏸️ Pause' : '▶️ Show'} Data Flow
            </button>
            
            <button
              onClick={() => setActiveLayer(null)}
              className="px-6 py-3 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
            >
              Reset View
            </button>
          </div>
          
          {/* Layer details */}
          {activeLayer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{layers.find(l => l.id === activeLayer)?.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    {layers.find(l => l.id === activeLayer)?.name}
                  </h3>
                  <p className="text-neutral-300 mb-4">
                    {layers.find(l => l.id === activeLayer)?.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {layers.find(l => l.id === activeLayer)?.capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className={`px-3 py-2 rounded-lg bg-gradient-to-r ${
                          layers.find(l => l.id === activeLayer)?.color
                        } bg-opacity-20 text-sm text-center`}
                      >
                        {cap}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Emergent properties */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Emergent Intelligence Properties</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Self-Awareness', icon: '👁️', description: 'Knows its own state' },
              { title: 'Prediction', icon: '🔮', description: 'Anticipates future needs' },
              { title: 'Adaptation', icon: '🧬', description: 'Evolves without updates' },
              { title: 'Intentionality', icon: '🎯', description: 'Pursues goals autonomously' }
            ].map((property, i) => (
              <motion.div
                key={i}
                className="bg-neutral-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.3)' }}
              >
                <div className="text-3xl mb-3">{property.icon}</div>
                <h4 className="font-bold mb-2">{property.title}</h4>
                <p className="text-sm text-neutral-400">{property.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

// Individual layer component
const LayerComponent = ({ layer, index, totalLayers, isActive, onHover, onLeave, dataFlow }) => {
  const layerRef = useRef(null);
  
  return (
    <motion.div
      ref={layerRef}
      className={`relative group cursor-pointer transition-all duration-300 ${
        isActive ? 'z-20' : 'z-10'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div
        className={`
          relative p-6 rounded-xl border transition-all duration-300
          ${isActive 
            ? 'bg-gradient-to-r ' + layer.color + ' bg-opacity-20 border-white/30 scale-105 shadow-2xl' 
            : 'bg-neutral-800/50 border-white/10 hover:border-white/20'
          }
        `}
      >
        {/* Layer content */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">{layer.icon}</div>
            <div>
              <h3 className="text-xl font-bold">{layer.name}</h3>
              <p className="text-sm text-neutral-400">{layer.subtitle}</p>
            </div>
          </div>
          
          {/* Activity indicator */}
          {dataFlow && (
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${layer.color}`}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Connection lines */}
        {index < totalLayers - 1 && (
          <div className="absolute left-1/2 -bottom-2 w-px h-4 bg-gradient-to-b from-white/20 to-transparent transform -translate-x-1/2" />
        )}
      </div>
    </motion.div>
  );
};

// Data flow visualization overlay
const DataFlowVisualization = ({ layers }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Vertical data flows */}
      {layers.map((layer, index) => (
        <motion.div
          key={`flow-${index}`}
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ top: `${(index / layers.length) * 100}%` }}
        >
          <motion.div
            className={`w-1 h-20 bg-gradient-to-b ${layer.color}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: [0, 0.6, 0], y: 20 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3
            }}
          />
        </motion.div>
      ))}
      
      {/* Horizontal connections */}
      <svg className="absolute inset-0 w-full h-full">
        {layers.map((layer, i) => {
          if (i >= layers.length - 1) return null;
          
          return (
            <motion.path
              key={`connection-${i}`}
              d={`M 100 ${(i / layers.length) * 400 + 50} Q 250 ${(i / layers.length) * 400 + 100} 400 ${((i + 1) / layers.length) * 400 + 50}`}
              fill="none"
              stroke="url(#flowGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
          );
        })}
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CognitiveInfrastructure;
