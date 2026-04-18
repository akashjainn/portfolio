'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import type { JournalArtifact } from '@/lib/journal'

function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src)
  return <primitive object={scene} />
}

function DragHint() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'var(--s-4)',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono), monospace',
        fontSize: 11,
        color: 'var(--ink-3)',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      Drag to inspect
    </div>
  )
}

interface ARTriumModelProps {
  artifact: JournalArtifact
}

export function ARTriumModel({ artifact }: ARTriumModelProps) {
  const [interacted, setInteracted] = useState(false)

  if (!artifact.src) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
          background: 'var(--cream-2)',
        }}
      >
        3D model not available
      </div>
    )
  }

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        style={{ background: 'var(--cream)' }}
        onPointerDown={() => setInteracted(true)}
        aria-label="3D vine-tree environment model, drag to rotate"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Model src={artifact.src} />
          <Environment preset="forest" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          autoRotate={false}
          enablePan={false}
        />
      </Canvas>
      {!interacted && <DragHint />}
    </div>
  )
}
