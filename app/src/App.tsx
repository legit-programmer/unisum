import Textarea from "./components/Textarea";
import Navbar from "./components/Navbar";
import Filesidebar from "./components/Filesidebar";
import Chatsidebar from "./components/Chatsidebar";
import axios from "axios";
import Spinner from "./components/Spinner";
import Drag from "./components/Drag";
import { useState } from "react";

function App() {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(null);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [dragging, setDragging] = useState(false);

    const client = axios.create({
        baseURL: "http://127.0.0.1:8000/",
    });

    const displayInStyle = (data: string) => {
        const arr = data.split(" ");
        let count = 0;
        let text = "";
        const interval = setInterval(() => {
            text = text + " " + arr[count];
            setOutput(text);
            count += 1;
            if (count === arr.length) {
                clearInterval(interval);
            }
        }, 100);
    };

    return (
        <>
            <Navbar />
            <div className="flex">
                {dragging&&<Drag/>}
                {loading === true && <Spinner />}
                <Filesidebar
                    client={client}
                    files={files}
                    setFiles={setFiles}
                    setLoading={setLoading}
                    setInput={setInput}
                    displayInStyle={displayInStyle}
                    setDragging={setDragging}
                />
                <Textarea
                    input={input}
                    output={output}
                    setInput={setInput}
                    setOutput={setOutput}
                    displayInStyle={displayInStyle}
                    client={client}
                    loading={loading}
                    setLoading={setLoading}
                />
                <Chatsidebar client={client} />
            </div>
        </>
    );
}

export default App;
