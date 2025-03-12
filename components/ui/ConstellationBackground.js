import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define the star data for each constellation
// Each constellation has an array of stars with positions
const CONSTELLATIONS = [
  {
    name: 'Aries',
    stars: [
      { x: 0.2, y: 0.3, size: 2, brightness: 0.8 },
      { x: 0.25, y: 0.35, size: 1.5, brightness: 0.9 },
      { x: 0.3, y: 0.4, size: 2.5, brightness: 1 },
      { x: 0.35, y: 0.38, size: 1.8, brightness: 0.85 },
      { x: 0.4, y: 0.36, size: 2, brightness: 0.7 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
  },
  {
    name: 'Taurus',
    stars: [
      { x: 0.15, y: 0.65, size: 2.5, brightness: 1 },
      { x: 0.2, y: 0.6, size: 1.8, brightness: 0.8 },
      { x: 0.25, y: 0.55, size: 2, brightness: 0.85 },
      { x: 0.3, y: 0.58, size: 1.5, brightness: 0.7 },
      { x: 0.22, y: 0.68, size: 2.2, brightness: 0.9 },
      { x: 0.28, y: 0.63, size: 1.7, brightness: 0.75 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 2]]
  },
  {
    name: 'Gemini',
    stars: [
      { x: 0.6, y: 0.2, size: 2, brightness: 0.9 },
      { x: 0.65, y: 0.25, size: 2.2, brightness: 1 },
      { x: 0.63, y: 0.3, size: 1.5, brightness: 0.8 },
      { x: 0.67, y: 0.35, size: 1.8, brightness: 0.85 },
      { x: 0.7, y: 0.22, size: 2, brightness: 0.9 },
      { x: 0.73, y: 0.28, size: 1.7, brightness: 0.8 },
      { x: 0.75, y: 0.33, size: 1.9, brightness: 0.85 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6]]
  },
  {
    name: 'Cancer',
    stars: [
      { x: 0.75, y: 0.6, size: 1.8, brightness: 0.8 },
      { x: 0.8, y: 0.65, size: 2, brightness: 0.9 },
      { x: 0.77, y: 0.7, size: 1.5, brightness: 0.75 },
      { x: 0.83, y: 0.68, size: 1.7, brightness: 0.85 },
      { x: 0.78, y: 0.63, size: 1.6, brightness: 0.8 }
    ],
    lines: [[0, 1], [1, 3], [3, 2], [2, 4], [4, 0]]
  },
  {
    name: 'Leo',
    stars: [
      { x: 0.35, y: 0.15, size: 2.5, brightness: 1 },
      { x: 0.4, y: 0.18, size: 2, brightness: 0.9 },
      { x: 0.43, y: 0.22, size: 1.8, brightness: 0.85 },
      { x: 0.38, y: 0.25, size: 2.2, brightness: 0.95 },
      { x: 0.33, y: 0.2, size: 1.7, brightness: 0.8 },
      { x: 0.45, y: 0.15, size: 1.9, brightness: 0.85 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 5]]
  },
  {
    name: 'Virgo',
    stars: [
      { x: 0.55, y: 0.45, size: 2.2, brightness: 0.95 },
      { x: 0.6, y: 0.48, size: 1.8, brightness: 0.85 },
      { x: 0.57, y: 0.52, size: 2, brightness: 0.9 },
      { x: 0.63, y: 0.55, size: 1.7, brightness: 0.8 },
      { x: 0.58, y: 0.58, size: 1.9, brightness: 0.85 },
      { x: 0.53, y: 0.5, size: 1.6, brightness: 0.75 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2]]
  },
  {
    name: 'Libra',
    stars: [
      { x: 0.1, y: 0.45, size: 2, brightness: 0.9 },
      { x: 0.15, y: 0.5, size: 2.2, brightness: 0.95 },
      { x: 0.05, y: 0.48, size: 1.8, brightness: 0.85 },
      { x: 0.12, y: 0.55, size: 1.9, brightness: 0.88 }
    ],
    lines: [[0, 1], [0, 2], [1, 3]]
  },
  {
    name: 'Scorpio',
    stars: [
      { x: 0.9, y: 0.3, size: 2.3, brightness: 1 },
      { x: 0.85, y: 0.35, size: 2, brightness: 0.9 },
      { x: 0.88, y: 0.4, size: 1.8, brightness: 0.85 },
      { x: 0.83, y: 0.45, size: 2.1, brightness: 0.95 },
      { x: 0.86, y: 0.5, size: 1.9, brightness: 0.9 },
      { x: 0.81, y: 0.55, size: 1.7, brightness: 0.8 },
      { x: 0.84, y: 0.6, size: 2, brightness: 0.85 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
  },
  {
    name: 'Sagittarius',
    stars: [
      { x: 0.2, y: 0.8, size: 2.2, brightness: 0.95 },
      { x: 0.25, y: 0.85, size: 1.9, brightness: 0.85 },
      { x: 0.3, y: 0.82, size: 2, brightness: 0.9 },
      { x: 0.28, y: 0.75, size: 1.7, brightness: 0.8 },
      { x: 0.23, y: 0.78, size: 1.8, brightness: 0.85 },
      { x: 0.18, y: 0.83, size: 2.1, brightness: 0.9 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]]
  },
  {
    name: 'Capricorn',
    stars: [
      { x: 0.5, y: 0.75, size: 2, brightness: 0.9 },
      { x: 0.55, y: 0.8, size: 1.8, brightness: 0.85 },
      { x: 0.52, y: 0.85, size: 2.1, brightness: 0.95 },
      { x: 0.48, y: 0.82, size: 1.9, brightness: 0.9 },
      { x: 0.45, y: 0.78, size: 1.7, brightness: 0.8 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]
  },
  {
    name: 'Aquarius',
    stars: [
      { x: 0.7, y: 0.8, size: 2.2, brightness: 0.95 },
      { x: 0.75, y: 0.85, size: 1.9, brightness: 0.85 },
      { x: 0.73, y: 0.9, size: 2, brightness: 0.9 },
      { x: 0.68, y: 0.87, size: 1.8, brightness: 0.85 },
      { x: 0.65, y: 0.83, size: 2.1, brightness: 0.95 },
      { x: 0.78, y: 0.82, size: 1.7, brightness: 0.8 }
    ],
    lines: [[0, 1], [1, 2], [1, 5], [0, 3], [3, 4]]
  },
  {
    name: 'Pisces',
    stars: [
      { x: 0.4, y: 0.65, size: 2, brightness: 0.9 },
      { x: 0.45, y: 0.7, size: 1.8, brightness: 0.85 },
      { x: 0.5, y: 0.68, size: 2.1, brightness: 0.95 },
      { x: 0.48, y: 0.63, size: 1.9, brightness: 0.9 },
      { x: 0.43, y: 0.6, size: 1.7, brightness: 0.8 },
      { x: 0.55, y: 0.65, size: 2, brightness: 0.85 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 5]]
  }
];

const ConstellationBackground = ({ className }) => {
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
  
  // Draw the constellation
  useEffect(() => {
    if (!canvasRef.current || !activeConstellation) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = dimensions;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Background color
    ctx.fillStyle = 'rgba(13, 13, 24, 0.99)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw stars (scattered all over)
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 1.5;
      const opacity = Math.random() * 0.5 + 0.3;
      
      // Draw star
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }
    
    // Draw constellation stars
    activeConstellation.stars.forEach(star => {
      const x = star.x * width;
      const y = star.y * height;
      const size = star.size;
      const brightness = star.brightness;
      
      // Draw main star
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.fill();
      
      // Draw glow
      const gradient = ctx.createRadialGradient(x, y, size, x, y, size * 4);
      gradient.addColorStop(0, `rgba(119, 98, 243, ${brightness * 0.8})`);
      gradient.addColorStop(1, 'rgba(119, 98, 243, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, size * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });
    
    // Draw constellation lines
    ctx.strokeStyle = 'rgba(119, 98, 243, 0.3)';
    ctx.lineWidth = 1;
    
    activeConstellation.lines.forEach(line => {
      const star1 = activeConstellation.stars[line[0]];
      const star2 = activeConstellation.stars[line[1]];
      
      ctx.beginPath();
      ctx.moveTo(star1.x * width, star1.y * height);
      ctx.lineTo(star2.x * width, star2.y * height);
      ctx.stroke();
    });
    
    // Add subtle animation using requestAnimationFrame
    const animateStars = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Background color
      ctx.fillStyle = 'rgba(13, 13, 24, 0.99)';
      ctx.fillRect(0, 0, width, height);
      
      // Draw background stars with subtle twinkling
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.5;
        const opacity = Math.random() * 0.5 + 0.3;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
      
      // Draw constellation stars with subtle pulsing
      const time = Date.now() * 0.001;
      
      activeConstellation.stars.forEach((star, index) => {
        const x = star.x * width;
        const y = star.y * height;
        const pulsingFactor = Math.sin(time + index) * 0.2 + 0.8;
        const size = star.size * pulsingFactor;
        const brightness = star.brightness * pulsingFactor;
        
        // Draw main star
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.fill();
        
        // Draw glow
        const gradient = ctx.createRadialGradient(x, y, size, x, y, size * 4);
        gradient.addColorStop(0, `rgba(119, 98, 243, ${brightness * 0.8})`);
        gradient.addColorStop(1, 'rgba(119, 98, 243, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      // Draw constellation lines with subtle opacity changes
      const lineOpacity = Math.sin(time) * 0.1 + 0.3;
      ctx.strokeStyle = `rgba(119, 98, 243, ${lineOpacity})`;
      ctx.lineWidth = 1;
      
      activeConstellation.lines.forEach(line => {
        const star1 = activeConstellation.stars[line[0]];
        const star2 = activeConstellation.stars[line[1]];
        
        ctx.beginPath();
        ctx.moveTo(star1.x * width, star1.y * height);
        ctx.lineTo(star2.x * width, star2.y * height);
        ctx.stroke();
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
      
      {/* Optional: Add constellation name */}
      {activeConstellation && (
        <motion.div 
          className="absolute bottom-4 right-4 text-white text-opacity-30 text-sm pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {activeConstellation.name}
        </motion.div>
      )}
    </div>
  );
};

export default ConstellationBackground;
