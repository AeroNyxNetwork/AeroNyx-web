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
      downloadUrl: "#macos-download" // Replace with actual download URL
    },
    {
      name: "Windows",
      version: "Version: 1.0.1",
      icon: WindowsIcon,
      available: true,
      downloadUrl: "#windows-download" // Replace with actual download URL
    },
    {
      name: "Android",
      version: "Version: 1.0.1",
      icon: AndroidIcon,
      available: true,
      downloadUrl: "#android-download" // Replace with actual download URL
    },
    {
      name: "Linux",
      version: "Version: 0.27 Beta",
      icon: LinuxIcon,
      available: true,
      downloadUrl: "#linux-download" // Replace with actual download URL
    },
    {
      name: "iOS",
      version: "Version: 1.0.1",
      icon: IPhoneIcon,
      available: true,
      downloadUrl: "#iphone-download" // Replace with actual download URL
    },
    {
      name: "Chrome OS",
      version: "Version: in Preparation",
      icon: GoogleIcon,
      available: false,
      downloadUrl: "#" // No URL since it's not available
    }
  ];

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div 
              className="bg-neutral-900 rounded-xl p-6 md:p-8 w-[90%] max-w-3xl shadow-2xl border border-primary/30"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex justify-end">
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
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4">
                  <AeroNyxLogo width={64} height={64} />
                </div>
                <h2 className="text-xl font-bold mb-3">
                  Download the AeroNyx client to instantly enter the private network, earn points and protect your online freedom.
                </h2>
                <p className="text-amber-400 border border-amber-400/30 bg-amber-400/10 rounded-md p-3 text-sm">
                  Warning: For your security, please confirm that you are currently visiting https://aeronyx.network
                </p>
              </div>
              
              {/* Download options */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {osOptions.map((os, index) => {
                  const isUserOs = os.name.toLowerCase().includes(userOs.toLowerCase());
                  const Icon = os.icon;
                  
                  return (
                    <motion.div 
                      key={os.name}
                      className={`border rounded-lg p-4 text-center ${
                        !os.available 
                          ? "border-neutral-700/30 bg-neutral-800/30 opacity-70"
                          : isUserOs
                            ? "border-primary/50 bg-primary/20 hover:bg-primary/30 cursor-pointer"
                            : "border-primary/30 bg-primary/5 hover:bg-primary/10 cursor-pointer"
                      } transition-colors`}
                      whileHover={os.available ? { scale: 1.02 } : {}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      onClick={() => handleDownload(os)}
                    >
                      <div className="flex items-center justify-center mb-2 text-primary">
                        <Icon />
                      </div>
                      <div className="font-medium">
                        {os.name}
                        {isUserOs && (
                          <span className="ml-2 inline-flex items-center justify-center text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                            Detected
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-neutral-400">{os.version}</div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Notice */}
              <p className="text-center text-neutral-400 text-sm">
                The AeroNyx client will not access, save, or detect any information on your device.
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DownloadsModal;
