import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import useMousePosition from '../../lib/hooks/useMousePosition';

/**
 * Optimized Network Particles component using advanced spatial algorithms
 * - Uses spatial hashing for efficient connection calculation
 * - Implements adaptive particle count based on device performance
 * - Uses instanced mesh for efficient rendering
 * - Applies Level-of-Detail (LOD) techniques
 */
const OptimizedNetworkParticles = ({ 
  depth = 80, 
  colors = ['#6E56CF', '#4B3B93', '#9E8CFF', '#07BFD3', '#59E3F5'] 
}) => {
  const { viewport, size } = useThree();
  const mousePosition = useMousePosition();
  const [devicePerformance, setDevicePerformance] = useState('high');
  
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
  
  // Adaptive particle count based on device performance
  const count = useMemo(() => {
    return devicePerformance === 'high' ? 180 :
           devicePerformance === 'medium' ? 100 : 50;
  }, [devicePerformance]);
  
  // Create a reference for the instanced mesh
  const instancedMeshRef = useRef();
  
  // Spatial hash grid for efficient neighbor finding - O(1) lookup time
  const spatialHashGrid = useMemo(() => {
    const cellSize = 3; // Size of each spatial hash cell
    const grid = {};
    
    // Hash function to convert 3D position to string key
    const hashPosition = (pos) => {
      const x = Math.floor(pos.x / cellSize);
      const y = Math.floor(pos.y / cellSize);
      const z = Math.floor(pos.z / cellSize);
      return `${x},${y},${z}`;
    };
    
    // Add particle to grid
    const addParticle = (index, position) => {
      const key = hashPosition(position);
      if (!grid[key]) {
        grid[key] = [];
      }
      grid[key].push(index);
    };
    
    // Find nearby particles
    const findNearbyParticles = (position, radius) => {
      const result = [];
      const cellRadius = Math.ceil(radius / cellSize);
      
      const centerX = Math.floor(position.x / cellSize);
      const centerY = Math.floor(position.y / cellSize);
      const centerZ = Math.floor(position.z / cellSize);
      
      // Check neighboring cells in a cube pattern
      for (let x = centerX - cellRadius; x <= centerX + cellRadius; x++) {
        for (let y = centerY - cellRadius; y <= centerY + cellRadius; y++) {
          for (let z = centerZ - cellRadius; z <= centerZ + cellRadius; z++) {
            const key = `${x},${y},${z}`;
            if (grid[key]) {
              result.push(...grid[key]);
            }
          }
        }
      }
      
      return result;
    };
    
    return { addParticle, findNearbyParticles };
  }, []);
  
  // Precompute particle positions, connections, and velocities
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Use improved distribution algorithm (Poisson disk-like)
      // This gives better spacing between particles
      let position;
      let attempts = 0;
      const minDistance = 2.0; // Minimum distance between particles
      
      do {
        position = new THREE.Vector3(
          (Math.random() - 0.5) * viewport.width * 2,
          (Math.random() - 0.5) * viewport.height * 2,
          (Math.random() - 0.5) * depth
        );
        
        // Check if this position is far enough from existing particles
        let tooClose = false;
        if (attempts < 10) { // Limit attempts for performance
          for (const existingParticle of temp) {
            if (position.distanceTo(existingParticle.position) < minDistance) {
              tooClose = true;
              break;
            }
          }
        }
        attempts++;
        
        if (!tooClose || attempts > 10) break;
      } while (true);
      
      // Calculate velocity using curl noise for more natural flow
      // Simplified version - approximates curl noise
      const angle = Math.random() * Math.PI * 2;
      const velocity = new THREE.Vector3(
        Math.cos(angle) * 0.02,
        Math.sin(angle) * 0.02,
        (Math.random() - 0.5) * 0.01
      );
      
      // Random size and color for variety
      const size = Math.random() * 0.5 + 0.3;
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = new THREE.Color(colors[colorIndex]);
      const opacity = Math.random() * 0.5 + 0.2;
      
      // Connection attributes
      const connections = [];
      const connectionLimit = Math.floor(Math.random() * 3) + 1; // 1-3 connections per particle
      
      const particle = { position, velocity, size, color, opacity, connections, connectionLimit };
      temp.push(particle);
      
      // Add to spatial hash grid
      spatialHashGrid.addParticle(i, position);
    }
    return temp;
  }, [count, viewport.width, viewport.height, depth, colors, spatialHashGrid]);
  
  // Establish connections between particles based on proximity
  // Using spatial partitioning for O(n) time complexity instead of O(n²)
  useEffect(() => {
    const searchRadius = 10; // Maximum connection distance
    
    particles.forEach((particle, i) => {
      if (particle.connections.length >= particle.connectionLimit) return;
      
      // Use spatial hash to efficiently find nearby particles
      const nearbyIndices = spatialHashGrid.findNearbyParticles(particle.position, searchRadius);
      
      for (const j of nearbyIndices) {
        if (i !== j && particle.connections.length < particle.connectionLimit) {
          const distance = particle.position.distanceTo(particles[j].position);
          
          // Only connect if they're relatively close
          if (distance < searchRadius) {
            particle.connections.push(j);
          }
          
          if (particle.connections.length >= particle.connectionLimit) break;
        }
      }
    });
  }, [particles, spatialHashGrid]);
  
  // Create a lines object for connections
  const linesMaterial = useMemo(() => 
    new THREE.LineBasicMaterial({
      color: 0x6E56CF,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    }), []);
  
  const linesRef = useRef();
  
  // Optimize geometries and dummy object creation
  const [geometry, material, dummy] = useMemo(() => {
    // Use lower poly geometry for better performance
    const geo = new THREE.SphereGeometry(1, devicePerformance === 'high' ? 10 : 6, devicePerformance === 'high' ? 10 : 6);
    
    const mat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    const dummy = new THREE.Object3D();
    
    return [geo, mat, dummy];
  }, [devicePerformance]);
  
  // Optimization: track frame count to reduce calculations
  const frameCount = useRef(0);
  
  // Animation loop with optimized calculations
  useFrame((state) => {
    if (!instancedMeshRef.current) return;
    
    frameCount.current += 1;
    const isFullUpdate = frameCount.current % (devicePerformance === 'low' ? 3 : 1) === 0;
    
    // Update particle positions with velocities and interactivity
    particles.forEach((particle, i) => {
      // Add velocity to position
      particle.position.add(particle.velocity);
      
      // Add interactivity with mouse position - only on full updates
      if (isFullUpdate && mousePosition.x && mousePosition.y) {
        // Convert screen coordinates to normalized device coordinates
        const x = (mousePosition.x / size.width) * 2 - 1;
        const y = -(mousePosition.y / size.height) * 2 + 1;
        
        // Create a vector pointing from the mouse to the particle
        const mouseVector = new THREE.Vector3(x * viewport.width/2, y * viewport.height/2, 0);
        const distanceToMouse = particle.position.distanceTo(mouseVector);
        
        // Interactive effect based on mouse proximity
        if (distanceToMouse < 10) {
          // Calculate vector from mouse to particle
          const repulsionVector = particle.position.clone().sub(mouseVector);
          repulsionVector.normalize().multiplyScalar(0.05 / Math.max(0.2, distanceToMouse * 0.1));
          particle.position.add(repulsionVector);
        }
      }
      
      // Boundary checks - wrap around if particles go out of bounds
      if (particle.position.x > viewport.width) particle.position.x = -viewport.width;
      if (particle.position.x < -viewport.width) particle.position.x = viewport.width;
      if (particle.position.y > viewport.height) particle.position.y = -viewport.height;
      if (particle.position.y < -viewport.height) particle.position.y = viewport.height;
      
      // Update the instanced mesh
      dummy.position.copy(particle.position);
      dummy.scale.set(particle.size, particle.size, particle.size);
      dummy.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
      
      // Set color for this particle instance
      instancedMeshRef.current.setColorAt(i, particle.color);
    });
    
    // Update instancedMesh
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current.instanceColor) instancedMeshRef.current.instanceColor.needsUpdate = true;
    
    // Update connection lines - skip updates on low power devices
    if (linesRef.current && isFullUpdate && devicePerformance !== 'low') {
      // Clear previous lines
      linesRef.current.clear();
      
      // Draw new connections with optimized count for performance
      const maxLines = devicePerformance === 'high' ? particles.length : 
                      devicePerformance === 'medium' ? Math.floor(particles.length * 0.7) : 
                      Math.floor(particles.length * 0.3);
      
      let lineCount = 0;
      
      particles.forEach((particle, i) => {
        if (lineCount >= maxLines) return;
        
        // Draw only a subset of connections for performance
        const connectionsToRender = devicePerformance === 'high' ? 
                                   particle.connections.length : 
                                   Math.min(1, particle.connections.length);
                                   
        for (let c = 0; c < connectionsToRender; c++) {
          if (lineCount >= maxLines) break;
          
          const connectedIndex = particle.connections[c];
          if (!connectedIndex) continue;
          
          const connectedParticle = particles[connectedIndex];
          
          // Calculate opacity based on distance
          const distance = particle.position.distanceTo(connectedParticle.position);
          const maxDistance = 10; // Maximum distance for a visible connection
          const opacity = 1 - Math.min(distance / maxDistance, 1);
          
          if (opacity > 0.05) { // Only draw if sufficiently visible
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              particle.position,
              connectedParticle.position
            ]);
            
            // Reuse line material when possible
            const lineMaterial = linesMaterial.clone();
            lineMaterial.opacity = opacity * 0.2;
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            linesRef.current.add(line);
            lineCount++;
          }
        }
      });
    }
    
    // Subtle camera movement for immersive effect - reduced intensity on low power
    const movementIntensity = devicePerformance === 'low' ? 0.5 : 1;
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.15) * 2 * movementIntensity;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 1 * movementIntensity;
    state.camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      <instancedMesh 
        ref={instancedMeshRef} 
        args={[geometry, material, count]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, devicePerformance === 'high' ? 10 : 6, devicePerformance === 'high' ? 10 : 6]} />
        <meshPhongMaterial 
          transparent={true} 
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
      
      {devicePerformance !== 'low' && <group ref={linesRef} />}
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      
      {/* Reduced number of lights for better performance */}
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#6E56CF" />
      
      {/* Optional second light based on device performance */}
      {devicePerformance !== 'low' && (
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#07BFD3" />
      )}
      
      {/* Light to follow the mouse - only on high performance devices */}
      {devicePerformance === 'high' && mousePosition.x && (
        <pointLight 
          position={[
            (mousePosition.x / size.width) * 2 - 1 * viewport.width/2, 
            -(mousePosition.y / size.height) * 2 + 1 * viewport.height/2, 
            5
          ]} 
          intensity={0.6}
          color="#9E8CFF"
        />
      )}
    </>
  );
};

// Optimized container component
const OptimizedInteractiveBackground = ({ className }) => {
  // Detect device performance for configuration
  const [devicePerformance, setDevicePerformance] = useState('high');
  
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
  
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Canvas
          camera={{ position: [0, 0, 25], fov: 60 }}
          dpr={[1, Math.min(2, window.devicePixelRatio)]} // Cap pixel ratio for performance
          gl={{ 
            antialias: devicePerformance !== 'low',
            alpha: true,
            logarithmicDepthBuffer: devicePerformance === 'high',
            // Use power preference hint for better battery life on mobile
            powerPreference: devicePerformance === 'low' ? 'low-power' : 'default'
          }}
          // Only preserve drawing buffer if needed for specific features
          preserveDrawingBuffer={false}
        >
          <OptimizedNetworkParticles />
        </Canvas>
      </motion.div>
    </div>
  );
};

export default OptimizedInteractiveBackground;
