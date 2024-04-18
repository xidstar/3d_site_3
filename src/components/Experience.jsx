import React, {useRef} from 'react'
import { Float, Line, OrbitControls, PerspectiveCamera, Text, useScroll } from "@react-three/drei";
import Background from "./Background";
import Airplane from "./Airplane";
import Duck from "./Duck";
import Cloud from "./Cloud"
import { useMemo } from "react";
import { Group } from 'three';
import * as THREE from "three"
import { useFrame } from "@react-three/fiber";

const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 45;

export const Experience = () => {

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(5, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(7, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ],
    false,
    "catmullrom",
    0.5)
  })

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS)
  }, [curve])

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const scroll = useScroll();

  useFrame((_state, delta) => {
    // const curPointIndex = Math.min(
    //   Math.round(scroll.offset * linePoints.length),
    //   linePoints.length - 1
    // )

    const scrollOffset = Math.max(0, scroll.offset)

    const curPoint = curve.getPoint(scrollOffset);

    // Follow curve points
    cameraGroup.current.position.lerp(curPoint, delta * 24)

    //Make group look ahead of curve
    const lookAtPoint = curve.getPoint(Math.min(scrollOffset + CURVE_AHEAD_CAMERA, 1));

    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );

    const targetLookAt = new THREE.Vector3()
    .subVectors(curPoint, lookAtPoint)
    .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt,  delta * 24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    )

    // Airplane rotation
    const tangent = curve.getTangent(scrollOffset + CURVE_AHEAD_AIRPLANE);

    const nonLerpLookAt = new Group();
    nonLerpLookAt.position.copy(curPoint)
    nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt))

    tangent.applyAxisAngle(
      new THREE.Vector3(0, 1, 0), 
      -nonLerpLookAt.rotation.y
    )

    let angle = Math.atan2(-tangent.z, tangent.x);
    angle = -Math.PI / 2 + angle;

    let angleDegrees = (angle * 180) / Math.PI;
    angleDegrees *= 2.4 //stronger angle

    //limit plane angle

    if(angleDegrees < 0) {
      angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
    }
    if(angleDegrees > 0) {
      angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
    }

    //set back to angle
    angle = (angleDegrees * Math.PI) / 180;

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angle
      )
      
    )

    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2)
  });

 


  const airplane = useRef();

  return (
    <>
      <directionalLight position={[0, 3, 1]} intensity={0.1} />

      {/* PLANE/DUCK */}

      {/* <OrbitControls enableZoom={false} /> */}
      <group ref={cameraGroup}>
        <Background />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        <group ref={airplane}>
          <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
            <Airplane 
              rotation-y={Math.PI / 2} 
              scale={[0.2, 0.2, 0.2]} 
              position-y={0.1} 
            />
            {/* <Duck /> */}
          </Float>
        </group>
      </group>
      
      {/* TEXT */}

      <group position={[0.5, 0, -3]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.22}
          maxWidth={2.5}
        >
          SEWP WORLD HQ {"\n"}
          Home of the Government's Premier IT Contract
        </Text>
      </group>

      <group position={[-5, 0, -100]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.22}
          maxWidth={2.5}
        >
          Training & Events {"\n"}
          
          
        </Text>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"top"}
          position-y={-0.26}
          fontSize={0.22}
          maxWidth={2.5}
        >
          Visit Site
        </Text>
      </group>
      
      
      {/* LINE */}

      <group position-y={-0.3}>
        {/* <Line 
          points={linePoints}
          color={"white"}
          opacity={0.6}
          transparent
          lineWidth={20}
        /> */}
        <mesh>
          <extrudeGeometry 
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              }
            ]}
          />
          <meshStandardMaterial 
            color={"white"}
            opacity={1}
            transparent 
            envMapIntensity={2}
          />
        </mesh>
      </group>
      
      {/* CLOUDS */}

      <Cloud 
        scale={[1, 1, 1]}
        rotation-y={Math.PI / 3}
        position={[-3.5, 0.5, -12]}
      />
      {/* <Cloud 
        scale={[1, 1, 1]}
        position={[3.5, 0.2, -12]}
      /> */}
      <Cloud 
        scale={[0.4, 0.4, 0.4]}
        rotation-y={Math.PI / 9}
        position={[0, 0, -32]}
      />
      <Cloud 
        scale={[0.3, 0.5, 2]}
        position={[9, -0.5, -63]}
      />
      <Cloud 
        scale={[0.8, 0.8, 0.8]}
        position={[-2, -1, -90]}
      />
    </>
  );
};
