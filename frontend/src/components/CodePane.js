import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";

const CodePane = ({ logsCodeAndChanges, diagramCodeAndChanges }) => {
  const [code, setCode] = useState(``);
  const [allCode, setAllCode] = useState("");

  // Fetch function to the algorithm model
  useEffect(() => {
    fetch("/api/algorithms/")
      .then((response) => response.json())
      .then((data) => {

        const fetchedAllCode  = data[0].code;
        setAllCode(fetchedAllCode);

        const visualizationCodeOnly = fetchedAllCode.split("// TIMING and INITIALIZATION")[0].trim();
        const dataStructureCodeOnly = fetchedAllCode.split('// GENERATE DATA STRUCTURE')[1].split('// RENDER DIAGRAM')[0].trim();
        const diagramCodeOnly = visualizationCodeOnly + fetchedAllCode.split('// TIMING and INITIALIZATION')[1].split('// RENDER LOGS')[0];
        const logsCodeOnly = dataStructureCodeOnly + fetchedAllCode.split('// RENDER LOGS')[1];

        setCode(visualizationCodeOnly);
        logsCodeAndChanges(logsCodeOnly);
        diagramCodeAndChanges(diagramCodeOnly);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  
  function onChange(newValue) {
    setCode(newValue);
    const dataStructureCodeOnly = newValue.split('// GENERATE DATA STRUCTURE')[1].split('// RENDER DIAGRAM')[0].trim();
    const diagramCodeOnly = newValue + allCode.split('// TIMING and INITIALIZATION')[1].split('// RENDER LOGS')[0];
    const logsCodeOnly = dataStructureCodeOnly + allCode.split('// RENDER LOGS')[1];
    logsCodeAndChanges(logsCodeOnly);
    diagramCodeAndChanges(diagramCodeOnly);
  }

  return (
    <div class="code-pane">
      <AceEditor
        mode="javascript"
        theme="tomorrow_night_eighties"
        value={code}
        onChange={onChange}
        setOptions={{
          enableSnippets: false,
          showLineNumbers: true,
          useWorker: false,
          tabSize: 2,
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default CodePane;
