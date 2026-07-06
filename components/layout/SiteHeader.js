/**
 * ============================================
 * File: components/layout/SiteHeader.js
 * ============================================
 * Modification Reason: v2.6 - Download client CTA alignment.
 *   Aligned the shared header's primary CTA with the homepage hero CTA:
 *   both now route users directly to the Privacy Network client access
 *   surface instead of using the broader Privacy Network product label.
 *   Desktop and mobile CTA destinations share one constant to prevent future
 *   route drift.
 *
 * Modification Reason: v2.8 - Mobile menu accessibility localization.
 *   The mobile open/close aria labels now come from lib/i18n nav copy so
 *   localized pages do not expose English-only accessibility text.
 *
 * Modification Reason: v2.9 - Mobile multilingual navigation wrapping.
 *   Mobile menu links, CTA text, and language items now allow long localized
 *   labels to wrap cleanly inside their touch targets. This avoids squeezed or
 *   clipped labels on Russian, Spanish, Japanese, Korean, Traditional Chinese,
 *   and Simplified Chinese pages without changing routes or desktop layout.
 *
 * Modification Reason: v2.10 - Nodeboard operator console entry.
 *   Added the public Nodeboard link to the shared header navigation so node
 *   operators can reach the operational console from the homepage first
 *   viewport. The download CTA remains client-focused to keep user access and
 *   operator workflows visually separate.
 *
 * Modification Reason: v2.11 - Protocol-first navigation simplification.
 *   Removed Nodeboard from the global header navigation because the homepage
 *   already exposes app/operator entry points in context. The header now stays
 *   focused on protocol, MemChain, Privacy Network, Docs, GitHub, language, and
 *   the primary client access CTA.
 *
 * Historical Notes:
 * v2.5 - Source cleanup and protocol naming alignment.
 *   Renamed the shared navigation component so the active codebase matches
 *   the current protocol-first product story.
 *   Active-route presentation, Escape-to-close behavior, CTA hit areas, and
 *   mobile language tap geometry are preserved.
 *
 * Historical Notes:
 * v2.3 - Apple-grade language menu and link polish.
 *   Language menu items now keep 44px touch geometry and the brand link has a
 *   stable hit area, improving desktop hover paths and tablet/mobile taps
 *   without changing navigation routes.
 *
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
 *     external documentation/GitHub links, and Privacy Network CTA.
 *
 * Dependencies:
 *   - lib/i18n nav labels for all configured locales.
 *   - next/link and next/router for locale-aware internal routing.
 *
 * Important Note for Next Developer:
 *   - Do not point the CTA back to a homepage download anchor. Privacy Network
 *     now belongs to pages/privacy-network.js.
 *
 * Last Modified: v2.5 - Renamed active header component to SiteHeader
 * Last Modified: v2.6 - Download client CTA alignment
 * Last Modified: v2.9 - Mobile multilingual navigation wrapping
 * Last Modified: v2.10 - Nodeboard operator console navigation
 * Last Modified: v2.11 - Protocol-first navigation simplification
 * ============================================
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import AeroNyxLogo from '../ui/AeroNyxLogo';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, getMessages } from '../../lib/i18n';

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const router = useRouter();
  const locale = router.locale || DEFAULT_LOCALE;
  const copy = getMessages(locale);
  const currentLocale = SUPPORTED_LOCALES.find((item) => item.code === locale) || SUPPORTED_LOCALES[0];
  const clientAccessHref = '/privacy-network#privacy-access';
  const clientAccessLabel = copy.nav.downloadClient || copy.nav.downloads || copy.nav.privacyAccess;
  const isActiveRoute = (href) => !href.startsWith('http') && router.pathname === href;
  const desktopNavClass = (href) => (
    `relative inline-flex min-h-[44px] items-center text-xs uppercase tracking-eyebrow transition-colors xl:text-sm ${
      isActiveRoute(href)
        ? 'text-white'
        : 'text-white/60 hover:text-white'
    }`
  );
  const mobileNavClass = (href) => (
    `flex min-h-[44px] min-w-0 items-center rounded px-3 py-2 text-base leading-snug break-words transition-colors ${
      isActiveRoute(href)
        ? 'bg-white/[0.04] text-white'
        : 'text-white/60 hover:bg-white/[0.03] hover:text-white'
    }`
  );
  
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

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== 'Escape') return;
      setIsLanguageOpen(false);
      setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
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
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            <nav className="flex items-center gap-3 xl:gap-5">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={desktopNavClass(link.href)}
                  >
                    {link.label}
                  </a>
                ) : link.href.startsWith('#') ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={desktopNavClass(link.href)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    locale={locale}
                    aria-current={isActiveRoute(link.href) ? 'page' : undefined}
                    className={desktopNavClass(link.href)}
                  >
                    {link.label}
                    {isActiveRoute(link.href) && (
                      <span aria-hidden="true" className="absolute -bottom-px left-0 h-px w-full bg-brand-light/80" />
                    )}
                  </Link>
                )
              ))}
            </nav>
            
            <div className="relative" data-language-menu>
              <button
                className="min-h-[44px] px-3 py-2 text-xs uppercase tracking-eyebrow text-white/60 transition-colors hover:text-white xl:text-sm"
                aria-label={copy.nav.language}
                aria-expanded={isLanguageOpen}
                aria-haspopup="menu"
                aria-controls="language-menu"
                onClick={() => setIsLanguageOpen((value) => !value)}
              >
                {currentLocale.short}
              </button>
              <div className={`absolute right-0 top-full w-44 pt-3 transition-all ${
                isLanguageOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}>
                <div id="language-menu" role="menu" className="border border-white/10 bg-black/95 p-2 shadow-2xl shadow-black/40">
                  {SUPPORTED_LOCALES.map((item) => (
                    <Link
                      key={item.code}
                      href={router.asPath || '/'}
                      locale={item.code}
                      onClick={() => setIsLanguageOpen(false)}
                      role="menuitem"
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.985 }}
              >
                <Link
                  href={clientAccessHref}
                  locale={locale}
                  className="relative z-10 flex min-h-[44px] items-center border border-white/20 px-5 py-2.5 text-xs uppercase tracking-eyebrow transition-colors hover:border-white/40 hover:bg-white/[0.03] xl:px-6 xl:text-sm"
                >
                  {clientAccessLabel}
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              className="p-2 text-white/60 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? (copy.nav.closeMenu || 'Close menu') : (copy.nav.openMenu || 'Open menu')}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
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
            id="mobile-navigation"
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
                    className={mobileNavClass(link.href)}
                  >
                    {link.label}
                  </a>
                ) : link.href.startsWith('#') ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={mobileNavClass(link.href)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    locale={locale}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActiveRoute(link.href) ? 'page' : undefined}
                    className={mobileNavClass(link.href)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              
              <Link
                href={clientAccessHref}
                locale={locale}
                onClick={() => setIsOpen(false)}
                className="mt-2 flex min-h-[48px] min-w-0 items-center justify-center break-words border border-white/20 px-4 py-3 text-center leading-snug transition-colors hover:border-white/40 hover:bg-white/[0.03]"
              >
                {clientAccessLabel}
              </Link>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {SUPPORTED_LOCALES.map((item) => (
                  <Link
                    key={item.code}
                    href={router.asPath || '/'}
                    locale={item.code}
                    onClick={() => setIsOpen(false)}
                    className={`flex min-h-[44px] min-w-0 items-center rounded-sm border px-3 py-2 text-sm leading-snug break-words transition-colors ${
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

export default SiteHeader;
