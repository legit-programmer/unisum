import Textarea from "./components/Textarea"
import Navbar from "./components/Navbar"
import Filesidebar from "./components/Filesidebar"
import Chatsidebar from "./components/Chatsidebar"
function App() {
  

  return (
    <>
      
      <Navbar/>
      <div className="flex">
        <Filesidebar/>
        <Textarea></Textarea>  
        <Chatsidebar/>
      </div>
      </>
  )
}

export default App
