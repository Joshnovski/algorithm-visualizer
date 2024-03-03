import React, { useEffect, useState, useRef } from "react";
import seedrandom from "seedrandom";
import * as jsnx from "jsnetworkx";

const LogPane = ({ splitPaneDragged, logCode }) => {
  console.log(logCode);
  const [messages, setMessages] = useState([]);
  const logPaneRef = useRef(null);

  const addInstantMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const addDelayedMessage = (newMessage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        resolve();
      }, 1800); // Delay in milliseconds
    });
  };

  const initializeLogger = () => {
    setMessages([]); // Clear the log

    try {
      // Define arguments for the new function
      const args = ['addInstantMessage', 'addDelayedMessage', 'setMessages', 'console', 'seedrandom', 'jsnx'];
      const executeCode = new Function(...args, logCode);
      executeCode(addInstantMessage, addDelayedMessage, setMessages, console, seedrandom, jsnx);
    } catch (e) {
      console.error("Error executing algorithm code:", e);
    }
  };

  // Adjust the max-height of the log pane on window resize
  const updateMaxHeight = () => {
    if (logPaneRef.current) {
      const rect = logPaneRef.current.getBoundingClientRect(); // Get the size of the log pane
      const maxHeight = window.innerHeight - rect.top; // rect.top is the distance from the top of the window to the top of the log pane
      logPaneRef.current.style.maxHeight = `${maxHeight}px`;
    }
  };

  useEffect(() => {
    initializeLogger();
  }, [logCode]);

  // Update max height initially and whenever the window is resized
  useEffect(() => {
    updateMaxHeight(); 
    window.addEventListener("resize", updateMaxHeight); 
    return () => window.removeEventListener("resize", updateMaxHeight); // Cleanup when the component is unmounted
  }, []);

  // This effect listens for changes in splitPaneDragged to adjust the max height
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
