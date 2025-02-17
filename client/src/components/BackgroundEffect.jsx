import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";

const RotatingSpheres = () => {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });
  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 10;
        const z = Math.sin(angle) * 10;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color="#111"
              emissive="#ffd700" // Gold/neon glow
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const BackgroundEffect = () => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Place behind your content
      }}
      camera={{ position: [0, 5, 20] }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <Grid
        position={[0, -2, 0]}
        args={[50, 50]} // Total grid size: width & height
        cellSize={1} // Size of each cell
        cellThickness={0.5} // Thickness of cell lines
        sectionSize={5} // Group cells into sections every 5 cells
        sectionThickness={1.5} // Thicker lines for section boundaries
        fadeDistance={30} // How far the grid fades out
        fadeStrength={1}
        infiniteGrid // Grid appears infinite
        cellColor="#444" // Dark cell lines
        sectionColor="#ffd700" // Neon gold for section lines
      />
      <RotatingSpheres />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default BackgroundEffect;
