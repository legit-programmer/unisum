import { AxiosInstance } from "axios";

interface props {
    client: AxiosInstance;
    files: any;
    setFiles: any;
    setLoading: any;
    displayInStyle: any;
    setInput: any;
    setDragging: any;
    setImage: any;
    setPrompt: any;
    setImageFile: any;
}

const Filesidebar = ({
    client,
    files,
    setFiles,
    setLoading,
    displayInStyle,
    setInput,
    setDragging,
    setImage,
    setPrompt,
    setImageFile,
}: props) => {
    const uploadFile = (file: File) => {
        // setLoading(true);
        console.log(file.name);
        if (file.name.includes(".txt")) {
            setLoading(true);
            console.log("in");
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
                .then((res) => {
                    setImage(null);
                    setLoading(false);
                    setInput(res.data[1]["text"]);
                    displayInStyle(res.data[0]["summary_text"]);
                })
                .catch(() => setLoading(false));
        } else {
            const imageExts = ["png", "jpg", "jpeg", "webp"];
            const file_split = file.name.split(".");
            const extension = file_split[file_split.length - 1];
            console.log(extension in imageExts);

            if (imageExts.includes(extension)) {
                console.log("gere");
                setPrompt(true);
                setImageFile(file);
            } else if (extension.includes("pdf")) {
                setLoading(true);
                client.post(
                    "pdfsum/upload/",
                    { file: file },
                    {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    }
                ).then((res)=>{
                    setImage(null)
                    setInput(res.data[0])
                    setLoading(false);
                    displayInStyle(res.data[1])
                });
            }
        }
    };

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: any = e.target.files;
        setFiles(files);
    };

    const getFile = (name: any) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].name === name) {
                return files[i];
            }
        }
    };

    const displayFile = (name: any) => {
        return (
            <div
                className="flex transition-all m-2 text-md text-gray-500 dark:text-gray-200 dark:bg-slate-800 hover:translate-x-5  bg-gray-100 p-3 mt-6 rounded-lg hover:cursor-grabbing hover:drop-shadow-xl"
                draggable
                onClick={() => setDragging(true)}
                onDragStart={() => setDragging(true)}
                onDragEnd={(e) => {
                    setDragging(false);
                    e.clientX >= 200
                        ? uploadFile(getFile(name))
                        : console.log("not yet");
                }}
            >
                <h1>{name}</h1>
            </div>
        );
    };

    return (
        <div
            id="hello"
            className="dark:bg-slate-900 bg-white drop-shadow-2xl w-[15%] h-[735px] max-w-[15%]"
        >
            <input
                type="file"
                id="file"
                className=" text-xs w-8 opacity-0"
                accept=".xlsx, .xls, .jpeg, .jpg, .png, .txt, .docx, .doc, .pdf"
                onChange={(e) => handleFile(e)}
                multiple
            />
            <br />
            <label
                htmlFor="file"
                className="hover:cursor-pointer transition-all w-[50%] items-center text-center font-modern text-sm text-red-300 dark:text-red-400 dark:ring-red-400 dark:hover:bg-red-400 dark:hover:text-white m-12 p-2 rounded-md  ring-1 ring-red-300 hover:bg-red-300 hover:text-white hover:drop-shadow-lg"
            >
                Add Files
            </label>
            {files !== null &&
                Array.from(files).map((file: any) => {
                    return displayFile(file.name);
                })}

            <div className="w-full  absolute bottom-0 bg-[#54D0AB] dark:bg-[#388a71]">
                <p className="font-modern text-white text-[13px] ml-6">
                    MadeBy
                    <a
                        className="underline"
                        href="https://github.com/legit-programmer/"
                    >
                        Legit
                    </a>
                    🚀
                </p>
            </div>
        </div>
    );
};

export default Filesidebar;
