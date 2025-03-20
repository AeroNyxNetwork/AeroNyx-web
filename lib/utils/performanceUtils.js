/**
 * Performance utilities for monitoring and optimizing web application performance
 * Using mathematical algorithms for efficiency analysis and resource management
 */

// Exponential moving average - more efficient than simple average for tracking performance trends
class ExponentialMovingAverage {
  constructor(alpha = 0.3) {
    this.alpha = alpha;  // Smoothing factor (0-1)
    this.value = null;
  }
  
  update(newValue) {
    if (this.value === null) {
      this.value = newValue;
    } else {
      // EMA = α × newValue + (1 - α) × previousEMA
      this.value = this.alpha * newValue + (1 - this.alpha) * this.value;
    }
    return this.value;
  }
  
  getValue() {
    return this.value;
  }
  
  reset() {
    this.value = null;
  }
}

/**
 * Frame rate monitor using a sliding window algorithm for more accurate FPS reporting
 * Less prone to spikes compared to instantaneous FPS calculation
 */
export class FrameRateMonitor {
  constructor(windowSize = 60) {
    this.timestamps = [];
    this.windowSize = windowSize;
    this.running = false;
    this.fpsEMA = new ExponentialMovingAverage(0.2); // Slower smoothing for stability
    this.frameTimeEMA = new ExponentialMovingAverage(0.1);
    this.callback = null;
    this.warningThreshold = 45;
    this.criticalThreshold = 30;
    this.rafId = null;
    this.mode = 'normal';
  }
  
  start(callback) {
    if (this.running) return;
    this.running = true;
    this.callback = callback;
    this.updateFrameRate();
  }
  
  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
  
  updateFrameRate() {
    if (!this.running) return;
    
    const now = performance.now();
    this.timestamps.push(now);
    
    // Keep only the windowSize most recent timestamps
    if (this.timestamps.length > this.windowSize) {
      this.timestamps.shift();
    }
    
    if (this.timestamps.length > 1) {
      // Calculate instantaneous frame time
      const lastFrameTime = now - this.timestamps[this.timestamps.length - 2];
      this.frameTimeEMA.update(lastFrameTime);
      
      // Calculate FPS over the window using time-weighted average
      const timeElapsed = this.timestamps[this.timestamps.length - 1] - this.timestamps[0];
      const fps = (this.timestamps.length - 1) * 1000 / timeElapsed;
      
      // Update EMA
      const smoothedFps = this.fpsEMA.update(fps);
      
      // Determine performance mode
      const prevMode = this.mode;
      if (smoothedFps < this.criticalThreshold) {
        this.mode = 'critical';
      } else if (smoothedFps < this.warningThreshold) {
        this.mode = 'warning';
      } else {
        this.mode = 'normal';
      }
      
      // Invoke callback with performance data
      if (this.callback && (prevMode !== this.mode || this.timestamps.length % 10 === 0)) {
        this.callback({
          fps: smoothedFps,
          frameTime: this.frameTimeEMA.getValue(),
          mode: this.mode,
          samples: this.timestamps.length
        });
      }
    }
    
    this.rafId = requestAnimationFrame(() => this.updateFrameRate());
  }
  
  getFps() {
    return this.fpsEMA.getValue();
  }
  
  getFrameTime() {
    return this.frameTimeEMA.getValue();
  }
  
  getMode() {
    return this.mode;
  }
}

/**
 * Device capability detection with mathematical scoring algorithm
 * @returns {Object} Device capability score and category
 */
export function detectDeviceCapabilities() {
  if (typeof window === 'undefined') {
    return { score: 50, category: 'medium', details: {} };
  }
  
  // Device details
  const details = {
    userAgent: navigator.userAgent,
    memory: navigator.deviceMemory || null,
    cores: navigator.hardwareConcurrency || null,
    reduced_motion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      dpr: window.devicePixelRatio
    }
  };
  
  // Performance scoring algorithm
  let score = 50; // Base score
  
  // CPU cores scoring with logarithmic scaling (diminishing returns)
  if (details.cores) {
    // Log base 2 scaling: 2 cores = +10, 4 cores = +20, 8 cores = +30, 16 cores = +40
    score += Math.min(40, Math.round(10 * Math.log2(details.cores)));
  }
  
  // Memory scoring (if available)
  if (details.memory) {
    // 1GB = +5, 4GB = +20, 8GB = +25
    score += Math.min(25, Math.round(5 * Math.log2(details.memory * 2)));
  }
  
  // Device type detection with scoring
  const isMobile = /iPhone|iPad|iPod|Android/i.test(details.userAgent);
  const isTablet = 
    /iPad|Tablet|Android 3|Android 4/i.test(details.userAgent) && details.screen.width >= 768;
  
  if (isMobile && !isTablet) {
    score -= 20; // Mobile penalty
  } else if (isTablet) {
    score -= 10; // Tablet penalty
  }
  
  // Screen size and DPR scoring
  const pixelCount = details.screen.width * details.screen.height * details.screen.dpr;
  // Logarithmic scale for pixel count (avoid over-penalizing small screens)
  const screenScore = Math.log(pixelCount / 1000000) * 5;
  score += Math.min(20, Math.max(-10, screenScore));
  
  // Accessibility preference
  if (details.reduced_motion) {
    score -= 10; // Reduced motion preference
  }
  
  // Clamp score and determine category
  score = Math.max(10, Math.min(100, Math.round(score)));
  
  let category;
  if (score >= 70) {
    category = 'high';
  } else if (score >= 40) {
    category = 'medium';
  } else {
    category = 'low';
  }
  
  return { score, category, details };
}

