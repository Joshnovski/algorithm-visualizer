import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import SplitPane from 'react-split-pane';
import Topbar from './Topbar';
import DiagramPane from './DiagramPane';
import CodePane from './CodePane';
import ListPane from './ListPane';
import LogPane from './LogPane';

export default function App() {

        const [currentPath, setCurrentPath] = useState([]);
        const [listPaneWidth, setListPaneWidth] = useState(window.innerWidth < 630 ? '0%' : '20%');
        const [codePaneWidth, setCodePaneWidth] = useState(window.innerWidth < 500 ? '0%' : '50%');

        const handleDropdownClick = (path) => {
            setCurrentPath(path);
        };

        const toggleListPane = () => {
            // setCodePaneWidth(codePaneWidth === '100%' ? '0%' : '0%');
            // setCodePaneWidth(codePaneWidth === '50%' ? '50%' : '50%');
            if (codePaneWidth === '100%') {
                setCodePaneWidth('0%');
            }
            setListPaneWidth(listPaneWidth === '0%' ? '100%' : '0%');

        };
    
        const toggleCodePane = () => {
            // setListPaneWidth(listPaneWidth === '100%' ? '0%' : '0%');
            // setCodePaneWidth(codePaneWidth === '0%' ? '100%' : '0%');
            if (listPaneWidth === '100%') {
                setListPaneWidth('0%');
                setCodePaneWidth('100%');
            } else {
                setCodePaneWidth(codePaneWidth === '0%' ? '100%' : '0%');
            }
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
                <Topbar currentPath={currentPath} toggleListPane={toggleListPane} toggleCodePane={toggleCodePane} />
                <SplitPane split="vertical" minSize={0} size={listPaneWidth} defaultSize={listPaneWidth} class="split-pane" style={{ height: 'calc(100vh - 65px)' }}>
                    <ListPane onItemSelect={handleDropdownClick} currentPath={currentPath} />
                    <div style={{display: 'flex', height: '100%'}}>
                        <SplitPane split="vertical" minSize={0} size={codePaneWidth}  defaultSize={codePaneWidth} primary="second">
                            <SplitPane split="horizontal" minSize={0} defaultSize="50%">
                                <DiagramPane />
                                <LogPane />
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