import { AxiosInstance } from "axios";

interface props {
    client: AxiosInstance;
    loading: boolean;
    setLoading: any;
    input: string;
    setInput: any;
    output: string;
    setOutput: any;
    displayInStyle: any;
    image: File | null;
    setImage: any;
    setQuestionPath: any;
}

const Textarea = ({
    client,
    loading,
    setLoading,
    input,
    output,
    setInput,
    setOutput,
    displayInStyle,
    image,
    setImage,
    setQuestionPath
}: props) => {
    const summarize = () => {
        setLoading(true);

        client
            .post("/textsum/", { text: input })
            .then((res) => {
                setLoading(false);
                displayInStyle(res.data[0]["summary_text"]);
            })
            .catch(() => setLoading(false));
    };

    return (
        <>
            <div className="mainTextArea mx-20 my-8 w-[53%]">
                <div className="intext flex">
                    <h1 className="font-modern dark:text-white text-gray-300 font-semibold text-2xl mx-6">
                        In:{" "}
                    </h1>
                    {image === null ? (
                        <textarea
                            className="inputText ring-2 dark:bg-slate-900 dark:ring-white dark:text-gray-200 text-gray-600 ring-gray-400 rounded-md font-modern p-1"
                            id=""
                            cols={100}
                            rows={15}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        ></textarea>
                    ) : (
                        <img
                            className=" max-w-full max-h-[350px] rounded-lg"
                            src={URL.createObjectURL(image)}
                            alt=""
                        />
                    )}
                </div>
                <div className="outtext flex mt-5">
                    <h1 className="font-modern dark:text-white text-gray-300 font-semibold text-2xl mx-3">
                        Out:{" "}
                    </h1>
                    <textarea
                        className="outputText dark:bg-slate-900 dark:text-gray-200 text-gray-600 ring-2 ring-[#54D0AB] rounded-md font-modern p-1"
                        id=""
                        cols={100}
                        rows={8}
                        value={output}
                        onChange={(e) => setOutput(e.target.value)}
                    ></textarea>
                </div>
                <div className="w-full flex justify-center">
                    {loading === false && (
                        <button
                            className=" ml-16 hover:cursor-pointer dark:bg-red-400 bg-red-300 text-white w-[20%] h-10 font-modern font-semibold rounded-lg drop-shadow-md transition-all hover:bg-red-200 mt-10 hover:drop-shadow-xl hover:translate-y-1"
                            onClick={
                                image === null
                                    ? ()=>{summarize();setQuestionPath("imagesum/question/");}
                                    : () => {
                                          setImage(null);
                                          setInput("");
                                          setOutput("");
                                      }
                            }
                            disabled={input.length===0}
                        >
                            {image === null ? "Summarize" : "Reset"}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Textarea;
