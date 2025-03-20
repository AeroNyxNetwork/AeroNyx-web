import React from 'react';
import { motion } from 'framer-motion';

const EnhancedCard = ({
  children,
  className = '',
  interactive = true,
  variant = 'default',
  highlight = false,
  ...props
}) => {
  // Variants for different card styles
  const variants = {
    default: 'bg-neutral-800/40 border-neutral-700/30',
    elevated: 'bg-neutral-800/60 border-primary/20',
    featured: 'bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/30'
  };
  
  // Base glass effect styling
  const glassEffect = 'backdrop-blur-lg relative rounded-xl border';
  
  return (
    <motion.div
      className={`${glassEffect} ${variants[variant]} p-6 shadow-xl ${className}`}
      whileHover={interactive ? { y: -5, scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {/* Subtle highlight glow for featured cards */}
      {(variant === 'featured' || highlight) && (
        <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur-md opacity-50 -z-10" />
      )}
      
      {/* Top highlight line */}
      <div className="absolute top-0 left-5 right-5 h-px bg-white/20" />
      
      {/* Content container with proper z-index */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default EnhancedCard;
