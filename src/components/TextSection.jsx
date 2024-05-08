import React from 'react'
import { Text } from '@react-three/drei';
import { fadeOnBeforeCompileFlat } from '../utils/fadeMaterial';

const TextSection = ({title, subtitle, ...props}) => {
    
  const arrow = String.fromCodePoint(0x27F6);

  return (

      <group {...props}>
        <Text
            color="white"
            anchorX={"left"}
            anchorY={"bottom"}
            fontSize={0.25}
            maxWidth={3}
            lineHeight={1.2}
        >
            {title}
            <meshStandardMaterial color={"white"} onBeforeCompile={fadeOnBeforeCompileFlat}/>
        </Text>
        <Text
            color="#f66363"
            anchorX={"left"}
            anchorY={0.1}
            fontSize={0.17}
            maxWidth={2.5}
            lineHeight={1.2}
        >
            {subtitle} {' '}
            {arrow}
            <meshStandardMaterial color="white" onBeforeCompile={fadeOnBeforeCompileFlat}/>
        </Text>
        {/* <Text
            color="#f66363"
            anchorX={"left"}
            anchorY={"top"}
            fontSize={0.15}
            maxWidth={2.5}
            lineHeight={2}
        >
            {`- Visit Site -`}
            <meshStandardMaterial color="white" onBeforeCompile={fadeOnBeforeCompileFlat}/>
        </Text> */}
        
        
      </group>
    )
}

export default TextSection