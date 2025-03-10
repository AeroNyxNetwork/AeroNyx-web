import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import AeroNyxLogo from '../ui/AeroNyxLogo';

const NavLink = ({ href, children, onClick }) => {
  return (
    <Link 
      href={href}
      className="relative text-neutral-200 hover:text-white transition-colors duration-300 py-2"
      onClick={onClick}
    >
      <span>{children}</span>
      <motion.span 
        className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform header based on scroll position
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(13, 13, 24, 0)', 'rgba(13, 13, 24, 0.9)']
  );
  
  const headerBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(8px)']
  );
  
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ 
        backgroundColor: headerBg,
        backdropFilter: headerBlur
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          {/* Replace the old logo with the new AeroNyx SVG logo */}
          <span className="h-10 w-10 flex items-center justify-center">
            <AeroNyxLogo width={40} height={40} />
          </span>
          <span className="text-xl font-bold">AeroNyx</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#technology">Technology</NavLink>
           <NavLink href="https://docs.aeronyx.network/" onClick={() => setIsOpen(false)}>Docs</NavLink>
        </nav>
        
        <div className="hidden md:block">
           <Button as="a" href="https://app.aeronyx.network/" target="_blank" rel="noopener noreferrer">Get Started</Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden absolute top-full left-0 right-0 bg-neutral-800 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-4 flex flex-col space-y-3">
            <NavLink href="#features" onClick={() => setIsOpen(false)}>Features</NavLink>
            <NavLink href="#how-it-works" onClick={() => setIsOpen(false)}>How It Works</NavLink>
            <NavLink href="#technology" onClick={() => setIsOpen(false)}>Technology</NavLink>
            <NavLink href="https://docs.aeronyx.network/" onClick={() => setIsOpen(false)}>Docs</NavLink>
        
            <Button fullWidth as="a" href="https://app.aeronyx.network/" target="_blank" rel="noopener noreferrer">Get Started</Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
