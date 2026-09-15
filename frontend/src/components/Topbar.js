import React from "react";
import ProgressBar from "./ProgressBar";
import SpeedSlider from "./SpeedSlider";

const Topbar = ({
  currentPath,
  toggleListPane,
  toggleCodePane,
  onBuild,
  onPlayPause,
  onStep,
  onSpeedChange,
  speed,
  totalSteps,
  currentStep,
  isPlaying,
}) => {
  const hasAlgorithm = currentPath.length > 0;
  const canBuild = hasAlgorithm && !isPlaying;
  const canPlay = totalSteps > 0;
  const atEnd = totalSteps > 0 && currentStep >= totalSteps;

  let playLabel = "Play";
  let playIcon = "fa-play";
  if (isPlaying) {
    playLabel = "Pause";
    playIcon = "fa-pause";
  } else if (atEnd) {
    playLabel = "Replay";
    playIcon = "fa-rotate-left";
  }

  return (
    <nav className="topbar">
      <div className="topbar-left-container">
        <div className="app-title">SIMPLIFY</div>
        <div className={`dropdown-path-list ${hasAlgorithm ? "show-border" : ""}`}>
          <div className="dropdown-path-list-inner">
            {currentPath.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="title-separator">//</span>}
                <span className="drowndown-path-list-item">{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="topbar-right-container">
        <div id="list-panel-icon" className="list-panel-icon right-btn" onClick={toggleListPane}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="toolbar">
          <div
            className={`build-btn ${canBuild ? "right-btn" : "disabled-btn"}`}
            onClick={canBuild ? onBuild : undefined}
            title="Rebuild the diagram from the code in the editor"
          >
            <i className="fa-solid fa-wrench icon"></i>Build
          </div>
          <div
            className={`play-btn ${canPlay ? "right-btn" : "disabled-btn"}`}
            onClick={canPlay ? onPlayPause : undefined}
          >
            <i className={`fa-solid ${playIcon} icon`}></i>
            {playLabel}
          </div>
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            onStep={onStep}
            isPlaying={isPlaying}
          />
          <SpeedSlider speed={speed} onSpeedChange={onSpeedChange} />
        </div>
        <div id="code-panel-icon" className="code-panel-icon right-btn" onClick={toggleCodePane}>
          <i className="fa-solid fa-code"></i>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
