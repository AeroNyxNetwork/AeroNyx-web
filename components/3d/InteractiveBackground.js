import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import useMousePosition from '../../lib/hooks/useMousePosition';

// Main particle component that creates an interactive network visualization
const NetworkParticles = ({ count = 200, depth = 80, colors = ['#6E56CF', '#4B3B93', '#9E8CFF', '#07BFD3', '#59E3F5'] }) => {
  const { viewport, size } = useThree();
  const mousePosition = useMousePosition();
  
  // Create a reference for the instanced mesh
  const instancedMeshRef = useRef();
  
  // Precompute particle positions, connections, and velocities
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Create particles in a sphere-like distribution
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width * 2,
        (Math.random() - 0.5) * viewport.height * 2,
        (Math.random() - 0.5) * depth
      );
      
      // Random particle velocity
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
      
      // Random size and color for variety
      const size = Math.random() * 0.5 + 0.3;
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = new THREE.Color(colors[colorIndex]);
      const opacity = Math.random() * 0.5 + 0.2;
      
      // Connection attributes
      const connections = [];
      const connectionLimit = Math.floor(Math.random() * 3) + 1; // 1-3 connections per particle
      
      temp.push({ position, velocity, size, color, opacity, connections, connectionLimit });
    }
    return temp;
  }, [count, viewport.width, viewport.height, depth, colors]);
  
  // Establish connections between particles based on proximity
  useEffect(() => {
    // Calculate distances and create connections
    particles.forEach((particle, i) => {
      for (let j = 0; j < particles.length; j++) {
        if (i !== j && particle.connections.length < particle.connectionLimit) {
          const distance = particle.position.distanceTo(particles[j].position);
          // Only connect if they're relatively close
          if (distance < 10) {
            particle.connections.push(j);
          }
          
          if (particle.connections.length >= particle.connectionLimit) break;
        }
      }
    });
  }, [particles]);
  
  // Create a lines object for connections
  const linesMaterial = useMemo(() => 
    new THREE.LineBasicMaterial({
      color: 0x6E56CF,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    }), []);
  
  const linesRef = useRef();
  
  // Set up the geometry for particle instances
  const [geometry, material, dummy] = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 10, 10);
    const mat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    const dummy = new THREE.Object3D();
    
    return [geo, mat, dummy];
  }, []);
  
  // Animation loop
  useFrame((state) => {
    if (!instancedMeshRef.current) return;
    
    // Update particle positions with velocities and interactivity
    particles.forEach((particle, i) => {
      // Add velocity to position
      particle.position.add(particle.velocity);
      
      // Add interactivity with mouse position
      if (mousePosition.x && mousePosition.y) {
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
    
    // Update connection lines
    if (linesRef.current) {
      // Clear previous lines
      linesRef.current.clear();
      
      // Draw new connections
      particles.forEach((particle) => {
        particle.connections.forEach(connectedIndex => {
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
            
            // Create a material with calculated opacity
            const lineMaterial = linesMaterial.clone();
            lineMaterial.opacity = opacity * 0.2;
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            linesRef.current.add(line);
          }
        });
      });
    }
    
    // Subtle camera movement for immersive effect
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.15) * 2;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 1;
    state.camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      <instancedMesh 
        ref={instancedMeshRef} 
        args={[geometry, material, count]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshPhongMaterial 
          transparent={true} 
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
      
      <group ref={linesRef} />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      
      {/* Point lights to create depth */}
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#6E56CF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#07BFD3" />
      
      {/* Light to follow the mouse for interactive illumination */}
      <pointLight 
        position={[
          (mousePosition.x / size.width) * 2 - 1 * viewport.width/2, 
          -(mousePosition.y / size.height) * 2 + 1 * viewport.height/2, 
          5
        ]} 
        intensity={0.6}
        color="#9E8CFF"
      />
    </>
  );
};

// Floating data nodes that represent devices in the network
const DataNodes = ({ count = 10 }) => {
  const { viewport } = useThree();
  const group = useRef();
  
  // Create nodes with different properties
  const nodes = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * viewport.width * 1.5, 
        (Math.random() - 0.5) * viewport.height * 1.5,
        Math.random() * -30 - 10
      ],
      size: Math.random() * 1 + 0.5,
      rotationSpeed: Math.random() * 0.01,
      floatSpeed: 0.2 + Math.random() * 0.3,
      phaseOffset: Math.random() * Math.PI * 2
    }));
  }, [count, viewport]);
  
  useFrame(({ clock }) => {
    if (!group.current) return;
    
    nodes.forEach((node, i) => {
      const mesh = group.current.children[i];
      if (!mesh) return;
      
      // Floating motion
      mesh.position.y += Math.sin(clock.elapsedTime * node.floatSpeed + node.phaseOffset) * 0.005;
      
      // Slow rotation
      mesh.rotation.y += node.rotationSpeed;
      mesh.rotation.z += node.rotationSpeed * 0.7;
    });
  });
  
  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position} scale={node.size}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhongMaterial 
            color="#07BFD3" 
            emissive="#0597A7"
            emissiveIntensity={0.4}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

