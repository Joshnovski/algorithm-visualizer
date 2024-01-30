import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import SplitPane from 'react-split-pane';
import Topbar from './Topbar';
import DiagramPane from './DiagramPane';
import CodePane from './CodePane';
import ListPane from './ListPane';
import TerminalPane from './TerminalPane';

export default function App() {

        const [currentPath, setCurrentPath] = useState([]);
        const [listPaneWidth, setListPaneWidth] = useState(window.innerWidth < 630 ? '0%' : '20%');
        const [codePaneWidth, setCodePaneWidth] = useState(window.innerWidth < 500 ? '0%' : '50%');

        const handleDropdownClick = (path) => {
            setCurrentPath(path);
        };

        useEffect(() => {
            const handleResize = () => {
                setListPaneWidth(window.innerWidth < 690 ? '0%' : '20%');
                setCodePaneWidth(window.innerWidth < 500 ? '0%' : '50%');
            };
    
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);


        // Render
        return (
            <div>
                <Topbar currentPath={currentPath}/>
                <SplitPane split="vertical" minSize={0} defaultSize={listPaneWidth} class="split-pane" style={{ height: 'calc(100vh - 65px)' }}>
                    <ListPane onItemSelect={handleDropdownClick} currentPath={currentPath} />
                    <div style={{display: 'flex', height: '100%'}}>
                        <SplitPane split="vertical" minSize={0} defaultSize={codePaneWidth} primary="second">
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