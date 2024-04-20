import React, {useLayoutEffect, useRef, useEffect, useState} from 'react';
import { Float, Line, OrbitControls, PerspectiveCamera, Text, useScroll } from "@react-three/drei";
import Background from "./Background";
import Airplane from "./Airplane";
import Duck from "./Duck";
import Cloud from "./Cloud"
import { useMemo } from "react";
import { Group } from 'three';
import * as THREE from "three"
import { useFrame } from "@react-three/fiber";
import TextSection from './TextSection';
import gsap from "gsap";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import { useSnapshot } from "valtio";

import state from "../store";
import Outro from './Outro';


const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 45;
const FRICTION_DISTANCE = 42;

export const Experience = () => {
  const snap = useSnapshot(state);
  const [play, setPlay] = useState(false);

  const curvePoints = useMemo(() => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(5, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(7, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
  ], [])

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      curvePoints,
    false,
    "catmullrom",
    0.5)
  })

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS)
  }, [curve])

  const clouds = useMemo(
    () => [
      // STARTING
      
      {
        position: new THREE.Vector3(3.5, -6, -10),
      },
      {
        scale: new THREE.Vector3(2, 2, 2),
        position: new THREE.Vector3(-18, 0.2, -68),
        rotation: new THREE.Euler(-Math.PI / 5, Math.PI / 6, 0),
      },
      // FIRST POINT
      // {
      //   scale: new THREE.Vector3(2, 2, 2),
      //   position: new THREE.Vector3(
      //     curvePoints[1].x + 10,
      //     curvePoints[1].y - 4,
      //     curvePoints[1].z + 64
      //   ),
      // },
      {
        scale: new THREE.Vector3(1.5, 1.5, 1.5),
        position: new THREE.Vector3(
          curvePoints[1].x - 20,
          curvePoints[1].y + 4,
          curvePoints[1].z + 28
        ),
        rotation: new THREE.Euler(0, Math.PI / 7, 0),
      },
      {
        rotation: new THREE.Euler(0, Math.PI / 7, Math.PI / 5),
        scale: new THREE.Vector3(2.5, 2.5, 2.5),
        position: new THREE.Vector3(
          curvePoints[1].x - 13,
          curvePoints[1].y + 4,
          curvePoints[1].z - 62
        ),
      },
      {
        rotation: new THREE.Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
        scale: new THREE.Vector3(2.5, 2.5, 2.5),
        position: new THREE.Vector3(
          curvePoints[1].x + 54,
          curvePoints[1].y + 2,
          curvePoints[1].z - 82
        ),
      },
      {
        scale: new THREE.Vector3(2.5, 2.5, 2.5),
        position: new THREE.Vector3(
          curvePoints[1].x + 8,
          curvePoints[1].y - 14,
          curvePoints[1].z - 22
        ),
      },
      // SECOND POINT
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[2].x + 6,
          curvePoints[2].y - 7,
          curvePoints[2].z + 50
        ),
      },
      {
        scale: new THREE.Vector3(2, 2, 2),
        position: new THREE.Vector3(
          curvePoints[2].x - 2,
          curvePoints[2].y + 4,
          curvePoints[2].z - 26
        ),
      },
      {
        scale: new THREE.Vector3(4, 4, 4),
        position: new THREE.Vector3(
          curvePoints[2].x + 12,
          curvePoints[2].y + 1,
          curvePoints[2].z - 86
        ),
        rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 3),
      },
      // THIRD POINT
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[3].x + 3,
          curvePoints[3].y - 10,
          curvePoints[3].z + 50
        ),
      },
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[3].x - 10,
          curvePoints[3].y,
          curvePoints[3].z + 30
        ),
        rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new THREE.Vector3(4, 4, 4),
        position: new THREE.Vector3(
          curvePoints[3].x - 20,
          curvePoints[3].y - 5,
          curvePoints[3].z - 8
        ),
        rotation: new THREE.Euler(Math.PI, 0, Math.PI / 5),
      },
      // {
      //   scale: new THREE.Vector3(5, 5, 5),
      //   position: new THREE.Vector3(
      //     curvePoints[3].x + 0,
      //     curvePoints[3].y - 5,
      //     curvePoints[3].z - 98
      //   ),
      //   rotation: new THREE.Euler(0, Math.PI / 3, 0),
      // },
      // FOURTH POINT
      {
        scale: new THREE.Vector3(2, 2, 2),
        position: new THREE.Vector3(
          curvePoints[4].x + 3,
          curvePoints[4].y - 10,
          curvePoints[4].z + 2
        ),
      },
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[4].x + 14,
          curvePoints[4].y + 20,
          curvePoints[4].z - 42
        ),
        rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[4].x - 4,
          curvePoints[4].y + 9,
          curvePoints[4].z - 62
        ),
        rotation: new THREE.Euler(Math.PI / 3, 0, Math.PI / 3),
      },
      // FINAL
      {
        scale: new THREE.Vector3(2, 2, 2),
        position: new THREE.Vector3(
          curvePoints[7].x - 10,
          curvePoints[7].y - 5,
          curvePoints[7].z + 500
        ),
        rotation: new THREE.Euler(-Math.PI / 4, -Math.PI / 6, 0),
      },
      {
        scale: new THREE.Vector3(2, 2, 2),
        position: new THREE.Vector3(
          curvePoints[7].x + 10,
          curvePoints[7].y - 15,
          curvePoints[7].z + 480
        ),
        rotation: new THREE.Euler(-Math.PI / 4, -Math.PI / 6, 0),
      },
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[7].x - 10,
          curvePoints[7].y - 0,
          curvePoints[7].z + 150
        ),
        rotation: new THREE.Euler(Math.PI / 4, Math.PI / 6, 0),
      },
      {
        scale: new THREE.Vector3(4, 4, 4),
        position: new THREE.Vector3(
          curvePoints[7].x + 3,
          curvePoints[7].y -5,
          curvePoints[7].z - 22,
        ),
        rotation: new THREE.Euler(0, 0, 0),
      },
    ],
    []
  );

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);

    return shape;
  }, [curve]);


  const cameraGroup = useRef();
  const cameraRail = useRef();
  const lastScroll = useRef(0);
  const scroll = useScroll();

  const textSections = useMemo(() => {
    return [
      // {
      //   position: new THREE.Vector3(
      //     curvePoints[1].x - 3,
      //     curvePoints[1].y,
      //     curvePoints[1].z
      //   ),
      //   title: `SEWP WORLD HQ
      //   Home of the Government's Premier IT Contract`
      // },
      {
        cameraRailDist: 1.5,
        position: new THREE.Vector3(
          curvePoints[1].x + 2,
          curvePoints[1].y,
          curvePoints[1].z
        ),
        title: `Training & Events`,
        subtitle: `- Visit Site -`,
      },
      {
        cameraRailDist: -1,
        position: new THREE.Vector3(
          curvePoints[2].x - 3,
          curvePoints[2].y,
          curvePoints[2].z
        ),
        title: `Storefront & Aquisition Tools`,
        subtitle: `- Visit Site -`,
      },
      {
        cameraRailDist: 1.5,
        position: new THREE.Vector3(
          curvePoints[3].x + 2,
          curvePoints[3].y,
          curvePoints[3].z
        ),
        title: `Contract Holders & Industry Providers`,
        subtitle: `- Visit Site -`,
      },
      {
        cameraRailDist: 1.5,
        position: new THREE.Vector3(
          curvePoints[4].x + 2,
          curvePoints[4].y,
          curvePoints[4].z
        ),
        title: `About SEWP`,
        subtitle: `- Visit Site -`,
      },
      {
        cameraRailDist: 1.5,
        position: new THREE.Vector3(
          curvePoints[5].x + 2,
          curvePoints[5].y,
          curvePoints[5].z
        ),
        title: `Procurement Policy & Regulation`,
        subtitle: `- Visit Site -`,
      },
    ]
  })

  useFrame((_state, delta) => {

    const scrollOffset = Math.max(0, scroll.offset)

    if(snap.isEnd) {
      state.isEnd = true;
      <Outro />
      
      return;
      
    }

    

    let friction = 1;
    let resetCameraRail = true;
    // separate scroll sections
    textSections.forEach((textSection) => {
      const distance = textSection.position.distanceTo(cameraGroup.current.position);

      if(distance < FRICTION_DISTANCE) {
        friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
        const targetCameraRailPosition = new THREE.Vector3(
          (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0,
        )
        cameraRail.current.position.lerp(targetCameraRailPosition, delta);
        resetCameraRail = false;
      }
    });

    if(resetCameraRail) {
      const targetCameraRailPosition = new THREE.Vector3(0, 0, 0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }

    // Calculate lerped scroll offset
    let lerpedScrollOffset = THREE.MathUtils.lerp(lastScroll.current, scrollOffset, delta * friction);
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

    lastScroll.current = lerpedScrollOffset;
    tl.current.seek(lerpedScrollOffset * tl.current.duration());

    const curPoint = curve.getPoint(lerpedScrollOffset);

    // Follow curve points
    cameraGroup.current.position.lerp(curPoint, delta * 24)

    //Make group look ahead of curve
    const lookAtPoint = curve.getPoint(Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1));

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
    const tangent = curve.getTangent(lerpedScrollOffset + CURVE_AHEAD_AIRPLANE);

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

    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);

    if (
      cameraGroup.current.position.z <
      curvePoints[curvePoints.length - 1].z + 100
    ) {
      state.isEnd = true;
      planeOutTl.current.play();
    }
  });

  const tl = useRef();

  const airplane = useRef();

  const backgroundColors = useRef({
    colorA: "#3535cc",
    colorB: "#abaadd",
  })

  const planeInTl = useRef();
  const planeOutTl = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#6f35cc",
      colorB: "#ffad30",
    }),

    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#81318b",
      colorB: "#ffcc00",
    }),

    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#6f35cc",
      colorB: "#cccccc",
    }),

    tl.current.pause();

    planeInTl.current = gsap.timeline();
    planeInTl.current.pause();
    planeInTl.current.from(airplane.current.position, {
      duration: 3,
      z: 5,
      y: -2,
    });

    planeOutTl.current = gsap.timeline();
    planeOutTl.current.pause();

    planeOutTl.current.to(
      airplane.current.position,
      {
        duration: 10,
        z: -250,
        y: 10,
      },
      0
    );
    planeOutTl.current.to(
      cameraRail.current.position,
      {
        duration: 8,
        y: 12,
      },
      0
    );
    planeOutTl.current.to(airplane.current.position, {
      duration: 1,
      z: -1000,
    });
  }, [])

  useEffect(() => {
    if (snap.play) {
      planeInTl.current.play();
    }
  }, [snap.play]);

  

  // useEffect(() => {
  //   if (end) {
  //     state.isEnd = true;
  //   }
  // }, [end]);

  

  return (
    <>
      <directionalLight position={[0, 3, 1]} intensity={0.5} />

      {/* PLANE */}

      {/* <OrbitControls enableZoom={false} /> */}
      <group ref={cameraGroup}>
        <Background backgroundColors={backgroundColors}/>
        <group ref={cameraRail}>
          <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        </group>
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
          fontSize={0.4}
          maxWidth={2.5}
        >
          Home of the Government's Premier IT Contract
        </Text>
      </group>

      <group position={[-0.5, -1, -3]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.1}
          maxWidth={2.5}
        >
          scroll to begin
        </Text>
      </group>

      {textSections.map((textSection, index) => (
        <TextSection {...textSection} key={index} />
      ))}
      
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
            onBeforeCompile={fadeOnBeforeCompile}
          />
        </mesh>
      </group>
      
      {/* CLOUDS */}

      {clouds.map((cloud, index) => (
        <Cloud {...cloud} key={index} />
      ))}
    </>
  );
};
