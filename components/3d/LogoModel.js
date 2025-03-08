import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useMousePosition from '../../lib/hooks/useMousePosition';
import GlassMaterial from './GlassMaterial';

// 简化版的3D Logo，避免使用可能引起兼容性问题的drei组件
const LogoModel = ({ color = '#6E56CF', position = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef();
  const mousePosition = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // 根据鼠标位置进行细微旋转
    const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;
    
    // 设置目标旋转角度并平滑过渡
    targetRotation.current.y = mouseX * 0.2;
    targetRotation.current.x = mouseY * 0.2;
    
    // 平滑插值过渡到目标旋转角度
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      0.05
    );
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    );
    
    // 轻微浮动动画
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });
  
  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* 外部环形结构代表网络连接 */}
      <mesh position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, 100, 16, 2, 3]} />
        <GlassMaterial color={color} />
      </mesh>
      
      {/* 内部环形代表数据流 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[0.6, 0.1, 16, 32]} />
        <GlassMaterial color={'#07BFD3'} />
      </mesh>
      
      {/* 核心球体代表安全中心 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color={'#ffffff'}
          emissive={'#ffffff'}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* 环绕Logo的小粒子 */}
      <OrbitalParticles count={5} radius={1.5} />
    </group>
  );
};

// 环绕主Logo的小粒子
const OrbitalParticles = ({ count = 5, radius = 1.5 }) => {
  const particles = useRef(
    Array.from({ length: count }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.5,
      y: (Math.random() - 0.5) * 0.5,
      ref: null
    }))
  );
  
  useFrame((state) => {
    particles.current.forEach((particle, i) => {
      if (!particle.ref) return;
      
      // 更新角度实现环绕运动
      particle.angle += particle.speed * 0.005;
      
      // 设置新位置
      particle.ref.position.x = Math.cos(particle.angle) * radius;
      particle.ref.position.z = Math.sin(particle.angle) * radius;
      particle.ref.position.y = particle.y + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2;
    });
  });
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <mesh 
          key={i}
          ref={ref => {
            if (ref && particles.current[i]) {
              particles.current[i].ref = ref;
            }
          }}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#59E3F5" 
            emissive="#07BFD3"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </>
  );
};

export default LogoModel;
