import {
  fetchAllNetworkStats,
  fetchVpnNetworkStats,
  formatNumber,
  formatHashRate,
  formatDataVolume
} from '../utils/apiService';
import useDataRefresher from './useDataRefresher';

/**
 * Custom hook for fetching and processing AeroNyx network statistics
 *
 * Website privacy protocol counters use:
 *   GET /api/privacy_network/vpn/public/network-stats/
 *
 * Backend source:
 *   /root/aeronyx/privacy_network/api/vpn_observability.py
 *
 * Rust source:
 *   /root/open/AeroNyx/crates/aeronyx-server/src/api/vpn_health.rs
 *   /root/open/AeroNyx/crates/aeronyx-server/src/api/discovery.rs
 *   /root/open/AeroNyx/crates/aeronyx-server/src/server.rs
 *   /root/open/AeroNyx/crates/aeronyx-server/src/handlers/packet.rs
 *   /root/open/AeroNyx/crates/aeronyx-server/src/services/peer_store.rs
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.period - Time period for stats (default: '30d')
 * @param {boolean} options.autoRefresh - Whether to refresh data automatically
 * @param {number} options.refreshInterval - Interval in milliseconds for auto-refresh
 * @param {boolean} options.includeLegacyStats - Whether to also call legacy node/faucet/synx stats
 * 
 * @returns {Object} Processed network statistics and loading state
 */
const useNetworkStats = (options = {}) => {
  const {
    period = '30d',
    autoRefresh = true,
    refreshInterval = 300000, // 5 minutes by default
    includeLegacyStats = false,
  } = options;

  const fetchNetworkStats = async () => {
    if (includeLegacyStats) {
      return fetchAllNetworkStats(period);
    }

    const vpnData = await fetchVpnNetworkStats();
    return {
      nodes: null,
      faucet: null,
      synx: null,
      vpn: vpnData,
    };
  };

  // Use the data refresher hook to handle fetching and auto-refreshing
  const { data, loading, error, refresh } = useDataRefresher(
    fetchNetworkStats,
    {
      interval: refreshInterval,
      autoRefresh,
      dependencies: [period, includeLegacyStats],
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
        vpnOnlineNodes: '0',
        vpnTotalNodes: '0',
        vpnActiveSessions: '0',
        encryptedTraffic: '0 B',
        encryptedTrafficBytes: null,
        encryptedMessages: 'Syncing',
        encryptedMessagesRaw: null,
        protocolStatus: 'syncing',
        protocolReportedNodes: 0,
        protocolHealthyNodes: 0,
        protocolRelayReadyNodes: 0,
        protocolLocalRelayStatus: 'syncing',
        protocolLocalRelayReadyNodes: 0,
        protocolLocalRelayDisabledNodes: 0,
        protocolLocalRelayMisconfiguredNodes: 0,
        protocolLocalRelayConsistentNodes: 0,
        protocolCacheRecoveredNodes: 0,
        protocolPeerCount: 0,
        protocolValidPeerCount: 0,
        protocolRecoverySources: [],
        protocolMemoryChainMode: 'local_encrypted_ledger',
        protocolMemoryChainConsensus: 'planned',
        protocolLastReportedAt: null,
      };
    }

    const nodesData = rawData.nodes;
    const faucetData = rawData.faucet;
    const synxData = rawData.synx;
    const vpnData = rawData.vpn?.data || {};
    const vpnNetwork = vpnData.network || {};
    const vpnSessions = vpnData.sessions || {};
    const vpnTraffic = vpnData.encrypted_traffic || {};
    const vpnMessages = vpnData.encrypted_message_forwarding || {};
    const protocolStatus = vpnData.protocol_status || {};
    const protocolPeerStore = protocolStatus.peer_store || {};
    const protocolMemoryChain = protocolStatus.memory_chain || {};
    const protocolLocalRelay = protocolStatus.local_relay_capability || {};

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
      vpnOnlineNodes: formatNumber(vpnNetwork.online_vpn_nodes || 0) || '0',
      vpnTotalNodes: formatNumber(vpnNetwork.vpn_nodes || 0) || '0',
      vpnActiveSessions: formatNumber(vpnSessions.active_sessions || 0) || '0',
      encryptedTraffic: formatDataVolume(vpnTraffic.total_bytes || 0),
      encryptedTrafficBytes: (
        typeof vpnTraffic.total_bytes === 'number'
          ? vpnTraffic.total_bytes
          : null
      ),
      encryptedMessages: (
        typeof vpnMessages.count === 'number'
          ? formatNumber(vpnMessages.count)
          : 'Syncing'
      ),
      encryptedMessagesRaw: (
        typeof vpnMessages.count === 'number'
          ? vpnMessages.count
          : null
      ),
      protocolStatus: protocolStatus.status || 'syncing',
      protocolReportedNodes: Number(protocolStatus.reported_nodes || 0),
      protocolHealthyNodes: Number(protocolStatus.healthy_nodes || 0),
      protocolRelayReadyNodes: Number(protocolStatus.relay_foundation_ready_nodes || 0),
      protocolLocalRelayStatus: protocolLocalRelay.status || 'syncing',
      protocolLocalRelayReadyNodes: Number(protocolLocalRelay.ready_nodes || 0),
      protocolLocalRelayDisabledNodes: Number(protocolLocalRelay.disabled_nodes || 0),
      protocolLocalRelayMisconfiguredNodes: Number(protocolLocalRelay.misconfigured_nodes || 0),
      protocolLocalRelayConsistentNodes: Number(protocolLocalRelay.consistent_nodes || 0),
      protocolCacheRecoveredNodes: Number(protocolStatus.cache_recovered_nodes || 0),
      protocolPeerCount: Number(protocolPeerStore.max_total_peers || 0),
      protocolValidPeerCount: Number(protocolPeerStore.max_valid_peers || 0),
      protocolRecoverySources: Array.isArray(protocolPeerStore.restart_recovery_sources)
        ? protocolPeerStore.restart_recovery_sources
        : [],
      protocolLatestGossipAt: protocolPeerStore.latest_gossip_at || null,
      protocolMemoryChainMode: protocolMemoryChain.mode || 'local_encrypted_ledger',
      protocolMemoryChainConsensus: protocolMemoryChain.network_consensus || 'planned',
      protocolLastReportedAt: protocolStatus.last_reported_at || null,
      vpnRegions: formatNumber(vpnNetwork.regions_count || 0) || '0',
      vpnStatsUpdatedAt: vpnData.generated_at || null,
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
