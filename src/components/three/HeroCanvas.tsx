"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useEffectsPrefs } from '@/context/EffectsPrefsContext'

function CameraRig() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state: any) => {
    const t = state.clock.getElapsedTime()
    if (!ref.current) return
    ref.current.position.z = 6
    ref.current.rotation.y = Math.sin(t * 0.15) * 0.04
    ref.current.rotation.x = Math.cos(t * 0.12) * 0.02
  })
  return <group ref={ref} />
}

function GlassMonogram() {
  const geoRef = useRef<THREE.Mesh>(null)
  // Simple placeholder geometry — replace with loaded AJ logo glTF later
  return (
    <mesh ref={geoRef} rotation={[0, 0.4, 0]}>
      <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
      <MeshTransmissionMaterial thickness={0.5} anisotropy={0.2} chromaticAberration={0.02} distortion={0.05} distortionScale={0.4} temporalDistortion={0.2} samples={8} resolution={256} side={THREE.DoubleSide} clearcoat={1} attenuationColor="#88bbff" attenuationDistance={2.5} />
    </mesh>
  )
}

export default function HeroCanvas() {
  const { pauseMotion } = useEffectsPrefs()
  return (
    <Canvas dpr={[1, 1.5]} gl={{ powerPreference: 'high-performance', antialias: true }} camera={{ position: [0, 0, 6], fov: 50 }} className="absolute inset-0">
      <Suspense fallback={null}>
        <color attach="background" args={["#0d0f11"]} />
        {!pauseMotion && <CameraRig />}
        <GlassMonogram />
        <Environment preset="studio" />
        <directionalLight intensity={2.5} position={[5, 8, 4]} />
        <pointLight intensity={1.5} position={[-4, -3, -2]} color="#99ddff" />
        <spotLight intensity={1.2} position={[0, 6, 2]} angle={0.4} penumbra={0.6} />
      </Suspense>
    </Canvas>
  )
}
