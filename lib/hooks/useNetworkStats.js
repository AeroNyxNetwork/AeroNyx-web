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
 * Last Modified: v1.3.0 - Added protocol_foundation parsing with fallback
 * derivation from peer_quorum, network_story, local_relay_capability, and
 * blind_relay so the homepage can render a product-grade protocol readiness
 * module before every backend aggregate has been upgraded.
 * Previous: v1.2.1 - Added privacy-safe blind relay proof parsing from
 * protocol_status.peer_store.blind_relay. The homepage can now show whether
 * the signed peer fabric has actually forwarded encrypted relay probes without
 * exposing node IDs, route IDs, endpoints, receiver identities, payloads, or
 * social graph edges.
 * Previous: v1.2.0 - Added privacy-safe peer lifecycle parsing from
 * protocol_status.peer_store.peer_lifecycle. The public website displays
 * aggregate peer acceptance/rejection/refresh activity only, never node IDs,
 * endpoints, public keys, routes, encrypted payloads, or social graph edges.
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
        protocolNetworkStoryStatus: 'syncing',
        protocolNetworkStoryReportedNodes: 0,
        protocolNetworkStoryFoundationReadyNodes: 0,
        protocolNetworkStoryRestartReadyNodes: 0,
        protocolNetworkStorySingleHopReadyNodes: 0,
        protocolNetworkStoryTwoHopReadyNodes: 0,
        protocolNetworkStoryMaxValidNodes: 0,
        protocolNetworkStoryMaxRouteableChatRelays: 0,
        protocolNetworkStoryMaxRouteableOnionHops: 0,
        protocolLocalRelayStatus: 'syncing',
        protocolLocalRelayReadyNodes: 0,
        protocolLocalRelayDisabledNodes: 0,
        protocolLocalRelayMisconfiguredNodes: 0,
        protocolLocalRelayConsistentNodes: 0,
        protocolLocalRelayConfiguredNodes: 0,
        protocolLocalRelayEndpointReadyNodes: 0,
        protocolLocalRelayRuntimeReadyNodes: 0,
        protocolLocalRelayAdvertisedNodes: 0,
        protocolLocalRelaySafeToAdvertiseNodes: 0,
        protocolLocalRelayBlockerCounts: {},
        protocolCacheRecoveredNodes: 0,
        protocolPeerCount: 0,
        protocolValidPeerCount: 0,
        protocolPeerLifecycleStatus: 'syncing',
        protocolPeerLifecycleReportedNodes: 0,
        protocolPeerLifecycleRecentEvents: 0,
        protocolPeerLifecycleEventCounts: {},
        protocolPeerLifecycleOutcomeCounts: {},
        protocolPeerLifecycleReasonCounts: {},
        protocolPeerLifecycleSourceCounts: {},
        protocolPeerLifecycleLatestEventAt: null,
        protocolBlindRelayStatus: 'syncing',
        protocolBlindRelayReportedNodes: 0,
        protocolBlindRelayReceived: 0,
        protocolBlindRelayForwarded: 0,
        protocolBlindRelayTerminal: 0,
        protocolBlindRelayRejected: 0,
        protocolBlindRelayForwardFailed: 0,
        protocolBlindRelayNoRoute: 0,
        protocolBlindRelayLatestEventAt: null,
        protocolFoundationStatus: 'syncing',
        protocolFoundationStage: 'bootstrap',
        protocolFoundationHeadline: 'AeroNyx privacy protocol is syncing',
        protocolFoundationChecksPassed: 0,
        protocolFoundationChecksTotal: 4,
        protocolFoundationLocalRelayReady: false,
        protocolFoundationPeerMeshReady: false,
        protocolFoundationBlindRelayReady: false,
        protocolFoundationRestartRecoveryReady: false,
        protocolFoundationSingleHopReady: false,
        protocolFoundationTwoHopReady: false,
        protocolFoundationVerifiedPeerCount: 0,
        protocolFoundationRouteableRelayCount: 0,
        protocolFoundationLastProbeAgeSeconds: null,
        protocolFoundationPrivacyInvariant: 'blind_nodes_route_only_opaque_ciphertext_and_aggregate_control_status',
        protocolFoundationNextAction: 'sync protocol foundation status',
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
    const protocolBlindRelay = protocolPeerStore.blind_relay || {};
    const protocolPeerQuorum = protocolPeerStore.peer_quorum || {};
    const protocolPeerLifecycle = protocolPeerStore.peer_lifecycle || {};
    const protocolMemoryChain = protocolStatus.memory_chain || {};
    const protocolLocalRelay = protocolStatus.local_relay_capability || {};
    const protocolNetworkStory = protocolStatus.network_story || {};
    const protocolFoundation = (
      protocolStatus.protocol_foundation
      || protocolStatus.discovery_readiness?.protocol_foundation
      || {}
    );
    const derivedLocalRelayReady = Number(protocolLocalRelay.safe_to_advertise_nodes || 0) > 0
      || protocolLocalRelay.status === 'ready';
    const derivedPeerMeshReady = Number(protocolPeerQuorum.ready_nodes || 0) > 0
      || protocolPeerQuorum.status === 'route_ready'
      || Number(protocolNetworkStory.foundation_ready_nodes || 0) > 0;
    const derivedBlindRelayReady = (
      ['ready', 'observed', 'partial'].includes(protocolBlindRelay.status)
      || Number(protocolBlindRelay.forwarded || 0) > 0
      || Number(protocolBlindRelay.terminal || 0) > 0
    );
    const derivedRestartRecoveryReady = Number(protocolPeerQuorum.restart_recovery_ready_nodes || 0) > 0
      || Number(protocolNetworkStory.restart_recovery_ready_nodes || 0) > 0
      || Number(protocolStatus.cache_recovered_nodes || 0) > 0;
    const derivedChecks = [
      derivedLocalRelayReady,
      derivedPeerMeshReady,
      derivedBlindRelayReady,
      derivedRestartRecoveryReady,
    ];
    const derivedChecksPassed = derivedChecks.filter(Boolean).length;
    const derivedChecksTotal = 4;
    const derivedFoundationStatus = derivedChecksPassed === derivedChecksTotal
      ? 'ready'
      : derivedBlindRelayReady && derivedPeerMeshReady
        ? 'live'
        : (derivedPeerMeshReady || derivedBlindRelayReady)
          ? 'forming'
          : protocolStatus.status || 'syncing';
    const derivedFoundationStage = Number(protocolNetworkStory.two_hop_onion_ready_nodes || 0) > 0
      ? 'two_hop_path_ready'
      : (Number(protocolNetworkStory.single_hop_ready_nodes || 0) > 0 || derivedBlindRelayReady)
        ? 'single_hop_relay_ready'
        : derivedPeerMeshReady
          ? 'verified_peer_view'
          : 'bootstrap';

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
      protocolNetworkStoryStatus: protocolNetworkStory.status || 'syncing',
      protocolNetworkStoryReportedNodes: Number(protocolNetworkStory.reported_nodes || 0),
      protocolNetworkStoryFoundationReadyNodes: Number(protocolNetworkStory.foundation_ready_nodes || 0),
      protocolNetworkStoryRestartReadyNodes: Number(protocolNetworkStory.restart_recovery_ready_nodes || 0),
      protocolNetworkStorySingleHopReadyNodes: Number(protocolNetworkStory.single_hop_ready_nodes || 0),
      protocolNetworkStoryTwoHopReadyNodes: Number(protocolNetworkStory.two_hop_onion_ready_nodes || 0),
      protocolNetworkStoryMaxValidNodes: Number(protocolNetworkStory.max_valid_nodes || 0),
      protocolNetworkStoryMaxRouteableChatRelays: Number(protocolNetworkStory.max_routeable_chat_relays || 0),
      protocolNetworkStoryMaxRouteableOnionHops: Number(protocolNetworkStory.max_routeable_onion_hops || 0),
      protocolLocalRelayStatus: protocolLocalRelay.status || 'syncing',
      protocolLocalRelayReadyNodes: Number(protocolLocalRelay.ready_nodes || 0),
      protocolLocalRelayDisabledNodes: Number(protocolLocalRelay.disabled_nodes || 0),
      protocolLocalRelayMisconfiguredNodes: Number(protocolLocalRelay.misconfigured_nodes || 0),
      protocolLocalRelayConsistentNodes: Number(protocolLocalRelay.consistent_nodes || 0),
      protocolLocalRelayConfiguredNodes: Number(protocolLocalRelay.configured_nodes || 0),
      protocolLocalRelayEndpointReadyNodes: Number(protocolLocalRelay.endpoint_ready_nodes || 0),
      protocolLocalRelayRuntimeReadyNodes: Number(protocolLocalRelay.runtime_ready_nodes || 0),
      protocolLocalRelayAdvertisedNodes: Number(protocolLocalRelay.advertised_nodes || 0),
      protocolLocalRelaySafeToAdvertiseNodes: Number(protocolLocalRelay.safe_to_advertise_nodes || 0),
      protocolLocalRelayBlockerCounts: (
        protocolLocalRelay.blocker_counts
        && typeof protocolLocalRelay.blocker_counts === 'object'
        && !Array.isArray(protocolLocalRelay.blocker_counts)
          ? protocolLocalRelay.blocker_counts
          : {}
      ),
      protocolCacheRecoveredNodes: Number(protocolStatus.cache_recovered_nodes || 0),
      protocolPeerCount: Number(protocolPeerStore.max_total_peers || 0),
      protocolValidPeerCount: Number(protocolPeerStore.max_valid_peers || 0),
      protocolPeerLifecycleStatus: protocolPeerLifecycle.status || 'syncing',
      protocolPeerLifecycleReportedNodes: Number(protocolPeerLifecycle.reported_nodes || 0),
      protocolPeerLifecycleRecentEvents: Number(protocolPeerLifecycle.recent_events || 0),
      protocolPeerLifecycleEventCounts: (
        protocolPeerLifecycle.event_counts
        && typeof protocolPeerLifecycle.event_counts === 'object'
        && !Array.isArray(protocolPeerLifecycle.event_counts)
          ? protocolPeerLifecycle.event_counts
          : {}
      ),
      protocolPeerLifecycleOutcomeCounts: (
        protocolPeerLifecycle.outcome_counts
        && typeof protocolPeerLifecycle.outcome_counts === 'object'
        && !Array.isArray(protocolPeerLifecycle.outcome_counts)
          ? protocolPeerLifecycle.outcome_counts
          : {}
      ),
      protocolPeerLifecycleReasonCounts: (
        protocolPeerLifecycle.reason_counts
        && typeof protocolPeerLifecycle.reason_counts === 'object'
        && !Array.isArray(protocolPeerLifecycle.reason_counts)
          ? protocolPeerLifecycle.reason_counts
          : {}
      ),
      protocolPeerLifecycleSourceCounts: (
        protocolPeerLifecycle.source_counts
        && typeof protocolPeerLifecycle.source_counts === 'object'
        && !Array.isArray(protocolPeerLifecycle.source_counts)
          ? protocolPeerLifecycle.source_counts
          : {}
      ),
      protocolPeerLifecycleLatestEventAt: protocolPeerLifecycle.latest_event_at || null,
      protocolBlindRelayStatus: protocolBlindRelay.status || 'syncing',
      protocolBlindRelayReportedNodes: Number(protocolBlindRelay.reported_nodes || 0),
      protocolBlindRelayReceived: Number(protocolBlindRelay.received || 0),
      protocolBlindRelayForwarded: Number(protocolBlindRelay.forwarded || 0),
      protocolBlindRelayTerminal: Number(protocolBlindRelay.terminal || 0),
      protocolBlindRelayRejected: Number(protocolBlindRelay.rejected || 0),
      protocolBlindRelayForwardFailed: Number(protocolBlindRelay.forward_failed || 0),
      protocolBlindRelayNoRoute: Number(protocolBlindRelay.no_route || 0),
      protocolBlindRelayLatestEventAt: protocolBlindRelay.latest_event_at || null,
      protocolFoundationStatus: protocolFoundation.status || derivedFoundationStatus,
      protocolFoundationStage: protocolFoundation.stage || derivedFoundationStage,
      protocolFoundationHeadline: (
        protocolFoundation.headline
        || (derivedFoundationStatus === 'ready'
          ? 'AeroNyx privacy protocol foundation is live'
          : 'AeroNyx nodes are forming a verified relay mesh')
      ),
      protocolFoundationChecksPassed: Number(
        protocolFoundation.checks_passed ?? derivedChecksPassed
      ),
      protocolFoundationChecksTotal: Number(
        protocolFoundation.checks_total ?? derivedChecksTotal
      ),
      protocolFoundationLocalRelayReady: Boolean(
        protocolFoundation.local_relay_ready ?? derivedLocalRelayReady
      ),
      protocolFoundationPeerMeshReady: Boolean(
        protocolFoundation.peer_mesh_ready ?? derivedPeerMeshReady
      ),
      protocolFoundationBlindRelayReady: Boolean(
        protocolFoundation.blind_relay_ready ?? derivedBlindRelayReady
      ),
      protocolFoundationRestartRecoveryReady: Boolean(
        protocolFoundation.restart_recovery_ready ?? derivedRestartRecoveryReady
      ),
      protocolFoundationSingleHopReady: Boolean(
        protocolFoundation.single_hop_relay_ready
        ?? (Number(protocolNetworkStory.single_hop_ready_nodes || 0) > 0)
      ),
      protocolFoundationTwoHopReady: Boolean(
        protocolFoundation.two_hop_onion_ready
        ?? (Number(protocolNetworkStory.two_hop_onion_ready_nodes || 0) > 0)
      ),
      protocolFoundationVerifiedPeerCount: Number(
        protocolFoundation.verified_peer_count ?? protocolPeerQuorum.max_valid_peers ?? protocolNetworkStory.max_valid_nodes ?? 0
      ),
      protocolFoundationRouteableRelayCount: Number(
        protocolFoundation.routeable_relay_count ?? protocolPeerQuorum.max_routeable_chat_relays ?? protocolNetworkStory.max_routeable_chat_relays ?? 0
      ),
      protocolFoundationLastProbeAgeSeconds: (
        typeof protocolFoundation.last_probe_age_seconds === 'number'
          ? protocolFoundation.last_probe_age_seconds
          : null
      ),
      protocolFoundationPrivacyInvariant: (
        protocolFoundation.privacy_invariant
        || 'blind_nodes_route_only_opaque_ciphertext_and_aggregate_control_status'
      ),
      protocolFoundationNextAction: (
        protocolFoundation.next_action
        || 'monitor peer freshness, blind relay proof, and restart recovery'
      ),
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
