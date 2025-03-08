import { MeshTransmissionMaterial } from '@react-three/drei';

// Premium glass-like material for 3D objects
const GlassMaterial = ({ 
  color, 
  thickness = 0.5,
  roughness = 0.1,
  distortion = 0.4,
  temporalDistortion = 0.1,
  ...props 
}) => {
  return (
    <MeshTransmissionMaterial
      samples={6}
      resolution={256}
      thickness={thickness}
      roughness={roughness}
      anisotropicBlur={0.1}
      distortion={distortion}
      distortionScale={0.3}
      temporalDistortion={temporalDistortion}
      clearcoat={1}
      clearcoatRoughness={0.1}
      color={color}
      attenuationDistance={0.5}
      attenuationColor="#ffffff"
      {...props}
    />
  );
};

export default GlassMaterial;
