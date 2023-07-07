import { useState } from "react";
import axios from "axios";

const Textarea = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const baseUrl = "http://127.0.0.1:8000/";
    const client = axios.create({
        baseURL: baseUrl,
    });

    const summarize = () => {
        client.post("/textsum/");
    };

    return (
        <>
            <div className="mainTextArea">
                <div className="intext">
                    <h1>In: </h1>
                    <textarea
                        id=""
                        cols={100}
                        rows={20}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                </div>
                <div className="outtext">
                    <h1>Out: </h1>
                    <textarea
                        id=""
                        cols={100}
                        rows={20}
                        value={output}
                        onChange={(e) => setOutput(e.target.value)}
                    ></textarea>
                </div>
                <button onClick={summarize}>Fetch</button>
            </div>
        </>
    );
};

export default Textarea;
