import { AxiosInstance } from "axios";
import { useState } from "react";

interface props {
    client: AxiosInstance;
    generateToken: (length: number) => void;
    token: string | null;
}

const Filesidebar = ({ client, generateToken, token }: props) => {
    const [fetching, setFetching] = useState(false);

    const uploadFile = (file: File) => {
        client
            .post(
                "handler/upload/",
                { file: file },
                {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                }
            )
            .then((res) => console.log(res));
    };

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (token === "") {
            generateToken(6);
        }

        const files: any = e.target.files;
        for (let i = 0; i < files.length; i++) {
            uploadFile(files[i]);
        }
    };

    const fetchFile = () => {
        setFetching(true);
    };

    return (
        <div className=" bg-white drop-shadow-2xl w-[15%] h-[735px]">
            <input
                type="file"
                id="file"
                className=" text-xs w-8 opacity-0"
                accept=".xlsx, .xls, .jpeg, .jpg, .png, .txt, .docx, .doc"
                onChange={(e) => handleFile(e)}
                multiple
            />
            <br />
            <label
                htmlFor="file"
                className=" transition-all w-[50%] items-center text-center font-modern text-sm text-red-300 m-12 p-2 rounded-md  ring-1 ring-red-300 hover:bg-red-300 hover:text-white hover:drop-shadow-lg"
            >
                Add Files
            </label>
            <div className=" flex ml-12 mt-5">
                <button
                    className="w-[62%] transition:all bg-red-300 rounded-md p-1 text-white hover:bg-red-200"
                    onClick={fetchFile}
                >
                    Refresh
                </button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className={
                        fetching === true
                            ? "w-6 h-6 text-gray-300 ml-2 mt-1 animate-spin"
                            : "w-6 h-6 text-gray-300 ml-2 mt-1 opacity-0"
                    }
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                </svg>
            </div>

            <div className="w-full  absolute bottom-0 bg-[#54D0AB]">
                <p className="font-modern text-white text-[13px] ml-6">
                    Made by
                    <a
                        className="underline"
                        href="https://github.com/legit-programmer/"
                    >
                        Siddique
                    </a>
                    🚀
                </p>
            </div>
        </div>
    );
};

export default Filesidebar;
