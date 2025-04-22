import { motion, useTransform } from "framer-motion"

type Props = {
    mouseX: any
    mouseY: any
    pulseValue: any
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
                    fontSize: "160px",
                    fontFamily: "'Broadacre Light 4', sans-serif",
                    color: "transparent",
                    WebkitTextStroke: `1px rgba(249, 234, 220, ${opacity * 0.6})`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 0,
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
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
