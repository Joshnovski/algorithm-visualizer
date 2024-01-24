import React from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/ext-language_tools";

const CodePane = () => {
    return (
        <div class="code-pane">
            <AceEditor 
            mode="python" 
            theme="tomorrow_night_eighties"
            setOptions={{
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                }}
                style={{ width: '100%', height: '100%' }} 
            />
        </div>
    );
};

export default CodePane;
