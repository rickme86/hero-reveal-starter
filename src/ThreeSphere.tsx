import React, { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function ThreeSphere() {
  const mesh = useRef()

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01
      mesh.current.rotation.x += 0.005
    }
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}
