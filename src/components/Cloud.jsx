import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei';
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";

const Cloud = ({opacity, ...props}) => {
    const { nodes, materials } = useGLTF('./models/cloud/cloud.glb')
    return (
      <group {...props} dispose={null}>
        <mesh
          onBeforeCompile={fadeOnBeforeCompile}
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Material}
          rotation={[-Math.PI / 2, 0, 0]}
          envMapIntensity={2}
          transparent
          opacity={opacity}
        />
      </group>
    )
}

useGLTF.preload('./models/cloud/cloud.glb')

export default Cloud;
