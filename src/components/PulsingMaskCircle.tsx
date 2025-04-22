import { motion, useTransform } from "framer-motion"

type Props = {
  pulseValue: any
}

export default function PulsingMaskCircle({ pulseValue }: Props) {
  const scale = useTransform(pulseValue, (v) => 0.8 + v * 0.4)

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "25vw",
        height: "25vw",
        background: "#0f0914",
        borderRadius: "50%",
        scale,
        zIndex: 3,
        pointerEvents: "none",
      }}
    />
  )
}
