const Filesidebar = () => {
    return (
        <div className=" bg-white drop-shadow-2xl w-[15%] h-[735px]">
            <button className=" transition-all w-[50%] items-center text-center font-modern text-sm text-red-300 m-10 p-2 rounded-md  ring-1 ring-red-300 hover:bg-red-300 hover:text-white hover:drop-shadow-lg">
                
                Add files
            </button>
            <div className="w-full  absolute bottom-0 bg-[#54D0AB]">
                <p className="font-modern text-white text-[13px] ml-6">Made by <a className="underline" href="https://github.com/legit-programmer/">Siddique</a>🚀</p>
            </div>
        </div>
    );
};

export default Filesidebar;
