import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAllNetworkStats } from '../../lib/api/networkApi';

/**
 * UnifiedNetworkStats Component
 * Displays all 8 network metrics in a unified interface
 * Compatible with the existing UI structure
 */
const UnifiedNetworkStats = ({ className = '' }) => {
  // State for network metrics
  const [metrics, setMetrics] = useState({
    // Primary metrics (original 4)
    activeNodes: '12.5K+',
    totalResources: '87 PH/s',
    networkUsers: '65K+',
    dataProtected: '125+ TB',
    
    // Additional metrics (new 4)
    totalDelegators: '35K+',
    activeAddresses: '42K+',
    synxTransactions: '156K+',
    faucetTransactions: '89K+'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const loadNetworkStats = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllNetworkStats('30d');
        
        if (data && data.metrics) {
          setMetrics(data.metrics);
          setError(null);
        } else {
          throw new Error('Failed to get metrics data');
        }
      } catch (err) {
        console.error('Error loading network stats:', err);
        setError('Unable to fetch live network data');
        // Default values are already set in state
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNetworkStats();
  }, []);

  // Define primary metrics (original 4)
  const primaryMetrics = [
    { key: 'activeNodes', label: 'Active Nodes' },
    { key: 'totalResources', label: 'Total Resources' },
    { key: 'networkUsers', label: 'Network Users' },
    { key: 'dataProtected', label: 'Data Protected' }
  ];
  
  // Define additional metrics (new 4)
  const additionalMetrics = [
    { key: 'totalDelegators', label: 'Total Delegators' },
    { key: 'activeAddresses', label: 'Active Addresses' },
    { key: 'synxTransactions', label: 'Synx Transactions' },
    { key: 'faucetTransactions', label: 'Faucet Transactions' }
  ];

  return (
    <div className={className}>
      {/* Render the primary metrics row (always visible) */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {primaryMetrics.map((metric) => (
          <StatBox
            key={metric.key}
            value={metrics[metric.key]}
            label={metric.label}
            isLoading={isLoading}
          />
        ))}
      </motion.div>
      
      {/* Toggle button for showing additional metrics */}
      <div className="mt-4 mb-4 text-center">
        <button
          onClick={() => setShowAllMetrics(!showAllMetrics)}
          className="px-4 py-2 text-sm bg-primary/20 hover:bg-primary/30 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {showAllMetrics ? 'Hide Additional Metrics' : 'Show Additional Metrics'}
        </button>
      </div>
      
      {/* Conditional rendering of additional metrics */}
      {showAllMetrics && (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {additionalMetrics.map((metric) => (
            <StatBox
              key={metric.key}
              value={metrics[metric.key]}
              label={metric.label}
              isLoading={isLoading}
              variant="secondary"
            />
          ))}
        </motion.div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="mt-4 text-center">
          <span className="text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
            {error}. Using estimated values.
          </span>
        </div>
      )}
    </div>
  );
};

// Individual stat box component
const StatBox = ({ value, label, isLoading, variant = "primary" }) => {
  // Style variations
  const boxStyles = {
    primary: "backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4",
    secondary: "backdrop-blur-sm bg-white/5 border border-primary/10 rounded-xl p-3 sm:p-4"
  };

  return (
    <div className={boxStyles[variant]}>
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

export default UnifiedNetworkStats;
