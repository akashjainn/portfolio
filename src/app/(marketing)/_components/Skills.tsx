"use client";
import { useEffectsPrefs } from "@/components/EffectsPrefsContext";
import dynamic from "next/dynamic";

const SkillCloud = dynamic(() => import("@/components/three/SkillCloud"), { ssr: false });

const SKILLS = [
  "TypeScript","React","Next.js","Node.js","Python","Java","Unity","Blender",
  "Tailwind","Postgres","Prisma","Three.js","R3F","GCP","AWS","Docker"
];

export default function Skills() {
  const { reduceEffects } = useEffectsPrefs();
  return (
    <section aria-labelledby="skills-title" className="py-20">
      <h2 id="skills-title" className="text-2xl md:text-3xl font-semibold tracking-tight">Skills</h2>
      <p className="mt-2 text-zinc-500 max-w-prose">
        A quick constellation of my core tools and frameworks.
      </p>
      <div className="mt-8">
        <SkillCloud skills={SKILLS} highlight={["Three.js","Next.js","Unity","Blender","TypeScript"]} reducedMotion={reduceEffects}/>
      </div>
    </section>
  );
}
