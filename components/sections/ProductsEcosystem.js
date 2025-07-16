import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';

const ProductsEcosystem = () => {
  const [selectedProduct, setSelectedProduct] = useState('vpn');
  
  const products = [
    {
      id: 'foundation',
      name: 'Privacy Network',
      category: 'Foundation Layer',
      description: 'The core privacy infrastructure that powers all AeroNyx applications',
      features: [
        'Zero-knowledge proof verification',
        'End-to-end encrypted communications',
        'Decentralized node network',
        'Privacy-preserving routing'
      ],
      status: 'live',
      cta: null
    },
    {
      id: 'vpn',
      name: 'AeroNyx VPN',
      category: 'Consumer Application',
      description: 'Privacy-first VPN built on our decentralized network',
      features: [
        'No-logs guarantee enforced by cryptography',
        'Distributed exit nodes across 50+ countries',
        'AI-optimized routing for best performance',
        'Pay with cryptocurrency for full anonymity'
      ],
      status: 'live',
      cta: {
        text: 'Download VPN',
        link: '#download-vpn'
      }
    },
    {
      id: 'compute',
      name: 'Distributed Compute',
      category: 'Enterprise Solution',
      description: 'Rent computing power from our global network',
      features: [
        'GPU/CPU resources on demand',
        'Verified hardware via ZKP',
        'Pay only for what you use',
        'AI workload optimization'
      ],
      status: 'beta',
      cta: {
        text: 'Join Beta',
        link: 'https://app.aeronyx.network'
      }
    },
    {
      id: 'ai-agent',
      name: 'AI Infrastructure Agent',
      category: 'Developer Tool',
      description: 'Autonomous management for your infrastructure',
      features: [
        'Natural language infrastructure control',
        'Self-optimizing resource allocation',
        'Predictive maintenance',
        'Cost optimization AI'
      ],
      status: 'coming-soon',
      cta: null
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
              Products & Applications
            </h2>
            <p className="text-base md:text-xl text-white/40 max-w-3xl mx-auto px-4">
              From foundational privacy infrastructure to consumer applications and enterprise solutions — 
              all powered by the Autonomous Intelligence Layer.
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
                  className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  {/* Visual representation - Hidden on mobile for better performance */}
                  <div className="order-2 md:order-1 hidden md:block">
                    <ProductVisual productId={product.id} />
                  </div>
                  
                  {/* Content */}
                  <div className="order-1 md:order-2">
                    <div className="flex items-center gap-3 md:gap-4 mb-4">
                      <h3 className="text-2xl md:text-3xl font-light">{product.name}</h3>
                      {getStatusBadge(product.status)}
                    </div>
                    
                    <p className="text-sm md:text-lg text-white/60 mb-6 md:mb-8">
                      {product.description}
                    </p>
                    
                    <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <div className="w-1 h-1 rounded-full bg-white/40 mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0" />
                          <span className="text-sm md:text-base text-white/60">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {product.cta && (
                      <a
                        href={product.cta.link}
                        onClick={(e) => handleCtaClick(e, product.cta.link)}
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
    'ai-agent': <AIAgentVisual />
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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-xs uppercase tracking-wider text-white/40">Privacy Layer</div>
      </div>
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

const AIAgentVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="text-center">
      <motion.div
        className="w-32 h-32 mx-auto rounded-full border border-white/20 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="text-4xl text-white/40">AI</div>
      </motion.div>
      <div className="mt-4 text-xs text-white/40">Thinking...</div>
    </div>
  </div>
);

export default ProductsEcosystem;
