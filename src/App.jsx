import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";

function App() {
    return (
        <>
            <Navbar />
            <main className="overflow-y-auto bg-[#121212] text-white">
                <div className="flex relative h-[calc(100vh-66px)] sm:h-[calc(100vh-82px)]">
                    <Aside />
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default App;
