import React from 'react';
import { render } from 'react-dom';
import SplitPane from 'react-split-pane';

export default function App() {
        return (
            <SplitPane split="vertical" minSize={0} defaultSize={100}>
                <div style={{background: '#3d3d3d', height: '100%'}}></div>
                <SplitPane split="horizontal" minSize={0} defaultSize={100}>
                    <div style={{background: '#242424', height: '100%', width: '100%'}}></div>
                    <div style={{background: '#171717', height: '100%', width: '100%'}}></div>
                </SplitPane>
            </SplitPane>
        );
    }

const appDiv = document.getElementById("app");
render(<App />, appDiv);