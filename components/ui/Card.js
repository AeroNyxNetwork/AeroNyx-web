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
        'bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-6',
        interactive && 'hover:border-primary/30 transition-all duration-300',
        className
      )}
      whileHover={
        interactive 
          ? { 
              y: -5, 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              borderColor: 'rgba(110, 86, 207, 0.3)'
            } 
          : {}
      }
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
