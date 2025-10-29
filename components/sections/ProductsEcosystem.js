/**
 * ============================================
 * ProductsEcosystem.js - Optimized Version
 * ============================================
 * 
 * Last Modified: v2.0 - Commercial value optimization
 * ============================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';

const ProductsEcosystem = () => {
  const [selectedProduct, setSelectedProduct] = useState('vpn');
  
  /**
   * PRODUCT STRUCTURE - Updated with business value focus
   * Each product now includes: pain point → solution → quantified savings
   */
  const products = [
    {
      id: 'vpn',
      name: 'AeroNyx VPN',
      category: 'Consumer Application',
      tagline: 'Privacy without compromise',
      
      // USE CASE driven approach
      useCase: {
        pain: 'Traditional VPNs log your data and sell it to advertisers',
        solution: 'Zero-knowledge architecture ensures we cannot see your data, even if we wanted to',
        savings: 'Pay only when you use it. No monthly subscriptions.'
      },
      
      features: [
        'Cryptographically enforced no-logs guarantee',
        'Distributed exit nodes across 50+ countries',
        'AI-optimized routing for best performance',
        'Pay with crypto for full anonymity'
      ],
      
      comparison: {
        traditional: 'ExpressVPN: $12.95/month',
        aeronyx: 'AeroNyx: Pay per use, ~$3-5/month',
        savings: 'Save 60-70%'
      },
      
      status: 'live',
      cta: {
        text: 'Download VPN',
        link: '#download-vpn'
      }
    },
    {
      id: 'compute',
      name: 'Distributed Compute',
      category: 'For AI Developers',
      tagline: 'GPU power on demand',
      
      useCase: {
        pain: 'AWS charges $100/month even when you use 5 days',
        solution: 'Rent GPU power by the hour via x402 instant payments',
        savings: 'Pay $20 for what you actually use — 80% cost reduction'
      },
      
      features: [
        'H100 & A100 GPUs available globally',
        'ZKP-verified hardware capabilities',
        'Pay only for compute time used',
        'Scale from 1 to 1000 GPUs instantly'
      ],
      
      comparison: {
        traditional: 'AWS Lambda: $0.20/GB-hour',
        aeronyx: 'AeroNyx: $0.05/GB-hour',
        savings: 'Save 75%'
      },
      
      status: 'beta',
      cta: {
        text: 'Join Beta',
        link: 'https://app.aeronyx.network'
      }
    },
    {
      id: 'cdn',
      name: 'Decentralized CDN',
      category: 'For Enterprises',
      tagline: 'Global content delivery',
      
      useCase: {
        pain: 'Cloudflare charges $10K/month for global CDN',
        solution: 'Distributed nodes deliver content with x402 pay-per-request pricing',
        savings: 'Cut CDN costs by 70% with our decentralized network'
      },
      
      features: [
        '15,000+ edge nodes in 147 countries',
        'Sub-50ms latency worldwide',
        'DDoS protection via network distribution',
        'Pay per GB transferred, not monthly fees'
      ],
      
      comparison: {
        traditional: 'Cloudflare: $200/TB',
        aeronyx: 'AeroNyx: $50/TB',
        savings: 'Save 75%'
      },
      
      status: 'coming-soon',
      cta: {
        text: 'Join Waitlist',
        link: 'https://app.aeronyx.network/waitlist'
      }
    },
    {
      id: 'foundation',
      name: 'Privacy Network',
      category: 'Foundation Layer',
      tagline: 'The infrastructure beneath',
      
      useCase: {
        pain: 'Building privacy infrastructure from scratch costs millions',
        solution: 'Build on our battle-tested network with 15,000+ verified nodes',
        savings: 'Skip 2+ years of development and millions in costs'
      },
      
      features: [
        'Zero-knowledge proof verification',
        'End-to-end encrypted communications',
        'Decentralized node network',
        'Privacy-preserving routing'
      ],
      
      comparison: {
        traditional: 'Build from scratch: $2M+ dev cost',
        aeronyx: 'AeroNyx SDK: Start building today',
        savings: 'Save 2+ years'
      },
      
      status: 'live',
      cta: {
        text: 'View SDK Docs',
        link: 'https://docs.aeronyx.network/developer-documentation/overview'
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
  
  // Handle smooth scrolling for CTA links
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
              Products & Use Cases
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto px-4">
              From consumer privacy to enterprise infrastructure — all enabled by 
              x402 instant payments and zero-knowledge verification.
            </p>
          </div>
          
          {/* Product selector - Horizontal scroll on mobile */}
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
                  {/* Visual representation - Hidden on mobile for performance */}
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
                    
                    {/* USE CASE Section - NEW */}
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
                          <div className="text-xs uppercase tracking-wider text-green-400 mb-1">Savings</div>
                          <p className="text-sm text-green-400 font-medium">{product.useCase.savings}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Value Comparison - NEW */}
                    <div className="mb-6 md:mb-8 p-4 bg-black/50 border border-white/10 rounded-lg">
                      <div className="text-xs uppercase tracking-wider text-white/40 mb-3">Cost Comparison</div>
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
              Why x402 Makes This Possible
            </h3>
            <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto">
              Traditional infrastructure requires monthly commitments because processing payments 
              is expensive. With x402 instant settlements, we can offer true pay-per-use pricing — 
              you only pay for the exact resources you consume, down to the millisecond.
            </p>
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
};

// Product visual components - Simplified for mobile
const ProductVisual = ({ productId }) => {
  const visuals = {
    foundation: <FoundationVisual />,
    vpn: <VPNVisual />,
    compute: <ComputeVisual />,
    cdn: <CDNVisual />
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
      {/* Network mesh */}
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
      <div className="text-sm text-white/60">Secure • Private • Fast</div>
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
          <div className="text-xs text-white/40">GPU</div>
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
        {/* Globe */}
        <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
        
        {/* Nodes around globe */}
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
      <div className="mt-4 text-xs text-white/40">Global Network</div>
    </div>
  </div>
);

export default ProductsEcosystem;
