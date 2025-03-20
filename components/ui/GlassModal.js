import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AeroNyxLogo from '../ui/AeroNyxLogo';

const GlassModal = ({ 
  isOpen, 
  onClose, 
  title,
  description,
  children,
  showLogo = true,
  size = 'medium', // 'small', 'medium', 'large', 'full'
  maxWidth,
  hideCloseButton = false,
  animated = true,
  className = ''
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Size classes
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    full: 'max-w-5xl'
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop with blur effect */}
          <motion.div 
            className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm"
            variants={animated ? backdropVariants : {}}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal container with centered positioning */}
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <motion.div
              className={`relative w-full ${maxWidth || sizeClasses[size]} ${className}`}
              variants={animated ? modalVariants : {}}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* The glass modal */}
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl">
                {/* Glass effect background */}
                <div className="absolute inset-0 bg-neutral-900/80" />
                
                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-2xl border border-primary/20" />
                
                {/* Top edge highlight */}
                <div className="absolute top-0 left-5 right-5 h-px bg-white/20" />
                
                {/* Content area with proper z-index */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="p-6 border-b border-neutral-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {showLogo && (
                          <span className="mr-3">
                            <AeroNyxLogo width={28} height={28} />
                          </span>
                        )}
                        <div>
                          {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
                          {description && <p className="text-sm text-neutral-300 mt-1">{description}</p>}
                        </div>
                      </div>
                      
                      {!hideCloseButton && (
                        <button
                          onClick={onClose}
                          className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors bg-neutral-800/50 hover:bg-neutral-700/50"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Body */}
                  <div className="p-6">
                    {children}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlassModal;
