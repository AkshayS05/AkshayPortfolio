import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

// Load and modify the tree model
const TreeModel = () => {
  const { scene } = useGLTF("/tree.glb"); // Load your GLB model

  scene.traverse((obj) => {
    if (obj.isMesh && obj.name.includes("Leaves")) {
      obj.material = new THREE.MeshStandardMaterial({
        color: "green",
        emissive: "lime",
        emissiveIntensity: 2,
      });
    }
  });

  return <primitive object={scene} scale={3} position={[0, -1, 0]} />;
};

// Floating leaves animation
const FloatingLeaves = ({ position, skill }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.position.y =
      position[1] + Math.sin(clock.getElapsedTime()) * 0.2;
  });

  return (
    <group ref={ref} position={position}>
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
};

export default function GlowingTree() {
  const skills = ["MongoDB", "React", "Three.js", "Node.js", "CSS", "HTML"];
  const leaves = [
    [1, 2, 0],
    [-1, 2.5, 1],
    [0.5, 3, -1],
    [-0.8, 2.7, 1.5],
    [1.2, 3.2, -0.6],
    [-1.3, 2.8, 0.9],
  ];

  return (
    <Canvas camera={{ position: [0, 3, 6] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <TreeModel />
      {skills.map((skill, i) => (
        <FloatingLeaves key={i} position={leaves[i]} skill={skill} />
      ))}
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.1} />
      </EffectComposer>
      <OrbitControls />
    </Canvas>
  );
}
