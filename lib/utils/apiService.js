/**
 * API Service for AeroNyx Network
 * Provides functions to fetch and process data from AeroNyx APIs
 *
 * Public AeroNyx privacy protocol stats contract:
 *   GET https://api.aeronyx.network/api/privacy_network/vpn/public/network-stats/
 *
 * Backend source files:
 *   /root/aeronyx/privacy_network/api/vpn_observability.py
 *   /root/aeronyx/privacy_network/urls.py
 *
 * Rust reporting sources:
 *   /root/open/AeroNyx/crates/aeronyx-server/src/api/vpn_health.rs
 *   /root/open/AeroNyx/crates/aeronyx-server/src/handlers/packet.rs
 */

// Base API endpoints
const API_BASE_URL = 'https://api.aeronyx.network/api';
const DEFAULT_PERIOD = '30d';
const VPN_PUBLIC_STATS_ENDPOINT = `${API_BASE_URL}/privacy_network/vpn/public/network-stats/`;

/**
 * Fetches data from the nodes statistics API
 * @param {string} period - Time period for stats (e.g., '30d', '7d', '24h')
 * @returns {Promise<Object>} - Nodes statistics data
 */
export const fetchNodeStats = async (period = DEFAULT_PERIOD) => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/nodes/?period=${period}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch node stats: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching node stats:', error);
    throw error;
  }
};

/**
 * Fetches data from the faucet statistics API
 * @param {string} period - Time period for stats (e.g., '30d', '7d', '24h')
 * @returns {Promise<Object>} - Faucet statistics data
 */
export const fetchFaucetStats = async (period = DEFAULT_PERIOD) => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/faucet/?format=json&period=${period}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch faucet stats: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching faucet stats:', error);
    throw error;
  }
};

/**
 * Fetches data from the Synx statistics API
 * @param {string} period - Time period for stats (e.g., '30d', '7d', '24h')
 * @returns {Promise<Object>} - Synx statistics data
 */
export const fetchSynxStats = async (period = DEFAULT_PERIOD) => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/synx/?format=json&period=${period}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Synx stats: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Synx stats:', error);
    throw error;
  }
};

/**
 * Fetches public aggregate AeroNyx privacy protocol statistics.
 * This endpoint returns privacy-safe totals only: node/session counts,
 * encrypted traffic totals, and aggregate encrypted message forwarding counts.
 *
 * Backend:
 *   /root/aeronyx/privacy_network/api/vpn_observability.py
 */
export const fetchVpnNetworkStats = async () => {
  try {
    const response = await fetch(VPN_PUBLIC_STATS_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Failed to fetch privacy protocol stats: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching privacy protocol stats:', error);
    throw error;
  }
};

/**
 * Fetches all network statistics in a single call
 * @param {string} period - Time period for stats (e.g., '30d', '7d', '24h')
 * @returns {Promise<Object>} - Combined network statistics
 */
export const fetchAllNetworkStats = async (period = DEFAULT_PERIOD) => {
  try {
    const [nodesData, faucetData, synxData, vpnData] = await Promise.all([
      fetchNodeStats(period).catch(() => null),
      fetchFaucetStats(period).catch(() => null),
      fetchSynxStats(period).catch(() => null),
      fetchVpnNetworkStats().catch(() => null)
    ]);
    
    return {
      nodes: nodesData,
      faucet: faucetData,
      synx: synxData,
      vpn: vpnData
    };
  } catch (error) {
    console.error('Error fetching network stats:', error);
    throw error;
  }
};

/**
 * Formats numbers for display with K, M, B suffixes
 * @param {number|string} num - Number to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (num) => {
  if (!num && num !== 0) return null;
  
  // Handle string input
  if (typeof num === 'string') {
    if (num.includes('+') || num.includes('K') || num.includes('M')) {
      return num;
    }
    num = parseInt(num.replace(/,/g, ''), 10);
    if (isNaN(num)) return null;
  }
  
  // Format large numbers with K, M, B suffixes
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')}B+`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M+`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K+`;
  }
  
  // Format with commas for smaller numbers
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Formats hash rate values with appropriate units
 * @param {number} hashRate - Hash rate value
 * @returns {string} - Formatted hash rate with units
 */
export const formatHashRate = (hashRate) => {
  if (!hashRate) return null;
  
  // Convert to appropriate unit (PH/s, EH/s, etc.)
  const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s'];
  let unitIndex = 0;
  let value = Number(hashRate);
  
  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex++;
  }
  
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unitIndex]}`;
};

/**
 * Formats byte totals from the public AeroNyx privacy protocol stats endpoint.
 */
export const formatDataVolume = (bytes) => {
  const value = Number(bytes || 0);
  if (value >= 1024 ** 4) {
    return `${(value / (1024 ** 4)).toFixed(1).replace(/\.0$/, '')} TB`;
  }
  if (value >= 1024 ** 3) {
    return `${(value / (1024 ** 3)).toFixed(1).replace(/\.0$/, '')} GB`;
  }
  if (value >= 1024 ** 2) {
    return `${(value / (1024 ** 2)).toFixed(1).replace(/\.0$/, '')} MB`;
  }
  return `${value} B`;
};

export default {
  fetchNodeStats,
  fetchFaucetStats,
  fetchSynxStats,
  fetchVpnNetworkStats,
  fetchAllNetworkStats,
  formatNumber,
  formatHashRate,
  formatDataVolume
};
