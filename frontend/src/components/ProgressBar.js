// ProgressBar.js
import React, { useState } from 'react';

const ProgressBar = ({ maxValue }) => {
    const [currentValue, setCurrentValue] = useState(1);

    const increaseStep = () => {
        setCurrentValue(prev => (prev < maxValue ? prev + 1 : maxValue));
    };

    const decreaseStep = () => {
        setCurrentValue(prev => (prev > 1 ? prev - 1 : 1));
    };

    const progressPercentage = (currentValue / maxValue) * 100;

    return (
        <div class="progress-bar-container">
            <div class="step-btn" onClick={decreaseStep}>{"<"}</div>
            <div class="progress-bar">
                <div class="progress-bar-active" style={{ width: `${progressPercentage}%` }}></div>
                <div class="progress-bar-value"><span class="progress-bar-current-value">{`${currentValue}`}</span>{`/${maxValue}`}</div>
            </div>
            <div class="step-btn" onClick={increaseStep}>{">"}</div>
        </div>
    );
};

export default ProgressBar;
