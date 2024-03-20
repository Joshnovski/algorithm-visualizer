// ProgressBar.js
import React, { useState } from 'react';

const ProgressBar = ({ maxValue, externalIncreaseStep}) => {
    const [currentValue, setCurrentValue] = useState(0);

    const internalIncreaseStep = () => {
        setCurrentValue(prev => (prev < maxValue ? prev + 1 : maxValue));
        if (externalIncreaseStep) externalIncreaseStep();
    };

    const progressPercentage = (currentValue / maxValue) * 100;

    return (
        <div class="progress-bar-container">
            <div class="step-btn" onClick={internalIncreaseStep}><i class="fa-solid fa-forward-step icon"></i>{"Step"}</div>
            <div class="progress-bar">
                <div class="progress-bar-active" style={{ width: `${progressPercentage}%` }}></div>
                <div class="progress-bar-value"><span class="progress-bar-current-value">{`${currentValue}`}</span>{`/${maxValue}`}</div>
            </div>
        </div>
    );
};

export default ProgressBar;
