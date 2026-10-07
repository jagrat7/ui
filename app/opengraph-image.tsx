import { ImageResponse } from "next/og"

import { SITE } from "@/lib/site"

export const alt = SITE.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 64,
        color: "#f4f2ed",
        background: "#0b1219",
        backgroundImage: "radial-gradient(circle at 100% 100%, #123354, #0b1219 70%)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          padding: 64,
          border: "1px solid #2b3946",
          borderRadius: 24,
        }}
      >
        <div style={{ display: "flex", fontSize: 112, letterSpacing: -6 }}>
          <span>jr7</span>
          <span style={{ color: "#80b7ef" }}>/</span>
          <span>ui</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#a6b4c3" }}>
          React components by Jagrat
        </div>
        <div style={{ marginTop: 48, fontSize: 24, color: "#80b7ef" }}>
          Preview · copy · install
        </div>
      </div>
    </div>,
    size,
  )
}
