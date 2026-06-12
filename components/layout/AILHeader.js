import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import AeroNyxLogo from '../ui/AeroNyxLogo';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, getMessages } from '../../lib/i18n';

const AILHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const router = useRouter();
  const locale = router.locale || DEFAULT_LOCALE;
  const copy = getMessages(locale);
  const currentLocale = SUPPORTED_LOCALES.find((item) => item.code === locale) || SUPPORTED_LOCALES[0];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickAway = (event) => {
      if (!event.target.closest('[data-language-menu]')) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, []);
  
  // Updated navigation links with proper hrefs
  const navLinks = [
    { href: "#how-it-works", label: copy.nav.technology }, // Fixed to point to how-it-works section
    { href: "#products", label: copy.nav.products },
    { href: "https://docs.aeronyx.network/", label: copy.nav.docs, external: true },
    { href: "https://github.com/AeroNyxNetwork", label: copy.nav.github, external: true },
    { href: "https://rwa.aeronyx.network/", label: copy.nav.rwa, external: true }
  ];
  
  // Handle smooth scrolling for internal links
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false); // Close mobile menu
      }
    }
  };
  
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      {/* Background that appears on scroll */}
      <motion.div 
        className="absolute inset-0 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </motion.div>
      
      {/* Navbar content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" locale={locale} className="flex items-center space-x-2">
              <AeroNyxLogo width={32} height={32} />
              <span className="text-xl font-light">AeroNyx</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            
            <div className="relative" data-language-menu>
              <button
                className="px-3 py-2 text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider"
                aria-label={copy.nav.language}
                aria-expanded={isLanguageOpen}
                onClick={() => setIsLanguageOpen((value) => !value)}
              >
                {currentLocale.short}
              </button>
              <div className={`absolute right-0 top-full w-44 pt-2 transition-all ${
                isLanguageOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}>
                <div className="border border-white/10 bg-black/95 p-2 shadow-2xl shadow-black/40">
                {SUPPORTED_LOCALES.map((item) => (
                  <Link
                    key={item.code}
                    href={router.asPath || '/'}
                    locale={item.code}
                    onClick={() => setIsLanguageOpen(false)}
                    className={`block px-3 py-2 text-sm transition-colors ${
                      item.code === locale ? 'text-white' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                </div>
              </div>
            </div>

            <div>
              <motion.a
                href="#download-vpn"
                onClick={(e) => handleNavClick(e, '#download-vpn')}
                className="relative px-6 py-2.5 border border-white/20 hover:border-white/40 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 text-sm uppercase tracking-wider">{copy.nav.downloads}</span>
              </motion.a>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="p-2 text-white/60 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
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
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
            
            <nav className="relative z-10 p-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="px-3 py-2 text-base text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
              
              <a
                href="#download-vpn"
                onClick={(e) => handleNavClick(e, '#download-vpn')}
                className="mt-2 px-4 py-3 text-center border border-white/20 hover:border-white/40 transition-colors min-h-[44px] flex items-center justify-center"
              >
                {copy.nav.downloads}
              </a>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {SUPPORTED_LOCALES.map((item) => (
                  <Link
                    key={item.code}
                    href={router.asPath || '/'}
                    locale={item.code}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 text-sm border transition-colors ${
                      item.code === locale
                        ? 'border-white/30 text-white'
                        : 'border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default AILHeader;
