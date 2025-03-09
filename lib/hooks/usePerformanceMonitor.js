import { useState, useEffect } from 'react';

const usePerformanceMonitor = () => {
  const [performance, setPerformance] = useState({
    isLowEndDevice: false,
    isMobile: false,
    particleCount: 200,
    enableEffects: true
  });
  
  useEffect(() => {
    // Only run in client
    if (typeof window === 'undefined') return;
    
    // Check for mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
                     (window.innerWidth <= 768);
                     
    // Check for low-end device by examining hardware concurrency
    const cpuCores = navigator.hardwareConcurrency || 4;
    const isLowEndDevice = cpuCores <= 4 || isMobile;
    
    // Check if device has GPU acceleration
    const canvas = document.createElement('canvas');
    const hasGPU = !!(
      canvas.getContext('webgl') || 
      canvas.getContext('experimental-webgl')
    );
    
    // Set appropriate particle counts based on device capabilities
    let particleCount = 200; // Default
    let enableEffects = true;
    
    if (isLowEndDevice) {
      particleCount = isMobile ? 50 : 100;
      enableEffects = !isMobile;
    } else if (!hasGPU) {
      particleCount = 100;
      enableEffects = true;
    } else if (cpuCores >= 8) {
      particleCount = 300; // High-end device
    }
    
    setPerformance({
      isLowEndDevice,
      isMobile,
      particleCount,
      enableEffects
    });
  }, []);
  
  return performance;
};

export default usePerformanceMonitor;
