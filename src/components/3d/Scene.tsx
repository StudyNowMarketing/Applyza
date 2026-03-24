import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import SceneController from './SceneController';
import ParticleField from './ParticleField';

const Scene: React.FC = () => {
  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
      gl={{ antialias: true, alpha: true }}
      frameloop="always"
    >
      <PerspectiveCamera makeDefault fov={50} position={[0, 0, 8]} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a1a', 5, 20]} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} />

      <Suspense fallback={null}>
        {/* Environment for reflections on glass materials */}
        <Environment preset="night" />

        {/* Scene objects controlled by scroll */}
        <SceneController />

        {/* Ambient floating particles */}
        <ParticleField />
      </Suspense>

      {/* Post-processing bloom */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.8}
          intensity={0.5}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
};

export default Scene;
