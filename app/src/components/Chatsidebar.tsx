const Chatsidebar = () => {
    return (
        <div className=" bg-gradient-to-br from-[#54D0AB] to-white w-[32%] ">
            <input
                type="text"
                placeholder="Ask a question..."
                className=" font-modern absolute bottom-6 rounded-md p-2 text-gray-700  text-sm left-[76%] w-[300px] bg-white drop-shadow-xl"
            />
            <button className=" absolute bottom-6 bg-red-300 p-3 rounded-full left-[96%] drop-shadow-lg">
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
