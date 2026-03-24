import { lazy, Suspense } from 'react';

const Scene = lazy(() => import('../3d/Scene'));

export default function Scene3D() {
  return (
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  );
}
