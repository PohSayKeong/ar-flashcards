import { ARMarker } from "@artcom/react-three-arjs"
import { useLoader } from "@react-three/fiber"
import React, { useEffect, useRef, useState } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Textbox } from "./textbox"
import Confetti from "react-confetti"
import { Html } from "@react-three/drei"
import { Help } from "./Help"

const models = ["HORSE", "DOLPHIN", "OCTOPUS", "CAT", "DOG", "ELEPHANT", "RHINO"]

const Model = ({ word }) => {
  const gltf = useLoader(GLTFLoader, `data/${word.toLowerCase()}.glb`)
  const modelRef = useRef()

  if (gltf.scene) {
    gltf.scene.rotation.x = -Math.PI / 2 // Example: rotate 90 degrees around the x-axis

    if (word == "HORSE") {
      gltf.scene.scale.set(0.25, 0.25, 0.25)
    }
    if (word == "DOLPHIN") {
      gltf.scene.scale.set(2.2, 2.2, 2.2)
    }
    if (word == "OCTOPUS") {
      gltf.scene.rotation.y = -Math.PI / 2
      gltf.scene.scale.set(7.5, 7.5, 7.5)
    }

    if (word == "CAT") {
      gltf.scene.position.set(-0.1, -0.25, 0)
      gltf.scene.scale.set(2, 2, 2)
    }

    if (word == "DOG") {
      gltf.scene.position.set(-0.5, -0.35, 0)
      gltf.scene.scale.set(1.25, 1.25, 1.25)
    }

    if (word == "ELEPHANT") {
      gltf.scene.position.set(0.4, -1.8, 0)
      gltf.scene.scale.set(0.002, 0.002, 0.002)
    }
  }

  // set animation to rotate the model every 0.5s
  useEffect(() => {
    const interval = setInterval(() => {
      if (modelRef.current) {
        modelRef.current.rotation.z += 0.02
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // play glb animation in loop
  useEffect(() => {
    if (gltf.animations.length) {
      const mixer = new window.THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
      const animate = () => {
        mixer.update(0.01)
        requestAnimationFrame(animate)
      }
      animate()
    }
  }, [gltf.animations])

  return (
    <mesh ref={modelRef} castShadow receiveShadow>
      <primitive object={gltf.scene} />
    </mesh>
  )
}

export const App = () => {
  const [word, setWord] = useState()
  const [typedLetters, setTypedLetters] = useState("")

  const handleKeyDown = event => {
    const keyPressed = event.key.toUpperCase() // Convert pressed key to uppercase
    // handle backspace
    if (keyPressed === "BACKSPACE") {
      setTypedLetters(prevTypedLetters => prevTypedLetters.slice(0, -1))
      return
    }
    // only allow letters exlude command keys
    if (!keyPressed.match(/^[A-Z]$/)) {
      return
    }
    setTypedLetters(prevTypedLetters => prevTypedLetters + keyPressed)
  }

  const setNextModel = () => {
    const currentIndex = models.indexOf(word)
    const nextIndex = (currentIndex + 1) % models.length
    setWord(models[nextIndex])
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    setNextModel()
    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (word === typedLetters) {
    setTimeout(() => {
      setNextModel()
      setTypedLetters("")
    }, 3000)
  }

  return (
    <>
      <ARMarker
        params={{ smooth: true }}
        type={"pattern"}
        patternUrl={"data/patt.hiro"}
        onMarkerFound={() => {
          console.log("Marker Found")
        }}>
        {word && <Model word={word} />}
      </ARMarker>
      {word && <Textbox word={word} input={typedLetters} />}
      <Html>
        {word === typedLetters && <Confetti width={1920} height={1080} />}
        <Help />
      </Html>
    </>
  )
}
