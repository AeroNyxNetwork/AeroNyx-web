import React, { useState, useEffect } from 'react';
import { fetchAllNetworkStats } from '../../lib/api/networkApi';

/**
 * LiveNetworkStats Component
 * A direct drop-in replacement for the original stats grid
 * that fetches live data from the API endpoints
 */
const LiveNetworkStats = () => {
  // State for metrics data
  const [metrics, setMetrics] = useState({
    activeNodes: '12.5K+',
    totalResources: '87 PH/s',
    networkUsers: '65K+',
    dataProtected: '125+ TB'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllNetworkStats('30d');
        
        if (data && data.metrics) {
          // Update state with fetched metrics
          setMetrics({
            activeNodes: data.metrics.activeNodes,
            totalResources: data.metrics.totalResources,
            networkUsers: data.metrics.networkUsers,
            dataProtected: data.metrics.dataProtected
          });
        }
      } catch (error) {
        console.error('Failed to fetch network metrics:', error);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Render the exact same structure as the original code
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8" style={{ opacity: 1, transform: 'none' }}>
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? (
            <div className="h-8 w-20 bg-white/10 animate-pulse rounded"></div>
          ) : (
            metrics.activeNodes
          )}
        </div>
        <div className="text-sm text-neutral-400">Active Nodes</div>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? (
            <div className="h-8 w-20 bg-white/10 animate-pulse rounded"></div>
          ) : (
            metrics.totalResources
          )}
        </div>
        <div className="text-sm text-neutral-400">Total Resources</div>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? (
            <div className="h-8 w-20 bg-white/10 animate-pulse rounded"></div>
          ) : (
            metrics.networkUsers
          )}
        </div>
        <div className="text-sm text-neutral-400">Network Users</div>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {isLoading ? (
            <div className="h-8 w-20 bg-white/10 animate-pulse rounded"></div>
          ) : (
            metrics.dataProtected
          )}
        </div>
        <div className="text-sm text-neutral-400">Data Protected</div>
      </div>
    </div>
  );
};

export default LiveNetworkStats;
