import { motion, useTransform, MotionValue, useScroll, useMotionValue } from "framer-motion";
import { sharedFontFamily, sharedFontSize, sharedGap } from "../constants/sharedStyles";
import { useEffect, useState } from "react";

type Props = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  pulseValue: MotionValue<number>;
};

export default function OutlineLayers({ mouseX, mouseY, pulseValue }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const gapWidth = useTransform(pulseValue, (v) => `calc(${sharedGap} * ${v})`);
  const { scrollYProgress } = useScroll();
  const fadeOutOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Animated outer concentric circles with parallax
  const circleRadii = [200, 300, 400];
  const parallaxCircles = circleRadii.map((r, index) => {
    const xOffset = useTransform(mouseX, (x) => x * (index + 1) * 5);
    const yOffset = useTransform(mouseY, (y) => y * (index + 1) * 5);

    return (
      <motion.circle
        key={`circle-${r}`}
        cx="50%"
        cy="50%"
        r={r}
        stroke={`rgba(249, 234, 220, ${0.2 - index * 0.05})`}
        strokeWidth="1"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 + index * 0.3, duration: 0.8, ease: "easeOut" }}
        style={{
          x: xOffset,
          y: yOffset,
        }}
      />
    );
  });

  const layers = [1, 0.5, 0.25, 0.1, 0.05].map((opacity, index) => {
    const offset = 10 + index * 20;
    const BEYx = useTransform(mouseX, (x) => -x * offset - 80);
    const BEYy = useTransform(mouseY, (y) => -y * offset - 5);
    const NDx = useTransform(mouseX, (x) => x * offset + 30);
    const NDy = useTransform(mouseY, (y) => -y * offset - 5);

    return (
      <motion.div
        key={`desktop-layer-${index}`}
        style={{
          fontSize: "clamp(8rem, 16vw, 20rem)",
          fontFamily: sharedFontFamily,
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
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3 + index * 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <motion.span style={{ x: BEYx, y: BEYy }}>BEY</motion.span>
        <motion.span
          style={{
            width: gapWidth,
            height: "1px",
            display: "inline-block",
          }}
        />
        <motion.span style={{ x: NDx, y: NDy }}>ND</motion.span>
      </motion.div>
    );
  });

  const echoOpacities = [0.7, 0.4, 0.2, 0.05];
  const mobileEchoLayers = echoOpacities.map((opacity, index) => (
    <motion.div
      key={`mobile-echo-${index}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.5 + index * 0.2,
        duration: 0.6,
        ease: "easeOut",
      }}
      style={{
        color: "transparent",
        WebkitTextStroke: `0.8px rgba(249, 234, 220, ${opacity})`,
        fontSize: "clamp(4rem, 8vw, 6rem)",
        fontWeight: "bold",
        fontFamily: sharedFontFamily,
        marginTop: index === 0 ? 0 : "0.6rem",
        textShadow: `0 2px 10px rgba(0, 0, 0, ${opacity * 0.5})`,
      }}
    >
      BEYOND
    </motion.div>
  ));

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 70%)",
      }}
    >
      <svg width="100%" height="100%" style={{ position: "absolute" }}>
        {parallaxCircles}
      </svg>
      {isMobile ? (
        <div
          style={{
            position: "absolute",
            bottom: "-10vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 0,
          }}
        >
          {mobileEchoLayers}
        </div>
      ) : (
        layers
      )}
    </div>
  );
}
