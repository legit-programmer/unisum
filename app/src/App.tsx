import Textarea from "./components/Textarea";
import Navbar from "./components/Navbar";
import Filesidebar from "./components/Filesidebar";
import Chatsidebar from "./components/Chatsidebar";
import axios from "axios";
import Spinner from "./components/Spinner";
import { useState } from "react";

function App() {
    const [loading, setLoading] = useState(false);
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000/",
    });

    return (
        <>
            <Navbar />
            <div className="flex">
                {loading===true&&<Spinner/>}
                <Filesidebar client={client} />
                <Textarea client={client} loading={loading} setLoading={setLoading}/>
                <Chatsidebar client={client} />
            </div>
        </>
    );
}

export default App;
