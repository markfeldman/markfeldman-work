import { ImageResponse } from "next/og";

// Required with `output: "export"` — the image is generated once at build time
// and emitted as a static file rather than rendered per request.
export const dynamic = "force-static";

export const alt = "Mark Feldman — Agentic Systems Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(42,120,214,0.22), transparent 55%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.18em",
            color: "#8b8b8b",
            marginBottom: 28,
          }}
        >
          MARK FELDMAN
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "#fafafa",
            lineHeight: 1.05,
          }}
        >
          Agentic Systems Engineer
        </div>
        <div
          style={{
            display: "flex",
            width: 120,
            height: 6,
            backgroundColor: "#3987e5",
            borderRadius: 3,
            marginTop: 40,
            marginBottom: 36,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#a1a1a1",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Helping engineering teams evaluate, adopt, and build with agentic AI.
        </div>
      </div>
    ),
    size,
  );
}
