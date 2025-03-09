import React, { useEffect, useRef, useState } from 'react';

/**
 * SubtleNetworkBackground - Safari Compatible Version
 * 
 * Modified to ensure compatibility with Safari browsers:
 * 1. Uses explicit color strings instead of color objects
 * 2. Avoids problematic alpha compositing operations
 * 3. Adds Safari-specific optimizations
 * 4. Adds a fallback display for browsers with canvas issues
 */
const SubtleNetworkBackground = ({ className }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasSupported, setCanvasSupported] = useState(true);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Browser detection for Safari-specific optimizations
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    // Check for canvas support
    try {
      const testCanvas = document.createElement('canvas');
      const testContext = testCanvas.getContext('2d');
      if (!testContext) {
        setCanvasSupported(false);
        return;
      }
    } catch (e) {
      setCanvasSupported(false);
      return;
    }
    
    // Element refs
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    // Get context with Safari-specific optimizations
    const ctx = canvas.getContext('2d', isSafari ? { alpha: false } : {});
    if (!ctx) {
      setCanvasSupported(false);
      return;
    }
    
    // Get container dimensions
    const updateCanvasSize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set canvas size accounting for device pixel ratio
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Reset the scale each time we resize
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      
      // On Safari, fill with background color immediately (helps with flickering)
      if (isSafari) {
        ctx.fillStyle = '#0D0D18';
        ctx.fillRect(0, 0, width, height);
      }
      
      return { width, height };
    };
    
    // Detect system preferences and device capabilities
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency < 4 || isMobile;
    
    // Safari-optimized configuration
    const config = {
      nodeCount: isLowEnd ? 20 : (isSafari ? 30 : 50),
      lineOpacity: prefersReducedMotion ? 0.06 : (isSafari ? 0.08 : 0.12),
      animationSpeed: prefersReducedMotion ? 0.0001 : 0.0003,
      connectionDistance: isLowEnd ? 120 : (isSafari ? 150 : 200),
      nodeSize: { min: 1.5, max: 3.5 },
      colors: {
        // Using new brand color rgb(119, 98, 23) as base
        primary: 'rgba(119, 98, 23, 1)',
        primaryLight: 'rgba(150, 125, 30, 1)',
        secondary: 'rgba(140, 115, 25, 1)',
        tertiary: 'rgba(160, 135, 35, 1)',
        background: 'rgba(13, 13, 24, 0.02)'
      }
    };
    
    let { width, height } = updateCanvasSize();
    
    // Create nodes with positions, sizes, colors - using explicit color strings for Safari
    const nodes = Array(config.nodeCount).fill().map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (config.nodeSize.max - config.nodeSize.min) + config.nodeSize.min,
      color: Math.random() > 0.7 ? config.colors.secondary : config.colors.primary,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      dataType: Math.random() > 0.5 ? 'resource' : 'privacy',
      pulseSpeed: Math.random() * 0.015 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2
    }));
    
    // Safari-optimized gradient function
    const createGradient = (color, radius, x, y) => {
      try {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5);
        // Convert rgba string to values for creating transparent version
        const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?\)/);
        if (rgbaMatch) {
          const [_, r, g, b, a] = rgbaMatch;
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        } else {
          // Fallback if regex fails
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, 'rgba(13, 13, 24, 0)');
        }
        return gradient;
      } catch (e) {
        // Fallback for gradient creation failures
        return color;
      }
    };
    
    // Animation state
    let animationFrameId;
    let lastDrawTime = 0;
    const fps = isSafari ? 24 : 30; // Lower FPS target for Safari
    const fpsInterval = 1000 / fps;
    
    // Safari-optimized drawing function
    const draw = (timestamp) => {
      // Throttle to target FPS
      if (timestamp - lastDrawTime < fpsInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      
      lastDrawTime = timestamp;
      
      // Clear canvas - for Safari, use full clear instead of transparent overlay
      if (isSafari) {
        ctx.fillStyle = '#0D0D18';
        ctx.clearRect(0, 0, width, height);
        ctx.fillRect(0, 0, width, height);
      } else {
        // For other browsers, use semi-transparent overlay for motion trails
        ctx.fillStyle = config.colors.background;
        ctx.fillRect(0, 0, width, height);
      }
      
      // Update and draw nodes
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
        
        // Subtle pulse effect - reduced for Safari
        const pulseAmount = isSafari ? 0.1 : 0.2;
        const pulse = 1 + Math.sin(timestamp * node.pulseSpeed + node.pulsePhase) * pulseAmount;
        const radius = node.radius * pulse;
        
        // Draw node - simplified drawing for Safari
        ctx.beginPath();
        if (isSafari) {
          ctx.fillStyle = node.color;
        } else {
          ctx.fillStyle = createGradient(node.color, radius, node.x, node.y);
        }
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw connections - simplified for Safari
      ctx.lineWidth = isSafari ? 0.3 : 0.5;
      for (let i = 0; i < nodes.length; i++) {
        // Limit connections for performance in Safari
        const connectionLimit = isSafari ? Math.min(nodes.length, i + 5) : nodes.length;
        
        for (let j = i + 1; j < connectionLimit; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.connectionDistance) {
            // Vary opacity based on distance - simpler calculation for Safari
            const opacity = isSafari
              ? config.lineOpacity / 2
              : (1 - distance / config.connectionDistance) * config.lineOpacity;
            
            // Different color based on node types
            let lineColor;
            if (nodes[i].dataType === 'privacy' && nodes[j].dataType === 'privacy') {
              lineColor = config.colors.primary;
            } else if (nodes[i].dataType === 'resource' && nodes[j].dataType === 'resource') {
              lineColor = config.colors.secondary;
            } else {
              lineColor = config.colors.tertiary;
            }
            
            // Draw line with opacity
            if (isSafari) {
              // For Safari, use pre-calculated rgba strings for better performance
              ctx.strokeStyle = lineColor.replace('1)', `${opacity})`);
            } else {
              ctx.strokeStyle = lineColor.replace('1)', `${opacity})`);
            }
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Skip data packet animation in Safari for performance
      if (!isSafari && !prefersReducedMotion && Math.random() > 0.97) {
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
    
    // Handle window resize with debounce for Safari
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const dimensions = updateCanvasSize();
        
        // Update node positions proportionally
        nodes.forEach(node => {
          node.x = (node.x / width) * dimensions.width;
          node.y = (node.y / height) * dimensions.height;
        });
        
        // Update cached dimensions
        width = dimensions.width;
        height = dimensions.height;
      }, isSafari ? 200 : 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  // Render canvas or fallback
  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {canvasSupported ? (
        <canvas 
          ref={canvasRef}
          className="w-full h-full opacity-30"
        />
      ) : (
        // Fallback for browsers without canvas support
        <div className="w-full h-full bg-neutral-900 bg-opacity-50" />
      )}
    </div>
  );
};

export default SubtleNetworkBackground;
