import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define the star data for each constellation
// Enhanced brightness and size values for more striking appearance
const CONSTELLATIONS = [
  {
    name: 'Aries',
    stars: [
      { x: 0.2, y: 0.3, size: 3, brightness: 0.95 },
      { x: 0.25, y: 0.35, size: 2.5, brightness: 0.98 },
      { x: 0.3, y: 0.4, size: 3.5, brightness: 1 },
      { x: 0.35, y: 0.38, size: 2.8, brightness: 0.96 },
      { x: 0.4, y: 0.36, size: 3, brightness: 0.9 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
  },
  {
    name: 'Taurus',
    stars: [
      { x: 0.15, y: 0.65, size: 3.5, brightness: 1 },
      { x: 0.2, y: 0.6, size: 2.8, brightness: 0.9 },
      { x: 0.25, y: 0.55, size: 3, brightness: 0.95 },
      { x: 0.3, y: 0.58, size: 2.5, brightness: 0.85 },
      { x: 0.22, y: 0.68, size: 3.2, brightness: 0.98 },
      { x: 0.28, y: 0.63, size: 2.7, brightness: 0.9 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 2]]
  },
  {
    name: 'Gemini',
    stars: [
      { x: 0.6, y: 0.2, size: 3, brightness: 0.98 },
      { x: 0.65, y: 0.25, size: 3.2, brightness: 1 },
      { x: 0.63, y: 0.3, size: 2.5, brightness: 0.9 },
      { x: 0.67, y: 0.35, size: 2.8, brightness: 0.95 },
      { x: 0.7, y: 0.22, size: 3, brightness: 0.98 },
      { x: 0.73, y: 0.28, size: 2.7, brightness: 0.9 },
      { x: 0.75, y: 0.33, size: 2.9, brightness: 0.95 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6]]
  },
  {
    name: 'Cancer',
    stars: [
      { x: 0.75, y: 0.6, size: 2.8, brightness: 0.9 },
      { x: 0.8, y: 0.65, size: 3, brightness: 0.98 },
      { x: 0.77, y: 0.7, size: 2.5, brightness: 0.85 },
      { x: 0.83, y: 0.68, size: 2.7, brightness: 0.95 },
      { x: 0.78, y: 0.63, size: 2.6, brightness: 0.9 }
    ],
    lines: [[0, 1], [1, 3], [3, 2], [2, 4], [4, 0]]
  },
  {
    name: 'Leo',
    stars: [
      { x: 0.35, y: 0.15, size: 3.5, brightness: 1 },
      { x: 0.4, y: 0.18, size: 3, brightness: 0.98 },
      { x: 0.43, y: 0.22, size: 2.8, brightness: 0.95 },
      { x: 0.38, y: 0.25, size: 3.2, brightness: 0.98 },
      { x: 0.33, y: 0.2, size: 2.7, brightness: 0.9 },
      { x: 0.45, y: 0.15, size: 2.9, brightness: 0.95 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 5]]
  },
  {
    name: 'Virgo',
    stars: [
      { x: 0.55, y: 0.45, size: 3.2, brightness: 0.98 },
      { x: 0.6, y: 0.48, size: 2.8, brightness: 0.95 },
      { x: 0.57, y: 0.52, size: 3, brightness: 0.98 },
      { x: 0.63, y: 0.55, size: 2.7, brightness: 0.9 },
      { x: 0.58, y: 0.58, size: 2.9, brightness: 0.95 },
      { x: 0.53, y: 0.5, size: 2.6, brightness: 0.85 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2]]
  },
  {
    name: 'Libra',
    stars: [
      { x: 0.1, y: 0.45, size: 3, brightness: 0.98 },
      { x: 0.15, y: 0.5, size: 3.2, brightness: 0.98 },
      { x: 0.05, y: 0.48, size: 2.8, brightness: 0.95 },
      { x: 0.12, y: 0.55, size: 2.9, brightness: 0.96 }
    ],
    lines: [[0, 1], [0, 2], [1, 3]]
  },
  {
    name: 'Scorpio',
    stars: [
      { x: 0.9, y: 0.3, size: 3.3, brightness: 1 },
      { x: 0.85, y: 0.35, size: 3, brightness: 0.98 },
      { x: 0.88, y: 0.4, size: 2.8, brightness: 0.95 },
      { x: 0.83, y: 0.45, size: 3.1, brightness: 0.98 },
      { x: 0.86, y: 0.5, size: 2.9, brightness: 0.98 },
      { x: 0.81, y: 0.55, size: 2.7, brightness: 0.9 },
      { x: 0.84, y: 0.6, size: 3, brightness: 0.95 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
  },
  {
    name: 'Sagittarius',
    stars: [
      { x: 0.2, y: 0.8, size: 3.2, brightness: 0.98 },
      { x: 0.25, y: 0.85, size: 2.9, brightness: 0.95 },
      { x: 0.3, y: 0.82, size: 3, brightness: 0.98 },
      { x: 0.28, y: 0.75, size: 2.7, brightness: 0.9 },
      { x: 0.23, y: 0.78, size: 2.8, brightness: 0.95 },
      { x: 0.18, y: 0.83, size: 3.1, brightness: 0.98 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]]
  },
  {
    name: 'Capricorn',
    stars: [
      { x: 0.5, y: 0.75, size: 3, brightness: 0.98 },
      { x: 0.55, y: 0.8, size: 2.8, brightness: 0.95 },
      { x: 0.52, y: 0.85, size: 3.1, brightness: 0.98 },
      { x: 0.48, y: 0.82, size: 2.9, brightness: 0.98 },
      { x: 0.45, y: 0.78, size: 2.7, brightness: 0.9 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]
  },
  {
    name: 'Aquarius',
    stars: [
      { x: 0.7, y: 0.8, size: 3.2, brightness: 0.98 },
      { x: 0.75, y: 0.85, size: 2.9, brightness: 0.95 },
      { x: 0.73, y: 0.9, size: 3, brightness: 0.98 },
      { x: 0.68, y: 0.87, size: 2.8, brightness: 0.95 },
      { x: 0.65, y: 0.83, size: 3.1, brightness: 0.98 },
      { x: 0.78, y: 0.82, size: 2.7, brightness: 0.9 }
    ],
    lines: [[0, 1], [1, 2], [1, 5], [0, 3], [3, 4]]
  },
  {
    name: 'Pisces',
    stars: [
      { x: 0.4, y: 0.65, size: 3, brightness: 0.98 },
      { x: 0.45, y: 0.7, size: 2.8, brightness: 0.95 },
      { x: 0.5, y: 0.68, size: 3.1, brightness: 0.98 },
      { x: 0.48, y: 0.63, size: 2.9, brightness: 0.98 },
      { x: 0.43, y: 0.6, size: 2.7, brightness: 0.9 },
      { x: 0.55, y: 0.65, size: 3, brightness: 0.95 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 5]]
  }
];

const EnhancedConstellationBackground = ({ className }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [activeConstellation, setActiveConstellation] = useState(null);
  
  // Select a random constellation on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * CONSTELLATIONS.length);
    setActiveConstellation(CONSTELLATIONS[randomIndex]);
  }, []);
  
  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Draw the enhanced constellation with brighter stars
  useEffect(() => {
    if (!canvasRef.current || !activeConstellation) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = dimensions;
    
    // Animation function for the constellation
    const animateStars = (timestamp) => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Create a deep dark blue background
      ctx.fillStyle = 'rgba(10, 10, 30, 0.98)';
      ctx.fillRect(0, 0, width, height);
      
      // Add a subtle gradient overlay for depth
      const bgGradient = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.8
      );
      bgGradient.addColorStop(0, 'rgba(25, 25, 50, 0.4)');
      bgGradient.addColorStop(1, 'rgba(10, 10, 30, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw small background stars (more of them for a richer sky)
      for (let i = 0; i < 250; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.2 + 0.3;
        
        // Twinkle effect - make some stars randomly brighter
        const twinkle = Math.sin(timestamp * 0.001 + i) * 0.3 + 0.7;
        const opacity = (Math.random() * 0.5 + 0.3) * twinkle;
        
        // Draw star with subtle glow
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
        
        // Add subtle glow to some stars
        if (size > 1) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
          glow.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.5})`);
          glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(x, y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }
      
      // Draw constellation lines first (so they appear behind the stars)
      // Enhanced line appearance
      const lineOpacity = Math.sin(timestamp * 0.0005) * 0.1 + 0.5; // More visible lines
      ctx.strokeStyle = `rgba(119, 98, 243, ${lineOpacity})`;
      ctx.lineWidth = 1.5; // Thicker lines

      // Add glow effect to lines
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(119, 98, 243, 0.5)';
      
      activeConstellation.lines.forEach(line => {
        const star1 = activeConstellation.stars[line[0]];
        const star2 = activeConstellation.stars[line[1]];
        
        ctx.beginPath();
        ctx.moveTo(star1.x * width, star1.y * height);
        ctx.lineTo(star2.x * width, star2.y * height);
        ctx.stroke();
      });

      // Reset shadow for stars
      ctx.shadowBlur = 0;
      
      // Draw enhanced constellation stars with subtle pulsing
      const time = timestamp * 0.001;
      
      activeConstellation.stars.forEach((star, index) => {
        const x = star.x * width;
        const y = star.y * height;
        
        // More pronounced pulsing effect
        const pulsingFactor = Math.sin(time * 0.5 + index * 0.2) * 0.15 + 0.95;
        const size = star.size * pulsingFactor;
        const brightness = star.brightness * pulsingFactor;
        
        // Create a more dramatic star glow effect
        const starGlow = ctx.createRadialGradient(x, y, 0, x, y, size * 8);
        
        // Use brand purple color for the glow with increased intensity
        starGlow.addColorStop(0, `rgba(255, 255, 255, ${brightness})`); // White core
        starGlow.addColorStop(0.1, `rgba(180, 180, 255, ${brightness * 0.8})`); // Bluish transition
        starGlow.addColorStop(0.3, `rgba(119, 98, 243, ${brightness * 0.6})`); // Brand purple
        starGlow.addColorStop(1, 'rgba(119, 98, 243, 0)'); // Fade out
        
        // Draw larger glow area
        ctx.beginPath();
        ctx.arc(x, y, size * 8, 0, Math.PI * 2);
        ctx.fillStyle = starGlow;
        ctx.fill();
        
        // Draw main star (white core)
        ctx.beginPath();
        ctx.arc(x, y, size * 1.2, 0, Math.PI * 2); // Slightly larger core
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.fill();
        
        // Add a subtle lens flare effect to major stars
        if (star.size > 3) {
          // Horizontal flare
          ctx.beginPath();
          ctx.moveTo(x - size * 15, y);
          ctx.lineTo(x + size * 15, y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${brightness * 0.1})`;
          ctx.lineWidth = size * 0.3;
          ctx.stroke();
          
          // Vertical flare
          ctx.beginPath();
          ctx.moveTo(x, y - size * 15);
          ctx.lineTo(x, y + size * 15);
          ctx.strokeStyle = `rgba(255, 255, 255, ${brightness * 0.1})`;
          ctx.lineWidth = size * 0.3;
          ctx.stroke();
        }
      });
      
      requestAnimationFrame(animateStars);
    };
    
    const animation = requestAnimationFrame(animateStars);
    
    return () => {
      cancelAnimationFrame(animation);
    };
  }, [activeConstellation, dimensions]);
  
  return (
    <div className={`fixed inset-0 pointer-events-none ${className || ''}`}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
      />
      
      {/* Constellation name with enhanced styling */}
      {activeConstellation && (
        <motion.div 
          className="absolute bottom-6 right-6 text-white opacity-60 pointer-events-none flex flex-col items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
        >
          <div className="text-xs uppercase tracking-widest mb-1">Constellation</div>
          <div className="text-xl font-light">{activeConstellation.name}</div>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedConstellationBackground;
