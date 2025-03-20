import React, { useMemo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '../../lib/hooks/useMousePosition';

/**
 * Optimized background component with mathematical algorithms for better performance
 * Uses spatial partitioning and selective rendering for better performance
 */
const OptimizedGlassBackground = ({ className = '', intensity = 1 }) => {
  const containerRef = useRef(null);
  const mousePosition = useMousePosition();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [devicePerformance, setDevicePerformance] = useState('high');
  
  // Check device capabilities for adaptive rendering
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Device performance detection
    const isLowPower = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 2 : false;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    setDevicePerformance(
      isLowPower || isMobile ? 'low' : 
      navigator.hardwareConcurrency >= 8 ? 'high' : 'medium'
    );
    
    // Set dimensions
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Generate optimized background orbs using quadtree-like partitioning concept
  // This ensures better distribution and reduced overdraw
  const backgroundOrbs = useMemo(() => {
    // Adjust number of orbs based on device performance
    const orbCount = 
      devicePerformance === 'high' ? 5 :
      devicePerformance === 'medium' ? 3 : 2;
    
    // Create a grid system for better distribution
    const gridSize = Math.ceil(Math.sqrt(orbCount));
    const cellWidth = 100 / gridSize;
    const cellHeight = 100 / gridSize;
    
    return Array.from({ length: orbCount }).map((_, i) => {
      // Determine grid position
      const gridX = i % gridSize;
      const gridY = Math.floor(i / gridSize);
      
      // Add some randomness within the cell
      const x = (gridX * cellWidth) + (Math.random() * 0.6 + 0.2) * cellWidth;
      const y = (gridY * cellHeight) + (Math.random() * 0.6 + 0.2) * cellHeight;
      
      // Optimize size based on performance
      const baseSize = 
        devicePerformance === 'high' ? 300 : 
        devicePerformance === 'medium' ? 250 : 200;
      
      return {
        id: `orb-${i}`,
        x,
        y,
        size: Math.random() * baseSize + 100,
        // Alternate colors for visual interest
        color: i % 2 === 0 ? '#7762F3' : '#07BFD3',
        opacity: (Math.random() * 0.3 + 0.1) * intensity
      };
    });
  }, [intensity, devicePerformance]);

  // Optimized grid elements with spatial efficiency
  const gridElements = useMemo(() => {
    const gridCount = 
      devicePerformance === 'high' ? 32 :
      devicePerformance === 'medium' ? 16 : 8;
    
    // Using golden ratio for better visual distribution
    const phi = (1 + Math.sqrt(5)) / 2;
    
    return Array.from({ length: gridCount }).map((_, i) => {
      // Use Fibonacci-like distribution for more natural-looking pattern
      const t = i / gridCount;
      const angle = 2 * Math.PI * t * phi;
      const radius = Math.sqrt(t) * 50;
      
      // Convert to cartesian coordinates
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle); 
      
      return {
        id: `grid-${i}`,
        x,
        y,
        opacity: (Math.random() * 0.05 + 0.02) * intensity
      };
    });
  }, [devicePerformance, intensity]);
  
  // Memoize motion variants for performance
  const orbMotionVariant = useMemo(() => ({
    animate: (i) => ({
      x: [20, -20, 20],
      y: [20, -20, 20],
      transition: {
        duration: 20 + (i * 7), // Stagger duration to prevent synchronized movement
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    })
  }), []);
  
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`} ref={containerRef}>
      {/* Base dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-[#0A0A18]" />
      
      {/* Background grid pattern - with optimized rendering */}
      {devicePerformance !== 'low' && (
        <div className="absolute inset-0 opacity-20">
          {gridElements.map(item => (
            <div 
              key={item.id}
              className="absolute w-px h-px border border-white/5 rounded-full"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: '1px',
                height: '1px',
                boxShadow: `0 0 15px 1px rgba(255, 255, 255, ${item.opacity})`,
                opacity: item.opacity
              }}
            />
          ))}
        </div>
      )}
      
      {/* Optimized background orbs with mathematical distribution */}
      {backgroundOrbs.map((orb, i) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            opacity: orb.opacity,
            // Use will-change for GPU acceleration
            willChange: 'transform'
          }}
          custom={i}
          variants={orbMotionVariant}
          animate="animate"
        />
      ))}
      
      {/* Cursor-following effect - only render on high/medium performance devices */}
      {mousePosition.x > 0 && devicePerformance !== 'low' && (
        <motion.div
          className="absolute w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 300,
            y: mousePosition.y - 300,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5
          }}
          style={{ 
            opacity: 0.15 * intensity,
            willChange: 'transform'
          }}
        />
      )}
      
      {/* Optimized glass overlay with conditional blur */}
      <div 
        className={`absolute inset-0 ${devicePerformance === 'low' ? 'backdrop-blur-sm' : 'backdrop-blur-md'} bg-neutral-900/30`} 
      />
      
      {/* Subtle noise texture - only on high performance devices */}
      {devicePerformance === 'high' && (
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            width: '100%',
            height: '100%'
          }}
        />
      )}
      
      {/* Simplified vignette with less expensive blend mode */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
          opacity: 0.7
        }} 
      />
    </div>
  );
};

export default OptimizedGlassBackground;
