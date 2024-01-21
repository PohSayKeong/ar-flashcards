import React, { useState } from "react"

/**
 * Component at the top right corner of the screen that displays a popup modal
 */
export const Help = () => {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <>
      <div
        className="absolute top-0 right-0 m-2 w-8 h-8 flex items-center justify-center rounded-lg shadow-md cursor-pointer z-[1000000000] bg-white select-none	"
        onClick={() => setShowHelp(!showHelp)}>
        <p className="text-2xl font-extrabold">?</p>
      </div>
      {showHelp && (
        <div className="absolute top-0 right-0 m-2 w-96 h-96 flex items-center justify-center rounded-lg shadow-md z-[1000000000] bg-white select-none	">
          <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <p className="text-xl font-extrabold">How to play Spelltopia</p>
            <p className="text-lg font-extrabold">1. Scan the QR code or visit bit.ly/spellhiro</p>
            <img src="./data/spellhiro.png" className="w-20 h-20" />
            <p className="text-lg font-extrabold">2. Place the marker in front of the camera</p>
            <p className="text-lg font-extrabold">3. Spell the word</p>
            <p className="text-lg font-extrabold">4. Collect all the animals!</p>
          </div>
          <div className="closeButton">
            <button
              className="absolute top-0 right-0 m-2 w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
              onClick={() => setShowHelp(!showHelp)}>
              <p className="text-2xl font-extrabold">X</p>
            </button>
          </div>
        </div>
      )}
      <div style={{ width: "100vw", height: "100vh" }} />
    </>
  )
}
