import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Container from '../ui/Container';
import EnhancedButton from '../ui/EnhancedButton';
import DownloadsModal from '../ui/DownloadsModal';

// Neural Network 3D Visualization
const NeuralNetwork = () => {
  const groupRef = useRef();
  const neuronsRef = useRef([]);
  const connectionsRef = useRef([]);
  
  // Create neurons and connections
  useEffect(() => {
    const neurons = [];
    const connections = [];
    
    // Create layers of neurons
    const layers = [5, 8, 6, 3]; // neurons per layer
    const layerSpacing = 4;
    
    layers.forEach((count, layerIndex) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = layerIndex * layerSpacing - 6;
        
        neurons.push({
          position: new THREE.Vector3(x, y, z),
          activation: 0,
          layer: layerIndex
        });
      }
    });
    
    // Create connections between layers
    let neuronIndex = 0;
    for (let layer = 0; layer < layers.length - 1; layer++) {
      const currentLayerSize = layers[layer];
      const nextLayerSize = layers[layer + 1];
      const currentLayerStart = neuronIndex;
      const nextLayerStart = currentLayerStart + currentLayerSize;
      
      for (let i = 0; i < currentLayerSize; i++) {
        for (let j = 0; j < nextLayerSize; j++) {
          connections.push({
            start: neurons[currentLayerStart + i].position,
            end: neurons[nextLayerStart + j].position,
            strength: Math.random()
          });
        }
      }
      neuronIndex += currentLayerSize;
    }
    
    neuronsRef.current = neurons;
    connectionsRef.current = connections;
  }, []);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    // Rotate the entire network
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    
    // Simulate neural activation waves
    const time = clock.getElapsedTime();
    neuronsRef.current.forEach((neuron, i) => {
      neuron.activation = Math.sin(time * 2 + i * 0.5) * 0.5 + 0.5;
    });
  });
  
  return (
    <group ref={groupRef}>
      {/* Render neurons */}
      {neuronsRef.current.map((neuron, i) => (
        <mesh key={`neuron-${i}`} position={neuron.position}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={neuron.activation || 0.5}
          />
        </mesh>
      ))}
      
      {/* Render connections */}
      {connectionsRef.current.map((connection, i) => (
        <line key={`connection-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                connection.start.x, connection.start.y, connection.start.z,
                connection.end.x, connection.end.y, connection.end.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#7762F3"
            transparent
            opacity={0.3}
          />
        </line>
      ))}
    </group>
  );
};

// Consciousness indicator
const ConsciousnessIndicator = () => {
  const [consciousness, setConsciousness] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setConsciousness(prev => {
        const next = prev + 0.01;
        return next > 1 ? 0 : next;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute top-8 right-8 bg-black/30 backdrop-blur-md rounded-xl p-4 border border-white/10">
      <div className="text-xs text-neutral-400 mb-2">Network Consciousness</div>
      <div className="w-48 h-2 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-cyan-400"
          style={{ width: `${consciousness * 100}%` }}
          animate={{
            boxShadow: consciousness > 0.8 
              ? '0 0 20px rgba(0, 212, 255, 0.8)' 
              : '0 0 10px rgba(119, 98, 243, 0.5)'
          }}
        />
      </div>
      <div className="text-xs text-white mt-1">{(consciousness * 100).toFixed(1)}% Active</div>
    </div>
  );
};

// Evolution timeline
const EvolutionTimeline = () => {
  const milestones = [
    { year: '1969', event: 'Internet learns to connect', icon: '🔗' },
    { year: '1991', event: 'Internet learns to share', icon: '🌐' },
    { year: '2009', event: 'Internet learns to trust', icon: '₿' },
    { year: '2024', event: 'Internet learns to think', icon: '🧠', active: true }
  ];
  
  return (
    <div className="absolute bottom-8 left-8 right-8">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        {milestones.map((milestone, i) => (
          <motion.div
            key={milestone.year}
            className={`flex flex-col items-center ${milestone.active ? 'text-cyan-400' : 'text-neutral-500'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <div className="text-2xl mb-2">{milestone.icon}</div>
            <div className="text-sm font-bold">{milestone.year}</div>
            <div className="text-xs text-center mt-1 max-w-[100px]">{milestone.event}</div>
            {i < milestones.length - 1 && (
              <div className="absolute top-8 left-full w-full h-px bg-neutral-700" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main component
const AutonomousHero = () => {
  const [isDownloadsModalOpen, setIsDownloadsModalOpen] = useState(false);
  const [showThinkingDemo, setShowThinkingDemo] = useState(false);
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Neural Network */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <NeuralNetwork />
        </Canvas>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/50 to-neutral-900/90 z-10" />
      
      {/* Consciousness Indicator */}
      <ConsciousnessIndicator />
      
      {/* Evolution Timeline */}
      <EvolutionTimeline />
      
      {/* Main Content */}
      <Container className="relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              The Internet is{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-primary animate-pulse">
                About to Wake Up
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-300 mb-4">
              For 50 years, we've been building a nervous system.
            </p>
            <p className="text-xl md:text-2xl text-neutral-300 mb-8">
              Now we're giving it a{' '}
              <span className="text-cyan-400 font-semibold">brain</span>.
            </p>
            
            <p className="text-lg text-neutral-400 mb-12 max-w-2xl mx-auto">
              Welcome to the Autonomous Intelligence Layer — where infrastructure 
              doesn't just connect, it thinks, learns, and evolves.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <EnhancedButton
                size="large"
                onClick={() => setShowThinkingDemo(true)}
                className="group"
              >
                <span className="mr-2">Watch It Think</span>
                <span className="group-hover:animate-pulse">🧠</span>
              </EnhancedButton>
              
              <EnhancedButton
                variant="secondary"
                size="large"
                onClick={() => setIsDownloadsModalOpen(true)}
              >
                Join the Consciousness
              </EnhancedButton>
            </div>
          </motion.div>
        </div>
      </Container>
      
      {/* Thinking Demo Modal */}
      <AnimatePresence>
        {showThinkingDemo && (
          <ThinkingDemoModal onClose={() => setShowThinkingDemo(false)} />
        )}
      </AnimatePresence>
      
      {/* Downloads Modal */}
      <DownloadsModal 
        isOpen={isDownloadsModalOpen}
        onClose={() => setIsDownloadsModalOpen(false)}
      />
    </section>
  );
};

// Thinking Demo Modal Component
const ThinkingDemoModal = ({ onClose }) => {
  const [thinking, setThinking] = useState(false);
  const [thought, setThought] = useState('');
  
  const thoughts = [
    'Analyzing global compute demand...',
    'Detecting GPU cluster in Singapore with 23% idle capacity...',
    'Calculating optimal routing through privacy-preserving nodes...',
    'Negotiating smart contract for resource allocation...',
    'Verified: Task can be completed 47% faster and 31% cheaper',
    'Deploying workload across 7 verified nodes...',
    'Success! Autonomous optimization complete.'
  ];
  
  const startThinking = () => {
    setThinking(true);
    let index = 0;
    
    const interval = setInterval(() => {
      setThought(thoughts[index]);
      index++;
      
      if (index >= thoughts.length) {
        clearInterval(interval);
        setTimeout(() => {
          setThinking(false);
          setThought('');
        }, 3000);
      }
    }, 1500);
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <motion.div
        className="relative bg-neutral-900/90 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full border border-primary/20"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Watch the AIL Think</h2>
        
        <div className="bg-black/50 rounded-xl p-6 mb-6 min-h-[200px] flex items-center justify-center">
          {!thinking && !thought && (
            <button
              onClick={startThinking}
              className="px-6 py-3 bg-gradient-to-r from-primary to-cyan-400 rounded-lg hover:scale-105 transition-transform"
            >
              Start Autonomous Thinking
            </button>
          )}
          
          {thinking && (
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-flex space-x-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-cyan-400 rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-cyan-400 animate-pulse">{thought}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AutonomousHero;
