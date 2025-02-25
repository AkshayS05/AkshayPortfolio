import { useGLTF } from "@react-three/drei";

export function BrandModel(props) {
  const { nodes, materials } = useGLTF("/initials.glb");
  return (
    <group {...props} dispose={null} rotation={[0, Math.PI, 0]}>
      {/* Existing model groups */}
      <group rotation={[Math.PI / 2, 0, 0]} scale={[16.578, 0.32, 9.885]}>
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.imagem}
          rotation={[Math.PI, 0, 0]}
        />
      </group>
      <group
        position={[-16.578, -10.672, 9.982]}
        rotation={[-Math.PI / 4, 0, 0]}
        scale={0.757}
      >
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.material}
        />
      </group>
      <group
        position={[-8.289, -10.672, 9.982]}
        rotation={[-Math.PI / 4, 0, 0]}
        scale={0.757}
      >
        <mesh
          geometry={nodes.Object_13.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials.material}
        />
      </group>
      <group
        position={[15.79, -10.672, 9.982]}
        rotation={[-Math.PI / 4, 0, 0]}
        scale={0.757}
      >
        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          geometry={nodes.Object_17.geometry}
          material={materials.material}
        />
      </group>
      <group
        position={[8.289, -10.672, 9.982]}
        rotation={[-Math.PI / 4, 0, 0]}
        scale={0.757}
      >
        <mesh
          geometry={nodes.Object_19.geometry}
          material={materials["Material.005"]}
        />
        <mesh
          geometry={nodes.Object_20.geometry}
          material={materials.material}
        />
      </group>
      <group position={[0, -12.211, -6.923]}>
        <mesh
          geometry={nodes.Object_24.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Object_25.geometry}
          material={materials.material_0}
        />
      </group>
      <mesh
        geometry={nodes.Object_22.geometry}
        material={materials["Material.001"]}
        position={[0, -14.433, -6.923]}
        scale={[0.854, 23.945, 0.854]}
      />
      <mesh
        geometry={nodes.Object_27.geometry}
        material={materials["Material.001"]}
        position={[1.296, -10.962, -6.923]}
        scale={[0.124, 0.783, 0.783]}
      />
    </group>
  );
}

useGLTF.preload("/initials.glb");
