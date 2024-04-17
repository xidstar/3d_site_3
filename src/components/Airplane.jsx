import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const HELIX_SPEED = 6;

const Airplane = (props) => {
    const { nodes, materials } = useGLTF('./models/airplane/model.glb')

    const helix = useRef();

    useFrame((_state, delta) => {
        helix.current.rotation.x += delta * HELIX_SPEED;
    });

    return (
      <group {...props} dispose={null}>
        <mesh geometry={nodes.PUSHILIN_Plane_Circle000.geometry} material={materials.plane} />
        <mesh ref={helix} geometry={nodes.PUSHILIN_Plane_Helix.geometry} material={materials.plane} position={[1.09, 0.23, 0]} />
      </group>
    )
}

useGLTF.preload('./models/airplane/model.glb')

export default Airplane