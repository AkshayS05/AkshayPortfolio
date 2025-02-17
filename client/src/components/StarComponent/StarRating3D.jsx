import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SingleStar from "./SingleStar";

const StarRating3D = ({ rating, setRating }) => {
  // Track which star is hovered (-1 if none)
  const [hoveredStar, setHoveredStar] = useState(-1);

  // Create a ref for the audio element
  const audioRef = useRef(new Audio("/tun.wav"));

  return (
    <Canvas
      // Transparent background so it blends with the popup
      gl={{ alpha: true }}
      style={{ width: "100%", height: "100%", background: "none" }}
      camera={{ position: [0, 0, 10] }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={1} />

      {/* Disable user panning/zooming */}
      <OrbitControls enableZoom={false} enableRotate={false} />

      {/* Row of 5 stars, spaced horizontally */}
      {[...Array(5)].map((_, i) => {
        // Star is gold if hovered or if its index is < current rating
        const isHovered = i <= hoveredStar;
        const isSelected = i < rating; // rating is 1-based; i is 0-based
        const color = isHovered || isSelected ? "#FFD700" : "#999"; // gold or gray

        return (
          <SingleStar
            key={i}
            position={[i * 2.5 - 5, 0, 0]} // space them out
            color={color}
            onPointerOver={() => {
              setHoveredStar(i);
              // Play sound effect on hover
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
              }
            }}
            onPointerOut={() => setHoveredStar(-1)}
            onClick={() => setRating(i + 1)}
          />
        );
      })}
    </Canvas>
  );
};

export default StarRating3D;
