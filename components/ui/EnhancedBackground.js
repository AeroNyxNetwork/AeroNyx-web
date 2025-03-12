import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Enhanced background component with WebGL particles and CSS fallback
 * Provides better compatibility across devices while maintaining aesthetic
 */
const EnhancedBackground = ({ className }) => {
  const canvasRef = useRef(null);
  const [useWebGL, setUseWebGL] = useState(true);
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    isMobile: false,
    isLowPower: false,
    hasWebGL: true
  });
  const animationRef = useRef(null);
  
  // Detect device capabilities on mount
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;
    
    // Device detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const isLowPower = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
    
    // WebGL support detection - with graceful fallback
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      hasWebGL = false;
    }
    
    setDeviceCapabilities({
      isMobile,
      isLowPower,
      hasWebGL
    });
    
    // Determine if we should use WebGL or CSS fallback
    const shouldUseWebGL = hasWebGL && !(isMobile && isLowPower);
    setUseWebGL(shouldUseWebGL);
  }, []);
  
  // WebGL animation setup
  useEffect(() => {
    if (!useWebGL || !canvasRef.current) return;
    
    // Get WebGL context
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      setUseWebGL(false);
      return;
    }
    
    // Set canvas size
    const resizeCanvas = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // WebGL shader program setup
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec3 a_color;
      attribute float a_size;
      
      uniform mat3 u_matrix;
      uniform float u_time;
      
      varying vec3 v_color;
      
      void main() {
        // Apply movement based on time
        vec2 position = a_position;
        position.x += sin(u_time * 0.001 + position.y * 0.1) * 0.02;
        position.y += cos(u_time * 0.001 + position.x * 0.1) * 0.02;
        
        // Transform position
        vec3 transformedPosition = u_matrix * vec3(position, 1);
        
        // Set size based on attribute and z-position (for depth effect)
        gl_PointSize = a_size * (1.5 - transformedPosition.z * 0.5);
        
        // Set position
        gl_Position = vec4(transformedPosition.xy, 0, 1);
        
        // Pass color to fragment shader
        v_color = a_color;
      }
    `;
    
    const fragmentShaderSource = `
      precision mediump float;
      varying vec3 v_color;
      
      void main() {
        // Create circular points with soft edges
        float distance = length(gl_PointCoord - vec2(0.5, 0.5));
        if (distance > 0.5) {
          discard;
        }
        
        // Smooth edges
        float alpha = 1.0 - smoothstep(0.4, 0.5, distance);
        
        // Output color with alpha
        gl_FragColor = vec4(v_color, alpha);
      }
    `;
    
    // Create and compile shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    
    // Look up attribute locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const colorAttributeLocation = gl.getAttribLocation(program, 'a_color');
    const sizeAttributeLocation = gl.getAttribLocation(program, 'a_size');
    
    // Look up uniform locations
    const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    
    // Create buffers and fill with data
    const numParticles = deviceCapabilities.isMobile ? 100 : 200;
    const positions = new Float32Array(numParticles * 2);
    const colors = new Float32Array(numParticles * 3);
    const sizes = new Float32Array(numParticles);
    
    // Generate random particle data
    for (let i = 0; i < numParticles; i++) {
      // Random position between -1 and 1
      positions[i * 2] = (Math.random() * 2 - 1) * 1.5;
      positions[i * 2 + 1] = (Math.random() * 2 - 1) * 1.5;
      
      // Color: Purple to blue gradient
      // Base color: primary: '#7762F3' (119, 98, 243)
      // Secondary: '#5FBBF7' (95, 187, 247)
      const blendFactor = Math.random();
      colors[i * 3] = (119 * (1 - blendFactor) + 95 * blendFactor) / 255;     // R
      colors[i * 3 + 1] = (98 * (1 - blendFactor) + 187 * blendFactor) / 255; // G
      colors[i * 3 + 2] = (243 * (1 - blendFactor) + 247 * blendFactor) / 255; // B
      
      // Random size between 2 and 6
      sizes[i] = Math.random() * 4 + 2;
    }
    
    // Create position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    // Create color buffer
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    
    // Create size buffer
    const sizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
    
    // Animation function
    const drawScene = (timestamp) => {
      // Clear the canvas
      gl.clearColor(0.05, 0.05, 0.1, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Use our shader program
      gl.useProgram(program);
      
      // Set time uniform
      gl.uniform1f(timeLocation, timestamp);
      
      // Set transformation matrix (identity for now with slight z-variation for size)
      const matrix = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      ];
      gl.uniformMatrix3fv(matrixLocation, false, matrix);
      
      // Set up position attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
      
      // Set up color attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.enableVertexAttribArray(colorAttributeLocation);
      gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
      
      // Set up size attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
      gl.enableVertexAttribArray(sizeAttributeLocation);
      gl.vertexAttribPointer(sizeAttributeLocation, 1, gl.FLOAT, false, 0, 0);
      
      // Enable blending for transparent points
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      // Draw the points
      gl.drawArrays(gl.POINTS, 0, numParticles);
      
      // Request next frame
      animationRef.current = requestAnimationFrame(drawScene);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(drawScene);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [useWebGL, deviceCapabilities]);
  
  // Helper functions for WebGL
  const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  };
  
  const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      console.error(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  };
  
  // Generate CSS-based nodes for fallback
  const generateCssNodes = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: `node-${i}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.floor(Math.random() * 4) + 2,
      animationDuration: `${Math.random() * 30 + 15}s`,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? '#7762F3' : '#5FBBF7',
      delay: `${Math.random() * 5}s`
    }));
  };
  
  // Create nodes for CSS fallback
  const cssNodeCount = deviceCapabilities.isMobile ? 30 : 60;
  const cssNodes = generateCssNodes(cssNodeCount);
  
  return (
    <div 
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className || ''}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Semi-transparent overlay for depth */}
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-90"></div>
      
      {/* WebGL Canvas */}
      {useWebGL && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.8 }}
        />
      )}
      
      {/* CSS Fallback for devices without WebGL */}
      {!useWebGL && (
        <>
          {/* Particles */}
          {cssNodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute rounded-full"
              style={{
                top: node.top,
                left: node.left,
                width: `${node.size}px`,
                height: `${node.size}px`,
                backgroundColor: node.color,
                opacity: node.opacity,
                boxShadow: `0 0 ${node.size * 2}px ${node.color}`,
              }}
              animate={{
                x: [
                  -20, 
                  20, 
                  -20
                ],
                y: [
                  -20, 
                  20, 
                  -20
                ],
                scale: [
                  1, 
                  1.1, 
                  1
                ]
              }}
              transition={{
                duration: parseInt(node.animationDuration),
                ease: "easeInOut",
                delay: parseInt(node.delay),
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
          
          {/* Gradient background pulse */}
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(119, 98, 243, 0.15), rgba(13, 13, 24, 0.1) 70%)',
              opacity: 0.6
            }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ 
              duration: 8, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          />
        </>
      )}
      
      {/* Subtle gradient overlay that works with both WebGL and CSS */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/5 to-transparent opacity-30" />
      
      {/* Network lines (simplified) */}
      <svg 
        width="100%" 
        height="100%" 
        className="absolute top-0 left-0 opacity-20"
        style={{ filter: 'blur(1px)' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7762F3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5FBBF7" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Only render a limited number of lines for performance */}
        {Array.from({ length: deviceCapabilities.isMobile ? 5 : 12 }).map((_, i) => {
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
    </div>
  );
};

export default EnhancedBackground;
