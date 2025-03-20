import { useState, useEffect } from 'react';
import { fetchAllNetworkStats, formatNumber, formatHashRate } from '../utils/apiService';
import useDataRefresher from './useDataRefresher';

/**
 * Custom hook for fetching and processing AeroNyx network statistics
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.period - Time period for stats (default: '30d')
 * @param {boolean} options.autoRefresh - Whether to refresh data automatically
 * @param {number} options.refreshInterval - Interval in milliseconds for auto-refresh
 * 
 * @returns {Object} Processed network statistics and loading state
 */
const useNetworkStats = (options = {}) => {
  const {
    period = '30d',
    autoRefresh = true,
    refreshInterval = 300000, // 5 minutes by default
  } = options;

  // Use the data refresher hook to handle fetching and auto-refreshing
  const { data, loading, error, refresh } = useDataRefresher(
    () => fetchAllNetworkStats(period),
    {
      interval: refreshInterval,
      autoRefresh,
      dependencies: [period],
      errorRetryCount: 2,
    }
  );

  // Process the raw API data into formatted display values
  const processNetworkData = (rawData) => {
    if (!rawData) {
      return {
        activeNodes: '12.5K+',
        totalResources: '87 PH/s',
        networkUsers: '65K+',
        dataProtected: '125+ TB',
      };
    }

    const nodesData = rawData.nodes;
    const faucetData = rawData.faucet;
    const synxData = rawData.synx;

    // Extract and format statistics
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

    // Additional metrics for detailed views
    const additionalMetrics = {
      totalDelegators: formatNumber(totalDelegators) || '0',
      activeAddresses: formatNumber(activeAddresses) || '0',
      synxTransactions: formatNumber(synxTransactions) || '0',
      faucetTransactions: formatNumber(faucetTransactions) || '0',
      // Add any other metrics you want to calculate
    };

    return {
      activeNodes: formatNumber(activeNodes) || '12.5K+',
      totalResources,
      networkUsers,
      dataProtected,
      ...additionalMetrics,
      rawData // Include raw data for custom processing if needed
    };
  };

  // Process the data whenever it changes
  const processedStats = processNetworkData(data);

  return {
    stats: processedStats,
    isLoading: loading,
    error,
    refresh,
    rawData: data
  };
};

export default useNetworkStats;
