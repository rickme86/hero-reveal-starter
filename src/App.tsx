import React from "react"
import { Canvas } from "@react-three/fiber"
import ThreeSphere from "./ThreeSphere"

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0f0914" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <ThreeSphere />
      </Canvas>
    </div>
  )
}
