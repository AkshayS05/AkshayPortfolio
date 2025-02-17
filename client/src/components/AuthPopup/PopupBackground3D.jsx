import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

/** A simple rotating torus in gold */
const RotatingTorus = () => {
  const meshRef = useRef();

  // Animate rotation each frame
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Torus geometry: [radius, tube, radialSegments, tubularSegments] */}
      <torusGeometry args={[1.5, 0.4, 16, 80]} />
      <meshStandardMaterial color="#ffd700" metalness={0.7} roughness={0.2} />
    </mesh>
  );
};

const PopupBackground3D = () => {
  return (
    <Canvas
      // Absolutely position the Canvas behind everything
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none", // Don't block clicks on the popup
      }}
      camera={{ position: [0, 0, 5] }}
      gl={{ alpha: true }} // Transparent background
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <RotatingTorus />
    </Canvas>
  );
};

export default PopupBackground3D;
