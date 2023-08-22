import React from "react";
import "./styles.css";

import fetchLight from "./fetch-light";

const colors = ["red", "yellow", "green"];

export default function App() {
  const [activeColor, setActiveColor] = React.useState("red");
  const [random, setRandom] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  /***
   * Handles the color change action
   */
  const changeLight = async () => {
    const currColorIndex = colors.indexOf(activeColor);
    let nextActiveColor = activeColor;

    setLoading(true);
    if (random) {
      // get random color for light
      nextActiveColor = await fetchLight();
    } else {
      // normal color order should be the reverse
      // of the array order (from green -> yellow -> red)
      nextActiveColor = colors.at(currColorIndex - 1);
    }
    setLoading(false);
    setActiveColor(nextActiveColor);
  };

  /**
   * Toggles whether or not the light
   * colors are randomized upon change
   */
  const handleSetRandom = () => {
    setRandom(!random);
  };

  return (
    <div className="container">
      <div className="lights-container">
        {colors.map((color, i) => (
          <div
            key={i}
            className={"circle " + (color === activeColor ? color : "")}
          ></div>
        ))}
      </div>
      <button onClick={changeLight} disabled={loading}>
        Change!
      </button>
      {/* Randomizer Toggle */}
      <div className="input-group">
        <input type="checkbox" onChange={handleSetRandom} />
        <label>Randomize?</label>
      </div>
    </div>
  );
}
