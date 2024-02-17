import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";


const CodePane = () => {

    const [code, setCode] = useState(``)

    // Fetch function to the algorithm model
    useEffect(() => {
        // Assuming '/algorithms/' is the correct endpoint to fetch your algorithms
        fetch('/api/algorithms/')
            .then(response => response.json())
            .then(data => {
                // Handle the fetched data
                setCode(data[1].code);
                console.log("Fetched data: ", data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []); 

    function onChange(newValue) {
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
            style={{ width: '100%', height: '100%' }} 
            />
        </div>
    );
};

export default CodePane;
