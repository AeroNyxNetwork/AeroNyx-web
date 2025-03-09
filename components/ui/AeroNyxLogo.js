import React from 'react';

const AeroNyxLogo = ({ className, width = 40, height = 40 }) => {
  return (
    <svg 
      version="1.0" 
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill="#7762F3" stroke="none">
        <path d="M1277 3833 l-1277 -1278 0 -1275 0 -1275 1280 1280 1280 1280 -2
        1273 -3 1272 -1278 -1277z"/>
        <path d="M3838 3833 l-1278 -1278 0 -1275 0 -1275 1280 1280 1280 1280 -2
        1273-3 1272-1277 -1277z"/>
      </g>
    </svg>
  );
};

export default AeroNyxLogo;
