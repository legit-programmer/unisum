import Textarea from "./components/Textarea";
import Navbar from "./components/Navbar";
import Filesidebar from "./components/Filesidebar";
import Chatsidebar from "./components/Chatsidebar";
import axios from "axios";
import Spinner from "./components/Spinner";
import { useState } from "react";

function App() {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000/",
    });

    const generateToken = (length: number) => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        setToken(result);
    };

    return (
        <>
            <Navbar />
            <div className="flex">
                {loading === true && <Spinner />}
                <Filesidebar
                    client={client}
                    generateToken={generateToken}
                    token={token}
                />
                <Textarea
                    client={client}
                    loading={loading}
                    setLoading={setLoading}
                />
                <Chatsidebar client={client} />
            </div>
        </>
    );
}

export default App;
