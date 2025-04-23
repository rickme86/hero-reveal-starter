import * as THREE from "three"
import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"

function RotatingSphere({ mouseX, mouseY }) {
  const meshRef = useRef()

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = (mouseY.get() - 0.5) * Math.PI
    meshRef.current.rotation.y = (mouseX.get() - 0.5) * Math.PI
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#F9EADC" />
    </mesh>
  )
}

export default function ThreeSphere({ mouseX, mouseY }) {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
      }}
      camera={{ position: [0, 0, 4], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 1]} intensity={1} />
      <RotatingSphere mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  )
}
