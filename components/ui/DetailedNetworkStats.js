import React from 'react';
import { motion } from 'framer-motion';
import useNetworkStats from '../../lib/hooks/useNetworkStats';

/**
 * DetailedNetworkStats Component
 * Displays comprehensive statistics about the AeroNyx Network
 * Includes additional metrics beyond the basic stats component
 */
const DetailedNetworkStats = ({ 
  className = '',
  period = '30d',
  autoRefresh = true,
  refreshInterval = 300000
}) => {
  // Use our custom hook to fetch and manage network statistics
  const { stats, isLoading, error, refresh } = useNetworkStats({
    period,
    autoRefresh,
    refreshInterval
  });

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`${className}`}>
      {/* Section heading */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Network Statistics</h3>
        <p className="text-neutral-300">Real-time metrics from the AeroNyx Network</p>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-4">
              <div className="h-4 bg-white/10 rounded w-20 mb-2"></div>
              <div className="h-8 bg-white/10 rounded w-24"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="rounded-xl p-4 border border-amber-500/20 bg-amber-500/10 mb-6">
          <p className="text-amber-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            Unable to fetch live network data. Displaying estimated values.
          </p>
          <button 
            className="mt-2 text-sm text-amber-200 hover:text-amber-100 underline"
            onClick={refresh}
          >
            Try again
          </button>
        </div>
      )}

      {/* Stats display - only shown when not loading */}
      {!isLoading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {/* Primary statistics */}
          <StatCard
            title="Active Nodes"
            value={stats.activeNodes}
            description="Nodes currently online"
            icon="nodes"
            variants={itemVariants}
          />
          <StatCard
            title="Total Resources"
            value={stats.totalResources}
            description="Combined processing power"
            icon="resources"
            variants={itemVariants}
          />
          <StatCard
            title="Network Users"
            value={stats.networkUsers}
            description="Unique active users"
            icon="users"
            variants={itemVariants}
          />
          <StatCard
            title="Data Protected"
            value={stats.dataProtected}
            description="Encrypted data volume"
            icon="data"
            variants={itemVariants}
          />

          {/* Secondary statistics */}
          <StatCard
            title="Total Delegators"
            value={stats.totalDelegators}
            description="Resource providers"
            icon="delegators"
            variants={itemVariants}
          />
          <StatCard
            title="Active Addresses"
            value={stats.activeAddresses}
            description="Synx network users"
            icon="address"
            variants={itemVariants}
          />
          <StatCard
            title="Synx Transactions"
            value={stats.synxTransactions}
            description="30-day transaction volume"
            icon="transactions"
            variants={itemVariants}
          />
          <StatCard
            title="Faucet Transactions"
            value={stats.faucetTransactions}
            description="30-day faucet requests"
            icon="faucet"
            variants={itemVariants}
          />
        </motion.div>
      )}

      {/* Refresh indicator */}
      <div className="text-center mt-4">
        <button
          className="text-xs text-neutral-400 hover:text-primary transition-colors"
          onClick={refresh}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
};

/**
 * Individual stat card with icon and animation
 */
const StatCard = ({ title, value, description, icon, variants }) => {
  // Map of icons to use for each stat type
  const iconMap = {
    nodes: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    ),
    resources: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-4V3H6v7H2l8 8 8-8zM2 21h20"></path>
      </svg>
    ),
    users: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    data: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    ),
    delegators: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    ),
    address: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    transactions: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    faucet: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
      </svg>
    )
  };

  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
      variants={variants}
    >
      <div className="flex items-center space-x-2 mb-2">
        <div className="text-primary">
          {iconMap[icon] || iconMap.nodes}
        </div>
        <h4 className="text-sm font-medium text-neutral-300">{title}</h4>
      </div>
      <div className="text-2xl font-bold mb-1">{value || '0'}</div>
      <div className="text-xs text-neutral-400">{description}</div>
    </motion.div>
  );
};

export default DetailedNetworkStats;
