import { motion, useTransform, MotionValue } from "framer-motion"

type Props = {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  pulseValue: MotionValue<number>
}

export default function OutlineLayers({ mouseX, mouseY, pulseValue }: Props) {
  const gapWidth = useTransform(pulseValue, (v) => `${v * 6}vw`)

  const layers = [1, 0.5, 0.25, 0.1, 0.05].map((opacity, index) => {
    const offset = 10 + index * 20
    const BEYx = useTransform(mouseX, (x) => -x * offset - 80)
    const BEYy = useTransform(mouseY, (y) => -y * offset - 5)

    const NDx = useTransform(mouseX, (x) => x * offset + 30)
    const NDy = useTransform(mouseY, (y) => -y * offset - 5)

    return (
      <motion.div
        key={index}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(8vw, 10vw, 12vw)",
          fontFamily: "'Broadacre Light 4', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "transparent",
          WebkitTextStroke: `1px rgba(249, 234, 220, ${opacity * 0.6})`,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: 1,
        }}
      >
        <motion.span style={{ x: BEYx, y: BEYy }}>BEY</motion.span>
        <motion.span style={{ width: gapWidth }} />
        <motion.span style={{ x: NDx, y: NDy }}>ND</motion.span>
      </motion.div>
    )
  })

  return <>{layers}</>
}
