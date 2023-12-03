import Textarea from "./components/Textarea";
import Navbar from "./components/Navbar";
import Filesidebar from "./components/Filesidebar";
import Chatsidebar from "./components/Chatsidebar";
import axios from "axios";
import Spinner from "./components/Spinner";
import Drag from "./components/Drag";
import { useState } from "react";
import ImagePrompt from "./components/ImagePrompt";

function App() {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(null);
    const [file, setFile] = useState<File | null>(null);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [dragging, setDragging] = useState(false);
    const [inputImage, setInputImage] = useState<File | null>(null);
    const [imagePrompt, setImagePrompt] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [questionPath, setQuestionPath] = useState("imagesum/question/");

    const client = axios.create({
        withCredentials: true,
        baseURL: window.location.href.includes("gitpod")
            ? window.location.href.replace("5173", "8000")
            : "http://127.0.0.1:8000/",
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
        }, 50);
    };

    const uploadToIllustrationEndpoint = () => {
        setImagePrompt(false);
        setLoading(true);
        client
            .post(
                "imagesum/illtrees/upload/",
                { file: imageFile },
                {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                }
            )
            .then((res) => {
                setLoading(false);
                setInputImage(imageFile);
                displayInStyle(res.data["text"]);
            });
    };

    const uploadToImageDocumentEndpoint = () => {
        setImagePrompt(false);
        setLoading(true);
        client
            .post(
                "imagesum/text/upload/",
                { file: imageFile },
                {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                }
            )
            .then((res) => {
                setLoading(false);
                setInputImage(imageFile);
                displayInStyle(res.data[0]["summary_text"]);
            });
    };

    return (
        <>
            <div className="main dark:bg-slate-900">
                {imagePrompt && (
                    <ImagePrompt
                        uploadToIllustrationEndpoint={
                            uploadToIllustrationEndpoint
                        }
                        uploadToImageDocumentEndpoint={
                            uploadToImageDocumentEndpoint
                        }
                        setQuestionPath={setQuestionPath}
                    />
                )}
                <Navbar />
                <div className="flex">
                    {dragging && <Drag />}
                    {loading === true && <Spinner />}
                    <Filesidebar
                        client={client}
                        setFile={setFile}
                        files={files}
                        setFiles={setFiles}
                        setLoading={setLoading}
                        setInput={setInput}
                        displayInStyle={displayInStyle}
                        setDragging={setDragging}
                        setImage={setInputImage}
                        setPrompt={setImagePrompt}
                        setImageFile={setImageFile}
                        setQuestionPath={setQuestionPath}
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
                        image={inputImage}
                        setImage={setInputImage}
                        setQuestionPath={setQuestionPath}
                    />
                    <Chatsidebar
                        client={client}
                        questionPath={questionPath}
                        file={file}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
