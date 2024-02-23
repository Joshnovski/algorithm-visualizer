import React, { useEffect, useRef } from "react";
import { createCanvas } from "algorithmx";
import seedrandom from "seedrandom";
import * as jsnx from "jsnetworkx";

const LogPane = () => {
  const logRef = useRef(null);
  const messagesRef = useRef([]);

  useEffect(() => {
    if (logRef.current) {
      const canvas = createCanvas(logRef.current);

      // ALGORITHM
      const animateText = (label, text) => {
        messagesRef.current.push(text);
        const combinedText = messagesRef.current.join("\n");
        label
          .visible(false)
          .pause(0.5)
          .text(combinedText)
          .visible(true)
          .pause(0.4);
      };

      const titleLabel = canvas.label("title");
      titleLabel.add({ pos: [0, "0.5cy"], text: "" });

      canvas
        .node(".")
        .add({ pos: [0, 0] })
        .size("0x");

      //
      seedrandom("2", { global: true });
      const G = jsnx.fastGnpRandomGraph(7, 0.6);
      for (let n of G) G.node[n] = { seen: false };
      animateText(titleLabel, "Start at node 0");
      canvas.pause(3.5);

      function dfs(n) {
        G.node[n].seen = true;
        animateText(titleLabel, `Traverse edge A[${n}]`);
        canvas.pause(3.5);
        for (let n2 of G.neighbors(n)) {
          if (G.node[n2].seen) continue;
          animateText(titleLabel, `Traverse edge B[${n}, ${n2}]`);
          canvas.edge([n, n2]).pause(1.5);
          dfs(n2); // DFS on neighbor
          animateText(titleLabel, `Traverse edge C[${n}, ${n2}]`);
          canvas.edge([n2, n]).pause(1.5);
          canvas.node(n).pause(3.5);
        }
      }
      dfs(0);

      // SVG SETTINGS
      const svg = logRef.current.querySelector("svg");
      if (svg) {
        const bbox = svg.getBBox(); // Get the bounding box of the SVG content
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;
        const scale = 7; // Change this value to zoom in or out
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
  });

  return (
    <div ref={logRef} className="log-pane">
      {/* Content here */}
    </div>
  );
};

export default LogPane;
