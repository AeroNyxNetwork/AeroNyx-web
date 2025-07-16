import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import DownloadsModal from '../ui/DownloadsModal';

const VPNDownloadSection = () => {
  const [showDownloads, setShowDownloads] = useState(false);
  
  const features = [
    {
      title: 'True Privacy',
      description: 'Zero-knowledge architecture means we cannot see your data, even if we wanted to'
    },
    {
      title: 'Global Network',
      description: '15,000+ nodes across 147 countries, all verified through cryptographic proofs'
    },
    {
      title: 'AI-Optimized',
      description: 'Intelligent routing finds the fastest path while maintaining maximum privacy'
    },
    {
      title: 'No Central Servers',
      description: 'Fully decentralized infrastructure eliminates single points of failure'
    }
  ];
  
  return (
    <section id="download-vpn" className="py-24 bg-neutral-950">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl font-light mb-6">
                AeroNyx VPN
                <span className="block text-xl text-white/40 mt-2">
                  Privacy without compromise
                </span>
              </h2>
              
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Built on our revolutionary privacy network, AeroNyx VPN represents the next 
                evolution in secure communications. No logs, no tracking, no compromise — 
                guaranteed by mathematics, not promises.
              </p>
              
              <div className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-1 h-1 rounded-full bg-white/40 mt-2 mr-3" />
                    <div>
                      <div className="font-medium text-white/80">{feature.title}</div>
                      <div className="text-sm text-white/60">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setShowDownloads(true)}
                className="px-8 py-4 bg-white text-black hover:bg-white/90 transition-all"
              >
                <span className="font-medium">Download Now</span>
              </button>
            </div>
            
            {/* Visual */}
            <div className="order-first lg:order-last">
              <VPNAppVisual />
            </div>
          </div>
        </div>
      </Container>
      
      <DownloadsModal 
        isOpen={showDownloads}
        onClose={() => setShowDownloads(false)}
      />
    </section>
  );
};

// VPN App Visual
const VPNAppVisual = () => {
  const [isConnected, setIsConnected] = useState(false);
  
  return (
    <div className="relative">
      {/* Phone mockup */}
      <div className="mx-auto w-72 h-[600px] bg-black rounded-[3rem] border-2 border-white/10 p-4">
        <div className="w-full h-full bg-neutral-900 rounded-[2.5rem] p-6 flex flex-col">
          {/* Status bar */}
          <div className="flex justify-between items-center mb-8 text-xs text-white/40">
            <span>9:41 AM</span>
            <div className="flex gap-1">
              <div className="w-4 h-3 border border-white/40 rounded-sm" />
              <div className="w-1 h-3 bg-white/40 rounded-sm" />
            </div>
          </div>
          
          {/* App content */}
          <div className="flex-1 flex flex-col">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="text-2xl font-light mb-2">AeroNyx VPN</div>
              <div className="text-sm text-white/40">Privacy Network</div>
            </div>
            
            {/* Connection button */}
            <div className="flex-1 flex items-center justify-center">
              <button
                onClick={() => setIsConnected(!isConnected)}
                className={`w-32 h-32 rounded-full border-2 transition-all duration-500 ${
                  isConnected 
                    ? 'border-green-400 bg-green-400/10' 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">
                    {isConnected ? '🛡️' : '⚡'}
                  </div>
                  <div className="text-sm">
                    {isConnected ? 'Connected' : 'Connect'}
                  </div>
                </div>
              </button>
            </div>
            
            {/* Status */}
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Status</span>
                <span className={isConnected ? 'text-green-400' : 'text-white/60'}>
                  {isConnected ? 'Protected' : 'Unprotected'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Location</span>
                <span className="text-white/60">
                  {isConnected ? 'Singapore' : '—'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">IP Address</span>
                <span className="text-white/60">
                  {isConnected ? '***.***.***' : '192.168.1.1'}
                </span>
              </div>
            </div>
            
            {/* Bottom bar */}
            <div className="flex justify-around pt-4 border-t border-white/10">
              <div className="text-center">
                <div className="w-6 h-6 mx-auto mb-1 border border-white/20 rounded" />
                <div className="text-xs text-white/40">Home</div>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 mx-auto mb-1 border border-white/20 rounded" />
                <div className="text-xs text-white/40">Nodes</div>
              </div>
              <div className="text-center">
                <div className="w-6 h-6 mx-auto mb-1 border border-white/20 rounded" />
                <div className="text-xs text-white/40">Settings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Connection animation */}
      {isConnected && (
        <div className="absolute inset-0 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-64 h-64 border border-green-400/20 rounded-full"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 2, opacity: [0, 0.5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1
              }}
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VPNDownloadSection;
