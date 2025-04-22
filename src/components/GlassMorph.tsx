import { motion, useSpring, useTransform, useMotionValue } from "framer-motion"
import { useEffect } from "react"

type Props = {
  children: React.ReactNode
}

export default function GlassMorph({ children }: Props) {
  const pulse = useMotionValue(1)

  const scale = useSpring(pulse, {
    stiffness: 60,
    damping: 10,
  })

  const blur = useTransform(scale, (s) => `${20 + s * 5}px`)
  const radius = useTransform(scale, (s) => `${2 + s * 2}rem`)
  const opacity = useTransform(scale, (s) => 0.05 + s * 0.02)

  // Simple pulse loop for demo
  useEffect(() => {
    let direction = 1
    const interval = setInterval(() => {
      pulse.set(pulse.get() + 0.05 * direction)
      if (pulse.get() > 1.3 || pulse.get() < 0.8) direction *= -1
    }, 50)

    return () => clearInterval(interval)
  }, [pulse])

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(90vw, 1000px)",
        padding: "4rem 6rem",
        borderRadius: radius,
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 40px rgba(0, 0, 0, 0.6)",
        zIndex: 2,
        pointerEvents: "none",
        opacity,
      }}
    >
      {children}
    </motion.div>
  )
}
