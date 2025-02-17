import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Shape } from "three";

function createStarShape(outerRadius = 1, innerRadius = 0.4, points = 5) {
  const shape = new Shape();
  const angleStep = (Math.PI * 2) / (points * 2);
  shape.moveTo(outerRadius, 0);
  for (let i = 1; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    shape.lineTo(Math.cos(i * angleStep) * r, Math.sin(i * angleStep) * r);
  }
  shape.closePath();
  return shape;
}

const SingleStar = ({
  position,
  color,
  onPointerOver,
  onPointerOut,
  onClick,
}) => {
  const meshRef = useRef();
  const hovered = useRef(false);

  // Animate a gentle scale transition on hover
  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered.current ? 1.2 : 1;
      meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
      meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
      meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1;
    }
  });

  const starShape = createStarShape(1, 0.4, 5);
  const extrudeSettings = {
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2,
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => {
        hovered.current = true;
        onPointerOver && onPointerOver();
      }}
      onPointerOut={() => {
        hovered.current = false;
        onPointerOut && onPointerOut();
      }}
      onClick={onClick}
    >
      <extrudeGeometry args={[starShape, extrudeSettings]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
    </mesh>
  );
};

export default SingleStar;
