import { useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

import OutlineLayers from "./components/OutlineLayers"
import GlassMorph from "./components/GlassMorph"
import PulsingMaskCircle from "./components/PulsingMaskCircle"

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

  // Optional: subtle pulsing animation over time
  useEffect(() => {
    let direction = 1
    const interval = setInterval(() => {
      pulse.set(direction > 0 ? 1.15 : 0.85)
      direction *= -1
    }, 2000)
    return () => clearInterval(interval)
  }, [])

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
      {/* 🧠 Parallax Outline Layers */}
      <OutlineLayers mouseX={mouseX} mouseY={mouseY} pulseValue={pulse} />

      {/* 🕳️ Center Pulsing Circle */}
      <PulsingMaskCircle pulseValue={pulse} />

      {/* 💠 Glass Morph Rectangle with Solid Text */}
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

      {/* 🪐 Optional 3D Canvas */}
      <canvas id="webgl-canvas" />
    </div>
  )
}
