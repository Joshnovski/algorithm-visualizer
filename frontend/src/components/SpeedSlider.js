import React from 'react';
import ReactSlider from 'react-slider';

const SpeedSlider = () => {
    return (
        <div class=" right-btn speed-slider-container">
            <div>Speed</div>
            <ReactSlider
                className="speed-slider"
                thumbClassName="speed-slider-thumb"
                trackClassName="speed-slider-track"
                min={0}
                max={2}
                defaultValue={1}
                // renderThumb={(props) => <div {...props}></div>}
             />
        </div>
    );
};

export default SpeedSlider;