/**
 * Dynamic resource budget calculator based on device performance
 * Uses mathematical algorithm to balance quality vs performance
 * @param {Object} deviceCapabilities Result from detectDeviceCapabilities
 * @returns {Object} Resource budgets for various component types
 */
export function calculateResourceBudgets(deviceCapabilities) {
  const { score, category } = deviceCapabilities;
  
  // Base resource scaling function using a sigmoid curve to provide
  // smooth transition between performance levels while avoiding extremes
  const sigmoid = (x, midpoint = 50, steepness = 0.05) => {
    return 1 / (1 + Math.exp(-steepness * (x - midpoint)));
  };
  
  // Calculate percentage from 0 to 1 based on score
  const qualityFactor = sigmoid(score);
  
  return {
    // 3D and particles
    particles: {
      count: Math.round(50 + qualityFactor * 150), // 50-200 particles
      complexity: Math.round(1 + qualityFactor * 2),  // 1-3 complexity level
      connections: Math.round(1 + qualityFactor * 2)  // 1-3 connections per particle
    },
    
    // Rendering quality
    rendering: {
      antialiasing: score > 60,
      shadows: score > 70,
      reflections: score > 80,
      postprocessing: score > 85
    },
    
    // Animation and effects
    animation: {
      frameSkip: category === 'low' ? 2 : category === 'medium' ? 1 : 0,
      maxAnimatedElements: Math.round(20 + qualityFactor * 80), // 20-100 elements
      backgroundEffects: qualityFactor * 100 // 0-100% intensity
    },
    
    // Recommended maximum resources
    maximums: {
      drawCalls: Math.round(50 + qualityFactor * 150),  // 50-200 draw calls
      triangles: Math.round((0.5 + qualityFactor * 4.5) * 100000), // 50k-500k triangles
      textures: Math.round(5 + qualityFactor * 15)  // 5-20 textures
    },
    
    // Overall category for easy reference
    category
  };
}

/**
 * Efficient throttle function using mathematical time calculation
 * More precise than basic throttle functions
 * @param {Function} func The function to throttle
 * @param {number} limit Time limit in milliseconds
 */
export function throttle(func, limit) {
  let inThrottle;
  let lastFunc;
  let lastRan;
  
  return function(...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = performance.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((performance.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = performance.now();
        }
      }, limit - ((performance.now() - lastRan) || 0));
    }
  };
}

/**
 * Memory usage monitoring (where supported)
 * @returns {Object|null} Memory usage data if available
 */
export function getMemoryUsage() {
  if (typeof performance === 'undefined' || 
      !performance.memory ||
      typeof window === 'undefined') {
    return null;
  }
  
  try {
    const memUsed = performance.memory.usedJSHeapSize;
    const memTotal = performance.memory.totalJSHeapSize;
    const memLimit = performance.memory.jsHeapSizeLimit;
    
    return {
      used: memUsed,
      total: memTotal,
      limit: memLimit,
      percentUsed: (memUsed / memLimit) * 100,
      formattedUsed: formatMemory(memUsed),
      formattedTotal: formatMemory(memTotal),
      formattedLimit: formatMemory(memLimit)
    };
  } catch (e) {
    return null;
  }
  
  // Format memory size with proper units
  function formatMemory(bytes) {
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' KB';
    const mb = kb / 1024;
    if (mb < 1024) return mb.toFixed(1) + ' MB';
    const gb = mb / 1024;
    return gb.toFixed(2) + ' GB';
  }
}

export default {
  FrameRateMonitor,
  detectDeviceCapabilities,
  calculateResourceBudgets,
  throttle,
  getMemoryUsage
};
