import React, { useState } from "react";
import { useTexture, RoundedBox } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

const DeleteIcon = (props) => {
  const texture = useTexture("/deleteIcon.png");
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 1.3 : 1,
    config: { tension: 300, friction: 20 },
  });

  return (
    <a.group
      {...props}
      scale={scale}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <RoundedBox args={[1, 1, 0.1, 4, 0.2]}>
        <meshStandardMaterial
          map={texture}
          transparent
          color="red" // Red for delete
          roughness={0.3}
          metalness={0.5}
          emissive="#2f204e"
          emissiveIntensity={0.3}
        />
      </RoundedBox>
    </a.group>
  );
};

export default DeleteIcon;
