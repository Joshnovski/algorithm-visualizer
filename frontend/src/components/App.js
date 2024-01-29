import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import SplitPane from 'react-split-pane';
import Topbar from './Topbar';
import DiagramPane from './DiagramPane';
import CodePane from './CodePane';
import ListPane from './ListPane';
import TerminalPane from './TerminalPane';

export default function App() {

        const [currentPath, setCurrentPath] = useState([]); // State to hold the current path
        const handleDropdownClick = (path) => { // Function to update the path
            setCurrentPath(path);
        };

        // Calculats middle position of window to set maxSize of verticle panes
        const [halfWindowWidth, getHalfWindowWidth] = useState(window.innerWidth / 2);
        useEffect(() => {
            const handleResize = () => {
                getHalfWindowWidth(window.innerWidth / 2); // Update on resize
            };
    
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        // Render
        return (
            <div>
                <Topbar currentPath={currentPath}/>
                <SplitPane split="vertical" minSize={0} maxSize={halfWindowWidth} defaultSize="20%" style={{ height: 'calc(100vh - 35px)' }}>
                    <ListPane onItemSelect={handleDropdownClick} currentPath={currentPath} />
                    <div style={{display: 'flex', height: '100%'}}>
                        <SplitPane split="vertical" minSize={0} maxSize={halfWindowWidth} defaultSize="50%" primary="second">
                            <SplitPane split="horizontal" minSize={0} defaultSize="50%">
                                <DiagramPane />
                                <TerminalPane />
                            </SplitPane>
                            <CodePane />
                        </SplitPane>
                    </div>
                </SplitPane>
            </div>
        );
    }

const appDiv = document.getElementById("app");
render(<App />, appDiv);