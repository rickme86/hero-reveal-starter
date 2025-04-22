import { useMotionValue, useSpring } from "framer-motion"
import OutlineLayers from "./components/OutlineLayers"
import GlassMorph from "./components/GlassMorph"
import { useState } from "react"

export default function App() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const pulse = useSpring(1, { stiffness: 60, damping: 10 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX / window.innerWidth - 0.5
    const y = e.clientY / window.innerHeight - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#0f0914",
      }}
    >
      {/* 🧠 Outline Parallax Layers */}
      <OutlineLayers mouseX={mouseX} mouseY={mouseY} pulseValue={pulse} />

      {/* 💠 Glass Morph Rectangle */}
      <GlassMorph>
        <div
          style={{
            fontSize: "clamp(8vw, 10vw, 12vw)",
            fontFamily: "'Broadacre Light 4', sans-serif",
            color: "#F9EADC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            gap: "2vw",
            zIndex: 5,
            position: "relative",
          }}
        >
          <span style={{ transform: "translateY(-10%)" }}>BEY</span>
          <span style={{ width: "6vw" }} />
          <span style={{ transform: "translateY(-10%)" }}>ND</span>
        </div>
      </GlassMorph>

      {/* 🪐 3D canvas slot (if using WebGL separately) */}
      <canvas id="webgl-canvas" />
    </div>
  )
}
