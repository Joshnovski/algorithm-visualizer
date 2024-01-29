import React from 'react';
import ProgressBar from './ProgressBar';
import SpeedSlider from './SpeedSlider';

const Topbar = ({ currentPath }) => {

    // Set max value of progress bar based on number of steps in algorithm
    const maxValue = 10;

    return (
        <nav class="topbar">
            <div class="topbar-left-container">
                <div class="app-title">SIMPLIFY</div>
                <div class="dropdown-path-list">
                    {currentPath.map((item, index) => (
                        <React.Fragment key={index}>
                            {index === 0 && <div className="title-separator">|</div>}
                            {index > 0 && <div className="title-separator">\</div>}
                            <div class="drowndown-path-list-item">{item}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div class="topbar-right-container">
                <div class="build-btn right-btn"><i class="fa-solid fa-wrench icon"></i>Build</div>
                <div class="play-btn right-btn"><i class="fa-solid fa-play icon"></i>Play</div>
                <div class="progress-bar-container">
                    <ProgressBar maxValue={maxValue} />
                </div>
                <SpeedSlider />
            </div>
        </nav>
    );
};

export default Topbar;
