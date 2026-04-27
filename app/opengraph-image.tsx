import { ImageResponse } from "next/og"
import { SITE } from "@/lib/site-data"

export const runtime = "edge"
export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#FAFAF7",
          color: "#0F0F0F",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "#0F0F0F",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 10, height: 10, background: "#E8B547", borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>
            {SITE.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            We book qualified sales meetings for B2B teams that actually want to grow.
          </div>
          <div style={{ fontSize: 26, color: "rgba(15,15,15,0.6)", maxWidth: 900 }}>
            $47M+ pipeline generated · 12,400+ meetings booked · 200+ companies trust us.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "rgba(15,15,15,0.5)",
          }}
        >
          <div>finaloutreach.com</div>
          <div
            style={{
              background: "#0B4F3A",
              color: "#FAFAF7",
              padding: "12px 24px",
              borderRadius: 999,
              fontSize: 22,
            }}
          >
            Book a strategy call →
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
