import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Neuron particle system
const NeuronSystem = ({ count = 100 }) => {
  const mesh = useRef();
  const light = useRef();
  
  // Generate neuron positions and connections
  const { positions, connections } = useMemo(() => {
    const pos = [];
    const conn = [];
    
    // Create neurons in 3D space
    for (let i = 0; i < count; i++) {
      pos.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        activation: Math.random(),
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    
    // Create connections between nearby neurons
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const distance = pos[i].position.distanceTo(pos[j].position);
        if (distance < 8 && Math.random() > 0.7) {
          conn.push({
            start: i,
            end: j,
            strength: Math.random(),
            active: false
          });
        }
      }
    }
    
    return { positions: pos, connections: conn };
  }, [count]);
  
  // Animation frame
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Update neuron positions and activations
    positions.forEach((neuron, i) => {
      // Slow drift
      neuron.position.add(neuron.velocity);
      
      // Bounce at boundaries
      ['x', 'y', 'z'].forEach(axis => {
        if (Math.abs(neuron.position[axis]) > 15) {
          neuron.velocity[axis] *= -1;
        }
      });
      
      // Pulsing activation
      neuron.activation = Math.sin(time * 2 + neuron.pulsePhase) * 0.5 + 0.5;
    });
    
    // Activate random connections
    connections.forEach(conn => {
      if (Math.random() > 0.98) {
        conn.active = true;
      }
      if (conn.active) {
        conn.strength *= 0.95;
        if (conn.strength < 0.01) {
          conn.active = false;
          conn.strength = Math.random();
        }
      }
    });
    
    // Update light position for dynamic lighting
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.5) * 10;
      light.current.position.y = Math.cos(time * 0.3) * 10;
    }
  });
  
  return (
    <group>
      {/* Neurons */}
      {positions.map((neuron, i) => (
        <mesh key={`neuron-${i}`} position={neuron.position}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL(0.6 - neuron.activation * 0.2, 0.8, 0.5)}
            emissive={new THREE.Color().setHSL(0.6, 1, neuron.activation * 0.5)}
            emissiveIntensity={neuron.activation}
          />
        </mesh>
      ))}
      
      {/* Synaptic connections */}
      {connections.map((conn, i) => {
        if (!conn.active) return null;
        
        const start = positions[conn.start].position;
        const end = positions[conn.end].position;
        const midPoint = new THREE.Vector3().lerpVectors(start, end, 0.5);
        
        return (
          <line key={`conn-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={new THREE.Color().setHSL(0.55, 1, 0.5 + conn.strength * 0.5)}
              transparent
              opacity={conn.strength}
              linewidth={conn.strength * 3}
            />
          </line>
        );
      })}
      
      {/* Dynamic lighting */}
      <pointLight ref={light} intensity={1} color="#00d4ff" />
      <ambientLight intensity={0.3} />
    </group>
  );
};

// Thought bubble particles
const ThoughtParticles = ({ count = 50 }) => {
  const particles = useRef();
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = [];
    
    for (let i = 0; i < count; i++) {
      // Start from center
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      
      // Random velocities
      velocities.push({
        x: (Math.random() - 0.5) * 0.1,
        y: Math.random() * 0.1 + 0.05,
        z: (Math.random() - 0.5) * 0.1,
        life: 0
      });
    }
    
    return { positions, velocities };
  }, [count]);
  
  useFrame(() => {
    if (!particles.current) return;
    
    const positions = particles.current.geometry.attributes.position.array;
    
    particlePositions.velocities.forEach((vel, i) => {
      // Update positions
      positions[i * 3] += vel.x;
      positions[i * 3 + 1] += vel.y;
      positions[i * 3 + 2] += vel.z;
      
      // Age particles
      vel.life += 0.02;
      
      // Reset particles that have lived too long
      if (vel.life > 1 || positions[i * 3 + 1] > 20) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = -10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        vel.life = 0;
        vel.y = Math.random() * 0.1 + 0.05;
      }
      
      // Add some waviness
      vel.x += Math.sin(vel.life * 10) * 0.001;
    });
    
    particles.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlePositions.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#a78bfa"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main background component
const LivingNetworkBackground = ({ intensity = 1 }) => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-[#0a0a18] to-black" />
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <fog attach="fog" color="#0a0a18" near={10} far={50} />
        <NeuronSystem count={80 * intensity} />
        <ThoughtParticles count={30 * intensity} />
      </Canvas>
      
      {/* Overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/50" />
        
        {/* Consciousness pulse */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-radial from-cyan-500/20 via-purple-500/10 to-transparent blur-3xl" />
        </motion.div>
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-black/60" />
    </div>
  );
};

export default LivingNetworkBackground;
