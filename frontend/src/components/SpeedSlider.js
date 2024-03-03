import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";

const SpeedSlider = ({ speedValueChange }) => {

  const initialSpeed = 1.8;
  const [value, setValue] = useState(initialSpeed); // set initial value to 3

  useEffect(() => {
    speedValueChange(value);
  }, [value]);

  return (
    <div class=" right-btn speed-slider-container">
      <div>Speed</div>
      <ReactSlider
        className="speed-slider"
        thumbClassName="speed-slider-thumb"
        trackClassName="speed-slider-track"
        min={0.4}
        max={3.0}
        step={0.2}
        invert
        defaultValue={initialSpeed}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
};

export default SpeedSlider;
