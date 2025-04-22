import React from "react"

type Props = {
  children: React.ReactNode
}

export default function GlassMorph({ children }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "2rem 3rem",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  )
}
