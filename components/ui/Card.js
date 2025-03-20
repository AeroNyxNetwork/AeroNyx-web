// components/ui/Card.js
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className, 
  interactive = true,
  ...props 
}) => {
  return (
    <motion.div
      className={`bg-neutral-800/70 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-6 shadow-lg ${className}`}
      whileHover={interactive ? { y: -5 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
