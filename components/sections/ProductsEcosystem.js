/**
 * ============================================
 * ProductsEcosystem.js - Optimized Version
 * ============================================
 * 
 * Modification Reason: v2.1 - Added MemChain as fifth product with
 * dedicated visual, OpenClaw integration callout, and memory chain
 * block visualization.
 * 
 * Last Modified: v2.3 - Removed unverified scale/cost claims and reframed
 * the product system as privacy protocol applications, agent payment rails,
 * encrypted service relay, protocol foundation, and Memory Chain.
 * ============================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';

const ProductsEcosystem = () => {
  const [selectedProduct, setSelectedProduct] = useState('vpn');
  
  const products = [
    {
      id: 'vpn',
      name: 'AeroNyx Privacy Access',
      category: 'Protocol Application',
      tagline: 'Private routing without trusting a company',
      
      useCase: {
        pain: 'Centralized privacy apps ask users to trust one company with all routing metadata',
        solution: 'AeroNyx routes through a blind privacy protocol where nodes see encrypted operations, not user content',
        savings: 'Use privacy as a protocol primitive, not another subscription silo.'
      },
      
      features: [
        'Blind relay fabric for encrypted routing',
        'Public aggregate network health without user-level telemetry',
        'Privacy access for humans, apps, and autonomous agents',
        'x402-ready payment rails for protocol services'
      ],
      
      comparison: {
        traditional: 'Centralized VPN: trust the provider',
        aeronyx: 'AeroNyx: verify the protocol boundary',
        savings: 'Own the privacy layer'
      },
      
      status: 'live',
      cta: {
        text: 'Get Privacy Access',
        link: '#download-vpn'
      }
    },
    {
      id: 'compute',
      name: 'Agent Payment Rails',
      category: 'Protocol Services',
      tagline: 'Machine-readable access for autonomous work',
      
      useCase: {
        pain: 'Agents still need human-owned accounts, API keys, billing pages, and trusted middlemen to use paid services',
        solution: 'AeroNyx prepares x402-compatible flows where a service quotes, an agent pays, and access is granted per request',
        savings: 'Turn paid access into a protocol primitive instead of another SaaS account.'
      },
      
      features: [
        'Request, quote, payment, and execution lifecycle',
        'Wallet-based identity for humans, apps, and agents',
        'Built for privacy-preserving service access',
        'Compatible with future node-operated protocol services'
      ],
      
      comparison: {
        traditional: 'Traditional API: account + billing portal',
        aeronyx: 'AeroNyx: quote + pay + execute',
        savings: 'Agent-native access'
      },
      
      status: 'beta',
      cta: {
        text: 'Join Beta',
        link: 'https://app.aeronyx.network'
      }
    },
    {
      id: 'cdn',
      name: 'Encrypted Service Relay',
      category: 'Developer Layer',
      tagline: 'Private routing for app and agent traffic',
      
      useCase: {
        pain: 'Apps and agents need to exchange data without exposing content, social graphs, or user-level telemetry to infrastructure operators',
        solution: 'AeroNyx nodes relay ciphertext and signed metadata while public dashboards only expose aggregate protocol health',
        savings: 'Ship privacy-preserving services without running a centralized trust boundary.'
      },
      
      features: [
        'Blind relay boundary for encrypted payloads',
        'Offline delivery primitives for secure messaging',
        'Privacy-safe lifecycle and peer health reporting',
        'Foundation for future multi-hop routing'
      ],
      
      comparison: {
        traditional: 'Central relay: operator sees the trust boundary',
        aeronyx: 'AeroNyx: nodes route ciphertext only',
        savings: 'Lower metadata exposure'
      },
      
      status: 'coming-soon',
      cta: {
        text: 'Join Waitlist',
        link: 'https://app.aeronyx.network/waitlist'
      }
    },
    {
      id: 'foundation',
      name: 'Privacy Protocol Foundation',
      category: 'Foundation Layer',
      tagline: 'Open Rust nodes, signed peer state, public health',
      
      useCase: {
        pain: 'Privacy products fail when every feature depends on a centralized service that can observe or be forced to disclose user behavior',
        solution: 'AeroNyx separates protocol state, node operations, public aggregates, and user-encrypted payloads from the start',
        savings: 'Build on an auditable privacy boundary instead of retrofitting one later.'
      },
      
      features: [
        'Rust node peer discovery and persistent peer store',
        'Privacy-safe heartbeat and lifecycle event reporting',
        'Nodeboard operations for health, capacity, and incidents',
        'Public network stats without user-level surveillance'
      ],
      
      comparison: {
        traditional: 'App stack: centralized observability first',
        aeronyx: 'AeroNyx: protocol privacy boundary first',
        savings: 'Credible by design'
      },
      
      status: 'live',
      cta: {
        text: 'View SDK Docs',
        link: 'https://docs.aeronyx.network/developer-documentation/overview'
      }
    },
    {
      id: 'memchain',
      name: 'MemChain',
      category: 'Encrypted Memory Layer',
      tagline: 'Versioned private memory for humans and agents',
      
      useCase: {
        pain: 'AI memories are trapped in vendor silos — switch tools, lose everything',
        solution: 'A personal, encrypted append-only memory chain that can travel across clients and agent tools',
        savings: 'Own the private context layer without exposing raw conversation history.'
      },
      
      features: [
        'Ed25519 signed, SHA-256 hashed memory facts',
        'Merkle tree blocks mined every hour',
        'Cross-device sync via encrypted protocol channels',
        'Agent integration with wallet-based identity'
      ],
      
      comparison: {
        traditional: 'Vendor memory: locked to one platform',
        aeronyx: 'MemChain: Owned by you, on your devices',
        savings: 'Total data sovereignty'
      },
      
      status: 'beta',
      cta: {
        text: 'Explore MemChain',
        link: '#memchain'
      }
    }
  ];
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'live':
        return <span className="text-green-400 text-xs uppercase tracking-wider">Live</span>;
      case 'beta':
        return <span className="text-yellow-400 text-xs uppercase tracking-wider">Beta</span>;
      case 'coming-soon':
        return <span className="text-white/40 text-xs uppercase tracking-wider">Coming Soon</span>;
      default:
        return null;
    }
  };
  
  const handleCtaClick = (e, link) => {
    if (link && link.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <section id="products" className="py-12 md:py-24 bg-black">
      <Container>
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
              Protocol Layers & Products
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto px-4">
              AeroNyx separates the open privacy protocol from the products built on
              top: privacy access, encrypted relay, Memory Chain, and agent-native services.
            </p>
          </div>
          
          {/* Product selector */}
          <div className="flex flex-nowrap overflow-x-auto gap-3 md:gap-4 mb-8 md:mb-12 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center scrollbar-hide">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product.id)}
                className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-3 border rounded-lg transition-all min-w-fit ${
                  selectedProduct === product.id
                    ? 'border-white/40 bg-white/5 text-white'
                    : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="text-xs md:text-sm font-medium whitespace-nowrap">{product.name}</div>
                <div className="text-xs opacity-60 mt-1">{product.category}</div>
              </button>
            ))}
          </div>
          
          {/* Product details */}
          <AnimatePresence mode="wait">
            {products.map((product) => {
              if (product.id !== selectedProduct) return null;
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-8 md:gap-12 items-start"
                >
                  {/* Visual */}
                  <div className="order-2 md:order-1 hidden md:block">
                    <ProductVisual productId={product.id} />
                  </div>
                  
                  {/* Content */}
                  <div className="order-1 md:order-2">
                    <div className="flex items-center gap-3 md:gap-4 mb-3">
                      <h3 className="text-2xl md:text-3xl font-light">{product.name}</h3>
                      {getStatusBadge(product.status)}
                    </div>
                    
                    <p className="text-base md:text-lg text-white/40 mb-6">
                      {product.tagline}
                    </p>
                    
                    {/* USE CASE Section */}
                    <div className="mb-6 p-4 bg-white/5 border-l-2 border-purple-500/40 rounded-r-lg">
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs uppercase tracking-wider text-white/40 mb-1">Pain Point</div>
                          <p className="text-sm text-white/70">{product.useCase.pain}</p>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-white/40 mb-1">Solution</div>
                          <p className="text-sm text-white/70">{product.useCase.solution}</p>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-green-400 mb-1">Protocol Value</div>
                          <p className="text-sm text-green-400 font-medium">{product.useCase.savings}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Value Comparison */}
                    <div className="mb-6 md:mb-8 p-4 bg-black/50 border border-white/10 rounded-lg">
                      <div className="text-xs uppercase tracking-wider text-white/40 mb-3">Architecture Comparison</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/60">Traditional</span>
                          <span className="text-white/80">{product.comparison.traditional}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/60">AeroNyx</span>
                          <span className="text-green-400 font-medium">{product.comparison.aeronyx}</span>
                        </div>
                        <div className="pt-2 border-t border-white/10">
                          <div className="text-center text-green-400 font-semibold">
                            {product.comparison.savings}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                      <div className="text-xs uppercase tracking-wider text-white/40 mb-2">Key Features</div>
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <div className="w-1 h-1 rounded-full bg-white/40 mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0" />
                          <span className="text-sm md:text-base text-white/60">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    {product.cta && (
                      <a
                        href={product.cta.link}
                        onClick={(e) => handleCtaClick(e, product.cta.link)}
                        target={product.cta.link.startsWith('http') ? '_blank' : undefined}
                        rel={product.cta.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-block px-6 md:px-8 py-2.5 md:py-3 border border-white/20 hover:border-white/40 transition-all"
                      >
                        <span className="text-xs md:text-sm uppercase tracking-wider">
                          {product.cta.text}
                        </span>
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {/* Bottom value proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 md:mt-16 text-center p-6 md:p-8 bg-white/5 border border-white/10 rounded-xl"
          >
            <h3 className="text-xl md:text-2xl font-light mb-3">
              Why This Belongs At The Protocol Layer
            </h3>
            <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto">
              Privacy access, encrypted messaging, private memory, and agent-to-agent services all
              need the same invariant: infrastructure can route, meter, and coordinate work without
              reading user content or turning public health data into user surveillance.
            </p>
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
};

// ============================================
// Product Visual Components
// ============================================

const ProductVisual = ({ productId }) => {
  const visuals = {
    foundation: <FoundationVisual />,
    vpn: <VPNVisual />,
    compute: <ComputeVisual />,
    cdn: <CDNVisual />,
    memchain: <MemChainProductVisual />
  };
  
  return (
    <div className="aspect-square bg-black border border-white/10 rounded-lg p-8 flex items-center justify-center">
      {visuals[productId] || <div className="text-white/20">Visual</div>}
    </div>
  );
};

const FoundationVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative">
      <svg className="w-48 h-48 md:w-64 md:h-64">
        {Array.from({ length: 6 }).map((_, i) => {
          const angle1 = (i / 6) * Math.PI * 2;
          const angle2 = ((i + 1) / 6) * Math.PI * 2;
          const x1 = 96 + Math.cos(angle1) * 60;
          const y1 = 96 + Math.sin(angle1) * 60;
          const x2 = 96 + Math.cos(angle2) * 60;
          const y2 = 96 + Math.sin(angle2) * 60;
          
          return (
            <g key={i}>
              <circle cx={x1} cy={y1} r="4" fill="rgba(119, 98, 243, 0.6)" />
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(119, 98, 243, 0.3)" strokeWidth="1" />
              <line x1={x1} y1={y1} x2="96" y2="96" stroke="rgba(119, 98, 243, 0.2)" strokeWidth="1" />
            </g>
          );
        })}
        <circle cx="96" cy="96" r="6" fill="rgba(119, 98, 243, 0.8)" />
      </svg>
    </div>
  </div>
);

const VPNVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-white/20 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            <path d="M12 8v8" />
            <path d="M12 8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
        </div>
      </div>
      <div className="text-sm text-white/60">Blind • Private • Verifiable</div>
    </div>
  </div>
);

const ComputeVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-10 h-10 md:w-12 md:h-12 border border-white/20 rounded flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="text-xs text-white/40">402</div>
        </motion.div>
      ))}
    </div>
  </div>
);

const CDNVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="text-center">
      <motion.div
        className="relative w-32 h-32 mx-auto"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 50 + Math.cos(angle) * 40;
          const y = 50 + Math.sin(angle) * 40;
          
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          );
        })}
      </motion.div>
      <div className="mt-4 text-xs text-white/40">Encrypted Relay</div>
    </div>
  </div>
);

const MemChainProductVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="space-y-3 w-full max-w-xs">
      {/* Chain of blocks */}
      {[3, 2, 1].map((height) => (
        <motion.div
          key={height}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (3 - height) * 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-mono text-purple-300">#{height}</span>
          </div>
          <div className="flex-1 h-px bg-purple-500/20" />
          <div className="text-xs text-white/40">{height * 5 + 3} facts</div>
        </motion.div>
      ))}
      
      {/* Pending */}
      <div className="flex items-center gap-3 opacity-60">
        <div className="w-10 h-10 rounded border border-dashed border-white/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xs text-white/30">⏳</span>
        </div>
        <div className="flex-1 h-px bg-white/10" />
        <div className="text-xs text-white/30">pending...</div>
      </div>
      
      <div className="text-center pt-4 text-xs text-white/40">
        Private Memory Chain
      </div>
    </div>
  </div>
);

export default ProductsEcosystem;
