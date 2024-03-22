import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";

const SpeedSlider = ({ speedValueChange, isPlaying, currentStep, logCurrentStep, triggerBuild }) => {

  const initialSpeed = 1.8;
  const [value, setValue] = useState(initialSpeed); // set initial value to 3
  const [isSliderDisabled, setIsSliderDisabled] = useState(false);

  useEffect(() => {
    speedValueChange(value);
  }, [value]);

  useEffect(() => {
    setIsSliderDisabled(false);
    console.log("isSliderDisabled: ", isSliderDisabled);
  }, [triggerBuild]);

  useEffect(() => {
    // This effect updates isSliderDisabled based on your original conditions,
    // but only if it hasn't been recently enabled by a triggerBuild change.
    if (!isSliderDisabled) { // Check if slider is currently not disabled from triggerBuild
      const shouldDisable = currentStep > 0 || isPlaying || logCurrentStep > 0;
      setIsSliderDisabled(shouldDisable);
    }
  }, [currentStep, isPlaying, logCurrentStep]);

  return (
    <div class={`speed-slider-container ${isSliderDisabled ? "disabled-btn" : "right-btn"}`}>
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
        disabled={isSliderDisabled}
      />
    </div>
  );
};

export default SpeedSlider;
