import React, { useEffect, useRef } from "react";
import { createCanvas } from "algorithmx";

const DiagramPane = () => {
  const diagramRef = useRef(null); // Step 1: Create a ref for the diagram container

  useEffect(() => {
    if (diagramRef.current) {
      // Step 2: Ensure the div is mounted
      const canvas = createCanvas(diagramRef.current); // Use the ref as the selector

      // CODE FROM THE ALGORITHM MODEL
      canvas.nodes([1, 2, 3, 4, 5, 6, 7]).add()
      canvas.edges([[1, 2], [2, 3], [3, 4], [4, 5],
          [5, 6], [6, 7], [1, 3], [2, 4], [2, 7]]).add()
      
      for (let i = 1; i < 8; i++) {
          canvas.pause(0.5)
          canvas.node(i).color('green').highlight().size('1.25x')
          
          if (i < 7) {
              canvas.pause(0.5)
              canvas.edge([i, i+1]).traverse('green')
          }
      }

      // Ensure the SVG fills the container
      const svg = diagramRef.current.querySelector("svg");
      if (svg) {
        svg.style.width = "100%";
        svg.style.height = "100%";
      }
    }
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <div ref={diagramRef} className="diagram-pane">
      {" "}
      {/* Step 3: Assign the ref to your div */}
    </div>
  );
};

export default DiagramPane;
