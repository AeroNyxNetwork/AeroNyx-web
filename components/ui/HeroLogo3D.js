import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import useMousePosition from '../../lib/hooks/useMousePosition';
import GlassMaterial from '../3d/GlassMaterial';

// The main 3D logo component for hero section
const HeroLogo3D = ({ className = '', size = 1, ...props }) => {
  const [canRender3D, setCanRender3D] = useState(true);
  
  // Check device capabilities before rendering 3D
  useEffect(() => {
    // Simple 3D capability check
    const isMobile = /iPhone|iPad|iPod|Android/i.test(
      typeof navigator !== 'undefined' ? navigator.userAgent : ''
    );
    const isLowPower = 
      typeof navigator !== 'undefined' && 
      navigator.hardwareConcurrency ? 
      navigator.hardwareConcurrency <= 2 : 
      false;
    
    setCanRender3D(!(isMobile && isLowPower));
  }, []);
  
  const containerSize = {
    width: 280 * size,
    height: 280 * size
  };
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={containerSize}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      {...props}
    >
      {/* Glass-like container */}
      <div className="absolute inset-0 backdrop-blur-sm bg-neutral-900/30 rounded-2xl border border-white/10 overflow-hidden">
        {/* Top highlight */}
        <div className="absolute top-0 left-5 right-5 h-px bg-white/20" />
      </div>
      
      {/* 3D Canvas - conditionally rendered based on device capability */}
      {canRender3D ? (
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#07BFD3" />
          
          {/* Main Logo Group */}
          <LogoRotatingGroup />
        </Canvas>
      ) : (
        // Fallback for low-power devices
        <FallbackLogo />
      )}
      
      {/* Overlay for better contrast and effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-neutral-900/30 to-transparent" />
      
      {/* Interactive glow effect */}
      <GlowEffect />
    </motion.div>
  );
};

// The main logo group that rotates
const LogoRotatingGroup = () => {
  const groupRef = useRef();
  const mousePosition = useMousePosition();
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    // Gentle automatic rotation
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    
    // Add mouse-based interaction when available
    if (mousePosition.x && mousePosition.y && typeof window !== 'undefined') {
      // Convert mouse position to normalized device coordinates
      const x = (mousePosition.x / window.innerWidth) * 2 - 1;
      const y = -(mousePosition.y / window.innerHeight) * 2 + 1;
      
      // Apply subtle tilt based on mouse position
      groupRef.current.rotation.x = y * 0.2;
      groupRef.current.rotation.z = -x * 0.1;
    }
    
    // Gentle floating motion
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
  });
  
  return (
    <group ref={groupRef}>
      {/* AeroNyx Logo Representation */}
      
      {/* Outer Torus - represents network connectivity */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[1.8, 0.3, 128, 32, 2, 3]} />
        <GlassMaterial color="#7762F3" opacity={0.7} />
      </mesh>
      
      {/* Inner Ring - represents data flow */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.2, 0.15, 32, 48]} />
        <GlassMaterial color="#07BFD3" opacity={0.8} />
      </mesh>
      
      {/* Core Sphere - represents security center */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.7, 48, 48]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Orbital Particles */}
      <OrbitalParticles />
      
      {/* Animated Data Lines */}
      <DataFlowLines />
    </group>
  );
};

// Small particles that orbit the logo
const OrbitalParticles = () => {
  const particles = useRef(
    Array.from({ length: 7 }).map(() => ({
      position: [0, 0, 0],
      radius: 2 + Math.random() * 0.5,
      speed: 0.2 + Math.random() * 0.5,
      startAngle: Math.random() * Math.PI * 2,
      size: 0.08 + Math.random() * 0.08,
      ref: null
    }))
  );
  
  useFrame(({ clock }) => {
    particles.current.forEach((particle, i) => {
      if (!particle.ref) return;
      
      // Calculate orbital position
      const time = clock.getElapsedTime() * particle.speed + particle.startAngle;
      const x = Math.cos(time) * particle.radius;
      const z = Math.sin(time) * particle.radius;
      const y = Math.sin(time * 0.5) * 0.5;
      
      // Update particle position
      particle.ref.position.set(x, y, z);
      
      // Pulse size slightly
      const pulse = Math.sin(time * 2) * 0.2 + 1;
      particle.ref.scale.set(pulse, pulse, pulse);
    });
  });
  
  return (
    <>
      {particles.current.map((particle, i) => (
        <mesh 
          key={i}
          ref={ref => { particle.ref = ref }}
        >
          <sphereGeometry args={[particle.size, 16, 16]} />
          <meshStandardMaterial 
            color="#59E3F5" 
            emissive="#07BFD3"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </>
  );
};

// Data flow lines that represent connectivity
const DataFlowLines = () => {
  const linesRef = useRef();
  const linesData = useRef(
    Array.from({ length: 4 }).map(() => ({
      startRadius: 0.8,
      endRadius: 2.2,
      startAngle: Math.random() * Math.PI * 2,
      endAngle: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.5,
      lineRef: null
    }))
  );
  
  useFrame(({ clock }) => {
    linesData.current.forEach((line, i) => {
      if (!line.lineRef) return;
      
      const time = clock.getElapsedTime();
      
      // Calculate start and end positions on spirals
      const startTime = time * line.speed + line.startAngle;
      const startX = Math.cos(startTime) * line.startRadius;
      const startZ = Math.sin(startTime) * line.startRadius;
      const startY = Math.sin(startTime * 0.5) * 0.3;
      
      const endTime = time * (line.speed * 0.7) + line.endAngle;
      const endX = Math.cos(endTime) * line.endRadius;
      const endZ = Math.sin(endTime) * line.endRadius;
      const endY = Math.sin(endTime * 0.5) * 0.3;
      
      // Update geometry positions
      line.lineRef.geometry.setFromPoints([
        { x: startX, y: startY, z: startZ },
        { x: endX, y: endY, z: endZ }
      ]);
    });
  });
  
  return (
    <group ref={linesRef}>
      {linesData.current.map((line, i) => (
        <mesh key={i} ref={ref => { line.lineRef = ref }}>
          <bufferGeometry />
          <lineBasicMaterial 
            color="#5FBBF7" 
            transparent
            opacity={0.6}
            linewidth={1}
          />
        </mesh>
      ))}
    </group>
  );
};

// Fallback component for devices that can't handle 3D
const FallbackLogo = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-80" />
        <div className="absolute inset-2 flex items-center justify-center">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#FFFFFF" stroke="none">
              <path d="M1277 3833 l-1277 -1278 0 -1275 0 -1275 1280 1280 1280 1280 -2 1273 -3 1272 -1278 -1277z"/>
              <path d="M3838 3833 l-1278 -1278 0 -1275 0 -1275 1280 1280 1280 1280 -2 1273-3 1272-1277 -1277z"/>
            </g>
          </svg>
        </div>
        <div className="absolute inset-0 rounded-full border border-white/20" />
      </div>
    </div>
  );
};

// Glowing effect that moves with mouse
const GlowEffect = () => {
  const mousePosition = useMousePosition();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  
  useEffect(() => {
    if (mousePosition.x && mousePosition.y && typeof window !== 'undefined') {
      // Calculate relative position
      const x = (mousePosition.x / window.innerWidth) * 100;
      const y = (mousePosition.y / window.innerHeight) * 100;
      
      setPosition({ x, y });
    }
  }, [mousePosition]);
  
  return (
    <div 
      className="absolute pointer-events-none inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(119, 98, 243, 0.15) 0%, transparent 60%)`,
        transition: 'background 0.3s ease-out'
      }}
    />
  );
};

export default HeroLogo3D;
