import { useEffect, useState } from "react";
import GlassMorph from "./components/GlassMorph"; // ✅ Adjust if your path is different

function App() {
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      console.log("✅ SCROLL FIRED");

      const scrollY = window.scrollY;
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;

      const value = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollValue(value);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "auto"; // Ensure scrolling is enabled
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "300vh", // ensure enough height to scroll
        background: "#0f0f0f",
      }}
    >
      {/* 🔎 Debug Box */}
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 999,
          color: "#fff",
          background: "#222",
          padding: "1rem",
          fontFamily: "monospace",
        }}
      >
        <div><strong>scrollY:</strong> {window.scrollY}</div>
        <div><strong>scrollValue:</strong> {scrollValue.toFixed(3)}</div>
      </div>

      <GlassMorph scrollValue={scrollValue} />

      {/* Fill area to allow scroll */}
      <div style={{ height: "2000px", background: "#111" }}></div>
    </div>
  );
}

export default App;
