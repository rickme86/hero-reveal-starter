import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Sphere({ scrollValue, positionOffset, scaleOffset }) {
  const meshRef = useRef();
  const [geometry, setGeometry] = useState();

  // Set geometry once it's loaded
  useEffect(() => {
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    setGeometry(geometry);
  }, []);

  // Apply scaling and position animation based on scroll
  useFrame(() => {
    if (meshRef.current) {
      // Scale the sphere based on the scroll value
      meshRef.current.scale.set(
        1 - scaleOffset * scrollValue, // First sphere scales down
        1 - scaleOffset * scrollValue,
        1 - scaleOffset * scrollValue
      );

      // Move the second sphere along the Z-axis, starting from a very close distance
      if (positionOffset) {
        meshRef.current.position.z = positionOffset * scrollValue; // Animate the sphere moving in
      }
    }
  });

  if (!geometry) return null;

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="#F9EADC" />
    </mesh>
  );
}

export default function ThreeSphere() {
  const [scrollValue, setScrollValue] = useState(0);

  // Update scroll value as user scrolls
  useEffect(() => {
    const handleWheel = (e) => {
      // Prevent default page scroll
      e.preventDefault();

      // Calculate scroll value based on wheel delta
      setScrollValue((prev) => Math.max(0, prev + e.deltaY / 100)); // Adjust the scroll sensitivity
    };

    // Listen for the wheel event
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Clean up the event listener when the component is unmounted
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "transparent",
      }}
      camera={{ position: [0, 0, 6], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 1]} intensity={1} />

      {/* First sphere - scales down */}
      <Sphere scrollValue={scrollValue} scaleOffset={0.5} positionOffset={0} />
      {/* Second sphere - animates in from near camera */}
      <Sphere scrollValue={scrollValue} scaleOffset={0} positionOffset={6} />
    </Canvas>
  );
}
