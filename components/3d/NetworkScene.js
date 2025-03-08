import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { useTexture, Instances, Instance, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Vector3 } from 'three';
import useMousePosition from '../../lib/hooks/useMousePosition';

const NetworkScene = ({ count = 100, depth = 80 }) => {
  const { viewport, camera } = useThree();
  const mousePosition = useMousePosition();
  const groupRef = useRef();
  const prevRef = useRef([]);
  
  // Adjust particle count based on device performance
  const particleCount = useMemo(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      // A simple heuristic for device capability
      const isMobile = window.innerWidth < 768;
      const isLowPowerDevice = window.navigator.hardwareConcurrency < 4;
      
      if (isMobile || isLowPowerDevice) {
        return Math.floor(count / 3); // Reduce particles for mobile/low-power devices
      }
    }
    return count;
  }, [count]);
  
  // Precompute random positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const position = new Vector3(
        (Math.random() - 0.5) * viewport.width * 1.5,
        (Math.random() - 0.5) * viewport.height * 1.5,
        (Math.random() - 0.5) * depth
      );
      const velocity = new Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );
      const size = Math.random() * 0.5 + 0.5;
      temp.push({ position, velocity, size });
    }
    return temp;
  }, [viewport, particleCount, depth]);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Update particles based on mouse position
    const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;
    
    groupRef.current.children.forEach((particle, i) => {
      // Update position based on velocity
      particles[i].position.add(particles[i].velocity);
      
      // Add subtle attraction to mouse position
      const mouseAttraction = new Vector3(mouseX, mouseY, 0);
      mouseAttraction.multiplyScalar(0.02);
      particles[i].position.add(mouseAttraction);
      
      // Boundary check and wrap around
      if (particles[i].position.x > viewport.width) particles[i].position.x = -viewport.width;
      if (particles[i].position.x < -viewport.width) particles[i].position.x = viewport.width;
      if (particles[i].position.y > viewport.height) particles[i].position.y = -viewport.height;
      if (particles[i].position.y < -viewport.height) particles[i].position.y = viewport.height;
      
      // Update instance
      particle.position.copy(particles[i].position);
      particle.scale.setScalar(particles[i].size);
    });
    
    // Gentle camera animation
    camera.position.z = 5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
  });
  
  // Draw connections between particles that are close to each other
  const Connections = () => {
    const linesRef = useRef();
    
    useFrame(() => {
      if (!linesRef.current || !groupRef.current) return;
      
      const positions = [];
      const colors = [];
      const maxDistance = 3; // Maximum distance for connections
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i].position;
          const b = particles[j].position;
          
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < maxDistance) {
            // Linear interpolation for opacity based on distance
            const opacity = 1 - dist / maxDistance;
            
            positions.push(a.x, a.y, a.z);
            positions.push(b.x, b.y, b.z);
            
            const color = [0.43, 0.34, 0.81, opacity]; // Purple with varying opacity
            
            colors.push(...color);
            colors.push(...color);
          }
        }
      }
      
      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3).onUpload(
          () => (linesRef.current.geometry.attributes.position.needsUpdate = false)
        )
      );
      
      linesRef.current.geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(colors, 4).onUpload(
          () => (linesRef.current.geometry.attributes.color.needsUpdate = false)
        )
      );
      
      linesRef.current.geometry.computeBoundingSphere();
    });
    
    return (
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent />
      </lineSegments>
    );
  };
  
  return (
    <>
      <color attach="background" args={['#0D0D18']} />
      
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={3} />
      </EffectComposer>
      
      <Instances limit={particleCount} ref={groupRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#6E56CF" emissive="#4B3B93" emissiveIntensity={0.5} />
        
        {particles.map((data, i) => (
          <Instance key={i} position={data.position} scale={data.size} />
        ))}
      </Instances>
      
      <Connections />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
};

export default NetworkScene;
