import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import SplitPane from 'react-split-pane';

export default function App() {

        const [halfWindowWidth, getHalfWindowWidth] = useState(window.innerWidth / 2);
        useEffect(() => {
            const handleResize = () => {
                getHalfWindowWidth(window.innerWidth / 2); // Update on resize
            };
    
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return (
            <SplitPane split="vertical" minSize={0} maxSize={halfWindowWidth} defaultSize="20%">
                <div style={{background: '#3d3d3d', height: '100%'}}></div>
                <div style={{display: 'flex', height: '100%'}}>
                    <SplitPane split="vertical" minSize={0} maxSize={halfWindowWidth} defaultSize="50%" primary="second">
                        <SplitPane split="horizontal" minSize={0} defaultSize="50%">
                            <div style={{background: '#242424', height: '100%', width: '100%'}}></div>
                            <div style={{background: '#171717', height: '100%', width: '100%'}}></div>
                        </SplitPane>
                        <div style={{background: '#2d2d2d', height: '100%'}}></div>
                    </SplitPane>
                </div>
            </SplitPane>
        );
    }

const appDiv = document.getElementById("app");
render(<App />, appDiv);