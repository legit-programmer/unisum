import { useState } from "react";
import { AxiosInstance, AxiosResponse } from "axios";

interface props {
    client: AxiosInstance;
    questionPath: string;
}

const Chatsidebar = ({ client, questionPath }: props) => {
    const [question, setQuestion] = useState("");
    const [chatData, setChatData] = useState([{ q: "", a: "" }]);
    const [answered, setAnswered] = useState(true);

    const addUnansweredQuestion = () => {
        let temp = chatData;
        temp.push({ q: question, a: "..." });
        setChatData(temp);
    };

    const answerUnansweredQuestion = (res: AxiosResponse<any, any>) => {
        let temp = chatData;

        temp.forEach((question, index) => {
            index === temp.length - 1
                ? (temp[index]["a"] = res.data["output_text"])
                : console.log(question);
        });

        setChatData(temp);
    };

    const postQuestion = () => {
        setAnswered(false);
        addUnansweredQuestion();

        client
            .post(questionPath, {
                question: question,
            })
            .then((res) => {
                answerUnansweredQuestion(res);
                setAnswered(true);
                document.getElementById("chatarea")?.scrollTo(0, 9999);
            });
    };

    return (
        <div className=" bg-gradient-to-br from-[#54D0AB] dark:from-slate-800 to-white w-[32%] ">
            <div className="text-white mt-5 mx-4 bg-red-300 dark:bg-red-400 text-[12px] bg-opacity-60 rounded-xl p-4 pl-7 drop-shadow-xl">
                <h1 className="font-modern">
                    The QNA model works well with documents or raw texts which
                    contains meaningful data and not just paragraphs of text.
                </h1>
            </div>
            <div
                id="chatarea"
                className="chatarea overflow-auto h-[72%] fixed w-[24.5%]"
            >
                {chatData.map((chat: any) => {
                    return (
                        <div className="m-5 font-modern text-white">
                            <h1>
                                <span className=" font-bold text-red-400">
                                    {chat["q"] !== "" && "You: "}
                                </span>
                                {chat["q"]}
                            </h1>
                            <h1>
                                <span className=" font-bold text-green-700 dark:text-green-500">
                                    {chat["q"] !== "" && "Model: "}
                                </span>
                                {chat["a"] === "..." ? (
                                    <span className="font-modern animate-pulse text-gray-800 dark:text-slate-300">
                                        This may take few seconds...
                                    </span>
                                ) : (
                                    chat["a"]
                                )}
                            </h1>
                        </div>
                    );
                })}
            </div>
            <input
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about the document..."
                className="dark:bg-slate-600 dark:text-white font-modern absolute bottom-6 rounded-md p-2 text-gray-700  text-sm left-[76%] w-[300px] bg-white drop-shadow-xl"
            />
            <button
                onClick={answered ? postQuestion : () => {}}
                className={
                    answered
                        ? "transition-all absolute bottom-6 dark:bg-red-400 bg-red-300 p-3 rounded-full dark:hover:bg-red-300 left-[96%] drop-shadow-lg hover:bg-red-200"
                        : "transition-all absolute bottom-6 dark:bg-red-400 bg-red-200 p-3 rounded-full left-[96%] drop-shadow-lg"
                }
            >
                {answered ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="white"
                        className="w-4 h-4"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 text-white animate-spin"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default Chatsidebar;
