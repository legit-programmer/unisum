interface props {
    uploadToIllustrationEndpoint: () => void;
    uploadToImageDocumentEndpoint: () => void;
    setQuestionPath: any;
}

const ImagePrompt = ({
    uploadToIllustrationEndpoint,
    uploadToImageDocumentEndpoint,
    setQuestionPath,
}: props) => {
    return (
        <div className="flex text-center justify-center items-center prompt dark:bg-slate-900 bg-white bg-opacity-70 absolute left-[11%] top-0 h-full w-[64.25%]">
            <div className="flex-row dark:bg-slate-900 justify-center items-center dialog bg-white drop-shadow-2xl rounded-2xl w-[45%] h-[40%]">
                <div className="content font-modern my-8">
                    <h1 className=" text-gray-500 dark:text-white text-xl">
                        Choose your image type:
                    </h1>
                </div>
                <div className="choice flex justify-around">
                    <button
                        onClick={() => {
                            uploadToIllustrationEndpoint();
                            setQuestionPath("imagesum/illtrees/question/");
                        }}
                        className="transition-all w-28 hover:font-normal font-thin  hover:drop-shadow-xl hover:w-32 ring-gray-300 rounded-md p-4"
                    >
                        <img
                            src="https://github-production-user-asset-6210df.s3.amazonaws.com/66078215/254833827-dc6ca1a7-7bde-4dea-a936-4d8a389032e6.png"
                            alt=""
                        />
                        <h3 className="font-modern  text-gray-600 dark:text-white">
                            Illustration
                        </h3>
                    </button>
                    <button
                        onClick={() => {
                            uploadToImageDocumentEndpoint();
                            setQuestionPath("imagesum/question/");
                        }}
                        className="w-28 hover:font-normal font-thin  transition-all hover:drop-shadow-xl hover:w-32 ring-gray-300 rounded-md p-4"
                    >
                        <img
                            src="https://icon-library.com/images/text-file-icon/text-file-icon-5.jpg"
                            alt=""
                        />
                        <h3 className="font-modern text-gray-600 dark:text-white">
                            Document
                        </h3>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImagePrompt;
