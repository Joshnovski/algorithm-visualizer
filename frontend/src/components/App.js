import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import SplitPane from "react-split-pane";
import Topbar from "./Topbar";
import DiagramPane from "./DiagramPane";
import CodePane from "./CodePane";
import ListPane from "./ListPane";
import LogPane from "./LogPane";

const DEFAULT_SPEED = 1.8; // Seconds per step while playing

// "Graph" + "Depth-First Search" -> "GraphDepthFirstSearch" (must match the file name in /Algorithms)
export const formatAlgorithmName = (path) =>
  path.map((segment) => segment.replace(/[\s-]+/g, "")).join("");

export default function App() {
  // Algorithm selection and source
  const [currentPath, setCurrentPath] = useState([]);
  const [sourceCode, setSourceCode] = useState(""); // Code as loaded from the API
  const [description, setDescription] = useState(""); // Markdown description from the API
  const [editorCode, setEditorCode] = useState(""); // Code as currently shown in the editor
  const [builtCode, setBuiltCode] = useState(""); // Code the diagram was last built from
  const [buildId, setBuildId] = useState(0); // Increments on every build so panes can reset
  const [loadError, setLoadError] = useState("");

  // Playback state. currentStep is the single source of truth shared by the diagram,
  // the log and the progress bar.
  const [totalSteps, setTotalSteps] = useState(0);
  const [logs, setLogs] = useState([]);
  const [buildError, setBuildError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  // Layout
  const [splitPaneDragged, setSplitPaneDragged] = useState(false);
  const [listPaneWidth, setListPaneWidth] = useState(window.innerWidth < 690 ? "0%" : "20%");
  const [codePaneWidth, setCodePaneWidth] = useState(window.innerWidth < 500 ? "0%" : "50%");

  const algorithmsRef = useRef(null); // Cached API response

  // ---- Building ----------------------------------------------------------------------------

  const build = useCallback((code) => {
    setIsPlaying(false);
    setCurrentStep(0);
    setBuiltCode(code);
    setBuildId((id) => id + 1);
  }, []);

  const handleBuildClick = () => build(editorCode);

  const handleBuilt = useCallback(({ steps, logs: builtLogs, error }) => {
    setTotalSteps(steps);
    setLogs(builtLogs);
    setBuildError(error || "");
  }, []);

  // ---- Loading an algorithm when the user picks one from the list ----------------------------

  useEffect(() => {
    if (currentPath.length === 0) return;
    const name = formatAlgorithmName(currentPath);
    let cancelled = false;

    const fetchAll = algorithmsRef.current
      ? Promise.resolve(algorithmsRef.current)
      : fetch("/api/algorithms/")
          .then((response) => {
            if (!response.ok) throw new Error(`API responded with ${response.status}`);
            return response.json();
          })
          .then((data) => {
            algorithmsRef.current = data;
            return data;
          });

    fetchAll
      .then((data) => {
        if (cancelled) return;
        const algorithm = data.find((a) => a.name === name);
        if (!algorithm) {
          setLoadError(
            `No algorithm named "${name}" in the database. ` +
              `Add Algorithms/**/${name}.js and run "python manage.py import_algorithm".`
          );
          setSourceCode("");
          setEditorCode("");
          setDescription("");
          build("");
          return;
        }
        setLoadError("");
        setSourceCode(algorithm.code);
        setEditorCode(algorithm.code);
        setDescription(algorithm.description || "");
        build(algorithm.code);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Error fetching algorithms:", error);
        setLoadError(`Could not load algorithms: ${error.message}`);
      });

    return () => {
      cancelled = true;
    };
  }, [currentPath, build]);

  // ---- Playback ----------------------------------------------------------------------------

  const advanceStep = useCallback(() => {
    setCurrentStep((step) => Math.min(step + 1, totalSteps));
  }, [totalSteps]);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const id = setInterval(advanceStep, speed * 1000);
    return () => clearInterval(id);
  }, [isPlaying, speed, advanceStep]);

  // Stop automatically at the end
  useEffect(() => {
    if (isPlaying && currentStep >= totalSteps) setIsPlaying(false);
  }, [isPlaying, currentStep, totalSteps]);

  const togglePlayPause = () => {
    if (totalSteps === 0) return;
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (currentStep >= totalSteps) {
      build(builtCode); // Replay from the start
    } else {
      advanceStep(); // Respond immediately instead of waiting a full interval
    }
    setIsPlaying(true);
  };

  const handleStepClick = () => {
    if (!isPlaying) advanceStep();
  };

  // ---- Layout ------------------------------------------------------------------------------

  const handleDragFinished = () => setSplitPaneDragged((prev) => !prev);

  const toggleListPane = () => {
    if (codePaneWidth === "100%") setCodePaneWidth("0%");
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

  useEffect(() => {
    const handleResize = () => {
      setListPaneWidth(window.innerWidth < 690 ? "0%" : "20%");
      setCodePaneWidth(window.innerWidth < 500 ? "0%" : "50%");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemSelect = (path) => {
    setCurrentPath(path);
    // On narrow screens the list covers everything, so close it once a choice is made
    if (listPaneWidth === "100%") setListPaneWidth("0%");
  };

  return (
    <div>
      <Topbar
        currentPath={currentPath}
        toggleListPane={toggleListPane}
        toggleCodePane={toggleCodePane}
        onBuild={handleBuildClick}
        onPlayPause={togglePlayPause}
        onStep={handleStepClick}
        onSpeedChange={setSpeed}
        speed={speed}
        totalSteps={totalSteps}
        currentStep={currentStep}
        isPlaying={isPlaying}
        canEdit={editorCode !== sourceCode}
      />
      <SplitPane
        split="vertical"
        minSize={0}
        size={listPaneWidth}
        defaultSize={listPaneWidth}
        style={{ height: "calc(100vh - 65px)" }}
      >
        <ListPane onItemSelect={handleItemSelect} currentPath={currentPath} />
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
                code={builtCode}
                buildId={buildId}
                currentStep={currentStep}
                onBuilt={handleBuilt}
              />
              <LogPane
                logs={logs}
                currentStep={currentStep}
                error={buildError || loadError}
                splitPaneDragged={splitPaneDragged}
                hasAlgorithm={currentPath.length > 0}
              />
            </SplitPane>
            <CodePane code={editorCode} onChange={setEditorCode} description={description} />
          </SplitPane>
        </div>
      </SplitPane>
    </div>
  );
}

const appDiv = document.getElementById("app");
createRoot(appDiv).render(<App />);
