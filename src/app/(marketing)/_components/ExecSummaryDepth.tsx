"use client";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";

export default function ExecSummaryDepth() {
  const items = useMemo(() => Array.from({ length: 4 }, (_, i) => ({ x: i * 0.7 - 1.05, y: (i % 2 ? 0.2 : -0.1) })), []);
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas dpr={[1,1.5]} camera={{ position: [0, 0, 3], fov: 40 }}>
        <ambientLight intensity={0.5}/>
        <directionalLight position={[1.5, 2, 2]} intensity={1.2}/>
        {items.map((it, i) => (
          <mesh key={i} position={[it.x, it.y, 0]}>
            <planeGeometry args={[0.6, 0.35, 1, 1]} />
            <meshStandardMaterial metalness={0.2} roughness={0.6} />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
}
