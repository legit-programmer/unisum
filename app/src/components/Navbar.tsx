import Switcher from "./Switcher"

const Navbar = () => {
  return (
    <div className="flex navbar bg-[#54D0AB] dark:bg-[#388a71] h-14 drop-shadow-xl relative items-center">
        <div className="header text-white font-modern font-black text-4xl mx-8 p-2 drop-shadow-xl">
            <h1>Unisum.</h1>
        </div>
        <div className="absolute right-[70px] top-3 w-10 cursor-pointer hover:drop-shadow-lg"><Switcher/></div>
        <img onClick={()=>window.open('https://github.com/legit-programmer/unisum/')} className="transition-all absolute right-5 w-10 cursor-pointer hover:w-12 hover:drop-shadow-lg" src="https://i.ibb.co/n7DG5fj/icons8-github-60.png" alt="" />
        
    </div>
  )
}

export default Navbar