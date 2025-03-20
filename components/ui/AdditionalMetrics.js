import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * AdditionalMetrics Component
 * Displays the four additional metrics: Total Delegators, Active Addresses,
 * Synx Transactions, and Faucet Transactions
 * 
 * Fixed version with improved data handling
 */
const AdditionalMetrics = ({ className = '' }) => {
  // State for stats data
  const [stats, setStats] = useState({
    totalDelegators: '35K+',  // Default fallback values
    activeAddresses: '42K+',
    synxTransactions: '156K+',
    faucetTransactions: '89K+'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchAdditionalMetrics = async () => {
      try {
        setIsLoading(true);
        
        // Define APIs with robust error handling
        const fetchWithTimeout = async (url, timeout = 8000) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), timeout);
          
          try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
              throw new Error(`API error: ${response.status}`);
            }
            
            return await response.json();
          } catch (e) {
            if (e.name === 'AbortError') {
              throw new Error('Request timeout');
            }
            throw e;
          }
        };
        
        // Fetch all APIs in parallel with proper error handling
        const [nodesData, faucetData, synxData] = await Promise.all([
          fetchWithTimeout('https://api.aeronyx.network/api/stats/nodes/?period=30d')
            .catch(e => {
              console.error('Error fetching nodes API:', e);
              return null;
            }),
          fetchWithTimeout('https://api.aeronyx.network/api/stats/faucet/?format=json&period=30d')
            .catch(e => {
              console.error('Error fetching faucet API:', e);
              return null;
            }),
          fetchWithTimeout('https://api.aeronyx.network/api/stats/synx/?format=json&period=30d')
            .catch(e => {
              console.error('Error fetching synx API:', e);
              return null;
            })
        ]);
        
        // Debug the received data
        console.log('API Data Received:', {
          nodesData,
          faucetData,
          synxData
        });

        // Use hardcoded fallback data if any API failed
        const useHardcodedData = !nodesData || !faucetData || !synxData;
        if (useHardcodedData) {
          console.log('Using hardcoded fallback data due to API failures');
          setStats({
            totalDelegators: '35K+',
            activeAddresses: '42K+',
            synxTransactions: '156K+',
            faucetTransactions: '89K+'
          });
          throw new Error('One or more APIs failed to return data');
        }

        // Process the data from all APIs
        // For Total Delegators - Use actual data or fallback to default
        const totalDelegators = nodesData?.total_delegators !== undefined 
          ? nodesData.total_delegators 
          : (nodesData?.delegators !== undefined ? nodesData.delegators : '35K+');
          
        // For Active Addresses - Use actual data or fallback to default
        const activeAddresses = synxData?.active_addresses !== undefined 
          ? synxData.active_addresses 
          : (synxData?.unique_addresses !== undefined ? synxData.unique_addresses : '42K+');
          
        // For Synx Transactions - Use actual data or fallback to default
        const synxTransactions = synxData?.total_transactions !== undefined 
          ? synxData.total_transactions 
          : (synxData?.transactions !== undefined ? synxData.transactions : '156K+');
          
        // For Faucet Transactions - Use actual data or fallback to default
        const faucetTransactions = faucetData?.total_transactions !== undefined 
          ? faucetData.total_transactions 
          : (faucetData?.transactions !== undefined ? faucetData.transactions : '89K+');
        
        // Log the values we're extracting
        console.log('Extracted values:', {
          totalDelegators,
          activeAddresses,
          synxTransactions,
          faucetTransactions
        });
        
        // Update state with properly formatted data
        setStats({
          totalDelegators: formatMetricValue(totalDelegators),
          activeAddresses: formatMetricValue(activeAddresses),  
          synxTransactions: formatMetricValue(synxTransactions),
          faucetTransactions: formatMetricValue(faucetTransactions)
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching additional metrics:', err);
        setError(err.message || 'Failed to fetch metrics');
        
        // Ensure we always have fallback values displayed
        setStats({
          totalDelegators: '35K+',
          activeAddresses: '42K+',
          synxTransactions: '156K+',
          faucetTransactions: '89K+'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdditionalMetrics();
  }, []);

  // Format metric values with better validation
  const formatMetricValue = (value) => {
    // Check for invalid values
    if (value === undefined || value === null || value === '') {
      return '0';
    }
    
    // If already formatted with suffix, return as is
    if (typeof value === 'string' && /[KMB+]/.test(value)) {
      return value;
    }
    
    let numValue;
    
    // Handle numeric parsing
    try {
      if (typeof value === 'string') {
        // Try to extract numeric part
        numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      } else {
        numValue = Number(value);
      }
      
      // Handle invalid numbers
      if (isNaN(numValue)) {
        console.warn('Invalid numeric value:', value);
        return '0';
      }
      
      // Format based on size
      if (numValue >= 1000000000) {
        return `${(numValue / 1000000000).toFixed(1).replace(/\.0$/, '')}B+`;
      }
      if (numValue >= 1000000) {
        return `${(numValue / 1000000).toFixed(1).replace(/\.0$/, '')}M+`;
      }
      if (numValue >= 1000) {
        return `${(numValue / 1000).toFixed(1).replace(/\.0$/, '')}K+`;
      }
      if (numValue === 0) {
        return '0';
      }
      
      // Format with commas
      return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
    } catch (e) {
      console.error('Error formatting metric value:', e, value);
      return '0';
    }
  };

  // Define the metrics to display
  const metricsData = [
    { 
      label: "Total Delegators", 
      value: stats.totalDelegators,
      description: "Resource providers in the network",
      color: "from-primary-light to-primary" 
    },
    { 
      label: "Active Addresses", 
      value: stats.activeAddresses,
      description: "Unique Synx network participants",
      color: "from-secondary-light to-secondary" 
    },
    { 
      label: "Synx Transactions", 
      value: stats.synxTransactions,
      description: "30-day transaction volume",
      color: "from-primary to-secondary" 
    },
    { 
      label: "Faucet Transactions", 
      value: stats.faucetTransactions,
      description: "Token distribution requests",
      color: "from-secondary to-primary" 
    }
  ];

  return (
    <div className={`${className}`}>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">Additional Network Metrics</h3>
          <p className="text-sm text-neutral-300">Key performance indicators from AeroNyx network</p>
          <p className="text-xs text-neutral-400">The data for the last 30 days</p>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
      >
        {metricsData.map((metric, index) => (
          <motion.div 
            key={index}
            className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            {/* Gradient background for each card */}
            <div className={`absolute -inset-1 bg-gradient-to-br ${metric.color} opacity-10 blur-xl`}></div>
            
            {/* Metric content */}
            <div className="relative z-10">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {isLoading ? (
                  <div className="h-8 w-24 bg-white/10 animate-pulse rounded"></div>
                ) : (
                  metric.value
                )}
              </div>
              <div className="text-sm font-medium text-neutral-300 mb-1">{metric.label}</div>
              <div className="text-xs text-neutral-400">{metric.description}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Error message with more details */}
      {error && (
        <div className="mt-4 text-center">
          <span className="text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
            {error.includes('API error') ? 'API connection error.' : error} Using estimated values.
          </span>
        </div>
      )}
    </div>
  );
};

export default AdditionalMetrics;
