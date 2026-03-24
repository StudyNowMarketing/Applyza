import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  opacity?: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 200,
  spread = 15,
  color = '#2EC4B6',
  size = 0.02,
  opacity = 0.4,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const off = new Float32Array(count); // random phase offsets
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      off[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, offsets: off };
  }, [count, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const positionAttribute = pointsRef.current.geometry.getAttribute(
      'position'
    ) as THREE.BufferAttribute;
    const arr = positionAttribute.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const phase = offsets[i];
      // Subtle sine-based drift
      arr[i * 3] += Math.sin(time * 0.3 + phase) * 0.001;
      arr[i * 3 + 1] += Math.cos(time * 0.2 + phase) * 0.001;
      arr[i * 3 + 2] += Math.sin(time * 0.25 + phase * 1.5) * 0.0008;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleField;
