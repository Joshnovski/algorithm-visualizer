// ProgressBar.js
import React, { useState, useEffect } from "react";

const ProgressBar = ({
  maxValue,
  externalIncreaseStep,
  currentStep,
  playCurrentStep,
  triggerBuild,
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  console.log("currentStep: ", currentStep);
  console.log("playCurrentStep: ", playCurrentStep);
  useEffect(() => {
    setCurrentValue(0);
  }, [triggerBuild]);
  useEffect(() => {
    if (playCurrentStep > 0) {
        setCurrentValue(playCurrentStep + currentStep);
      } else {
        setCurrentValue(currentStep);
      }
  }, [currentStep, playCurrentStep]);

  const internalIncreaseStep = () => {
    setCurrentValue((prev) => (prev < maxValue ? prev + 1 : maxValue));
    if (externalIncreaseStep) externalIncreaseStep();
  };

  const progressPercentage = (currentValue / maxValue) * 100;

  return (
    <div class="progress-bar-container">
      <div class="step-btn" onClick={internalIncreaseStep}>
        <i class="fa-solid fa-forward-step icon"></i>
        {"Step"}
      </div>
      <div class="progress-bar">
        <div
          class="progress-bar-active"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div class="progress-bar-value">
          <span class="progress-bar-current-value">{`${currentValue}`}</span>
          {`/${maxValue}`}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
