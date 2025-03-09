import { useState, useEffect } from 'react';

/**
 * Custom hook to detect the user's operating system
 * @returns {string} The detected operating system name
 */
const useOsDetection = () => {
  const [os, setOs] = useState('Unknown');

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent;
    
    // Detect OS
    if (userAgent.indexOf('Win') !== -1) {
      setOs('Windows');
    } else if (userAgent.indexOf('Mac') !== -1) {
      setOs('macOS');
    } else if (userAgent.indexOf('Linux') !== -1 && userAgent.indexOf('Android') === -1) {
      setOs('Linux');
    } else if (userAgent.indexOf('Android') !== -1) {
      setOs('Android');
    } else if (/(iPhone|iPad|iPod)/.test(userAgent)) {
      setOs('iOS');
    } else if (userAgent.indexOf('CrOS') !== -1) {
      setOs('Chrome OS');
    }
  }, []);

  return os;
};

export default useOsDetection;
