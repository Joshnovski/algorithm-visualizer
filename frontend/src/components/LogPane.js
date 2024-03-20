import React, { useEffect, useState, useRef } from "react";
import seedrandom from "seedrandom";
import * as jsnx from "jsnetworkx";

const LogPane = ({ splitPaneDragged, logCode, speedValue, isPlaying, triggerBuild, currentStep }) => {
  const [messages, setMessages] = useState([]);
  const [allLogs, setAllLogs] = useState([]);
  const logPaneRef = useRef(null);
  const messageIndexRef = useRef(0);
  const intervalIdRef = useRef(null);

  const outputMessage = () => {
    if (messageIndexRef.current < allLogs.length) {
      setMessages((msgs) => [...msgs, allLogs[messageIndexRef.current]]);
      messageIndexRef.current += 1;
    } else {
      clearInterval(intervalIdRef.current);
    }
  };
  const logPlayer = () => {
    clearInterval(intervalIdRef.current); // Clear any existing interval

    if (isPlaying && allLogs.length > 0) {
      // Output the first message instantly
      outputMessage();

      // Continue with the rest of the messages at the interval specified by speedValue
      intervalIdRef.current = setInterval(() => {
        outputMessage();
      }, speedValue * 1000);
    }
  };

  // FUNCTION TO EXECUTE THE ALGORITHM CODE
  const initializeLogger = () => {
    try {
      const args = ["console", "seedrandom", "jsnx"];
      const executeCode = new Function(...args, logCode);
      const returnLogs = executeCode(console, seedrandom, jsnx);
      setAllLogs(returnLogs);

      setMessages([]); // Clear the log
      messageIndexRef.current = 0; // Reset the message index
    } catch (e) {
      console.error("Error executing algorithm code:", e);
    }
  };

  // Adjust the max-height of the log pane on window resize
  const updateMaxHeight = () => {
    if (logPaneRef.current) {
      const rect = logPaneRef.current.getBoundingClientRect();
      const maxHeight = window.innerHeight - rect.top;
      logPaneRef.current.style.maxHeight = `${maxHeight}px`;
    }
  };

  // USE EFFECT HOOKS
  useEffect(() => {
    initializeLogger();
  }, [logCode, triggerBuild]);

  useEffect(() => {
    logPlayer();
    return () => clearInterval(intervalIdRef.current); 
  }, [isPlaying, speedValue, allLogs]);

  useEffect(() => {
    outputMessage();
  }, [currentStep]);

  useEffect(() => {
    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);
    return () => window.removeEventListener("resize", updateMaxHeight); // Cleanup when the component is unmounted
  }, []);

  useEffect(() => {
    updateMaxHeight();
  }, [splitPaneDragged]);

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
