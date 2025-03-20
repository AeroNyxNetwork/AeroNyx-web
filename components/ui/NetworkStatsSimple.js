import React, { useState, useEffect } from 'react';

/**
 * Simple Network Stats component that fetches data from APIs
 * and displays it in the existing UI structure
 */
const NetworkStatsSimple = () => {
  // State for stats data with default fallback values
  const [stats, setStats] = useState({
    activeNodes: '12.5K+',
    totalResources: '87 PH/s',
    networkUsers: '65K+',
    dataProtected: '125+ TB'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from APIs
  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        // API endpoints
        const nodeUrl = 'https://api.aeronyx.network/api/stats/nodes/?period=30d';
        const faucetUrl = 'https://api.aeronyx.network/api/stats/faucet/?format=json&period=30d';
        const synxUrl = 'https://api.aeronyx.network/api/stats/synx/?format=json&period=30d';
        
        // Fetch data from all endpoints
        const responses = await Promise.all([
          fetch(nodeUrl).then(res => res.ok ? res.json() : null),
          fetch(faucetUrl).then(res => res.ok ? res.json() : null),
          fetch(synxUrl).then(res => res.ok ? res.json() : null)
        ]);
        
        const [nodeData, faucetData, synxData] = responses;
        
        // Process data if available
        if (nodeData || synxData || faucetData) {
          // Extract metrics from node data
          const activeNodes = nodeData?.active_nodes || nodeData?.total_active_nodes || '12.5K+';
          const totalResources = nodeData?.total_resources 
            ? formatHashRate(nodeData.total_resources) 
            : '87 PH/s';
          const dataProtectedTB = nodeData?.protected_data_tb || 125;
          
          // Extract metrics from Synx data
          const totalDelegators = nodeData?.total_delegators || 0;
          const activeAddresses = synxData?.active_addresses || synxData?.unique_addresses || 0;
          
          // Calculate total network users (addresses + delegators)
          const totalUsers = calculateTotalUsers(activeAddresses, totalDelegators);
          
          // Update state with formatted values
          setStats({
            activeNodes: formatNumber(activeNodes),
            totalResources,
            networkUsers: formatNumber(totalUsers || 65000),
            dataProtected: `${formatNumber(dataProtectedTB)}+ TB`
          });
        }
      } catch (error) {
        console.error('Error fetching network stats:', error);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNetworkData();
  }, []);

  // Helper function to calculate total users
  function calculateTotalUsers(addresses, delegators) {
    if (!addresses && !delegators) return null;
    
    // Convert to numbers if they're strings
    const addressCount = typeof addresses === 'string' ? parseInt(addresses.replace(/[^\d]/g, ''), 10) : (addresses || 0);
    const delegatorCount = typeof delegators === 'string' ? parseInt(delegators.replace(/[^\d]/g, ''), 10) : (delegators || 0);
    
    // Avoid double counting with estimated overlap
    const estimatedOverlap = Math.min(addressCount, delegatorCount) * 0.15;
    return addressCount + delegatorCount - estimatedOverlap;
  }

  // Format numbers with K, M, B suffixes
  function formatNumber(num) {
    if (!num && num !== 0) return '0';
    
    // If already formatted, return as is
    if (typeof num === 'string' && /[KMB+]/.test(num)) {
      return num;
    }
    
    // Convert to number
    const value = typeof num === 'string' ? 
      parseInt(num.replace(/[^\d.]/g, ''), 10) : Number(num);
    
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
  }

  // Format hash rate
  function formatHashRate(hashRate) {
    if (!hashRate) return '87 PH/s';
    
    const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s'];
    let unitIndex = 0;
    let value = Number(hashRate);
    
    while (value >= 1000 && unitIndex < units.length - 1) {
      value /= 1000;
      unitIndex++;
    }
    
    return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unitIndex]}`;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8" style={{ opacity: 1, transform: 'none' }}>
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? 
            <div className="h-8 w-16 bg-white/10 animate-pulse rounded"></div> : 
            stats.activeNodes}
        </div>
        <div className="text-sm text-neutral-400">Active Nodes</div>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? 
            <div className="h-8 w-16 bg-white/10 animate-pulse rounded"></div> : 
            stats.totalResources}
        </div>
        <div className="text-sm text-neutral-400">Total Resources</div>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? 
            <div className="h-8 w-16 bg-white/10 animate-pulse rounded"></div> : 
            stats.networkUsers}
        </div>
        <div className="text-sm text-neutral-400">Network Users</div>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? 
            <div className="h-8 w-16 bg-white/10 animate-pulse rounded"></div> : 
            stats.dataProtected}
        </div>
        <div className="text-sm text-neutral-400">Data Protected</div>
      </div>
    </div>
  );
};

export default NetworkStatsSimple;
