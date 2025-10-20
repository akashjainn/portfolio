
import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/mdx";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";


export default async function Image({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  const title = project?.frontmatter?.title ?? "Akash Jain — Portfolio";
  const summary = project?.frontmatter?.summary ?? "Building reliable, real-time web systems";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#0B0C0E",
          color: "#EDEEF0",
          padding: 80,
          fontSize: 48,
          fontWeight: 600,
          fontFamily: "Inter, sans-serif",
        }}
      >
        <span style={{ opacity: 0.6, fontSize: 24, marginBottom: 16 }}>
          Akash Jain — Case Study
        </span>
        <span style={{ fontSize: 56, lineHeight: 1.2 }}>{title}</span>
        <span style={{ marginTop: 24, fontSize: 28, opacity: 0.8 }}>
          {summary}
        </span>
      </div>
    ),
    size
  );
}
