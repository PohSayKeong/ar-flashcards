import { ARMarker } from "@artcom/react-three-arjs"
import { useLoader } from "@react-three/fiber"
import React, { useEffect, useRef, useState } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Textbox } from "./textbox"

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
  const [word, setWord] = useState("")
  const [typedLetters, setTypedLetters] = useState("")

  const handleKeyDown = event => {
    const keyPressed = event.key.toUpperCase() // Convert pressed key to uppercase
    // handle backspace
    if (keyPressed === "BACKSPACE") {
      setTypedLetters(prevTypedLetters => prevTypedLetters.slice(0, -1))
      return
    }
    setTypedLetters(prevTypedLetters => prevTypedLetters + keyPressed)
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <>
      <ARMarker
        params={{ smooth: true }}
        type={"pattern"}
        patternUrl={"data/patt.hiro"}
        onMarkerFound={() => {
          console.log("Marker Found")
        }}>
        <Model />
      </ARMarker>
      <Textbox word="HORSE" input={typedLetters} />
    </>
  )
}
