import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useState } from "react";

const skills = ["MongoDB", "React", "Three.js", "Node.js", "CSS", "HTML"];

function Leaf({ position, skill }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial emissive="green" emissiveIntensity={3} />
      </mesh>
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
    </group>
  );
}

function Tree() {
  const leaves = skills.map((skill, i) => ({
    position: [
      Math.random() * 2 - 1,
      Math.random() * 3 + 1,
      Math.random() * 2 - 1,
    ],
    skill,
  }));

  return (
    <group>
      {/* Tree Trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1.5, 8]} />
        <meshStandardMaterial color="brown" />
      </mesh>

      {/* Leaves */}
      {leaves.map((leaf, index) => (
        <Leaf key={index} position={leaf.position} skill={leaf.skill} />
      ))}
    </group>
  );
}

export default function GlowingTree() {
  return (
    <Canvas camera={{ position: [0, 3, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <Tree />
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
      <OrbitControls />
    </Canvas>
  );
}
