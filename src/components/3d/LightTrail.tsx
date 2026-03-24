import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface LightTrailProps {
  points: THREE.Vector3[];
  color?: string;
  opacity?: number;
  lineWidth?: number;
}

const LightTrail: React.FC<LightTrailProps> = ({
  points,
  color = '#2EC4B6',
  opacity = 0.6,
  lineWidth = 2,
}) => {
  const dashOffsetRef = useRef(0);
  const lineRef = useRef<THREE.Line>(null);

  // Create a smooth curve from control points
  const curvePoints = useMemo(() => {
    if (points.length < 2) return [];
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5);
    return curve.getPoints(200).map((p) => [p.x, p.y, p.z] as [number, number, number]);
  }, [points]);

  useFrame((_state, delta) => {
    dashOffsetRef.current -= delta * 2;
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineDashedMaterial;
      if (material && 'dashOffset' in material) {
        material.dashOffset = dashOffsetRef.current;
      }
    }
  });

  if (curvePoints.length < 2) return null;

  return (
    <Line
      ref={lineRef as React.RefObject<THREE.Line>}
      points={curvePoints}
      color={color}
      lineWidth={lineWidth}
      dashed
      dashScale={10}
      dashSize={0.5}
      dashOffset={0}
      transparent
      opacity={opacity}
    />
  );
};

export default LightTrail;
