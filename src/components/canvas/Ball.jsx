import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl])

  return (
    <Float
      speed={1.75}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <ambientLight intensity={0.15} />
      <ambientLight position={[-1, -1, -0.5]} intensity={0.4} />
      <directionalLight position={[1, 1, 0.5]} />
      <mesh
        castShadow
        receiveShadow
        scale={2.75}
      >
        <sphereGeometry args={[1, 64, 32]}/>
        <meshStandardMaterial 
          color='#fff8ed'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1.2]}
          rotation={[ 2 * Math.PI, 0, 6.25]}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  )
}

const BallCanvas = (props) => {
  return (
    <Canvas
      frameloop="demand"
      gl={{preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        />
        <Ball imgUrl={props.icon} />
      </Suspense>

      <Preload all/>
    </Canvas>
  )
}

export default BallCanvas