import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useOsDetection from '../../lib/hooks/useOsDetection';
import AeroNyxLogo from './AeroNyxLogo';

// OS Icons as React Components for better optimization
const MacOSIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18c.85.36 1.9.36 3 .36 1.02 0 1.85 0 2.62-.23M21 15c.24-.95.34-2.03.37-3.06.05-1.79-.2-4.09-1.97-5.44-1.76-1.36-4.48-.75-6.4 0-1.89.73-4.67 1.26-6.23-.32C5.46 4.46 6.2 2 6.2 2c-1.8 1.03-3.2 3.06-3.2 6 0 7.66 5.4 10 5.4 10 0-2.28 1.38-4.55 3.4-5.95" />
    <path d="M7.7 18.8C7.4 18.4 6.35 17.7 5.5 17.7c-1 0-1.75.24-2.5.7 0 0 1.4 1.4 2.8 1.4.83 0 1.16-.13 1.9-1" />
    <path d="M2 2s.9 3.91 3.23 5.39M19.5 22l-2-2 2-2M22 22l-2-2 2-2" />
  </svg>
);

const WindowsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 10.5H17.5V20.5H6.5V10.5Z" />
    <path d="M8.5 3.5H15.5V10.5H8.5V3.5Z" />
    <path d="M11.5 20.5V10.5" />
    <path d="M11.5 10.5V3.5" />
  </svg>
);

const AndroidIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 16V8C5 5.79086 6.79086 4 9 4H15C17.2091 4 19 5.79086 19 8V16C19 18.2091 17.2091 20 15 20H9C6.79086 20 5 18.2091 5 16Z" />
    <rect x="7" y="14" width="10" height="2" rx="1" />
    <rect x="9" y="6" width="6" height="1" rx="0.5" />
  </svg>
);

const LinuxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <path d="M9 8.5C9 7.67157 9.67157 7 10.5 7C11.3284 7 12 7.67157 12 8.5" />
    <path d="M12 8.5C12 7.67157 12.6716 7 13.5 7C14.3284 7 15 7.67157 15 8.5" />
    <path d="M8 14C11.5 16.5 12.5 16.5 16 14" />
  </svg>
);

const IPhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <line x1="12" y1="18" x2="12" y2="18.01" />
  </svg>
);

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" />
    <path d="M17 12.5C17 15.26 14.76 17.5 12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C13.38 7.5 14.63 8.07 15.54 9" />
    <path d="M11 12.5V9.5" />
    <path d="M20 9L16.5 12.5" />
  </svg>
);

