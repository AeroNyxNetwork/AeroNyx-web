import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AeroNyxLogo from './AeroNyxLogo';

// Social media icons as SVG components
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 15.5c-.83 1.19-3.5 4.5-3.5 4.5l-3.5-2-3.5 2v-4l-4-4 1-8.5 14 4.5-1 7.5Z" />
    <path d="M9.5 12.5v4" />
    <path d="m4.5 7.5 5 5" />
  </svg>
);

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  // Contact information
  const contactInfo = [
    {
      type: "Email",
      value: "hi@aeronyx.network",
      icon: EmailIcon,
      link: "mailto:hi@aeronyx.network",
      color: "text-blue-400"
    },
    {
      type: "Twitter",
      value: "@AeroNyxNetwork",
      icon: TwitterIcon,
      link: "https://x.com/AeroNyxNetwork",
      color: "text-sky-400"
    },
    {
      type: "Telegram",
      value: "AeroNyxNetwork",
      icon: TelegramIcon,
      link: "https://t.me/AeroNyxNetwork",
      color: "text-blue-500"
    }
  ];

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
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
              className="bg-neutral-900 rounded-xl p-6 md:p-8 w-[90%] max-w-md shadow-2xl border border-primary/30"
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
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4">
                  <AeroNyxLogo width={64} height={64} />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Contact Us
                </h2>
                <p className="text-neutral-300">
                  Connect with the AeroNyx team through any of our official channels
                </p>
              </div>
              
              {/* Contact options */}
              <div className="space-y-4 mb-6">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  
                  return (
                    <motion.a
                      key={contact.type}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 rounded-lg border border-neutral-800 bg-neutral-800/30 hover:bg-neutral-800/50 hover:border-primary/30 transition-colors"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`flex-shrink-0 ${contact.color}`}>
                        <Icon />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{contact.type}</div>
                        <div className="text-sm text-neutral-300">{contact.value}</div>
                      </div>
                      <div className="ml-auto text-neutral-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
              
              {/* Footer message */}
              <p className="text-center text-neutral-400 text-sm">
                We typically respond within 24 hours
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
