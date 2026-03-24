import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import GlassGlobe from './GlassGlobe';
import GlassPassport from './GlassPassport';
import GlassAirplane from './GlassAirplane';
import GlassUniversity from './GlassUniversity';
import LightTrail from './LightTrail';
import { scrollProgressRef } from './scrollStore';

// Position keyframes: [x, y, z] at each scroll stage
interface Keyframes {
  position: [number, number, number];
  scale: number;
}

interface ObjectKeyframes {
  globe: Keyframes;
  passport: Keyframes;
  airplane: Keyframes;
  university: Keyframes;
}

const keyframeStages: { threshold: number; state: ObjectKeyframes }[] = [
  {
    threshold: 0.0,
    state: {
      globe: { position: [0, 0, 0], scale: 1 },
      passport: { position: [6, 0, -1], scale: 0 },
      airplane: { position: [0, 6, -1], scale: 0 },
      university: { position: [2, -6, -2], scale: 0 },
    },
  },
  {
    threshold: 0.15,
    state: {
      globe: { position: [-3, 1, -2], scale: 0.8 },
      passport: { position: [3, 0, -1], scale: 1 },
      airplane: { position: [0, 6, -1], scale: 0 },
      university: { position: [2, -6, -2], scale: 0 },
    },
  },
  {
    threshold: 0.3,
    state: {
      globe: { position: [-3, 1, -2], scale: 0.7 },
      passport: { position: [3, -1, -1], scale: 0.8 },
      airplane: { position: [0, 2, -1], scale: 1 },
      university: { position: [2, -6, -2], scale: 0 },
    },
  },
  {
    threshold: 0.5,
    state: {
      globe: { position: [-3, 1.5, -3], scale: 0.6 },
      passport: { position: [3.5, -1, -2], scale: 0.7 },
      airplane: { position: [1.5, 2.5, -1], scale: 0.8 },
      university: { position: [2, -1, -2], scale: 1 },
    },
  },
  {
    threshold: 0.7,
    state: {
      globe: { position: [-4, 2, -3], scale: 0.6 },
      passport: { position: [4, -2, -3], scale: 0.6 },
      airplane: { position: [2, 3, -2], scale: 0.7 },
      university: { position: [0, -2, -3], scale: 0.8 },
    },
  },
];

function lerpKeyframes(
  a: Keyframes,
  b: Keyframes,
  t: number
): { position: [number, number, number]; scale: number } {
  return {
    position: [
      THREE.MathUtils.lerp(a.position[0], b.position[0], t),
      THREE.MathUtils.lerp(a.position[1], b.position[1], t),
      THREE.MathUtils.lerp(a.position[2], b.position[2], t),
    ],
    scale: THREE.MathUtils.lerp(a.scale, b.scale, t),
  };
}

function getInterpolated(progress: number, key: keyof ObjectKeyframes): { position: [number, number, number]; scale: number } {
  // Find which two stages we're between
  let lower = keyframeStages[0];
  let upper = keyframeStages[keyframeStages.length - 1];

  for (let i = 0; i < keyframeStages.length - 1; i++) {
    if (progress >= keyframeStages[i].threshold && progress <= keyframeStages[i + 1].threshold) {
      lower = keyframeStages[i];
      upper = keyframeStages[i + 1];
      break;
    }
  }

  if (progress >= keyframeStages[keyframeStages.length - 1].threshold) {
    return {
      position: [...upper.state[key].position],
      scale: upper.state[key].scale,
    };
  }

  const range = upper.threshold - lower.threshold;
  const t = range > 0 ? (progress - lower.threshold) / range : 0;
  const smoothT = t * t * (3 - 2 * t); // smoothstep

  return lerpKeyframes(lower.state[key], upper.state[key], smoothT);
}

const SceneController: React.FC = () => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const passportGroupRef = useRef<THREE.Group>(null);
  const airplaneGroupRef = useRef<THREE.Group>(null);
  const universityGroupRef = useRef<THREE.Group>(null);

  const trailPointsRef = useRef<THREE.Vector3[]>([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 1, -1),
    new THREE.Vector3(2, 0, -1),
    new THREE.Vector3(3, -1, -2),
  ]);

  useFrame(() => {
    const progress = scrollProgressRef.current;

    const globe = getInterpolated(progress, 'globe');
    const passport = getInterpolated(progress, 'passport');
    const airplane = getInterpolated(progress, 'airplane');
    const university = getInterpolated(progress, 'university');

    if (globeGroupRef.current) {
      globeGroupRef.current.position.lerp(
        new THREE.Vector3(...globe.position),
        0.05
      );
      globeGroupRef.current.scale.lerp(
        new THREE.Vector3(globe.scale, globe.scale, globe.scale),
        0.05
      );
    }

    if (passportGroupRef.current) {
      passportGroupRef.current.position.lerp(
        new THREE.Vector3(...passport.position),
        0.05
      );
      passportGroupRef.current.scale.lerp(
        new THREE.Vector3(passport.scale, passport.scale, passport.scale),
        0.05
      );
    }

    if (airplaneGroupRef.current) {
      airplaneGroupRef.current.position.lerp(
        new THREE.Vector3(...airplane.position),
        0.05
      );
      airplaneGroupRef.current.scale.lerp(
        new THREE.Vector3(airplane.scale, airplane.scale, airplane.scale),
        0.05
      );
    }

    if (universityGroupRef.current) {
      universityGroupRef.current.position.lerp(
        new THREE.Vector3(...university.position),
        0.05
      );
      universityGroupRef.current.scale.lerp(
        new THREE.Vector3(university.scale, university.scale, university.scale),
        0.05
      );
    }

    // Update trail points to follow object positions
    trailPointsRef.current = [
      globeGroupRef.current?.position.clone() ?? new THREE.Vector3(-3, 1, -2),
      passportGroupRef.current?.position.clone() ?? new THREE.Vector3(3, 0, -1),
      airplaneGroupRef.current?.position.clone() ?? new THREE.Vector3(0, 2, -1),
      universityGroupRef.current?.position.clone() ?? new THREE.Vector3(2, -1, -2),
    ];
  });

  return (
    <>
      <group ref={globeGroupRef}>
        <GlassGlobe />
      </group>

      <group ref={passportGroupRef} position={[6, 0, -1]} scale={0}>
        <GlassPassport />
      </group>

      <group ref={airplaneGroupRef} position={[0, 6, -1]} scale={0}>
        <GlassAirplane />
      </group>

      <group ref={universityGroupRef} position={[2, -6, -2]} scale={0}>
        <GlassUniversity />
      </group>

      <LightTrail points={trailPointsRef.current} />
    </>
  );
};

export default SceneController;
