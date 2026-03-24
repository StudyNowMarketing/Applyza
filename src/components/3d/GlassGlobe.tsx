import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface GlassGlobeProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}

const GlassGlobe: React.FC<GlassGlobeProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group
        ref={groupRef}
        position={position}
        scale={scale}
        rotation={rotation}
      >
        {/* Main glass sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshPhysicalMaterial
            transmission={0.92}
            roughness={0.05}
            metalness={0.1}
            ior={1.5}
            thickness={0.5}
            color="#4dd0e1"
            envMapIntensity={1}
            transparent
          />
        </mesh>

        {/* Wireframe continent grid lines */}
        <mesh>
          <sphereGeometry args={[1.55, 32, 32]} />
          <meshBasicMaterial
            color="#2EC4B6"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default GlassGlobe;
