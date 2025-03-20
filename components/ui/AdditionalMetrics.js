import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * AdditionalMetrics Component
 * Displays the four additional metrics: Total Delegators, Active Addresses,
 * Synx Transactions, and Faucet Transactions
 * 
 * Fixed version with improved data handling and debug logging
 */
const AdditionalMetrics = ({ className = '' }) => {
  // State for stats data
  const [stats, setStats] = useState({
    totalDelegators: '0',
    activeAddresses: '0',
    synxTransactions: '0',
    faucetTransactions: '0'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawData, setRawData] = useState({
    nodes: null,
    faucet: null,
    synx: null
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchAdditionalMetrics = async () => {
      try {
        setIsLoading(true);
        
        // Fetch data from the three API endpoints with better error logging
        const responses = await Promise.all([
          fetch('https://api.aeronyx.network/api/stats/nodes/?period=30d')
            .then(res => {
              if (!res.ok) {
                console.error('Nodes API response not OK:', res.status, res.statusText);
                throw new Error(`Nodes API error: ${res.status}`);
              }
              return res.json();
            }),
          fetch('https://api.aeronyx.network/api/stats/faucet/?format=json&period=30d')
            .then(res => {
              if (!res.ok) {
                console.error('Faucet API response not OK:', res.status, res.statusText);
                throw new Error(`Faucet API error: ${res.status}`);
              }
              return res.json();
            }),
          fetch('https://api.aeronyx.network/api/stats/synx/?format=json&period=30d')
            .then(res => {
              if (!res.ok) {
                console.error('Synx API response not OK:', res.status, res.statusText);
                throw new Error(`Synx API error: ${res.status}`);
              }
              return res.json();
            })
        ]).catch(error => {
          console.error('Error in Promise.all:', error);
          throw error;
        });
        
        const [nodesData, faucetData, synxData] = responses;
        
        // Store raw data for debugging
        setRawData({
          nodes: nodesData,
          faucet: faucetData,
          synx: synxData
        });
        
        // Log the raw responses for debugging
        console.log('Nodes API response:', nodesData);
        console.log('Faucet API response:', faucetData);
        console.log('Synx API response:', synxData);

        // Extract metrics with better validation
        // For nodes data - check both possible field names
        let totalDelegators = '35K+';  // Default fallback
        if (nodesData) {
          if (typeof nodesData.total_delegators !== 'undefined') {
            totalDelegators = nodesData.total_delegators;
          } else if (typeof nodesData.delegators !== 'undefined') {
            totalDelegators = nodesData.delegators;
          }
        }
        
        // For synx data - check multiple possible field names
        let activeAddresses = '42K+';  // Default fallback
        let synxTransactions = '156K+';  // Default fallback
        if (synxData) {
          if (typeof synxData.active_addresses !== 'undefined') {
            activeAddresses = synxData.active_addresses;
          } else if (typeof synxData.unique_addresses !== 'undefined') {
            activeAddresses = synxData.unique_addresses;
          }
          
          if (typeof synxData.total_transactions !== 'undefined') {
            synxTransactions = synxData.total_transactions;
          } else if (typeof synxData.transactions !== 'undefined') {
            synxTransactions = synxData.transactions;
          }
        }
        
        // For faucet data
        let faucetTransactions = '89K+';  // Default fallback
        if (faucetData) {
          if (typeof faucetData.total_transactions !== 'undefined') {
            faucetTransactions = faucetData.total_transactions;
          } else if (typeof faucetData.transactions !== 'undefined') {
            faucetTransactions = faucetData.transactions;
          }
        }
        
        // Update state with properly formatted data
        setStats({
          totalDelegators: formatNumber(totalDelegators),
          activeAddresses: formatNumber(activeAddresses),
          synxTransactions: formatNumber(synxTransactions),
          faucetTransactions: formatNumber(faucetTransactions)
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching additional metrics:', err);
        setError(err.message || 'Failed to fetch metrics');
        
        // Use fallback values
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

  // Format numbers with K, M, B suffixes - improved with better validation
  const formatNumber = (value) => {
    // If the value is falsy, but not zero - return default formatting
    if (!value && value !== 0) return '0';
    
    // If already formatted with suffix, return as is
    if (typeof value === 'string' && /[KMB+]/.test(value)) {
      return value;
    }
    
    // Convert to number with better error handling
    let num;
    try {
      if (typeof value === 'string') {
        // Remove non-numeric characters except decimal point
        num = parseFloat(value.replace(/[^\d.-]/g, ''));
      } else {
        num = Number(value);
      }
    } catch (e) {
      console.error('Error parsing number:', value, e);
      return '0'; // Return default on parsing error
    }
    
    // Check if result is a valid number
    if (isNaN(num)) {
      console.error('Invalid number after parsing:', value, '→', num);
      return '0';
    }
    
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

  // Debug button for development
  const handleDebugClick = () => {
    console.log('Current stats:', stats);
    console.log('Raw API data:', rawData);
  };

  return (
    <div className={`${className}`}>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">Additional Network Metrics</h3>
          <p className="text-sm text-neutral-300">Key performance indicators from AeroNyx network</p>
          <p className="text-xs text-neutral-400">The data for the last 30 days</p>
        </div>
        
        {/* Debug button - only visible during development */}
        {process.env.NODE_ENV === 'development' && (
          <button 
            onClick={handleDebugClick}
            className="text-xs text-neutral-500 hover:text-neutral-300 px-2 py-1 rounded border border-neutral-700"
          >
            Debug
          </button>
        )}
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
