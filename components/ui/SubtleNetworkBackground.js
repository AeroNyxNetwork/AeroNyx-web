import React, { useEffect, useRef } from 'react';

/**
 * SubtleNetworkBackground - Chrome & Safari Compatible Version
 *
 * A simpler, more robust implementation that works across all major browsers
 * including Chrome and Safari. Uses vanilla Canvas2D with tested techniques.
 */
const SubtleNetworkBackground = ({ className }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    // Get a 2D rendering context
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Set up canvas size based on container
    const setCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Reset transform on resize
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // Scale all drawing operations by DPR
      ctx.scale(dpr, dpr);
      
      return { width: rect.width, height: rect.height };
    };
    
    // Simple check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    // Configuration - simpler for better compatibility
    const config = {
      // Colors - updated to use RGB 119, 98, 243 (purple)
      primaryColor: 'rgba(119, 98, 243, 0.7)',
      secondaryColor: 'rgba(151, 136, 247, 0.5)',
      backgroundColor: 'rgba(25, 25, 35, 0.03)',
      
      // Network parameters
      nodeCount: isMobile ? 25 : (prefersReducedMotion ? 35 : 50),
      nodeSize: { min: 1, max: 3 },
      connectionDistance: isMobile ? 120 : 150,
      lineOpacity: 0.15,
      
      // Animation
      animationSpeed: prefersReducedMotion ? 0.0 : 0.2,
    };
    
    let dimensions = setCanvasSize();
    
    // Create nodes (simple data structure)
    const nodes = Array(config.nodeCount).fill().map(() => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      radius: Math.random() * (config.nodeSize.max - config.nodeSize.min) + config.nodeSize.min,
      speedX: (Math.random() - 0.5) * config.animationSpeed,
      speedY: (Math.random() - 0.5) * config.animationSpeed,
      color: Math.random() > 0.3 ? config.primaryColor : config.secondaryColor
    }));
    
    // Animation frame ID for cleanup
    let animationFrameId;
    
    // Draw function - simplified for cross-browser compatibility
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Update position if animation is enabled
        if (!prefersReducedMotion) {
          node.x += node.speedX;
          node.y += node.speedY;
          
          // Bounce off edges
          if (node.x < 0 || node.x > dimensions.width) node.speedX *= -1;
          if (node.y < 0 || node.y > dimensions.height) node.speedY *= -1;
        }
        
        // Keep nodes within bounds
        node.x = Math.max(0, Math.min(dimensions.width, node.x));
        node.y = Math.max(0, Math.min(dimensions.height, node.y));
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });
      
      // Draw connections
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            // Calculate opacity based on distance
            const opacity = (1 - distance / config.connectionDistance) * config.lineOpacity;
            
            // Use a color from one of the nodes
            const baseColor = nodes[i].color;
            const color = baseColor.replace('rgba', 'rgba').replace(/[\d\.]+\)$/, `${opacity})`);
            
            ctx.strokeStyle = color;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(draw);
    
    // Handle window resize
    const handleResize = () => {
      dimensions = setCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none ${className || ''}`}
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full opacity-50"
      />
    </div>
  );
};

export default SubtleNetworkBackground;
