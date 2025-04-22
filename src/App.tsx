import { useMotionValue, useSpring } from "framer-motion"
import OutlineLayers from "./components/OutlineLayers"
import GlassMorph from "./components/GlassMorph"

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
        fontFamily: "'Broadacre Light 4', sans-serif",
      }}
    >
      {/* Outlined Animated Text */}
      <OutlineLayers mouseX={mouseX} mouseY={mouseY} pulseValue={pulse} />

      {/* Glass Morph Highlight Text */}
      <GlassMorph>
        <div
          style={{
            fontSize: "clamp(4rem, 10vw, 12rem)",
            color: "#F9EADC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2vw",
            zIndex: 5,
            pointerEvents: "none",
            width: "100%",
            height: "100%",
          }}
        >
          <span>BEY</span>
          <span style={{ width: "6vw" }} />
          <span>ND</span>
        </div>
      </GlassMorph>

      {/* Optional 3D Canvas */}
      <canvas
        id="webgl-canvas"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
