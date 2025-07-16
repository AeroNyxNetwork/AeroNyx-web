import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

// Professional network visualization like Etherscan
const NetworkTopology = () => {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [networkStats, setNetworkStats] = useState({
    totalNodes: 15743,
    activeConnections: 47291,
    dataProcessed: '1.2PB',
    avgLatency: '12ms'
  });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Create nodes
    const nodes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 2,
      connections: []
    }));
    
    // Create connections
    nodes.forEach((node, i) => {
      const numConnections = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numConnections; j++) {
        const target = Math.floor(Math.random() * nodes.length);
        if (target !== i) {
          node.connections.push(target);
        }
      }
    });
    
    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      // Update positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(119, 98, 243, 0.1)';
      ctx.lineWidth = 0.5;
      nodes.forEach(node => {
        node.connections.forEach(targetId => {
          const target = nodes[targetId];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.fillStyle = 'rgba(119, 98, 243, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);
  
  return (
    <section className="py-20 bg-neutral-950">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Network visualization */}
          <div className="relative h-[500px] bg-black rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
            
            {/* Overlay stats */}
            <div className="absolute top-6 left-6 space-y-4">
              <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded px-4 py-3">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Network Status</div>
                <div className="text-green-400 text-sm">Operational</div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div>
            <h2 className="text-4xl font-light mb-6">
              Global Network
              <span className="block text-2xl text-white/40 mt-2">
                Real-time topology
              </span>
            </h2>
            
            <div className="space-y-6 mb-8">
              <p className="text-white/60 leading-relaxed">
                A self-organizing mesh of intelligent nodes that continuously 
                optimizes for performance, cost, and reliability without human intervention.
              </p>
              
              <p className="text-white/60 leading-relaxed">
                Each node contributes computational resources while maintaining 
                complete sovereignty through cryptographic verification.
              </p>
            </div>
            
            {/* Network stats */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(networkStats).map(([key, value]) => (
                <div key={key} className="border border-white/10 rounded p-4">
                  <div className="text-2xl font-light">{value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mt-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NetworkTopology;
