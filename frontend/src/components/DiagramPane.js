import React, { useEffect, useRef } from "react";
import { createCanvas } from "algorithmx";
import seedrandom from "seedrandom";
import * as jsnx from "jsnetworkx";

const DiagramPane = ({ algorithmCode, isPlaying }) => {
  const diagramRef = useRef(null);

//////////////////////////////////
  useEffect(() => {
    let intervalId;
    if (!isPlaying) {
      intervalId = setInterval(() => {
        // Action to perform when isPlaying is true
        console.log('Not Playing');
      }, 100); // Adjust interval time as needed
    } else {
      console.log('Playing');
    }
    return () => clearInterval(intervalId);
  }, [isPlaying]);
//////////////////////////////////

  const initializeDiagram = () => {
    if (algorithmCode) {
      console.log("isPlaying:", isPlaying);
    } else {
      console.log("isPlaying:", isPlaying);
    }

    if (diagramRef.current) {
      // Clear existing content
      diagramRef.current.innerHTML = "";
      const canvas = createCanvas(diagramRef.current); // Use the ref as the selector

      // ALGORITHM CODE
      try {
        const executeCode = new Function(
          "canvas",
          "jsnx",
          "seedrandom",
          "console",
          "isPlaying",
          algorithmCode
        );
        executeCode(canvas, jsnx, seedrandom, console, isPlaying);
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
    return () => {
      if (diagramRef.current) {
        // Clear the diagram if isPlaying becomes false or before re-rendering
        diagramRef.current.innerHTML = "";
      }
    };
  }, [algorithmCode]);

  return <div ref={diagramRef} className="diagram-pane"></div>;
};

export default DiagramPane;
