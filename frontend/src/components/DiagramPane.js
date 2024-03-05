import React, { useEffect, useRef } from "react";
import { createCanvas } from "algorithmx";
import seedrandom from "seedrandom";
import * as jsnx from "jsnetworkx";

const DiagramPane = ({ algorithmCode, isPlaying, speedValue }) => {
  console.log(speedValue);
  const diagramRef = useRef(null);
  const canvasRef = useRef(null);

  const player = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!isPlaying) {
      canvas.withQ().queue('q1').stop()
      isPlaying = true;
      console.log("Paused")
    } else {
      canvas.withQ().queue('q1').start()
      isPlaying = false;
      console.log("Resumed")
    }
  };

  const initializeDiagram = () => {
 
    if (diagramRef.current) {
      // Clear existing content
      diagramRef.current.innerHTML = "";
      const canvas = createCanvas(diagramRef.current); // Use the ref as the selector
      canvasRef.current = canvas;
      canvas.withQ().queue('q1').stop()
      // ALGORITHM CODE
      try {
        const executeCode = new Function(
          "canvas",
          "jsnx",
          "seedrandom",
          "console",
          "isPlaying",
          "speedValue",
          algorithmCode
        );
        executeCode(canvas, jsnx, seedrandom, console, isPlaying, speedValue);
      } catch (e) {
        console.error("Error executing algorithm code:", e);
      }

      // Ensure the SVG fills the container
      const svg = diagramRef.current.querySelector("svg");
      if (svg) {
        const bbox = svg.getBBox(); // Get the bounding box of the SVG content
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;
        const scale = 4; // Change this value to zoom in or out
        const viewBoxWidth = bbox.width * scale;
        const viewBoxHeight = bbox.height * scale;
        const viewBoxX = centerX - viewBoxWidth / 2;
        const viewBoxY = centerY - viewBoxHeight / 2;
        svg.setAttribute(
          "viewBox",
          `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`
        );
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.display = "block";
        svg.style.margin = "auto";
      }
    }
  };

  // Initialize and check state changes for the algorithm code
  useEffect(() => {
    initializeDiagram();
    // player();
    return () => {
      if (diagramRef.current) {
        diagramRef.current.innerHTML = "";
      }
    };
  }, [algorithmCode, speedValue]);

  useEffect(() => {
    player();
  }, [isPlaying]);

  return <div ref={diagramRef} className="diagram-pane"></div>;
};

export default DiagramPane;
