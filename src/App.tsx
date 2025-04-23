import { useMotionValue, useSpring } from "framer-motion";
import OutlineLayers from "./components/OutlineLayers";
import GlassMorph from "./components/GlassMorph";
import ThreeSphere from "./components/ThreeSphere"; // ✅ Path must be correct

function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 15 });
  const pulseValue = useMotionValue(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const x = (e.clientX - centerX) / centerX;
    const y = (e.clientY - centerY) / centerY;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#0f0f0f",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* 🔵 Background Outline Animation */}
      <OutlineLayers mouseX={springX} mouseY={springY} pulseValue={pulseValue} />

      {/* 🪩 Three Sphere Canvas */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
        <ThreeSphere mouseX={mouseX} mouseY={mouseY} />
      </div>

      {/* 🧊 Foreground Glass Morph */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <GlassMorph mouseX={mouseX} />
      </div>
    </div>
  );
}

export default App;
