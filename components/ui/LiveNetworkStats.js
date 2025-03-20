import React, { useState, useEffect } from 'react';

/**
 * LiveNetworkStats Component
 * A direct drop-in replacement for the original stats grid
 * that fetches live data from the API endpoints
 * 
 * Fixed version with improved data handling
 */
const LiveNetworkStats = () => {
  // State for metrics data with default fallback values
  const [metrics, setMetrics] = useState({
    activeNodes: '12.5K+',
    totalResources: '87 PH/s',
    networkUsers: '65K+',
    dataProtected: '125+ TB'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log('LiveNetworkStats: Fetching data...');
        
        // Improved fetch with timeout handling
        const fetchWithTimeout = async (url, timeout = 8000) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);
          
          try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
              console.error(`API error: ${response.status}`, url);
              throw new Error(`API error: ${response.status}`);
            }
            
            return await response.json();
          } catch (e) {
            if (e.name === 'AbortError') {
              console.error('Request timeout', url);
              throw new Error('Request timeout');
            }
            throw e;
          }
        };
        
        // Fetch each API with individual error handling
        const [nodesResponse, faucetResponse, synxResponse] = await Promise.all([
          fetchWithTimeout('https://api.aeronyx.network/api/stats/nodes/?period=30d')
            .catch(error => {
              console.error('Failed to fetch nodes data:', error);
              return null;
            }),
          fetchWithTimeout('https://api.aeronyx.network/api/stats/faucet/?format=json&period=30d')
            .catch(error => {
              console.error('Failed to fetch faucet data:', error);
              return null;
            }),
          fetchWithTimeout('https://api.aeronyx.network/api/stats/synx/?format=json&period=30d')
            .catch(error => {
              console.error('Failed to fetch synx data:', error);
              return null;
            })
        ]);
        
        console.log('LiveNetworkStats: Data received', {
          nodesResponse,
          faucetResponse,
          synxResponse
        });
        
        // Process node data for active nodes and total resources
        let activeNodes = '12.5K+';  // Default
        let totalResources = '87 PH/s';  // Default
        if (nodesResponse) {
          if (typeof nodesResponse.active_nodes !== 'undefined') {
            activeNodes = nodesResponse.active_nodes;
          } else if (typeof nodesResponse.total_active_nodes !== 'undefined') {
            activeNodes = nodesResponse.total_active_nodes;
          }
          
          if (typeof nodesResponse.total_resources !== 'undefined') {
            totalResources = formatHashRate(nodesResponse.total_resources);
          }
        }
        
        // Calculate network users from delegators and active addresses
        let networkUsers = '65K+';  // Default
        const totalDelegators = nodesResponse?.total_delegators;
        const activeAddresses = synxResponse?.active_addresses || synxResponse?.unique_addresses;
        
        if (totalDelegators !== undefined || activeAddresses !== undefined) {
          const delegatorCount = parseNumericValue(totalDelegators) || 0;
          const addressCount = parseNumericValue(activeAddresses) || 0;
          
          // Calculate with 15% overlap adjustment
          if (delegatorCount > 0 || addressCount > 0) {
            const overlapRate = 0.15;
            const estimatedOverlap = Math.min(delegatorCount, addressCount) * overlapRate;
            const totalUsers = Math.round(delegatorCount + addressCount - estimatedOverlap);
            networkUsers = formatNumber(totalUsers);
          }
        }
        
        // Process data for data protected
        let dataProtected = '125+ TB';  // Default
        if (nodesResponse && typeof nodesResponse.protected_data_tb !== 'undefined') {
          dataProtected = `${formatNumber(nodesResponse.protected_data_tb)}+ TB`;
        }
        
        // Log the processed values
        console.log('LiveNetworkStats: Processed metrics', {
          activeNodes,
          totalResources,
          networkUsers,
          dataProtected
        });
        
        // Update state with processed metrics
        setMetrics({
          activeNodes: formatNumber(activeNodes),
          totalResources,
          networkUsers,
          dataProtected
        });
      } catch (error) {
        console.error('Error processing network metrics:', error);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Helper function to parse numeric values from various formats
  const parseNumericValue = (value) => {
    if (value === undefined || value === null) return 0;
    
    // If already a number, return as is
    if (typeof value === 'number') return value;
    
    // Try to parse numeric string with K/M/B suffixes
    if (typeof value === 'string') {
      // Check for suffixes
      const hasK = /k|K/i.test(value);
      const hasM = /m|M/i.test(value);
      const hasB = /b|B/i.test(value);
      
      // Remove suffix and other non-numeric characters
      const numericPart = parseFloat(value.replace(/[^\d.]/g, ''));
      
      if (isNaN(numericPart)) return 0;
      
      // Apply multiplier based on suffix
      if (hasB) return numericPart * 1000000000;
      if (hasM) return numericPart * 1000000;
      if (hasK) return numericPart * 1000;
      
      return numericPart;
    }
    
    return 0; // Default for unhandled types
  };
  
  // Format numbers with K, M, B suffixes
  const formatNumber = (value) => {
    if (!value && value !== 0) return '0';
    
    // If already formatted with suffix, return as is
    if (typeof value === 'string' && /[KMB+]/.test(value)) {
      return value;
    }
    
    // Convert to number
    const num = parseNumericValue(value);
    
    // Format with appropriate suffix
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')}B+`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M+`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K+`;
    }
    
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Format hash rate with appropriate units
  const formatHashRate = (hashRate) => {
    if (!hashRate) return '87 PH/s';
    
    // Parse to a number if it's a string
    const value = parseNumericValue(hashRate);
    
    // Units from smallest to largest
    const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s'];
    let unitIndex = 0;
    let scaledValue = value;
    
    // Scale to appropriate unit
    while (scaledValue >= 1000 && unitIndex < units.length - 1) {
      scaledValue /= 1000;
      unitIndex++;
    }
    
    // Format the result
    return `${scaledValue.toFixed(scaledValue < 10 ? 1 : 0)} ${units[unitIndex]}`;
  };

  // Render the exact same structure as the original code
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8" style={{ opacity: 1, transform: 'none' }}>
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? (
            <div className="h-8 w-20 bg-white/10 animate-pulse rounded"></div>
          ) : (
            metrics.activeNodes
          )}
        </div>
        <div className="text-sm text-neutral-400">Active Nodes</div>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? (
            <div className="h-8 w-20 bg-white/10 animate-pulse rounded"></div>
          ) : (
            metrics.totalResources
          )}
        </div>
        <div className="text-sm text-neutral-400">Total Resources</div>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? (
            <div className="h-8 w-20 bg-white/10 animate-pulse rounded"></div>
          ) : (
            metrics.networkUsers
          )}
        </div>
        <div className="text-sm text-neutral-400">Network Users</div>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? (
            <div className="h-8 w-20 bg-white/10 animate-pulse rounded"></div>
          ) : (
            metrics.dataProtected
          )}
        </div>
        <div className="text-sm text-neutral-400">Data Protected</div>
      </div>
    </div>
  );
};

export default LiveNetworkStats;
