import { useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"
import OutlineLayers from "./components/OutlineLayers"
import GlassMorph from "./components/GlassMorph"

export default function App() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const pulse = useSpring(1, { stiffness: 60, damping: 10 })

  useEffect(() => {
    const interval = setInterval(() => {
      pulse.set(Math.random() * 0.2 + 0.9) // causes pulsing between ~0.9-1.1
    }, 2000)
    return () => clearInterval(interval)
  }, [pulse])

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
        fontFamily: "'Broadacre Light 4', sans-serif",
      }}
    >
      {/* 🧠 Outline Parallax Layers */}
      <OutlineLayers mouseX={mouseX} mouseY={mouseY} pulseValue={pulse} />

      {/* 💠 Morphing Glass Panel with Text */}
      <GlassMorph pulseValue={pulse}>
        <div
          style={{
            fontSize: "clamp(8vw, 10vw, 12vw)",
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

      {/* 🪐 3D/WebGL Canvas if you're embedding */}
      <canvas id="webgl-canvas" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
    </div>
  )
}
