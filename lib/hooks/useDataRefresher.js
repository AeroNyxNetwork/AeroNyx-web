import { useState, useEffect, useRef } from 'react';

/**
 * Hook for auto-refreshing data from an API at specified intervals
 * 
 * @param {Function} fetchFunction - The function to call to fetch data
 * @param {Object} options - Configuration options
 * @param {number} options.interval - Refresh interval in milliseconds (default: 60000 - 1 minute)
 * @param {boolean} options.autoRefresh - Whether to automatically refresh (default: true)
 * @param {any[]} options.dependencies - Array of dependencies that should trigger a refresh when changed
 * @param {Function} options.onError - Function to call when an error occurs
 * @param {number} options.errorRetryCount - Number of retries on error (default: 3)
 * @param {number} options.errorRetryInterval - Interval between retries in milliseconds (default: 5000)
 * 
 * @returns {Object} - Object containing data, loading state, error state, and refresh function
 */
const useDataRefresher = (fetchFunction, options = {}) => {
  const {
    interval = 60000, // Default to 1 minute
    autoRefresh = true,
    dependencies = [],
    onError = null,
    errorRetryCount = 3,
    errorRetryInterval = 5000
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Using refs to track retry attempts and timer
  const retryAttemptsRef = useRef(0);
  const timerRef = useRef(null);
  
  // Clean up function to clear timers
  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Function to fetch data
  const fetchData = async (isRetry = false) => {
    if (!isRetry) {
      setLoading(true);
    }
    
    try {
      const result = await fetchFunction();
      setData(result);
      setError(null);
      retryAttemptsRef.current = 0; // Reset retry counter on success
      return result;
    } catch (err) {
      console.error('Error fetching data:', err);
      
      // Handle retry logic
      if (retryAttemptsRef.current < errorRetryCount) {
        retryAttemptsRef.current += 1;
        timerRef.current = setTimeout(() => {
          fetchData(true); // Retry fetch
        }, errorRetryInterval);
      } else {
        setError(err);
        if (onError) onError(err);
      }
      
      return null;
    } finally {
      if (!isRetry) {
        setLoading(false);
      }
    }
  };

  // Function to manually trigger a refresh
  const refresh = () => {
    clearTimers();
    return fetchData();
  };

  // Set up auto-refresh with cleanup
  useEffect(() => {
    // Initial fetch
    fetchData();
    
    // Set up refresh interval if enabled
    if (autoRefresh) {
      const intervalId = setInterval(() => {
        fetchData();
      }, interval);
      
      return () => {
        clearInterval(intervalId);
        clearTimers();
      };
    }
    
    return () => clearTimers();
  }, [interval, autoRefresh, ...dependencies]);

  return { data, loading, error, refresh };
};

export default useDataRefresher;
