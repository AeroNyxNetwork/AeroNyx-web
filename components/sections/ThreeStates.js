import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';

const ThreeStates = () => {
  const [activeState, setActiveState] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const states = [
    {
      id: 'sensing',
      title: 'SENSING',
      color: 'from-blue-500 to-cyan-500',
      icon: '👁️',
      description: 'Infrastructure becomes aware',
      details: [
        'Hardware continuously reports capabilities via ZKP',
        'Network maps optimal pathways in real-time',
        'AI observes patterns and anomalies',
        'MCP standardizes all communications'
      ],
      visual: <SensingVisual />
    },
    {
      id: 'thinking',
      title: 'THINKING',
      color: 'from-purple-500 to-pink-500',
      icon: '🧠',
      description: 'Intelligence emerges from data',
      details: [
        'AI analyzes global compute demand',
        'Predicts future resource needs',
        'Optimizes routing for privacy/performance',
        'Plans preemptive actions'
      ],
      visual: <ThinkingVisual />
    },
    {
      id: 'acting',
      title: 'ACTING',
      color: 'from-green-500 to-emerald-500',
      icon: '⚡',
      description: 'Autonomous optimization in action',
      details: [
        'Automatically provisions compute where needed',
        'Reroutes traffic before congestion',
        'Verifies and attests to computations',
        'Self-heals and self-optimizes'
      ],
      visual: <ActingVisual />
    }
  ];
  
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setActiveState(prev => (prev + 1) % states.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [autoPlay, states.length]);
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900" />
      
      <Container className="relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The Three States of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Autonomous Intelligence
            </span>
          </motion.h2>
          <p className="text-xl text-neutral-300">
            Watch how infrastructure evolves from passive to conscious
          </p>
        </div>
        
        {/* State selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-neutral-800/50 backdrop-blur-sm rounded-full p-1 border border-neutral-700">
            {states.map((state, index) => (
              <button
                key={state.id}
                onClick={() => {
                  setActiveState(index);
                  setAutoPlay(false);
                }}
                className={`
                  px-6 py-3 rounded-full transition-all duration-300
                  ${activeState === index 
                    ? 'bg-gradient-to-r ' + state.color + ' text-white shadow-lg' 
                    : 'text-neutral-400 hover:text-white'
                  }
                `}
              >
                <span className="mr-2">{state.icon}</span>
                {state.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Auto-play toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            {autoPlay ? '⏸️ Pause' : '▶️ Auto-play'} Animation
          </button>
        </div>
        
        {/* State content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeState}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Visual side */}
            <div className="order-2 md:order-1">
              <div className="relative h-[400px] rounded-2xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10">
                {states[activeState].visual}
              </div>
            </div>
            
            {/* Content side */}
            <div className="order-1 md:order-2">
              <div className="mb-6">
                <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${states[activeState].color} bg-clip-text text-transparent`}>
                  State {activeState + 1}: {states[activeState].title}
                </h3>
                <p className="text-xl text-neutral-300">
                  {states[activeState].description}
                </p>
              </div>
              
              <div className="space-y-3">
                {states[activeState].details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${states[activeState].color} mt-2 mr-3 flex-shrink-0`} />
                    <p className="text-neutral-300">{detail}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Progress indicator */}
              <div className="mt-8">
                <div className="flex space-x-2">
                  {states.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        index === activeState 
                          ? 'bg-gradient-to-r ' + states[activeState].color
                          : 'bg-neutral-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
};

// Visual components for each state
const SensingVisual = () => {
  const [pulseCount, setPulseCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Radar effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map(i => (
          <motion.div
            key={`pulse-${pulseCount}-${i}`}
            className="absolute w-32 h-32 border-2 border-cyan-400 rounded-full"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 3, delay: i * 0.5 }}
          />
        ))}
      </div>
      
      {/* Central eye */}
      <div className="relative z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-4xl">👁️</span>
        </div>
        
        {/* Data points */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 80;
          const y = Math.sin(angle) * 80;
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{ left: '50%', top: '50%' }}
              animate={{
                x: [0, x, 0],
                y: [0, y, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const ThinkingVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Neural pathways */}
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 6 }).map((_, i) => {
          const startAngle = (i / 6) * Math.PI * 2;
          const endAngle = ((i + 2) / 6) * Math.PI * 2;
          const x1 = 200 + Math.cos(startAngle) * 80;
          const y1 = 200 + Math.sin(startAngle) * 80;
          const x2 = 200 + Math.cos(endAngle) * 80;
          const y2 = 200 + Math.sin(endAngle) * 80;
          
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#purpleGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          );
        })}
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Central brain */}
      <motion.div
        className="relative z-10 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity
        }}
      >
        <span className="text-4xl">🧠</span>
      </motion.div>
      
      {/* Thought bubbles */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-purple-500/20 backdrop-blur-sm rounded-full"
          style={{
            width: 40 + i * 20,
            height: 40 + i * 20,
            left: '50%',
            top: '20%'
          }}
          animate={{
            y: [-20, -100],
            x: [(i - 1) * 30, (i - 1) * 50],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 1.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8
          }}
        />
      ))}
    </div>
  );
};

const ActingVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Energy burst effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-32 h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * 60;
            const y = Math.sin(angle) * 60;
            
            return (
              <motion.div
                key={i}
                className="absolute w-3 h-12 bg-gradient-to-t from-green-500 to-transparent"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center bottom'
                }}
                animate={{
                  x: [0, x],
                  y: [0, y],
                  opacity: [1, 0],
                  scale: [0.5, 1.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.125
                }}
              />
            );
          })}
        </motion.div>
      </div>
      
      {/* Central lightning bolt */}
      <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
        <motion.span
          className="text-4xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity
          }}
        >
          ⚡
        </motion.span>
      </div>
      
      {/* Action ripples */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute border-2 border-green-400 rounded-full"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  );
};

export default ThreeStates;
