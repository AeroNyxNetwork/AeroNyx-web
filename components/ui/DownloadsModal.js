/**
 * ============================================
 * File: components/ui/DownloadsModal.js
 * ============================================
 * Modification Reason: v2.0 - Internationalized client download modal.
 *   The shared client-download surface now reads from lib/i18n, preserves
 *   44px+ touch targets, and uses the same restrained square geometry as the
 *   rest of the 2026 AeroNyx website. This prevents localized pages from
 *   opening an English-only, legacy-styled modal.
 *
 * Main Functionality:
 *   - Detects the user's OS and promotes the matching AeroNyx client first.
 *   - Lists all supported desktop/mobile platforms.
 *   - Keeps external download URL behavior unchanged.
 *
 * Dependencies:
 *   - lib/hooks/useOsDetection
 *   - lib/i18n
 *   - components/ui/AeroNyxLogo
 *
 * Important Note for Next Developer:
 *   - Do not change download URLs here unless release binaries change.
 *   - Keep the modal node-blind/privacy network wording aligned with
 *     PrivacyAccessSection and lib/i18n.downloadsModal.
 *
 * Last Modified: v2.0 - Internationalized client download modal
 * ============================================
 */

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import useOsDetection from '../../lib/hooks/useOsDetection';
import AeroNyxLogo from './AeroNyxLogo';
import { DEFAULT_LOCALE, getMessages } from '../../lib/i18n';

// OS Icons as React Components
const MacOSIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18c.85.36 1.9.36 3 .36 1.02 0 1.85 0 2.62-.23M21 15c.24-.95.34-2.03.37-3.06.05-1.79-.2-4.09-1.97-5.44-1.76-1.36-4.48-.75-6.4 0-1.89.73-4.67 1.26-6.23-.32C5.46 4.46 6.2 2 6.2 2c-1.8 1.03-3.2 3.06-3.2 6 0 7.66 5.4 10 5.4 10 0-2.28 1.38-4.55 3.4-5.95" />
    <path d="M7.7 18.8C7.4 18.4 6.35 17.7 5.5 17.7c-1 0-1.75.24-2.5.7 0 0 1.4 1.4 2.8 1.4.83 0 1.16-.13 1.9-1" />
  </svg>
);

const WindowsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 10.5H17.5V20.5H6.5V10.5Z" />
    <path d="M8.5 3.5H15.5V10.5H8.5V3.5Z" />
    <path d="M11.5 20.5V10.5" />
    <path d="M11.5 10.5V3.5" />
  </svg>
);

const AndroidIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 16V8C5 5.79086 6.79086 4 9 4H15C17.2091 4 19 5.79086 19 8V16C19 18.2091 17.2091 20 15 20H9C6.79086 20 5 18.2091 5 16Z" />
    <rect x="7" y="14" width="10" height="2" rx="1" />
    <rect x="9" y="6" width="6" height="1" rx="0.5" />
  </svg>
);

const LinuxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <path d="M9 8.5C9 7.67157 9.67157 7 10.5 7C11.3284 7 12 7.67157 12 8.5" />
    <path d="M12 8.5C12 7.67157 12.6716 7 13.5 7C14.3284 7 15 7.67157 15 8.5" />
    <path d="M8 14C11.5 16.5 12.5 16.5 16 14" />
  </svg>
);

const IPhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <line x1="12" y1="18" x2="12" y2="18.01" />
  </svg>
);

// CloseIcon component with larger touch target for mobile
const CloseIcon = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="rounded border border-white/10 bg-white/[0.035] p-3 text-white/50 transition-colors hover:border-brand-line hover:bg-brand-faint hover:text-white"
    aria-label={label}
    style={{ minWidth: '44px', minHeight: '44px' }} // Larger touch target
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  </button>
);

