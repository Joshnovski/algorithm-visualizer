import React from "react";
import ReactSlider from "react-slider";

// Seconds per step. The slider is inverted so that dragging right means faster.
const SpeedSlider = ({ speed, onSpeedChange }) => (
  <div className="speed-slider-container right-btn">
    <div>Speed</div>
    <ReactSlider
      className="speed-slider"
      thumbClassName="speed-slider-thumb"
      trackClassName="speed-slider-track"
      min={0.4}
      max={3.0}
      step={0.2}
      invert
      value={speed}
      onChange={onSpeedChange}
    />
  </div>
);

export default SpeedSlider;
