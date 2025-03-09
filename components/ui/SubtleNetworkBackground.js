import React, { useEffect, useState } from 'react';

/**
 * A simplified network background effect that uses pure CSS with minimal JS
 * This approach will work in all browsers with much higher reliability
 */
const SimpleNetworkBackground = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  
  // Only run on client side to avoid SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render anything on server
  if (!mounted) return null;
  
  // Generate random positions for nodes
  const generateNodes = (count) => {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        id: `node-${i}`,
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
        size: Math.floor(Math.random() * 3) + 1,
        animationDuration: `${Math.random() * 50 + 30}s`,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    return nodes;
  };
  
  // Generate node elements
  const nodeCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 50;
  const nodes = generateNodes(nodeCount);
  
  return (
    <div 
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className || ''}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Semi-transparent overlay for depth */}
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-50"></div>
      
      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute rounded-full bg-primary"
          style={{
            top: node.top,
            left: node.left,
            width: `${node.size * 3}px`,
            height: `${node.size * 3}px`,
            opacity: node.opacity,
            animation: `float ${node.animationDuration} infinite ease-in-out`,
            boxShadow: '0 0 10px rgba(119, 98, 243, 0.5)',
          }}
        />
      ))}
      
      {/* Animated gradient background for additional effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(119, 98, 243, 0.4), rgba(95, 187, 247, 0.1), transparent 70%)',
          animation: 'pulse 15s infinite alternate ease-in-out',
        }}
      />
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
          }
          50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
          }
          75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
          }
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.05;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.05;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default SimpleNetworkBackground;
