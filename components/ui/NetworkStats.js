import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAllNetworkStats, formatNumber, formatHashRate } from '../../lib/utils/apiService';

/**
 * Network Stats Component
 * Fetches and displays key statistics from the AeroNyx Network APIs
 */
const NetworkStats = () => {
  // State for storing API data
  const [stats, setStats] = useState({
    activeNodes: '0',
    totalResources: '0',
    networkUsers: '0',
    dataProtected: '0',
    isLoading: true,
    error: null
  });

  // Fetch data from multiple endpoints
  useEffect(() => {
    const fetchNetworkStats = async () => {
      try {
        // Fetch all network statistics using our API service
        const data = await fetchAllNetworkStats('30d');
        
        // Extract relevant statistics from the response
        const nodesData = data.nodes;
        const faucetData = data.faucet;
        const synxData = data.synx;

        // Process the data
        const activeNodes = nodesData?.total_active_nodes || nodesData?.active_nodes || '12,500+';
        const totalResourcesRaw = nodesData?.total_resources || 87;
        const totalResources = formatHashRate(totalResourcesRaw) || '87 PH/s';
        
        const totalDelegators = nodesData?.total_delegators || 0;
        const activeAddresses = synxData?.active_addresses || synxData?.unique_addresses || 0;
        const synxTransactions = synxData?.total_transactions || 0;
        const faucetTransactions = faucetData?.total_transactions || 0;

        // Calculate network users (sum of active addresses and delegators)
        const networkUsers = formatNumber(totalDelegators + activeAddresses) || '65K+';
        
        // Calculate data protected (estimated from node resources)
        const dataProtectedRaw = nodesData?.protected_data_tb || 125;
        const dataProtected = `${formatNumber(dataProtectedRaw)}+ TB`;

        // Update state with fetched data
        setStats({
          activeNodes: formatNumber(activeNodes) || '12.5K+',
          totalResources: totalResources,
          networkUsers: networkUsers,
          dataProtected: dataProtected,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching network stats:', error);
        
        // Set error state but keep default values visible
        setStats({
          activeNodes: '12.5K+',
          totalResources: '87 PH/s',
          networkUsers: '65K+',
          dataProtected: '125+ TB',
          isLoading: false,
          error: error.message
        });
      }
    };

    fetchNetworkStats();
  }, []);

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Stats boxes with animated values */}
      <StatBox 
        value={stats.activeNodes}
        label="Active Nodes"
        isLoading={stats.isLoading}
      />
      <StatBox 
        value={stats.totalResources}
        label="Total Resources"
        isLoading={stats.isLoading}
      />
      <StatBox 
        value={stats.networkUsers}
        label="Network Users"
        isLoading={stats.isLoading}
      />
      <StatBox 
        value={stats.dataProtected}
        label="Data Protected"
        isLoading={stats.isLoading}
      />
      
      {/* Error message display if API calls fail */}
      {stats.error && (
        <div className="col-span-4 text-center mt-2">
          <span className="text-xs text-amber-400">
            Using estimated values. Live data unavailable.
          </span>
        </div>
      )}
    </motion.div>
  );
};

// Individual stat box component with loading state
const StatBox = ({ value, label, isLoading }) => {
  return (
    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
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

export default NetworkStats;
