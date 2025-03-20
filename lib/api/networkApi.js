/**
 * Network API Service
 * Handles fetching and processing data from AeroNyx APIs
 */

// API endpoints
const API_BASE_URL = 'https://api.aeronyx.network/api';
const ENDPOINTS = {
  nodes: `${API_BASE_URL}/stats/nodes/`,
  faucet: `${API_BASE_URL}/stats/faucet/`,
  synx: `${API_BASE_URL}/stats/synx/`
};

/**
 * Fetch data from the nodes API
 * @param {string} period - Time period for stats (default: '30d')
 * @returns {Promise<Object>} - Processed node data
 */
export const fetchNodeStats = async (period = '30d') => {
  try {
    const response = await fetch(`${ENDPOINTS.nodes}?period=${period}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch node stats: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching node stats:', error);
    return null;
  }
};

/**
 * Fetch data from the faucet API
 * @param {string} period - Time period for stats (default: '30d')
 * @returns {Promise<Object>} - Processed faucet data
 */
export const fetchFaucetStats = async (period = '30d') => {
  try {
    const response = await fetch(`${ENDPOINTS.faucet}?format=json&period=${period}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch faucet stats: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching faucet stats:', error);
    return null;
  }
};

/**
 * Fetch data from the Synx API
 * @param {string} period - Time period for stats (default: '30d')
 * @returns {Promise<Object>} - Processed Synx data
 */
export const fetchSynxStats = async (period = '30d') => {
  try {
    const response = await fetch(`${ENDPOINTS.synx}?format=json&period=${period}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Synx stats: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Synx stats:', error);
    return null;
  }
};

/**
 * Fetch all network statistics in parallel
 * @param {string} period - Time period for stats (default: '30d')
 * @returns {Promise<Object>} - Combined network statistics
 */
export const fetchAllNetworkStats = async (period = '30d') => {
  try {
    const [nodesData, faucetData, synxData] = await Promise.all([
      fetchNodeStats(period),
      fetchFaucetStats(period),
      fetchSynxStats(period)
    ]);
    
    return {
      nodesData,
      faucetData,
      synxData,
      
      // Process and return key metrics
      metrics: {
        // Core metrics
        activeNodes: extractValue(nodesData, 'active_nodes', 'total_active_nodes', '12.5K+'),
        totalResources: formatHashRate(extractValue(nodesData, 'total_resources', null, 87)),
        networkUsers: calculateNetworkUsers(nodesData, synxData),
        dataProtected: `${formatNumber(extractValue(nodesData, 'protected_data_tb', null, 125))}+ TB`,
        
        // Additional metrics
        totalDelegators: formatNumber(extractValue(nodesData, 'total_delegators', null, '35K+')),
        activeAddresses: formatNumber(extractValue(synxData, 'active_addresses', 'unique_addresses', '42K+')),
        synxTransactions: formatNumber(extractValue(synxData, 'total_transactions', null, '156K+')),
        faucetTransactions: formatNumber(extractValue(faucetData, 'total_transactions', null, '89K+'))
      }
    };
  } catch (error) {
    console.error('Error fetching all network stats:', error);
    
    // Return default values if fetching fails
    return {
      nodesData: null,
      faucetData: null,
      synxData: null,
      metrics: {
        activeNodes: '12.5K+',
        totalResources: '87 PH/s',
        networkUsers: '65K+',
        dataProtected: '125+ TB',
        totalDelegators: '35K+',
        activeAddresses: '42K+',
        synxTransactions: '156K+',
        faucetTransactions: '89K+'
      }
    };
  }
};

/**
 * Helper function to extract a value from data with fallbacks
 * @param {Object} data - The data object to extract from
 * @param {string} primaryKey - The primary key to look for
 * @param {string|null} fallbackKey - Fallback key if primary doesn't exist
 * @param {*} defaultValue - Default value if neither key exists
 * @returns {*} - The extracted value
 */
const extractValue = (data, primaryKey, fallbackKey, defaultValue) => {
  if (!data) return defaultValue;
  
  if (data[primaryKey] !== undefined) {
    return data[primaryKey];
  }
  
  if (fallbackKey && data[fallbackKey] !== undefined) {
    return data[fallbackKey];
  }
  
  return defaultValue;
};

/**
 * Calculate total network users from node delegators and Synx addresses
 * @param {Object} nodesData - Data from nodes API
 * @param {Object} synxData - Data from Synx API
 * @returns {string} - Formatted number of network users
 */
const calculateNetworkUsers = (nodesData, synxData) => {
  // Extract values with defaults
  const delegators = nodesData?.total_delegators || 0;
  const addresses = synxData?.active_addresses || synxData?.unique_addresses || 0;
  
  // Convert to numbers if they're strings
  const delegatorCount = typeof delegators === 'string' ? 
    parseFloat(delegators.replace(/[^\d.]/g, '')) : 
    Number(delegators);
    
  const addressCount = typeof addresses === 'string' ? 
    parseFloat(addresses.replace(/[^\d.]/g, '')) : 
    Number(addresses);
  
  if (isNaN(delegatorCount) && isNaN(addressCount)) {
    return '65K+'; // Default if both values are invalid
  }
  
  // Calculate total with overlap adjustment (15% overlap assumption)
  const estimatedOverlap = Math.min(
    isNaN(delegatorCount) ? 0 : delegatorCount, 
    isNaN(addressCount) ? 0 : addressCount
  ) * 0.15;
  
  const totalUsers = (isNaN(delegatorCount) ? 0 : delegatorCount) + 
                     (isNaN(addressCount) ? 0 : addressCount) - 
                     estimatedOverlap;
  
  return formatNumber(totalUsers || 65000);
};

/**
 * Format a number with K, M, B suffixes
 * @param {number|string} value - The number to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (value) => {
  if (value === undefined || value === null) return '0';
  
  // If already formatted with suffix, return as is
  if (typeof value === 'string' && /[KMB+]/.test(value)) {
    return value;
  }
  
  // Convert to number
  const num = typeof value === 'string' ? 
    parseFloat(value.replace(/[^\d.]/g, '')) : 
    Number(value);
  
  if (isNaN(num)) return '0';
  
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

/**
 * Format hash rate with appropriate units
 * @param {number|string} hashRate - Hash rate value
 * @returns {string} - Formatted hash rate string
 */
export const formatHashRate = (hashRate) => {
  if (!hashRate) return '87 PH/s';
  
  // Convert to number
  const value = typeof hashRate === 'string' ? 
    parseFloat(hashRate.replace(/[^\d.]/g, '')) : 
    Number(hashRate);
  
  if (isNaN(value)) return '87 PH/s';
  
  // Convert to appropriate unit
  const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s'];
  let unitIndex = 0;
  let scaledValue = value;
  
  while (scaledValue >= 1000 && unitIndex < units.length - 1) {
    scaledValue /= 1000;
    unitIndex++;
  }
  
  return `${scaledValue.toFixed(scaledValue < 10 ? 1 : 0)} ${units[unitIndex]}`;
};

export default {
  fetchNodeStats,
  fetchFaucetStats,
  fetchSynxStats,
  fetchAllNetworkStats,
  formatNumber,
  formatHashRate
};
