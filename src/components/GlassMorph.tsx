import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
  pulseValue?: any // optional pulse if you want to pass it from App
}

export default function GlassMorph({ children, pulseValue }: Props) {
  const [morphIndex, setMorphIndex] = useState(0)

  const clipPaths = [
    "inset(0% 0% 0% 0% round 20% 30% 40% 30%)",
    "inset(0% 0% 0% 0% round 30% 25% 20% 35%)",
    "inset(0% 0% 0% 0% round 25% 40% 35% 20%)",
    "inset(0% 0% 0% 0% round 20% 30% 40% 30%)",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMorphIndex((prev) => (prev + 1) % clipPaths.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const scale = pulseValue ? useTransform(pulseValue, [0.9, 1.1], [0.95, 1.05]) : 1

  return (
    <motion.div
      animate={{
        clipPath: clipPaths[morphIndex],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "2rem 3rem",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "2rem",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 2,
        scale,
      }}
    >
      {children}
    </motion.div>
  )
}
