import React, { useState, useMemo } from "react";
import AceEditor from "react-ace";
import { marked } from "marked";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";

// Right-hand pane with two tabs: the editable algorithm code, and its markdown description.
// Edits are kept in App and only take effect on Build.
const CodePane = ({ code, onChange, description }) => {
  const [tab, setTab] = useState("code");

  const descriptionHtml = useMemo(() => {
    if (!description) return "";
    return marked.parse(description, { gfm: true, breaks: false });
  }, [description]);

  const tabClass = (name) => `pane-tab ${tab === name ? "pane-tab-active" : ""}`;

  return (
    <div className="code-pane">
      <div className="pane-tabs">
        <div className={tabClass("code")} onClick={() => setTab("code")}>
          <i className="fa-solid fa-code icon"></i>Code
        </div>
        <div className={tabClass("description")} onClick={() => setTab("description")}>
          <i className="fa-solid fa-book-open icon"></i>Description
        </div>
      </div>
      <div className="pane-body">
        {tab === "code" ? (
          <AceEditor
            mode="javascript"
            theme="tomorrow_night_eighties"
            value={code}
            onChange={onChange}
            name="algorithm-code-editor"
            setOptions={{
              enableSnippets: false,
              showLineNumbers: true,
              useWorker: false,
              tabSize: 2,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : descriptionHtml ? (
          <div className="description-pane" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        ) : (
          <div className="description-pane description-empty">
            Choose an algorithm from the list to read about it.
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePane;
