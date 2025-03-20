// components/ui/Button.js
import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  as = 'button',
  href,
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300';
  
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-white/10 border border-white/10 text-white',
    tertiary: 'bg-transparent text-primary-light hover:text-primary p-0'
  };
  
  const sizes = {
    small: 'text-sm py-2 px-4',
    medium: 'text-base py-3 px-6',
    large: 'text-lg py-4 px-8'
  };
  
  const Component = as === 'a' ? motion.a : motion.button;
  
  return (
    <Component
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { y: 1 } : {}}
      disabled={disabled && as === 'button'}
      href={href}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </Component>
  );
};

export default Button;
