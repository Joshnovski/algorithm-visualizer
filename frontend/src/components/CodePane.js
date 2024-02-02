import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/ext-language_tools";

const CodePane = ({selectedAlgorithm}) => {

    // Set initial code state to be something when
    // no algorithm is selected,. Then exchange this
    // with the selected algorithm's code on click of 
    // button from list component.
    const [code, setCode] = useState(``)

    // useEffect(() => {
    //     // Fetch the initial code for the selected algorithm
    //     // and set it as the initial state.
    //     // This could be a call to your server or a local file read.
    //     fetchAlgorithmCode(selectedAlgorithm)
    //     .then(initialCode => {
    //         setCode(initialCode);
    //     });
    // }, [selectedAlgorithm]);

    function updateCode(newValue) {
        setCode(newValue);
        // console.log(newValue);
    }

    function runCode(){
        // Send the current code to backend for execution
        // Handle the response   
    }

    return (
        <div class="code-pane">
            <AceEditor 
            mode="python" 
            theme="tomorrow_night_eighties"
            value={code}
            onChange={updateCode}
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
