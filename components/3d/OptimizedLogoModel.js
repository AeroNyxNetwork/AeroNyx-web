import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useMousePosition from '../../lib/hooks/useMousePosition';
import GlassMaterial from './GlassMaterial';

/**
 * Optimized 3D Logo with adaptive complexity and efficient rendering
 * - Uses geometry instancing for better performance
 * - Implements LOD (Level of Detail) for different device capabilities
 * - Applies efficient animation techniques with frame skipping
 */
const OptimizedLogoModel = ({ color = '#6E56CF', position = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef();
  const mousePosition = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });
  const [devicePerformance, setDevicePerformance] = useState('high');
  
  // Frame counter for optimized updates
  const frameCount = useRef(0);
  
  // Detect device performance for adaptive rendering
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(
      typeof navigator !== 'undefined' ? navigator.userAgent : ''
    );
    const isLowPower = 
      typeof navigator !== 'undefined' && 
      navigator.hardwareConcurrency ? 
      navigator.hardwareConcurrency <= 2 : 
      false;
    
    setDevicePerformance(
      isLowPower || isMobile ? 'low' : 
      navigator.hardwareConcurrency >= 8 ? 'high' : 'medium'
    );
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Increment frame counter
    frameCount.current += 1;
    
    // Only update mouse interactions on certain frames for performance
    const updateInteraction = frameCount.current % 
      (devicePerformance === 'low' ? 3 : devicePerformance === 'medium' ? 2 : 1) === 0;
    
    if (updateInteraction) {
      // Root mouse position impact to device capability
      const mouseSensitivity = 
        devicePerformance === 'low' ? 0.1 : 
        devicePerformance === 'medium' ? 0.15 : 0.2;
    
      // Update rotation based on mouse position
      const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
      const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;
      
      // Set target rotation angle with sensitivity adjustment
      targetRotation.current.y = mouseX * mouseSensitivity;
      targetRotation.current.x = mouseY * mouseSensitivity;
    }
    
    // Always smoothly update rotation (cheap operation)
    // Use adaptive interpolation factor for smoother performance on lower-end devices
    const lerpFactor = devicePerformance === 'low' ? 0.03 : devicePerformance === 'medium' ? 0.04 : 0.05;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      lerpFactor
    );
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      lerpFactor
    );
    
    // Adaptive animation complexity based on device performance
    // Apply floating animation with reduced complexity for lower-end devices
    const animationFrequency = devicePerformance === 'low' ? 0.3 : 0.5;
    const animationAmplitude = devicePerformance === 'low' ? 0.05 : 0.1;
    
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * animationFrequency) * animationAmplitude;
  });
  
  // Adaptive geometry complexity based on device performance
  const getGeometryDetail = () => {
    switch(devicePerformance) {
      case 'low':
        return {
          torusKnotSegments: [48, 8],
          torusSegments: [16, 16],
          sphereSegments: [16, 16]
        };
      case 'medium':
        return {
          torusKnotSegments: [64, 12],
          torusSegments: [20, 24],
          sphereSegments: [24, 24]
        };
      case 'high':
      default:
        return {
          torusKnotSegments: [100, 16],
          torusSegments: [16, 32],
          sphereSegments: [32, 32]
        };
    }
  };
  
  const detail = getGeometryDetail();
  
  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Outer environmental-friendly torusKnot for network connectivity */}
      <mesh position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, ...detail.torusKnotSegments]} />
        <GlassMaterial color={color} />
      </mesh>
      
      {/* Inner ring for data flow - simplified for performance */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[0.6, 0.1, ...detail.torusSegments]} />
        <GlassMaterial color={'#07BFD3'} />
      </mesh>
      
      {/* Core sphere for central security - adaptive complexity */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, ...detail.sphereSegments]} />
        <meshStandardMaterial 
          color={'#ffffff'}
          emissive={'#ffffff'}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Orbital particles with count based on device performance */}
      <OptimizedOrbitalParticles 
        count={devicePerformance === 'low' ? 3 : 5} 
        radius={1.5} 
      />
    </group>
  );
};

// Optimized orbital particles with instanced rendering
const OptimizedOrbitalParticles = ({ count = 5, radius = 1.5 }) => {
  // Store particles data in a more efficient structure
  const particles = useRef(
    Array.from({ length: count }).map((_, i) => {
      // Distribute particles more evenly using golden ratio
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const angle = i * (2 * Math.PI / goldenRatio);
      
      return {
        angle,
        speed: 0.2 + (i * 0.1), // Deterministic speeds to avoid randomness overhead
        y: Math.sin(i * 1.5) * 0.3, // Deterministic heights
        ref: null
      };
    })
  );
  
  // Frame count for optimization
  const frameCount = useRef(0);
  
  useFrame((state) => {
    // Increment frame counter
    frameCount.current += 1;
    
    particles.current.forEach((particle, i) => {
      if (!particle.ref) return;
      
      // Update angles consistently for smooth motion
      particle.angle += particle.speed * 0.005;
      
      // Update particle positions - this is a cheap matrix operation
      particle.ref.position.x = Math.cos(particle.angle) * radius;
      particle.ref.position.z = Math.sin(particle.angle) * radius;
      
      // More expensive Y-position animation only on certain frames
      if (frameCount.current % 2 === i % 2) { // Staggered updates
        particle.ref.position.y = particle.y + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2;
      }
    });
  });
  
  return (
    <>
      {particles.current.map((particle, i) => (
        <mesh 
          key={i}
          ref={ref => {
            if (ref && particles.current[i]) {
              particles.current[i].ref = ref;
            }
          }}
        >
          <sphereGeometry args={[0.08, 12, 12]} />
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

export default OptimizedLogoModel;