// DataFlow component that shows flowing data packets in the network
const DataFlow = ({ count = 15 }) => {
  const { viewport } = useThree();
  const group = useRef();
  
  // Create packets with paths
  const packets = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      // Create a random path with start and end points
      const startPoint = new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width * 1.5,
        (Math.random() - 0.5) * viewport.height * 1.5,
        (Math.random() - 0.5) * 40
      );
      
      const endPoint = new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width * 1.5,
        (Math.random() - 0.5) * viewport.height * 1.5,
        (Math.random() - 0.5) * 40
      );
      
      // Add a control point for curved paths
      const controlPoint = new THREE.Vector3(
        (startPoint.x + endPoint.x) / 2 + (Math.random() - 0.5) * 10,
        (startPoint.y + endPoint.y) / 2 + (Math.random() - 0.5) * 10,
        (startPoint.z + endPoint.z) / 2 + (Math.random() - 0.5) * 10
      );
      
      return {
        startPoint,
        endPoint,
        controlPoint,
        progress: Math.random(), // Random starting point
        speed: 0.003 + Math.random() * 0.005,
        size: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? "#6E56CF" : "#07BFD3"
      };
    });
  }, [count, viewport]);
  
  useFrame(() => {
    if (!group.current) return;
    
    packets.forEach((packet, i) => {
      const mesh = group.current.children[i];
      if (!mesh) return;
      
      // Update progress
      packet.progress += packet.speed;
      if (packet.progress > 1) packet.progress = 0;
      
      // Quadratic Bezier curve for path
      const position = new THREE.Vector3();
      const t = packet.progress;
      
      // Quadratic bezier formula: B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
      position.x = Math.pow(1 - t, 2) * packet.startPoint.x + 
                   2 * (1 - t) * t * packet.controlPoint.x + 
                   Math.pow(t, 2) * packet.endPoint.x;
      position.y = Math.pow(1 - t, 2) * packet.startPoint.y + 
                   2 * (1 - t) * t * packet.controlPoint.y + 
                   Math.pow(t, 2) * packet.endPoint.y;
      position.z = Math.pow(1 - t, 2) * packet.startPoint.z + 
                   2 * (1 - t) * t * packet.controlPoint.z + 
                   Math.pow(t, 2) * packet.endPoint.z;
      
      // Update mesh position
      mesh.position.copy(position);
      
      // Pulse effect based on progress
      const scale = packet.size * (1 + Math.sin(packet.progress * Math.PI * 2) * 0.2);
      mesh.scale.set(scale, scale, scale);
    });
  });
  
  return (
    <group ref={group}>
      {packets.map((packet, i) => (
        <mesh key={i} position={[packet.startPoint.x, packet.startPoint.y, packet.startPoint.z]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhongMaterial 
            color={packet.color}
            emissive={packet.color}
            emissiveIntensity={0.6}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main component to export
const InteractiveBackground = ({ className }) => {
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
          dpr={[1, 2]} // Responsive performance scaling
          gl={{ 
            antialias: true,
            alpha: true,
            logarithmicDepthBuffer: true
          }}
        >
          <NetworkParticles />
          <DataNodes />
          <DataFlow />
        </Canvas>
      </motion.div>
    </div>
  );
};

export default InteractiveBackground;
