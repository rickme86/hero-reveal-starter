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
        width: "min(90vw, 1000px)",
        padding: "4rem 6rem",
        borderRadius: "2rem",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 40px rgba(0, 0, 0, 0.6)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  )
}
