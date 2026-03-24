import { useRef } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface GlassAirplaneProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}

const glassMaterial = (
  <meshPhysicalMaterial
    transmission={0.9}
    roughness={0.05}
    metalness={0.1}
    ior={1.5}
    thickness={0.2}
    color="#e0f7fa"
    envMapIntensity={1}
    transparent
  />
);

const GlassAirplane: React.FC<GlassAirplaneProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // 15 degrees tilt in radians
  const tiltAngle = THREE.MathUtils.degToRad(15);

  return (
    <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.7}>
      <group
        ref={groupRef}
        position={position}
        scale={scale}
        rotation={[rotation[0] + tiltAngle, rotation[1], rotation[2]]}
      >
        {/* Fuselage - cone lying on its side */}
        <mesh rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.2, 1.8, 16]} />
          {glassMaterial}
        </mesh>

        {/* Main wings */}
        <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[2.2, 0.4]} />
          {glassMaterial}
        </mesh>

        {/* Tail vertical fin */}
        <mesh position={[0, 0.65, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.5, 0.35]} />
          {glassMaterial}
        </mesh>

        {/* Tail horizontal stabilizer */}
        <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.7, 0.2]} />
          {glassMaterial}
        </mesh>
      </group>
    </Float>
  );
};

export default GlassAirplane;
