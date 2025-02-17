import { useGLTF } from "@react-three/drei";

export function ComputerModel(props) {
  const { nodes, materials } = useGLTF("/computerModel.glb");
  return (
    <group {...props} dispose={null}>
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

useGLTF.preload("/computer.glb");
