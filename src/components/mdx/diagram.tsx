export function Diagram({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-auto rounded-lg border" />
      <figcaption className="text-xs text-muted-foreground mt-2">{alt}</figcaption>
    </figure>
  )
}
