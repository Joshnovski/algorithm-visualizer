import React from "react";

const ProgressBar = ({ currentStep, totalSteps, onStep, isPlaying }) => {
  const maxValue = totalSteps || 1;
  const canStep = !isPlaying && totalSteps > 0 && currentStep < totalSteps;
  const progressPercentage = totalSteps > 0 ? (currentStep / maxValue) * 100 : 0;

  return (
    <div className="progress-bar-container">
      <div className={canStep ? "step-btn" : "disabled-btn"} onClick={canStep ? onStep : undefined}>
        <i className="fa-solid fa-forward-step icon"></i>
        Step
      </div>
      <div className="progress-bar">
        <div className="progress-bar-active" style={{ width: `${progressPercentage}%` }}></div>
        <div className="progress-bar-value">
          <span className="progress-bar-current-value">{currentStep}</span>
          {`/${totalSteps}`}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
