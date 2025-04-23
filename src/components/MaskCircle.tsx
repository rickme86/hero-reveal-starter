import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

type Props = {
  pulse: any
  mouseX: any
  mouseY: any
}

export default function MaskCircle({ pulse, mouseX, mouseY }: Props) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 1500)
    return () => clearTimeout(timeout)
  }, [])

  const x = useTransform(mouseX, (v) => v * 100)
  const y = useTransform(mouseY, (v) => v * 100)
  const size = useTransform(pulse, (v) => `${v * 32}vw`)
  const blur = useSpring(pulse, { damping: 20, stiffness: 60 })

  if (!show) return null

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#0f0914", // same as background to "mask" the content
        position: "absolute",
        top: "50%",
        left: "50%",
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 1,
        filter: blur ? "blur(0px)" : "blur(6px)",
        transition: "filter 1s ease",
      }}
    />
  )
}
