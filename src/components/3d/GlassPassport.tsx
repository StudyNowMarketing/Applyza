import { useRef } from 'react';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface GlassPassportProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}

const GlassPassport: React.FC<GlassPassportProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <group
        ref={groupRef}
        position={position}
        scale={scale}
        rotation={rotation}
      >
        {/* Outer passport cover */}
        <RoundedBox args={[1.2, 1.6, 0.15]} radius={0.05} smoothness={4}>
          <meshPhysicalMaterial
            transmission={0.85}
            roughness={0.08}
            metalness={0.1}
            ior={1.5}
            thickness={0.3}
            color="#7c3aed"
            envMapIntensity={1}
            transparent
          />
        </RoundedBox>

        {/* Inner panel to simulate passport cover edge */}
        <RoundedBox
          args={[1.0, 1.4, 0.08]}
          radius={0.03}
          smoothness={4}
          position={[0, 0, 0.02]}
        >
          <meshPhysicalMaterial
            transmission={0.9}
            roughness={0.06}
            metalness={0.05}
            ior={1.45}
            thickness={0.15}
            color="#a78bfa"
            envMapIntensity={0.8}
            transparent
          />
        </RoundedBox>
      </group>
    </Float>
  );
};

export default GlassPassport;
