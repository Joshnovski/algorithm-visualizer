import React from 'react';
import ProgressBar from './ProgressBar';
import SpeedSlider from './SpeedSlider';

const Topbar = () => {

    // Set max value of progress bar based on number of steps in algorithm
    const maxValue = 10;

    return (
        <nav class="topbar">
            <div class="topbar-left-container">
                <div class="app-title">SIMPLIFY</div>
                {/* <div class="title-separator">|</div>
                <div>Linear Data Structures</div>
                <div class="title-separator">\</div>
                <div>Arrays</div>
                <div class="title-separator">\</div>
                <div>Searching</div>
                <div class="title-separator">\</div>
                <div>Linear Search</div> */}

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
