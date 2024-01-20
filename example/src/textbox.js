import React from "react"
import { Html } from "@react-three/drei"

export const Textbox = ({ word, input }) => {
  const letters = word.split("")

  return (
    <Html position={[200, 200, 0]}>
      <div className="absolute bottom-0 w-full h-24 bg-white-500 flex items-center justify-center">
        {letters.map((letter, index) => {
          console.log(input[index])
          return (
            <div
              className={`m-2 w-24 h-24 ${
                input[index] === letter
                  ? "bg-green-500"
                  : input[index]
                  ? "bg-red-500"
                  : "bg-slate-50"
              } text-6xl font-extrabold flex items-center justify-center rounded-md shadow-md`}>
              <p>{input[index] === letter ? letter : "_"}</p>
            </div>
          )
        })}
      </div>
      <div style={{ width: "100vw", height: "100vh" }} />
    </Html>
  )
}
