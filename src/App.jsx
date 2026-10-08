import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";
import user from "./api/user";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./store/authSlicer";
import { useEffect, useState } from "react";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const dispatch = useDispatch();

    const getCurrentUser = async () => {
        try {
            const data = await user.getCurrentUser();
            if (data) dispatch(setUser(data));
            else {
                dispatch(clearUser());
            }
        } catch (error) {
            console.error("Error fetching current user:", error);
            dispatch(clearUser());
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <>
            {/* <Navbar />
            <main className="overflow-y-auto bg-[#121212] text-white">
                <div className="flex relative h-[calc(100vh-66px)] sm:h-[calc(100vh-82px)]">
                    <Aside />
                    <Outlet />
                </div>
            </main> */}

            {/* <div className="flex min-h-screen flex-col bg-[#121212]">
                <Navbar />
            
                <div className="flex min-h-0 flex-1">
                    <Aside />
            
                    <main className="min-w-0 flex-1 overflow-y-auto text-white">
                        <Outlet />
                    </main>
                </div>
            </div> */}

            <div className="flex min-h-screen flex-col bg-[#121212] text-white">
                <Navbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="flex min-h-0 flex-1">
                    <Aside sidebarOpen={sidebarOpen} />

                    <main className="min-w-0 flex-1 overflow-y-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;
