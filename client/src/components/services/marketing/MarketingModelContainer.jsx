import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { BrandModel } from "./Brand";
import { OrbitControls, Stage } from "@react-three/drei";

const MarketingModelContainer = () => {
  return (
    <Canvas>
      <Suspense fallback="loading...">
        <Stage environment="night" intensity={0.5}>
          <BrandModel />
        </Stage>
        <OrbitControls enableZoom={false} autoRotate />
      </Suspense>
    </Canvas>
  );
};

export default MarketingModelContainer;
