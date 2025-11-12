"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { InstancedMesh } from "three";
import { memo, useMemo, useRef, useLayoutEffect } from "react";
import * as THREE from "three";

type SkillCloudProps = {
  skills: string[];
  highlight?: string[]; // labels to render as text
  reducedMotion?: boolean;
};

function seededRandom(seed: number) {
  // simple LCG for deterministic placement
  let s = seed >>> 0;
  return () => ((s = (1664525 * s + 1013904223) >>> 0) / 4294967296);
}

const CloudPoints = memo(function CloudPoints({ skills, reducedMotion }: SkillCloudProps) {
  const ref = useRef<InstancedMesh>(null!);
  const count = skills.length;
  const positions = useMemo(() => {
    const rnd = seededRandom(0xA11A5);
    const pts: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const u = rnd();
      const v = rnd();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 1.2;
      pts.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      ]);
    }
    return pts;
  }, [count]);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    positions.forEach(([x, y, z], i) => {
      dummy.position.set(x, y, z);
      dummy.rotation.set(
        Math.atan2(y, z) * 0.1,
        Math.atan2(x, z) * 0.1,
        Math.atan2(y, x) * 0.1
      );
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += reducedMotion ? 0 : delta * 0.15;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.015, 12, 12]} />
      <meshStandardMaterial metalness={0.5} roughness={0.25} />
    </instancedMesh>
  );
});

function Labels({ skills, highlight = [] }: Pick<SkillCloudProps, "skills" | "highlight">) {
  const labeled = useMemo(
    () => skills.filter((s) => highlight.includes(s)).slice(0, 6),
    [skills, highlight]
  );
  // Light sprinkle of labels near equator for readability
  return (
    <>
      {labeled.map((s, i) => (
        <Text key={s + i} position={[Math.sin(i) * 0.9, (i % 2 ? 0.2 : -0.15), Math.cos(i) * 0.9]} fontSize={0.075}>
          {s}
        </Text>
      ))}
    </>
  );
}

export default function SkillCloud({ skills, highlight = [], reducedMotion }: SkillCloudProps) {
  return (
    <div className="relative">
      {/* DOM fallback, shown under the canvas for a11y (screen readers / no WebGL) */}
      <div className="sr-only">
        {skills.join(", ")}
      </div>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 4]} intensity={1.2} />
        <CloudPoints skills={skills} reducedMotion={!!reducedMotion} />
        <Labels skills={skills} highlight={highlight} />
      </Canvas>
    </div>
  );
}
