import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ConstellationBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef(null);
  const constellationsRef = useRef([]);
  
  // 12 Zodiac constellations with their star patterns
  const zodiacConstellations = [
    {
      name: 'Aries',
      stars: [[0.2, 0.3], [0.25, 0.25], [0.3, 0.3], [0.35, 0.35], [0.25, 0.35]],
      connections: [[0, 1], [1, 2], [2, 3], [1, 4]]
    },
    {
      name: 'Taurus',
      stars: [[0.7, 0.2], [0.75, 0.15], [0.8, 0.2], [0.75, 0.25], [0.85, 0.15], [0.9, 0.1]],
      connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5]]
    },
    {
      name: 'Gemini',
      stars: [[0.1, 0.7], [0.15, 0.65], [0.1, 0.75], [0.15, 0.8], [0.2, 0.7], [0.2, 0.75]],
      connections: [[0, 1], [2, 3], [1, 4], [3, 5], [4, 5]]
    },
    {
      name: 'Cancer',
      stars: [[0.8, 0.8], [0.85, 0.75], [0.9, 0.8], [0.85, 0.85], [0.95, 0.75]],
      connections: [[0, 1], [1, 2], [0, 3], [2, 4]]
    },
    {
      name: 'Leo',
      stars: [[0.3, 0.6], [0.35, 0.55], [0.4, 0.6], [0.35, 0.65], [0.45, 0.55], [0.5, 0.6]],
      connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5]]
    },
    {
      name: 'Virgo',
      stars: [[0.6, 0.4], [0.65, 0.35], [0.7, 0.4], [0.65, 0.45], [0.75, 0.35], [0.8, 0.4]],
      connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5], [3, 5]]
    },
    {
      name: 'Libra',
      stars: [[0.15, 0.4], [0.2, 0.35], [0.25, 0.4], [0.2, 0.45], [0.3, 0.35]],
      connections: [[0, 1], [1, 2], [0, 3], [2, 4], [3, 4]]
    },
    {
      name: 'Scorpio',
      stars: [[0.5, 0.7], [0.55, 0.65], [0.6, 0.7], [0.65, 0.75], [0.7, 0.7], [0.75, 0.65], [0.8, 0.7]],
      connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
    },
    {
      name: 'Sagittarius',
      stars: [[0.4, 0.2], [0.45, 0.15], [0.5, 0.2], [0.45, 0.25], [0.55, 0.15], [0.6, 0.2]],
      connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5]]
    },
    {
      name: 'Capricorn',
      stars: [[0.1, 0.1], [0.15, 0.05], [0.2, 0.1], [0.15, 0.15], [0.25, 0.05], [0.3, 0.1]],
      connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5], [3, 5]]
    },
    {
      name: 'Aquarius',
      stars: [[0.7, 0.5], [0.75, 0.45], [0.8, 0.5], [0.75, 0.55], [0.85, 0.45], [0.9, 0.5]],
      connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5]]
    },
    {
      name: 'Pisces',
      stars: [[0.3, 0.8], [0.35, 0.75], [0.4, 0.8], [0.35, 0.85], [0.45, 0.75], [0.5, 0.8], [0.45, 0.85]],
      connections: [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [3, 6], [5, 6]]
    }
  ];
  
  // Initialize constellations with random properties
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Initialize constellation instances
    constellationsRef.current = zodiacConstellations.map((constellation, index) => ({
      ...constellation,
      opacity: 0,
      targetOpacity: 0,
      fadeSpeed: 0.002 + Math.random() * 0.003,
      nextAppearTime: Date.now() + Math.random() * 10000,
      displayDuration: 8000 + Math.random() * 4000,
      scale: 0.8 + Math.random() * 0.4,
      rotation: Math.random() * Math.PI * 2,
      offsetX: Math.random() * 0.2 - 0.1,
      offsetY: Math.random() * 0.2 - 0.1,
      twinklePhase: Math.random() * Math.PI * 2
    }));
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const now = Date.now();
      
      // Update and draw each constellation
      constellationsRef.current.forEach((constellation, index) => {
        // Handle appearance and disappearance
        if (constellation.opacity === 0 && now >= constellation.nextAppearTime) {
          constellation.targetOpacity = 0.6 + Math.random() * 0.4;
          constellation.disappearTime = now + constellation.displayDuration;
        } else if (constellation.opacity > 0 && now >= constellation.disappearTime) {
          constellation.targetOpacity = 0;
          constellation.nextAppearTime = now + 5000 + Math.random() * 15000;
          constellation.displayDuration = 8000 + Math.random() * 4000;
          // Randomize position for next appearance
          constellation.offsetX = Math.random() * 0.2 - 0.1;
          constellation.offsetY = Math.random() * 0.2 - 0.1;
          constellation.rotation = Math.random() * Math.PI * 2;
        }
        
        // Smooth opacity transition
        if (constellation.opacity < constellation.targetOpacity) {
          constellation.opacity = Math.min(constellation.opacity + constellation.fadeSpeed, constellation.targetOpacity);
        } else if (constellation.opacity > constellation.targetOpacity) {
          constellation.opacity = Math.max(constellation.opacity - constellation.fadeSpeed, constellation.targetOpacity);
        }
        
        if (constellation.opacity > 0) {
          ctx.save();
          
          // Apply transformations
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          ctx.translate(centerX, centerY);
          ctx.rotate(constellation.rotation);
          ctx.scale(constellation.scale, constellation.scale);
          ctx.translate(-centerX, -centerY);
          
          // Draw connections
          ctx.strokeStyle = `rgba(119, 98, 243, ${constellation.opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          
          constellation.connections.forEach(([start, end]) => {
            const star1 = constellation.stars[start];
            const star2 = constellation.stars[end];
            const x1 = (star1[0] + constellation.offsetX) * canvas.width;
            const y1 = (star1[1] + constellation.offsetY) * canvas.height;
            const x2 = (star2[0] + constellation.offsetX) * canvas.width;
            const y2 = (star2[1] + constellation.offsetY) * canvas.height;
            
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          });
          
          ctx.stroke();
          
          // Draw stars
          constellation.stars.forEach((star, starIndex) => {
            const x = (star[0] + constellation.offsetX) * canvas.width;
            const y = (star[1] + constellation.offsetY) * canvas.height;
            
            // Twinkling effect
            constellation.twinklePhase += 0.02;
            const twinkle = 0.7 + Math.sin(constellation.twinklePhase + starIndex) * 0.3;
            
            // Star glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${constellation.opacity * twinkle})`);
            gradient.addColorStop(0.2, `rgba(119, 98, 243, ${constellation.opacity * 0.8 * twinkle})`);
            gradient.addColorStop(1, 'rgba(119, 98, 243, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();
            
            // Star core
            ctx.fillStyle = `rgba(255, 255, 255, ${constellation.opacity * twinkle})`;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          });
          
          ctx.restore();
        }
      });
      
      // Add some ambient stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      for (let i = 0; i < 100; i++) {
        const x = (Math.sin(i * 1.2) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(i * 0.8) * 0.5 + 0.5) * canvas.height;
        const size = Math.sin(now * 0.001 + i) * 0.5 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);
  
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full constellation-canvas"
        style={{ 
          background: 'transparent',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.8
        }}
      />
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
    </div>
  );
};

export default ConstellationBackground;
