import React from 'react';
import { motion } from 'framer-motion';

const EnhancedButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  href,
  onClick,
  ...props
}) => {
  // Base styles with enhanced glass effect
  const baseClasses = 'relative group overflow-hidden font-medium rounded-xl transition-all duration-300';
  
  // Variants with more sophisticated glass effects
  const variants = {
    primary: 'text-white',
    secondary: 'text-white border border-white/10',
    tertiary: 'bg-transparent text-primary-light hover:text-primary p-0'
  };
  
  // Sizes with better spacing
  const sizes = {
    small: 'text-sm py-2 px-4',
    medium: 'text-base py-3 px-6',
    large: 'text-lg py-4 px-8'
  };
  
  // Determine component based on href
  const ButtonComponent = motion[href ? 'a' : 'button'];
  
  return (
    <ButtonComponent
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { y: 1 } : {}}
      disabled={disabled}
      href={href}
      onClick={onClick}
      {...props}
    >
      {/* Primary Button Background */}
      {variant === 'primary' && (
        <>
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-light opacity-80" />
          
          {/* Glass overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />
          
          {/* Highlight effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/30" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-black/30" />
          
          {/* Hover reveal glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/40 blur-xl" />
        </>
      )}
      
      {/* Secondary Button Background */}
      {variant === 'secondary' && (
        <>
          {/* Glass background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          
          {/* Border glow */}
          <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-primary/30 transition-colors duration-300" />
          
          {/* Highlight effects */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
          
          {/* Hover reveal glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/10 blur-md" />
        </>
      )}
      
      {/* Tertiary Button Underline Effect */}
      {variant === 'tertiary' && (
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-primary-light"
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">
        {icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        
        <span>{children}</span>
        
        {icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </div>
    </ButtonComponent>
  );
};

export default EnhancedButton;
