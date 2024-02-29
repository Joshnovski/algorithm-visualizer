import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import SplitPane from 'react-split-pane';
import Topbar from './Topbar';
import DiagramPane from './DiagramPane';
import CodePane from './CodePane';
import ListPane from './ListPane';
import LogPane from './LogPane';

export default function App() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [storedCode, setStoredCode] = useState('');
    const [algorithmCode, setAlgorithmCode] = useState('');
    const [splitPaneDragged, setSplitPaneDragged] = useState(false);
    const [currentPath, setCurrentPath] = useState([]);
    const [listPaneWidth, setListPaneWidth] = useState(window.innerWidth < 630 ? '0%' : '20%');
    const [codePaneWidth, setCodePaneWidth] = useState(window.innerWidth < 500 ? '0%' : '50%');

    // Update the algorithm code for digram and log panes
    const storeCodeAndCodeChange = (code) => {
        setStoredCode(code);
    };
    //
    const handleCodeChange = () => {
        setAlgorithmCode(storedCode);
    };
    // Update state when the split pane is dragged
    const handleDragFinished = () => {
        setSplitPaneDragged((prev) => !prev); 
    };
    // Update the current path when a dropdown item is clicked
    const handleDropdownClick = (path) => {
        setCurrentPath(path);
    };

    // Toggle play/pause
    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };
    // Toggle the list pane and code pane
    const toggleListPane = () => {
        if (codePaneWidth === '100%') {
            setCodePaneWidth('0%');
        }
        setListPaneWidth(listPaneWidth === '0%' ? '100%' : '0%');

    };
    const toggleCodePane = () => {
        if (listPaneWidth === '100%') {
            setListPaneWidth('0%');
            setCodePaneWidth('100%');
        } else {
            setCodePaneWidth(codePaneWidth === '0%' ? '100%' : '0%');
        }
    };

    // Set the width of the list pane and code pane
    useEffect(() => {
        const handleResize = () => {
            setListPaneWidth(window.innerWidth < 690 ? '0%' : '20%');
            setCodePaneWidth(window.innerWidth < 500 ? '0%' : '50%');
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Render the app
    return (
        <div>
            <Topbar currentPath={currentPath} toggleListPane={toggleListPane} toggleCodePane={toggleCodePane} buildCode={handleCodeChange} togglePlayPause={togglePlayPause} />
            <SplitPane split="vertical" minSize={0} size={listPaneWidth} defaultSize={listPaneWidth} class="split-pane" style={{ height: 'calc(100vh - 65px)' }}>
                <ListPane onItemSelect={handleDropdownClick} currentPath={currentPath} />
                <div style={{display: 'flex', height: '100%'}}>
                    <SplitPane split="vertical" minSize={0} size={codePaneWidth}  defaultSize={codePaneWidth} primary="second">
                        <SplitPane split="horizontal" minSize={0} defaultSize="50%" onDragFinished={handleDragFinished}>
                            <DiagramPane algorithmCode={algorithmCode} isPlaying={isPlaying}/>
                            <LogPane splitPaneDragged={splitPaneDragged}/>
                        </SplitPane>
                        <CodePane codeAndCodeChange={storeCodeAndCodeChange}/>
                    </SplitPane>
                </div>
            </SplitPane>
        </div>
    );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);