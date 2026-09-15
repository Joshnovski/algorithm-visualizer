import React, { useEffect, useRef } from "react";
import { createCanvas } from "algorithmx";
import seedrandom from "seedrandom";
import * as jsnx from "jsnetworkx";

// Name of the algorithmx event queue that algorithm code animates on. The queue is kept
// stopped, and every step() call adds a pause; advancing one step means "run the queue until
// the next pause, then stop again".
export const STEP_QUEUE = "q1";

const DiagramPane = ({ code, buildId, currentStep, onBuilt }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const appliedStepRef = useRef(0);

  const advanceQueue = (times) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    for (let i = 0; i < times; i++) {
      canvas.queue(STEP_QUEUE).start();
      canvas.queue(STEP_QUEUE).stop();
    }
  };

  const fitSvgToPane = () => {
    const svg = containerRef.current && containerRef.current.querySelector("svg");
    if (!svg) return;
    // canvas.size([w, h]) in the algorithm code sets the SVG's width/height attributes. Use
    // them as the viewBox so the whole logical canvas scales to fit the pane.
    const width = parseFloat(svg.getAttribute("width")) || 100;
    const height = parseFloat(svg.getAttribute("height")) || 100;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.display = "block";
  };

  const buildDiagram = () => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    canvasRef.current = null;
    appliedStepRef.current = 0;

    if (!code || code.trim() === "") {
      onBuilt({ steps: 0, logs: [] });
      return;
    }

    const canvas = createCanvas(container);
    canvasRef.current = canvas;
    canvas.queue(STEP_QUEUE).stop();

    const logs = [];
    const step = (message) => {
      logs.push(message === undefined ? `Step ${logs.length + 1}` : String(message));
      // The pause length is irrelevant: the queue is stopped at every pause and resumed by
      // the Step button or the play timer. It just has to be > 0 to act as a boundary.
      canvas.withQ(STEP_QUEUE).pause(1);
    };

    try {
      const run = new Function("canvas", "jsnx", "seedrandom", "console", "step", code);
      run(canvas, jsnx, seedrandom, console, step);
      onBuilt({ steps: logs.length, logs });
    } catch (e) {
      console.error("Error executing algorithm code:", e);
      onBuilt({ steps: 0, logs: [], error: `${e.name}: ${e.message}` });
    }

    fitSvgToPane();
  };

  // Rebuild whenever a build is requested
  useEffect(() => {
    buildDiagram();
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
      canvasRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildId]);

  // Advance the animation to match the shared step counter
  useEffect(() => {
    if (currentStep > appliedStepRef.current) {
      advanceQueue(currentStep - appliedStepRef.current);
      appliedStepRef.current = currentStep;
    }
  }, [currentStep]);

  return <div ref={containerRef} className="diagram-pane"></div>;
};

export default DiagramPane;
