
import * as React from "react"
import { Canvas } from "@react-three/fiber"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Suspense } from "react"
import ThreeSphere from "./ThreeSphere"

export default function HeroReveal() {
    const mouseX = useMotionValue(0.5)
    const mouseY = useMotionValue(0.5)

    const handleMouseMove = (e) => {
        mouseX.set(e.clientX / window.innerWidth)
        mouseY.set(e.clientY / window.innerHeight)
    }

    const xLeft = useTransform(mouseX, (v) => -v * 50)
    const xRight = useTransform(mouseX, (v) => v * 50)
    const y = useTransform(mouseY, (v) => -v * 20)

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            style={{
                width: "100vw",
                height: "100vh",
                background: "#0f0914",
                fontFamily: "sans-serif",
                fontSize: "10vw",
                color: "#F9EADC",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            <motion.span style={{ x: xLeft, y }}>BEY</motion.span>
            <span style={{ padding: "0 2rem" }} />
            <motion.span style={{ x: xRight, y }}>ND</motion.span>

            <Canvas
                camera={{ position: [0, 0, 5] }}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 300,
                    height: 300,
                    pointerEvents: "none",
                }}
            >
                <ambientLight />
                <Suspense fallback={null}>
                    <ThreeSphere mouseX={mouseX} mouseY={mouseY} />
                </Suspense>
            </Canvas>
        </motion.div>
    )
}
