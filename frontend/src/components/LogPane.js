import React, { useEffect, useState, useRef } from "react";
import seedrandom from "seedrandom";
import * as jsnx from "jsnetworkx";

const LogPane = ({ splitPaneDragged }) => {
  const [messages, setMessages] = useState([]);
  const logPaneRef = useRef(null);

  // Functions to add messages
  const addInstantMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };
  const addDelayedMessage = (newMessage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        resolve();
      }, 2000); // Delay in milliseconds
    });
  };

  useEffect(() => {
    // ALGORITHM LOGGER AND TIMING
    // Generate Random Graph
    seedrandom("2", { global: true }); // Set fixed seed (Later allow user to set seed)
    const G = jsnx.fastGnpRandomGraph(7, 0.6); // Generate G(n, p) graph, n = nodes, p = probability of adding edge
    for (let n of G) {
      G.node[n] = { seen: false }; // Mark each node initially as not visited
    }

    // DFS algorithm with message logging
    const dfs = async (n, parent = null) => {
      // Mark the node as seen.
      G.node[n].seen = true;
      // If this is the start node, log the initial message.
      if (parent === null) {
        addInstantMessage(`Start at node ${n}`);
      } else {
        // Otherwise, log the traversal to this node from its parent.
        await addDelayedMessage(`Traverse edge [${parent}, ${n}]`);
      }

      // Iterate through all neighbors of node n.
      for (let n2 of G.neighbors(n)) {
        if (!G.node[n2].seen) {
          // If the neighbor has not been seen, continue the DFS recursively.
          await dfs(n2, n);
        }
      }

      // After exploring all neighbors of n, if this is not the start node, log the backtracking.
      if (parent !== null) {
        await addDelayedMessage(`Backtracking edge [${n}, ${parent}]`);
      }
    };

    // Start DFS and message logging
    (async () => {
      await dfs(0); // Start the DFS from node 0
      addDelayedMessage("DFS complete!");
    })();
  }, []);

  // Adjust the max-height of the log pane on window resize
  const updateMaxHeight = () => {
    if (logPaneRef.current) {
      const rect = logPaneRef.current.getBoundingClientRect();
      const maxHeight = window.innerHeight - rect.top;
      logPaneRef.current.style.maxHeight = `${maxHeight}px`;
    }
  };

  // Update max height initially and whenever the window is resized or splitPaneDragged changes
  useEffect(() => {
    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);

    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);

  // This effect listens for changes in splitPaneDragged to adjust the max height
  useEffect(() => {
    updateMaxHeight();
  }, [splitPaneDragged]); // React to splitPaneDragged changes

  return (
    <div ref={logPaneRef} className="log-pane">
      {messages.map((message, index) => (
        <div className="log-output" key={index}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default LogPane;
