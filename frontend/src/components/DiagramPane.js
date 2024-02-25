import React, { useEffect, useRef } from "react";
import { createCanvas } from "algorithmx";
import seedrandom from "seedrandom";
import * as jsnx from "jsnetworkx";

const DiagramPane = () => {
  const diagramRef = useRef(null);

  useEffect(() => {
    if (diagramRef.current) {
      // Step 2: Ensure the div is mounted
      const canvas = createCanvas(diagramRef.current); // Use the ref as the selector

      // ALGORITHM CODE

      // Generate Random Graph
      seedrandom("2", { global: true }); // Set fixed seed (Later allow user to set seed)
      const G = jsnx.fastGnpRandomGraph(7, 0.6); // Generate G(n, p) graph, n = nodes, p = probability of adding edge
      for (let n of G) {
        G.node[n] = { seen: false }; // Mark each node initially as not visited
      }
      
      // Render graph
      canvas.nodes(G.nodes()).add();
      canvas.edges(G.edges()).add();

      // Recursive DFS function
      function dfs(n) {
        G.node[n].seen = true;
        canvas.node(n).highlight().size("1.5x"); // Node identify as visited
        canvas.node(n).color("#ba0d5b"); // Node color
        canvas.pause(2);

        for (let n2 of G.neighbors(n)) {
          if (G.node[n2].seen) continue;
          canvas.edge([n, n2]).traverse("blue");
          dfs(n2); // DFS on neighbor
          canvas.edge([n2, n]).traverse("#ba0d5b");
          canvas.node(n).highlight().size("1.5x");
          canvas.pause(2);
        }
      }
      dfs(0); // Start DFS from node 0
      // Immediately after DFS, highlight all seen nodes
      for (let n of G) {
        if (G.node[n].seen) {
          canvas.node(n).highlight().size("1.5x");
        }
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
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <div ref={diagramRef} className="diagram-pane">
      {" "}
      {/* Step 3: Assign the ref to your div */}
    </div>
  );
};

export default DiagramPane;
