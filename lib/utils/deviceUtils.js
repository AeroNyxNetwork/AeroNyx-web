/**
 * Device capability detection and performance utilities
 * These utilities help with adapting the website experience based on device capabilities
 */

/**
 * Detects device capabilities and returns an object with detailed information
 * @returns {Object} Device capability information
 */
export const detectDeviceCapabilities = () => {
  // Default capabilities for SSR
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      browserName: 'unknown',
      operatingSystem: 'unknown',
      isLowPowerDevice: false,
      hasWebGL: true,
      preferReducedMotion: false,
      connection: {
        type: 'unknown',
        isSlow: false
      },
      screen: {
        width: 1920,
        height: 1080,
        pixelRatio: 1
      }
    };
  }

  // Browser and OS detection
  const userAgent = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const isMobile = isIOS || isAndroid || window.innerWidth < 768;
  const isTablet = (isIOS || isAndroid) && window.innerWidth >= 768 && window.innerWidth < 1024;
  const isDesktop = !isMobile && !isTablet;
  
  // Browser detection
  let browserName = 'unknown';
  if (/Firefox/i.test(userAgent)) browserName = 'firefox';
  else if (/Chrome/i.test(userAgent)) browserName = 'chrome';
  else if (/Safari/i.test(userAgent)) browserName = 'safari';
  else if (/Edge/i.test(userAgent)) browserName = 'edge';
  else if (/MSIE|Trident/i.test(userAgent)) browserName = 'ie';
  
  // OS detection
  let operatingSystem = 'unknown';
  if (/Windows/i.test(userAgent)) operatingSystem = 'windows';
  else if (/Macintosh/i.test(userAgent)) operatingSystem = 'mac';
  else if (/Linux/i.test(userAgent)) operatingSystem = 'linux';
  else if (isIOS) operatingSystem = 'ios';
  else if (isAndroid) operatingSystem = 'android';
  
  // Hardware capability detection
  const cpuCores = navigator.hardwareConcurrency || 4;
  const deviceMemory = navigator.deviceMemory || 4; // In GB, only in Chrome
  const isLowPowerDevice = cpuCores <= 2 || deviceMemory <= 2 || (isMobile && cpuCores <= 4);
  
  // WebGL support detection
  let hasWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    hasWebGL = !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    hasWebGL = false;
  }
  
  // Accessibility preferences
  const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Connection information
  let connectionType = 'unknown';
  let isSlow = false;
  
  if (navigator.connection) {
    connectionType = navigator.connection.effectiveType || 'unknown';
    // Consider 2G and slow 3G as slow connections
    isSlow = connectionType === '2g' || connectionType === 'slow-2g' || 
             (connectionType === '3g' && navigator.connection.downlink < 1);
  }
  
  // Screen information
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const pixelRatio = window.devicePixelRatio || 1;
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    browserName,
    operatingSystem,
    isLowPowerDevice,
    hasWebGL,
    preferReducedMotion,
    connection: {
      type: connectionType,
      isSlow
    },
    screen: {
      width: screenWidth,
      height: screenHeight,
      pixelRatio
    }
  };
};

/**
 * Determines the appropriate graphics settings based on device capabilities
 * @returns {Object} Recommended graphics settings
 */
export const getGraphicsSettings = () => {
  const capabilities = detectDeviceCapabilities();
  
  // Default high quality settings
  const settings = {
    particleCount: 200,
    useWebGL: true,
    usePostProcessing: true,
    shadowQuality: 'high',
    textureQuality: 'high',
    useBlur: true,
    fps: 60
  };
  
  // Reduce settings for low power devices
  if (capabilities.isLowPowerDevice || !capabilities.hasWebGL) {
    settings.particleCount = 50;
    settings.useWebGL = capabilities.hasWebGL;
    settings.usePostProcessing = false;
    settings.shadowQuality = 'low';
    settings.textureQuality = 'medium';
    settings.useBlur = false;
    settings.fps = 30;
  } 
  // Medium settings for mobile
  else if (capabilities.isMobile) {
    settings.particleCount = 100;
    settings.usePostProcessing = false;
    settings.shadowQuality = 'medium';
    settings.textureQuality = 'medium';
    settings.fps = 45;
  }
  
  // Honor reduced motion preference
  if (capabilities.preferReducedMotion) {
    settings.particleCount = Math.floor(settings.particleCount / 2);
    settings.usePostProcessing = false;
    settings.fps = 30;
  }
  
  // Further reduce quality on slow connections
  if (capabilities.connection.isSlow) {
    settings.particleCount = Math.floor(settings.particleCount / 2);
    settings.textureQuality = 'low';
    settings.useBlur = false;
  }
  
  return settings;
};

/**
 * Throttles a function to limit how often it runs
 * @param {Function} func - The function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  let lastFunc;
  let lastRan;
  
  return function() {
    const context = this;
    const args = arguments;
    
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

/**
 * Simple performance monitoring class
 * Helps track FPS and performance issues
 */
export class PerformanceMonitor {
  constructor(warningThreshold = 30, criticalThreshold = 20) {
    this.frames = 0;
    this.lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
    this.fps = 60;
    this.warningThreshold = warningThreshold;
    this.criticalThreshold = criticalThreshold;
    this.callbacks = {
      warning: [],
      critical: [],
      normal: []
    };
    this.status = 'normal';
    this.isRunning = false;
  }
  
  start() {
    if (this.isRunning || typeof window === 'undefined') return;
    this.isRunning = true;
    this.tick();
  }
  
  stop() {
    this.isRunning = false;
  }
  
  tick() {
    if (!this.isRunning) return;
    
    this.frames++;
    const currentTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const elapsed = currentTime - this.lastTime;
    
    // Update FPS calculation every second
    if (elapsed >= 1000) {
      this.fps = (this.frames * 1000) / elapsed;
      this.frames = 0;
      this.lastTime = currentTime;
      
      // Determine performance status
      const prevStatus = this.status;
      
      if (this.fps <= this.criticalThreshold) {
        this.status = 'critical';
      } else if (this.fps <= this.warningThreshold) {
        this.status = 'warning';
      } else {
        this.status = 'normal';
      }
      
      // Trigger callbacks if status changed
      if (prevStatus !== this.status) {
        (this.callbacks[this.status] || []).forEach(callback => callback(this.fps));
      }
    }
    
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => this.tick());
    }
  }
  
  onWarning(callback) {
    this.callbacks.warning.push(callback);
    return this;
  }
  
  onCritical(callback) {
    this.callbacks.critical.push(callback);
    return this;
  }
  
  onNormal(callback) {
    this.callbacks.normal.push(callback);
    return this;
  }
}

export default {
  detectDeviceCapabilities,
  getGraphicsSettings,
  throttle,
  PerformanceMonitor
};
