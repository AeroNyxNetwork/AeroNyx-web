import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * AdditionalMetrics Component
 * Displays the four additional metrics: Total Delegators, Active Addresses,
 * Synx Transactions, and Faucet Transactions
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

  // Fetch data on component mount
  useEffect(() => {
    const fetchAdditionalMetrics = async () => {
      try {
        setIsLoading(true);
        
        // Fetch data from the three API endpoints
        const [nodesData, faucetData, synxData] = await Promise.all([
          fetch('https://api.aeronyx.network/api/stats/nodes/?period=30d')
            .then(res => res.ok ? res.json() : null),
          fetch('https://api.aeronyx.network/api/stats/faucet/?format=json&period=30d')
            .then(res => res.ok ? res.json() : null),
          fetch('https://api.aeronyx.network/api/stats/synx/?format=json&period=30d')
            .then(res => res.ok ? res.json() : null)
        ]);

        // Extract metrics from the data
        const totalDelegators = nodesData?.total_delegators || '35K+';
        const activeAddresses = synxData?.active_addresses || synxData?.unique_addresses || '42K+';
        const synxTransactions = synxData?.total_transactions || '156K+';
        const faucetTransactions = faucetData?.total_transactions || '89K+';
        
        // Update state with the data
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

  // Format numbers with K, M, B suffixes
  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    
    // If already formatted with suffix, return as is
    if (typeof num === 'string' && /[KMB+]/.test(num)) {
      return num;
    }
    
    // Convert to number
    const value = typeof num === 'string' ? 
      parseFloat(num.replace(/[^\d.]/g, '')) : Number(num);
    
    if (isNaN(value)) return '0';
    
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

  // Define the stats to display
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
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white">Additional Network Metrics</h3>
        <p className="text-sm text-neutral-300">Key performance indicators from AeroNyx network</p>
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
      
      {/* Error message */}
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

export default AdditionalMetrics;
