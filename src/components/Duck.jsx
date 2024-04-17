import React, { useRef, useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';

const Duck = ({ isRotating, ...props}) => {
    const ref = useRef()
    const {scene, animations} = useGLTF('./models/duck/duck.glb');
    const { actions } = useAnimations(animations, ref)

    // Use an effect to control the plane's animation based on 'isRotating'
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  // useEffect(() => {
  //   if (isRotating) {
  //     actions["Take 001"].play();
  //   } else {
  //     actions["Take 001"].stop();
  //   }
  // }, [actions, isRotating]);

  return (
    <mesh {...props} position={[-20, 0, -8]} scale={0.3} ref={ref} rotation={[0, -Math.PI / 9, 0]}>
        <primitive object={scene} />
    </mesh>
  )
}

export default Duck