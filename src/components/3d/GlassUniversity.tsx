import { useRef, useMemo } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface GlassUniversityProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}

const GlassUniversity: React.FC<GlassUniversityProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        transmission: 0.88,
        roughness: 0.06,
        metalness: 0.1,
        ior: 1.5,
        thickness: 0.4,
        color: new THREE.Color('#80cbc4'),
        envMapIntensity: 1,
        transparent: true,
      }),
    []
  );

  // Triangular roof shape using ExtrudeGeometry
  const roofShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.2, 0);
    shape.lineTo(0, 0.8);
    shape.lineTo(1.2, 0);
    shape.closePath();
    return shape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      depth: 1.5,
      bevelEnabled: false,
    }),
    []
  );

  // Column positions across the front
  const columnPositions: [number, number, number][] = [
    [-0.7, -0.3, 0.76],
    [-0.23, -0.3, 0.76],
    [0.23, -0.3, 0.76],
    [0.7, -0.3, 0.76],
  ];

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group
        ref={groupRef}
        position={position}
        scale={scale}
        rotation={rotation}
      >
        {/* Main building body */}
        <mesh material={glassMat}>
          <boxGeometry args={[2, 3, 1.5]} />
        </mesh>

        {/* Front columns */}
        {columnPositions.map((pos, i) => (
          <mesh key={i} position={pos} material={glassMat}>
            <cylinderGeometry args={[0.06, 0.06, 2.6, 12]} />
          </mesh>
        ))}

        {/* Triangular roof */}
        <mesh
          material={glassMat}
          position={[-1.2, 1.5, -0.75]}
          rotation={[0, 0, 0]}
        >
          <extrudeGeometry args={[roofShape, extrudeSettings]} />
        </mesh>
      </group>
    </Float>
  );
};

export default GlassUniversity;
