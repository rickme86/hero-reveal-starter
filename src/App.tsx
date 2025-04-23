import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import OutlineLayers from "./components/OutlineLayers";
import GlassMorph from "./components/GlassMorph";
import ThreeSphere from "./components/ThreeSphere";

function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 15 });
  const pulseValue = useMotionValue(1);

  const [warpStarted, setWarpStarted] = useState(false);
  const [warpDone, setWarpDone] = useState(false);
  const [scrollValue, setScrollValue] = useState(0); // Added scroll value state

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const x = (e.clientX - centerX) / centerX;
    const y = (e.clientY - centerY) / centerY;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!warpStarted && !warpDone && e.deltaY > 0) {
        e.preventDefault();
        setWarpStarted(true);
      }

      // Calculate the scroll value as a percentage of the total scrollable height
      const newScrollValue = Math.min(1, Math.max(0, window.scrollY / (document.body.scrollHeight - window.innerHeight)));
      setScrollValue(newScrollValue);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [warpStarted, warpDone]);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        background: "#0f0f0f",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* 🔒 Lock hero to 100vh before warp */}
      <div
        style={{
          position: "relative",
          height: warpDone ? "auto" : "100vh",
          overflow: "hidden",
        }}
      >
        {/* 🔵 Background Outline Animation */}
        <OutlineLayers mouseX={springX} mouseY={springY} pulseValue={pulseValue} />

        {/* 🪩 Three Sphere Canvas */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <ThreeSphere mouseX={mouseX} mouseY={mouseY} warpStarted={warpStarted} />
        </div>

        {/* 🧊 Foreground Glass Morph */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <GlassMorph scrollValue={scrollValue} /> {/* Pass scroll value to GlassMorph */}
        </div>
      </div>

      {/* 🧠 Next Section */}
      {warpDone && (
        <div
          id="next-section"
          style={{
            height: "100vh",
            background: "#fff",
            color: "#111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            zIndex: 0,
          }}
        >
          🚀 Welcome to the next dimension
        </div>
      )}
    </div>
  );
}

export default App;
