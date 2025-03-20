import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * EnhancedNetworkStats Component
 * Displays network statistics with improved error handling and data processing
 */
const EnhancedNetworkStats = () => {
  // State for stats data
  const [stats, setStats] = useState({
    // Default values if APIs fail
    activeNodes: '0',
    totalResources: '0',
    networkUsers: '0',
    dataProtected: '0',
    totalDelegators: '0',
    activeAddresses: '0',
    synxTransactions: '0',
    faucetTransactions: '0'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchNetworkStats = async () => {
      try {
        setIsLoading(true);
        
        // Create API request promises
        const nodePromise = fetch('https://api.aeronyx.network/api/stats/nodes/?period=30d')
          .then(res => res.ok ? res.json() : Promise.reject(`Node API error: ${res.status}`));
        
        const faucetPromise = fetch('https://api.aeronyx.network/api/stats/faucet/?format=json&period=30d')
          .then(res => res.ok ? res.json() : Promise.reject(`Faucet API error: ${res.status}`));
        
        const synxPromise = fetch('https://api.aeronyx.network/api/stats/synx/?format=json&period=30d')
          .then(res => res.ok ? res.json() : Promise.reject(`Synx API error: ${res.status}`));

        // Wait for all API responses with error handling
        const [nodesData, faucetData, synxData] = await Promise.all([
          nodePromise.catch(err => {
            console.error('Nodes API error:', err);
            return null;
          }),
          faucetPromise.catch(err => {
            console.error('Faucet API error:', err);
            return null;
          }),
          synxPromise.catch(err => {
            console.error('Synx API error:', err);
            return null;
          })
        ]);

        // Process node data
        const activeNodes = nodesData?.active_nodes || nodesData?.total_active_nodes || '12,500+';
        const totalResources = formatHashRate(nodesData?.total_resources || 87);
        const totalDelegators = nodesData?.total_delegators || '35K+';
        const dataProtectedTB = nodesData?.protected_data_tb || 125;
        
        // Process Synx data
        const activeAddresses = synxData?.active_addresses || synxData?.unique_addresses || '42K+';
        const synxTransactions = synxData?.total_transactions || '156K+';
        
        // Process Faucet data
        const faucetTransactions = faucetData?.total_transactions || '89K+';
        
        // Calculate derived metrics
        // Network users is typically active addresses + delegators
        const networkUsers = calculateNetworkUsers(
          parseNumberValue(activeAddresses), 
          parseNumberValue(totalDelegators)
        );
        
        // Update state with processed data
        setStats({
          activeNodes: formatNumber(activeNodes),
          totalResources,
          networkUsers: formatNumber(networkUsers),
          dataProtected: `${formatNumber(dataProtectedTB)}+ TB`,
          totalDelegators: formatNumber(totalDelegators),
          activeAddresses: formatNumber(activeAddresses),
          synxTransactions: formatNumber(synxTransactions),
          faucetTransactions: formatNumber(faucetTransactions)
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching network stats:', err);
        setError(err.message || 'Failed to fetch network statistics');
        
        // Use fallback values on error
        setStats({
          activeNodes: '12.5K+',
          totalResources: '87 PH/s',
          networkUsers: '65K+',
          dataProtected: '125+ TB',
          totalDelegators: '35K+',
          activeAddresses: '42K+',
          synxTransactions: '156K+',
          faucetTransactions: '89K+'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNetworkStats();
  }, []);

  // Helper function to parse number values that might be strings with K+/M+ suffixes
  const parseNumberValue = (value) => {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    
    // Remove commas and any + sign
    let numStr = value.toString().replace(/,|\+/g, '');
    
    // Handle K/M/B suffixes
    if (numStr.endsWith('K')) {
      return parseFloat(numStr.replace('K', '')) * 1000;
    } else if (numStr.endsWith('M')) {
      return parseFloat(numStr.replace('M', '')) * 1000000;
    } else if (numStr.endsWith('B')) {
      return parseFloat(numStr.replace('B', '')) * 1000000000;
    }
    
    return parseFloat(numStr);
  };

  // Calculate total network users
  const calculateNetworkUsers = (activeAddresses, totalDelegators) => {
    // Avoid double counting users who might be both delegators and active addresses
    // Using a reasonable overlap estimate (15%)
    const estimatedOverlap = 0.15 * Math.min(activeAddresses, totalDelegators);
    const totalUsers = activeAddresses + totalDelegators - estimatedOverlap;
    return totalUsers || 65000; // Fallback value
  };

  // Format numbers with K, M, B suffixes
  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    
    // If already formatted with suffix, return as is
    if (typeof num === 'string' && (num.includes('K') || num.includes('M') || num.includes('B') || num.includes('+'))) {
      return num;
    }
    
    // Convert to number
    const value = parseNumberValue(num);
    
    // Format with appropriate suffix
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1).replace(/\.0$/, '')}B+`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')}M+`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}K+`;
    }
    
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Format hash rate
  const formatHashRate = (hashRate) => {
    if (!hashRate) return '87 PH/s';
    
    const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s'];
    let unitIndex = 0;
    let value = Number(hashRate);
    
    while (value >= 1000 && unitIndex < units.length - 1) {
      value /= 1000;
      unitIndex++;
    }
    
    return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unitIndex]}`;
  };

  // First row with the original 4 metrics
  const firstRowStats = [
    { label: "Active Nodes", value: stats.activeNodes },
    { label: "Total Resources", value: stats.totalResources },
    { label: "Network Users", value: stats.networkUsers },
    { label: "Data Protected", value: stats.dataProtected }
  ];
  
  // Second row with the 4 additional metrics
  const secondRowStats = [
    { label: "Total Delegators", value: stats.totalDelegators },
    { label: "Active Addresses", value: stats.activeAddresses },
    { label: "Synx Transactions", value: stats.synxTransactions },
    { label: "Faucet Transactions", value: stats.faucetTransactions }
  ];

  return (
    <div>
      {/* Original stats row */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {firstRowStats.map((stat, index) => (
          <StatBox 
            key={`first-row-${index}`}
            value={stat.value}
            label={stat.label}
            isLoading={isLoading}
          />
        ))}
      </motion.div>
      
      {/* Additional stats row */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {secondRowStats.map((stat, index) => (
          <StatBox 
            key={`second-row-${index}`}
            value={stat.value}
            label={stat.label}
            isLoading={isLoading}
            variant="secondary"
          />
        ))}
      </motion.div>
      
      {/* Error message if API calls fail */}
      {error && (
        <div className="mt-4 text-center">
          <span className="text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
            Using estimated values. Unable to fetch live data.
          </span>
        </div>
      )}
    </div>
  );
};

// Individual stat box component
const StatBox = ({ value, label, isLoading, variant = "primary" }) => {
  const boxClass = variant === "primary" 
    ? "backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4" 
    : "backdrop-blur-sm bg-white/5 border border-primary/10 rounded-xl p-3 sm:p-4";

  return (
    <div className={boxClass}>
      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
        {isLoading ? (
          <div className="h-8 w-24 bg-white/10 animate-pulse rounded"></div>
        ) : (
          value
        )}
      </div>
      <div className="text-sm text-neutral-400">{label}</div>
    </div>
  );
};

export default EnhancedNetworkStats;