const DownloadsModal = ({ isOpen, onClose }) => {
  // Detect user's OS
  const userOs = useOsDetection();
  
  if (!isOpen) return null;
  
  // Operating systems data with SVG components instead of image URLs
  const osOptions = [
    {
      name: "macOS",
      version: "Version: 1.0.1",
      icon: MacOSIcon,
      available: true,
      downloadUrl: "https://binary.aeronyx.network/AeroNyx_mac1.0.1.dmg" // Replace with actual download URL
    },
    {
      name: "Windows",
      version: "Version: 1.0.1",
      icon: WindowsIcon,
      available: true,
      downloadUrl: "https://binary.aeronyx.network/AeroNyx_win1.0.1.exe" // Replace with actual download URL
    },
    {
      name: "Android",
      version: "Version: 1.0.1",
      icon: AndroidIcon,
      available: true,
      downloadUrl: "https://binary.aeronyx.network/android1.0.1b.apk" // Replace with actual download URL
    },
    {
      name: "iOS",
      version: "Version: 1.0.1",
      icon: IPhoneIcon,
      available: true,
      downloadUrl: "https://apps.apple.com/us/app/aeronyx/id6736854944" // Replace with actual download URL
    },
    {
      name: "Linux",
      version: "Version: 0.27 Beta",
      icon: LinuxIcon,
      available: true,
      downloadUrl: "https://binary.aeronyx.network/AeroNyx0.2.7.tar.gz" // Replace with actual download URL
    },
    {
      name: "Chrome OS",
      version: "Version: in Preparation",
      icon: GoogleIcon,
      available: false,
      downloadUrl: "#" // No URL since it's not available
    }
  ];

  // Put the detected OS at the top of the list for mobile devices
  const sortedOptions = [...osOptions].sort((a, b) => {
    const isAUserOs = a.name.toLowerCase().includes(userOs.toLowerCase());
    const isBUserOs = b.name.toLowerCase().includes(userOs.toLowerCase());
    
    if (isAUserOs && !isBUserOs) return -1;
    if (!isAUserOs && isBUserOs) return 1;
    return 0;
  });

  // Animation variants for the modal
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const handleDownload = (os) => {
    if (!os.available) return;
    
    // You can add analytics tracking here
    console.log(`Downloading for ${os.name}`);
    
    // Navigate to download URL
    window.location.href = os.downloadUrl;
  };

  // When modal is open, prevent body scrolling
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        // The z-index is increased to 9999 to ensure it's above everything else
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto py-4"
          style={{ zIndex: 9999 }} 
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          {/* Modal */}
          <motion.div 
            className="bg-neutral-900 rounded-xl p-4 sm:p-6 w-[95%] max-w-md sm:max-w-lg shadow-2xl border border-primary/30 mx-auto my-auto mt-16"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-end mb-2">
              <button 
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Logo and title */}
            <div className="text-center mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3">
                <AeroNyxLogo width={48} height={48} />
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2">
                Download AeroNyx Client
              </h2>
              <p className="text-sm text-neutral-300 mb-3">
                Enter the private network, earn points and protect your online freedom
              </p>
              <div className="bg-amber-400/10 border border-amber-400/30 rounded p-2.5 mb-4">
                <p className="text-amber-400 text-xs sm:text-sm">
                  For your security, confirm you're visiting <strong>https://aeronyx.network</strong>
                </p>
              </div>
            </div>
            
            {/* Show detected OS prominently for mobile */}
            {userOs !== 'Unknown' && (
              <div className="mb-4">
                <h3 className="text-sm text-neutral-400 mb-2">Recommended for your device:</h3>
                {sortedOptions.filter(os => os.name.toLowerCase().includes(userOs.toLowerCase())).map((os, index) => {
                  const Icon = os.icon;
                  
                  if (!os.available) return null;
                  
                  return (
                    <motion.button
                      key={os.name}
                      className="w-full p-3 flex items-center rounded-lg border border-primary/50 bg-primary/20 hover:bg-primary/30 transition-colors"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDownload(os)}
                    >
                      <div className="text-primary">
                        <Icon />
                      </div>
                      <div className="ml-3 text-left flex-grow">
                        <div className="font-medium flex items-center">
                          {os.name}
                          <span className="ml-2 inline-flex items-center justify-center text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                            Detected
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400">{os.version}</div>
                      </div>
                      <div className="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 17V3" />
                          <path d="m6 11 6 6 6-6" />
                          <path d="M19 21H5" />
                        </svg>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
            
            {/* All download options - more compact for mobile */}
            <div>
              <h3 className="text-sm text-neutral-400 mb-2">All platforms:</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {sortedOptions.map((os, index) => {
                  const Icon = os.icon;
                  const isUserOs = os.name.toLowerCase().includes(userOs.toLowerCase());
                  
                  // Skip the user's OS as it's already shown above
                  if (isUserOs) return null;
                  
                  return (
                    <motion.div 
                      key={os.name}
                      className={`border rounded-lg p-3 text-center ${
                        !os.available 
                          ? "border-neutral-700/30 bg-neutral-800/30 opacity-70"
                          : "border-primary/30 bg-primary/5 hover:bg-primary/10 cursor-pointer"
                      } transition-colors`}
                      whileHover={os.available ? { scale: 1.02 } : {}}
                      whileTap={os.available ? { scale: 0.98 } : {}}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      onClick={() => handleDownload(os)}
                    >
                      <div className="flex items-center justify-center mb-1 text-primary">
                        <Icon />
                      </div>
                      <div className="font-medium text-sm sm:text-base">
                        {os.name}
                      </div>
                      <div className="text-xs text-neutral-400">{os.version}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Notice - more compact for mobile */}
            <p className="text-center text-neutral-400 text-xs mt-4">
              AeroNyx client respects your privacy and doesn't collect device information
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DownloadsModal;
