import { useMotionValue, useSpring } from "framer-motion"
import OutlineLayers from "./components/OutlineLayers"

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
    <div onMouseMove={handleMouseMove} style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <OutlineLayers mouseX={mouseX} mouseY={mouseY} pulseValue={pulse} />

      {/* You can also layer your 3D Canvas here */}
      <canvas id="webgl-canvas" />
    </div>
  )
}
