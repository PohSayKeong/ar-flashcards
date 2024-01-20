import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"
import { useLoader } from "@react-three/fiber"
import React, { useRef } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Model = () => {
  const gltf = useLoader(GLTFLoader, "data/rhino.glb")
  const modelRef = useRef()

  if (gltf.scene) {
    gltf.scene.rotation.x = -Math.PI / 2 // Example: rotate 90 degrees around the x-axis
  }

  return (
    <mesh ref={modelRef} castShadow receiveShadow>
      <primitive object={gltf.scene} />
    </mesh>
  )
}

export const App = () => {
  return (
    <>
      <ARCanvas
        gl={{ antialias: false, powerPreference: "default", physicallyCorrectLights: true }}
        onCameraStreamReady={() => console.log("Camera stream ready")}
        onCameraStreamError={() => console.error("Camera stream error")}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight)
        }}>
        <ambientLight />
        <pointLight position={[10, 10, 0]} intensity={10.0} />
        <ARMarker
          params={{ smooth: true }}
          type={"pattern"}
          patternUrl={"data/patt.hiro"}
          onMarkerFound={() => {
            console.log("Marker Found")
          }}>
          <Model />
        </ARMarker>
      </ARCanvas>
    </>
  )
}
