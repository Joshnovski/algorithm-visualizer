import React, { useEffect, useRef } from "react";
import { createCanvas } from "algorithmx";
import seedrandom from "seedrandom";
import * as jsnx from "jsnetworkx";

const DiagramPane = () => {
  const diagramRef = useRef(null); // Step 1: Create a ref for the diagram container

  useEffect(() => {
    if (diagramRef.current) {
      // Step 2: Ensure the div is mounted
      const canvas = createCanvas(diagramRef.current); // Use the ref as the selector

      // CODE FROM THE ALGORITHM MODEL
      // Depth First Search

      // Generate a random graph
      seedrandom("2", { global: true });
      const G = jsnx.fastGnpRandomGraph(7, 0.6);
      for (let n of G) G.node[n] = { seen: false };

      // Render graph
      canvas.nodes(G.nodes()).add().label().remove();
      canvas.edges(G.edges()).add();
      canvas.pause(1);

      // Recursive DFS function
      function dfs(n) {
        G.node[n].seen = true;

        canvas.node(n).highlight().size("1.25x");
        canvas.node(n).color("blue");
        canvas.pause(0.5);

        for (let n2 of G.neighbors(n)) {
          if (G.node[n2].seen) continue;

          canvas.edge([n, n2]).traverse("red").pause(0.5);
          dfs(n2); // DFS on neighbor
          canvas.edge([n2, n]).traverse("blue").pause(0.5);
          canvas.node(n).highlight().size("1.25x").pause(0.5);
        }
      }

      dfs(0);

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
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <div ref={diagramRef} className="diagram-pane">
      {" "}
      {/* Step 3: Assign the ref to your div */}
    </div>
  );
};

export default DiagramPane;
