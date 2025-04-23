import { useEffect, useState } from "react";

const GlassMorph = () => {
  const [stage, setStage] = useState<"circle" | "square" | "rectangle">("circle");
  const [maskSize, setMaskSize] = useState(0);
  const [finalWidth, setFinalWidth] = useState(300);
  const [responsiveWidth, setResponsiveWidth] = useState(650);
  const [responsiveHeight, setResponsiveHeight] = useState(250);
  const [textVisible, setTextVisible] = useState(false);
  const [showMergedText, setShowMergedText] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [beyOffset, setBeyOffset] = useState("-20vw");
  const [ndOffset, setNdOffset] = useState("-15vw");
  const [isMobile, setIsMobile] = useState(false);

  let lastMouseMove = Date.now();

  useEffect(() => {
    const updateSize = () => {
      const isMobileFlag = window.innerWidth < 768;
      const isUltraWide = window.innerWidth >= 2560;

      setIsMobile(isMobileFlag);

      const newWidth = Math.min(window.innerWidth * (isMobileFlag ? 0.85 : 0.6), 900);
      setResponsiveWidth(newWidth);
      setResponsiveHeight(isMobileFlag ? window.innerHeight * 0.18 : window.innerHeight * 0.25);

      setBeyOffset(isUltraWide ? "-12vw" : "-12vw");
      setNdOffset(isUltraWide ? "-8vw" : "-5vw");
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const morphTimings = {
    circleToSquare: 500,
    squareToRectangle: 500,
  };

  const maskGrowthConfig = {
    intervalDelay: 10,
    sizeStep: 1,
    maxSize: 100,
  };

  const widthExpandConfig = {
    startWidth: 300,
    endWidth: responsiveWidth,
    step: 4,
  };

  const textAnimationDelay = 300;

  useEffect(() => {
    const toSquare = setTimeout(() => setStage("square"), morphTimings.circleToSquare);
    const toRect = setTimeout(
      () => setStage("rectangle"),
      morphTimings.circleToSquare + morphTimings.squareToRectangle
    );

    return () => {
      clearTimeout(toSquare);
      clearTimeout(toRect);
    };
  }, []);

  useEffect(() => {
    if (stage === "rectangle") {
      let size = 0;
      let width = widthExpandConfig.startWidth;

      const interval = setInterval(() => {
        size += maskGrowthConfig.sizeStep;
        width += widthExpandConfig.step;

        setMaskSize(Math.min(size, maskGrowthConfig.maxSize));
        setFinalWidth(Math.min(width, widthExpandConfig.endWidth));

        if (size >= maskGrowthConfig.maxSize && width >= widthExpandConfig.endWidth) {
          clearInterval(interval);

          setTimeout(() => {
            setTextVisible(true);
            setTimeout(() => {
              setShowMergedText(true);
            }, 1500);
          }, textAnimationDelay);
        }
      }, maskGrowthConfig.intervalDelay);

      return () => clearInterval(interval);
    }
  }, [stage, responsiveWidth]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (stage !== "rectangle") return;
      lastMouseMove = Date.now();
      const { innerWidth, innerHeight } = window;
      const dx = e.clientX - innerWidth / 2;
      setMouseX(dx / innerWidth);

      const dy = e.clientY - innerHeight / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.sqrt((innerWidth / 2) ** 2 + (innerHeight / 2) ** 2);
      const factor = 1 + (dist / maxDist) * 0.4;
      setMaskSize(100 * factor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [stage]);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      if (stage === "rectangle" && Date.now() - lastMouseMove > 1500) {
        const now = Date.now();
        const pulse = 100 + Math.sin(now / 300) * 5;
        setMaskSize(pulse);
      }
    }, 60);
    return () => clearInterval(pulseInterval);
  }, [stage]);

  const getContainerStyle = () => {
    const base = {
      backdropFilter: "blur(15px)",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      WebkitBackdropFilter: "blur(15px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.8s ease-in-out",
      fontSize: "6rem",
      color: "#121212",
      fontWeight: "bold",
    };

    switch (stage) {
      case "circle":
        return { ...base, width: 50, height: 50, borderRadius: "50%" };
      case "square":
        return { ...base, width: 250, height: 250, borderRadius: "1rem" };
      case "rectangle":
        return {
          ...base,
          width: finalWidth,
          height: responsiveHeight,
          borderRadius: "1rem",
          maskImage: `radial-gradient(circle at center, transparent ${maskSize}px, black ${maskSize + 2}px)` ,
          WebkitMaskImage: `radial-gradient(circle at center, transparent ${maskSize}px, black ${maskSize + 2}px)` ,
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        };
      default:
        return base;
    }
  };

  const mouseShift = mouseX * 50;

  return (
    <div style={{ position: "relative", zIndex: 2 }}>
      <HeaderText isMobile={isMobile} responsiveWidth={responsiveWidth} />

      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "2rem",
          background: "transparent",
        }}
      >
        <div style={getContainerStyle()}>
          <span
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              margin: "-1px",
              padding: "0",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: "0",
            }}
          >
            BEYOND
          </span>

          {!showMergedText && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: `calc(${beyOffset} + ${-mouseShift}px)` ,
                  top: "50%",
                  transform: textVisible ? "translateY(-50%)" : "translate(60px, -50%)",
                  opacity: textVisible ? 1 : 0,
                  filter: textVisible ? "blur(0px)" : "blur(10px)",
                  transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out, filter 0.6s ease-in-out",
                  color: isMobile ? "#F9EADC": "#121212",
                  fontSize: "clamp(4rem, 14vw, 18rem)",
                }}
              >
                BEY
              </div>
              <div
                style={{
                  position: "absolute",
                  right: `calc(${ndOffset} - ${mouseShift}px)` ,
                  top: "50%",
                  transform: textVisible ? "translateY(-50%)" : "translate(-60px, -50%)",
                  opacity: textVisible ? 1 : 0,
                  filter: textVisible ? "blur(0px)" : "blur(10px)",
                  transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out, filter 0.6s ease-in-out",
                  color: isMobile ? "#F9EADC": "#121212",
                  fontSize: "clamp(4rem, 14vw, 18rem)",
                }}
              >
                ND
              </div>
            </>
          )}

          {showMergedText && (
            <div
              className="desktop-merged"
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 1,
                transition: "opacity 0.8s ease-in-out",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: `calc(${beyOffset} + ${-mouseShift}px)` ,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "clamp(4rem, 14vw, 18rem)",
                  color: isMobile ? "#F9EADC": "#121212",
                }}
              >
                BEY
              </span>
              <span
                style={{
                  position: "absolute",
                  right: `calc(${ndOffset} - ${mouseShift}px)` ,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "clamp(4rem, 14vw, 18rem)",
                  color: isMobile ? "#F9EADC": "#121212",
                }}
              >
                ND
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HeaderText = ({ isMobile, responsiveWidth }: { isMobile: boolean; responsiveWidth: number }) => (
  <div
    style={{
      position: "absolute",
      top: isMobile ? "8vh" : "6vh",
      left: "50%",
      transform: "translateX(-50%)",
      width: isMobile ? "100%" : responsiveWidth,
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: isMobile ? "center" : "space-between",
      alignItems: "center",
      padding: "0 1rem",
      textAlign: "center",
      gap: isMobile ? "1rem" : 0,
    }}
  >
    <div
      className="depth-label"
      style={{
        fontStyle: "italic",
        color: "#f9eadc",
        marginLeft: isMobile ? "25%" : 0, 
        marginTop: isMobile ? "-10%" : 0, 
        marginRight: isMobile ? 0 : 0,
        fontSize: isMobile ? "2rem" : "2rem",
        transform: isMobile ? "translateX(10%)" : undefined, // shift right on mobile
      }}
    >
      I add depth to design
    </div>
    <div
      className="reveal-wrapper"
      style={{
        fontStyle: "italic",
        color: "#f9eadc",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: isMobile ? "1.1rem" : "1rem",
        marginRight: isMobile ? "42%" : 0,
        marginBottom: isMobile ? "-40%" : 0,
        transform: isMobile ? "translateX(-10%)" : undefined, // shift left on mobile
      }}
    >
      <span className="reveal-text">the screen</span>
    </div>
  </div>
);


export default GlassMorph;
