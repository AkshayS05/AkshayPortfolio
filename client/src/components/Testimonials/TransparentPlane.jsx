import React from "react";
import * as THREE from "three";

const TransparentPlane = ({ width = 9, height = 6, ...props }) => {
  return (
    <mesh {...props}>
      <planeGeometry args={[width, height]} />
      <meshPhysicalMaterial
        side={THREE.DoubleSide} // So we see it from both sides
        color="#ffffff" // White base color
        opacity={0.3} // 30% opacity
        transparent={true} // Must be true for opacity to work
        transmission={1.0} // 1.0 => fully transmissive
        roughness={0.2} // Some roughness for a bit of “frosted” look
        thickness={0.02} // Slight thickness for subtle refraction
        metalness={0.0}
        reflectivity={0.0}
        clearcoat={0.0}
      />
    </mesh>
  );
};

export default TransparentPlane;
