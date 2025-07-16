import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import ConstellationBackground for better performance
const ConstellationBackground = dynamic(() => import('./ConstellationBackground'), {
  ssr: false,
  loading: () => null
});

const MinimalAILBackground = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Base gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black" />
      
      {/* Constellation background */}
      <ConstellationBackground />
      
      {/* Subtle animated gradient orbs for additional mystique */}
      <div className="absolute inset-0">
        {/* Purple glow orb */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Blue glow orb */}
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Vignette effect for focus */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/50" />
      
      {/* Mobile optimization: Less complex background on small devices */}
      <style jsx>{`
        @media (max-width: 640px) {
          .blur-3xl {
            filter: blur(60px);
          }
        }
      `}</style>
    </div>
  );
};

export default MinimalAILBackground;
