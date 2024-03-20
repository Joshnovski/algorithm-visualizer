import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import SplitPane from "react-split-pane";
import Topbar from "./Topbar";
import DiagramPane from "./DiagramPane";
import CodePane from "./CodePane";
import ListPane from "./ListPane";
import LogPane from "./LogPane";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speedValue, setSpeedValue] = useState("");
  const [totalSteps, setTotalSteps] = useState("");
  const [diagramStoredCode, setDiagramStoredCode] = useState("");
  const [logsStoredCode, setLogsStoredCode] = useState("");
  const [algorithmCode, setAlgorithmCode] = useState("");
  const [triggerBuild, setTriggerBuild] = useState(false);
  const [logCode, setLogCode] = useState("");
  const [splitPaneDragged, setSplitPaneDragged] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [listPaneWidth, setListPaneWidth] = useState(
    window.innerWidth < 630 ? "0%" : "20%"
  );
  const [codePaneWidth, setCodePaneWidth] = useState(
    window.innerWidth < 500 ? "0%" : "50%"
  );

  // Handle Total steps
  const handleTotalSteps = (steps) => {
    setTotalSteps(steps);
  };
  // Increase the step value
  const handleStepIncrease = () => {
    setCurrentStep(currentStep+1);
  };
  // Update the speed value
  const handleSpeedValueChange = (value) => {
    setSpeedValue(value);
  };
  // Update the algorithm code for digram pane
  const diagramCodeAndChanges = (code) => {
    setDiagramStoredCode(code);
  };
  // Update the algorithm code for log pane
  const logsCodeAndChanges = (code) => {
    setLogsStoredCode(code);
  };
  //
  const handleCodeChange = () => {
    setAlgorithmCode(diagramStoredCode);
    setLogCode(logsStoredCode);
    setTriggerBuild((prev) => !prev);
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
    if (codePaneWidth === "100%") {
      setCodePaneWidth("0%");
    }
    setListPaneWidth(listPaneWidth === "0%" ? "100%" : "0%");
  };
  const toggleCodePane = () => {
    if (listPaneWidth === "100%") {
      setListPaneWidth("0%");
      setCodePaneWidth("100%");
    } else {
      setCodePaneWidth(codePaneWidth === "0%" ? "100%" : "0%");
    }
  };

  // Set the width of the list pane and code pane
  useEffect(() => {
    const handleResize = () => {
      setListPaneWidth(window.innerWidth < 690 ? "0%" : "20%");
      setCodePaneWidth(window.innerWidth < 500 ? "0%" : "50%");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render the app
  return (
    <div>
      <Topbar
        currentPath={currentPath}
        toggleListPane={toggleListPane}
        toggleCodePane={toggleCodePane}
        buildCode={handleCodeChange}
        togglePlayPause={togglePlayPause}
        speedValueChange={handleSpeedValueChange}
        externalIncreaseStep={handleStepIncrease}
        totalSteps={totalSteps}
      />
      <SplitPane
        split="vertical"
        minSize={0}
        size={listPaneWidth}
        defaultSize={listPaneWidth}
        class="split-pane"
        style={{ height: "calc(100vh - 65px)" }}
      >
        <ListPane
          onItemSelect={handleDropdownClick}
          currentPath={currentPath}
        />
        <div style={{ display: "flex", height: "100%" }}>
          <SplitPane
            split="vertical"
            minSize={0}
            size={codePaneWidth}
            defaultSize={codePaneWidth}
            primary="second"
          >
            <SplitPane
              split="horizontal"
              minSize={0}
              defaultSize="50%"
              onDragFinished={handleDragFinished}
            >
              <DiagramPane
                algorithmCode={algorithmCode}
                isPlaying={isPlaying}
                speedValue={speedValue}
                totalSteps={handleTotalSteps}
                triggerBuild={triggerBuild}
                currentStep={currentStep}
              />
              <LogPane
                splitPaneDragged={splitPaneDragged}
                logCode={logCode}
                speedValue={speedValue}
                isPlaying={isPlaying}
                triggerBuild={triggerBuild}
              />
            </SplitPane>
            <CodePane
              diagramCodeAndChanges={diagramCodeAndChanges}
              logsCodeAndChanges={logsCodeAndChanges}
            />
          </SplitPane>
        </div>
      </SplitPane>
    </div>
  );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);