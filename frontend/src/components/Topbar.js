import React from 'react';
import ProgressBar from './ProgressBar';

const Topbar = () => {

    // Set max value of progress bar based on number of steps in algorithm
    const maxValue = 10;

    return (
        <nav class="topbar">
            <div class="topbar-left-container">
                <span>Algorithm Visualiser | A* Search</span>
            </div>
            <div class="topbar-right-container">
                <div class="build-btn right-btn"><i class="fa-solid fa-wrench icon"></i>Build</div>
                <div class="play-btn right-btn"><i class="fa-solid fa-play icon"></i>Play</div>
                <div class="progress-bar-container">
                    {/* <div class="step-btn">{"<"}</div> */}
                    <ProgressBar maxValue={maxValue} />
                    {/* <div class="step-btn">{">"}</div> */}
                </div>
                <div class="speed-slider right-btn">Speed</div>
            </div>
        </nav>
    );
};

export default Topbar;
