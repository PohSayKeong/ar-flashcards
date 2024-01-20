import { ARMarker } from "@artcom/react-three-arjs"
import { useLoader } from "@react-three/fiber"
import React, { useEffect, useRef, useState } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Textbox } from "./textbox"

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
