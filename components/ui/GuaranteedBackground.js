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
        zIndex: 1,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 30% 30%, rgba(119, 98, 243, 0.15), rgba(13, 13, 24, 0.99) 70%)',
        overflow: 'hidden',
      }}
    >
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