const DownloadsModal = ({ isOpen, onClose }) => {
  const { locale } = useRouter();
  const messages = getMessages(locale || DEFAULT_LOCALE);
  const copy = messages.downloadsModal || getMessages(DEFAULT_LOCALE).downloadsModal;
  // Detect user's OS
  const userOs = useOsDetection();
  
  // Handle body scroll locking
  useEffect(() => {
    if (!isOpen) return;
    
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Operating systems data with SVG components
  const osOptions = [
    {
      name: "macOS",
      version: `${copy.versionLabel}: 1.0.1`,
      icon: MacOSIcon,
      available: true,
      downloadUrl: "https://binary.aeronyx.network/AeroNyx_mac1.0.1.dmg" 
    },
    {
      name: "Windows",
      version: `${copy.versionLabel}: 1.0.1`,
      icon: WindowsIcon,
      available: true,
      downloadUrl: "https://binary.aeronyx.network/AeroNyx_win1.0.1.exe" 
    },
    {
      name: "Linux",
      version: `${copy.versionLabel}: 0.27 Beta`,
      icon: LinuxIcon,
      available: true,
      downloadUrl: "https://binary.aeronyx.network/AeroNyx0.2.7.tar.gz" 
    },
    {
      name: "Android",
      version: `${copy.versionLabel}: 1.0.1`,
      icon: AndroidIcon,
      available: true,
      downloadUrl: "https://binary.aeronyx.network/android1.0.1b.apk" 
    },
    {
      name: "iOS",
      version: `${copy.versionLabel}: 1.0.1`,
      icon: IPhoneIcon,
      available: true,
      downloadUrl: "https://apps.apple.com/us/app/aeronyx/id6736854944" 
    }
  ];

  // Sort with user's OS first
  const sortedOptions = [...osOptions].sort((a, b) => {
    const isAUserOs = a.name.toLowerCase().includes(userOs.toLowerCase());
    const isBUserOs = b.name.toLowerCase().includes(userOs.toLowerCase());
    
    if (isAUserOs && !isBUserOs) return -1;
    if (!isAUserOs && isBUserOs) return 1;
    return 0;
  });

  // Get user's OS options
  const userOsOptions = sortedOptions.filter(os => 
    os.name.toLowerCase().includes(userOs.toLowerCase()) && os.available
  );

  // Handle download
  const handleDownload = (os) => {
    if (!os || !os.available) return;
    window.location.href = os.downloadUrl;
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
          {/* Backdrop with blur effect */}
          <motion.div 
            className="fixed inset-0 bg-black/72 backdrop-blur-md"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The glass modal */}
            <div className="relative overflow-hidden rounded border border-white/10">
              {/* Glass effect background */}
              <div className="absolute inset-0 bg-[rgba(12,12,19,0.92)] backdrop-blur-xl" />
              
              {/* Top edge highlight */}
              <div className="absolute top-0 left-5 right-5 h-px bg-white/20" />
              
              {/* Content */}
              <div className="relative z-10 p-6">
                {/* Header with close button - Fixed for better mobile accessibility */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 mr-3 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-md"></div>
                      <div className="relative">
                        <AeroNyxLogo width={40} height={40} />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-medium leading-tight">{copy.title}</h2>
                      <p className="text-sm leading-relaxed text-white/52">{copy.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Larger close button for mobile */}
                  <CloseIcon onClick={onClose} label={copy.closeLabel} />
                </div>
                
                {/* Security notice */}
                <div className="mb-6 flex items-start border border-brand-line bg-brand-faint p-3">
                  <svg className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-brand-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                  <p className="text-xs leading-relaxed text-white/68">
                    {copy.securityPrefix} <strong className="text-brand-light">aeronyx.network</strong>
                  </p>
                </div>
                
                {/* Recommended for your device section */}
                {userOsOptions.length > 0 && (
                  <div className="mb-4">
                    <h3 className="mb-2 text-sm text-white/46">{copy.recommendedTitle}</h3>
                    
                    {userOsOptions.map((os) => {
                      const Icon = os.icon;
                      
                      return (
                        <button
                          key={os.name}
                          className="mb-2 flex w-full items-center rounded border border-brand-line bg-brand-faint p-4 text-left transition-colors hover:bg-brand/15"
                          onClick={() => handleDownload(os)}
                          style={{ minHeight: '68px' }} // Ensure good touch target
                        >
                          <div className="mr-3 rounded border border-brand-line bg-black/20 p-2 text-brand-light">
                            <Icon />
                          </div>
                          <div className="text-left flex-grow">
                            <div className="flex flex-wrap items-center gap-2 font-medium leading-snug">
                              {os.name}
                              <span className="inline-flex items-center justify-center rounded-sm border border-brand-line bg-black/20 px-2 py-0.5 text-xs text-brand-light">
                                {copy.detectedBadge}
                              </span>
                            </div>
                            <div className="text-xs text-white/46">{os.version}</div>
                          </div>
                          <div className="text-brand-light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 17V3" />
                              <path d="m6 11 6 6 6-6" />
                              <path d="M19 21H5" />
                            </svg>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
                
                {/* All platforms - Mobile friendly grid layout */}
                <div>
                  <h3 className="mb-3 text-sm text-white/46">{copy.allPlatformsTitle}</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {sortedOptions.map((os) => {
                      const Icon = os.icon;
                      const isUserOs = userOs !== 'Unknown' && os.name.toLowerCase().includes(userOs.toLowerCase());
                      
                      // Skip the user's OS if already shown above
                      if (isUserOs && userOsOptions.length > 0) return null;
                      
                      return (
                        <button
                          key={os.name}
                          className={`rounded border p-3 text-center transition-colors ${
                            !os.available 
                              ? "cursor-not-allowed border-white/10 bg-white/[0.02] opacity-60"
                              : "cursor-pointer border-white/10 bg-white/[0.035] hover:border-brand-line hover:bg-brand-faint"
                          }`}
                          onClick={() => os.available && handleDownload(os)}
                          style={{ minHeight: '90px' }} // Larger touch target
                        >
                          <div className="mb-1 flex items-center justify-center text-brand-light opacity-85">
                            <Icon />
                          </div>
                          <div className="text-sm font-medium leading-snug">
                            {os.name}
                          </div>
                          <div className="mt-1 text-xs leading-snug text-white/46">{os.version}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Extra close button at bottom for mobile accessibility */}
                <div className="mt-6 text-center">
                  <button 
                    onClick={onClose}
                    className="rounded border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/50 transition-colors hover:border-brand-line hover:bg-brand-faint hover:text-white"
                    style={{ minHeight: '40px', minWidth: '100px' }} // Ensure good touch target
                  >
                    {copy.closeLabel}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DownloadsModal;
