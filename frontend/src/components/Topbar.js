import React from "react";
import ProgressBar from "./ProgressBar";
import SpeedSlider from "./SpeedSlider";

const Topbar = ({ currentPath, toggleListPane, toggleCodePane, buildCode, togglePlayPause }) => {
  // Set max value of progress bar based on number of steps in algorithm
  const maxValue = 14;

  return (
    <nav class="topbar">
      <div class="topbar-left-container">
        <div class="app-title">SIMPLIFY</div>
        <div
          className={`dropdown-path-list ${
            currentPath.length > 0 ? "show-border" : ""
          }`}
        >
          <div class="dropdown-path-list-inner">
            {currentPath.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="title-separator">//</span>}
                <span class="drowndown-path-list-item">{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div class="topbar-right-container">
        <div
          id="list-panel-icon"
          class="list-panel-icon right-btn"
          onClick={toggleListPane}
        >
          <i class="fa-solid fa-bars"></i>
        </div>
        <div class="toolbar">
          <div class="build-btn right-btn" onClick={buildCode}>
            <i class="fa-solid fa-wrench icon"></i>Build
          </div>
          <div class="play-btn right-btn" onClick={togglePlayPause}>
            <i class="fa-solid fa-play icon"></i>Play
          </div>
          <div class="progress-bar-container">
            <ProgressBar maxValue={maxValue} />
          </div>
          <SpeedSlider />
        </div>
        <div
          id="code-panel-icon"
          class="code-panel-icon right-btn"
          onClick={toggleCodePane}
        >
          <i class="fa-solid fa-code"></i>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
