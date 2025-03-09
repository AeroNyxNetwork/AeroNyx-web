import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ className }) => {
  const containerRef = useRef(null);
  
  // Animation effect on hover
  const pathVariants = {
    initial: {
      opacity: 0.8,
      scale: 1,
    },
    hover: {
      opacity: 1,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  
  // Pulse animation for outer ring
  const pulseVariants = {
    initial: {
      opacity: 0.7,
      scale: 1,
    },
    animate: {
      opacity: [0.7, 0.9, 0.7],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  // Rotation animation for inner elements
  const rotateVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: 360,
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity
      }
    }
  };
  
  // Secondary rotation (opposite direction)
  const reverseRotateVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: -360,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity
      }
    }
  };
  
  return (
    <motion.div
      className={`relative w-24 h-24 mx-auto mb-6 rounded-full 
                  bg-gradient-to-br from-primary to-secondary 
                  flex items-center justify-center overflow-hidden shadow-lg ${className || ''}`}
      whileHover="hover"
      initial="initial"
      ref={containerRef}
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary opacity-30 blur-md"
        variants={pulseVariants}
        animate="animate"
      />
      
      {/* Main AeroNyx Logo */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <svg 
          width="42" 
          height="42" 
          viewBox="0 0 512 512" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0,512) scale(0.1,-0.1)" fill="white">
            <motion.path 
              d="M1277 3833 l-1277 -1278 0 -1275 0 -1275 1280 1280 1280 1280 -2 1273 -3 1272 -1278 -1277z"
              variants={pathVariants}
            />
            <motion.path 
              d="M3838 3833 l-1278 -1278 0 -1275 0 -1275 1280 1280 1280 1280 -2 1273-3 1272-1277 -1277z"
              variants={pathVariants}
            />
          </g>
        </svg>
      </motion.div>
      
      {/* Background animated elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={rotateVariants}
        animate="animate"
        style={{ transformOrigin: "center" }}
      >
        {/* Orbital rings */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="50" rx="40" ry="20" 
                   fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"
                   transform="rotate(30, 50, 50)" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={reverseRotateVariants}
        animate="animate"
        style={{ transformOrigin: "center" }}
      >
        {/* Secondary orbital ring */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="50" rx="35" ry="30" 
                   fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"
                   transform="rotate(60, 50, 50)" />
          
          {/* Small orbiting nodes */}
          <circle cx="85" cy="50" r="2" fill="white" opacity="0.8" />
          <circle cx="15" cy="50" r="2" fill="white" opacity="0.8" />
          <circle cx="50" cy="80" r="2" fill="white" opacity="0.8" />
          <circle cx="50" cy="20" r="2" fill="white" opacity="0.8" />
        </svg>
      </motion.div>
      
      {/* Data stream particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-300"
            initial={{ 
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0
            }}
            animate={{ 
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50
              ],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + i,
              ease: "linear",
              repeat: Infinity,
              delay: i * 0.8
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLogo;
