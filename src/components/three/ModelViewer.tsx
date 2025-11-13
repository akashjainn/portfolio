"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Environment, ContactShadows } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { useLoader } from '@react-three/fiber'

interface ModelProps {
  modelPath: string
  autoRotate?: boolean
}

function FBXModel({ modelPath, autoRotate = false }: ModelProps) {
  const fbx = useLoader(FBXLoader, modelPath)
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Center>
      <primitive 
        ref={meshRef} 
        object={fbx} 
        scale={0.01}
      />
    </Center>
  )
}

function LoadingPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333" wireframe />
    </mesh>
  )
}

interface ModelViewerProps {
  modelPath: string
  autoRotate?: boolean
  showControls?: boolean
  className?: string
}

export default function ModelViewer({ 
  modelPath, 
  autoRotate = true, 
  showControls = true,
  className = "w-full h-[600px]"
}: ModelViewerProps) {
  const [error, setError] = useState<string | null>(null)

  return (
    <div className={`relative ${className} bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800`}>
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          <div className="text-center">
            <p className="text-xl mb-2">Failed to load model</p>
            <p className="text-sm text-gray-400">{error}</p>
          </div>
        </div>
      ) : (
        <Canvas
          camera={{ position: [5, 3, 5], fov: 50 }}
          dpr={[1, 2]}
          gl={{ 
            antialias: true, 
            powerPreference: 'high-performance',
            alpha: true 
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.2
          }}
        >
          <color attach="background" args={['#0a0a0a']} />
          
          <Suspense fallback={<LoadingPlaceholder />}>
            <FBXModel modelPath={modelPath} autoRotate={autoRotate} />
            
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />
            <spotLight 
              position={[5, 8, 5]} 
              angle={0.3} 
              penumbra={1} 
              intensity={2}
              castShadow
            />
            
            {/* Environment */}
            <Environment preset="sunset" />
            
            {/* Ground shadow */}
            <ContactShadows 
              position={[0, -2, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2} 
              far={4}
            />
          </Suspense>

          {showControls && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={20}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
            />
          )}
        </Canvas>
      )}

      {showControls && !error && (
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg text-xs text-gray-400 border border-gray-700">
          <p>🖱️ Left click + drag to rotate</p>
          <p>🖱️ Right click + drag to pan</p>
          <p>🖱️ Scroll to zoom</p>
        </div>
      )}
    </div>
  )
}
