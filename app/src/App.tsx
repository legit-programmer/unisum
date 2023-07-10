import Textarea from "./components/Textarea";
import Navbar from "./components/Navbar";
import Filesidebar from "./components/Filesidebar";
import Chatsidebar from "./components/Chatsidebar";
import axios from "axios";

function App() {
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000/",
    });

    return (
        <>
            <Navbar />
            <div className="flex">
                <Filesidebar />
                <Textarea client={client} />
                <Chatsidebar client={client} />
            </div>
        </>
    );
}

export default App;
