import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className, 
  interactive = true,
  ...props 
}) => {
  return (
    <motion.div
      className={clsx(
        // Enhanced card styling for better visibility
        'bg-neutral-800/70 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-6',
        // Added shadow for depth and improved text contrast
        'shadow-lg relative z-10',
        interactive && 'hover:border-primary/40 transition-all duration-300',
        className
      )}
      whileHover={
        interactive 
          ? { 
              y: -5, 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
              borderColor: 'rgba(119, 98, 243, 0.4)' // Updated to purple
            } 
          : {}
      }
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Add a subtle inner container for better content visibility */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
