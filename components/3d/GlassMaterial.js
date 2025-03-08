// 避免使用MeshTransmissionMaterial，因为它可能依赖于兼容性有问题的库
import * as THREE from 'three';

// 简化版的玻璃材质，使用标准材质模拟玻璃效果
const GlassMaterial = ({ 
  color = '#6E56CF', 
  opacity = 0.7,
  metalness = 0.9,
  roughness = 0.1,
  ...props 
}) => {
  return (
    <meshPhysicalMaterial
      color={color}
      transparent={true}
      opacity={opacity}
      metalness={metalness}
      roughness={roughness}
      clearcoat={1}
      clearcoatRoughness={0.1}
      envMapIntensity={1}
      {...props}
    />
  );
};

export default GlassMaterial;
