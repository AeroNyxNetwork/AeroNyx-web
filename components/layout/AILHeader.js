/**
 * ============================================
 * File: components/layout/AILHeader.js
 * ============================================
 * Modification Reason: v2.3 - Apple-grade language menu and link polish.
 *   Language menu items now keep 44px touch geometry and the brand link has a
 *   stable hit area, improving desktop hover paths and tablet/mobile taps
 *   without changing navigation routes.
 *
 * Historical Notes:
 * v2.2 - Apple-grade responsive header polish.
 *   Desktop navigation now starts at the lg breakpoint instead of md so iPad
 *   and narrow tablet widths use the mobile menu rather than squeezing long
 *   protocol/product labels into one row. CTA/link tap targets keep the
 *   44px minimum interaction geometry.
 *
 *   v2.1 - Protocol-first navigation restructure.
 *   The homepage now focuses on the AeroNyx protocol layer, while MemChain
 *   and Privacy Network live on dedicated secondary pages. Header links use
 *   Next.js Link for internal routes so locale prefixes remain compatible.
 *
 * Main Functionality:
 *   - Shared responsive site header, language menu, internal navigation,
 *     external documentation/GitHub links, and Privacy Access CTA.
 *
 * Dependencies:
 *   - lib/i18n nav labels for all configured locales.
 *   - next/link and next/router for locale-aware internal routing.
 *
 * Important Note for Next Developer:
 *   - Do not point the CTA back to #download-vpn on the homepage. The product
 *     download area now belongs to pages/privacy-network.js.
 *
 * Last Modified: v2.3 - Language menu and brand hit-area polish
 * ============================================
 */

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
  
  // v2.1: protocol-first nav. Product detail pages are now secondary routes.
  const navLinks = [
    { href: "/", label: copy.nav.protocol || 'Protocol' },
    { href: "/memchain", label: copy.nav.memchain || 'MemChain' },
    { href: "/privacy-network", label: copy.nav.privacyNetwork || 'Privacy Network' },
    { href: "https://docs.aeronyx.network/", label: copy.nav.docs, external: true },
    { href: "https://github.com/AeroNyxNetwork", label: copy.nav.github, external: true }
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
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" locale={locale} className="flex min-h-[44px] items-center space-x-2">
              <AeroNyxLogo width={32} height={32} />
              <span className="text-lg font-light tracking-normal lg:text-xl">AeroNyx</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <nav className="flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-xs uppercase tracking-eyebrow text-white/60 transition-colors hover:text-white xl:text-sm"
                  >
                    {link.label}
                  </a>
                ) : link.href.startsWith('#') ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="inline-flex min-h-[44px] items-center text-xs uppercase tracking-eyebrow text-white/60 transition-colors hover:text-white xl:text-sm"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    locale={locale}
                    className="inline-flex min-h-[44px] items-center text-xs uppercase tracking-eyebrow text-white/60 transition-colors hover:text-white xl:text-sm"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>
            
            <div className="relative" data-language-menu>
              <button
                className="min-h-[44px] px-3 py-2 text-xs uppercase tracking-eyebrow text-white/60 transition-colors hover:text-white xl:text-sm"
                aria-label={copy.nav.language}
                aria-expanded={isLanguageOpen}
                onClick={() => setIsLanguageOpen((value) => !value)}
              >
                {currentLocale.short}
              </button>
              <div className={`absolute right-0 top-full w-44 pt-3 transition-all ${
                isLanguageOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}>
                <div className="border border-white/10 bg-black/95 p-2 shadow-2xl shadow-black/40">
                {SUPPORTED_LOCALES.map((item) => (
                  <Link
                    key={item.code}
                    href={router.asPath || '/'}
                    locale={item.code}
                    onClick={() => setIsLanguageOpen(false)}
                    className={`flex min-h-[44px] items-center px-3 py-2 text-sm transition-colors ${
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
              <motion.div
                className="relative flex min-h-[44px] items-center border border-white/20 px-5 py-2.5 transition-all hover:border-white/40 xl:px-6"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/privacy-network" locale={locale} className="relative z-10 text-xs uppercase tracking-eyebrow xl:text-sm">
                  {copy.nav.privacyAccess || copy.nav.downloads}
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
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
            className="lg:hidden relative z-20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
            
            <nav className="relative z-10 flex flex-col space-y-3 p-4">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-base text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                ) : link.href.startsWith('#') ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-3 py-2 text-base text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    locale={locale}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-base text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              
              <Link
                href="/privacy-network"
                locale={locale}
                onClick={() => setIsOpen(false)}
                className="mt-2 px-4 py-3 text-center border border-white/20 hover:border-white/40 transition-colors min-h-[44px] flex items-center justify-center"
              >
                {copy.nav.privacyAccess || copy.nav.downloads}
              </Link>

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
