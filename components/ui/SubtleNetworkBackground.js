import React, { useEffect, useRef } from 'react';

/**
 * SubtleNetworkBackground
 * 
 * A performant, canvas-based background that creates a subtle network visualization
 * representing AeroNyx's decentralized privacy network. This implementation:
 * 
 * 1. Uses plain Canvas2D for maximum compatibility and performance
 * 2. Respects user preferences for reduced motion
 * 3. Scales complexity based on device capabilities
 * 4. Maintains brand identity with the AeroNyx color palette
 * 5. Has minimal impact on page load and scrolling performance
 */
const SubtleNetworkBackground = ({ className }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Element refs
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    // Get container dimensions
    const updateCanvasSize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set canvas size accounting for device pixel ratio
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Scale all drawing operations
      ctx.scale(dpr, dpr);
      
      return { width, height };
    };
    
    // Detect system preferences and device capabilities
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency < 4 || isMobile;
    
    // Performance-based configuration
    const config = {
      nodeCount: isLowEnd ? 30 : prefersReducedMotion ? 40 : 60,
      lineOpacity: prefersReducedMotion ? 0.08 : 0.12,
      animationSpeed: prefersReducedMotion ? 0.0001 : 0.0005,
      connectionDistance: isLowEnd ? 150 : 200,
      nodeSize: { min: 2, max: 4 },
      colors: {
        primary: '#6E56CF',
        secondary: '#07BFD3',
        tertiary: '#9E8CFF',
        background: 'rgba(13, 13, 24, 0.03)'
      }
    };
    
    // Get context and set initial size
    const ctx = canvas.getContext('2d');
    let { width, height } = updateCanvasSize();
    
    // Create nodes with positions, sizes, colors
    const nodes = Array(config.nodeCount).fill().map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (config.nodeSize.max - config.nodeSize.min) + config.nodeSize.min,
      color: Math.random() > 0.7 ? config.colors.secondary : config.colors.primary,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      // Data node properties for subtle visual storytelling
      dataType: Math.random() > 0.5 ? 'resource' : 'privacy',
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2
    }));
    
    // Optimization: pre-calculate gradient once
    const createGradient = (color, radius, x, y) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'rgba(13, 13, 24, 0)');
      return gradient;
    };
    
    // Animation state
    let animationFrameId;
    let lastDrawTime = 0;
    const fps = 30; // Target 30fps for efficiency
    const fpsInterval = 1000 / fps;
    
    // Main drawing function
    const draw = (timestamp) => {
      // Throttle to target FPS
      if (timestamp - lastDrawTime < fpsInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      
      lastDrawTime = timestamp;
      
      // Clear canvas with slight fade effect for motion trails
      ctx.fillStyle = config.colors.background;
      ctx.fillRect(0, 0, width, height);
      
      // Update nodes with minimal movement
      nodes.forEach(node => {
        // Only move nodes if reduced motion is not preferred
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          
          // Wrap around edges
          if (node.x < 0) node.x = width;
          if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          if (node.y > height) node.y = 0;
        }
        
        // Subtle pulse effect
        const pulse = 1 + Math.sin(timestamp * node.pulseSpeed + node.pulsePhase) * 0.2;
        const radius = node.radius * pulse;
        
        // Draw node with gradient for subtle glow
        ctx.beginPath();
        const gradient = createGradient(node.color, radius, node.x, node.y);
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw connections between nearby nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.connectionDistance) {
            // Vary opacity based on distance
            const opacity = (1 - distance / config.connectionDistance) * config.lineOpacity;
            
            // Different color for privacy vs resource connections
            let lineColor;
            if (nodes[i].dataType === 'privacy' && nodes[j].dataType === 'privacy') {
              lineColor = config.colors.primary;
            } else if (nodes[i].dataType === 'resource' && nodes[j].dataType === 'resource') {
              lineColor = config.colors.secondary;
            } else {
              lineColor = config.colors.tertiary;
            }
            
            ctx.strokeStyle = lineColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Occasional data packet visualization (subtle animation)
      if (!prefersReducedMotion && Math.random() > 0.97) {
        const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
        const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
        const distance = Math.sqrt(
          Math.pow(sourceNode.x - targetNode.x, 2) + 
          Math.pow(sourceNode.y - targetNode.y, 2)
        );
        
        if (distance < config.connectionDistance * 1.5) {
          // Draw data packet
          ctx.fillStyle = config.colors.secondary;
          ctx.beginPath();
          ctx.arc(
            sourceNode.x + (targetNode.x - sourceNode.x) * 0.3, 
            sourceNode.y + (targetNode.y - sourceNode.y) * 0.3, 
            1.5, 0, Math.PI * 2
          );
          ctx.fill();
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(draw);
    
    // Handle window resize
    const handleResize = () => {
      const dimensions = updateCanvasSize();
      
      // Update node positions proportionally
      nodes.forEach(node => {
        node.x = (node.x / width) * dimensions.width;
        node.y = (node.y / height) * dimensions.height;
      });
      
      // Update cached dimensions
      width = dimensions.width;
      height = dimensions.height;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default SubtleNetworkBackground;
