import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '../../lib/hooks/useMousePosition';

const ModernGlassBackground = ({ className = '', intensity = 1 }) => {
  const containerRef = useRef(null);
  const mousePosition = useMousePosition();
  
  // Generate a set of blurred dots/orbs for the background
  const backgroundOrbs = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: `orb-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 300 + 100,
      color: i % 2 === 0 ? '#7762F3' : '#07BFD3', // Alternate between brand colors
      opacity: (Math.random() * 0.3 + 0.1) * intensity
    }));
  }, [intensity]);

  // Prepare grid elements (optional for larger screens)
  const gridElements = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: `grid-${i}`,
      x: (i % 8) * 12.5,
      y: Math.floor(i / 8) * 20,
      opacity: (Math.random() * 0.05 + 0.02) * intensity
    }));
  }, [intensity]);
  
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`} ref={containerRef}>
      {/* Base dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-[#0A0A18]" />
      
      {/* Background grid pattern - subtle structure */}
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
      
      {/* Blurred background orbs - provide depth and color */}
      {backgroundOrbs.map(orb => (
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
          }}
          animate={{
            x: [20, -20, 20],
            y: [20, -20, 20],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
      
      {/* Cursor-following highlight effect for interactivity */}
      {mousePosition.x > 0 && (
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
          style={{ opacity: 0.15 * intensity }}
        />
      )}
      
      {/* Glass overlay for depth */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-neutral-900/30" />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          width: '100%',
          height: '100%'
        }}
      />
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
          mixBlendMode: 'multiply' 
        }} 
      />
    </div>
  );
};

export default ModernGlassBackground;
