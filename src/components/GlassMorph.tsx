import React from "react";

const GlassMorph = ({ scrollValue }: { scrollValue: number }) => {
  const scaleFactor = 1 + scrollValue * 1.5;

  const width = 100 + scrollValue * 800;
  const height = 100 + scrollValue * 600;
  const maskSize = 50 + scrollValue * 300;

  const containerStyle: React.CSSProperties = {
    width,
    height,
    borderRadius: "1rem",
    backdropFilter: "blur(15px)",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20vh auto",
    maskImage: `radial-gradient(circle at center, transparent ${maskSize}px, black ${maskSize + 2}px)`,
    WebkitMaskImage: `radial-gradient(circle at center, transparent ${maskSize}px, black ${maskSize + 2}px)`,
    maskComposite: "exclude",
    WebkitMaskComposite: "destination-out",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    color: "#fff",
    fontSize: "2rem",
  };

  console.log("📦 Received scrollValue:", scrollValue);

  return (
    <div style={containerStyle}>
      Scroll to Scale
    </div>
  );
};

export default GlassMorph;
