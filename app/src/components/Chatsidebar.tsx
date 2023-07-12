import { useState } from "react";
import { AxiosInstance, AxiosResponse } from "axios";

interface props {
    client: AxiosInstance;
}

const Chatsidebar = ({ client }: props) => {
    const [question, setQuestion] = useState("");
    const [chatData, setChatData] = useState([{ q: "", a: "" }]);
    const [answered, setAnswered] = useState(true);
    const [answer, setAnswer] = useState("...");

    const addUnansweredQuestion = () => {
        let temp = chatData;
        temp.push({ q: question, a: "..." });
        setChatData(temp);
    };

    const answerUnansweredQuestion = (res: AxiosResponse<any, any>) => {
        let temp = chatData;

        temp.forEach((question, index) => {
            index === temp.length - 1
                ? (temp[index]["a"] = res.data[0]["answer"])
                : console.log("hit me");
        });

        setChatData(temp);
    };

    const postQuestion = () => {
        setAnswered(false);
        addUnansweredQuestion();

        client
            .post("http://127.0.0.1:8000/imagesum/question/", {
                question: question,
            })
            .then((res) => {
                answerUnansweredQuestion(res);
                setAnswered(true);
            });
    };

    return (
        <div className=" bg-gradient-to-br from-[#54D0AB] to-white w-[32%] ">
            {chatData.map((chat: any) => {
                return (
                    <div>
                        <h1>{chat["q"]}</h1>
                        <h1>{chat["a"]}</h1>
                    </div>
                );
            })}
            <input
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question..."
                className=" font-modern absolute bottom-6 rounded-md p-2 text-gray-700  text-sm left-[76%] w-[300px] bg-white drop-shadow-xl"
            />
            <button
                onClick={answered ? postQuestion : () => {}}
                className=" absolute bottom-6 bg-red-300 p-3 rounded-full left-[96%] drop-shadow-lg"
            >
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
            </button>
        </div>
    );
};

export default Chatsidebar;
