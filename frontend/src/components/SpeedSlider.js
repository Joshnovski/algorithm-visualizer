import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";

const SpeedSlider = ({ speedValueChange }) => {
  const [value, setValue] = useState(3); // set initial value to 3

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
        min={0}
        max={6}
        defaultValue={3}
        onChange={(newValue) => setValue(newValue)}
        // renderThumb={(props) => <div {...props}></div>}
      />
    </div>
  );
};

export default SpeedSlider;
