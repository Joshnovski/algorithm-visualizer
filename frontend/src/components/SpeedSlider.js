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
                max={10}
                defaultValue={5}
                // renderThumb={(props) => <div {...props}></div>}
             />
        </div>
    );
};

export default SpeedSlider;
