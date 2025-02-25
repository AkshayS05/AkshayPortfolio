import { useGLTF } from "@react-three/drei";

export function ComputerModel(props) {
  const { nodes, materials } = useGLTF("/computerModel.glb");
  return (
    // Wrap in an outer group with the same rotation you used before:
    <group {...props} dispose={null} rotation={[0, Math.PI, 0]}>
      <group position={[0.121, 0.007, 0]}>
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.MacBookPro}
        />
        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials.MacBookPro}
        />
      </group>
      <mesh
        geometry={nodes.Object_8.geometry}
        material={materials.MacBookPro}
      />
    </group>
  );
}

useGLTF.preload("/computerModel.glb");
