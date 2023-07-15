import { AxiosInstance } from "axios";

interface props {
    client: AxiosInstance;
}

const Filesidebar = ({ client }: props) => {
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

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: any = e.target.files;
        for (let i = 0; i < files.length; i++) {
            uploadFile(files[i]);
        }
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
                className=" transition-all w-[50%] items-center text-center font-modern text-sm text-red-300 m-10 p-2 rounded-md  ring-1 ring-red-300 hover:bg-red-300 hover:text-white hover:drop-shadow-lg"
            >
                Add Files
            </label>
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
