
import * as THREE from "three"
import React, { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function ThreeSphere({ mouseX, mouseY }) {
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
