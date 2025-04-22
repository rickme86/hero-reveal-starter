import { motion, useAnimation, useTransform, useScroll } from "framer-motion"
import { useEffect, useRef, useState } from "react"

type Props = {
  children?: React.ReactNode
}

export default function GlassMorph({ children }: Props) {
  const { scrollY } = useScroll()
  const controls = useAnimation()
  const maskControls = useAnimation()

  const [isExpanded, setIsExpanded] = useState(true)
  const prevScroll = useRef(0)

  const isMobile = window.innerWidth <= 768
  const isPortrait = window.innerHeight > window.innerWidth
  const isMobilePortrait = isMobile && isPortrait

  const responsive = {
    rectHeight: isMobilePortrait ? "40vw" : "14vw",
    smallWidth: isMobilePortrait ? "80vw" : "34vw",
    largeWidth: isMobilePortrait ? "90vw" : "50vw",
    maskSize: isMobilePortrait ? "28vw" : "14vw",
    borderRadius: isMobilePortrait ? "8vw" : "2vw",
  }

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      const direction = current > prevScroll.current ? "down" : "up"
      prevScroll.current = current

      if (direction === "down" && isExpanded) {
        controls.start({
          width: responsive.smallWidth,
          height: responsive.rectHeight,
          borderRadius: responsive.borderRadius,
          transition: { duration: 0.4, ease: "easeInOut" },
        })
        maskControls.start({ scale: 0, transition: { duration: 0.4 } })
        setIsExpanded(false)
      }

      if (direction === "up" && !isExpanded) {
        controls.start({
          width: responsive.largeWidth,
          height: responsive.rectHeight,
          borderRadius: responsive.borderRadius,
          transition: { duration: 0.4, ease: "easeInOut" },
        })
        maskControls.start({ scale: 1, transition: { duration: 0.4 } })
        setIsExpanded(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isExpanded])

  return (
    <motion.div
      animate={controls}
      initial={{
        width: responsive.largeWidth,
        height: responsive.rectHeight,
        borderRadius: responsive.borderRadius,
      }}
      style={{
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 2,
        padding: "3rem",
      }}
    >
      {/* Optional mask reveal */}
      <motion.div
        animate={maskControls}
        initial={{ scale: 1 }}
        style={{
          width: responsive.maskSize,
          height: responsive.maskSize,
          borderRadius: "50%",
          background: "#0f0914",
          position: "absolute",
          zIndex: 3,
        }}
      />

      {children}
    </motion.div>
  )
}
