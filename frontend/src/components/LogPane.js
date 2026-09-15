import React, { useEffect, useRef } from "react";

const LogPane = ({ logs, currentStep, error, splitPaneDragged, hasAlgorithm }) => {
  const logPaneRef = useRef(null);
  const visibleLogs = logs.slice(0, currentStep);

  // The pane sits inside a resizable split, so cap its height to the space actually available
  const updateMaxHeight = () => {
    if (logPaneRef.current) {
      const rect = logPaneRef.current.getBoundingClientRect();
      logPaneRef.current.style.maxHeight = `${window.innerHeight - rect.top}px`;
    }
  };

  useEffect(() => {
    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);
    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);

  useEffect(() => {
    updateMaxHeight();
  }, [splitPaneDragged]);

  // Keep the newest line in view
  useEffect(() => {
    if (logPaneRef.current) logPaneRef.current.scrollTop = logPaneRef.current.scrollHeight;
  }, [currentStep]);

  return (
    <div ref={logPaneRef} className="log-pane">
      {error && <div className="log-output log-error">{error}</div>}
      {!error && !hasAlgorithm && (
        <div className="log-output log-hint">Choose an algorithm from the list to begin.</div>
      )}
      {!error && hasAlgorithm && logs.length > 0 && currentStep === 0 && (
        <div className="log-output log-hint">
          Press Play or Step to start. {logs.length} steps in total.
        </div>
      )}
      {visibleLogs.map((message, index) => (
        <div className="log-output" key={index}>
          <span className="log-step-number">{index + 1}.</span> {message}
        </div>
      ))}
    </div>
  );
};

export default LogPane;
