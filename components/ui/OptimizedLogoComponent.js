import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import useMousePosition from '../../lib/hooks/useMousePosition';

/**
 * Optimized 3D Logo Component with Canvas fallback for better compatibility
 * Uses Three.js when supported, falls back to Canvas2D on lower-end devices
 */
const OptimizedLogoComponent = ({ color = '#7762F3', size = 1, className = '' }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const mousePosition = useMousePosition();
  const [use3D, setUse3D] = useState(true);
  const animationRef = useRef(null);
  
  // Test device capabilities
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Device detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const isLowPower = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 2 : false;
    
    // Check WebGL support
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      hasWebGL = false;
    }
    
    // Disable 3D for very low-end devices
    setUse3D(hasWebGL && !(isMobile && isLowPower));
  }, []);
  
  // Setup and animate Three.js scene
  useEffect(() => {
    if (!use3D || !containerRef.current) return;
    
    // Create Three.js objects
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 4;
    cameraRef.current = camera;
    
    // Setup renderer with transparency
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    // Add renderer to DOM
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x7762F3, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create main logo geometry (using simpler geometries for better performance)
    const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 64, 16, 2, 3);
    const torusKnotMaterial = new THREE.MeshPhysicalMaterial({
      color: color,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.7,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    });
    const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
    scene.add(torusKnotMesh);
    
    // Inner torus
    const torusGeometry = new THREE.TorusGeometry(0.6, 0.1, 16, 32);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: '#07BFD3',
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.7,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.rotation.x = Math.PI / 2;
    scene.add(torusMesh);
    
    // Core sphere
    const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#ffffff',
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);
    
    // Create orbital particles (fewer for better performance)
    const particleCount = 3;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const sphereGeometry = new THREE.SphereGeometry(0.08, 8, 8);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: '#59E3F5',
        emissive: '#07BFD3',
        emissiveIntensity: 0.8
      });
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5;
      sphereMesh.position.x = Math.cos(angle) * radius;
      sphereMesh.position.z = Math.sin(angle) * radius;
      sphereMesh.position.y = (Math.random() - 0.5) * 0.5;
      
      particles.push({
        mesh: sphereMesh,
        angle: angle,
        speed: 0.2 + Math.random() * 0.5,
        y: sphereMesh.position.y
      });
      
      scene.add(sphereMesh);
    }
    
    // Animation loop
    const animate = (time) => {
      if (!containerRef.current) return;
      
      // Rotate main objects
      torusKnotMesh.rotation.y += 0.005;
      torusMesh.rotation.z += 0.003;
      
      // Animate orbital particles
      particles.forEach((particle, i) => {
        particle.angle += particle.speed * 0.005;
        particle.mesh.position.x = Math.cos(particle.angle) * 1.5;
        particle.mesh.position.z = Math.sin(particle.angle) * 1.5;
        particle.mesh.position.y = particle.y + Math.sin(time * 0.001 + i) * 0.2;
      });
      
      // Handle mouse interaction for subtle motion
      if (mousePosition.x && mousePosition.y && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate normalized mouse position relative to logo center
        const mouseX = (mousePosition.x - centerX) / window.innerWidth;
        const mouseY = (mousePosition.y - centerY) / window.innerHeight;
        
        // Apply subtle tilt based on mouse position
        const targetX = mouseY * 0.3;
        const targetY = -mouseX * 0.3;
        
        // Smooth camera movement
        scene.rotation.x = THREE.MathUtils.lerp(scene.rotation.x, targetX, 0.05);
        scene.rotation.y = THREE.MathUtils.lerp(scene.rotation.y, targetY, 0.05);
      }
      
      // Apply a gentle floating motion
      scene.position.y = Math.sin(time * 0.001) * 0.1;
      
      // Render scene
      renderer.render(scene, camera);
      
      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [use3D]);
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        width: `${200 * size}px`, 
        height: `${200 * size}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Fallback canvas for non-WebGL devices */}
      {!use3D && (
        <canvas 
          ref={canvasRef} 
          width="200" 
          height="200" 
          className="block max-w-full"
          style={{
            transform: `scale(${size})`,
            transformOrigin: 'center'
          }}
        />
      )}
      
      {/* Glow effect that works with both implementations */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-primary opacity-20 blur-xl"
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [0.8, 1.1, 0.8] 
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};ationRef.current);
      }
      
      // Clean up Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      // Clean up geometries and materials
      torusKnotGeometry.dispose();
      torusKnotMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
    };
  }, [use3D, color, mousePosition]);
  
  // Setup and animate Canvas2D fallback
  useEffect(() => {
    if (use3D || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = 200;
    canvas.height = 200;
    
    // Animation loop for Canvas2D fallback
    const animate = (time) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set canvas center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw main circle (core)
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 30
      );
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, '#e0e0ff');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw outer ring with glow
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60 + Math.sin(time * 0.002) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 8;
      ctx.stroke();
      
      // Create glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60 + Math.sin(time * 0.002) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Draw inner ring (torus)
      ctx.beginPath();
      ctx.ellipse(
        centerX, 
        centerY, 
        40, 
        20, 
        time * 0.001 % (Math.PI * 2), 
        0, 
        Math.PI * 2
      );
      ctx.strokeStyle = '#07BFD3';
      ctx.lineWidth = 5;
      ctx.stroke();
      
      // Draw orbital particles
      for (let i = 0; i < 3; i++) {
        const angle = (time * 0.001 * (0.5 + i * 0.2)) % (Math.PI * 2);
        const x = centerX + Math.cos(angle) * 80;
        const y = centerY + Math.sin(angle) * 80 + Math.sin(time * 0.002 + i) * 10;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#59E3F5';
        ctx.fill();
        
        ctx.shadowColor = '#07BFD3';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(89, 227, 245, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      // Apply subtle floating motion to the entire logo
      ctx.translate(
        centerX, 
        centerY + Math.sin(time * 0.001) * 5
      );
      ctx.translate(-centerX, -centerY);
      
      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(anim
