import React from "react"
import { createRoot } from "react-dom/client"
import { ARCanvas } from "@artcom/react-three-arjs"
import { App } from "./App"
import "./styles.css"

createRoot(document.getElementById("root")).render(
  <ARCanvas
    gl={{ antialias: false, powerPreference: "default", physicallyCorrectLights: true }}
    onCameraStreamReady={() => console.log("Camera stream ready")}
    onCameraStreamError={() => console.error("Camera stream error")}
    onCreated={({ gl }) => {
      gl.setSize(window.innerWidth, window.innerHeight)
    }}>
    <ambientLight />
    <pointLight position={[10, 10, 0]} intensity={10.0} />
    <App />
  </ARCanvas>,
)
