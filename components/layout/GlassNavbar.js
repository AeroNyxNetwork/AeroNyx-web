import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AeroNyxLogo from '../ui/AeroNyxLogo';

const GlassNavbar = ({ 
  transparent = true, 
  buttonText = "Get Started",
  buttonLink = "https://app.aeronyx.network/",
  className = '',
  navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#technology", label: "Technology" },
    { href: "https://docs.aeronyx.network/", label: "Docs" },
    { href: "https://github.com/AeroNyxNetwork", label: "GitHub" }
  ]
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Track scroll position to add background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      {/* Glass background that appears on scroll */}
      <motion.div 
        className="absolute inset-0 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled || !transparent ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-neutral-900/80" />
        
        {/* Top highlight line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </motion.div>
      
      {/* Navbar content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <AeroNyxLogo width={32} height={32} />
              <span className="text-xl font-bold">AeroNyx</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
            
            <div>
              <motion.a
                href={buttonLink}
                className="relative px-6 py-2.5 rounded-xl overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {/* Button background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-light opacity-90" />
                
                {/* Glass overlay */}
                <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />
                
                {/* Highlight effect */}
                <div className="absolute top-0 left-0 right-0 h-px bg-white/30" />
                
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/40 blur-xl" />
                
                {/* Button text */}
                <span className="relative z-10 font-medium">{buttonText}</span>
              </motion.a>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-neutral-300 hover:text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden relative z-20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Glass background */}
            <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-md" />
            
            {/* Bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/20" />
            
            <nav className="relative z-10 p-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-base font-medium text-neutral-300 hover:text-white rounded-md hover:bg-white/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              
              <a
                href={buttonLink}
                className="mt-2 px-4 py-3 text-center text-white font-medium bg-primary/80 rounded-lg hover:bg-primary transition-colors"
                onClick={() => setIsOpen(false)}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {buttonText}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Animated nav link component
const NavLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="relative text-neutral-300 hover:text-white transition-colors duration-300 py-2 font-medium"
    >
      <span>{children}</span>
      <motion.div
        className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
};

export default GlassNavbar;
