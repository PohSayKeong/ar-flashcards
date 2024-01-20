import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"
import { useLoader } from "@react-three/fiber"
import React, { useRef } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Model = ({word}) => {
  const gltf = useLoader(GLTFLoader, `data/${word}.glb`)
  const modelRef = useRef()

  if (gltf.scene) {
    
    gltf.scene.rotation.x = -Math.PI / 2 // Example: rotate 90 degrees around the x-axis
   
    if (word == "horse") {
       gltf.scene.scale.set(0.25, 0.25, 0.25);
    }
    if (word == "dolphin") {
      gltf.scene.scale.set(2.2, 2.2, 2.2);
    }
    if (word == "octopus") {
      gltf.scene.rotation.y = -Math.PI / 2;
      gltf.scene.scale.set(7.5, 7.5, 7.5);
    }

    if (word == "cat") {
      gltf.scene.position.set(-0.1, -0.25, 0);
      gltf.scene.scale.set(2, 2, 2);
   }

   if (word == "dog") {
     gltf.scene.position.set(-0.5, -0.35, 0);
     gltf.scene.scale.set(1.25, 1.25, 1.25);
   }

   if (word == "elephant") {
    gltf.scene.position.set(0.4, -1.8, 0);
    gltf.scene.scale.set(0.002, 0.002, 0.002);
  }

  if (word == "rhino") {
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.position.set(1, -10, 0);
  }
   
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
          <Model word={"octopus"}/>
        </ARMarker>
      </ARCanvas>
    </>
  )
}
