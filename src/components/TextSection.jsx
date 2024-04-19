import React from 'react'
import { Text } from '@react-three/drei';
import { fadeOnBeforeCompileFlat } from '../utils/fadeMaterial';

const TextSection = ({title, subtitle, ...props}) => {
  return (

      <group {...props}>
        <Text
            color="white"
            anchorX={"left"}
            anchorY={"bottom"}
            fontSize={0.22}
            maxWidth={2.5}
            lineHeight={1}
        >
            {title}
            <meshStandardMaterial color={"white"} onBeforeCompile={fadeOnBeforeCompileFlat}/>
        </Text>
        <Text
            color="#f66363"
            anchorX={"left"}
            anchorY={"top"}
            fontSize={0.15}
            maxWidth={2.5}
            lineHeight={2}
        >
            {subtitle}
            <meshStandardMaterial color="white" onBeforeCompile={fadeOnBeforeCompileFlat}/>
        </Text>
        
      </group>
    )
}

export default TextSection