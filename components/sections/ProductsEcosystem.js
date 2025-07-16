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
  
  return (
    <section id="products" className="py-24 bg-black">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Products & Applications
            </h2>
            <p className="text-xl text-white/40 max-w-3xl mx-auto">
              From foundational privacy infrastructure to consumer applications and enterprise solutions — 
              all powered by the Autonomous Intelligence Layer.
            </p>
          </div>
          
          {/* Product selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product.id)}
                className={`px-6 py-3 border rounded-lg transition-all ${
                  selectedProduct === product.id
                    ? 'border-white/40 bg-white/5 text-white'
                    : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="text-sm font-medium">{product.name}</div>
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
                  className="grid md:grid-cols-2 gap-12 items-center"
                >
                  {/* Visual representation */}
                  <div className="order-2 md:order-1">
                    <ProductVisual productId={product.id} />
                  </div>
                  
                  {/* Content */}
                  <div className="order-1 md:order-2">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-3xl font-light">{product.name}</h3>
                      {getStatusBadge(product.status)}
                    </div>
                    
                    <p className="text-lg text-white/60 mb-8">
                      {product.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <div className="w-1 h-1 rounded-full bg-white/40 mt-2 mr-3" />
                          <span className="text-white/60">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {product.cta && (
                      <a
                        href={product.cta.link}
                        className="inline-block px-8 py-3 border border-white/20 hover:border-white/40 transition-all"
                      >
                        <span className="text-sm uppercase tracking-wider">
                          {product.cta.text}
                        </span>
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {/* Ecosystem diagram */}
          <motion.div
            className="mt-24 pt-16 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-light text-center mb-12">
              The AeroNyx Ecosystem
            </h3>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Center: AIL */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/20 flex items-center justify-center bg-black">
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wider text-white/40">Core</div>
                  <div className="text-sm">AIL</div>
                </div>
              </div>
              
              {/* Orbiting products */}
              <div className="relative h-96">
                {products.map((product, i) => {
                  const angle = (i / products.length) * Math.PI * 2;
                  const x = Math.cos(angle) * 150 + 192; // 192 = half of 384 (h-96)
                  const y = Math.sin(angle) * 150 + 192;
                  
                  return (
                    <div
                      key={product.id}
                      className="absolute w-24 h-24 rounded-full border border-white/10 flex items-center justify-center bg-black hover:border-white/30 transition-all cursor-pointer"
                      style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
                      onClick={() => setSelectedProduct(product.id)}
                    >
                      <div className="text-center">
                        <div className="text-xs">{product.name.split(' ')[0]}</div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {products.map((_, i) => {
                    const angle = (i / products.length) * Math.PI * 2;
                    const x = Math.cos(angle) * 150 + 192;
                    const y = Math.sin(angle) * 150 + 192;
                    
                    return (
                      <line
                        key={i}
                        x1="192"
                        y1="192"
                        x2={x}
                        y2={y}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

// Product visual components
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
      <svg className="w-64 h-64">
        {Array.from({ length: 6 }).map((_, i) => {
          const angle1 = (i / 6) * Math.PI * 2;
          const angle2 = ((i + 1) / 6) * Math.PI * 2;
          const x1 = 128 + Math.cos(angle1) * 80;
          const y1 = 128 + Math.sin(angle1) * 80;
          const x2 = 128 + Math.cos(angle2) * 80;
          const y2 = 128 + Math.sin(angle2) * 80;
          
          return (
            <g key={i}>
              <circle cx={x1} cy={y1} r="4" fill="rgba(119, 98, 243, 0.6)" />
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(119, 98, 243, 0.3)" strokeWidth="1" />
              <line x1={x1} y1={y1} x2="128" y2="128" stroke="rgba(119, 98, 243, 0.2)" strokeWidth="1" />
            </g>
          );
        })}
        <circle cx="128" cy="128" r="6" fill="rgba(119, 98, 243, 0.8)" />
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
          className="w-12 h-12 border border-white/20 rounded flex items-center justify-center"
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
