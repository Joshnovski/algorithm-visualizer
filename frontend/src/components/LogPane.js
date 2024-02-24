import React, { useEffect, useState, useRef } from "react";
import seedrandom from "seedrandom";
import * as jsnx from "jsnetworkx";

const LogPane = ({ splitPaneDragged }) => {
  const [messages, setMessages] = useState([]);
  const logPaneRef = useRef(null);

  // Function to add a new message with a delay
  const addMessage = (newMessage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        resolve();
      }, 3500); // Adjust delay as needed
    });
  };

  useEffect(() => {
    // Initialize random seed and graph
    seedrandom("2", { global: true });
    const G = jsnx.fastGnpRandomGraph(7, 0.6);
    for (let n of G.nodes()) G.node.get(n).seen = false;

    // DFS algorithm with message logging
    const dfs = async (n) => {
      G.node.get(n).seen = true;
      await addMessage(`Traverse edge A[${n}]`);

      for (let n2 of G.neighbors(n)) {
        if (G.node.get(n2).seen) continue;
        await addMessage(`Traverse edge B[${n}, ${n2}]`);
        dfs(n2); // DFS on neighbor
        await addMessage(`Traverse edge C[${n}, ${n2}]`);
      }
    };

    // Start DFS and message logging
    (async () => {
      await addMessage("Start at node 0");
      await dfs(0);
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
        <div className="log-output" key={index}>{message}</div>
      ))}
    </div>
  );
};

export default LogPane;
