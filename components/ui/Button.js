import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

// Button variants with purple theme
const variants = {
  primary: 'bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white',
  secondary: 'bg-opacity-10 bg-white border border-white/10 text-white',
  tertiary: 'bg-transparent text-primary-light hover:text-primary p-0'
};

// Button sizes
const sizes = {
  small: 'text-sm py-2 px-4',
  medium: 'text-base py-3 px-6',
  large: 'text-lg py-4 px-8'
};

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  href,
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 ease-out';
  
  // We'll only add the noise texture to primary buttons
  const withNoise = variant === 'primary' && (
    <div 
      className="absolute inset-0 opacity-10 mix-blend-overlay" 
      style={{ 
        backgroundImage: 'url("/textures/noise.png")',
        backgroundSize: '200px 200px' 
      }}
    />
  );
  
  // For tertiary buttons, we'll add an animated underline effect
  const underline = variant === 'tertiary' && (
    <motion.div 
      className="absolute bottom-0 left-0 h-0.5 bg-primary-light"
      initial={{ width: 0 }}
      whileHover={{ width: '100%' }}
      transition={{ duration: 0.3 }}
    />
  );
  
  // Add a subtle inner glow for primary buttons - with purple glow
  const glow = variant === 'primary' && (
    <div className="absolute inset-0 rounded-lg opacity-20 blur-md bg-gradient-to-r from-primary-light to-secondary-light" />
  );

  const ButtonComponent = motion[href ? 'a' : 'button'];

  return (
    <ButtonComponent
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        // Added text shadow for better readability
        'text-shadow-sm',
        className
      )}
      whileHover={!disabled ? { y: -2, boxShadow: '0 10px 20px -10px rgba(119, 98, 243, 0.5)' } : {}}
      whileTap={!disabled ? { y: 1 } : {}}
      disabled={disabled}
      href={href}
      {...props}
    >
      {glow}
      {withNoise}
      
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      <span className="relative z-10">{children}</span>
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
      
      {underline}
    </ButtonComponent>
  );
};

export default Button;
