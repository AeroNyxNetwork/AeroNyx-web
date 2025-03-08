import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useMousePosition from '../../lib/hooks/useMousePosition';

// 完全不使用drei组件
const NetworkScene = ({ count = 50, depth = 50 }) => {
  const { viewport, camera } = useThree();
  const mousePosition = useMousePosition();
  const particlesRef = useRef();
  
  // 调整粒子数量以适应不同设备性能
  const particleCount = useMemo(() => {
    // 检查window是否可用（客户端渲染）
    if (typeof window !== 'undefined') {
      // 简单的设备性能估计
      const isMobile = window.innerWidth < 768;
      const isLowPowerDevice = window.navigator?.hardwareConcurrency < 4;
      
      if (isMobile || isLowPowerDevice) {
        return Math.floor(count / 3); // 移动/低性能设备减少粒子
      }
    }
    return count;
  }, [count]);
  
  // 为粒子创建几何体和材质
  const geometry = useMemo(() => new THREE.SphereGeometry(0.05, 8, 8), []);
  const material = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: "#6E56CF",
      emissive: "#4B3B93",
      emissiveIntensity: 0.5
    }), []);
  
  // 预计算随机位置
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width * 1.5,
        (Math.random() - 0.5) * viewport.height * 1.5,
        (Math.random() - 0.5) * depth
      );
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );
      const size = Math.random() * 0.5 + 0.5;
      temp.push({ position, velocity, size });
    }
    return temp;
  }, [viewport, particleCount, depth]);
  
  // 初始化粒子网络
  const particleMeshes = useMemo(() => {
    return particles.map((particle, i) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(particle.position);
      mesh.scale.set(particle.size, particle.size, particle.size);
      return mesh;
    });
  }, [particles, geometry, material]);
  
  // 创建粒子组
  const group = useMemo(() => {
    const g = new THREE.Group();
    particleMeshes.forEach(mesh => g.add(mesh));
    return g;
  }, [particleMeshes]);
  
  // 当组件挂载时添加到场景
  useFrame((state) => {
    if (!particlesRef.current) {
      particlesRef.current = group;
      state.scene.add(group);
    }
    
    // 根据鼠标位置更新粒子
    const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;
    
    particleMeshes.forEach((mesh, i) => {
      // 根据速度更新位置
      particles[i].position.add(particles[i].velocity);
      
      // 添加对鼠标位置的轻微吸引力
      const mouseAttraction = new THREE.Vector3(mouseX, mouseY, 0);
      mouseAttraction.multiplyScalar(0.02);
      particles[i].position.add(mouseAttraction);
      
      // 边界检查并环绕
      if (particles[i].position.x > viewport.width) particles[i].position.x = -viewport.width;
      if (particles[i].position.x < -viewport.width) particles[i].position.x = viewport.width;
      if (particles[i].position.y > viewport.height) particles[i].position.y = -viewport.height;
      if (particles[i].position.y < -viewport.height) particles[i].position.y = viewport.height;
      
      // 更新网格
      mesh.position.copy(particles[i].position);
    });
    
    // 轻微的相机动画
    camera.position.z = 5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    
    // 轻微旋转粒子组，增添动态感
    group.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });
  
  // 返回灯光用于场景照明
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
    </>
  );
};

export default NetworkScene;
