import React from 'react';
import { motion } from 'framer-motion';
import useNetworkStats from '../../lib/hooks/useNetworkStats';

/**
 * Network Stats Component
 * Displays key statistics from the AeroNyx Network using real-time API data
 */
const NetworkStats = ({ refreshInterval = 300000 }) => {
  // Use our custom hook to fetch and manage network statistics
  const { stats, isLoading, error } = useNetworkStats({
    period: '30d',
    autoRefresh: true,
    refreshInterval
  });

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
        isLoading={isLoading}
      />
      <StatBox 
        value={stats.totalResources}
        label="Total Resources"
        isLoading={isLoading}
      />
      <StatBox 
        value={stats.networkUsers}
        label="Network Users"
        isLoading={isLoading}
      />
      <StatBox 
        value={stats.dataProtected}
        label="Data Protected"
        isLoading={isLoading}
      />
      
      {/* Error message display if API calls fail */}
      {error && (
        <div className="col-span-4 text-center mt-2">
          <span className="text-xs text-amber-400">
            Using estimated values. Live data unavailable.
          </span>
        </div>
      )}
    </motion.div>
  );
};

/**
 * Individual stat box component with loading state
 */
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
