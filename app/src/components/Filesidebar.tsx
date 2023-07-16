import { AxiosInstance } from "axios";

interface props {
    client: AxiosInstance;
    files: any;
    setFiles: any;
}

const Filesidebar = ({ client, files, setFiles }: props) => {
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
            <h1 
                draggable
                onDragEnd={(e) => {
                    e.clientX >= 200
                        ? uploadFile(getFile(name))
                        : console.log("not yet");
                    
                }}
            >
                {name}
            </h1>
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
                className=" transition-all w-[50%] items-center text-center font-modern text-sm text-red-300 m-12 p-2 rounded-md  ring-1 ring-red-300 hover:bg-red-300 hover:text-white hover:drop-shadow-lg"
            >
                Add Files
            </label>
            {files !== null &&
                Array.from(files).map((file: any) => {
                    return displayFile(file.name);
                })}

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
