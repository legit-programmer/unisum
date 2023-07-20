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
    setImageFile
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
                setImageFile(file)
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
                className="flex transition-all m-2 text-md text-gray-500  bg-gray-100 p-3 mt-6 rounded-lg hover:cursor-grabbing hover:drop-shadow-xl"
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
        <div id="hello" className=" bg-white drop-shadow-2xl w-[15%] h-[735px]">
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
                className="hover:cursor-pointer transition-all w-[50%] items-center text-center font-modern text-sm text-red-300 m-12 p-2 rounded-md  ring-1 ring-red-300 hover:bg-red-300 hover:text-white hover:drop-shadow-lg"
            >
                Add Files
            </label>
            {files !== null &&
                Array.from(files).map((file: any) => {
                    return displayFile(file.name);
                })}

            <div className="w-full  absolute bottom-0 bg-[#54D0AB]">
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
