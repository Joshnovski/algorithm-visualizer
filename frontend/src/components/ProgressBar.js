// ProgressBar.js
import React, { useState, useEffect } from 'react';

const ProgressBar = ({ maxValue, externalIncreaseStep, currentStep}) => {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        if (currentStep === 0) {
            setCurrentValue(0);
        }
    }, [currentStep]);

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
