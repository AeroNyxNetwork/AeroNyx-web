import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text3D } from '@react-three/drei';
import { Vector3, MathUtils } from 'three';
import useMousePosition from '../../lib/hooks/useMousePosition';
import GlassMaterial from './GlassMaterial';

// Custom 3D logo for AeroNyx
const LogoModel = ({ color = '#6E56CF', position = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef();
  const mousePosition = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Subtle rotation based on mouse position
    const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;
    
    // Set target rotation with easing
    targetRotation.current.y = mouseX * 0.2;
    targetRotation.current.x = mouseY * 0.2;
    
    // Smooth interpolation towards target rotation
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      0.05
    );
    
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    );
    
    // Gentle floating animation
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });
  
  return (
    <group ref={groupRef} position={new Vector3(...position)} scale={scale}>
      {/* Outer torus knot representing network connectivity */}
      <mesh position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, 100, 16, 2, 3]} />
        <GlassMaterial color={color} />
      </mesh>
      
      {/* Inner torus representing data flow */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[0.6, 0.1, 16, 32]} />
        <GlassMaterial color={'#07BFD3'} />
      </mesh>
      
      {/* Core sphere representing secure center */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color={'#ffffff'}
          emissive={'#ffffff'}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Small particles orbiting around the logo */}
      <OrbitalParticles count={5} radius={1.5} />
    </group>
  );
};

// Small particles that orbit around the main logo
const OrbitalParticles = ({ count = 5, radius = 1.5 }) => {
  const particlesRef = useRef([]);
  
  // Initialize particles with random positions on a circle
  useEffect(() => {
    particlesRef.current = Array.from({ length: count }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.5,
      y: (Math.random() - 0.5) * 0.5
    }));
  }, [count]);
  
  useFrame((state) => {
    particlesRef.current.forEach((particle, i) => {
      if (!particle.ref) return;
      
      // Update angle for circular motion
      particle.angle += particle.speed * 0.005;
      
      // Set new position
      particle.ref.position.x = Math.cos(particle.angle) * radius;
      particle.ref.position.z = Math.sin(particle.angle) * radius;
      particle.ref.position.y = particle.y + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2;
    });
  });
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <mesh 
          key={i}
          ref={ref => particlesRef.current[i] && (particlesRef.current[i].ref = ref)}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
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

export default LogoModel;
