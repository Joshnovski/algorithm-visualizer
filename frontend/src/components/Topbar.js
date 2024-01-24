import React from 'react';

const Topbar = () => {
    return (
        <nav class="topbar">
            <div class="topbar-left-container">
                Algorithm Visualiser
            </div>
            <div class="topbar-right-container">
                <div class="build-btn right-btn"><i class="fa-solid fa-wrench icon"></i>Build</div>
                <div class="play-btn right-btn"><i class="fa-solid fa-play icon"></i>Play</div>
                <div class="progress-bar-container">
                    <div class="step-btn">{"<"}</div>
                    <div class="progress-bar"></div>
                    <div class="step-btn">{">"}</div>
                </div>
                <div class="speed-slider right-btn">Speed</div>
            </div>
        </nav>
    );
};

export default Topbar;
