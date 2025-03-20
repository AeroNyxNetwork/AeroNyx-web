import React from 'react';

const GuaranteedBackground = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0, // Below content but visible
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Base gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 30%, rgba(119, 98, 243, 0.15), rgba(13, 13, 24, 0.99) 70%)',
        }}
      />
      
      {/* Add pulsing dots as simple divs */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            borderRadius: '50%',
            backgroundColor: '#7762F3',
            opacity: Math.random() * 0.5 + 0.1,
            animation: `pulseDot ${Math.random() * 8 + 4}s infinite alternate ease-in-out`,
            boxShadow: '0 0 10px rgba(119, 98, 243, 0.5)',
          }}
        />
      ))}
      
      {/* Add subtle network lines */}
      <svg 
        width="100%" 
        height="100%" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          opacity: 0.1,
          filter: 'blur(1px)'
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7762F3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5FBBF7" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Generate random lines to represent network connections */}
        {Array.from({ length: 15 }).map((_, i) => {
          const x1 = Math.random() * 100;
          const y1 = Math.random() * 100;
          const x2 = Math.random() * 100;
          const y2 = Math.random() * 100;
          
          return (
            <line
              key={i}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
      
      <style jsx>{`
        @keyframes pulseDot {
          0% { transform: scale(1); opacity: 0.1; }
          100% { transform: scale(1.5); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default GuaranteedBackground;
