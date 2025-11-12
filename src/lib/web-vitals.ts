// src/lib/web-vitals.ts
export function logMetric(name: string, value: number, detail?: Record<string, any>) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("metrics", { detail: { name, value, ...detail } }));
  }
}
